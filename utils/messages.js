import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

import { Whatsapp } from "../controllers/whatsappMessageController.js";

const WHATSAPP_API = axios.create({
  baseURL: `https://graph.facebook.com/v18.0/${process.env.Meta_WA_SenderPhoneNumberId}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.Meta_WA_accessToken}`,
  },
});

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

async function sendRadioButtons(message, listOfSections, recipientPhone, buttonname) {
  await Whatsapp.sendRadioButtons({
    recipientPhone,
    headerText: "AutoWhat ChatBot",
    bodyText: message,
    footerText: "© 2023 AutoWhat ChatBot",
    listOfSections,
    buttonname,
  });
}

async function sendDocument({ caption, recipientPhone, file_path }) {
  await Whatsapp.sendDocument({
    recipientPhone,
    caption,
    file_path,
  });
}

async function sendLocation({ recipientPhone, latitude, longitude, name, address }) {
  await Whatsapp.sendLocation({
    recipientPhone,
    latitude,
    longitude,
    name,
    address,
  });
}

async function sendImage({ caption, file_path, url, recipientPhone }) {
  await Whatsapp.sendImage({
    recipientPhone,
    caption,
    file_path,
    url,
  });
}

async function sendVideo({ caption, file_path, url, recipientPhone }) {
  await Whatsapp.sendVideo({
    recipientPhone,
    caption,
    file_path,
    url,
  });
}

function createFlow(
  header,
  body,
  footer,
  flow_id,
  flow_cta,
  flow_token,
  flow_data,
  recipientPhone
) {
  const flowObj = {
    messaging_product: "whatsapp",
    to: recipientPhone,
    type: "interactive",
    interactive: {
      type: "flow",
      header: {
        type: "text",
        text: header ?? "Hi",
      },
      body: {
        text: body ?? "Body",
      },
      footer: {
        text: footer ?? "©Autowhat",
      },
      action: {
        name: "flow",
        parameters: {
          flow_message_version: "3",
          flow_token,
          flow_id,
          flow_cta,
          flow_action: "data_exchange",
        },
      },
    },
  };

  if (flow_data) {
    if (!flow_data.screen) {
      throw new Error("Screen Name is required when sending custom flow data");
    }

    flowObj.interactive.action.parameters["flow_action_payload"] = {
      screen: flow_data.screen,
      data: flow_data.data,
    };

    delete flowObj.interactive.action.parameters.flow_action;
  }

  return flowObj;
}

function createFlowData(screenName, screenData) {
  return {
    screen: screenName,
    data: screenData,
  };
}

async function sendFlow({
  header,
  body,
  footer,
  flow_id,
  flow_cta,
  flow_token,
  flow_data,
  recipientPhone,
}) {
  try {
    const flowObj = createFlow(
      header,
      body,
      footer,
      flow_id,
      flow_cta,
      flow_token,
      flow_data,
      recipientPhone
    );
    await WHATSAPP_API.post("/messages", flowObj);
  } catch (err) {
    console.error(err.response);
  }
}

function createTemplate(
  templateName,
  recipientPhone,
  { bodyComponent, headerComponent, components, language }
) {
  return {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhone,
    type: "template",
    template: {
      name: templateName,
      language: {
        code: language ?? "en_US",
      },
      components: [...(bodyComponent ?? []), ...(headerComponent ?? []), ...(components ?? {})],
    },
  };
}

function createComponent(componentName, parameters) {
  return [
    {
      type: componentName,
      parameters: [...parameters],
    },
  ];
}

function createButtonComponent(index, subType, parameters) {
  return {
    type: "button",
    sub_type: subType,
    index: index,
    parameters: [...parameters],
  };
}

function createPayload(payload) {
  return [
    {
      type: "payload",
      payload,
    },
  ];
}

async function sendEmployeeDemoTemplate(messageOne, recipientPhone) {
  const headerParamters = [
    {
      type: "image",
      image: {
        link: "https://i.ibb.co/r7H5pPk/Copy-of-Copy-of-Cut-Costs-by-Over-Rs-15000-Monthly-with-Attendance-Tracking-2.png",
      },
    },
  ];
  const bodyParameters = [
    {
      type: "text",
      text: ` *${messageOne}* `,
    },
  ];

  const headerComponent = createComponent("header", headerParamters);
  const bodyComponent = createComponent("body", bodyParameters);

  const buttonStartDemo = createButtonComponent("0", "quick_reply", createPayload("empdemo"));
  const buttonDirectStart = createButtonComponent("1", "quick_reply", createPayload("directStart"));
  const buttonDontWork = createButtonComponent("2", "quick_reply", createPayload("dontwork"));

  const templateObj = createTemplate("employee_demo", recipientPhone, {
    bodyComponent,
    headerComponent,
    components: [buttonStartDemo, buttonDirectStart, buttonDontWork],
  });

  await WHATSAPP_API.post("/messages", templateObj);
}

// sendEmployeeDemoTemplate("Test", 918657854260)

async function sendActivateSessionTemplate(recipientPhone) {
  const headerParamters = [
    {
      type: "image",
      image: {
        link: "https://i.ibb.co/r7H5pPk/Copy-of-Copy-of-Cut-Costs-by-Over-Rs-15000-Monthly-with-Attendance-Tracking-2.png",
      },
    },
  ];
  // const bodyParameters = [
  //   {
  //     type: "text",
  //     text: `Activate today's session  by clicking the below button`,
  //   },
  // ];

  const headerComponent = createComponent("header", headerParamters);
  // const bodyComponent = createComponent("body", bodyParameters);
  const buttonActivateSession = createButtonComponent(
    "0",
    "quick_reply",
    createPayload("activateSession")
  );
  const template = createTemplate("employer_start_session", recipientPhone, {
    headerComponent,
    components: [buttonActivateSession],
  });

  await WHATSAPP_API.post("/messages", template);
}

export {
  sendTextMessage,
  sendSimpleButtons,
  sendRadioButtons,
  sendDocument,
  sendLocation,
  sendImage,
  sendVideo,
  sendFlow,
  sendEmployeeDemoTemplate,
  sendActivateSessionTemplate,
  createFlowData,
};
