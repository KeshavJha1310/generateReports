import { sendSimpleButtons, sendTextMessage } from "../utils/messages.js";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { fileURLToPath } from "url";
const rootPath = path.dirname(__dirname);

import { sendDocument } from "../utils/messages.js";

async function handleQuickReplyMessage({ message, recipientPhone, session }) {
  if (message.button?.payload === "empdemo") {
    const textMessage =
      " *Welcome to the Interactive demo of AutoWhat Attendance on WhatsApp!* \n\nPlease select language from below";
    const listOfButtons = [
      {
        id: "singlelanguage",
        title: "One Language",
      },
      {
        id: "duallanguage",
        title: "English+One Language",
      },
    ];

    await sendSimpleButtons(textMessage, listOfButtons, recipientPhone);

    session.get(recipientPhone).session = "empdemo";
  } else if (message.button?.payload === "brochure") {
    await sendDocument({
      file_path: path.join(rootPath, "/public/Attendance-Bot-Autowhat.pdf"),
      caption: "Attendance Bot Brochure",
      recipientPhone,
    });
  } else if (message.button?.payload === "dontwork") {
    await sendTextMessage(
      "Sorry for disturbing you. We let know the concerned person that you dont work here.\nHave a Great Day",
      recipientPhone
    );
  } else if (message.button?.payload === "activateSession") {
    await sendTextMessage("Your Today session has been activated", recipientPhone);
  } else if (message.button?.payload === "directStart") {
    const textMessage =
    " *Welcome to the Interactive demo of AutoWhat Attendance on WhatsApp!* \n\nPlease select language from below";
  const listOfButtons = [
    {
      id: "singlelanguage",
      title: "One Language",
    },
    {
      id: "duallanguage",
      title: "English+One Language",
    },
  ];

  await sendSimpleButtons(textMessage, listOfButtons, recipientPhone);

  session.get(recipientPhone).session = "empSignup";
  }
}

export default handleQuickReplyMessage;
