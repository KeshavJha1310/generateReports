import { encryptResponse } from "../middleware/flowDecryption.js";

function encryptScreenData(
  screenName,
  screenData,
  version,
  aesKeyBuffer,
  initialVectorBuffer
) {

  const screen = {
    version,
    screen: screenName,
  };

  if (screenData) {
    screen.data = screenData;
  }

  const encryptedResponse = encryptResponse(
    screen,
    aesKeyBuffer,
    initialVectorBuffer
  );
  
  return encryptedResponse;
}

function sendScreen({ screenName, screenData }, msgBody, res) {
  const { version, aesKeyBuffer, initialVectorBuffer } = msgBody;

  const encryptedResponse = encryptScreenData(
    screenName,
    screenData,
    version,
    aesKeyBuffer,
    initialVectorBuffer
  );
  return res.send(encryptedResponse);
}

const oneDayLeaveController = (req, res) => {
  const screenName = "Request_Leave_One";
  const screenData = {
    data: {
      some_key: "some value",
    },
  };

  return sendScreen({ screenName, screenData }, req.body, res);
};

const manyDayLeaveController = (req, res) => {
  const screenName = "Request_Leave_Many";
  const screenData = {
    data: {
      some_key: "some value",
    },
  };

  return sendScreen({ screenName, screenData }, req.body, res);
};

const editEmployeeController = (req, res) => {
  const screenName = "Edit_Employee";
  const screenData = {
    "data": {
      "employeename": "Ram Sharms",
      "employeeno": "918291849565"
  }
    
  };

  return sendScreen({ screenName, screenData }, req.body, res);
};

const signUpController = (req, res) => {
  const screenName = "Sign_Up";
  const screenData = {
    data: {
      some_key: "some value",
    },
  };

  return sendScreen({ screenName, screenData }, req.body, res);
};

export {
  oneDayLeaveController,
  manyDayLeaveController,
  editEmployeeController,
  signUpController,
};
