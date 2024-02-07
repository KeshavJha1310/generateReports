import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import moment from "moment-timezone";
import _ from "lodash";

import { Whatsapp } from "../controllers/whatsappMessageController.js";

import {
  sendSimpleButtons,
  sendTextMessage,
  sendRadioButtons,
  sendDocument,
  sendFlow,
} from "../utils/messages.js";
import {
  EDIT_EMPLOYEE_FLOW_ID,
  EDIT_EMPLOYEE_FLOW_TOKEN,
  EDIT_TIMING_FLOW_ID,
  EDIT_TIMING_FLOW_TOKEN,
  EDIT_NOTIFICATIONS_FLOW_ID,
  EDIT_NOTIFICATIONS_FLOW_TOKEN,
  REMOVE_EMPLOYEES_FLOW_ID,
  REMOVE_EMPLOYEES_FLOW_TOKEN,
  REMOVE_BRANCH_FLOW_ID,
  REMOVE_BRANCH_FLOW_TOKEN,
  ONE_DAY_LEAVE_FLOW_ID,
  ONE_DAY_LEAVE_FLOW_TOKEN,
  MANY_DAY_LEAVE_FLOW_ID,
  MANY_DAY_LEAVE_FLOW_TOKEN,
  EDIT_BUSINESS_FLOW_ID,
  EDIT_BUSINESS_FLOW_TOKEN,
  EDIT_GEO_LOCATION_FLOW_ID,
  EDIT_GEO_LOCATION_FLOW_TOKEN,
  DATE_RANGE_FLOW_ID,
  DATE_RANGE_FLOW_TOKEN,
  EMPLOYEE_FLOW_ID,
  EMPLOYEE_FLOW_TOKEN,
  LANGUAGES_FLOW_ID,
  LANGUAGES_FLOW_TOKEN,
  EPOCH,
} from "../utils/constants.js";
import {
  getSimpleButtonsMessage,
  getTextMessage,
  getRadioButtonsMessage,
} from "../utils/languages.js";
import { sendEmployeeDemoTemplate } from "../utils/messages.js";
import { getRegisteredDate } from "../utils/utils.js";

import { createEmployeeReport, createAllEmployeeReport, createLiveReport } from "../reports.js";

import {
  Leave,
  Issue,
  Employer,
  Employee,
  Attendance,
  OwnerTransferLogs,
} from "../models/index.js";

import {
  getSixMonthsInMs,
  delay,
  deleteFile,
  getTimeZoneAwareDate,
  createEmployeeProperties,
  markAttendance,
} from "../utils/utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootPath = path.dirname(__dirname);

const BOT = "main";

const buttonMessageHandlers = {
  MarkAttendance: async (buttonId, session, recipientPhone) => {
    await handleMarkAttendance({ buttonId, session, recipientPhone });
  },
  in: async (buttonId, session, recipientPhone) => {
    await handleIn({ buttonId, session, recipientPhone });
  },
  out: async (buttonId, session, recipientPhone) => {
    await handleIn({ buttonId, session, recipientPhone });
  },
  requestLeave: async (buttonId, session, recipientPhone) => {
    await handleRequestLeave({ buttonId, session, recipientPhone });
  },
  oneDay: async (buttonId, session, recipientPhone) => {
    await handleOneDay({ buttonId, session, recipientPhone });
  },
  moreThanOneDay: async (buttonId, session, recipientPhone) => {
    await handleMoreThanOne({ buttonId, session, recipientPhone });
  },
  approvals: async (buttonId, session, recipientPhone) => {
    await handleApprovals({ buttonId, session, recipientPhone });
  },
  employerReports: async (buttonId, session, recipientPhone) => {
    await handleGetReport({ buttonId, session, recipientPhone });
  },
  leaveApprove: async (buttonId, session, recipientPhone) => {
    await handleLeaveApprove({ buttonId, session, recipientPhone });
  },
  activeIssues: async (buttonId, session, recipientPhone) => {
    await handleActiveIssues({ buttonId, session, recipientPhone });
  },
  liveReport: async (buttonId, session, recipientPhone) => {
    await handleLiveReport({ buttonId, session, recipientPhone });
  },
  Report: async (buttonId, session, recipientPhone) => {
    await handleReport({ buttonId, session, recipientPhone });
  },
  currentMonth: async (buttonId, session, recipientPhone) => {
    await handleCurrentMonth({ buttonId, session, recipientPhone });
  },
  previousMonth: async (buttonId, session, recipientPhone) => {
    await handlePreviousMonth({ buttonId, session, recipientPhone });
  },
  emp_master_sheet: async (buttonId, session, recipientPhone) => {
    await handleEmpMasterSheet({ buttonId, session, recipientPhone });
  },
  startempdemo: async (buttonId, session, recipientPhone) => {
    await handleEmpDemo({ buttonId, session, recipientPhone });
  },
};

async function handleSimpleButtonMessage({ buttonId, recipientPhone, session }) {
  const {
    user: { language, companyId },
    session: sessionType,
  } = session.get(recipientPhone);

  const handlerFunction = buttonMessageHandlers[buttonId];

  if (typeof handlerFunction == "function") {
    await handlerFunction(buttonId, session, recipientPhone);
  }

  if (buttonId === "Other") {
    const { message, listOfButtons } = getSimpleButtonsMessage(language, buttonId, [], BOT);
    await sendSimpleButtons(message, listOfButtons, recipientPhone);
  } else if (buttonId === "support") {
    const { message, listOfSections } = getRadioButtonsMessage(language, buttonId, [], BOT);
    const buttonname = "Select Support Type";
    await sendRadioButtons(message, listOfSections, recipientPhone, buttonname);
  } else if (buttonId.startsWith("addEmp")) {
    await addEmployee({ buttonId, session, recipientPhone });
  } else if (buttonId.startsWith("editEmp")) {
    await handleEditEmployee({ buttonId, session, recipientPhone });
  } else if (buttonId.startsWith("request_")) {
    await handleUpdateLeaveRequest({ buttonId, session, recipientPhone });
  } else if (buttonId.startsWith("issue_")) {
    await handleUpdateIssue({ buttonId, session, recipientPhone });
  } else if (buttonId === "singlelanguage") {
    const message = " *Choose your preferred language.* ";

    const flowData = {
      screen: "Language",
      data: {
        languagesRadio: [
          {
            id: "English",
            title: "English",
          },
          {
            id: "Hindi",
            title: "Hindi",
          },
          {
            id: "Bengali",
            title: "Bengali",
          },
          {
            id: "Telugu",
            title: "Telugu",
          },
          {
            id: "Marathi",
            title: "Marathi",
          },
          {
            id: "Tamil",
            title: "Tamil",
          },
          {
            id: "Kannada",
            title: "Kannada",
          },
          {
            id: "Gujarati",
            title: "Gujarati",
          },
          {
            id: "Odia",
            title: "Odia",
          },
          {
            id: "Malayalam",
            title: "Malayalam",
          },
        ],
      },
    };

    await sendFlow({
      body: message,
      flow_cta: "Select Language",
      flow_data: flowData,
      flow_id: LANGUAGES_FLOW_ID,
      flow_token: LANGUAGES_FLOW_TOKEN,
      recipientPhone,
    });

    // const languageOptions = [
    //   {
    //     lang: "English",
    //     emoji: "🇬🇧",
    //     desc: "Messages in English.",
    //   },
    //   {
    //     lang: "Hindi",
    //     emoji: "🇮🇳",
    //     desc: "संदेश हिंदी में।",
    //   },
    //   {
    //     lang: "Bengali",
    //     emoji: "🇧🇩",
    //     desc: "বার্তাগুলি বাংলায়।",
    //   },
    //   {
    //     lang: "Telugu",

    //     emoji: "🇮🇳",
    //     desc: "సందేశాలు తెలుగులో.",
    //   },
    //   {
    //     lang: "Marathi",

    //     emoji: "🇮🇳",
    //     desc: "संदेश मराठीत.",
    //   },
    //   {
    //     lang: "Tamil",

    //     emoji: "🇮🇳",
    //     desc: "செய்திகள் தமிழில்.",
    //   },
    //   {
    //     lang: "Kannada",

    //     emoji: "🇮🇳",
    //     desc: "ಸಂದೇಶಗಳು ಕನ್ನಡದಲ್ಲಿ.",
    //   },
    //   {
    //     lang: "Gujarati",

    //     emoji: "🇮🇳",
    //     desc: "સંદેશાઓ ગુજરાતીમાં.",
    //   },
    //   {
    //     lang: "Odia",

    //     emoji: "🇮🇳",
    //     desc: "ସନ୍ଦେଶ ଓଡ଼ିଆରେ.",
    //   },
    //   {
    //     lang: "Malayalam",

    //     emoji: "🇮🇳",
    //     desc: "സന്ദേശങ്ങൾ മലയാളത്തിൽ.",
    //   },
    // ];

    // const listOfSection = [
    //   {
    //     title: `🌐 Language Selection`,
    //     headers: `🌐 Language Selection`,
    //     rows: languageOptions.map((option) => {
    //       return {
    //         id: `${option.lang}`,
    //         title: option.lang,
    //         description: `${option.desc}`,
    //       };
    //     }),
    //   },
    // ];
    // const buttonname = "Select Language";
    // await sendRadioButtons(message, listOfSection, recipientPhone, buttonname);

    session.get(recipientPhone).session = `language-${sessionType}`;
  } else if (buttonId === "duallanguage") {
    const message =
      "\n You've chosen English complemented with your chosen secondary language.\n\n*Choose your secondary language.* ";

    const flowData = {
      screen: "Language",
      data: {
        languagesRadio: [
          {
            id: "English+Hindi",
            title: "English And Hindi",
          },
          {
            id: "English+Bengali",
            title: "English And Bengali",
          },
          {
            id: "English+Telugu",
            title: "English And Telugu",
          },
          {
            id: "English+Marathi",
            title: "English And Marathi",
          },
          {
            id: "English+Tamil",
            title: "English And Tamil",
          },
          {
            id: "English+Kannada",
            title: "English And Kannada",
          },
          {
            id: "English+Gujarati",
            title: "English And Gujarati",
          },
          {
            id: "English+Odia",
            title: "English And Odia",
          },
          {
            id: "English+Malayalam",
            title: "English And Malayalam",
          },
        ],
      },
    };

    await sendFlow({
      body: message,
      flow_cta: "Select Language",
      flow_data: flowData,
      flow_id: LANGUAGES_FLOW_ID,
      flow_token: LANGUAGES_FLOW_TOKEN,
      recipientPhone,
    });

    // const languageOptionsDescriptions = {
    //   "English+Hindi": {
    //     emoji: "🌐🇮🇳",
    //     desc: "द्विभाषी संदेश: अंग्रेजी और हिंदी में। ",
    //   },
    //   "English+Bengali": {
    //     emoji: "🌐",
    //     desc: "দ্বিভাষিক বার্তা: ইংরেজি এবং বাংলায়। ",
    //   },
    //   "English+Telugu": {
    //     emoji: "🌐📚",
    //     desc: "ద్విభాషా సందేశాలు: ఆంగ్ల మరియు తెలుగులో।",
    //   },
    //   "English+Marathi": {
    //     emoji: "🌐📖",
    //     desc: "द्विभाषिक संदेश: इंग्रजी आणि मराठीत।",
    //   },
    //   "English+Tamil": {
    //     emoji: "🌐🍃",
    //     desc: "இருமொழி செய்திகள்: ஆங்கிலம் மற்றும் தமிழில்। ",
    //   },
    //   "English+Kannada": {
    //     emoji: "🌐🌼",
    //     desc: "ದ್ವಿಭಾಷಾ ಸಂದೇಶಗಳು: ಇಂಗ್ಲಿಷ್ ಮತ್ತು ಕನ್ನಡದಲ್ಲಿ। ",
    //   },
    //   "English+Gujarati": {
    //     emoji: "🌐✍️",
    //     desc: "બીલિંગ્વલ મેસેજ: અંગ્રેજી અને ગુજરાતીમાં। ",
    //   },
    //   "English+Odia": {
    //     emoji: "🌐📝",
    //     desc: "ଦ୍ଵିଭାଷିକ ସନ୍ଦେଶ: ଇଂରାଜୀ ଏବଂ ଓଡ଼ିଆରେ।",
    //   },
    //   "English+Malayalam": {
    //     emoji: "🌐🌴",
    //     desc: "ദ്വിഭാഷാ സന്ദേശങ്ങൾ: ഇംഗ്ലീഷ് മലയാളത്തില്‍. ",
    //   },
    // };
    // const listOfSection = [
    //   {
    //     title: `🌐 Language Selection`,
    //     headers: `🌐 Language Selection`,
    //     rows: Object.keys(languageOptionsDescriptions).map((lang) => ({
    //       id: `${lang}`,
    //       title: lang,
    //       description: ` ${languageOptionsDescriptions[lang].desc}`,
    //     })),
    //   },
    // ];
    // const buttonname = "Select Language";

    // await sendRadioButtons(message, listOfSection, recipientPhone, buttonname);

    session.get(recipientPhone).session = `language-${sessionType}`;
  } else if (buttonId === "employe_report1") {
    await sendDocument({
      recipientPhone,
      caption: "Current Month Report",
      file_path: path.join(rootPath, "/public/EmployeeCurrentMonth.pdf"),
    });

    await delay(3000);

    const demoCompletedMessage = getTextMessage(language, "employeeDemoCompleted", [], BOT);

    await Whatsapp.sendImage({
      recipientPhone,
      caption: demoCompletedMessage,
      url: "https://i.postimg.cc/mkDw3z3t/Copy-of-Hi.png",
    });

    session.delete(recipientPhone);
  } else if (buttonId === "profile-settings") {
    const { listOfButtons, message } = getSimpleButtonsMessage(language, buttonId, [], BOT);

    await sendSimpleButtons(message, listOfButtons, recipientPhone);
  } else if (buttonId === "business-settings") {
    const message = getTextMessage(language, buttonId, [], BOT);

    const flowData = {
      screen: "Edit_Business",
      data: { ...message.label },
    };

    const { user } = session.get(recipientPhone);

    const employer = await Employer.findOne({
      employerNumber: user.companyNumber,
      _id: user.companyId,
    });

    if (employer) {
      flowData.data["init_values"] = {
        employerName: employer.fullName,
        employerNumber: `${employer.employerNumber}`,
        companyName: employer.companyName,
        bufferTime: String(employer.bufferTime),
        monthlySickLeave: employer.monthlySickLeave,
        casualLeave: employer.casualLeave,
        carryForwardLimit: employer.carryForwardLimit,
        annualLeave: employer.annualLeave,
        maternityLeaveAllowed: employer.maternityLeaveAllowed,
        paternityLeaveAllowed: employer.paternityLeaveAllowed,
        unpaidLeavePolicy: employer.unpaidLeavePolicy,
        leaveEncashment: employer.leaveEncashment,
        consequencesUnapprovedLeave: employer.consequencesUnapprovedLeave,
        halfDayPolicy: employer.halfDayPolicy,
        language: employer.language,
      };
    }

    await sendFlow({
      body: message.body,
      flow_cta: "Update",
      flow_data: flowData,
      flow_id: EDIT_BUSINESS_FLOW_ID,
      flow_token: EDIT_BUSINESS_FLOW_TOKEN,
      recipientPhone,
    });
  } else if (buttonId === "edit-delete") {
    const { listOfButtons, message } = getSimpleButtonsMessage(language, buttonId, [], BOT);
    await sendSimpleButtons(message, listOfButtons, recipientPhone);
  } else if (buttonId === "edit-timings") {
    const { user } = session.get(recipientPhone);
    let employees = await Employee.findEmployees(user.companyId);

    if (!employees || employees.length === 0) {
      employees = {
        employeeList1: [{ id: "noEmployees", title: "No Employees" }],
        employeeList2: [{ id: "noEmployees", title: "" }],
        employeeList3: [{ id: "noEmployees", title: "" }],
        employeeList4: [{ id: "noEmployees", title: "" }],
      };
    } else if (employees.length > 0) {
      employees = createEmployeeProperties(employees);
    }

    const message = getTextMessage(language, buttonId, [], BOT);

    const flowData = {
      screen: "Edit_Timings",
      data: {
        ...message.label,
        init_values: {
          workinghours: "09:00",
          checkin: "09:30",
          checkout: "18:30",
          workdays: [...employees.workDays.map(String)],
        },
        ...employees,
        shiftTyperadio: [
          {
            id: "day",
            title: "Day Shift (D)",
          },
          {
            id: "day/night",
            title: "Day/Night Shift (N)",
          },
        ],
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
      },
    };

    await sendFlow({
      body: message.body,
      flow_cta: "Edit Timings",
      flow_data: flowData,
      flow_id: EDIT_TIMING_FLOW_ID,
      flow_token: EDIT_TIMING_FLOW_TOKEN,
      recipientPhone,
    });
  } else if (buttonId === "notification-settings") {
    const { message, listOfButtons } = getSimpleButtonsMessage(language, buttonId, [], BOT);

    await sendSimpleButtons(message, listOfButtons, recipientPhone);
  } else if (buttonId === "edit-notifs") {
    let { notifications, companyName } = session.get(recipientPhone).user;

    if (!notifications) {
      notifications = await Employer.findNotfications(companyId);
    }

    const message = getTextMessage(language, buttonId, [companyName], BOT);

    const flowData = {
      screen: "Edit_Notifications",
      data: {
        ...message.label,
        init_values: {
          notifications: ["checkIn"],
          dailymorningreport:
            notifications && notifications.morningReportTime
              ? notifications.morningReportTime.toString()
              : "",
          dailyeveningreport:
            notifications && notifications.eveningReportTime
              ? notifications.eveningReportTime.toString()
              : "",
          monthendreport:
            notifications && notifications.monthEndReportTime
              ? notifications.monthEndReportTime.toString()
              : "",
        },
        all_extras: [
          {
            id: "checkIn",
            title: "Check-Ins",
          },
          {
            id: "checkOut",
            title: "Check-Outs",
          },
          {
            id: "leaveRequest",
            title: "Leave Requests",
          },
          {
            id: "support",
            title: "Support Requests",
          },
        ],
      },
    };

    await sendFlow({
      body: message.body,
      flow_cta: "Update",
      flow_data: flowData,
      flow_id: EDIT_NOTIFICATIONS_FLOW_ID,
      flow_token: EDIT_NOTIFICATIONS_FLOW_TOKEN,
      recipientPhone,
    });
  } else if (buttonId === "remove-employees") {
    const { user } = session.get(recipientPhone);
    const message = getTextMessage(language, buttonId, [user.companyName], BOT);

    let employees = await Employee.findEmployees(user.companyId);

    if (!employees || employees.length === 0) {
      employees = {
        employeeList1: [
          {
            id: "noEmployees",
            title: "No Employees",
          },
        ],
        employeeList2: [
          {
            id: "noEmployees",
            title: "",
          },
        ],
        employeeList3: [
          {
            id: "noEmployees",
            title: "",
          },
        ],
        employeeList4: [
          {
            id: "noEmployees",
            title: "",
          },
        ],
      };
    } else if (employees.length > 0) {
      employees = createEmployeeProperties(employees);
    }

    const flowData = {
      screen: "Remove_Employees",
      data: {
        ...message.label,
        ...employees,
      },
    };

    await sendFlow({
      body: message.body,
      flow_cta: "Remove",
      flow_data: flowData,
      flow_id: REMOVE_EMPLOYEES_FLOW_ID,
      flow_token: REMOVE_EMPLOYEES_FLOW_TOKEN,
      recipientPhone,
    });
  } else if (buttonId === "remove-branch") {
    const { user } = session.get(recipientPhone);
    const message = getTextMessage(language, buttonId, [], BOT);

    let { locations, employees } = await Employee.findLocationsAndEmployees(
      recipientPhone,
      user.companyId
    );

    if (!employees || employees.length === 0) {
      employees = {
        employeeList1: [
          {
            id: "noEmployees",
            title: "No Employees",
          },
        ],
        employeeList2: [
          {
            id: "noEmployees",
            title: "",
          },
        ],
        employeeList3: [
          {
            id: "noEmployees",
            title: "",
          },
        ],
        employeeList4: [
          {
            id: "noEmployees",
            title: "",
          },
        ],
      };
    } else if (employees.length > 0) {
      employees = createEmployeeProperties(employees);
    }

    const flowData = {
      screen: "Remove_Branch",
      data: {
        ...message.label,
        branch: [
          { id: "Any Location", title: "Any Location" },
          ...[...locations].map((location) => ({
            id: location,
            title: location,
          })),
        ],
        ...employees,
      },
    };

    await sendFlow({
      body: message.body,
      flow_cta: "Remove",
      flow_data: flowData,
      flow_id: REMOVE_BRANCH_FLOW_ID,
      flow_token: REMOVE_BRANCH_FLOW_TOKEN,
      recipientPhone,
    });
  } else if (buttonId === "shortdemo") {
    // TODO: implement a short demo
  } else if (buttonId === "yes-geofencing") {
    await sendTextMessage(
      "To add Geo Fencing feature please share current location of your place",
      recipientPhone
    );
    session.get(recipientPhone).session = "addBranch";
  } else if (buttonId === "no-geofencing") {
    const message = getTextMessage(language, "uploadEmployee", [], BOT);
    await Whatsapp.sendImage({
      recipientPhone,
      caption: message,
      url: "https://i.ibb.co/Njkhcnb/5dc415a6-1caf-45d9-8f65-f41188215194.jpg",
    });
  } else if (buttonId === "edit-geo-fencing") {
    const { user } = session.get(recipientPhone);

    let employees = await Employee.findEmployees(user.companyId);
    let { branch: locations } = await Employer.findBranch(recipientPhone, user.companyId);

    if (!employees || employees.length === 0) {
      employees = {
        employeeList1: [{ id: "noEmployees", title: "No Employees" }],
        employeeList2: [{ id: "noEmployees", title: "" }],
        employeeList3: [{ id: "noEmployees", title: "" }],
        employeeList4: [{ id: "noEmployees", title: "" }],
      };
    } else if (employees.length > 0) {
      employees = createEmployeeProperties2(employees);
    }

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

    const flowData = {
      screen: "Edit_Geo_Fencing",
      data: {
        timingTypeLabel: "Timing Type",
        branchLabel: "Places",
        employeesLabel: "Employees",
        branches: locations,
        ...employees,
      },
    };

    await sendFlow({
      body: "Edit Geo Fencing of Employees by clicking the below button",
      flow_cta: "Edit Locations",
      flow_data: flowData,
      flow_id: EDIT_GEO_LOCATION_FLOW_ID,
      flow_token: EDIT_GEO_LOCATION_FLOW_TOKEN,
      recipientPhone,
    });
  } else if (buttonId === "delete") {
    const { message, listOfButtons } = getSimpleButtonsMessage(language, buttonId, [], BOT);
    await sendSimpleButtons(message, listOfButtons, recipientPhone);
  } else if (buttonId === "yesterdayReport") {
    let { companyId, language, timeZone } = session.get(recipientPhone).user;
    language = language.split("+")?.[1] ?? language;

    const isLiveReport = await createLiveReport(
      recipientPhone,
      companyId,
      language,
      timeZone,
      "yesterday"
    );

    if (isLiveReport) {
      await sendDocument({
        recipientPhone,
        file_path: path.join(rootPath, `${recipientPhone}-liveReport.pdf`),
        caption: "Live Report",
      });
      await deleteFile(`${recipientPhone}-liveReport.pdf`);
    } else {
      await sendTextMessage("No data", recipientPhone);
    }
  } else if (buttonId === "dateRangeReport") {
    const { registeredOn } = session.get(recipientPhone).user;
    const currentTime = new Date().getTime();

    const message = getTextMessage(language, buttonId, [], BOT);

    const flowData = {
      screen: "Date_Range",
      data: {
        minDate: registeredOn.toString(),
        maxDate: currentTime.toString(),
        ...message.label,
      },
    };

    await sendFlow({
      body: message.body,
      flow_cta: "Report",
      flow_data: flowData,
      flow_id: DATE_RANGE_FLOW_ID,
      flow_token: DATE_RANGE_FLOW_TOKEN,
      recipientPhone,
    });
  } else if (buttonId.startsWith("logs")) {
    const [, docId] = buttonId.split("-");
    const { logText, logPicUrl, logDocUrl, user } = session.get(recipientPhone);

    let log = {};

    if (logText) {
      log = { type: "text", log: logText };
    } else if (logPicUrl) {
      log = { type: "image", log: logPicUrl };
    } else if (logDocUrl) {
      log = { type: "document", log: logDocUrl };
    }

    const att = await Attendance.findByIdAndUpdate(
      docId,
      {
        $push: {
          logs: [{ logType: log.type, log: log.log, time: moment.tz(new Date(), user.timeZone) }],
        },
      },
      { new: true }
    );

    if (att) {
      await sendTextMessage("your attendance log has been updated", recipientPhone);
    }

    session.delete(recipientPhone);
  } else if (buttonId === "chatWithAI") {
    //
  } else if (buttonId.startsWith("empFl")) {
    const { employeeId, timeZone, createdAt, workDays, role } = JSON.parse(buttonId.split("@")[1]);

    const date = moment.tz(new Date(), timeZone);
    const startDate = getRegisteredDate(createdAt, date);

    const monthStart = moment.tz(new Date(date.year(), date.month(), 1, 0, 0, 0), timeZone);
    const monthEnd = moment.tz(
      new Date(date.year(), date.month(), date.daysInMonth(), 0, 0, 0),
      timeZone
    );

    if (startDate !== -1) {
      monthStart.set("date", startDate);
      monthEnd.set("date", date.date());
    }

    const attendances = await Attendance.aggregate([
      {
        $match: {
          employeeId,
          $and: [{ date: { $gte: new Date(monthStart) } }, { date: { $lte: new Date(monthEnd) } }],
        },
      },
      {
        $project: {
          _id: 0,
          year: { $year: { date: "$date", timezone: timeZone } },
          month: { $month: { date: "$date", timezone: timeZone } },
          day: { $dayOfMonth: { date: "$date", timezone: timeZone } },
          id: "$_id",
          checkIn: "$checkInTime",
          checkOut: "$checkOutTime",
        },
      },
    ]);
    const weekOffDays = getWeekOffDays(workDays);
    const workingDays = getWorkingDaysInMonth(monthStart, date, weekOffDays);

    let absentDays = _.differenceWith(
      workingDays,
      attendances.map((attendance) => [attendance.year, attendance.month, attendance.day]),
      _.isEqual
    );
    let forgetDays = attendances.filter(
      (attendance) => !attendance.checkIn || !attendance.checkOut
    );

    if (forgetDays.length > 0) {
      forgetDays = forgetDays.map((forgetDay) => {
        const desc = forgetDay.checkOut ? "Forget To Check In: " : "Forget to Check Out: ";

        const date = moment.tz(
          new Date(forgetDay.year, forgetDay.month - 1, forgetDay.day, 0, 0, 0),
          timeZone
        );
        return {
          id: `${forgetDay.id}@${date.toJSON()}`,
          title: date.format("DD/MM/YYYY"),
          description: `${desc} ${date.format("DD/MM/YYYY")}`,
        };
      });
    } else {
      forgetDays = [
        {
          id: "null",
          title: "No Data",
          description: "No Data Found",
        },
      ];
    }

    if (absentDays.length > 0) {
      absentDays = absentDays.map((absentDay) => {
        const date = moment.tz(
          new Date(absentDay[0], absentDay[1] - 1, absentDay[2], 0, 0, 0),
          timeZone
        );
        return {
          id: date.toDate(),
          title: date.format("DD/MM/YYYY"),
          description: `Not Marked on: ${date.format("DD/MM/YYYY")}`,
        };
      });
    } else {
      absentDays = [
        {
          id: "null",
          title: "No Data",
          description: "No Data Found",
        },
      ];
    }

    const flowData = {
      screen: "Employee_Management",
      data: {
        // ...message.label,
        reportsLabel: "Reports",
        attendanceCorrectionTitle: "Attendance Correction",
        markOnDutyLabel: "Mark On Duty",
        leaveRequestTitle: "Leave Requests",
        supportTitle: "Support",
        forgetInOutLabel: "Forget In/Out",
        reportsRadio: [
          {
            id: "current",
            title: "Current Month Report",
          },
          {
            id: "previous",
            title: "Previous Month Report",
          },
          {
            id: "customDateRange",
            title: "Date Range Report",
          },
        ],
        leaveRequestRadio: [
          {
            id: "oneDay",
            title: "One Day Leave",
          },
          {
            id: "manyDay",
            title: "Many Day Leave",
          },
        ],
        supportDropdown: [
          {
            id: "check-in",
            title: "Check IN",
            description: "Check In Issue",
          },
          {
            id: "check-out",
            title: "Check OUT",
            description: "Check Out Issue",
          },
          {
            id: "salary-issue",
            title: "Salary Issue",
            description: "Salary Issue",
          },
          {
            id: "other-issue",
            title: "Other",
            description: "Other Issue",
          },
        ],
        markOnDutyDropdown: absentDays,
        forgetInOutDropdown: forgetDays,
        init_values: {
          userData: buttonId.split("@")[1],
        },
        userData: buttonId.split("@")[1],
      },
    };

    if (role === "coowner") {
      const extraReports = [
        {
          id: "liveReport",
          title: "Live Report",
        },
        {
          id: "yesterdayreport",
          title: "Yesterday Report",
        },
        {
          id: "customdaterangepdf",
          title: "Custom Date Report (PDF)",
        },
      ];
      flowData.data.reportsRadio.push(...extraReports);
    }

    await sendFlow({
      // body: message.body,
      body: "Employee Management",
      flow_cta: "Manage",
      flow_data: flowData,
      flow_id: EMPLOYEE_FLOW_ID,
      flow_token: EMPLOYEE_FLOW_TOKEN,
      recipientPhone,
    });
  } else if (buttonId.startsWith("att-corr")) {
    const [, status, sessionData] = buttonId.split("@");
    const { documentId } = JSON.parse(sessionData);

    const res = await Attendance.updateOne(
      { _id: documentId },
      {
        $set: {
          "creationType.status": status,
        },
      }
    );

    if (res && res.acknowledged) {
      await sendTextMessage(`request has been ${status}ed`, recipientPhone);
    }
  } else if (buttonId.startsWith("coowner")) {
    const [, status, employeeId, rights, employerNumber] = buttonId.split("@");

    if (status === "accept") {
      const res = await Employee.updateOne({ _id: employeeId }, { role: "coowner", rights });

      if (res && res.acknowledged) {
        await sendTextMessage(
          `you are now a coowner. employer will be notified of your action`,
          recipientPhone
        );
      }
    } else if (status === "reject") {
      await sendTextMessage(
        "You have rejected the request to become a coowner. employer will be notified of your action.",
        recipientPhone
      );
    }

    await sendTextMessage(`your request to add a coowner has been ${status}ed`, employerNumber);
  } else if (buttonId.startsWith("empOwn")) {
    const [, action, name, number, companyId, employeeId, companyName, logId] = buttonId.split("@");

    if (action === "continue") {
      const message = `Hello ${name},\n\nYou have been requested by ${name} to become the owner of ${companyName}. To accept the request click on "Accept" button, othewise to reject click on "Reject" Button`;
      const listOfButtons = [
        {
          id: `addOwn@accept@${name}@${number}@${companyId}@${employeeId}@${recipientPhone}@${logId}`,
          title: "Accept",
        },
        {
          id: `addOwn@reject@${name}@${number}@${companyId}@${employeeId}@${recipientPhone}@${logId}`,
          title: "Reject",
        },
      ];
      await sendSimpleButtons(message, listOfButtons, number);
      await sendTextMessage(`A confirmation request has been to ${name}.`, recipientPhone);
    } else if (action === "cancel") {
      const message = "Tranfer Ownership operation cancelled.";
      await sendTextMessage(message, recipientPhone);
      await OwnerTransferLogs.findByIdAndUpdate(logId, { status: "cancelled" });
      session.delete(recipientPhone);
    }
  } else if (buttonId.startsWith("addOwn")) {
    const [, action, userData] = buttonId.split("@");
    const recipient = JSON.parse(userData);

    if (action === "accept") {
      if (recipient.employeeId == "undefined") {
        const newOwner = await Employer.findByIdAndUpdate(
          companyId,
          {
            employerNumber: recipient.employeeNumber,
            fullName: recipient.employeeName,
          },
          { new: true }
        );

        if (newOwner) {
          const update = await Employee.updateMany(
            { companyId },
            { employerNumber: recipient.employerNumber }
          );

          if (update && update.acknowledged) {
            await sendTextMessage(
              `Process of owner transfer was successfull. Now you are no longer associated with ${newOwner.companyName}.`,
              recipient.employerNumber
            );
            await sendTextMessage(
              `You are now the new owner of ${newOwner.companyName}.`,
              recipient.employeeNumber
            );

            await OwnerTransferLogs.findByIdAndUpdate(recipient.logId, {
              "to.updatedAt": moment.tz(new Date(), newOwner.timeZone),
              status: "accepted",
            });

            session.delete(recipientPhone);
            session.delete(recipient.employerNumber);
          }
        }
      } else {
        const employee = await Employee.findByIdAndDelete(recipient.employeeId);

        if (employee) {
          const owner = await Employer.findByIdAndUpdate(
            companyId,
            {
              employerNumber: recipient.employeeNumber,
              fullName: recipient.employeeName,
            },
            { new: true }
          );

          if (owner) {
            const update = await Employee.updateMany(
              { companyId },
              { employerNumber: recipient.employeeNumber }
            );

            if (update.acknowledged) {
              await sendTextMessage(
                `${recipient.employeeName} has accepted the request and process of owner transfer was successfull. Now you are no longer associated with ${owner.companyName}.`,
                recipient.employerNumber
              );
              await sendTextMessage(
                `You are now the new owner of ${owner.companyName}.`,
                recipient.employeeNumber
              );

              await OwnerTransferLogs.findByIdAndUpdate(recipient.logId, {
                "to.updatedAt": moment.tz(new Date(), owner.timeZone),
                status: "accepted",
              });
            }
          }
        }

        session.delete(recipientPhone);
        session.delete(recipient.employerNumber);
      }
    } else if (action === "reject") {
      const transferLog = await OwnerTransferLogs.findOne({
        _id: recipient.logId,
        status: "pending",
      });

      if (transferLog) {
        await transferLog.updateOne({ status: "rejected" });

        await sendTextMessage("You have rejected the transfer of ownership", recipientPhone);
        await sendTextMessage(
          `Transfer of ownership request has been rejected by ${recipient.employeeName}`,
          recipient.employerNumber
        );
      } else {
        await sendTextMessage(
          "You already took an action, no other action will be taken.",
          recipientPhone
        );
      }
    }
  } else if (buttonId.startsWith("delAcc")) {
    const [, action, companyId] = buttonId.split("@");

    if (action === "confirm") {
      const delRes = await Employer.deleteOne({ _id: companyId });

      if (delRes.acknowledged) {
        const res = await Employee.deleteMany({ companyId });

        if (res.acknowledged) {
          const message = "Your account has been deleted.";
          await sendTextMessage(message, recipientPhone);
          session.delete(recipientPhone);
        }
      }
    } else if (action === "cancel") {
      const message = "Request to Delete Your Business Account has been cancelled.";
      await sendTextMessage(message, recipientPhone);
    }
  }
}

async function handleMarkAttendance({ buttonId, session, recipientPhone }) {
  session.get(recipientPhone).action = buttonId;

  const {
    user: { language, companyId, employeeId, shiftType },
  } = session.get(recipientPhone);

  let attendanceExists;
  let { message, listOfButtons } = getSimpleButtonsMessage(language, buttonId, [], BOT);

  if (shiftType === "day/night") {
    const date = new Date();

    attendanceExists = await Attendance.find({
      employeeId,
      companyId,
      date: { $eq: new Date(date.getFullYear(), date.getMonth(), date.getDate()) },
    });

    if (attendanceExists.length === 0) {
      date.setDate(date.getDate() - 1);

      attendanceExists = await Attendance.find({
        employeeId,
        companyId,
        date: { $eq: new Date(date.getFullYear(), date.getMonth(), date.getDate()) },
      });

      if (attendanceExists.length === 0) {
        listOfButtons = listOfButtons.filter((button) => button.id === "in");
      } else if (attendanceExists.length > 0) {
        attendanceExists = attendanceExists[attendanceExists.length - 1];

        if (attendanceExists.checkInTime && attendanceExists.checkOutTime) {
          listOfButtons = listOfButtons.filter((button) => button.id === "in");
        } else {
          listOfButtons = listOfButtons.filter((button) => button.id === "out");
        }
      }
    } else if (attendanceExists.length > 0) {
      attendanceExists = attendanceExists[attendanceExists.length - 1];

      if (attendanceExists.checkInTime && attendanceExists.checkOutTime) {
        listOfButtons = listOfButtons.filter((button) => button.id === "in");
      } else {
        listOfButtons = listOfButtons.filter((button) => button.id === "out");
      }
    }
  } else {
    attendanceExists = await Attendance.findAttendance(employeeId, companyId);

    if (attendanceExists.length === 0) {
      listOfButtons = listOfButtons.filter((button) => button.id === "in");
    } else if (attendanceExists) {
      if (attendanceExists.checkInTime && attendanceExists.checkOutTime) {
        listOfButtons = listOfButtons.filter((button) => button.id === "in");
      } else {
        listOfButtons = listOfButtons.filter((button) => button.id === "out");
      }
    }
  }

  await sendSimpleButtons(message, listOfButtons, recipientPhone);
}

async function handleIn({ buttonId, session, recipientPhone }) {
  const { user } = session.get(recipientPhone);
  const { language, proof } = user;

  session.get(recipientPhone).action = buttonId;

  if (proof.location) {
    const message = getTextMessage(language, buttonId, [], BOT);

    await Whatsapp.sendImage({
      recipientPhone,
      caption: message,
      url: "https://i.ibb.co/YZqQd4w/Copy-of-Hi-2.png",
    });
  } else if (proof.image) {
    session.get(recipientPhone).latitude = "0";
    session.get(recipientPhone).longitude = "0";

    session.get(recipientPhone).session = "markAttendance";

    const message = getTextMessage(language, "attendanceLocation", [], BOT);
    await sendTextMessage(message, recipientPhone);
  } else {
    const { name, address } = await markAttendance(buttonId, recipientPhone, {}, user);
    await sendTextMessage(`${address}\n${name}`, recipientPhone);
  }
}

async function handleRequestLeave({ buttonId, session, recipientPhone }) {
  session.get(recipientPhone).action = buttonId;

  const { language } = session.get(recipientPhone).user;
  const { message, listOfButtons } = getSimpleButtonsMessage(language, buttonId, [], BOT);

  await sendSimpleButtons(message, listOfButtons, recipientPhone);
}

async function handleOneDay({ buttonId, session, recipientPhone }) {
  session.get(recipientPhone).leave = buttonId;

  const message = getTextMessage(session.get(recipientPhone).user.language, buttonId, [], BOT);

  const currentDate = new Date();
  const flowData = {
    screen: "Request_Leave_One",
    data: {
      minDate: currentDate.getTime().toString(),
      maxDate: getSixMonthsInMs(currentDate).toString(),
      ...message.label,
    },
  };

  await sendFlow({
    body: message.body,
    flow_id: ONE_DAY_LEAVE_FLOW_ID,
    flow_token: ONE_DAY_LEAVE_FLOW_TOKEN,
    flow_cta: "Select Date",
    flow_data: flowData,
    recipientPhone,
  });
}

async function handleMoreThanOne({ buttonId, session, recipientPhone }) {
  session.get(recipientPhone).leave = buttonId;

  const message = getTextMessage(session.get(recipientPhone).user.language, buttonId, [], BOT);

  const currentDate = new Date();

  const flowData = {
    screen: "Request_Leave_Many",
    data: {
      ...message.label,
      minDate: currentDate.getTime().toString(),
      maxDate: getSixMonthsInMs(currentDate).toString(),
    },
  };

  await sendFlow({
    body: message.body,
    flow_id: MANY_DAY_LEAVE_FLOW_ID,
    flow_token: MANY_DAY_LEAVE_FLOW_TOKEN,
    flow_cta: "Pick a Date",
    flow_data: flowData,
    recipientPhone,
  });
}

async function handleUpdateLeaveRequest({ buttonId, session, recipientPhone }) {
  const { user } = session.get(recipientPhone);
  const [status, employeeId, ticketNumber] = buttonId.split("-");

  const res = await Leave.updateStatus(employeeId, ticketNumber, status.split("_")[1]);

  if (res) {
    const language = user.language;
    const message = getTextMessage(language, "ticketUpdate", [ticketNumber], BOT);

    await sendTextMessage(message, recipientPhone);

    const employee = await Employee.findOne({ _id: employeeId }, { employeeNumber: 1 });

    const empMsg = getTextMessage(language, status, [], BOT);
    await sendTextMessage(empMsg, employee.employeeNumber);
  } else {
    await sendTextMessage("Failed to update status", recipientPhone);
  }
}

async function handleApprovals({ buttonId, recipientPhone, session }) {
  const { language } = session.get(recipientPhone).user;

  const { message, listOfButtons } = getSimpleButtonsMessage(language, buttonId, [], BOT);

  await sendSimpleButtons(message, listOfButtons, recipientPhone);
}

async function handleGetReport({ buttonId, session, recipientPhone }) {
  const { language } = session.get(recipientPhone).user;

  const { message, listOfSections } = getRadioButtonsMessage(language, buttonId, [], BOT);

  await sendRadioButtons(message, listOfSections, recipientPhone, "Reports");
}

async function handleLeaveApprove({ session, recipientPhone }) {
  const { user } = session.get(recipientPhone);
  const leaves = await Leave.findActiveLeaves(user.companyId);

  if (leaves && leaves.length > 0) {
    await Promise.allSettled(
      leaves.map(async (leave) => {
        const { leaveType, reason, from, to, ticketNo, employeeId } = leave;

        const employee = await Employee.findOne(
          { _id: employeeId, companyId: user.companyId },
          { employeeName: 1, employeeNumber: 1 }
        );

        const [startDate] = getTimeZoneAwareDate(user.timezone, from);
        const [endDate] = to ? getTimeZoneAwareDate(user.timezone, to) : ["Invalid Date"];

        const { message, listOfButtons } = getSimpleButtonsMessage(
          user.language,
          "sendLeave",
          [employee.employeeName, leaveType, startDate, endDate, reason],
          BOT
        );

        await sendSimpleButtons(message, listOfButtons(employeeId, ticketNo), recipientPhone);
      })
    );
  } else {
    await sendTextMessage("No Leave Requests Pending Approval", recipientPhone);
  }
}

async function handleActiveIssues({ recipientPhone, session }) {
  const { language, companyId } = session.get(recipientPhone).user;

  const issues = await Issue.findActive(companyId);

  if (issues && issues.length > 0) {
    await Promise.allSettled(
      issues.map(async (issue) => {
        const { employeeId, issueType, remark, ticketNumber } = issue;
        const employee = await Employee.findOne(
          { _id: employeeId },
          { employeeName: 1, employeeNumber: 1 }
        );

        const { message, listOfButtons } = getSimpleButtonsMessage(
          language,
          "sendIssue",
          [
            employee.employeeName,
            issue.department,
            issueType,
            remark,
            employee.employeeNumber,
            ticketNumber,
          ],
          BOT
        );

        await sendSimpleButtons(message, listOfButtons(employeeId, ticketNumber), recipientPhone);
      })
    );
  } else {
    sendTextMessage("No active issues found.", recipientPhone);
  }
}

async function handleUpdateIssue({ buttonId, session, recipientPhone }) {
  const { user } = session.get(recipientPhone);
  const [status, employeeId, ticketNumber] = buttonId.split("-");

  const res = await Issue.updateStatus(ticketNumber, status.split("_")[1], employeeId);

  if (res) {
    const message = getTextMessage(user.language, "ticketUpdate", [ticketNumber], BOT);
    await sendTextMessage(message, recipientPhone);
  }
}

async function handleLiveReport({ recipientPhone, session }) {
  let { companyId, language, timeZone } = session.get(recipientPhone).user;
  language = language.split("+")?.[1] ?? language;

  const isLiveReport = await createLiveReport(recipientPhone, companyId, language, timeZone);

  if (isLiveReport) {
    await sendDocument({
      recipientPhone,
      file_path: path.join(rootPath, `${recipientPhone}-liveReport.pdf`),
      caption: "Live Report",
    });
    await deleteFile(`${recipientPhone}-liveReport.pdf`);
  } else {
    await sendTextMessage("No data", recipientPhone);
  }
}

async function handleReport({ recipientPhone, buttonId, session }) {
  const { language } = session.get(recipientPhone).user;

  const { message, listOfButtons } = getSimpleButtonsMessage(language, buttonId, [], BOT);
  await sendSimpleButtons(message, listOfButtons, recipientPhone);
}

async function handleCurrentMonth({ recipientPhone, session }) {
  const { user } = session.get(recipientPhone);
  const language = user.language.split("+")?.[1] ?? user.language;

  const isReportCreated = await createEmployeeReport("current", user.employeeId, language);

  if (isReportCreated) {
    await sendDocument({
      file_path: path.join(rootPath, `${user.employeeId}-employeeReport.pdf`),
      caption: "Current Month Report",
      recipientPhone,
    });

    await deleteFile(`${user.employeeId}-employeeReport.pdf`);
  } else {
    await sendTextMessage("There is no data", recipientPhone);
  }
}

async function handlePreviousMonth({ recipientPhone, session }) {
  const { user } = session.get(recipientPhone);
  const language = user.language.split("+")?.[1] ?? user.language;

  const isReportCreated = await createEmployeeReport("previous", user.employeeId, language);

  if (isReportCreated) {
    await sendDocument({
      file_path: path.join(rootPath, `${user.employeeId}-employeeReport.pdf`),
      caption: "Previous Month Report",
      recipientPhone,
    });
  } else {
    await sendTextMessage("There is no data", recipientPhone);
  }

  await deleteFile(`${user.employeeId}-employeeReport.pdf`);
}

async function handleEmpMasterSheet({ recipientPhone, session }) {
  let { companyId, language } = session.get(recipientPhone).user;
  language = language.split("+")?.[1] ?? language;
  const isReport = await createAllEmployeeReport(recipientPhone, companyId, language);

  if (isReport) {
    await sendDocument({
      file_path: `${recipientPhone}-allEmployeeReport.pdf`,
      caption: "All Employees Report",
      recipientPhone,
    });

    await fs.unlink(`${recipientPhone}-allEmployeeReport.pdf`);
  } else {
    sendTextMessage("There is no Employees.", recipientPhone);
  }
}

async function handleEmpDemo({ session, recipientPhone }) {
  const { language } = session.get(recipientPhone).user;

  const { message, listOfButtons } = getSimpleButtonsMessage(
    language,
    "employeeDemoStart",
    [],
    BOT
  );
  await sendSimpleButtons(message, listOfButtons, recipientPhone);
}

async function addEmployee({ buttonId, session, recipientPhone }) {
  const [, empName, empNumber] = buttonId.split("__@");
  const { language, companyId, companyName } = session.get(recipientPhone).user;

  let bufferTime = session.get(recipientPhone).user.bufferTime;

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
    employeeName: empName,
    employeeNumber: empNumber.split(" ").join("").replace("+", ""),
    companyId,
    companyName,
    employerNumber: recipientPhone,
    checkIn: new Date(...EPOCH, 9, 30),
    checkOut: new Date(...EPOCH, 18, 30),
    requiredHours: nineHoursInMs,
    bufferTime,
  };

  await Employee.create(data);

  const message = getTextMessage(language, "employeeUploaded", [], BOT);

  await Whatsapp.sendImage({
    recipientPhone,
    caption: message,
    url: "https://i.ibb.co/S6XxtXy/Hi-2.png",
  });

  await sendEmployeeDemoTemplate(`${companyName}`, empNumber.split(" ").join(""));
}

async function handleEditEmployee({ buttonId, recipientPhone, session }) {
  const [, employeeName, employeeNumber] = buttonId.split("__@");
  const { user } = session.get(recipientPhone);

  const employee = await Employee.findOne({
    employeeNumber,
    companyId: user.companyId,
  });

  let employees = await Employee.findEmployees(user.companyId);
  let { branch: locations } = await Employer.findBranch(recipientPhone, user.companyId);

  if (!employees || employees.length === 0) {
    employees = {
      employeeList1: [{ id: "noEmployees", title: "No Employees" }],
      employeeList2: [{ id: "noEmployees", title: "" }],
      employeeList3: [{ id: "noEmployees", title: "" }],
      employeeList4: [{ id: "noEmployees", title: "" }],
    };
  } else if (employees.length > 0) {
    employees = createEmployeeProperties2(employees);
  }

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

  const message = getTextMessage(user.language, "editEmployee", [], BOT);

  const flowData = {
    screen: "Edit_Employee",
    data: {
      ...message.label,
      init_values: {
        employeeName: employeeName,
        employeeNumber: employeeNumber,
        workinghours: "09:00",
        timing: "flexible",
        checkin: "09:30",
        checkout: "18:30",
        branch: ["Any Location"],
      },
      all_extras: locations,
    },
  };

  if (employee) {
    const data = {
      employeeName: employee.employeeName,
      employeeNumber: employee.employeeNumber.toString(),
      checkin: convertTo24HourFormat(employee.checkIn),
      checkout: convertTo24HourFormat(employee.checkOut),
      workinghours: employee.workingHours,
      joiningDate: employee.joiningDate.day ?? "",
      dateOfBirth: employee.dateOfBirth ?? "",
      timing: employee.natureOfTime.toLocaleLowerCase(),
      branch: ["1"],
    };

    const branch = employee.locations.map(
      (location) =>
        location.name + "_@_" + location.lat + "_@_" + location.long + "_@_" + location.range
    );

    flowData.data.init_values = {
      ...data,
      branch: branch,
    };
  }

  await sendFlow({
    header: "Edit Employee",
    body: message.body,
    flow_cta: "Edit Employee",
    flow_token: EDIT_EMPLOYEE_FLOW_TOKEN,
    flow_id: EDIT_EMPLOYEE_FLOW_ID,
    flow_data: flowData,
    recipientPhone,
  });
}

function createEmployeeProperties2(employees) {
  const result = {
    employeeList1: [],
    employeeList2: [],
    employeeList3: [],
    employeeList4: [],
  };

  const checkboxes = employees.map((employee) => {
    return {
      id: `${employee.employeeNumber}`,
      title: createFormattedString2(
        employee.employeeName,
        employee.natureOfTime === "flexible" ? "Flexible" : "Fixed",
        employee.locations?.[0]?.name
      ),
    };
  });

  const arrs = splitArray(checkboxes);

  arrs.forEach((arr, i) => {
    result[`employeeList${i + 1}`].push(...arr);
  });

  return result;
}

function createFormattedString2(userName, timingType, branch) {
  const nameAbbreviation = `${userName.split(" ")[0].slice(0, 5)}${
    userName.split(" ")[1]?.charAt(0) ?? ""
  }`;

  let formattedString = `${nameAbbreviation} (${timingType}) (${branch ?? "Any"})`;

  if (formattedString.length > 30) {
    return formattedString.slice(0, 30);
  }

  return formattedString;
}

function splitArray(arrs) {
  const arrayLength = arrs.length;
  const chunkLength = 4;

  if (arrayLength >= chunkLength) {
    const result = [];
    const equalChunkLength = Math.floor(arrayLength / chunkLength);
    const leftOverLength = arrayLength % chunkLength;

    for (let i = 0; i < chunkLength; i++) {
      result.push(arrs.slice(i * equalChunkLength, (i + 1) * equalChunkLength));
    }

    if (leftOverLength > 0) {
      result[0].push(...arrs.slice(arrayLength - leftOverLength));
    }

    return result;
  } else {
    const chunkLeft = chunkLength - arrayLength;
    return [
      ...arrs.map((arr) => [{ ...arr }]),
      ...Array.from({ length: chunkLeft }, () => [{ id: "none", title: "" }]),
    ];
  }
}

function convertTo24HourFormat(time) {
  return time.toLocaleTimeString("en-US", {
    timezone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getWorkingDaysInMonth(startDate, monthEnd, weekOffDays) {
  // const totalDays = Math.abs(startDate.date() - (startDate.daysInMonth() + 1));
  const workingDaysInMonth = [];

  for (let date = 1; date <= monthEnd.date(); date++) {
    if (!weekOffDays.includes(startDate.day())) {
      workingDaysInMonth.push([startDate.year(), startDate.month() + 1, startDate.date()]);
    }
    startDate.set("date", startDate.date() + 1);
  }

  return workingDaysInMonth;
}

function getWeekOffDays(workDaysInWeek) {
  const weekOffDays = [];

  for (let i = 0; i < 7; i++) {
    if (!workDaysInWeek.includes(i)) {
      weekOffDays.push(i);
    }
  }

  return weekOffDays;
}

export default handleSimpleButtonMessage;
