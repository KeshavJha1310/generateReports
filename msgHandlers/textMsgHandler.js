import { sendSimpleButtons, sendTextMessage, sendFlow } from "../utils/messages.js";
import { getTextMessage, getSimpleButtonsMessage } from "../utils/languages.js";
import { delay, capitalize, formatTime12h, isCheckIn, makeApiRequest } from "../utils/utils.js";
import { Issue, Employer, Employee } from "../models/index.js";
import {
  ATTENDANCE_FLOW_TOKEN,
  ATTENDANCE_FLOW_ID,
  VITALS_FLOW_ID,
  VITALS_FLOW_TOKEN,
} from "../utils/constants.js";

const BOT = "main";
const FIVE_MINS_IN_MS = 2.5 * 60 * 1000;

const messageHandlers = {
  hi: async ({ message, session, recipientPhone }) => {
    const isEmployee = session.get(recipientPhone).user.isEmployee;
    if (isEmployee) {
      await handleEmployeeMessage({ message, session, recipientPhone });
    } else {
      await handleEmployerMessage({ session, recipientPhone });
    }
  },
  task: async ({ session, recipientPhone }) => {
    const isEmployee = session.get(recipientPhone).user.isEmployee;
    if (!isEmployee) {
      await sendEmployerTask({ recipientPhone, session });
    }
  },
  "support-issue": async ({ message, session, recipientPhone }) => {
    await handleEmployeeIssue({ message, session, recipientPhone });
  },
  "demo-issue": async ({ message, session, recipientPhone }) => {
    await handleEmployeeIssue({ message, session, recipientPhone });
  },
  vitals: async ({ message, session, recipientPhone }) => {
    const isEmployee = session.get(recipientPhone).user.isEmployee;

    if (isEmployee) {
      await handleVitalsMessage({ message, session, recipientPhone });
    }
  },
};

async function handleTextMessage({ message, recipientPhone, session }) {
  let sessionType = session.get(recipientPhone).session;

  if (message.toLowerCase() === "hi") {
    sessionType = message.toLowerCase();
  } else if (message.toLowerCase() === "task") {
    sessionType = message.toLowerCase();
  } else if (message.toLowerCase() === "vitals" || message.toLowerCase() === "vital") {
    sessionType = "vitals";
  }

  if (messageHandlers[sessionType]) {
    await messageHandlers[sessionType]({
      message,
      session,
      recipientPhone,
    });
  } else {
    const isEmployee = session.get(recipientPhone).user.isEmployee;

    if (isEmployee) {
      const checkedIn = await isCheckIn(session.get(recipientPhone).user);

      if (checkedIn) {
        const buttonMessage = "Add to Logs or chat with AutoWhat AI.";
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

        await sendSimpleButtons(buttonMessage, listOfButtons, recipientPhone);
        session.get(recipientPhone).logText = message;
      } else {
        await sendTextMessage(
          "Please Type Hi for Attendance bot \n- below is the reqested answer by Autowhat AI Assistant",
          recipientPhone
        );
        await makeApiRequest(message, recipientPhone);
      }
    } else {
      await sendTextMessage(
        "Please Type Hi for Attendance bot \n- below is the requested answer by Autowhat  AI Assistant",
        recipientPhone
      );
    }
  }
}

async function handleEmployeeMessage({ session, recipientPhone }) {
  const { user, isRegistered } = session.get(recipientPhone);

  if (user) {
    session.set(recipientPhone, {
      user,
      ttl: Date.now() + FIVE_MINS_IN_MS,
      isRegistered,
      BOT,
    });

    const employeeName = user.employeeName;

    const { message, listOfButtons } = getSimpleButtonsMessage(
      user.language,
      "hi",
      [employeeName],
      BOT
    );

    const sessionData = JSON.stringify({
      employeeId: user.employeeId,
      language: user.language,
      timeZone: user.timeZone,
      createdAt: user.createdAt,
      workDays: user.workDays,
      employerNumber: user.employeeNumber,
      companyId: user.companyId,
      role: user.role,
    });

    const buttons = listOfButtons(sessionData);

    await sendSimpleButtons(message, buttons, recipientPhone);
  } else {
    await sendTextMessage(
      "You are not registered. 😔\n\nआप रजिस्टर्ड नहीं हैं. 😔",
      recipientPhone
    );
  }
}

async function handleEmployerMessage({ recipientPhone, session }) {
  const { user, isRegistered } = session.get(recipientPhone);

  if (user) {
    session.set(recipientPhone, {
      user,
      ttl: Date.now() + FIVE_MINS_IN_MS,
      isRegistered,
    });

    console.log(user.language);

    const { message, listOfButtons } = getSimpleButtonsMessage(
      user.language,
      "employerStart",
      [],
      BOT
    );
    await sendSimpleButtons(message, listOfButtons, recipientPhone);
  }
}

async function sendEmployerTask({ recipientPhone, session }) {
  const { user, isRegistered } = session.get(recipientPhone);

  session.set(recipientPhone, {
    user,
    ttl: Date.now() + FIVE_MINS_IN_MS,
    isRegistered,
  });

  const employees = await Employee.findEmployees(user.companyId);

  const employeesList = employees.map((employee) => {
    return {
      id: employee.employeeNumber.toString(),
      title: employee.employeeName,
      description: `${employee.natureOfTime}-${capitalize(employee.shiftType)}-(${formatTime12h(
        employee.checkIn
      )}-${formatTime12h(employee.checkOut)})`,
    };
  });
  const placesList = user.places.map((place) => {
    return {
      id: place.name,
      title: place.name,
      description: `${place.range} meters`,
    };
  });
  const team = employeesList.length > 0 ? employeesList : [{ id: "null", title: "No Employees" }];

  const primaryLanguage = user.language.includes("+") ? user.language.split("+")[1] : user.language;
  const message = getTextMessage(primaryLanguage, "attendanceManagement", [], BOT);
  const userData = JSON.stringify({
    companyId: user.companyId,
    timeZone: user.timeZone,
    language: user.language,
    places: user.places.length > 0 ? user.places : [],
    registeredOn: user.registeredOn?.toJSON(),
    companyName: user.companyName,
    employerName: user.employerName,
  });

  const flowData = {
    screen: "Attendance_Management",
    data: {
      ...message.label,
      init_values: {
        userData,
      },
      editgeo: [
        {
          id: "multiple-edit-palces",
          title: "Select Muliple",
          description: "Select multiple places and edit them.",
        },
        ...placesList,
      ],
      deletegeo: [
        {
          id: "delete-multiple-places",
          title: "Select Muliple",
          description: "Select multiple places and remove them.",
        },
        ...placesList,
      ],
      team,
      editshift: [
        {
          id: "multiple-edit-shift",
          title: "Select Muliple",
          description: "Select multiple employees and edit their shift timings",
        },
        ...employeesList,
      ],
      deleteemployee: [
        {
          id: "delete-multiple-employees",
          title: "Select Muliple",
          description: "Select multiple employees and remove them from organization",
        },
        ...employeesList,
      ],
      userData,
    },
  };

  await sendFlow({
    body: message.body,
    flow_data: flowData,
    flow_cta: "AutowhatTask",
    flow_id: ATTENDANCE_FLOW_ID,
    flow_token: ATTENDANCE_FLOW_TOKEN,
    recipientPhone,
  });
}

async function handleEmployeeIssue({ message, session, recipientPhone }) {
  const { user, problem, session: sessionType } = session.get(recipientPhone);

  const ticketNumber = Math.floor(Math.random() * 90000) + 10000;

  if (sessionType === "demo-issue") {
    const textMessage = getTextMessage(
      user.language,
      "registerComplain",
      [user.employeeName, user.department, problem, message, recipientPhone, ticketNumber],
      BOT
    );
    await sendTextMessage(textMessage, recipientPhone);

    session.get(recipientPhone).session = "employeeDemo";

    await delay(2500);

    const { message: reportMessage, listOfButtons } = getSimpleButtonsMessage(
      user.language,
      "employeeReportStart"
    );
    await sendSimpleButtons(reportMessage, listOfButtons, recipientPhone);

    return;
  }

  if (user) {
    await Issue.create({
      date: new Date(),
      employeeId: user.employeeId,
      companyId: user.companyId,
      issueType: problem,
      remark: message,
      ticketNumber,
    });

    const textMessage = getTextMessage(
      user.language,
      "registerComplain",
      [user.employeeName, user.department, problem, message, recipientPhone, ticketNumber],
      BOT
    );
    await sendTextMessage(textMessage, recipientPhone);

    const { notifications } = await Employer.findNotfications(user.companyId);

    if (notifications.support) {
      const { message: textMessage, listOfButtons } = getSimpleButtonsMessage(
        user.language,
        "sendIssue",
        [user.employeeName, user.department, problem, message, recipientPhone, ticketNumber],
        BOT
      );
      await sendSimpleButtons(textMessage, listOfButtons, user.employerNumber);
    }
  }

  session.delete(recipientPhone);
}

async function handleVitalsMessage({ message, recipientPhone }) {
  const flowData = {
    screen: "Vitals",
    data: {
      title: "Vitals",
      bpLabel: "BP",
      tempLabel: "Temp",
      spLabel: "SPO2",
      pulseLabel: "Pulse Rate",
    },
  };

  await sendFlow({
    body: message.body,
    flow_id: VITALS_FLOW_ID,
    flow_token: VITALS_FLOW_TOKEN,
    flow_cta: "Vitals",
    flow_data: flowData,
    recipientPhone,
  });
}

export default handleTextMessage;
