import axios from "axios";
import { promises as fs } from "fs";
import { createWriteStream } from "fs";
import { join } from "path";
import moment from "moment-timezone";

import { Attendance, Employer } from "../models/index.js";
import { EPOCH } from "./constants.js";
import { sendLocation, sendTextMessage } from "./messages.js";

export async function axiosConfig(url, method, data = "") {
  return {
    method,
    maxBodyLength: Infinity,
    url,
    headers: {
      Authorization: `Bearer ${process.env.Meta_WA_accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  };
}

export async function axiosRequest(config) {
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function updateUserSession(sessionItems, session, recipientPhone) {
  Object.entries(sessionItems).forEach(([sessionKey, sessionValue]) => {
    session.get(recipientPhone)[sessionKey] = sessionValue;
  });
}

export function getSixMonthsInMs(currentDate) {
  return new Date(currentDate.setMonth(currentDate.getMonth() + 6)).getTime();
}

export function convertTo12HourFormat(time) {
  const [hour, minute] = time.split(":");

  const date = new Date();

  date.setHours(hour);
  date.setMinutes(minute);

  return date.toLocaleTimeString("en-US", {
    timezone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function convertTo24HourFormat(time12h) {
  const [time, modifier] = time12h.split(" ");

  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
}

export function getLanguage(language) {
  return language?.split("+")?.[1] ?? language;
}

export async function deleteFile(fileName) {
  const filePath = join(process.env.ROOT_PATH, fileName);

  if (fileExists(filePath)) {
    await fs.unlink(filePath);
  }
}

export async function fileExists(path) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

export function getDateParts(time) {
  return {
    year: time.year(),
    month: time.month(),
    date: time.date(),
    hours: time.hour(),
    minutes: time.minute(),
    seconds: time.second(),
  };
}

export function formatTime(time, type = "ms") {
  let hours = "";
  let minutes = "";

  if (type === "ms") {
    const seconds = Math.floor(time / 1000);

    hours = Math.floor(seconds / 3600);
    minutes = Math.floor((seconds % 3600) / 60);
  } else if (type === "secs") {
    hours = Math.floor(time / 3600);
    minutes = Math.floor((time % 3600) / 60);
  } else if (type === "mins") {
    hours = Math.floor(time / 60);
    minutes = (time % 60).toFixed(0);
  }

  return `${hours}hr ${minutes}m`.trim();
}

export async function getTimeZone(lat, long) {
  const url = `${process.env.TIME_ZONE_API_URL}/get-time-zone?key=${process.env.TIME_ZONE_API_KEY}&format=json&by=position&lat=${lat}&lng=${long}`;

  const response = await axios.request(url, { method: "GET", contentType: "application/json" });

  return response.data;
}

export function getTimeZoneAwareDate(timeZone, date) {
  const options = {
    hour: "numeric",
    minute: "numeric",
    year: "2-digit",
    month: "numeric",
    day: "numeric",
    timeZone,
  };

  return new Intl.DateTimeFormat("en-GB", options).format(date).split(", ");
}

export function sortDatesAscending(datesArray) {
  const arrLen = datesArray.length;
  let min;

  for (let i = 0; i < arrLen; i++) {
    min = i;
    for (let j = 0; j < arrLen; j++) {
      if (compareDate(new Date(datesArray[min]), new Date(datesArray[j]))) {
        min = j;
      }
    }

    swap(i, min, datesArray);
  }
}

function compareDate(date1, date2) {
  return date2.getTime() < date1.getTime();
}

function swap(insertIndex, minIndex, array) {
  const temp = array[insertIndex];

  array[insertIndex] = array[minIndex];
  array[minIndex] = temp;
}

export function getPreviousDayDate(time) {
  return time.set("date", time.date() - 1);
}

export function formatTime12h(time, timeZone) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
    hour12: false,
  }).format(time);
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function createEmployeeProperties(employees) {
  const result = {
    employeeList1: [],
    employeeList2: [],
    employeeList3: [],
    employeeList4: [],
  };

  const checkboxes = employees.map((employee) => {
    return {
      id: `${employee.employeeNumber}`,
      title: createFormattedString(
        employee.employeeName,
        `${formatTime12h(employee.checkIn)?.replace(" ", "")?.toLowerCase()}-${formatTime12h(
          employee.checkOut
        )
          ?.replace(" ", "")
          ?.toLowerCase()}`,
        employee.natureOfTime === "flexible" ? "Flexible" : "Fixed",
        employee.shiftType
      ),
    };
  });

  const arrs = splitArray(checkboxes, Object.keys(result).length);

  arrs.forEach((arr, i) => {
    result[`employeeList${i + 1}`].push(...arr);
  });

  return result;
}

function createFormattedString(userName, timingType, timing, shiftType) {
  const nameAbbreviation = `${userName.split(" ")[0].slice(0, 5)}${
    userName.split(" ")[1]?.charAt(0) ?? ""
  }`;

  const formattedTiming = timing?.replace(/^0/, "");

  let formattedString = `${nameAbbreviation} ${formattedTiming}-${timingType}-${
    shiftType === "day" ? "D" : "N"
  }`;

  if (formattedString.length > 30) {
    return formattedString.slice(0, 30);
  }

  return formattedString;
}

export function splitArray(arrs, chunkLength) {
  const arrayLength = arrs.length;

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

export async function handleNightShift(user, attendance) {
  const { shiftType, timeZone, employeeId, companyId } = user;

  if (shiftType === "day/night" && attendance.length === 0) {
    const time = moment.tz(new Date(), timeZone);
    const previousDate = getPreviousDayDate(time);

    attendance = await Attendance.find({
      employeeId,
      companyId,
      date: {
        $eq: new Date(previousDate.year(), previousDate.month(), previousDate.date()),
      },
    });

    if (attendance.length > 0) {
      attendance = attendance[attendance.length - 1];
    }
  }

  return attendance;
}

export function generateCheckInStatus(time, user) {
  const { timeZone, checkIn, bufferTime } = user;
  const { hours, minutes, seconds } = getDateParts(time);

  const status = calculateCheckInStatus(
    moment.tz(new Date(...EPOCH, hours, minutes, seconds), timeZone),
    checkIn,
    bufferTime
  );

  return status;
}

export function calculateCheckInStatus(checkInTime, fixedCheckInTime, buffer) {
  const diff = checkInTime.diff(fixedCheckInTime);

  if (diff < 0 || diff === 0 || (diff > 0 && diff < buffer) || diff === buffer)
    return ["On Time", "onTime"];

  if (diff > buffer) return ["Late", "late"];
}

export function generateCheckOutStatus(time, attendance, user) {
  const { checkOut, timeZone, requiredHours, natureOfTime } = user;
  const { hours, minutes, seconds } = getDateParts(time);
  const epoch = [...EPOCH];

  let status = "";

  const timeSpentDuration = moment
    .duration(time.diff(moment.tz(attendance.checkInTime, timeZone)))
    .asMinutes();
  const timeSpent = formatTime(timeSpentDuration, "mins");

  if (natureOfTime === "Flexible") {
    status =
      timeSpentDuration >= requiredHours.get("hours") * 60 + requiredHours.get("minutes")
        ? ["Full Day", "full-day"]
        : ["Half Day", "half-day"];
  } else {
    if (time.date() % attendance.date.getDate() === 0) {
      epoch[2] = 0;
    }

    status = calculateCheckOutStatus(
      moment.tz(new Date(...epoch, hours, minutes, seconds), timeZone),
      checkOut,
      attendance.status
    );
  }

  return { status, timeSpent };
}

export function calculateCheckOutStatus(checkOutTime, fixedCheckOutTime, checkInStatus) {
  if (checkInStatus === "late") return ["Half Day", "half-day"];

  const diff = checkOutTime.diff(fixedCheckOutTime);

  if (diff > 0 || diff === 0) return ["Full Day", "full-day"];
  if (diff < 0) return ["Half Day", "half-day"];
}

export async function sendAttendanceNotification(employerNumber, companyId, data) {
  const { notifications } = await Employer.findNotfications(companyId);

  if (notifications.checkIn || notifications.checkOut) {
    const { latitude, longitude, name, address } = data;

    await sendLocation({
      latitude,
      longitude,
      recipientPhone: employerNumber.toString(),
      name,
      address,
    });
  }
}

export async function markAttendance(type, recipientPhone, attendanceData, user) {
  const {
    employeeId,
    companyId,
    timeZone,
    natureOfTime,
    countryName,
    checkIn,
    checkOut,
    requiredHours,
  } = user;

  const { checkInPic, checkOutPic } = attendanceData;
  const coords = [attendanceData.lat ?? 0, attendanceData.long ?? 0];

  const time = moment.tz(new Date(), timeZone);

  const data = {
    recipientPhone,
    name: `${type.toUpperCase()}✅`,
    address: `${time.format("DD/MM/YY HH:mm A")} ${countryName} ${natureOfTime}`,
  };

  let attendance = await Attendance.findAttendance(employeeId, companyId);
  attendance = await handleNightShift(user, attendance);

  if (type === "in") {
    const status = generateCheckInStatus(time, user);

    const checkInData = {
      employeeId,
      companyId,
      date: moment.tz(new Date(time.year(), time.month(), time.date()), timeZone),
      checkInTime: time,
      checkInCoords: coords,
      checkInPic: checkInPic ?? "none",
    };

    if (natureOfTime === "Fixed") {
      checkInData.status = status[1];
      data.name += ` ${status[0]}`;
    } else if (natureOfTime === "Flexible") {
      checkInData.status = "onTime";
    }

    await Attendance.create(checkInData);
  } else {
    const { status, timeSpent } = generateCheckOutStatus(time, attendance, user);

    data.name += ` ${timeSpent} ${status[0]}`;

    if (natureOfTime === "Fixed") {
      data.address += ` ${formatTime12h(checkIn)}-${formatTime12h(checkOut)}`;
    } else {
      data.address += ` ${requiredHours.hour()}h ${requiredHours.minute()}m`;
    }

    await attendance.updateOne({
      checkOutTime: time,
      checkOutCoords: coords,
      checkOutPic: checkOutPic ?? "none",
      timeSpent,
      status: status[1],
    });
  }

  return data;
}

export async function makeApiRequest(message, recipientPhone) {
  let apiData = JSON.stringify({
    model: "mistralai/Mistral-7B-Instruct-v0.1",
    messages: [
      {
        role: "user",
        content:
          "You are Assistant Business Coach to a MSME business owner you must do whatever he says also you are an attendance bot support in case of help and support related to the attendance bot. You can say please WhatsApp on +918448804355. Below is the customer message:\n" +
          message,
      },
    ],
  });

  let apiConfig = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.deepinfra.com/v1/openai/chat/completions",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer 1N3TodeR2PsWSa7JKNX2Hn9oNwTUf1V2",
    },
    data: apiData,
  };

  try {
    const response = await axios.request(apiConfig);
    await sendTextMessage(response.data.choices[0].message.content, recipientPhone);
  } catch (error) {
    console.error(error);
    await sendTextMessage("Sorry an error occured ", recipientPhone);
  }
}

export async function isCheckIn(user) {
  const { employeeId, companyId } = user;

  let attendance = await Attendance.findAttendance(employeeId, companyId);
  attendance = await handleNightShift(user, attendance);

  if (attendance && attendance.checkInTime && !attendance.checkOutTime) {
    return attendance;
  }

  return false;
}

export async function getMediaUrl(mediaId) {
  try {
    const metaImageUrl = `https://graph.facebook.com/v16.0/${mediaId}`;
    const imageUrlConfig = await axiosConfig(metaImageUrl, "get");

    const { url } = await axiosRequest(imageUrlConfig);
    return url;
  } catch (e) {
    return "";
  }
}

export async function downloadAndSave(mediaUrl, fileName) {
  const downloadImageConfig = await axiosConfig(mediaUrl, "get");
  const response = await axios({
    ...downloadImageConfig,
    responseType: "stream",
  });

  const fileStream = createWriteStream(fileName);

  response.data.pipe(fileStream);

  return await new Promise((resolve, reject) => {
    fileStream.on("finish", () => resolve(true));
    fileStream.on("error", () => reject(false));
  });
}

export function dateFromHourStr(date, hourStr, timeZone) {
  return moment.tz(
    new Date(date.year(), date.month(), date.date(), ...hourStr.split(":")),
    timeZone
  );
}

export function calculateMonthRange(registeredOn, timeZone) {
  const date = moment.tz(new Date(), timeZone);
  const startDate = getRegisteredDate(registeredOn, date);

  const monthStart = moment.tz(new Date(date.year(), date.month(), startDate, 0, 0, 0), timeZone);
  const monthEnd = moment.tz(
    new Date(date.year(), date.month(), date.daysInMonth(), 0, 0, 0),
    timeZone
  );

  return { monthStart, monthEnd };
}

export function getRegisteredDate(registeredOn, currentDate) {
  const createdDate = new Date(registeredOn);
  let startDate = -1;

  if (
    createdDate.getFullYear() === currentDate.year() &&
    createdDate.getMonth() === currentDate.month()
  ) {
    return createdDate.getDate();
  }

  return startDate;
}

export function convertTimeTo12HourFormat(time) {
  let formattedHours = parseInt(time.hour(), 10);
  const amPm = formattedHours >= 12 ? "PM" : "AM";
  formattedHours = formattedHours % 12 || 12;

  const formattedMinutes = String(time.minute()).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes} ${amPm}`;
}
