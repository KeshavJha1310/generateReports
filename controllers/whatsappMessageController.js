import WhatsappCloudAPI from "whatsappcloudapi_wrapper";
import cron from "node-cron";
import path from "path";
import moment from "moment-timezone";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootPath = path.dirname(__dirname);

import {
  handleTextMessage,
  handleSimpleButtonMessage,
  handleRadioButtonMessage,
  handleLocationMessage,
  handleMediaMessage,
  handleFlowMessage,
  handleContactMessage,
  handleQuickReplyMessage,
} from "../msgHandlers/index.js";

import {
  ONE_DAY_LEAVE_FLOW_ID,
  ONE_DAY_LEAVE_FLOW_TOKEN,
  MANY_DAY_LEAVE_FLOW_ID,
  MANY_DAY_LEAVE_FLOW_TOKEN,
  SIGN_UP_FLOW_ID,
  SIGN_UP_FLOW_TOKEN,
  ATTENDANCE_FLOW_ID,
  ATTENDANCE_FLOW_TOKEN,
  CREATEDAILY_TASKX_FLOW_ID,
  CREATEDAILY_TASKX_TOKEN,
  CREATEWEEKLY_TASKX_FLOW_ID,
  CREATEWEEKLY_TASKX_TOKEN,
  CREATEMONTHLY_TASKX_FLOW_ID,
  CREATEMONTHLY_TASKX_TOKEN,
  LANGUAGES_FLOW_ID,
  LANGUAGES_FLOW_TOKEN,
} from "../utils/constants.js";

import {
  sendActivateSessionTemplate,
  sendFlow,
  sendDocument,
  sendLocation,
  sendVideo,
} from "../utils/messages.js";

import {
  getTextMessage,
  getSimpleButtonsMessage,
  // getRadioButtonsMessage,
} from "../utils/languages.js";

import Demo from "../models/demoModel.js";
import { Employer, Employee } from "../models/index.js";

import {
  getSixMonthsInMs,
  delay,
  getTimeZone,
  getDateParts,
  getMediaUrl,
  isCheckIn,
  downloadAndSave,
} from "../utils/utils.js";
import { createLiveReport, createSOP } from "../reports.js";
import TaskModel from "../models/createdailytaskModel.js";
import WeeklyTaskModel from "../models/createweeklytaskModel.js";
import MonthlyTaskModel from "../models/createmonthlytaskModel.js";

import { uploadToBucket } from "../utils/bucket.js";

export const Whatsapp = new WhatsappCloudAPI({
  accessToken: process.env.Meta_WA_accessToken,
  senderPhoneNumberId: process.env.Meta_WA_SenderPhoneNumberId,
  WABA_ID: process.env.Meta_WA_wabaId,
});

//const rootPath = process.env.ROOT_PATH;

const session = new Map();
const DemoBotSession = new Map();

const ONE_HOUR_IN_MS = 3600 * 1000;

const messageHandler = {
  text_message: (msg, recipientPhone, session) =>
    handleTextMessage({ message: msg.text.body, recipientPhone, session }),
  simple_button_message: (msg, recipientPhone, session) =>
    handleSimpleButtonMessage({
      buttonId: msg.button_reply.id,
      session,
      recipientPhone,
    }),
  radio_button_message: (msg, recipientPhone, session) =>
    handleRadioButtonMessage({
      buttonId: msg.list_reply.id,
      session,
      recipientPhone,
    }),
  location_message: (msg, recipientPhone, session) =>
    handleLocationMessage({
      incomingMessage: msg,
      recipientPhone,
      session,
    }),
  media_message: (msg, recipientPhone, session) =>
    handleMediaMessage({
      media: msg,
      recipientPhone,
      session,
    }),
  contact_message: (msg, recipientPhone, session) => {
    handleContactMessage({ contacts: msg.contacts, recipientPhone, session });
  },
  nfm_reply: (flowMessage, recipientPhone, session) => {
    handleFlowMessage({ flowMessage, recipientPhone, session });
  },
  quick_reply_message: async (message, recipientPhone, session) => {
    handleQuickReplyMessage({ message, recipientPhone, session });
  },
};

const whatsappMessageController = async (req, res) => {
  try {
    const message = Whatsapp.parseMessage(req.body);
    if (isMessage(message)) {
      const { incomingMessage, recipientName, recipientPhone, typeOfMsg, message_id, timestamp } =
      parseMessage(message.message);
      
      if (isMessageRecent(timestamp)) {
        const isRegistered = await isRecipientRegistered(recipientPhone, session);
        // console.log(req.body.entry[0].changes[0].value.messages[0]?.interactive);
        console.log(message);

        try {
          if (!isRegistered) {
            if (!session.has(recipientPhone)) {
              session.set(recipientPhone, {
                isRegistered: false,
              });
            }

            if (!DemoBotSession.get(recipientPhone)) {
              DemoBotSession.set(recipientPhone, {
                sessionInfo: [],
              });
            }

            const language = session.get(recipientPhone)?.selectedLanguage?.type ?? "English";

            // if (incomingMessage.button?.payload === "brochure") {
            //   await sendDocument({
            //     file_path: path.join(rootPath, "/public/Attendance-Bot-Autowhat.pdf"),
            //     caption: "Attendance Bot Brochure",
            //     recipientPhone,
            //   });
            // }

            // if (incomingMessage.button?.payload === "startdemo") {
            //   updateUserSession({ startTime: new Date().getTime() }, session, recipientPhone);

            //   const { message, listOfButtons } = getSimpleButtonsMessage(language, "hi");
            //   await sendSimpleButtons(message, listOfButtons, recipientPhone);
            // }


            if (typeOfMsg === "text_message") {
              if (incomingMessage.text?.body.toLowerCase() === "hi") {
                updateUserSession({ startTime: new Date().getTime() }, session, recipientPhone);

                const { message, listOfButtons } = getSimpleButtonsMessage(language, "hi");
                await sendSimpleButtons(message, listOfButtons, recipientPhone);

                const time = new Date();

                await Demo.create({
                  phoneNumber: recipientPhone,
                  name: recipientName,
                  startTime: new Date().toLocaleTimeString(),
                  date: {
                    day: time.getDate(),
                    month: time.getMonth() + 1,
                    year: time.getFullYear(),
                  },
                });
              }
              if (session.get(recipientPhone).session === "supportIssue") {
                const remark = incomingMessage.text.body;
                const ticketNumber = generateRandomNumber(6);
                const issue = session.get(recipientPhone).supportType?.type ?? "-";

                const message = getTextMessage(language, "registerComplain", [
                  recipientName,
                  "-",
                  issue,
                  remark,
                  recipientPhone,
                  ticketNumber,
                ]);
                await sendTextMessage(message, recipientPhone);

                await delay(2000);

                const { message: reportMessage, listOfButtons } = getSimpleButtonsMessage(
                  language,
                  "employeeReportStart"
                );
                await sendSimpleButtons(reportMessage, listOfButtons, recipientPhone);
              }

              if (incomingMessage.text?.body.toLowerCase() === "task") {
                const message = getTextMessage(language, "starttask");

                const flowData = {
                  screen: "Task_Management",
                  data: {
                    label1: "Attendance&Task",
                    label2: "Reports",
                    label3: "Team",
                    label4: "Create Task",
                    label5: "Edit Task",
                    label6: "Delete Task",
                    label7: "Edit Places",
                    label8: "Profile & Settings",
                    label9: "Delete Places",
                    label10: "Edit Shift Timing",
                    label11: "Delete Employee",
                    label12: "AnytimeTask Allocate",
                    labeldelete: "Delete Options",
                    labeledit: "Edit Options",
                    reportsdd: [
                      {
                        id: "yesterdayreport",
                        title: "Yesterday Report",
                      },
                      {
                        id: "currentmonth",
                        title: "Current Month",
                      },
                      {
                        id: "customdaterangepdf",
                        title: "Custom Date Report (PDF)",
                      },
                      {
                        id: "customdaterangexls",
                        title: "Custom Date Report (Excel)",
                      },
                      {
                        id: "taskcompletion",
                        title: "Task Completion Report",
                      },
                      {
                        id: "attendanceoverview",
                        title: "Attendance Overview",
                      },
                      {
                        id: "predictivetasks",
                        title: "Predictive Task Completion Report",
                      },
                      {
                        id: "anomalydetectionattendance",
                        title: "Anomaly Detection in Attendance Patterns",
                      },
                      {
                        id: "taskclustering",
                        title: "Task Clustering and Segmentation Analysis",
                      },
                      {
                        id: "collaborationnetwork",
                        title: "Collaboration Network Visualization",
                      },
                      {
                        id: "sentimentanalysis",
                        title: "Sentiment Analysis of Task Feedback",
                      },
                      {
                        id: "interactiveattendance",
                        title: "Interactive Attendance Dashboard",
                      },
                      {
                        id: "timeseriesanalysis",
                        title: "Time Series Analysis of Task Evolution",
                      },
                      {
                        id: "kpitracker",
                        title: "KeyPerformanceIndicators (KPIs) Tracker",
                      },
                      {
                        id: "userbehaviorinsights",
                        title: "User Behavior Insights",
                      },
                      {
                        id: "externalfactorsimpact",
                        title: "External Factors Impact Assessment",
                      },
                    ],
                    asandwhen: [
                      {
                        id: "yesterdayreport",
                        title: "Yesterday Report",
                      },
                      {
                        id: "currentmonth",
                        title: "Current Month",
                      },
                      {
                        id: "lastquarter",
                        title: "Last Quarter",
                      },
                      {
                        id: "annualsummary",
                        title: "Annual Summary",
                      },
                      {
                        id: "customdaterangepdf",
                        title: "Custom Date Report (PDF)",
                      },
                      {
                        id: "customdaterangexls",
                        title: "Custom Date Report (Excel)",
                      },
                      {
                        id: "taskcompletion",
                        title: "Task Completion Report",
                      },
                      {
                        id: "attendanceoverview",
                        title: "Attendance Overview",
                      },
                      {
                        id: "predictivetasks",
                        title: "Predictive Task Completion Report",
                      },
                      {
                        id: "anomalydetectionattendance",
                        title: "Anomaly Detection in Attendance Patterns",
                      },
                      {
                        id: "taskclustering",
                        title: "Task Clustering and Segmentation Analysis",
                      },
                      {
                        id: "collaborationnetwork",
                        title: "Collaboration Network Visualization",
                      },
                      {
                        id: "sentimentanalysis",
                        title: "Sentiment Analysis of Task Feedback",
                      },
                      {
                        id: "interactiveattendance",
                        title: "Interactive Attendance Dashboard",
                      },
                      {
                        id: "timeseriesanalysis",
                        title: "Time Series Analysis of Task Evolution",
                      },
                      {
                        id: "kpitracker",
                        title: "KeyPerformanceIndicators (KPIs) Tracker",
                      },
                      {
                        id: "userbehaviorinsights",
                        title: "User Behavior Insights",
                      },
                      {
                        id: "externalfactorsimpact",
                        title: "External Factors Impact Assessment",
                      },
                    ],
                    createtask: [
                      {
                        id: "asandwhen",
                        title: "Creat As&When Task",
                      },
                      {
                        id: "dailytask",
                        title: "Create Daily Task",
                      },
                      {
                        id: "weeklytask",
                        title: "Create Weekly Task",
                      },
                      {
                        id: "monthlytask",
                        title: "Create Monthly Task",
                      },
                      {
                        id: "quarterlytask",
                        title: "Create Quaterly Task",
                      },
                      {
                        id: "sixmonthlytask",
                        title: "Create 6 Monthly Task",
                      },
                    ],
                    edittask: [
                      {
                        id: "task1",
                        title: "Check Dustbin",
                      },
                      {
                        id: "task2",
                        title: "Security Check",
                      },
                      {
                        id: "task3",
                        title: "Light Check",
                      },
                    ],
                    deletetask: [
                      {
                        id: "task1",
                        title: "Check Dustbin",
                      },
                      {
                        id: "task2",
                        title: "Security Check",
                      },
                      {
                        id: "task3",
                        title: "Light Check",
                      },
                    ],
                    editgeo: [
                      {
                        id: "task1",
                        title: "Check Dustbin",
                      },
                      {
                        id: "task2",
                        title: "Security Check",
                      },
                      {
                        id: "task3",
                        title: "Light Check",
                      },
                    ],
                    deletegeo: [
                      {
                        id: "task1",
                        title: "Check Dustbin",
                      },
                      {
                        id: "task2",
                        title: "Security Check",
                      },
                      {
                        id: "task3",
                        title: "Light Check",
                      },
                    ],
                    profilesetting: [
                      {
                        id: "task1",
                        title: "Check Dustbin",
                      },
                      {
                        id: "task2",
                        title: "Security Check",
                      },
                      {
                        id: "task3",
                        title: "Light Check",
                      },
                    ],
                    team: [
                      {
                        id: "emp1",
                        title: "Emp 1",
                      },
                      {
                        id: "emp2",
                        title: "Emp 2",
                      },
                      {
                        id: "emp3",
                        title: "Emp 3",
                      },
                    ],
                    editshift: [
                      {
                        id: "emp1",
                        title: "Emp 1",
                      },
                      {
                        id: "emp2",
                        title: "Emp 2",
                      },
                      {
                        id: "emp3",
                        title: "Emp 3",
                      },
                    ],
                    quick: [
                      {
                        id: "livereport",
                        title: "Live Report",
                      },
                      {
                        id: "pendingapprovals",
                        title: "Pending Approvals",
                      },
                    ],
                    deleteemployee: [
                      {
                        id: "emp1",
                        title: "Emp 1",
                      },
                      {
                        id: "emp2",
                        title: "Emp 2",
                      },
                      {
                        id: "emp3",
                        title: "Emp 3",
                      },
                    ],
                  },
                };

                await sendFlow({
                  body: message,
                  flow_data: flowData,
                  flow_cta: "AutowhatTask",
                  flow_id: ATTENDANCE_FLOW_ID,
                  flow_token: ATTENDANCE_FLOW_TOKEN,
                  recipientPhone,
                });
              }
            } else if (typeOfMsg === "simple_button_message") {
              const buttonId = incomingMessage.button_reply.id;
              if (buttonId === "signup") {
                const message = getTextMessage(language, buttonId);

                const flowData = {
                  screen: "Sign_Up",
                  data: {
                    ...message.label,
                  },
                };

                const time = new Date();

                await Demo.update(
                  recipientPhone,
                  { day: time.getDate(), month: time.getMonth() + 1, year: time.getFullYear() },
                  "signupFlow",
                  {
                    hasClicked: true,
                    time: new Date().toLocaleTimeString(),
                  }
                );

                await sendFlow({
                  body: message.body,
                  flow_data: flowData,
                  flow_cta: "Sign Up",
                  flow_id: SIGN_UP_FLOW_ID,
                  flow_token: SIGN_UP_FLOW_TOKEN,
                  recipientPhone,
                });
              } else if (buttonId === "startSignup") {
                const { message, listOfButtons } = getSimpleButtonsMessage(language, buttonId);
                await sendSimpleButtons(message, listOfButtons, recipientPhone);
              } else if (buttonId.startsWith("langSignup")) {
                const messageId = buttonId.includes("_") ? "duallanguage" : "singlelanguage";
                // const buttonname = "Select Language";

                if (messageId === "singlelanguage") {
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
                          id: "Spanish",
                          title: "Spanish",
                        },
                        {
                          id: "Portuguese",
                          title: "Portuguese",
                        },
                        {
                          id: "Russian",
                          title: "Russian",
                        },
                        {
                          id: "Urdu",
                          title: "Urdu",
                        },
                        {
                          id: "French",
                          title: "French",
                        },
                        {
                          id: "German",
                          title: "German",
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
                      userData: "none",
                      init_values: {
                        userData: "",
                      },
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
                } else {
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
                          id: "English+Spanish",
                          title: "English And Spanish",
                        },
                        {
                          id: "English+Portuguese",
                          title: "English And Portuguese",
                        },
                        {
                          id: "English+Russian",
                          title: "English And Russian",
                        },
                        {
                          id: "English+Urdu",
                          title: "English And Urdu",
                        },
                        {
                          id: "English+French",
                          title: "English And French",
                        },
                        {
                          id: "English+German",
                          title: "English And German",
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
                      userData: "none",
                      init_values: {
                        userData: "",
                      },
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
                }
                // const { message, listOfSections } = getRadioButtonsMessage(language, messageId);
                // session.get(recipientPhone).session = "signup";
                // await sendRadioButtons(message, buttonname, listOfSections, recipientPhone);
                // updateUserSession({ session: "signup" }, session, recipientPhone);
              } else if (buttonId === "startDemo") {
                const { message, listOfButtons } = getSimpleButtonsMessage(language, buttonId);
                await sendSimpleButtons(message, listOfButtons, recipientPhone);
              } else if (buttonId === "singlelanguage") {
                updateUserSession(
                  {
                    languageType: buttonId,
                  },
                  session,
                  recipientPhone
                );

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

                // const { message, listOfSections } = getRadioButtonsMessage(language, buttonId);
                // const buttonname = "Select Language";
                // await sendRadioButtons(message, buttonname, listOfSections, recipientPhone);
              } else if (buttonId === "duallanguage" || buttonId === "langSignup_") {
                updateUserSession(
                  {
                    languageType: buttonId,
                  },
                  session,
                  recipientPhone
                );

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

                // const { message, listOfSections } = getRadioButtonsMessage(
                //   "English",
                //   "duallanguage"
                // );
                // const buttonname = "Select Language";
                // await sendRadioButtons(message, buttonname, listOfSections, recipientPhone);
              } else if (buttonId === "MarkAttendance") {
                updateUserSession(
                  {
                    markAttendance: {
                      clicked: true,
                      time: new Date().getTime(),
                    },
                  },
                  session,
                  recipientPhone
                );

                const time = new Date();

                await Demo.update(
                  recipientPhone,
                  { day: time.getDate(), month: time.getMonth() + 1, year: time.getFullYear() },
                  "demoStarted",
                  {
                    hasClicked: true,
                    time: new Date().toLocaleTimeString(),
                  }
                );

                const { message, listOfButtons } = getSimpleButtonsMessage(language, buttonId);
                await sendSimpleButtons(message, listOfButtons, recipientPhone);
              } else if (buttonId === "in" || buttonId === "out") {
                updateUserSession(
                  {
                    attendanceOption: {
                      option: buttonId,
                      time: new Date().getTime(),
                    },
                  },
                  session,
                  recipientPhone
                );

                const time = new Date();

                await Demo.update(
                  recipientPhone,
                  { day: time.getDate(), month: time.getMonth() + 1, year: time.getFullYear() },
                  "attendanceType",
                  {
                    type: buttonId,
                    time: new Date().toLocaleTimeString(),
                  }
                );

                const message = getTextMessage(language, buttonId);

                await Whatsapp.sendImage({
                  recipientPhone,
                  caption: message,
                  url: "https://i.ibb.co/YZqQd4w/Copy-of-Hi-2.png",
                });
              } else if (buttonId === "employe_report1") {
                await sendDocument({
                  recipientPhone,
                  caption: "Current Month Report",
                  file_path: path.join(rootPath, "/public/EmployeeCurrentMonth.pdf"),
                });
                const time = new Date();

                await Demo.update(
                  recipientPhone,
                  { day: time.getDate(), month: time.getMonth() + 1, year: time.getFullYear() },
                  "reportsFlow",
                  {
                    hasClicked: true,
                    time: new Date().toLocaleTimeString(),
                  }
                );

                await Demo.update(
                  recipientPhone,
                  { day: time.getDate(), month: time.getMonth() + 1, year: time.getFullYear() },
                  "reportType",
                  {
                    type: buttonId,
                    time: new Date().toLocaleTimeString(),
                  }
                );

                updateUserSession(
                  { reports: { clicked: true, time: new Date().getTime() } },
                  session,
                  recipientPhone
                );

                await delay(3000);

                const { message, listOfButtons } = getSimpleButtonsMessage(
                  language,
                  "employerDemoStart"
                );
                await sendSimpleButtons(message, listOfButtons, recipientPhone);
              } else if (buttonId === "employe_report2") {
                await sendDocument({
                  recipientPhone,
                  caption: "Six Month Report",
                  file_path: path.join(rootPath, "/public/EmployeePreviousMonth.pdf"),
                });

                if (session.get(recipientPhone).session === "employeeDemo") {
                  await sendTextMessage(
                    'You have completed demo of attendance bot. type "*hi*" to mark your attendance',
                    recipientPhone
                  );
                  session.delete(recipientPhone);
                  return;
                }

                updateUserSession(
                  { reports: { clicked: true, time: new Date().getTime() } },
                  session,
                  recipientPhone
                );

                await delay(3000);

                const message =
                  "We have Completed Employee Demo\nNext - *Employer Demo*:\n   a. 📑 View reports\n   b.  See employee list\n   c. ✍️ Approve leave requests\n   d. ❌ Resolve tickets";
                const listOfButtons = [
                  {
                    title: "Start Employer Demo",
                    id: "isEmployer",
                  },
                ];
                await sendSimpleButtons(message, listOfButtons, recipientPhone);
              } else if (buttonId === "liveReport" || buttonId === "emp_master_sheet") {
                if (buttonId === "liveReport") {
                  await sendDocument({
                    recipientPhone,
                    caption: "Live Report",
                    file_path: path.join(rootPath, "/public/liveReport.pdf"),
                  });
                } else {
                  await sendDocument({
                    recipientPhone,
                    caption: "Employee Master",
                    file_path: path.join(rootPath, "/public/masterReport.pdf"),
                  });
                }

                updateUserSession(
                  {
                    reportType: { type: buttonId, time: new Date().getTime() },
                  },
                  session,
                  recipientPhone
                );

                delay(3000);

                const { message, listOfButtons } = getSimpleButtonsMessage(language, buttonId);
                await sendSimpleButtons(message, listOfButtons, recipientPhone);
              } else if (buttonId === "requestLeave") {
                updateUserSession(
                  {
                    requestLeave: { clicked: true, time: new Date().getTime() },
                  },
                  session,
                  recipientPhone
                );
                const time = new Date();

                await Demo.update(
                  recipientPhone,
                  { day: time.getDate(), month: time.getMonth() + 1, year: time.getFullYear() },
                  "leaveRequestFlow",
                  {
                    hasClicked: true,
                    time: new Date().toLocaleTimeString(),
                  }
                );

                const { message, listOfButtons } = getSimpleButtonsMessage(language, buttonId);
                await sendSimpleButtons(message, listOfButtons, recipientPhone);
              } else if (buttonId === "oneDay" || buttonId === "moreThanOneDay") {
                updateUserSession(
                  { leaveType: { type: buttonId, time: new Date().getTime() } },
                  session,
                  recipientPhone
                );

                const time = new Date();

                await Demo.update(
                  recipientPhone,
                  { day: time.getDate(), month: time.getMonth() + 1, year: time.getFullYear() },
                  "leaveType",
                  {
                    type: buttonId,
                    time: new Date().toLocaleTimeString(),
                  }
                );

                // const message = getTextMessage(language?.split("+")?.[1] ?? language, buttonId);

                const message = getTextMessage(language, buttonId);
                const currentDate = new Date();

                if (buttonId === "oneDay") {
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
                } else {
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
              } else if (buttonId === "support" || buttonId === "skip") {
                updateUserSession(
                  { support: { clicked: true, time: new Date().getTime() } },
                  session,
                  recipientPhone
                );

                const time = new Date();

                await Demo.update(
                  recipientPhone,
                  { day: time.getDate(), month: time.getMonth() + 1, year: time.getFullYear() },
                  "SupportFlow",
                  {
                    hasClicked: true,
                    time: new Date().toLocaleTimeString(),
                  }
                );

                const { message, listOfButtons } = getSimpleButtonsMessage(language, buttonId);
                await sendSimpleButtons(message, listOfButtons, recipientPhone);
              } else if (
                buttonId === "checkIn" ||
                buttonId === "Salary_Issue" ||
                buttonId === "other_issue"
              ) {
                updateUserSession(
                  {
                    supportType: { type: buttonId, time: new Date().getTime() },
                    session: "supportIssue",
                  },
                  session,
                  recipientPhone
                );

                const time = new Date();

                await Demo.update(
                  recipientPhone,
                  { day: time.getDate(), month: time.getMonth() + 1, year: time.getFullYear() },
                  "supportType",
                  {
                    type: buttonId,
                    time: new Date().toLocaleTimeString(),
                  }
                );

                const message = getTextMessage(language, buttonId);
                await sendTextMessage(message, recipientPhone);
              } else if (buttonId === "isEmployer") {
                const { message, listOfButtons } = getSimpleButtonsMessage(
                  language,
                  "employerReports"
                );
                const time = new Date();

                await Demo.update(
                  recipientPhone,
                  { day: time.getDate(), month: time.getMonth() + 1, year: time.getFullYear() },
                  "employerFlow",
                  {
                    hasClicked: true,
                    time: new Date().toLocaleTimeString(),
                  }
                );

                await sendSimpleButtons(message, listOfButtons, recipientPhone);
              } else if (buttonId === "approvals") {
                const { message, listOfButtons } = getSimpleButtonsMessage(language, buttonId);

                const time = new Date();

                await Demo.update(
                  recipientPhone,
                  { day: time.getDate(), month: time.getMonth() + 1, year: time.getFullYear() },
                  "approvalFlow",
                  {
                    hasClicked: true,
                    time: new Date().toLocaleTimeString(),
                  }
                );

                await sendSimpleButtons(message, listOfButtons, recipientPhone);
              } else if (buttonId === "leaveApprove" || buttonId === "activeIssues") {
                const { message, listOfButtons } = getSimpleButtonsMessage(language, buttonId);

                const time = new Date();

                await Demo.update(
                  recipientPhone,
                  { day: time.getDate(), month: time.getMonth() + 1, year: time.getFullYear() },
                  "approvalType",
                  {
                    type: buttonId,
                    time: new Date().toLocaleTimeString(),
                  }
                );

                await sendSimpleButtons(message, listOfButtons, recipientPhone);
              } else if (buttonId === "startempdemo") {
                const { message, listOfButtons } = getSimpleButtonsMessage(language, buttonId);
                await sendSimpleButtons(message, listOfButtons, recipientPhone);
              } else if (buttonId.startsWith("request_")) {
                const messageId = `${buttonId.split("_")[0]}_`;
                const message = getTextMessage(language, messageId);
                await sendTextMessage(message, recipientPhone);

                await delay(3000);

                const { message: signUpMessage, listOfButtons } = getSimpleButtonsMessage(
                  language,
                  "signupStart"
                );
                await sendSimpleButtons(signUpMessage, listOfButtons, recipientPhone);
              } else if (buttonId.startsWith("issue_")) {
                const message = getTextMessage(language, buttonId);
                await sendTextMessage(message, recipientPhone);

                await delay(3000);

                const { message: signUpMessage, listOfButtons } = getSimpleButtonsMessage(
                  language,
                  "signupStart"
                );
                await sendSimpleButtons(signUpMessage, listOfButtons, recipientPhone);
              }
            } else if (typeOfMsg === "location_message") {
              const { latitude, longitude } = incomingMessage.location;

              updateUserSession(
                {
                  location: {
                    lat: latitude,
                    long: longitude,
                    clicked: true,
                    time: new Date().getTime(),
                  },
                },
                session,
                recipientPhone
              );

              if (session.get(recipientPhone).session === "timezoneLocation") {
                const primaryLang = language.includes("+") ? language.split("+")[1] : language
                const message = getTextMessage(primaryLang, "signup");

                const flowData = {
                  screen: "Sign_Up",
                  data: {
                    ...message.label,
                  },
                };

                await sendFlow({
                  body: message.body,
                  flow_data: flowData,
                  flow_cta: "Sign Up",
                  flow_id: SIGN_UP_FLOW_ID,
                  flow_token: SIGN_UP_FLOW_TOKEN,
                  recipientPhone,
                });

                updateUserSession({ session: "" }, session, recipientPhone);

                return;
              }

              const hasThread = Boolean(incomingMessage.thread);
              const hasName = Boolean(
                incomingMessage.location.name && incomingMessage.location.url
              );

              if (!hasThread) {
                const message = getTextMessage(language, "clickAttendanceLocation");
                await sendVideo({
                  caption: message,
                  file_path: path.join(process.env.ROOT_PATH, "/public/locaton-example.mp4"),
                  recipientPhone,
                });
              } else {
                if (hasName) {
                  await sendTextMessage("Please send current location", recipientPhone);
                  return;
                }

                const time = new Date();
                const { zoneName, countryName, countryCode, regionName } = await getTimeZone(
                  latitude,
                  longitude
                );

                await Demo.update(
                  recipientPhone,
                  { day: time.getDate(), month: time.getMonth() + 1, year: time.getFullYear() },
                  "location",
                  {
                    lat: latitude,
                    long: longitude,
                    hasClicked: true,
                    time: new Date().toLocaleTimeString(),
                  }
                );

                await Demo.updateOne(
                  {
                    phoneNumber: Number(recipientPhone),
                    "date.day": time.getDate(),
                    "date.month": time.getMonth() + 1,
                    "date.year": time.getFullYear(),
                  },
                  {
                    timeZone: zoneName,
                    countryName,
                    countryCode,
                    regionName,
                  }
                );

                const message = getTextMessage(language, "attendanceLocation");
                await Whatsapp.sendImage({
                  recipientPhone,
                  caption: message,
                  url: "https://cdn.discordapp.com/attachments/997267733513261188/1178337649342287952/Adityabanka_SINGLE_AERIAL_VIEW_view_OF_SINGLE_very_beautiful_in_63db8846-3aa3-4e1a-909b-1cb311c749b2.png",
                });
              }
            } else if (typeOfMsg === "media_message") {
              const { attendanceOption, location } = session.get(recipientPhone);
              const time = new Date();

              await Demo.update(
                recipientPhone,
                { day: time.getDate(), month: time.getMonth() + 1, year: time.getFullYear() },
                "pic",
                {
                  hasClicked: true,
                  time: new Date().toLocaleTimeString(),
                }
              );

              const currentTime = new Date().toLocaleString("en-US", {
                timezone: "Asia/Kolkata",
              });

              await sendLocation({
                recipientPhone,
                latitude: location?.lat,
                longitude: location?.long,
                name: `${currentTime} by ${recipientPhone}`,
                address: `Check-${attendanceOption?.option.toUpperCase()} Success✅`,
              });

              await delay(3000);

              const { message, listOfButtons } = getSimpleButtonsMessage(
                language,
                "startLeaveRequest"
              );
              await sendSimpleButtons(message, listOfButtons, recipientPhone);
            } else if (typeOfMsg === "radio_button_message") {
              const buttonId = incomingMessage.list_reply.id;

              if (session.get(recipientPhone).session === "signup") {
                const message = getTextMessage(language, "timezoneLocation");
                await sendTextMessage(message, recipientPhone);
                updateUserSession(
                  { session: "timezoneLocation", selectedLanguage: { type: buttonId } },
                  session,
                  recipientPhone
                );
              } else if (
                buttonId === "English" ||
                buttonId === "Hinglish" ||
                buttonId === "Hindi" ||
                buttonId === "Bengali" ||
                buttonId === "Telugu" ||
                buttonId === "Marathi" ||
                buttonId === "Tamil" ||
                buttonId === "Kannada" ||
                buttonId === "Gujarati" ||
                buttonId === "Odia" ||
                buttonId === "Malayalam" ||
                buttonId.startsWith("English+")
              ) {
                updateUserSession(
                  {
                    selectedLanguage: {
                      type: buttonId,
                      time: new Date().getTime(),
                    },
                  },
                  session,
                  recipientPhone
                );
                const time = new Date();

                await Demo.update(
                  recipientPhone,
                  { day: time.getDate(), month: time.getMonth() + 1, year: time.getFullYear() },
                  "languageSelected",
                  buttonId
                );

                await delay(1000);

                const { message, listOfButtons } = getSimpleButtonsMessage(
                  buttonId,
                  "employeeDemoStart"
                );
                await sendSimpleButtons(message, listOfButtons, recipientPhone);
              }
            } else if (incomingMessage.interactive?.type === "nfm_reply") {
              const flowMessage = JSON.parse(incomingMessage.interactive.nfm_reply.response_json);
              const phonenumber = JSON.parse(incomingMessage.from.phone);
              const flowToken = flowMessage?.flow_token;
              const flowName = flowMessage?.flowName;

              const createtask = flowMessage?.createtasks;

              if (flowName === "leaveOneDay" || flowName === "manyDayLeave") {
                const { reasonForLeave } = flowMessage;
                const startDate = new Date(Number(flowMessage.startDate))?.toDateString();
                const endDate = new Date(Number(flowMessage.endDate))?.toDateString();

                const ticketNumber = Math.floor(Math.random() * 90000) + 10000;
                const leaveType = session.get(recipientPhone).leaveType?.type ?? "-";

                process.env.ONE_DAY_LEAVE_FLOW_TOKEN = flowToken;
                // ONE_DAY_LEAVE_FLOW_TOKEN = flowToken;

                const message = getTextMessage(language, "leaveSummary", [
                  recipientName,
                  "-",
                  leaveType,
                  startDate,
                  endDate,
                  reasonForLeave,
                  ticketNumber,
                  recipientPhone,
                ]);
                await sendTextMessage(message, recipientPhone);

                await delay(3000);

                const { message: supportMessage, listOfButtons } = getSimpleButtonsMessage(
                  language,
                  "startSupport"
                );
                await sendSimpleButtons(supportMessage, listOfButtons, recipientPhone);
              } else if (flowName === "signUp") {
                const { fullName, companyName } = flowMessage;

                const bufferTime = Number(flowMessage.bufferTime) ?? 15;
                const monthlySickLeave = 2;
                const casualLeave = 2;
                const carryForwardLimit = 2;
                const annualLeave = 15;
                const maternityLeaveAllowed = 15;
                const paternityLeaveAllowed = 15;
                const unpaidLeavePolicy = 30;
                const leaveEncashment = "no";
                const consequencesUnapprovedLeave = "deduction";
                const halfDayPolicy = "allowed";

                const { location } = session.get(recipientPhone);
                let timezoneInfo = {};

                if (location && location.lat && location.long) {
                  timezoneInfo = await getTimeZone(location.lat, location.long);
                }

                const defaultNotifications = {
                  checkIn: true,
                  checkOut: true,
                  leaveRequest: true,
                  support: true,
                  morningReportTime: 39600000,
                  monthEndReportTime: 32400000,
                  eveningReportTime: 72000000,
                };

                await Employer.create({
                  fullName,
                  employeeNumber: recipientPhone,
                  companyName,
                  bufferTime: bufferTime || "15",
                  monthlySickLeave,
                  casualLeave,
                  carryForwardLimit,
                  annualLeave,
                  maternityLeaveAllowed,
                  paternityLeaveAllowed,
                  unpaidLeavePolicy,
                  leaveEncashment,
                  consequencesUnapprovedLeave,
                  halfDayPolicy,
                  employerNumber: recipientPhone,
                  registeredOn: new Date().getTime(),
                  language,
                  notifications: defaultNotifications,
                  countryName: timezoneInfo?.countryName,
                  countryCode: timezoneInfo?.countryCode,
                  timeZone: timezoneInfo?.zoneName,
                  regionName: timezoneInfo?.regionName,
                });

                process.env.SIGN_UP_FLOW_TOKEN = flowToken;

                const { message, listOfButtons } = getSimpleButtonsMessage(
                  language,
                  "addGeo-fencing-emplyer",
                  [],
                  "main"
                );

                await sendSimpleButtons(message, listOfButtons, recipientPhone);
                session.delete(recipientPhone);
              } else if (flowName === "taskManagement" && createtask === "dailytask") {
                const message = getTextMessage(language, "createDailyTask");

                const flowData = {
                  screen: "welcome_screen",
                  data: {
                    ...message.label,
                  },
                };

                await sendFlow({
                  body: message.body,
                  flow_data: flowData,
                  flow_cta: "AutowhatTask",
                  flow_id: CREATEDAILY_TASKX_FLOW_ID,
                  flow_token: CREATEDAILY_TASKX_TOKEN,
                  recipientPhone,
                });
              } else if (flowName === "taskManagement" && createtask === "monthlytask") {
                const message = getTextMessage(language, "starttask");

                const flowData = {
                  screen: "welcome_screen",
                  data: {
                    daysinmonthdrop: [
                      {
                        id: "1",
                        title: "1",
                      },
                      {
                        id: "2",
                        title: "2",
                      },
                      {
                        id: "3",
                        title: "3",
                      },
                      {
                        id: "4",
                        title: "4",
                      },
                      {
                        id: "5",
                        title: "5",
                      },
                      {
                        id: "6",
                        title: "6",
                      },
                      {
                        id: "7",
                        title: "7",
                      },
                      {
                        id: "8",
                        title: "8",
                      },
                    ],
                    daysinmonthdrop1: [
                      {
                        id: "9",
                        title: "9",
                      },
                      {
                        id: "10",
                        title: "10",
                      },
                      {
                        id: "11",
                        title: "11",
                      },
                      {
                        id: "12",
                        title: "12",
                      },
                      {
                        id: "13",
                        title: "13",
                      },
                      {
                        id: "14",
                        title: "14",
                      },
                      {
                        id: "15",
                        title: "15",
                      },
                      {
                        id: "16",
                        title: "16",
                      },
                    ],
                    daysinmonthdrop2: [
                      {
                        id: "17",
                        title: "17",
                      },
                      {
                        id: "18",
                        title: "18",
                      },
                      {
                        id: "19",
                        title: "19",
                      },
                      {
                        id: "19",
                        title: "19",
                      },
                      {
                        id: "20",
                        title: "20",
                      },
                      // {
                      //   id: "22",
                      //   title: "22",
                      // },
                      // {
                      //   id: "23",
                      //   title: "23",
                      // },
                      // {
                      //   id: "24",
                      //   title: "24",
                      // }
                    ],
                    daysinmonthdrop3: [
                      {
                        id: "25",
                        title: "25",
                      },
                      {
                        id: "26",
                        title: "26",
                      },
                      {
                        id: "27",
                        title: "27",
                      },
                      {
                        id: "28",
                        title: "28",
                      },
                      // {
                      //   id: "29",
                      //   title: "29",
                      // },
                      // {
                      //   id: "30",
                      //   title: "30",
                      // },
                      // {
                      //   id: "31",
                      //   title: "31",
                      // }
                    ],
                    title1: "Monthly  Repitative Task Creation",
                    title2: "Monthly Repitative Task Creation",
                    title3: "Proof of Work",
                    title4: "Priority",
                    title5: "Notifications & Reminders",
                    activitystarttime: [
                      {
                        id: "Asperuser",
                        title: "As Per User",
                        description: "As per user",
                      },
                      {
                        id: "07:15",
                        title: "07:15 am",
                        description: "Quarter past seven in the morning",
                      },
                      {
                        id: "07:30",
                        title: "07:30 am",
                        description: "Half past seven in the morning",
                      },
                      {
                        id: "07:45",
                        title: "07:45 am",
                        description: "Quarter to eight in the morning",
                      },
                      {
                        id: "08:00",
                        title: "08:00 am",
                        description: "Eight o'clock in the morning",
                      },
                      {
                        id: "08:15",
                        title: "08:15 am",
                        description: "Quarter past eight in the morning",
                      },
                      {
                        id: "08:30",
                        title: "08:30 am",
                        description: "Half past eight in the morning",
                      },
                      {
                        id: "08:45",
                        title: "08:45 am",
                        description: "Quarter to nine in the morning",
                      },
                      {
                        id: "09:00",
                        title: "09:00 am",
                        description: "Nine o'clock in the morning",
                      },
                      {
                        id: "09:15",
                        title: "09:15 am",
                        description: "Quarter past nine in the morning",
                      },
                      {
                        id: "09:30",
                        title: "09:30 am",
                        description: "Half past nine in the morning",
                      },
                      {
                        id: "09:45",
                        title: "09:45 am",
                        description: "Quarter to ten in the morning",
                      },
                      {
                        id: "10:00",
                        title: "10:00 am",
                        description: "Ten o'clock in the morning",
                      },
                      {
                        id: "10:15",
                        title: "10:15 am",
                        description: "Quarter past ten in the morning",
                      },
                      {
                        id: "10:30",
                        title: "10:30 am",
                        description: "Half past ten in the morning",
                      },
                      {
                        id: "10:45",
                        title: "10:45 am",
                        description: "Quarter to eleven in the morning",
                      },
                      {
                        id: "11:00",
                        title: "11:00 am",
                        description: "Eleven o'clock in the morning",
                      },
                      {
                        id: "11:15",
                        title: "11:15 am",
                        description: "Quarter past eleven in the morning",
                      },
                      {
                        id: "11:30",
                        title: "11:30 am",
                        description: "Half past eleven in the morning",
                      },
                      {
                        id: "11:45",
                        title: "11:45 am",
                        description: "Quarter to twelve in the afternoon",
                      },
                      {
                        id: "12:00",
                        title: "12:00 pm",
                        description: "Twelve o'clock noon",
                      },
                      {
                        id: "12:15",
                        title: "12:15 pm",
                        description: "Quarter past twelve in the afternoon",
                      },
                      {
                        id: "12:30",
                        title: "12:30 pm",
                        description: "Half past twelve in the afternoon",
                      },
                      {
                        id: "12:45",
                        title: "12:45 pm",
                        description: "Quarter to one in the afternoon",
                      },
                      {
                        id: "13:00",
                        title: "01:00 pm",
                        description: "One o'clock in the afternoon",
                      },
                      {
                        id: "13:15",
                        title: "01:15 pm",
                        description: "Quarter past one in the afternoon",
                      },
                      {
                        id: "13:30",
                        title: "01:30 pm",
                        description: "Half past one in the afternoon",
                      },
                      {
                        id: "13:45",
                        title: "01:45 pm",
                        description: "Quarter to two in the afternoon",
                      },
                      {
                        id: "14:00",
                        title: "02:00 pm",
                        description: "Two o'clock in the afternoon",
                      },
                      {
                        id: "14:15",
                        title: "02:15 pm",
                        description: "Quarter past two in the afternoon",
                      },
                      {
                        id: "14:30",
                        title: "02:30 pm",
                        description: "Half past two in the afternoon",
                      },
                      {
                        id: "14:45",
                        title: "02:45 pm",
                        description: "Quarter to three in the afternoon",
                      },
                      {
                        id: "15:00",
                        title: "03:00 pm",
                        description: "Three o'clock in the afternoon",
                      },
                      {
                        id: "15:15",
                        title: "03:15 pm",
                        description: "Quarter past three in the afternoon",
                      },
                      {
                        id: "15:30",
                        title: "03:30 pm",
                        description: "Half past three in the afternoon",
                      },
                      {
                        id: "15:45",
                        title: "03:45 pm",
                        description: "Quarter to four in the afternoon",
                      },
                      {
                        id: "16:00",
                        title: "04:00 pm",
                        description: "Four o'clock in the afternoon",
                      },
                      {
                        id: "16:15",
                        title: "04:15 pm",
                        description: "Quarter past four in the afternoon",
                      },
                      {
                        id: "16:30",
                        title: "04:30 pm",
                        description: "Half past four in the afternoon",
                      },
                      {
                        id: "16:45",
                        title: "04:45 pm",
                        description: "Quarter to five in the afternoon",
                      },
                      {
                        id: "17:00",
                        title: "05:00 pm",
                        description: "Five o'clock in the afternoon",
                      },
                      {
                        id: "17:15",
                        title: "05:15 pm",
                        description: "Quarter past five in the afternoon",
                      },
                      {
                        id: "17:30",
                        title: "05:30 pm",
                        description: "Half past five in the afternoon",
                      },
                      {
                        id: "17:45",
                        title: "05:45 pm",
                        description: "Quarter to six in the evening",
                      },
                      {
                        id: "18:00",
                        title: "06:00 pm",
                        description: "Six o'clock in the evening",
                      },
                      {
                        id: "18:15",
                        title: "06:15 pm",
                        description: "Quarter past six in the evening",
                      },
                      {
                        id: "18:30",
                        title: "06:30 pm",
                        description: "Half past six in the evening",
                      },
                      {
                        id: "18:45",
                        title: "06:45 pm",
                        description: "Quarter to seven in the evening",
                      },
                      {
                        id: "19:00",
                        title: "07:00 pm",
                        description: "Seven o'clock in the evening",
                      },
                      {
                        id: "19:15",
                        title: "07:15 pm",
                        description: "Quarter past seven in the evening",
                      },
                      {
                        id: "19:30",
                        title: "07:30 pm",
                        description: "Half past seven in the evening",
                      },
                      {
                        id: "19:45",
                        title: "07:45 pm",
                        description: "Quarter to eight in the evening",
                      },
                      {
                        id: "20:00",
                        title: "08:00 pm",
                        description: "Eight o'clock in the evening",
                      },
                      {
                        id: "20:15",
                        title: "08:15 pm",
                        description: "Quarter past eight in the evening",
                      },
                      {
                        id: "20:30",
                        title: "08:30 pm",
                        description: "Half past eight in the evening",
                      },
                      {
                        id: "20:45",
                        title: "08:45 pm",
                        description: "Quarter to nine in the evening",
                      },
                      {
                        id: "21:00",
                        title: "09:00 pm",
                        description: "Nine o'clock in the evening",
                      },
                      {
                        id: "21:15",
                        title: "09:15 pm",
                        description: "Quarter past nine in the evening",
                      },
                      {
                        id: "21:30",
                        title: "09:30 pm",
                        description: "Half past nine in the evening",
                      },
                      {
                        id: "21:45",
                        title: "09:45 pm",
                        description: "Quarter to ten in the evening",
                      },
                      {
                        id: "22:00",
                        title: "10:00 pm",
                        description: "Ten o'clock in the evening",
                      },
                      {
                        id: "22:15",
                        title: "10:15 pm",
                        description: "Quarter past ten in the evening",
                      },
                      {
                        id: "22:30",
                        title: "10:30 pm",
                        description: "Half past ten in the evening",
                      },
                      {
                        id: "22:45",
                        title: "10:45 pm",
                        description: "Quarter to eleven in the evening",
                      },
                      {
                        id: "23:00",
                        title: "11:00 pm",
                        description: "Eleven o'clock in the evening",
                      },
                      {
                        id: "23:15",
                        title: "11:15 pm",
                        description: "Quarter past eleven in the evening",
                      },
                      {
                        id: "23:30",
                        title: "11:30 pm",
                        description: "Half past eleven in the evening",
                      },
                      {
                        id: "23:45",
                        title: "11:45 pm",
                        description: "Quarter to twelve at night",
                      },
                      {
                        id: "00:00",
                        title: "12:00 am",
                        description: "Midnight",
                      },
                      {
                        id: "00:15",
                        title: "12:15 am",
                        description: "Quarter past twelve at night",
                      },
                      {
                        id: "00:30",
                        title: "12:30 am",
                        description: "Half past twelve at night",
                      },
                      {
                        id: "00:45",
                        title: "12:45 am",
                        description: "Quarter to one in the morning",
                      },
                      {
                        id: "01:00",
                        title: "01:00 am",
                        description: "One o'clock in the morning",
                      },
                      {
                        id: "01:15",
                        title: "01:15 am",
                        description: "Quarter past one in the morning",
                      },
                      {
                        id: "01:30",
                        title: "01:30 am",
                        description: "Half past one in the morning",
                      },
                      {
                        id: "01:45",
                        title: "01:45 am",
                        description: "Quarter to two in the morning",
                      },
                      {
                        id: "02:00",
                        title: "02:00 am",
                        description: "Two o'clock in the morning",
                      },
                      {
                        id: "02:15",
                        title: "02:15 am",
                        description: "Quarter past two in the morning",
                      },
                      {
                        id: "02:30",
                        title: "02:30 am",
                        description: "Half past two in the morning",
                      },
                      {
                        id: "02:45",
                        title: "02:45 am",
                        description: "Quarter to three in the morning",
                      },
                      {
                        id: "03:00",
                        title: "03:00 am",
                        description: "Three o'clock in the morning",
                      },
                      {
                        id: "03:15",
                        title: "03:15 am",
                        description: "Quarter past three in the morning",
                      },
                      {
                        id: "03:30",
                        title: "03:30 am",
                        description: "Half past three in the morning",
                      },
                      {
                        id: "03:45",
                        title: "03:45 am",
                        description: "Quarter to four in the morning",
                      },
                      {
                        id: "04:00",
                        title: "04:00 am",
                        description: "Four o'clock in the morning",
                      },
                      {
                        id: "04:15",
                        title: "04:15 am",
                        description: "Quarter past four in the morning",
                      },
                      {
                        id: "04:30",
                        title: "04:30 am",
                        description: "Half past four in the morning",
                      },
                      {
                        id: "04:45",
                        title: "04:45 am",
                        description: "Quarter to five in the morning",
                      },
                      {
                        id: "05:00",
                        title: "05:00 am",
                        description: "Five o'clock in the morning",
                      },
                      {
                        id: "05:15",
                        title: "05:15 am",
                        description: "Quarter past five in the morning",
                      },
                      {
                        id: "05:30",
                        title: "05:30 am",
                        description: "Half past five in the morning",
                      },
                      {
                        id: "05:45",
                        title: "05:45 am",
                        description: "Quarter to six in the morning",
                      },
                      {
                        id: "06:00",
                        title: "06:00 am",
                        description: "Six o'clock in the morning",
                      },
                      {
                        id: "06:15",
                        title: "06:15 am",
                        description: "Quarter past six in the morning",
                      },
                      {
                        id: "06:30",
                        title: "06:30 am",
                        description: "Half past six in the morning",
                      },
                      {
                        id: "06:45",
                        title: "06:45 am",
                        description: "Quarter to seven in the morning",
                      },
                    ],
                    activitystartlabel: "Activity Start Time",
                    reminderlabel: "Reminder",
                    taskdurationlabel: "Task Duration",
                    nooftimeslabel: "No. of Times",
                    notificationlabel: "Notifications",
                    endinhmessagel: "Thank You",
                    finalsubmitbutton: "Submit",
                    taskduration: [
                      {
                        id: "asperuser",
                        title: "As per User",
                        description: "As per User",
                      },
                      {
                        id: "1",
                        title: "Less Than 5 min",
                        description: "5 hours and 00 minutes",
                      },
                      {
                        id: "2",
                        title: "Between 5 mins to 15 mins",
                        description: "Between 5 mins to 15 mins",
                      },
                      {
                        id: "3",
                        title: "15 mins to 30 mins",
                        description: "Between 15 mins to 30 mins",
                      },
                      {
                        id: "4",
                        title: "30 mins to 1 hour",
                        description: "Between 30 mins to 1 hour",
                      },
                      {
                        id: "5",
                        title: "1 to 2 hours",
                        description: "Between 1 to 2 hours",
                      },
                      {
                        id: "6",
                        title: "2 to 4 hours",
                        description: "Between 2 to 4 hours",
                      },
                      {
                        id: "7",
                        title: "4 to 8 hours",
                        description: "Between 4 to 8 hours",
                      },
                      {
                        id: "8",
                        title: "8 to 12 hours",
                        description: "Between 8 to 12 hours",
                      },
                      {
                        id: "9",
                        title: "12 to 16 hours",
                        description: "Between 12 to 16 hours",
                      },
                      {
                        id: "10",
                        title: "16 to 24 hours",
                        description: "Between 16 to 24 hours",
                      },
                    ],
                    nooftimes: [
                      {
                        id: "asperuser",
                        title: "As per User",
                        description: "As per User",
                      },
                      {
                        id: "2",
                        title: "1 time",
                        description: "1 time",
                      },
                      {
                        id: "3",
                        title: "2 times",
                        description: "2 times",
                      },
                      {
                        id: "4",
                        title: "3 time",
                        description: "3 time",
                      },
                      {
                        id: "5",
                        title: "4 times",
                        description: "4 times",
                      },
                      {
                        id: "6",
                        title: "5 times",
                        description: "5 times",
                      },
                      {
                        id: "7",
                        title: "6 times",
                        description: "6 times",
                      },
                      {
                        id: "8",
                        title: "7 times",
                        description: "7 times",
                      },
                      {
                        id: "9",
                        title: "8 times",
                        description: "8 times",
                      },
                      {
                        id: "10",
                        title: "9 times",
                        description: "9 times",
                      },
                    ],
                    notifications: [
                      {
                        id: "1",
                        title: "Start ",
                      },
                      {
                        id: "3",
                        title: "RealTime All",
                      },
                      {
                        id: "4",
                        title: "Change Assignee",
                      },
                      {
                        id: "2",
                        title: "End ",
                      },
                    ],
                    noofprooflabel: "No of Proofs",
                    helper1: "Name should be short and concise",
                    helper2: "Description should be indept.",
                    helper3: "Instruction should be clear",
                    locationcheckbox: [
                      {
                        id: "yeslocation",
                        title: "Yes",
                      },
                      {
                        id: "nolocation",
                        title: "No",
                      },
                    ],
                    photocheckbox: [
                      {
                        id: "1",
                        title: "Photo",
                      },
                    ],
                    textcheckbox: [
                      {
                        id: "2",
                        title: "Text",
                      },
                    ],
                    videocheckbox: [
                      {
                        id: "3",
                        title: "Video",
                      },
                    ],
                    filecheckbox: [
                      {
                        id: "5",
                        title: "File",
                      },
                    ],
                    audiocheckbox: [
                      {
                        id: "6",
                        title: "Audio",
                      },
                    ],
                    proofstrict: [
                      {
                        id: "allproof",
                        title: "All Proof Marked Above",
                      },
                      {
                        id: "anyproof",
                        title: "Any 1 Proof Marked Above",
                      },
                    ],
                    noofproofdatatext: [
                      {
                        id: "As per user",
                        title: "As per user",
                        description: "As per user",
                      },
                      {
                        id: "1",
                        title: "1",
                        description: "1 Proof",
                      },
                      {
                        id: "low",
                        title: "2",
                        description: "2 Proof",
                      },
                      {
                        id: "medium",
                        title: "3",
                        description: "3 Proof",
                      },
                      {
                        id: "no",
                        title: "4",
                        description: "4 Proof",
                      },
                    ],
                    noofproofdataaudio: [
                      {
                        id: "As per user",
                        title: "As per user",
                        description: "As per user",
                      },
                      {
                        id: "1",
                        title: "1",
                        description: "1 Proof",
                      },
                      {
                        id: "low",
                        title: "2",
                        description: "2 Proof",
                      },
                      {
                        id: "medium",
                        title: "3",
                        description: "3 Proof",
                      },
                      {
                        id: "no",
                        title: "4",
                        description: "4 Proof",
                      },
                    ],
                    noofproofdatavideo: [
                      {
                        id: "As per user",
                        title: "As per user",
                        description: "As per user",
                      },
                      {
                        id: "1",
                        title: "1",
                        description: "1 Proof",
                      },
                      {
                        id: "low",
                        title: "2",
                        description: "2 Proof",
                      },
                      {
                        id: "medium",
                        title: "3",
                        description: "3 Proof",
                      },
                      {
                        id: "no",
                        title: "4",
                        description: "4 Proof",
                      },
                    ],
                    noofproofdatafile: [
                      {
                        id: "As per user",
                        title: "As per user",
                        description: "As per user",
                      },
                      {
                        id: "1",
                        title: "1",
                        description: "1 Proof",
                      },
                      {
                        id: "low",
                        title: "2",
                        description: "2 Proof",
                      },
                      {
                        id: "medium",
                        title: "3",
                        description: "3 Proof",
                      },
                      {
                        id: "no",
                        title: "4",
                        description: "4 Proof",
                      },
                    ],
                    noofproofdataphoto: [
                      {
                        id: "As per user",
                        title: "As per user",
                        description: "As per user",
                      },
                      {
                        id: "1",
                        title: "1",
                        description: "1 Proof",
                      },
                      {
                        id: "low",
                        title: "2",
                        description: "2 Proof",
                      },
                      {
                        id: "medium",
                        title: "3",
                        description: "3 Proof",
                      },
                      {
                        id: "no",
                        title: "4",
                        description: "4 Proof",
                      },
                    ],
                    locationproofheader: "Location proof is important when there is site visits",
                    photoproofheader: "Photo of task etc can be used as proof",
                    textproofheader: "Text related to task etc can be used as proof",
                    videoproofheader: "Video related to task etc can be used as proof",
                    audioproofheader: "Audio related to task etc can be used as proof",
                    fileproofheader: "File related to task etc can be used as proof",
                    taskactivityheader: "Simple Monthly Repitative Task Creation",
                    taskactivitysubheader:
                      "Few tips for creation and effective implemntation of task",
                    taskactivitysteps:
                      " \n Step 1 : Task Info - Name, Description, Instructions \n Step 2: Proofs: Type,Quantity,Strictness \n Step 3: Priority and Assignment \n Step 4: Notifications & Reminder \n\n--------------------------------\n Standard Operating Procedure (SOP) \n-------------------------------\n 1. Task Information : \n -Task Name:- Cleaning \n -Task Description :- This task involves capturing a photo of a dustbin, and location proof is required for site visits \n -Task Instruction :- Be on time follow SOP and timings \n\n2.Proofs : \n Users can select proof options,quantity of proofs such as\n   -📷 Photo✔️ - 1,\n   -📝 Text✔️ - 2,\n   -🎥 Video❌ ,\n   -📁 File❌,\n   -🔊 Audio❌ \n with strictness preferences. \n\n3.Priorities: \n  -🔴 Critical✔️ \n  -🔶 High \n  -🟡 Medium \n  -🔵 Low \n  -⚪ No Priority \n\n Timings: \n   -⏰ Activity start time- 09:00 am\n   -⌛ Task duration- 30 mins \n   -🔔 Frequency- Twice. \n\n Notifications:\n   - All Real-time updates✔️ \n    -Task start\n  - Assignee Changes \n   -Task Completion. \n\n Date: 17/9/23 \nPrepared & Approved By: Ram Sharma ",
                    button1label: "Create Monthly Task",
                    button2label: "Next",
                    taskactivityname: "Task activity name",
                    taskactivitydescription: "Task activity desc",
                    taskactivityinstruction: "Task activity instructions",
                    taskreminderTypeLabel: "Task Frequency",
                    proofoflocationlabel: "Proof of Location",
                    proofofworklabel: "Proof of Work",
                    proofreqlabel: "Proof Strictness",
                    selectprioritylabel: "Select Priority ",
                    priorityheader: "Select the Priority",
                    assigntoradio: [
                      {
                        id: "assigntoall",
                        title: "Assign To All",
                      },
                      {
                        id: "anyone",
                        title: "Any One",
                      },
                    ],
                    strictassignlabel: "Assign Strictness",
                    priorityselection: [
                      {
                        id: "crtical",
                        title: "Critical",
                        description: "Critical priority",
                      },
                      {
                        id: "high",
                        title: "High",
                        description: "High priority",
                      },
                      {
                        id: "low",
                        title: "Low",
                        description: "Low priority",
                      },
                      {
                        id: "medium",
                        title: "Medium",
                        description: "Medium priority",
                      },
                      {
                        id: "no",
                        title: "No Priority",
                        description: "No Priority",
                      },
                    ],
                    assignto: [
                      {
                        id: "Self",
                        title: "Self",
                      },
                      {
                        id: "Assign",
                        title: "Assign",
                      },
                    ],
                    assignLabel: "Assign To",
                    init_values: {
                      TaskName: "Click Dustbin Pic",
                      department: "Hospitality",
                      taskdescription:
                        "This is most important task , Cleaniness is Next to Godliness",
                      taskinstruction:
                        "Need to first sweep, then using water clean , empty dustbin ,etc",
                      workinghours: "09:00",
                      timing: "asandwhen",
                      location: "nolocation",
                      priority: "As per user",
                      "task duration": "asperuser",
                      nooftimes: "asperuser",
                      StartTime: "Asperuser",
                      noofprooftext: "As per user",
                      noofproofvideo: "As per user",
                      noofprooffile: "As per user",
                      noofproofaudio: "As per user",
                      noofproofphoto: "As per user",
                      proof: "anyproof",
                      priorityselected: "medium",

                      assignstrict1: "assigntoall",
                      taskduration: "asperuser",

                      proofstrict1: "allproof",
                      prooftypephoto: ["1"],

                      prooftypetext: ["2"],
                      prooftypevideo: ["3"],
                      prooftypefile: ["5"],

                      prooftypeaudio: ["6"],

                      assign: ["Self"],
                      notification: ["Self"],
                      startDate: "12/12/2022",
                      notify: ["1"],
                    },
                  },
                };

                await sendFlow({
                  body: message,
                  flow_data: flowData,
                  flow_cta: "AutowhatTask",
                  flow_id: CREATEMONTHLY_TASKX_FLOW_ID,
                  flow_token: CREATEMONTHLY_TASKX_TOKEN,
                  recipientPhone,
                });
              } else if (flowName === "createdailytask") {
                await TaskModel.create({
                  ...flowMessage,
                  phonenumber: phonenumber,
                });

                await createSOP(phonenumber);
              } else if (flowName === "createweeklytask") {
                await WeeklyTaskModel.create({
                  ...flowMessage,
                  phonenumber: phonenumber,
                });
              } else if (flowName === "createmonthlytask") {
                await MonthlyTaskModel.create({
                  ...flowMessage,
                  phonenumber: phonenumber,
                });
              } else if (flowName === "taskManagement" && createtask === "weeklytask") {
                const message = getTextMessage(language, "starttask");

                const flowData = {
                  screen: "welcome_screen",
                  data: {
                    daysinweekdrop: [
                      {
                        id: "monday",
                        title: "Monday",
                      },
                      {
                        id: "tuesday",
                        title: "Tuesday",
                      },
                      {
                        id: "wednesday",
                        title: "Wednesday",
                      },
                      {
                        id: "thursday",
                        title: "Thursday",
                      },
                      {
                        id: "friday",
                        title: "Friday",
                      },
                      {
                        id: "saturday",
                        title: "Saturday",
                      },
                      {
                        id: "sunday",
                        title: "Sunday",
                      },
                    ],
                    title1: "Weekly  Repitative Task Creation",
                    title2: "Weekly Repitative Task Creation",
                    title3: "Proof of Work",
                    title4: "Priority",
                    title5: "Notifications & Reminders",
                    activitystarttime: [
                      {
                        id: "Asperuser",
                        title: "As Per User",
                        description: "As per user",
                      },
                      {
                        id: "07:15",
                        title: "07:15 am",
                        description: "Quarter past seven in the morning",
                      },
                      {
                        id: "07:30",
                        title: "07:30 am",
                        description: "Half past seven in the morning",
                      },
                      {
                        id: "07:45",
                        title: "07:45 am",
                        description: "Quarter to eight in the morning",
                      },
                      {
                        id: "08:00",
                        title: "08:00 am",
                        description: "Eight o'clock in the morning",
                      },
                      {
                        id: "08:15",
                        title: "08:15 am",
                        description: "Quarter past eight in the morning",
                      },
                      {
                        id: "08:30",
                        title: "08:30 am",
                        description: "Half past eight in the morning",
                      },
                      {
                        id: "08:45",
                        title: "08:45 am",
                        description: "Quarter to nine in the morning",
                      },
                      {
                        id: "09:00",
                        title: "09:00 am",
                        description: "Nine o'clock in the morning",
                      },
                      {
                        id: "09:15",
                        title: "09:15 am",
                        description: "Quarter past nine in the morning",
                      },
                      {
                        id: "09:30",
                        title: "09:30 am",
                        description: "Half past nine in the morning",
                      },
                      {
                        id: "09:45",
                        title: "09:45 am",
                        description: "Quarter to ten in the morning",
                      },
                      {
                        id: "10:00",
                        title: "10:00 am",
                        description: "Ten o'clock in the morning",
                      },
                      {
                        id: "10:15",
                        title: "10:15 am",
                        description: "Quarter past ten in the morning",
                      },
                      {
                        id: "10:30",
                        title: "10:30 am",
                        description: "Half past ten in the morning",
                      },
                      {
                        id: "10:45",
                        title: "10:45 am",
                        description: "Quarter to eleven in the morning",
                      },
                      {
                        id: "11:00",
                        title: "11:00 am",
                        description: "Eleven o'clock in the morning",
                      },
                      {
                        id: "11:15",
                        title: "11:15 am",
                        description: "Quarter past eleven in the morning",
                      },
                      {
                        id: "11:30",
                        title: "11:30 am",
                        description: "Half past eleven in the morning",
                      },
                      {
                        id: "11:45",
                        title: "11:45 am",
                        description: "Quarter to twelve in the afternoon",
                      },
                      {
                        id: "12:00",
                        title: "12:00 pm",
                        description: "Twelve o'clock noon",
                      },
                      {
                        id: "12:15",
                        title: "12:15 pm",
                        description: "Quarter past twelve in the afternoon",
                      },
                      {
                        id: "12:30",
                        title: "12:30 pm",
                        description: "Half past twelve in the afternoon",
                      },
                      {
                        id: "12:45",
                        title: "12:45 pm",
                        description: "Quarter to one in the afternoon",
                      },
                      {
                        id: "13:00",
                        title: "01:00 pm",
                        description: "One o'clock in the afternoon",
                      },
                      {
                        id: "13:15",
                        title: "01:15 pm",
                        description: "Quarter past one in the afternoon",
                      },
                      {
                        id: "13:30",
                        title: "01:30 pm",
                        description: "Half past one in the afternoon",
                      },
                      {
                        id: "13:45",
                        title: "01:45 pm",
                        description: "Quarter to two in the afternoon",
                      },
                      {
                        id: "14:00",
                        title: "02:00 pm",
                        description: "Two o'clock in the afternoon",
                      },
                      {
                        id: "14:15",
                        title: "02:15 pm",
                        description: "Quarter past two in the afternoon",
                      },
                      {
                        id: "14:30",
                        title: "02:30 pm",
                        description: "Half past two in the afternoon",
                      },
                      {
                        id: "14:45",
                        title: "02:45 pm",
                        description: "Quarter to three in the afternoon",
                      },
                      {
                        id: "15:00",
                        title: "03:00 pm",
                        description: "Three o'clock in the afternoon",
                      },
                      {
                        id: "15:15",
                        title: "03:15 pm",
                        description: "Quarter past three in the afternoon",
                      },
                      {
                        id: "15:30",
                        title: "03:30 pm",
                        description: "Half past three in the afternoon",
                      },
                      {
                        id: "15:45",
                        title: "03:45 pm",
                        description: "Quarter to four in the afternoon",
                      },
                      {
                        id: "16:00",
                        title: "04:00 pm",
                        description: "Four o'clock in the afternoon",
                      },
                      {
                        id: "16:15",
                        title: "04:15 pm",
                        description: "Quarter past four in the afternoon",
                      },
                      {
                        id: "16:30",
                        title: "04:30 pm",
                        description: "Half past four in the afternoon",
                      },
                      {
                        id: "16:45",
                        title: "04:45 pm",
                        description: "Quarter to five in the afternoon",
                      },
                      {
                        id: "17:00",
                        title: "05:00 pm",
                        description: "Five o'clock in the afternoon",
                      },
                      {
                        id: "17:15",
                        title: "05:15 pm",
                        description: "Quarter past five in the afternoon",
                      },
                      {
                        id: "17:30",
                        title: "05:30 pm",
                        description: "Half past five in the afternoon",
                      },
                      {
                        id: "17:45",
                        title: "05:45 pm",
                        description: "Quarter to six in the evening",
                      },
                      {
                        id: "18:00",
                        title: "06:00 pm",
                        description: "Six o'clock in the evening",
                      },
                      {
                        id: "18:15",
                        title: "06:15 pm",
                        description: "Quarter past six in the evening",
                      },
                      {
                        id: "18:30",
                        title: "06:30 pm",
                        description: "Half past six in the evening",
                      },
                      {
                        id: "18:45",
                        title: "06:45 pm",
                        description: "Quarter to seven in the evening",
                      },
                      {
                        id: "19:00",
                        title: "07:00 pm",
                        description: "Seven o'clock in the evening",
                      },
                      {
                        id: "19:15",
                        title: "07:15 pm",
                        description: "Quarter past seven in the evening",
                      },
                      {
                        id: "19:30",
                        title: "07:30 pm",
                        description: "Half past seven in the evening",
                      },
                      {
                        id: "19:45",
                        title: "07:45 pm",
                        description: "Quarter to eight in the evening",
                      },
                      {
                        id: "20:00",
                        title: "08:00 pm",
                        description: "Eight o'clock in the evening",
                      },
                      {
                        id: "20:15",
                        title: "08:15 pm",
                        description: "Quarter past eight in the evening",
                      },
                      {
                        id: "20:30",
                        title: "08:30 pm",
                        description: "Half past eight in the evening",
                      },
                      {
                        id: "20:45",
                        title: "08:45 pm",
                        description: "Quarter to nine in the evening",
                      },
                      {
                        id: "21:00",
                        title: "09:00 pm",
                        description: "Nine o'clock in the evening",
                      },
                      {
                        id: "21:15",
                        title: "09:15 pm",
                        description: "Quarter past nine in the evening",
                      },
                      {
                        id: "21:30",
                        title: "09:30 pm",
                        description: "Half past nine in the evening",
                      },
                      {
                        id: "21:45",
                        title: "09:45 pm",
                        description: "Quarter to ten in the evening",
                      },
                      {
                        id: "22:00",
                        title: "10:00 pm",
                        description: "Ten o'clock in the evening",
                      },
                      {
                        id: "22:15",
                        title: "10:15 pm",
                        description: "Quarter past ten in the evening",
                      },
                      {
                        id: "22:30",
                        title: "10:30 pm",
                        description: "Half past ten in the evening",
                      },
                      {
                        id: "22:45",
                        title: "10:45 pm",
                        description: "Quarter to eleven in the evening",
                      },
                      {
                        id: "23:00",
                        title: "11:00 pm",
                        description: "Eleven o'clock in the evening",
                      },
                      {
                        id: "23:15",
                        title: "11:15 pm",
                        description: "Quarter past eleven in the evening",
                      },
                      {
                        id: "23:30",
                        title: "11:30 pm",
                        description: "Half past eleven in the evening",
                      },
                      {
                        id: "23:45",
                        title: "11:45 pm",
                        description: "Quarter to twelve at night",
                      },
                      {
                        id: "00:00",
                        title: "12:00 am",
                        description: "Midnight",
                      },
                      {
                        id: "00:15",
                        title: "12:15 am",
                        description: "Quarter past twelve at night",
                      },
                      {
                        id: "00:30",
                        title: "12:30 am",
                        description: "Half past twelve at night",
                      },
                      {
                        id: "00:45",
                        title: "12:45 am",
                        description: "Quarter to one in the morning",
                      },
                      {
                        id: "01:00",
                        title: "01:00 am",
                        description: "One o'clock in the morning",
                      },
                      {
                        id: "01:15",
                        title: "01:15 am",
                        description: "Quarter past one in the morning",
                      },
                      {
                        id: "01:30",
                        title: "01:30 am",
                        description: "Half past one in the morning",
                      },
                      {
                        id: "01:45",
                        title: "01:45 am",
                        description: "Quarter to two in the morning",
                      },
                      {
                        id: "02:00",
                        title: "02:00 am",
                        description: "Two o'clock in the morning",
                      },
                      {
                        id: "02:15",
                        title: "02:15 am",
                        description: "Quarter past two in the morning",
                      },
                      {
                        id: "02:30",
                        title: "02:30 am",
                        description: "Half past two in the morning",
                      },
                      {
                        id: "02:45",
                        title: "02:45 am",
                        description: "Quarter to three in the morning",
                      },
                      {
                        id: "03:00",
                        title: "03:00 am",
                        description: "Three o'clock in the morning",
                      },
                      {
                        id: "03:15",
                        title: "03:15 am",
                        description: "Quarter past three in the morning",
                      },
                      {
                        id: "03:30",
                        title: "03:30 am",
                        description: "Half past three in the morning",
                      },
                      {
                        id: "03:45",
                        title: "03:45 am",
                        description: "Quarter to four in the morning",
                      },
                      {
                        id: "04:00",
                        title: "04:00 am",
                        description: "Four o'clock in the morning",
                      },
                      {
                        id: "04:15",
                        title: "04:15 am",
                        description: "Quarter past four in the morning",
                      },
                      {
                        id: "04:30",
                        title: "04:30 am",
                        description: "Half past four in the morning",
                      },
                      {
                        id: "04:45",
                        title: "04:45 am",
                        description: "Quarter to five in the morning",
                      },
                      {
                        id: "05:00",
                        title: "05:00 am",
                        description: "Five o'clock in the morning",
                      },
                      {
                        id: "05:15",
                        title: "05:15 am",
                        description: "Quarter past five in the morning",
                      },
                      {
                        id: "05:30",
                        title: "05:30 am",
                        description: "Half past five in the morning",
                      },
                      {
                        id: "05:45",
                        title: "05:45 am",
                        description: "Quarter to six in the morning",
                      },
                      {
                        id: "06:00",
                        title: "06:00 am",
                        description: "Six o'clock in the morning",
                      },
                      {
                        id: "06:15",
                        title: "06:15 am",
                        description: "Quarter past six in the morning",
                      },
                      {
                        id: "06:30",
                        title: "06:30 am",
                        description: "Half past six in the morning",
                      },
                      {
                        id: "06:45",
                        title: "06:45 am",
                        description: "Quarter to seven in the morning",
                      },
                    ],
                    activitystartlabel: "Activity Start Time",
                    reminderlabel: "Reminder",
                    taskdurationlabel: "Task Duration",
                    nooftimeslabel: "No. of Times",
                    notificationlabel: "Notifications",
                    endinhmessagel: "Thank You",
                    finalsubmitbutton: "Submit",
                    taskduration: [
                      {
                        id: "asperuser",
                        title: "As per User",
                        description: "As per User",
                      },
                      {
                        id: "1",
                        title: "Less Than 5 min",
                        description: "5 hours and 00 minutes",
                      },
                      {
                        id: "2",
                        title: "Between 5 mins to 15 mins",
                        description: "Between 5 mins to 15 mins",
                      },
                      {
                        id: "3",
                        title: "15 mins to 30 mins",
                        description: "Between 15 mins to 30 mins",
                      },
                      {
                        id: "4",
                        title: "30 mins to 1 hour",
                        description: "Between 30 mins to 1 hour",
                      },
                      {
                        id: "5",
                        title: "1 to 2 hours",
                        description: "Between 1 to 2 hours",
                      },
                      {
                        id: "6",
                        title: "2 to 4 hours",
                        description: "Between 2 to 4 hours",
                      },
                      {
                        id: "7",
                        title: "4 to 8 hours",
                        description: "Between 4 to 8 hours",
                      },
                      {
                        id: "8",
                        title: "8 to 12 hours",
                        description: "Between 8 to 12 hours",
                      },
                      {
                        id: "9",
                        title: "12 to 16 hours",
                        description: "Between 12 to 16 hours",
                      },
                      {
                        id: "10",
                        title: "16 to 24 hours",
                        description: "Between 16 to 24 hours",
                      },
                    ],
                    nooftimes: [
                      {
                        id: "asperuser",
                        title: "As per User",
                        description: "As per User",
                      },
                      {
                        id: "2",
                        title: "1 time",
                        description: "1 time",
                      },
                      {
                        id: "3",
                        title: "2 times",
                        description: "2 times",
                      },
                      {
                        id: "4",
                        title: "3 time",
                        description: "3 time",
                      },
                      {
                        id: "5",
                        title: "4 times",
                        description: "4 times",
                      },
                      {
                        id: "6",
                        title: "5 times",
                        description: "5 times",
                      },
                      {
                        id: "7",
                        title: "6 times",
                        description: "6 times",
                      },
                      {
                        id: "8",
                        title: "7 times",
                        description: "7 times",
                      },
                      {
                        id: "9",
                        title: "8 times",
                        description: "8 times",
                      },
                      {
                        id: "10",
                        title: "9 times",
                        description: "9 times",
                      },
                    ],
                    notifications: [
                      {
                        id: "1",
                        title: "Start ",
                      },
                      {
                        id: "3",
                        title: "RealTime All",
                      },
                      {
                        id: "4",
                        title: "Change Assignee",
                      },
                      {
                        id: "2",
                        title: "End ",
                      },
                    ],
                    noofprooflabel: "No of Proofs",
                    helper1: "Name should be short and concise",
                    helper2: "Description should be indept.",
                    helper3: "Instruction should be clear",
                    locationcheckbox: [
                      {
                        id: "yeslocation",
                        title: "Yes",
                      },
                      {
                        id: "nolocation",
                        title: "No",
                      },
                    ],
                    photocheckbox: [
                      {
                        id: "1",
                        title: "Photo",
                      },
                    ],
                    textcheckbox: [
                      {
                        id: "2",
                        title: "Text",
                      },
                    ],
                    videocheckbox: [
                      {
                        id: "3",
                        title: "Video",
                      },
                    ],
                    filecheckbox: [
                      {
                        id: "5",
                        title: "File",
                      },
                    ],
                    audiocheckbox: [
                      {
                        id: "6",
                        title: "Audio",
                      },
                    ],
                    proofstrict: [
                      {
                        id: "allproof",
                        title: "All Proof Marked Above",
                      },
                      {
                        id: "anyproof",
                        title: "Any 1 Proof Marked Above",
                      },
                    ],
                    noofproofdatatext: [
                      {
                        id: "As per user",
                        title: "As per user",
                        description: "As per user",
                      },
                      {
                        id: "1",
                        title: "1",
                        description: "1 Proof",
                      },
                      {
                        id: "low",
                        title: "2",
                        description: "2 Proof",
                      },
                      {
                        id: "medium",
                        title: "3",
                        description: "3 Proof",
                      },
                      {
                        id: "no",
                        title: "4",
                        description: "4 Proof",
                      },
                    ],
                    noofproofdataaudio: [
                      {
                        id: "As per user",
                        title: "As per user",
                        description: "As per user",
                      },
                      {
                        id: "1",
                        title: "1",
                        description: "1 Proof",
                      },
                      {
                        id: "low",
                        title: "2",
                        description: "2 Proof",
                      },
                      {
                        id: "medium",
                        title: "3",
                        description: "3 Proof",
                      },
                      {
                        id: "no",
                        title: "4",
                        description: "4 Proof",
                      },
                    ],
                    noofproofdatavideo: [
                      {
                        id: "As per user",
                        title: "As per user",
                        description: "As per user",
                      },
                      {
                        id: "1",
                        title: "1",
                        description: "1 Proof",
                      },
                      {
                        id: "low",
                        title: "2",
                        description: "2 Proof",
                      },
                      {
                        id: "medium",
                        title: "3",
                        description: "3 Proof",
                      },
                      {
                        id: "no",
                        title: "4",
                        description: "4 Proof",
                      },
                    ],
                    noofproofdatafile: [
                      {
                        id: "As per user",
                        title: "As per user",
                        description: "As per user",
                      },
                      {
                        id: "1",
                        title: "1",
                        description: "1 Proof",
                      },
                      {
                        id: "low",
                        title: "2",
                        description: "2 Proof",
                      },
                      {
                        id: "medium",
                        title: "3",
                        description: "3 Proof",
                      },
                      {
                        id: "no",
                        title: "4",
                        description: "4 Proof",
                      },
                    ],
                    noofproofdataphoto: [
                      {
                        id: "As per user",
                        title: "As per user",
                        description: "As per user",
                      },
                      {
                        id: "1",
                        title: "1",
                        description: "1 Proof",
                      },
                      {
                        id: "low",
                        title: "2",
                        description: "2 Proof",
                      },
                      {
                        id: "medium",
                        title: "3",
                        description: "3 Proof",
                      },
                      {
                        id: "no",
                        title: "4",
                        description: "4 Proof",
                      },
                    ],
                    locationproofheader: "Location proof is important when there is site visits",
                    photoproofheader: "Photo of task etc can be used as proof",
                    textproofheader: "Text related to task etc can be used as proof",
                    videoproofheader: "Video related to task etc can be used as proof",
                    audioproofheader: "Audio related to task etc can be used as proof",
                    fileproofheader: "File related to task etc can be used as proof",
                    taskactivityheader: "Simple Weekly Repitative Task Creation",
                    taskactivitysubheader:
                      "Few tips for creation and effective implemntation of task",
                    taskactivitysteps:
                      " \n Step 1 : Task Info - Name, Description, Instructions \n Step 2: Proofs: Type,Quantity,Strictness \n Step 3: Priority and Assignment \n Step 4: Notifications & Reminder \n\n--------------------------------\n Standard Operating Procedure (SOP) \n-------------------------------\n 1. Task Information : \n -Task Name:- Cleaning \n -Task Description :- This task involves capturing a photo of a dustbin, and location proof is required for site visits \n -Task Instruction :- Be on time follow SOP and timings \n\n2.Proofs : \n Users can select proof options,quantity of proofs such as\n   -📷 Photo✔️ - 1,\n   -📝 Text✔️ - 2,\n   -🎥 Video❌ ,\n   -📁 File❌,\n   -🔊 Audio❌ \n with strictness preferences. \n\n3.Priorities: \n  -🔴 Critical✔️ \n  -🔶 High \n  -🟡 Medium \n  -🔵 Low \n  -⚪ No Priority \n\n Timings: \n   -⏰ Activity start time- 09:00 am\n   -⌛ Task duration- 30 mins \n   -🔔 Frequency- Twice. \n\n Notifications:\n   - All Real-time updates✔️ \n    -Task start\n  - Assignee Changes \n   -Task Completion. \n\n Date: 17/9/23 \nPrepared & Approved By: Ram Sharma ",
                    button1label: "Create Weekly Task",
                    button2label: "Next",
                    taskactivityname: "Task activity name",
                    taskactivitydescription: "Task activity desc",
                    taskactivityinstruction: "Task activity instructions",
                    taskreminderTypeLabel: "Task Frequency",
                    proofoflocationlabel: "Proof of Location",
                    proofofworklabel: "Proof of Work",
                    proofreqlabel: "Proof Strictness",
                    selectprioritylabel: "Select Priority ",
                    priorityheader: "Select the Priority",
                    assigntoradio: [
                      {
                        id: "assigntoall",
                        title: "Assign To All",
                      },
                      {
                        id: "anyone",
                        title: "Any One",
                      },
                    ],
                    strictassignlabel: "Assign Strictness",
                    priorityselection: [
                      {
                        id: "crtical",
                        title: "Critical",
                        description: "Critical priority",
                      },
                      {
                        id: "high",
                        title: "High",
                        description: "High priority",
                      },
                      {
                        id: "low",
                        title: "Low",
                        description: "Low priority",
                      },
                      {
                        id: "medium",
                        title: "Medium",
                        description: "Medium priority",
                      },
                      {
                        id: "no",
                        title: "No Priority",
                        description: "No Priority",
                      },
                    ],
                    assignto: [
                      {
                        id: "Self",
                        title: "Self",
                      },
                      {
                        id: "Assign",
                        title: "Assign",
                      },
                    ],
                    assignLabel: "Assign To",
                    init_values: {
                      TaskName: "Click Dustbin Pic",
                      department: "Hospitality",
                      taskdescription:
                        "This is most important task , Cleaniness is Next to Godliness",
                      taskinstruction:
                        "Need to first sweep, then using water clean , empty dustbin ,etc",
                      workinghours: "09:00",
                      timing: "asandwhen",
                      location: "nolocation",
                      priority: "As per user",
                      "task duration": "asperuser",
                      nooftimes: "asperuser",
                      StartTime: "Asperuser",
                      noofprooftext: "As per user",
                      noofproofvideo: "As per user",
                      noofprooffile: "As per user",
                      noofproofaudio: "As per user",
                      noofproofphoto: "As per user",
                      proof: "anyproof",
                      priorityselected: "medium",

                      assignstrict1: "assigntoall",
                      taskduration: "asperuser",

                      proofstrict1: "allproof",
                      prooftypephoto: ["1"],

                      prooftypetext: ["2"],
                      prooftypevideo: ["3"],
                      prooftypefile: ["5"],

                      prooftypeaudio: ["6"],

                      assign: ["Self"],
                      notification: ["Self"],
                      startDate: "12/12/2022",
                      notify: ["1"],
                    },
                  },
                };

                await sendFlow({
                  body: message,
                  flow_data: flowData,
                  flow_cta: "AutowhatTask",
                  flow_id: CREATEWEEKLY_TASKX_FLOW_ID,

                  flow_token: CREATEWEEKLY_TASKX_TOKEN,
                  recipientPhone,
                });
              } else if (flowName === "languages") {
                const { language } = flowMessage;

                updateUserSession(
                  { session: "timezoneLocation", selectedLanguage: { type: language } },
                  session,
                  recipientPhone
                );

                const message = getTextMessage(language, "timezoneLocation");
                await sendTextMessage(message, recipientPhone);
              }
            }
          } else {
            if (messageHandler[typeOfMsg]) {
              await messageHandler[typeOfMsg](incomingMessage, recipientPhone, session);
            } else if (incomingMessage.interactive?.type === "nfm_reply") {
              await messageHandler[incomingMessage.interactive.type](
                incomingMessage.interactive.nfm_reply.response_json,
                recipientPhone,
                session
              );
            } else if (incomingMessage.document && incomingMessage.document.filename) {
              if (session.get(recipientPhone).session === "broadcast") {
                const broadcastMessage = session.get(recipientPhone).broadcastMessage;
                const employees = session.get(recipientPhone).employees;

                const mediaUrl = await getMediaUrl(incomingMessage.document.id);

                const fileName = incomingMessage.document.filename;
                const isSaved = await downloadAndSave(mediaUrl, fileName);

                if (isSaved) {
                  await Promise.allSettled(
                    employees.map((employee) => {
                      return sendDocument({
                        caption: broadcastMessage,
                        file_path: path.join(process.env.ROOT_PATH, fileName),
                        recipientPhone: employee,
                      });
                    })
                  );
                }

                await sendTextMessage(
                  "Message has been broadcasted to all employees",
                  recipientPhone
                );
                session.delete(recipientPhone);
              } else {
                const mediaUrl = await getMediaUrl(incomingMessage.document.id);

                if (mediaUrl) {
                  const response = await uploadToBucket(
                    mediaUrl,
                    incomingMessage.document.filename
                  );

                  if (response.status === "success") {
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
                      session.get(recipientPhone).logDocUrl = response.url;
                    }
                  }
                }
              }
            } else if (incomingMessage.video && incomingMessage.video.id) {
              if (session.get(recipientPhone).session === "broadcast") {
                const broadcastMessage = session.get(recipientPhone).broadcastMessage;
                const employees = session.get(recipientPhone).employees;

                const mediaUrl = await getMediaUrl(incomingMessage.video.id);
                const fileName = `${incomingMessage.video.id}-${recipientPhone}.mp4`;

                const isSaved = await downloadAndSave(mediaUrl, fileName);

                if (isSaved) {
                  await Promise.allSettled(
                    employees.map((employee) => {
                      return sendVideo({
                        caption: broadcastMessage,
                        file_path: path.join(process.env.ROOT_PATH, fileName),
                        recipientPhone: employee,
                      });
                    })
                  );
                  await sendTextMessage(
                    "Message has been broadcasted to all employees",
                    recipientPhone
                  );
                  session.delete(recipientPhone);
                }
              }
            } else {
              await sendTextMessage("Please Type 'Hi' to Start", recipientPhone);
            }
          }

          await Whatsapp.markMessageAsRead({ message_id });
        } catch (err) {
          console.log(err, "en Error Occured While processing request");

          const error = err.stack?.split(/ {3}at /g);
          const errorMsg = `${error?.[0]} (${new Date()} [${recipientPhone}]):\n${error.slice(
            1
          )}\n\n`;

          fs.appendFileSync(path.join(process.env.ROOT_PATH, "errorLog.txt"), errorMsg);
        }
      }
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};

function isMessage(message) {
  return message?.isMessage;
}

function parseMessage(message) {
  return {
    incomingMessage: message,
    recipientName: message.from.name,
    recipientPhone: Number(message.from.phone),
    typeOfMsg: message.type,
    message_id: message.message_id,
    timestamp: Number(`${message.timestamp}000`) + 1e4,
  };
}

function isMessageRecent(timestamp) {
  const currentTimestamp = new Date().getTime();

  return timestamp > currentTimestamp;
}

async function isRecipientRegistered(recipientPhone, currentSession) {
  if (currentSession.has(recipientPhone)) {
    currentSession.get(recipientPhone).ttl = Date.now() + ONE_HOUR_IN_MS;
    return currentSession.get(recipientPhone).isRegistered;
  }

  const employee = await Employee.findOne({ employeeNumber: recipientPhone, isActive: true });

  if (employee) {
    currentSession.set(recipientPhone, {
      isRegistered: true,
      user: {
        isEmployee: true,
        employeeName: employee.employeeName,
        employeeNumber: employee.employeeNumber,
        companyName: employee.companyName,
        employerNumber: employee.employerNumber,
        natureOfTime: employee.natureOfTime,
        checkIn: moment.tz(employee.checkIn, employee.timeZone),
        checkOut: moment.tz(employee.checkOut, employee.timeZone),
        requiredHours: moment.tz(employee.requiredHours, employee.timeZone),
        locations: employee.locations,
        companyId: employee.companyId.toString(),
        employeeId: employee._id.toString(),
        language: employee.language,
        timeZone: employee.timeZone,
        countryName: employee.countryName,
        bufferTime: employee.bufferTime * 60 * 1000,
        shiftType: employee.shiftType,
        proof: employee.proof,
        createdAt: employee.createdAt,
        workDays: employee.workDays,
        role: employee.role,  
      },
      ttl: Date.now() + ONE_HOUR_IN_MS,
    });

    return true;
  }

  const employer = await Employer.findOne({ employerNumber: recipientPhone });

  if (employer) {
    currentSession.set(recipientPhone, {
      isRegistered: true,
      user: {
        employerName: employer.fullName,
        isEmployee: false,
        companyId: employer._id.toString(),
        companyNumber: employer.employerNumber,
        companyName: employer.companyName,
        language: employer.language,
        notifications: employer.notifications,
        registeredOn: employer.registeredOn,
        places: employer.branch,
        countryName: employer.countryName,
        countryCode: employer.countryCode,
        timeZone: employer.timeZone,
        regionName: employer.regionName,
      },
      ttl: Date.now() + ONE_HOUR_IN_MS,
    });

    return true;
  }

  return false;
}

function updateUserSession(sessionItems, session, recipientPhone) {
  Object.entries(sessionItems).forEach(([sessionKey, sessionValue]) => {
    session.get(recipientPhone)[sessionKey] = sessionValue;
  });
}

async function sendSimpleButtons(message, listOfButtons, recipientPhone) {
  try {
    await Whatsapp.sendSimpleButtons({
      message,
      recipientPhone,
      listOfButtons,
    });
  } catch (error) {
    console.log(error, "error");
  }
}

async function sendTextMessage(message, recipientPhone) {
  try {
    await Whatsapp.sendText({ message, recipientPhone });
  } catch (error) {
    console.log(error, "error");
  }
}

// async function sendRadioButtons(message, buttonname, listOfSections, recipientPhone) {
//   await Whatsapp.sendRadioButtons({
//     recipientPhone,
//     headerText: "Thank you for your selection",
//     bodyText: message,
//     footerText: "©Autowhat",
//     buttonname,
//     listOfSections,
//   });
// }

function generateRandomNumber(length) {
  let result = "";
  const characters = "0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// ? Job to clear expired session: runs in every 1 hour
cron.schedule("* */1 * * *", async () => {
  session.forEach((sessionObj, sessionKey) => {
    if (sessionObj.ttl <= Date.now()) {
      session.delete(sessionKey);
    }
  });
});

// ? Job to send Morning and Evening Reports to Employers: runs on every 1 Hour 58 Mins
cron.schedule("58 */1 * * *", async () => {
  await sendReport();
});

// ? Job to send checkIn and checkOut reminders to employees: runs in every 5 mins
cron.schedule("*/5 * * * *", async () => {
  const time = moment.tz(new Date(), "Asia/Kolkata");
  const { hours, minutes } = getDateParts(time);

  const startTime = new Date(1970, 0, 1, hours, minutes);
  const endTime = new Date(1970, 0, 1, hours, minutes);

  const employees = await Employee.find({
    isActive: true,
    $or: [
      { $and: [{ checkOut: { $gte: startTime } }, { checkOut: { $lte: endTime } }] },
      { $and: [{ checkIn: { $gte: startTime } }, { checkIn: { $lte: endTime } }] },
    ],
  });

  await sendReminders(employees);
});

// ? Job to send Activate Session to Employers: runs on 8 AM everyday
// cron.schedule("0 8 * * *", async () => {
//   const employers = await Employer.find({}, { employerNumber: 1 });

//   await Promise.allSettled(
//     employers.map((employer) => {
//       sendActivateSessionTemplate(employer.employerNumber);
//     })
//   );
// });

async function sendReport() {
  const hourInMs = 1 * 60 * 60 * 1000;
  const currentHourInMs = (new Date().getHours() + 1) * hourInMs;

  const employers = await Employer.find(
    {
      $or: [
        { "notifications.morningReportTime": currentHourInMs },
        { "notifications.eveningReportTime": currentHourInMs },
      ],
    },
    { companyId: 1, employerNumber: 1 }
  );

  if (!employers || employers.length === 0) return;

  await Promise.allSettled(
    employers.map(async (employer) => {
      const { employerNumber, timeZone, _id, language } = employer;

      const isReport = await createLiveReport(employerNumber, _id, language, timeZone);

      if (isReport) {
        await new Promise(() =>
          setTimeout(
            async () =>
              await sendDocument({
                caption: "Live Report",
                recipientPhone: employerNumber,
                file_path: `${employerNumber}-liveReport.pdf`,
              }),
            90000
          )
        );
      }
    })
  );
}

async function sendReminders(employees) {
  await Promise.allSettled(
    employees.map((employee) => {
      if (employee && employee.number) {
        const message = getTextMessage(employee.language, employee.action, [], "main");
        return sendTextMessage(message, employee.number);
      }
    })
  );
}

export default whatsappMessageController;
