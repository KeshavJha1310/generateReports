import moment from "moment-timezone";
import _ from "lodash";

import {
  sendTextMessage,
  sendImage,
  sendEmployeeDemoTemplate,
  sendFlow,
  sendSimpleButtons,
} from "../utils/messages.js";
import { getTextMessage } from "../utils/languages.js";
import { EDIT_EMPLOYEE_FLOW_ID, EDIT_EMPLOYEE_FLOW_TOKEN, EPOCH } from "../utils/constants.js";
import { formatTime12h } from "../utils/utils.js";
import { Employee, Employer, OwnerTransferLogs } from "../models/index.js";

const BOT = "main";

async function handleContactMessage({ contacts, recipientPhone, session }) {
  const { user, session: sessionType } = session.get(recipientPhone);

  if (user.isEmployee) {
    const message = getTextMessage(user.language, "contacts");
    await sendTextMessage(message, recipientPhone);
    return;
  }

  if (sessionType === "transferOwner") {
    const contact = contacts[0];

    if (
      _.has(contact, "name") &&
      _.has(contact, "phones") &&
      Array.isArray(contact.phones) &&
      contact.phones.length > 0
    ) {
      const transferLogs = new OwnerTransferLogs({
        status: "pending",
        companyId: user.companyId,
        from: {
          time: moment.tz(new Date(), user.timeZone),
        },
        to: {
          time: moment.tz(new Date(), user.timeZone),
        },
      });

      const name = contact.name.formatted_name;
      const number = contact.phones[0].wa_id.replace(/\+| /g, "");

      const employee = await Employee.findOne(
        { employeeNumber: Number(number) },
        { _id: 1, role: 1 }
      );

      if (employee) {
        const message = `Contact with name ${name} is already an employee in your company. \nIf you still want to transfer ownership click *"Continue"*. or you can cancel the operation by clicking *"Cancel"* or you can *upload another contact*.`;
        const listOfButtons = [
          {
            id: `empOwn@continue@${name}@${number}@${user.companyId}@${employee._id.toString()}@${
              user.companyName
            }@${transferLogs._id.toString()}`,
            title: "Continue",
          },
          {
            id: `empOwn@cancel@${name}@${number}@${user.companyId}@${employee._id.toString()}@${
              user.companyName
            }@${transferLogs._id.toString()}`,
            title: "Cancel",
          },
        ];
        await sendSimpleButtons(message, listOfButtons, recipientPhone);

        transferLogs.to.employeeId = employee._id.toString();
        transferLogs.to.priorType = employee.role;
      } else {
        const data = JSON.stringify({
          employeeName: name,
          employeeNumber: number,
          companyId: user.companyId,
          employeeId: "undefined",
          logId: transferLogs._id.toString(),
          employerNumber: user.companyNumber,
        });
        const message = `Hello ${name},\n\nYou have been requested by ${user.employerName} to become the owner of ${user.companyName}. To accept the request click on "Accept" button, othewise to reject click on "Reject" Button`;
        const listOfButtons = [
          {
            id: `addOwn@accept@${data}`,
            title: "Accept",
          },
          {
            id: `addOwn@reject@${data}`,
            title: "Reject",
          },
        ];
        
        await sendSimpleButtons(message, listOfButtons, number);
        await sendTextMessage(`A confirmation request has been send to ${name}.`, recipientPhone);

        transferLogs.to.priorType = "newContact";
      }

      await OwnerTransferLogs.create(transferLogs);
    } else {
      await sendTextMessage("Upload a valid contact", recipientPhone);
    }

    return;
  }

  let branches;
  let employees = [];

  const promises = await Promise.allSettled(
    contacts.map(async (contact) => {
      if (_.has(contact, "name") && _.has(contact, "phones")) {
        const employeeName = contact.name.formatted_name;
        const employeeNumber = contact.phones?.[0]?.wa_id.replace(/\+| /g, "");

        const employee = await Employee.findOne({ employeeName, employeeNumber });

        if (employee) {
          if (!branches) {
            branches = await Employer.findBranch(recipientPhone, user.companyId);

            await sendEditEmployeeFlow(employee, recipientPhone, branches.branch);
            throw new Error("emp-exist");
          }
        } else {
          try {
            let bufferTime = user.bufferTime;

            if (!bufferTime) {
              const companyDetails = await Employer.findOne(
                {
                  employerNumber: recipientPhone,
                },
                { bufferTime: 1 }
              );

              bufferTime = companyDetails?.bufferTime ?? 15;
              session.get(recipientPhone).user["bufferTime"] = bufferTime;
            }

            const nineHoursInMs = 12600000;

            const data = {
              employeeName: employeeName,
              employeeNumber: employeeNumber,
              companyId: user.companyId,
              companyName: user.companyName,
              employerNumber: recipientPhone,
              checkIn: new Date(...EPOCH, 9, 30),
              checkOut: new Date(...EPOCH, 18, 30),
              requiredHours: nineHoursInMs,
              countryName: user.countryName,
              countryCode: user.countryCode,
              timeZone: user.timeZone,
              regionName: user.regionName,
              bufferTime,
            };

            Employee.create(data).then(() => {
              sendEmployeeDemoTemplate(`${user.companyName}`, employeeNumber);
              employees.push(["success", employeeName]);
            });
          } catch (e) {
            employees.push(["error", employeeName]);
            throw new Error(
              `Failed to Upload: name: ${employeeName} number: ${employeeNumber}. Try uploading again.`
            );
          }
        }
      } else {
        sendTextMessage(
          `${contact.name.formatted_name} is not a valid contact missing phone number`,
          recipientPhone
        );
        throw new Error("Not a valid contact.");
      }
    })
  );

  let statusOfUpload = "";

  employees.forEach(([status, name]) => {
    if (status === "success") {
      statusOfUpload += `${name} - ✅ successfully uploaded\n`;
    } else {
      statusOfUpload += `${name} - ❌ failed to upload\n`;
    }
  });

  const isFulfilled = promises.some((promise) => promise.status === "fulfilled");

  if (isFulfilled) {
    const message = getTextMessage(user.language, "employeeUploaded", [], BOT);
    await sendImage({
      recipientPhone,
      caption: `${message}${statusOfUpload}`,
      url: "https://i.ibb.co/S6XxtXy/Hi-2.png",
    });
  }
}

async function sendEditEmployeeFlow(employee, employerNumber, locations) {
  const {
    employeeName,
    employeeNumber,
    checkIn,
    checkOut,
    natureOfTime,
    shiftType,
    workDays,
    proof,
    language,
  } = employee;

  if (!locations || locations.length === 0) {
    locations = [{ id: "Any Location", title: "Any Location" }];
  } else if (locations.length > 0) {
    locations = [
      { id: "Any Location", title: "Any Location" },
      ...[...locations].map((location) => ({
        id: `${location.name}_@_${location.lat}_@_${location.long}_@_${location.range}`,
        title: location.name,
      })),
    ];
  }

  const message = getTextMessage(language, "editEmployee", [], BOT);

  const flowData = {
    screen: "Edit_Employee",
    data: {
      ...message.label,
      init_values: {
        employeeName: employeeName,
        employeeNumber: String(employeeNumber),
        checkin: formatTime12h(checkIn),
        checkout: formatTime12h(checkOut),
        branch: ["Any Location"],
        shiftType: shiftType,
        timing: natureOfTime,
        workdays: [...workDays.map(String)],
        proof: [
          ...Object.entries(proof)
            .filter(([, value]) => value)
            .map(([key]) => key),
        ],
      },
      all_extras: locations,
      timingTyperadio: [
        {
          id: "Flexible",
          title: "Flexible Timing",
        },
        {
          id: "Fixed",
          title: "Fixed Timing",
        },
      ],
      shiftTyperadio: [
        {
          id: "day",
          title: "Day Shift",
        },
        {
          id: "day/night",
          title: "Day/Night Shift",
        },
      ],
      workdaysList: [
        {
          id: "0",
          title: "Sunday",
        },
        {
          id: "1",
          title: "Monday",
        },
        {
          id: "2",
          title: "Tuesday",
        },
        {
          id: "3",
          title: "Wednesday",
        },
        {
          id: "4",
          title: "Thursday",
        },
        {
          id: "5",
          title: "Friday",
        },
        {
          id: "6",
          title: "Saturday",
        },
      ],
      proofList: [
        {
          id: "location",
          title: "Location",
        },
        {
          id: "image",
          title: "Photo",
        },
        {
          id: "logs",
          title: "Logs",
        },
      ],
    },
  };

  await sendFlow({
    header: "Edit Employee",
    body: message.body,
    flow_cta: "Edit Employee",
    flow_token: EDIT_EMPLOYEE_FLOW_TOKEN,
    flow_id: EDIT_EMPLOYEE_FLOW_ID,
    flow_data: flowData,
    recipientPhone: employerNumber,
  });
}

export default handleContactMessage;
