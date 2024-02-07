import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: ".env" });

import { getTextMessage } from "../utils/languages.js";
import { sendTextMessage, sendVideo, sendFlow, sendLocation } from "../utils/messages.js";
import { getTimeZone, markAttendance, sendAttendanceNotification } from "../utils/utils.js";

import { Whatsapp } from "../controllers/whatsappMessageController.js";

import Employee from "../models/employeeModel.js";

import {
  LINK_BRANCH_FLOW_ID,
  LINK_BRANCH_FLOW_TOKEN,
  ADD_BRANCH_FLOW_ID,
  ADD_BRANCH_FLOW_TOKEN,
} from "../utils/constants.js";

const BOT = "main";

async function handleLocationMessage({ incomingMessage, recipientPhone, session }) {
  const { user, session: sessionType, action } = session.get(recipientPhone);

  const hasThread = Boolean(incomingMessage.thread);
  const hasName = Boolean(incomingMessage.location.name && incomingMessage.location.url);

  const { longitude, latitude } = incomingMessage.location;
  const { locations, language } = user;

  session.get(recipientPhone).latitude = latitude;
  session.get(recipientPhone).longitude = longitude;

  if (sessionType === "employeeDemo") {
    if (hasThread) {
      const message = getTextMessage(language, "attendanceLocation", [], BOT);
      await Whatsapp.sendImage({
        recipientPhone,
        caption: message,
        url: "https://cdn.discordapp.com/attachments/997267733513261188/1178337649342287952/Adityabanka_SINGLE_AERIAL_VIEW_view_OF_SINGLE_very_beautiful_in_63db8846-3aa3-4e1a-909b-1cb311c749b2.png",
      });
    } else {
      const message = getTextMessage(language, "clickAttendanceLocation", [], BOT);
      await sendVideo({
        caption: message,
        file_path: path.join(process.env.ROOT_PATH, "/public/locaton-example.mp4"),
        recipientPhone,
      });
    }

    return;
  } else if (sessionType === "empSignup") {
    let timezoneInfo = {};

    if (latitude && longitude) {
      timezoneInfo = await getTimeZone(latitude, longitude);

      if (timezoneInfo) {
        const res = await Employee.updateOne(
          {
            _id: user.employeeId,
            employeeNumber: Number(recipientPhone),
          },
          {
            countryName: timezoneInfo?.countryName,
            countryCode: timezoneInfo?.countryCode,
            timeZone: timezoneInfo?.zoneName,
            regionName: timezoneInfo?.regionName,
          }
        );

        if (res && res.acknowledged) {
          const message = getTextMessage(language, "employeeDemoCompleted", [], BOT);

          await Whatsapp.sendImage({
            recipientPhone,
            caption: message,
            url: "https://i.postimg.cc/mkDw3z3t/Copy-of-Hi.png",
          });

          session.delete(recipientPhone);
        }
      } else {
        await sendTextMessage("Please send your location again", recipientPhone);
      }
    }

    return;
  }

  if (user.isEmployee) {
    const isAnyLocation = locations.find((location) => location.name === "Any Location");

    if (!isAnyLocation) {
      const isInRangeArray = await Promise.all(
        locations.map(async (location) => {
          const inRange = await checkIsInRange(location, latitude, longitude);
          return inRange;
        })
      );

      const isAnyLocationInRange = isInRangeArray.some((result) => result);

      if (isAnyLocationInRange) {
        if (hasThread) {
          if (hasName) {
            await sendTextMessage("Please send current location", recipientPhone);
            return;
          }

          if (user.proof.image) {
            const message = getTextMessage(language, "attendanceLocation", [], BOT);
            await sendTextMessage(message, recipientPhone);
            session.get(recipientPhone).session = "markAttendance";
          } else {
            const { name, address } = await markAttendance(action, recipientPhone, {}, user);
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
              name,
              address,
            });
          }
        } else {
          const message = getTextMessage(language, "clickAttendanceLocation", [], BOT);
          await sendVideo({
            caption: message,
            file_path: path.join(process.env.ROOT_PATH, "/public/locaton-example.mp4"),
            recipientPhone,
          });
        }
      } else {
        const message = getTextMessage(language, "locNotInRange", [], BOT);
        await sendTextMessage(message, recipientPhone);

        session.delete(recipientPhone);
      }
    } else {
      if (hasThread) {
        if (hasName) {
          await sendTextMessage("Please send current location", recipientPhone);
          return;
        }

        if (user.proof.image) {
          const message = getTextMessage(language, "attendanceLocation", [], BOT);
          await sendTextMessage(message, recipientPhone);
          session.get(recipientPhone).session = "markAttendance";
        } else {
          const { name, address } = await markAttendance(
            action,
            recipientPhone,
            { lat: latitude, long: longitude },
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
            name,
            address,
          });
        }
      } else {
        const message = getTextMessage(language, "clickAttendanceLocation", [], BOT);
        await sendVideo({
          caption: message,
          file_path: path.join(process.env.ROOT_PATH, "/public/locaton-example.mp4"),
          recipientPhone,
        });
      }
    }
  } else if (!user.isEmployee) {
    const employees = await Employee.find(
      {
        employerNumber: recipientPhone,
        companyId: user.companyId,
        isActive: true,
      },
      { employeeName: 1, employeeNumber: 1 }
    ).limit(22);

    let branchEmployees = employees?.map((employee) => {
      return {
        id: employee.employeeNumber.toString(),
        title: employee.employeeName.slice(0, 20),
      };
    });

    if (branchEmployees.length === 0) {
      branchEmployees = [{ id: "no-employees", title: "No employees" }];
    }

    if (sessionType === "addBranch" || employees.length === 0) {
      const message = getTextMessage(user.language, "addBranch", [], BOT);
      const flowData = {
        screen: "Add_Branch",
        data: {
          ...message.label,
          coordinates: `${latitude}, ${longitude}`,
        },
      };

      await sendFlow({
        body: message.body,
        flow_cta: "Add Place",
        flow_id: ADD_BRANCH_FLOW_ID,
        flow_data: flowData,
        flow_token: ADD_BRANCH_FLOW_TOKEN,
        recipientPhone,
      });

      session.get(recipientPhone).session = "addPlace";

      // delete session.get(recipientPhone).session;
    } else {
      const message = getTextMessage(user.language, "link_employee", [], BOT);

      const flowData = {
        screen: "Add_Branch",
        data: {
          ...message.label,
          all_extras: branchEmployees,
          coordinates: `${latitude},${longitude}`,
        },
      };

      await sendFlow({
        body: message.body,
        flow_cta: "Add Place",
        flow_data: flowData,
        flow_id: LINK_BRANCH_FLOW_ID,
        flow_token: LINK_BRANCH_FLOW_TOKEN,
        recipientPhone,
      });
    }
  }
}

async function checkIsInRange(location, recipientLat, recipientLong) {
  const distance = calculateDistance(location.lat, location.long, recipientLat, recipientLong);
  if (distance > location.range) {
    return false;
  } else {
    return true;
  }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c * 1000;

  return distance;
}

export default handleLocationMessage;
