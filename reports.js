import nunjucks from "nunjucks";
import path from "path";
import pdf from "html-pdf";
import imageToBase64 from "image-to-base64";
import moment from "moment-timezone";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

import { Attendance, Leave, Employee } from "./models/index.js";
import { getTextMessage } from "./utils/languages.js";
import {
  getTimeZoneAwareDate,
  getPreviousDayDate,
  convertTimeTo12HourFormat,
} from "./utils/utils.js";

let mapImg, cameraImg, liveImg, calendarImg;

(async () => {
  mapImg = await imageToBase64(path.join(process.env.ROOT_PATH, "/templates/map.png"));
  cameraImg = await imageToBase64(path.join(process.env.ROOT_PATH, "/templates/camera.png"));
  liveImg = await imageToBase64(path.join(process.env.ROOT_PATH, "/templates/live.png"));
  calendarImg = await imageToBase64(path.join(process.env.ROOT_PATH, "/templates/calendar.png"));

  await createLiveReport(919619565155, "65bb779306379711ff0d3c88", "English", "Asia/Kolkata", "yesterday");

  // await createLiveReport(918369644748, "6588d2a676407efaa9bd7160", "English", "yesterday");
  // createAllEmployeeReport(918369644748, "65b898f9111b1c826061ec60", "English");
  // createEmployeeReport("current", "65854577eaee9435dfd76dcc", "English");

  // await createDateRangeReport(
  //   moment.tz(new Date(1704047400000), "Asia/Kolkata"),
  //   moment.tz(new Date(1706812200000), "Asia/Kolkata"),
  //   {
  //     companyId: "65b898f9111b1c826061ec60",
  //     language: "English",
  //     companyName: "Canada",
  //     companyNumber: 918369644748,
  //   }
  // );
  // await sendDocument({
  //   caption: "Date Range Report",
  //   file_path: "./919820036070-dateRangeReport.pdf",
  //   recipientPhone: 918657854260,
  // });
})();

async function createLiveReport(recipientPhone, companyId, language, timeZone, type = "live") {
  let day = moment.tz(new Date(), timeZone);

  if (type === "yesterday") {
    day = getPreviousDayDate(day);
  }

  const currentDayStart = new Date(day.year(), day.month(), day.date());
  const currentDayEnd = new Date(day.year(), day.month(), day.date(), 23, 59, 59);

  const attendances = await Attendance.find(
    {
      companyId,
      $and: [
        {
          date: { $gte: currentDayStart },
        },
        {
          date: { $lte: currentDayEnd },
        },
      ],
    },
    {
      _id: 0,
      companyId: 0,
    }
  );

  const leaves = await Leave.find(
    {
      companyId,
      from: {
        $gte: currentDayStart,
      },
    },
    {
      _id: 0,
      companyId: 0,
      createdAt: 0,
      updatedAt: 0,
    }
  );

  const employees = await Employee.find(
    {
      employerNumber: Number(recipientPhone),
      companyId: companyId,
      isActive: true,
    },
    {
      employeeName: 1,
      employeeNumber: 1,
      checkIn: 1,
      checkOut: 1,
      natureOfTime: 1,
      timeZone: 1,
      requiredHours: 1,
      companyName: 1,
    }
  );

  if ((attendances && attendances.length > 0) || (leaves && leaves.length > 0)) {
    const message = getTextMessage(language, "live-report-templates", [], "main");

    const reportObj = {
      currentDate: currentDayStart.toDateString(),
      leaveRequestsCount: leaves?.length,
      employeesCount: employees?.length,
      onTimeEmployees: 0,
      lateEmployees: 0,
      companyName: employees?.at(0)?.companyName ?? "",
      ...message,
      mapImg,
      cameraImg,
    };

    if (type === "live") {
      reportObj.liveImg = liveImg;
    }

    const {
      attendance,
      leave,
      onTimeEmployees,
      lateEmployees,
      halfDayEmployees,
      fullDayEmployees,
      presentEmployeeIds,
      logs,
    } = createReportData(employees, attendances, leaves);

    reportObj.attendances = attendance;
    reportObj.leaves = leave;
    reportObj.onTimeEmployees = onTimeEmployees;
    reportObj.lateEmployees = lateEmployees;
    reportObj.halfDayEmployees = halfDayEmployees;
    reportObj.fullDayEmployees = fullDayEmployees;
    reportObj.employeeLogs = logs;

    presentEmployeeIds.forEach((id) => {
      findAndRemove(employees, id);
    });

    reportObj.absentEmployees = employees.length ?? 0;

    employees.forEach((employee) => {
      reportObj.attendances.push({
        fixedInTime: getTimeZoneAwareDate(employee.timeZone, employee.checkIn)[1],
        fixedOutTime: getTimeZoneAwareDate(employee.timeZone, employee.checkOut)[1],
        requiredHours: formatTime(new Date(employee.requiredHours)),
        actualTime: "-",
        employeeName: employee.employeeName,
        employeeNumber: employee.employeeNumber,
        status: "absent",
      });
    });

    const templateFilePath = "./templates/liveReport.html";
    const outputFileName = `${recipientPhone}-${type}Report.pdf`;

    const renderedTemplate = nunjucks.render(templateFilePath, reportObj);

    // console.log(renderedTemplate);

    return await createPDFAsync(renderedTemplate, outputFileName, "portrait");
  }

  return false;
}

async function createEmployeeReport(type, employeeId, language) {
  const date = new Date();

  let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  let endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  if (type === "previous") {
    startDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    endDate = new Date(date.getFullYear(), date.getMonth(), 0);
  }

  const attendances = await Attendance.find(
    {
      employeeId,
      $and: [{ date: { $gte: startDate } }, { date: { $lte: endDate } }],
    },
    {
      _id: 0,
      companyId: 0,
      checkInPic: 0,
      checkOutPic: 0,
    }
  );

  const leaves = await Leave.find(
    {
      employeeId,
      $and: [{ from: { $gte: startDate } }, { to: { $lte: endDate } }],
    },
    {
      _id: 0,
      companyId: 0,
      createdAt: 0,
      updatedAt: 0,
    }
  );

  const employee = await Employee.findOne(
    {
      _id: employeeId,
    },
    {
      employeeName: 1,
      employeeNumber: 1,
      _id: 1,
      checkInPic: 1,
      checkOutPic: 1,
      checkIn: 1,
      checkOut: 1,
      timeZone: 1,
      requiredHours: 1,
    }
  );

  if ((attendances && attendances.length > 0) || (leaves && leaves.length > 0)) {
    const message = getTextMessage(language, "employee-report-templates", [], "main");

    const reportObj = {
      ...message,
      mapImg,
      cameraImg,
    };

    reportObj.reportType = type;
    reportObj.leavesCount = leaves.length;

    const [att] = processAttendances(attendances, employee);
    const leave = processLeaves(leaves, employee);

    reportObj.attendances = att;
    reportObj.leaves = leave;

    reportObj.presentCount = attendances?.reduce((acc, cur) => {
      if (cur.checkInTime && cur.checkOutTime) return acc + 1;
    }, 0);

    if (type === "previous") {
      reportObj.absentCount = 0;
    } else {
      reportObj.absentCount = 0;
    }

    const templateFilePath = "./templates/empReport.html";
    const outputFileName = `${employeeId}-employeeReport.pdf`;
    const renderedTemplate = nunjucks.render(templateFilePath, reportObj);

    return await createPDFAsync(renderedTemplate, outputFileName, "portrait");
  }

  return false;
}

async function createAllEmployeeReport(recipientPhone, companyId, language) {
  const employees = await Employee.findEmployees(companyId);

  if (employees && employees.length > 0) {
    const message = getTextMessage(language, "all-emp-report-templates", [], "main");

    const reportObj = {
      employees: [],
      employeesCount: employees.length,
      companyName: employees[0].companyName,
      ...message,
    };

    employees.forEach((employee) => {
      const checkIn = getTimeZoneAwareDate(employee.timeZone, employee.checkIn)[1];
      const checkOut = getTimeZoneAwareDate(employee.timeZone, employee.checkOut)[1];

      reportObj.employees.push({
        checkIn,
        checkOut,
        companyName: employee?.companyName ?? "-",
        employeeName: employee.employeeName,
        employeePhone: employee.employeeNumber,
        designation: employee?.designation ?? "-",
        department: employee?.department ?? "-",
        joiningDate: new Date(employee.joiningDate)?.toDateString() || "-",
        language: employee?.language ?? "-",
        natureOfTime: employee?.natureOfTime ?? "-",
        countryName: employee?.countryName ?? "-",
        timeZone: employee?.timeZone ?? "-",
        locations: employee?.locations ?? "-",
        workDays: employee?.workDays ?? "-",
        shiftType: employee?.shiftType ?? "-",
        location: employee.proof.location,
        logs: employee.proof.logs,
        image: employee.proof.image,
      });
    });

    const templateFilePath = "./templates/allEmployeeReportNew.html";
    const outputFileName = `${recipientPhone}-allEmployeeReport.pdf`;

    const renderedTemplate = nunjucks.render(templateFilePath, reportObj);

    return await createPDFAsync(renderedTemplate, outputFileName, "landscape");
  }

  return false;
}

async function createDateRangeReport(start, end, user) {
  const attendances = await Attendance.findAllByDate(start, end, user.companyId);
  const employees = await Employee.find({ companyId: user.companyId });

  if (employees && attendances) {
    const message = getTextMessage(user.language, "live-report-templates", [], "main");

    const report = {
      from: start.format("DD/MM/YY"),
      to: end.format("DD/MM/YY"),
      leaveRequestsCount: 0,
      employeesCount: employees?.length,
      onTimeEmployees: 0,
      lateEmployees: 0,
      companyName: user.companyName,
      ...message,
      mapImg,
      cameraImg,
      calendarImg,
    };
    const {
      attendance,
      leave,
      onTimeEmployees,
      lateEmployees,
      halfDayEmployees,
      fullDayEmployees,
      logs,
    } = createReportData(employees, attendances);

    report.attendances = attendance;
    report.leaves = leave;
    report.onTimeEmployees = onTimeEmployees;
    report.lateEmployees = lateEmployees;
    report.halfDayEmployees = halfDayEmployees;
    report.fullDayEmployees = fullDayEmployees;
    report.employeeLogs = logs;

    const templateFilePath = "./templates/dateRangeReport.html";
    const outputFileName = `${user.companyNumber}-dateRangeReport.pdf`;

    const renderedTemplate = nunjucks.render(templateFilePath, report);

    return await createPDFAsync(renderedTemplate, outputFileName, "portrait");
  }

  return false;
}

// async function createEmployeeDateRangeReport(start, end, user) {
// const attendances = await Attendance.findAllByDate(start, end, user.employeeId);
// const employee = await Employee.find({ companyId: user.companyId });

// if (employees && attendances) {
//   const message = getTextMessage(user.language, "live-report-templates", [], "main");

//   const report = {
//     from: start.format("DD/MM/YY"),
//     to: end.format("DD/MM/YY"),
//     leaveRequestsCount: 0,
//     employeesCount: employees?.length,
//     onTimeEmployees: 0,
//     lateEmployees: 0,
//     companyName: user.companyName,
//     ...message,
//     mapImg,
//     cameraImg,
//     calendarImg,
//   };
//   const { attendance, leave, onTimeEmployees, lateEmployees } = createReportData(
//     employees,
//     attendances
//   );

//   report.attendances = attendance;
//   report.leaves = leave;
//   report.onTimeEmployees = onTimeEmployees;
//   report.lateEmployees = lateEmployees;

//   const templateFilePath = "./templates/dateRangeReport.html";
//   const outputFileName = `${user.companyNumber}-dateRangeReport.pdf`;

//   const renderedTemplate = nunjucks.render(templateFilePath, report);

//   return await createPDFAsync(renderedTemplate, outputFileName);
// }

//   return false;
// }

async function createMonthlyReport(month, user) {
  const date = moment.tz(new Date(), user.timeZone);

  const monthStart = moment.tz(new Date(date.year(), month, 1, 0, 0, 0), user.timeZone);
  const monthEnd = moment.tz(
    new Date(date.year(), month, date.daysInMonth(), 0, 0, 0),
    user.timeZone
  );

  const attendances = await Attendance.findAllByDate(monthStart, monthEnd, user.companyId);
  const employees = await Employee.find({ companyId: user.companyId });

  if (employees && attendances) {
    const message = getTextMessage("English", "live-report-templates", [], "main");

    const report = {
      from: monthStart.format("DD/MM/YY"),
      to: monthEnd.format("DD/MM/YY"),
      leaveRequestsCount: 0,
      employeesCount: employees?.length,
      onTimeEmployees: 0,
      lateEmployees: 0,
      companyName: user.companyName,
      ...message,
      mapImg,
      cameraImg,
      calendarImg,
    };
    const { attendance, leave, onTimeEmployees, lateEmployees } = createReportData(
      employees,
      attendances
    );

    report.attendances = attendance;
    report.leaves = leave;
    report.onTimeEmployees = onTimeEmployees;
    report.lateEmployees = lateEmployees;

    const templateFilePath = "./templates/liveReport.html";
    const outputFileName = `${user.companyNumber}-MonthlyReport.pdf`;

    const renderedTemplate = nunjucks.render(templateFilePath, report);

    return await createPDFAsync(renderedTemplate, outputFileName, "portrait");
  }

  return false;
}

function createReportData(employees, attendances, leaves = []) {
  const presentEmployeeIds = new Set();

  const report = {
    onTimeEmployees: 0,
    lateEmployees: 0,
    halfDayEmployees: 0,
    fullDayEmployees: 0,
    attendance: [],
    leave: [],
    logs: [],
  };

  let formattedAttendances = [];
  let formattedLeaves = [];

  employees.forEach((employee) => {
    const [att, status, employeeIds, logs] = processAttendances(attendances, employee);

    presentEmployeeIds.add(...employeeIds);
    formattedAttendances.push(...att);

    report.lateEmployees += status.late;
    report.onTimeEmployees += status.onTime;
    report.halfDayEmployees += status.halfDay;
    report.fullDayEmployees += status.fullDay;
    if (logs.length > 0) {
      report.logs.push(...logs);
    }

    const leave = processLeaves(leaves, employee);
    formattedLeaves.push(...leave);
  });

  formattedAttendances.sort((a, b) => new Date(a.date) - new Date(b.date));

  report.attendance = formattedAttendances;
  report.leave = formattedLeaves;
  report.presentEmployeeIds = [...presentEmployeeIds];

  return report;
}

function processAttendances(attendances, employee) {
  let onTime = 0;
  let late = 0;
  let halfDay = 0;
  let fullDay = 0;

  const { employeeName, employeeNumber, checkIn, checkOut, timeZone } = employee;
  const presentEmployeeIds = new Set();
  const employeeId = employee._id.toString();

  const formattedAttendances = [];
  const logs = [];

  attendances.forEach((attendance) => {
    if (attendance.employeeId === employeeId) {
      presentEmployeeIds.add(employeeId);

      if (attendance.logs && attendance.logs.length > 0) {
        logs.push({
          employeeName,
          employeeNumber,
          logs: attendance.logs.map((log) => ({
            time:
              moment.tz(new Date(log.time), timeZone).format("DD/MM/YY") +
              " " +
              convertTimeTo12HourFormat(moment.tz(new Date(log.time), timeZone)),
            logs: log.log,
            type: log.logType,
          })),
        });
      }

      if (attendance.status === "onTime") onTime += 1;
      else if (attendance.status === "half-day") halfDay += 1;
      else if (attendance.status === "full-day") fullDay += 1;
      else if (attendance.status === "late") late += 1;

      formattedAttendances.push({
        employeeId,
        employeeName,
        employeeNumber,
        checkInTime: convertTimeTo12HourFormat(
          moment.tz(new Date(attendance.checkInTime), timeZone)
        ),
        checkOutTime: attendance.checkOutTime
          ? convertTimeTo12HourFormat(moment.tz(new Date(attendance.checkOutTime), timeZone))
          : "-",
        actualTime: attendance.timeSpent ? attendance.timeSpent : "-",
        fixedInTime: getTimeZoneAwareDate(timeZone, checkIn)[1],
        fixedOutTime: getTimeZoneAwareDate(timeZone, checkOut)[1],
        requiredHours: formatTime(new Date(employee.requiredHours)),
        status: attendance.status,
        checkInDate: getFormatDate(timeZone, attendance.date),
        date: attendance.date,
        checkInCoords: encodeURIComponent(
          `${attendance.checkInCoords[0]},${attendance.checkInCoords[1]}`
        ),
        checkOutCoords:
          attendance.checkOutCoords.length > 0
            ? encodeURIComponent(
                `${attendance.checkOutCoords?.[0]},${attendance.checkOutCoords?.[1]}`
              )
            : "-",
        checkInPic: attendance.checkInPic,
        checkOutPic: attendance.checkOutPic ? attendance.checkOutPic : "-",
      });
    }
  });

  return [formattedAttendances, { onTime, late, halfDay, fullDay }, [...presentEmployeeIds], logs];
}

function processLeaves(leaves, employee) {
  const { employeeName, employeeNumber } = employee;
  const employeeId = employee._id.toString();

  const formattedleave = [];

  leaves.forEach((leave) => {
    if (leave.employeeId === employeeId) {
      formattedleave.push({
        employeeName,
        employeeNumber,
        leaveType: leave.leaveType,
        startDate: getTimeZoneAwareDate("Asia/Kolkata", leave.from)[0],
        endDate: leave.to ? getTimeZoneAwareDate("Asia/Kolkata", leave.to)[0] : "Invalid Date",
        status: leave.status,
        reason: leave.reason ?? "",
      });
    }
  });

  return formattedleave;
}

// function calculateCheckInStatus(checkIn, actualCheckIn) {
//   if (actualCheckIn <= checkIn) {
//     return "OnTime";
//   } else {
//     return "late";
//   }
// }

function formatTime(datetime) {
  return `${datetime.getHours()}h ${datetime.getMinutes()}m`;
}

function createPDFAsync(renderedTemplate, outputFileName, orientation) {
  const pdfOptions = {
    format: "A3",

    border: {
      // top: "1cm",
    },
    type: "pdf",
    orientation,
  };

  return new Promise((resolve, reject) => {
    const p = pdf.create(renderedTemplate, pdfOptions);

    p.toFile(outputFileName, (err) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}

function findAndRemove(employees, employeeId) {
  const index = employees.findIndex((employee) => employee._id.toString() === employeeId);

  if (index !== -1) {
    return employees.splice(index, 1)[0];
  } else {
    return null;
  }
}

function getFormatDate(timeZone, date) {
  return new Intl.DateTimeFormat("en-GB", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone,
  }).format(new Date(`${date}`));
}

async function createSOP(recipientPhone) {
  const reportObj = {
    data: [],
  };

  reportObj.data.push({
    taskname: "Dance",
    taskinst: "inst",
    taskdesc: "do",
  });

  const templateFilePath = "./templates/sop.html";
  const outputFileName = `${recipientPhone}-sop.pdf`;

  const renderedTemplate = nunjucks.render(templateFilePath, reportObj);

  return await createPDFAsync(renderedTemplate, outputFileName, "portrait");
}

export {
  createLiveReport,
  createEmployeeReport,
  createAllEmployeeReport,
  createDateRangeReport,
  createMonthlyReport,
  // createEmployeeDateRangeReport,
  createSOP,
};
