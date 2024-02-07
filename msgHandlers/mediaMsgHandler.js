import moment from "moment-timezone";

import {
  delay,
  markAttendance,
  sendAttendanceNotification,
  isCheckIn,
  getMediaUrl,
  downloadAndSave,
} from "../utils/utils.js";

import { getSimpleButtonsMessage } from "../utils/languages.js";
import { sendSimpleButtons, sendLocation, sendImage, sendTextMessage } from "../utils/messages.js";

import { uploadToBucket } from "../utils/bucket.js";
import { join } from "path";

async function handleMediaMessage({ media, recipientPhone, session }) {
  const { latitude, longitude, user, session: sessionType, action } = session.get(recipientPhone);

  const currentTime = moment.tz(new Date(), user.timeZone);
  const formattedTime = currentTime.format("DD/MM/YY hh:mm A");

  const imageId = media.image.id;
  const fileName = `${imageId}-${recipientPhone}.jpg`;

  if (sessionType === "employeeDemo") {
    const action = session.get(recipientPhone).action;
    const address = `Check-${action?.toUpperCase()} Success✅`;
    const name = formattedTime;

    await sendLocation({
      latitude,
      longitude,
      recipientPhone,
      name,
      address,
    });

    await sendLocation({
      latitude,
      longitude,
      recipientPhone: user.employerNumber,
      name,
      address: `${address} by ${user.employeeName} - Demo`,
    });

    await delay(2500);

    const { message, listOfButtons } = getSimpleButtonsMessage(
      user.language,
      "startLeaveRequest",
      [],
      "main"
    );
    await sendSimpleButtons(message, listOfButtons, recipientPhone);

    return;
  }

  const mediaUrl = await getMediaUrl(imageId);

  if (sessionType === "broadcast") {
    const broadcastMessage = session.get(recipientPhone).broadcastMessage;
    const employees = session.get(recipientPhone).employees;

    const isSaved = await downloadAndSave(mediaUrl, fileName);

    if (isSaved) {
      await Promise.allSettled(
        employees.map((employee) => {
          return sendImage({
            caption: broadcastMessage,
            file_path: join(process.env.ROOT_PATH, fileName),
            recipientPhone: employee,
          });
        })
      );
    }

    await sendTextMessage("Message has been broadcasted to all employees", recipientPhone);
    session.delete(recipientPhone);
    return;
  }

  if (mediaUrl) {
    const response = await uploadToBucket(mediaUrl, fileName);

    if (response.status === "success") {
      const picUrl = response.url;

      if (sessionType === "markAttendance") {
        if (action === "in" || action === "out") {
          const attendanceData = {
            checkInPic: action === "in" ? picUrl : "none",
            checkOutPic: action === "out" ? picUrl : "none",
            lat: latitude,
            long: longitude,
          };
          const { name, address } = await markAttendance(
            action,
            recipientPhone,
            attendanceData,
            user
          );

          await sendLocation({
            recipientPhone,
            latitude,
            longitude,
            name,
            address,
          });

          await sendAttendanceNotification(user.employerNumber, user.companyId, {
            latitude,
            longitude,
            name: `${name} by ${user.employeeName}`,
            address,
          });
        } else {
          //
        }

        session.delete(recipientPhone);
      } else {
        const checkedIn = await isCheckIn(session.get(recipientPhone).user);

        if (checkedIn) {
          const message = "Add to Logs or chat with AutoWhat AI.";
          const listOfButtons = [
            {
              id: `logs-${checkedIn._id.toString()}`,
              title: "Add to Logs",
            },
            {
              id: "chatWithAI",
              title: "Chat with AI",
            },
          ];

          await sendSimpleButtons(message, listOfButtons, recipientPhone);
          session.get(recipientPhone).logPicUrl = picUrl;
        }
      }
    }
  }
}

export default handleMediaMessage;
