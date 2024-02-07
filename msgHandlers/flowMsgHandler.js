import moment from "moment-timezone";
import path from "path";

import { Employer, Leave, Employee, Attendance, OwnerTransferLogs } from "../models/index.js";
import { getTextMessage, getSimpleButtonsMessage } from "../utils/languages.js";
import {
  sendEmployeeDemoTemplate,
  sendTextMessage,
  sendSimpleButtons,
  sendImage,
  sendDocument,
  sendFlow,
} from "../utils/messages.js";
import {
  delay,
  fileExists,
  deleteFile,
  createEmployeeProperties,
  formatTime12h,
  getSixMonthsInMs,
  capitalize,
  dateFromHourStr,
  splitArray,
  calculateMonthRange,
  isCheckIn,
} from "../utils/utils.js";
import {
  createDateRangeReport,
  createLiveReport,
  createAllEmployeeReport,
  createMonthlyReport,
  createEmployeeReport,
} from "../reports.js";
import {
  TRANSFER_OWNER_FLOW_ID,
  TRANSFER_OWNER_FLOW_TOKEN,
  ADD_COOWNER_FLOW_ID,
  ADD_COOWNER_FLOW_TOKEN,
  DATE_RANGE_FLOW_ID,
  DATE_RANGE_FLOW_TOKEN,
  REMOVE_BRANCH_FLOW_ID,
  REMOVE_BRANCH_FLOW_TOKEN,
  EDIT_GEO_LOCATION_FLOW_ID,
  EDIT_GEO_LOCATION_FLOW_TOKEN,
  REMOVE_EMPLOYEES_FLOW_ID,
  REMOVE_EMPLOYEES_FLOW_TOKEN,
  EDIT_TIMING_FLOW_ID,
  EDIT_TIMING_FLOW_TOKEN,
  EDIT_BUSINESS_FLOW_ID,
  EDIT_BUSINESS_FLOW_TOKEN,
  BROADCAST_FLOW_ID,
  BROADCAST_FLOW_TOKEN,
  ONE_DAY_LEAVE_FLOW_ID,
  ONE_DAY_LEAVE_FLOW_TOKEN,
  MANY_DAY_LEAVE_FLOW_ID,
  MANY_DAY_LEAVE_FLOW_TOKEN,
  ATTENDANCE_CORRECTION_FLOW_ID,
  ATTENDANCE_CORRECTION_FLOW_TOKEN,
  LEAVE_REQUESTS_FLOW_ID,
  LEAVE_REQUESTS_FLOW_TOKEN,
  ATTENDANCE_REQUESTS_FLOW_ID,
  ATTENDANCE_REQUESTS_FLOW_TOKEN,
} from "../utils/constants.js";

const BOT = "main";

async function handleFlowMessage({ flowMessage, recipientPhone, session }) {
  const { user, session: sessionType } = session.get(recipientPhone);

  if (flowMessage) {
    flowMessage = JSON.parse(flowMessage);
  }

  const flowName = flowMessage?.flowName;

  if (flowName === "leaveOneDay" || flowName === "manyDayLeave") {
    const {
      user: { employeeName, companyId, department, language, employeeId },
    } = session.get(recipientPhone);

    const startDate = new Date(Number(flowMessage.startDate));
    const endDate = new Date(Number(flowMessage.endDate));
    const ticketNumber = Math.floor(Math.random() * 90000) + 10000;

    let leaveType = "one day";

    const leave = {
      employeeId,
      companyId,
      leaveType,
      from: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()),
      to: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()),
      ticketNo: ticketNumber,
      reason: flowMessage.reasonForLeave?.trim(),
    };

    if (endDate && endDate != "Invalid Date") {
      leave.to = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
      leaveType = "many day";
      leave.leaveType = leaveType;
    }

    if (startDate && user) {
      if (session.get(recipientPhone).session === "employeeDemo") {
        const message = getTextMessage(
          language,
          "leaveSummary",
          [
            employeeName,
            department,
            leaveType,
            new Date(startDate).toDateString(),
            new Date(endDate)?.toDateString(),
            flowMessage.reasonForLeave,
            ticketNumber,
            recipientPhone,
          ],
          BOT
        );
        await sendTextMessage(message, recipientPhone);

        await delay(3000);

        const { message: supportMessage, listOfButtons } = getSimpleButtonsMessage(
          language,
          "startSupport"
        );
        await sendSimpleButtons(supportMessage, listOfButtons, recipientPhone);

        return;
      }

      await Leave.create(leave);

      const message = getTextMessage(
        user.language,
        "leaveSummary",
        [
          employeeName,
          department,
          leaveType,
          new Date(startDate).toDateString(),
          new Date(endDate)?.toDateString(),
          flowMessage.reasonForLeave,
          ticketNumber,
          recipientPhone,
        ],
        BOT
      );

      await sendTextMessage(message, recipientPhone);

      const { notifications } = await Employer.findNotfications(user.companyId);

      if (!notifications.leaveRequest) return;

      const { message: approveMessage, listOfButtons } = getSimpleButtonsMessage(
        language,
        "sendLeave",
        [
          user.employeeName,
          leaveType,
          new Date(startDate).toDateString(),
          new Date(endDate)?.toDateString(),
        ],
        BOT
      );

      await sendSimpleButtons(
        approveMessage,
        listOfButtons(recipientPhone, ticketNumber),
        user.employerNumber
      );
    }
  } else if (flowName === "editEmployee") {
    const { joiningDate, dateOfBirth, natureOfTime, branch, shiftType, workDays, proof } =
      flowMessage;
    const branches = branch.map((branc) => {
      const [branch, lat, long, range] = branc.split("_@_");
      return {
        name: branch.trim(),
        lat: lat,
        long: long,
        range: range,
      };
    });

    const checkIn = timeStringToEpochDate(flowMessage.checkIn);
    const checkOut = timeStringToEpochDate(flowMessage.checkOut);

    let employeeNumber = flowMessage.employeeNumber || flowMessage.defaultEmpNo;
    const employeeName = flowMessage.employeeName || flowMessage.defaultEmpName;

    const workingHours = calculateWorkingHours(checkIn, checkOut);

    const companyDetails = await Employer.findOne({
      employerNumber: recipientPhone,
    });

    if (employeeNumber.length === 10) {
      employeeNumber = `91${employeeNumber}`;
    }

    const employee = await Employee.findOne({
      employeeNumber,
      companyId: user.companyId,
    });

    const proofs = Object.entries(employee.proof);
    const updatedProof = {};

    proofs.forEach(([prf]) => {
      if (proof.includes(prf)) {
        updatedProof[prf] = true;
      } else {
        updatedProof[prf] = false;
      }
    });

    const data = {
      employeeName,
      employeeNumber,
      companyId: companyDetails._id?.toString(),
      companyName: companyDetails.companyName,
      employerNumber: recipientPhone,
      checkIn,
      checkOut,
      locations: branches,
      joiningDate,
      dateOfBirth,
      workingHours,
      natureOfTime,
      workDays: workDays.map(Number),
      shiftType,
      proof: updatedProof,
    };

    if (employee) {
      await employee.updateOne(data);
      await sendTextMessage(
        "I am pleased to inform you that the employee details have been successfully updated in our system",
        recipientPhone
      );
      return;
    } else {
      await Employee.create(data);
    }

    await sendEmployeeDemoTemplate(
      `${companyDetails.companyName}`,
      employeeNumber.split(" ").join("")
    );

    const { language } = session.get(recipientPhone).user;
    const message = getTextMessage(language, "employeeUploaded", [], BOT);

    await sendImage({ url: "https://i.ibb.co/S6XxtXy/Hi-2.png", caption: message, recipientPhone });
  } else if (flowName === "addBranch") {
    const { user } = session.get(recipientPhone);
    const { employees, branchname, coords } = flowMessage;
    const [lat, long] = coords.split(",");

    let range = flowMessage.range;

    if (range < 200) range = 200;

    await Promise.allSettled(
      employees?.map(async (employee) => {
        await Employee.updateOne(
          { employeeNumber: employee, companyId: user.companyId },
          { $pull: { locations: {} } }
        );

        await Employee.updateLocations(Number(employee), recipientPhone, user.companyId, {
          range,
          name: branchname.trim(),
          lat: Number(lat),
          long: Number(long),
        });
      })
    );

    await Employer.updateBranch(recipientPhone, user.companyId, {
      lat: Number(lat),
      long: Number(long),
      name: branchname,
      range,
    });

    await sendTextMessage(
      "We would like to inform you that new place and geo-fencing have been successfully Created",
      recipientPhone
    );

    session.get(recipientPhone).user.places.push({
      name: branchname,
      lat,
      long,
      range,
    });
  } else if (flowName === "editBusiness") {
    const { user } = session.get(recipientPhone);

    await Employer.updateOne(
      {
        employerNumber: recipientPhone,
        _id: user.companyId,
      },
      { ...flowMessage }
    );

    await sendTextMessage("Business updated", recipientPhone);
  } else if (flowName === "editTimings") {
    const {
      employees1,
      employees2,
      employees3,
      employees4,
      natureOfTime,
      workingHours,
      shiftType,
      workDays,
    } = flowMessage;

    const checkIn = new Date(
      1970,
      0,
      1,
      Number(flowMessage.checkIn.split(":")[0]),
      Number(flowMessage.checkIn.split(":")[1])
    );
    const checkOut = new Date(
      1970,
      0,
      1,
      Number(flowMessage.checkOut.split(":")[0]),
      Number(flowMessage.checkOut.split(":")[1])
    );

    const employees = Array.isArray(employees1) ? [...employees1] : [];

    employees.push(...(employees2 || []), ...(employees3 || []), ...(employees4 || []));

    const { user } = session.get(recipientPhone);

    try {
      await Promise.all(
        employees.map(async (employee) => {
          if (!isNaN(Number(employee))) {
            await Employee.updateOne(
              { employeeNumber: employee, companyId: user.companyId },
              {
                natureOfTime,
                checkIn,
                checkOut,
                workingHours,
                shiftType,
                workDays: [...workDays.map(Number)],
              }
            );
          }
        })
      );

      await sendTextMessage(
        "I am pleased to inform you that the employee details have been successfully updated.",
        recipientPhone
      );
    } catch (error) {
      console.error("Error updating employee details:", error);
    }
  } else if (flowName === "editGeoFencing") {
    const { user } = session.get(recipientPhone);
    const { employees1, employees2, employees3, employee4, places, natureOfTime } = flowMessage;
    const branches = places.map((place) => {
      const [branch, lat, long, range] = place.split("_@_");
      return {
        name: branch.trim(),
        lat: lat,
        long: long,
        range: range,
      };
    });

    const employees = Array.isArray(employees1) ? [...employees1] : [];
    employees.push(...(employees2 || []), ...(employees3 || []), ...(employee4 || []));

    await Promise.allSettled(
      employees?.map(async (employee) => {
        await Employee.updateOne(
          { employeeNumber: employee, companyId: user.companyId },
          { $pull: { locations: {} } }
        );
        await Employee.updateOne(
          {
            employeeNumber: Number(employee),
            companyId: user.companyId,
          },
          {
            $push: {
              locations: [...branches],
            },
            natureOfTime,
          }
        );
      })
    );

    await sendTextMessage(
      "We would like to inform you that employee geo-fencing has been successfully Updated.",
      recipientPhone
    );
  } else if (flowName === "editNotification") {
    const { user } = session.get(recipientPhone);
    const { notifications, morningReportTime, monthEndReportTime, eveningReportTime } = flowMessage;

    const updateObject = {};

    for (const notification of notifications) {
      updateObject[notification] = true;
    }

    await Employer.updateNotifications(recipientPhone, user.companyId, {
      ...updateObject,
      morningReportTime: Number(morningReportTime),
      monthEndReportTime: Number(monthEndReportTime),
      eveningReportTime: Number(eveningReportTime),
    });

    session.get(recipientPhone).user.notifications = {
      ...updateObject,
      morningReportTime,
      monthEndReportTime,
      eveningReportTime,
    };
  } else if (flowName === "removeEmployees") {
    const { employees1, employees2, employees3, employee4 } = flowMessage;

    const employees = [
      ...employees1,
      ...(employees2 || []),
      ...(employees3 || []),
      ...(employee4 || []),
    ];

    if (employees && employees.length > 0) {
      await Promise.allSettled(
        employees.map((employee) => {
          if (!isNaN(employee)) {
            Employee.updateEmployeeStatus(employee, user.companyId);
          }
        })
      );

      await sendTextMessage(
        "We would like to inform you that employee  has been removed from the organization.",
        recipientPhone
      );
    }
  } else if (flowName === "removeBranch") {
    const { branch, employees1, employees2, employees3, employee4 } = flowMessage;

    const employees = [
      ...employees1,
      ...(employees2 || []),
      ...(employees3 || []),
      ...(employee4 || []),
    ];

    if (branch && branch.length > 0 && employees && employees.length > 0) {
      await Promise.allSettled(
        employees.map((employee) => {
          Employee.removeBranchFromEmployees(branch, employee, recipientPhone, user.companyId);
        })
      );
      const message = getTextMessage(user.language, "employeeRemovePlace");
      await sendTextMessage(message, recipientPhone);
    }
  } else if (flowName === "addGeoLocation") {
    const { branchname, coords } = flowMessage;
    const [lat, long] = coords.split(",");

    let range = flowMessage.range;

    if (range < 200) range = 200;

    await Employer.updateBranch(recipientPhone, user.companyId, {
      lat: Number(lat),
      long: Number(long),
      name: branchname,
      range,
    });

    if (sessionType === "addPlace") {
      const message = getTextMessage(user.language, "placeCreated");
      await sendTextMessage(message, recipientPhone);
    } else {
      const message = getTextMessage(user.language, "uploadEmployee", [], BOT);

      await sendImage({
        caption: message,
        url: "https://i.ibb.co/Njkhcnb/5dc415a6-1caf-45d9-8f65-f41188215194.jpg",
        recipientPhone,
      });
    }
  } else if (flowName === "dateRangeReport") {
    const { startDate, endDate } = flowMessage;

    const start = moment.tz(new Date(Number(startDate)), user.timeZone);
    const end = moment.tz(new Date(Number(endDate)), user.timeZone);

    const isReport = await createDateRangeReport(start, end, user);

    if (isReport) {
      const rootPath = process.env.ROOT_PATH;
      const fileName = `${recipientPhone}-dateRangeReport.pdf`;
      const filePath = path.join(rootPath, fileName);

      await delay(1500);
      const isFile = await fileExists(filePath);

      if (isFile) {
        await sendDocument({
          caption: "Date Range Report",
          file_path: filePath,
          recipientPhone,
        });
        await deleteFile(fileName);
      }
    }
  } else if (flowName === "attendanceManagement") {
    const { reports, deleteplaces, editshift, places, deleteemployee, buseinessSettings } =
      flowMessage;
    const reportAndApprovals = flowMessage["report-approval"];
    const recipient = parseUserData(flowMessage.userData, user);

    if (reports) {
      if (reports === "yesterdayreport") {
        const isReport = await createLiveReport(
          recipientPhone,
          recipient.companyId,
          recipient.language,
          recipient.timeZone,
          "yesterday"
        );

        if (isReport) {
          await sendDocument({
            recipientPhone,
            file_path: path.join(process.env.ROOT_PATH, `${recipientPhone}-yesterdayReport.pdf`),
            caption: "Yesterday Report",
          });
          await deleteFile(`${recipientPhone}-yesterdayReport.pdf`);
        }
      } else if (reports === "currentmonth") {
        const currentDate = moment.tz(new Date(), recipient.timeZone);
        const isReport = await createMonthlyReport(currentDate.month(), user);

        if (isReport) {
          await sendDocument({
            file_path: `${recipientPhone}-MonthlyReport.pdf`,
            caption: "Current Month Report",
            recipientPhone,
          });
          await deleteFile(`${recipientPhone}-MonthlyReport.pdf`);
        }
      } else if (reports === "customdaterangepdf") {
        await sendDateRangeFlow(recipient.registeredOn, recipientPhone);
      } else if (reports === "allEmployees") {
        const isReport = await createAllEmployeeReport(
          recipientPhone,
          recipient.companyId,
          recipient.language
        );

        if (isReport) {
          await sendDocument({
            file_path: `${recipientPhone}-allEmployeeReport.pdf`,
            caption: "All Employees Report",
            recipientPhone,
          });
          await deleteFile(`${recipientPhone}-allEmployeeReport.pdf`);
        }
      }
    }

    if (deleteplaces) {
      if (deleteplaces === "delete-multiple-places") {
        const message = getTextMessage(user.language, "remove-branch", [], BOT);
        let { locations, employees } = await Employee.findLocationsAndEmployees(
          recipientPhone,
          recipient.companyId
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
      } else {
        const deleteRes = await Employer.updateOne(
          {
            _id: recipient.companyId,
            "branch.name": deleteplaces,
          },
          { $pull: { branch: { name: deleteplaces } } }
        );

        if (deleteRes && deleteRes.acknowledged) {
          const res = await Employee.updateMany(
            { companyId: recipient.companyId, "locations.name": deleteplaces },
            { $pull: { locations: { name: deleteplaces } } },
            { multi: true }
          );

          session.get(recipientPhone).user.places = session
            .get(recipientPhone)
            .user.places.filter((place) => place.name !== deleteplaces);

          if (res) {
            const message = getTextMessage(user.language, "placeDeleted");
            await sendTextMessage(message, recipientPhone);
          }

          // else {
          //   await sendTextMessage("failed to delete place, please try again.", recipientPhone);
          // }
        } else {
          await sendTextMessage("failed to delete place, please try again.", recipientPhone);
        }
      }
    }

    if (places) {
      if (places === "multiple-edit-palces") {
        const placesList = user.places.map((place) => {
          return {
            id: place.name,
            title: place.name,
            description: `${place.range} meters`,
          };
        });

        const employees = await Employee.findEmployees(recipient.companyId);
        const formattedEmployees = createEmployeeProperties(employees);

        const message = getTextMessage(user.language, "edit_geolocation", [], BOT);
        const flowData = {
          screen: "Edit_Geo_Fencing",
          data: {
            ...message.label,
            branches: placesList,
            init_values: {
              place: [],
            },
            ...formattedEmployees,
          },
        };

        await sendFlow({
          body: message.body,
          flow_cta: "Edit Locations",
          flow_data: flowData,
          flow_id: EDIT_GEO_LOCATION_FLOW_ID,
          flow_token: EDIT_GEO_LOCATION_FLOW_TOKEN,
          recipientPhone,
        });
      } else {
        const placesList = [];

        user.places.forEach((place) => {
          if (place.name === places) {
            placesList.push({
              id: place.name,
              title: place.name,
              description: `${place.range} meters`,
            });
          }
        });

        const employees = await Employee.findEmployees(recipient.companyId);
        const employeeInPlaces = new Set();

        employees.forEach((employee) => {
          const locations = employee.locations;
          if (locations.length > 0) {
            locations.forEach((location) => {
              if (location.name === places.trim()) {
                employeeInPlaces.add(String(employee.employeeNumber));
              }
            });
          }
        });

        const formattedEmployees = createEmployeeProperties(employees);

        const message = getTextMessage(user.language, "edit_geolocation", [], BOT);
        const flowData = {
          screen: "Edit_Geo_Fencing",
          data: {
            ...message.label,
            branches: placesList,
            init_values: {
              place: [placesList[0].id],
              employees1: [
                ...formattedEmployees.employeeList1
                  .filter((emp) => employeeInPlaces.has(emp.id))
                  .map((emp) => emp.id),
              ],
              employees2: [
                ...formattedEmployees.employeeList2
                  .filter((emp) => employeeInPlaces.has(emp.id))
                  .map((emp) => emp.id),
              ],
              employees3: [
                ...formattedEmployees.employeeList3
                  .filter((emp) => employeeInPlaces.has(emp.id))
                  .map((emp) => emp.id),
              ],
              employees4: [
                ...formattedEmployees.employeeList4
                  .filter((emp) => employeeInPlaces.has(emp.id))
                  .map((emp) => emp.id),
              ],
            },
            ...formattedEmployees,
          },
        };

        await sendFlow({
          body: message.body,
          flow_cta: "Edit Locations",
          flow_data: flowData,
          flow_id: EDIT_GEO_LOCATION_FLOW_ID,
          flow_token: EDIT_GEO_LOCATION_FLOW_TOKEN,
          recipientPhone,
        });
      }
    }

    if (deleteemployee) {
      if (deleteemployee === "delete-multiple-employees") {
        const message = getTextMessage(user.language, "remove-employees", [user.companyName], BOT);

        let employees = await Employee.findEmployees(recipient.companyId);

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
      } else {
        const res = await Employee.updateEmployeeStatus(deleteemployee, recipient.companyId);

        if (res && res.acknowledged) {
          const message = getTextMessage(user.language, "employeeRemove");
          await sendTextMessage(message, recipientPhone);
        }
      }
    }

    if (editshift) {
      if (editshift === "multiple-edit-shift") {
        const employees = await Employee.findEmployees(recipient.companyId);

        if (employees) {
          const empProps = createEmployeeProperties(employees);

          const message = getTextMessage(user.language, "edit-timings", [], BOT);
          const flowData = {
            screen: "Edit_Timings",
            data: {
              ...message.label,
              init_values: {
                workinghours: "09:00",
                checkin: "09:30",
                checkout: "18:30",
                // workdays: [...employees.workDays.map(String)],
              },
              ...empProps,
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
        }
      } else {
        const employee = await Employee.findOne({
          companyId: recipient.companyId,
          employeeNumber: Number(editshift),
        });

        if (employee) {
          const empProps = createEmployeeProperties([employee]);

          const message = getTextMessage(user.language, "edit-timings", [], BOT);

          const checkin = formatTime12h(employee.checkIn, employee.timeZone);
          const checkout = formatTime12h(employee.checkOut, employee.timeZone);

          const flowData = {
            screen: "Edit_Timings",
            data: {
              ...message.label,
              init_values: {
                timing: employee.natureOfTime,
                shiftType: employee.shiftType,
                checkin,
                checkout,
                workdays: [...employee.workDays.map(String)],
                employees1: [String(employee.employeeNumber)],
              },
              ...empProps,
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
        }
      }
    }

    if (reportAndApprovals) {
      if (reportAndApprovals === "livereport") {
        const isReport = await createLiveReport(
          recipientPhone,
          recipient.companyId,
          recipient.language,
          recipient.timeZone
        );

        //

        if (isReport) {
          await sendDocument({
            recipientPhone,
            file_path: path.join(process.env.ROOT_PATH, `${recipientPhone}-liveReport.pdf`),
            caption: "Live Report",
          });
          await deleteFile(`${recipientPhone}-liveReport.pdf`);
        }
      } else if (reportAndApprovals === "leaveApprovals") {
        const { registeredOn, timeZone, companyId } = parseUserData(flowMessage.userData, user);
        const { monthStart, monthEnd } = calculateMonthRange(registeredOn, timeZone);

        const leaves = await Leave.findByDate(monthStart, monthEnd, companyId);
        const employees = await Employee.find(
          { companyId, isActive: true },
          { employeeName: 1, _id: 1 }
        );

        let leavesCheckBox = [];
        if (leaves && leaves.length === 0) {
          leavesCheckBox = {
            requestsCheckbox1: [{ id: "null", title: "No Leave Requests" }],
            requestsCheckbox2: [{ id: "null", title: "" }],
            requestsCheckbox3: [{ id: "null", title: "" }],
            requestsCheckbox4: [{ id: "null", title: "" }],
            requestsCheckbox5: [{ id: "null", title: "" }],
          };
        } else if (leaves && leaves.length > 0) {
          const result = {
            requestsCheckbox1: [],
            requestsCheckbox2: [],
            requestsCheckbox3: [],
            requestsCheckbox4: [],
            requestsCheckbox5: [],
          };

          const checkboxes = leaves.map((leave) => {
            const employee = employees.find(
              (employee) => employee._id.toString() === leave.employeeId
            );
            const from = moment.tz(leave.from, timeZone);
            const to = moment.tz(leave.to, timeZone);
            return {
              id: leave._id.toString(),
              title: `${employee.employeeName.slice(0, 5)} ${leave.leaveType} ${from.format(
                "DD/MM"
              )} - ${to.format("DD/MM")}`,
            };
          });
          leavesCheckBox = generateCheckboxRequests(checkboxes, result, "requestsCheckbox");
        }

        const flowData = {
          screen: "Leave_Approvals",
          data: {
            leaveApprovalsLabel: "Approval Type",
            requestsLable: "Leave Requests",
            userData: "",
            leaveApprovalsRadio: [
              {
                id: "approve",
                title: "Approve",
              },
              {
                id: "reject",
                title: "Reject",
              },
            ],
            init_values: {
              userData: "",
              approveType: "approve",
              requests1: [...getIds(leavesCheckBox.requestsCheckbox1)],
              requests2: [...getIds(leavesCheckBox.requestsCheckbox2)],
              requests3: [...getIds(leavesCheckBox.requestsCheckbox3)],
              requests4: [...getIds(leavesCheckBox.requestsCheckbox4)],
              requests5: [...getIds(leavesCheckBox.requestsCheckbox5)],
            },
            ...leavesCheckBox,
            // ...message.label,
          },
        };

        await sendFlow({
          body: "Leave Requests",
          // body: message.body,
          flow_cta: "Requests",
          flow_data: flowData,
          flow_id: LEAVE_REQUESTS_FLOW_ID,
          flow_token: LEAVE_REQUESTS_FLOW_TOKEN,
          recipientPhone,
        });
      } else if (reportAndApprovals === "attendanceCorrections") {
        const { registeredOn, timeZone, companyId } = parseUserData(flowMessage.userData, user);

        const { monthStart, monthEnd } = calculateMonthRange(registeredOn, timeZone);

        const attendances = await Attendance.find(
          {
            companyId,
            "creationType.status": "pending",
            $and: [{ date: { $gte: monthStart } }, { date: { $lte: monthEnd } }],
          },
          { employeeId: 1, _id: 1, checkInTime: 1, checkOutTime: 1, date: 1 }
        );
        const employees = await Employee.find(
          { companyId, isActive: true },
          { employeeName: 1, _id: 1 }
        );

        let attendancesCheckBox = [];
        if (attendances && attendances.length === 0) {
          attendancesCheckBox = {
            correctionsChechbox1: [{ id: "null", title: "No Correction Requests" }],
            correctionsChechbox2: [{ id: "null", title: "" }],
            correctionsChechbox3: [{ id: "null", title: "" }],
            correctionsChechbox4: [{ id: "null", title: "" }],
            correctionsChechbox5: [{ id: "null", title: "" }],
          };
        } else if (attendances && attendances.length > 0) {
          const result = {
            correctionsChechbox1: [],
            correctionsChechbox2: [],
            correctionsChechbox3: [],
            correctionsChechbox4: [],
            correctionsChechbox5: [],
          };

          const checkboxes = attendances.map((attendance) => {
            const employee = employees.find(
              (employee) => employee._id.toString() === attendance.employeeId
            );

            const checkIn = moment.tz(attendance.checkInTime, timeZone);
            const checkOut = moment.tz(attendance.checkOutTime, timeZone);
            const date = moment.tz(attendance.date, timeZone);

            return {
              id: attendance._id.toString(),
              title: `${employee.employeeName.slice(0, 5)} ${date.format("DD/MM")} ${checkIn.format(
                "HH:MM"
              )} - ${checkOut.format("HH:MM")}`,
            };
          });
          attendancesCheckBox = generateCheckboxRequests(checkboxes, result, "correctionsChechbox");
        }

        const flowData = {
          screen: "Attendance_Approvals",
          data: {
            approvalsLabel: "Approval Type",
            correctionLable: "Correction Requests",
            userData: "fd",
            approvalsRadio: [
              {
                id: "approve",
                title: "Approve",
              },
              {
                id: "reject",
                title: "Reject",
              },
            ],
            init_values: {
              userData: "fd",
              approveType: "approve",
              corrections1: [...getIds(attendancesCheckBox.correctionsChechbox1)],
              corrections2: [...getIds(attendancesCheckBox.correctionsChechbox2)],
              corrections3: [...getIds(attendancesCheckBox.correctionsChechbox3)],
              corrections4: [...getIds(attendancesCheckBox.correctionsChechbox4)],
              corrections5: [...getIds(attendancesCheckBox.correctionsChechbox5)],
            },
            ...attendancesCheckBox,
            // ...message.label,
          },
        };

        await sendFlow({
          body: "Attendance Correction Requests",
          // body: message.body,
          flow_cta: "Requests",
          flow_data: flowData,
          flow_id: ATTENDANCE_REQUESTS_FLOW_ID,
          flow_token: ATTENDANCE_REQUESTS_FLOW_TOKEN,
          recipientPhone,
        });
      } else if (reportAndApprovals === "broadcast") {
        const employees = await Employee.findEmployees(recipient.companyId);

        const dynamicFlowData = {
          employeesRadio: employees.map((employee) => ({
            id: String(employee.employeeNumber),
            title: employee.employeeName,
          })),
        };
        const [flowData, body] = getFlowData(
          "Broadcast",
          dynamicFlowData,
          user.language,
          "broadcast"
        );
        await sendFlow({
          body,
          flow_cta: "Broadcast",
          flow_data: flowData,
          flow_id: BROADCAST_FLOW_ID,
          flow_token: BROADCAST_FLOW_TOKEN,
          recipientPhone,
        });
      }
    }

    if (buseinessSettings) {
      if (buseinessSettings === "editBusiness") {
        const dynamicData = { init_values: {} };

        const employer = await Employer.findOne(
          {
            employerNumber: Number(recipientPhone),
            _id: recipient.companyId,
          },
          { _id: 0 }
        );

        if (employer) {
          Object.entries(employer._doc).forEach(([key, value]) => {
            if (key === "fullName") {
              dynamicData.init_values.employerName = value;
            } else {
              dynamicData.init_values[key] = String(value);
            }
          });
        }

        const [flowData, body] = getFlowData(
          "Edit_Business",
          dynamicData,
          user.language,
          "business-settings"
        );
        await sendFlow({
          body,
          flow_cta: "Update",
          flow_data: flowData,
          flow_id: EDIT_BUSINESS_FLOW_ID,
          flow_token: EDIT_BUSINESS_FLOW_TOKEN,
          recipientPhone,
        });
      } else if (buseinessSettings === "addCoOwner") {
        // const dynamicData = { init_values: {} };

        const employees = await Employee.find(
          {
            companyId: recipient.companyId,
          },
          { _id: 1, employeeName: 1, role: 1, employeeNumber: 1 }
        );

        if (Array.isArray(employees) && employees.length > 0) {
          // Object.entries(employer._doc).forEach(([key, value]) => {
          //   if (key === "fullName") {
          //     dynamicData.init_values.employerName = value;
          //   } else {
          //     dynamicData.init_values[key] = String(value);
          //   }
          // });
          const result = {
            checkbox1: [],
            checkbox2: [],
            checkbox3: [],
            checkbox4: [],
            checkbox5: [],
          };
          const employeesCheckBox = employees.map((employee) => ({
            id: `${employee._id.toString()}@${employee.employeeNumber}`,
            title: `${employee.employeeName} (${employee.role})`,
          }));
          const data = generateCheckboxRequests(employeesCheckBox, result, "checkbox");
          // const [flowData, body] = getFlowData(
          //   "Edit_Business",
          //   dynamicData,
          //   user.language,
          //   "business-settings"
          // );

          const flowData = {
            screen: "Add_Coowner",
            data: {
              userData: "",
              rightsLable: "Rights",
              employeeLabel: "Employees",
              superAdmin: "",
              existingCoowner: "",
              ...data,
              rightsCheckbox: [
                {
                  id: "reports",
                  title: "Reports",
                },
              ],
              init_values: {
                userData: "t",
              },
            },
          };
          await sendFlow({
            body: "Add Coowner",
            flow_cta: "Add",
            flow_data: flowData,
            flow_id: ADD_COOWNER_FLOW_ID,
            flow_token: ADD_COOWNER_FLOW_TOKEN,
            recipientPhone,
          });
        }
      } else if (buseinessSettings === "transferOwner") {
        const employees = await Employee.find(
          {
            companyId: recipient.companyId,
          },
          { _id: 1, employeeName: 1, role: 1, employeeNumber: 1 }
        );

        const result = {
          checkbox1: [
            {
              id: "uploadContact",
              title: "Upload Contact",
            },
          ],
          checkbox2: [],
          checkbox3: [],
          checkbox4: [],
          checkbox5: [],
        };
        const employeesCheckBox = employees?.map((employee) => ({
          id: `${employee._id.toString()}@${employee.employeeNumber}@${employee.employeeName}@${
            employee.role
          }`,
          title: `${employee.employeeName} (${employee.role})`,
        }));
        const data = generateCheckboxRequests(employeesCheckBox, result, "checkbox");

        const flowData = {
          screen: "Transfer_Owner",
          data: {
            userData: flowMessage.userData,
            employeeLabel: "Employees",
            superAdmin: "",
            ...data,
            init_values: {
              userData: flowMessage.userData,
            },
          },
        };
        await sendFlow({
          body: "Transfer Ownership",
          flow_cta: "Transfer",
          flow_data: flowData,
          flow_id: TRANSFER_OWNER_FLOW_ID,
          flow_token: TRANSFER_OWNER_FLOW_TOKEN,
          recipientPhone,
        });
      } else if (buseinessSettings === "deleteAccount") {
        const message =
          "Are you sure you want to delete your account? This action cannot be undone. All your data associated with this account will be permanently lost.";
        const listOfButtons = [
          { id: `delAcc@confirm@${recipient.companyId}`, title: "Confirm" },
          { id: `delAcc@cancel@${recipient.companyId}`, title: "Cancel" },
        ];

        await sendSimpleButtons(message, listOfButtons, recipientPhone);
      }
    }
  } else if (flowName === "broadcast") {
    const { file, employees, boradcastMessage } = flowMessage;

    if (file) {
      session.get(recipientPhone).session = "broadcast";
      session.get(recipientPhone).employees = employees;
      session.get(recipientPhone).broadcastMessage = boradcastMessage;

      const message = `please upload the ${file}`;
      await sendTextMessage(message, recipientPhone);
    } else {
      await Promise.allSettled(
        employees.map((employee) => {
          return sendTextMessage(boradcastMessage, employee);
        })
      );
      await sendTextMessage("Message has been broadcasted to all employees", recipientPhone);
    }
  } else if (flowName === "employeeManagement") {
    const { reports, leaveRequests, support, onDutyCorrection, inOutCorrection, userData } =
      flowMessage;

    const { language, timeZone } = JSON.parse(userData);

    if (reports) {
      if (reports === "current" || reports === "previous") {
        const isReport = await createEmployeeReport(reports, user.employeeId, user.language);

        if (isReport) {
          await sendDocument({
            recipientPhone,
            file_path: path.join(process.env.ROOT_PATH, `${user.employeeId}-employeeReport.pdf`),
            caption: `${capitalize(reports)} Month Report`,
          });
        }
      } else if (reports === "customDateRange") {
        await sendDateRangeFlow(user.createdAt, recipientPhone);
      }
    }

    if (leaveRequests) {
      if (leaveRequests === "oneDay") {
        const message = getTextMessage(language, leaveRequests, [], BOT);

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
      } else if (leaveRequests === "manyDay") {
        const message = getTextMessage(language, leaveRequests, [], BOT);

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
    }

    if (support) {
      if (
        support === "check-in" ||
        support === "check-out" ||
        support === "salary-issue" ||
        support === "other-issue"
      ) {
        session.get(recipientPhone).session = "support-issue";
        const message = getTextMessage(language, "employeeIssue", [], BOT);
        await sendTextMessage(message, recipientPhone);
      }
    }

    if (onDutyCorrection || inOutCorrection) {
      let date = "";
      const correctionData = JSON.parse(userData);

      if (inOutCorrection) {
        date = moment.tz(inOutCorrection.split("@")[1], timeZone);
        const docId = inOutCorrection.split("@")[0];

        correctionData.documentId = docId;
        correctionData.date = date;
      } else {
        date = moment.tz(onDutyCorrection, timeZone);
        correctionData.documentId = "undefined";
        correctionData.date = date;
      }

      const flowData = {
        screen: "Attendance_Correction",
        data: {
          init_values: {
            userData: JSON.stringify(correctionData),
          },
          title: "Edit CheckIn/CheckOut Time",
          attendanceDate: `Date - ${date.format("DD/MM/YY")}`,
          checkInLabel: "Check IN",
          checkOutLabel: "Check OUT",
          remarkLabel: "Remark",
          userData: JSON.stringify(correctionData),
        },
      };

      await sendFlow({
        // body: message.body,
        body: "Correct Attendance",
        flow_id: ATTENDANCE_CORRECTION_FLOW_ID,
        flow_token: ATTENDANCE_CORRECTION_FLOW_TOKEN,
        flow_cta: "Correct",
        flow_data: flowData,
        recipientPhone,
      });
    }
  } else if (flowName === "forgetInOut") {
    const { checkin, checkout, remark } = flowMessage;

    const userData = JSON.parse(flowMessage.userData);
    const { employeeId, timeZone, companyId, date, employerNumber } = userData;

    const momentDate = moment.tz(new Date(date), timeZone);
    const checkInTime = dateFromHourStr(momentDate, checkin, timeZone);
    const checkOutTime = dateFromHourStr(momentDate, checkout, timeZone);

    const documentId = await updateAttendance({
      employeeId,
      companyId,
      checkOutTime,
      checkInTime,
      documentId: userData.documentId,
      date: momentDate,
      creationType: {
        type: "correction",
        status: "pending",
      },
    });

    if (documentId) {
      const id = JSON.stringify({
        documentId,
      });

      const formattedCheckInTime = checkInTime.format("DD/MM/YY HH:MM");
      const formattedCheckOutTime = checkOutTime.format("DD/MM/YY HH:MM");

      const message = `Request for attendance Correction\ncheck in time: ${formattedCheckInTime}\ncheck out time: ${formattedCheckOutTime}\nremark: ${remark}`;
      const buttons = [
        {
          id: `att-corr@approve@${id}`,
          title: "Approve",
        },
        {
          id: `att-corr@hold@${id}`,
          title: "Hold",
        },
        {
          id: `att-corr@reject@${id}`,
          title: "Reject",
        },
      ];
      await sendSimpleButtons(message, buttons, employerNumber);

      const approvalMessage =
        "Your attendance correction request has been created and is awaiting approval";
      await sendTextMessage(approvalMessage, recipientPhone);
    }
  } else if (flowName === "attendanceApprovals") {
    const { corrections1, corrections2, corrections3, corrections4, corrections5, approveType } =
      flowMessage;

    const corrections = [corrections1, corrections2, corrections3, corrections4, corrections5]
      .flat()
      .filter((corr) => corr.length > 0 && corr !== "none");

    if (corrections.length > 0) {
      const promises = await Promise.allSettled(
        corrections.map((correction) => {
          return Attendance.updateOne({ _id: correction }, { "creationType.status": approveType });
        })
      );

      const allFullfilled = promises.every((promise) => promise.status === "fulfilled");

      if (allFullfilled) {
        await sendTextMessage(`All Requests has been ${approveType}.`, recipientPhone);
      } else {
        await sendTextMessage("Some request has been failed to update", recipientPhone);
      }
    }
  } else if (flowName === "leaveApprovals") {
    const { requests1, requests2, requests3, requests4, requests5, approveType } = flowMessage;

    const requests = [requests1, requests2, requests3, requests4, requests5]
      .flat()
      .filter((req) => req.length > 0 && req !== "none");

    if (requests.length > 0) {
      const promises = await Promise.allSettled(
        requests.map((request) => {
          return Leave.updateOne({ _id: request }, { status: approveType, updatedAt: new Date() });
        })
      );

      const allFullfilled = promises.every((request) => request.status === "fulfilled");

      if (allFullfilled) {
        await sendTextMessage(`All Requests has been ${approveType}.`, recipientPhone);
      } else {
        await sendTextMessage("Some request has been failed to update", recipientPhone);
      }
    }
  } else if (flowName === "vitals") {
    const { temperature, spo2, pulseRate, bp } = flowMessage;

    const checkIn = await isCheckIn(user);

    if (checkIn) {
      const res = await checkIn.updateOne({
        $push: {
          logs: {
            time: moment.tz(new Date(), user.timeZone),
            logType: "vitals",
            log: `${bp}, ${temperature}, ${spo2}, ${pulseRate}`,
          },
        },
      });

      if (res.acknowledged) {
        await sendTextMessage("vitals has been updated", recipientPhone);
      } else {
        await sendTextMessage("vitals has been updated", recipientPhone);
      }
    } else {
      await sendTextMessage("Please checkIn to update vitals", recipientPhone);
    }
  } else if (flowName === "addCoowner") {
    const { employees1, employees2, employees3, employees4, employees5, rights } = flowMessage;

    const employees = [employees1, employees2, employees3, employees4, employees5]
      .flat()
      .filter((employeeId) => employeeId !== "none");

    const promises = await Promise.allSettled(
      employees.map((employee) => {
        const [employeeId, employeeNumber] = employee.split("@");

        const message = `You are added as the co-owner. Please accept or reject.`;
        const listOfButtons = [
          {
            id: `coowner@accept@${employeeId}@${rights}@${recipientPhone}`,
            title: "Accept",
          },
          {
            id: `coowner@reject@${employeeId}@${rights}@${recipientPhone}`,
            title: "Reject",
          },
        ];
        return sendSimpleButtons(message, listOfButtons, employeeNumber);
      })
    );

    const allFulfilled = promises.every((promise) => promise.status === "fulfilled");

    if (allFulfilled) {
      await sendTextMessage("A notification has been sent to them.", recipientPhone);
    } else {
      await sendTextMessage("Some Failed to send notification.", recipientPhone);
    }
  } else if (flowName === "transferOwner") {
    const { employees1, employees2, employees3, employees4, employees5, userData } = flowMessage;

    const recipient = JSON.parse(userData);

    const employees = [employees1, employees2, employees3, employees4, employees5]
      .flat()
      .filter((employeeId) => employeeId !== "none");

    if (employees.includes("uploadContact")) {
      const message = "Please Upload a Contact whom the ownership will be transferred.";
      await sendTextMessage(message, recipientPhone);
      session.get(recipientPhone).session = "transferOwner";
    } else {
      const [employeeId, employeeNumber, employeeName, employeeRole] = employees[0].split("@");
      const transferLogs = await OwnerTransferLogs.create({
        status: "pending",
        companyId: recipient.companyId,
        from: {
          time: moment.tz(new Date(), recipient.timeZone),
        },
        to: {
          time: moment.tz(new Date(), recipient.timeZone),
          employeeId,
          priorType: employeeRole,
        },
      });

      const message = `Hello ${employeeName},\n\nYou have been requested by ${recipient.employerName} to become the owner of ${recipient.companyName}. To accept the request click on "Accept" button, othewise to reject click on "Reject" Button`;
      const data = JSON.stringify({
        employeeName,
        employeeNumber,
        companyId: user.companyId,
        employeeId,
        logId: transferLogs._id.toString(),
        employerNumber: user.companyNumber,
      });
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

      await sendSimpleButtons(message, listOfButtons, 918657854260);
      await sendTextMessage(
        `A confirmation request has been sent to ${employeeName}.`,
        recipientPhone
      );
    }
  }
}

function calculateWorkingHours(checkIn, checkOut) {
  const differenceInMilliseconds = Math.abs(checkIn - checkOut);

  const hours = Math.floor(differenceInMilliseconds / 3600000);
  const minutes = Math.floor((differenceInMilliseconds % 3600000) / 60000);
  const seconds = Math.floor((differenceInMilliseconds % 60000) / 1000);

  return new Date(1970, 0, 1, hours, minutes, seconds);
}

function timeStringToEpochDate(timeString) {
  const [hours, minutes] = timeString.split(":");
  return new Date(1970, 0, 1, hours, minutes, 0, 0);
}

async function sendDateRangeFlow(minDate, recipientPhone) {
  const currentTime = new Date().getTime();

  const message = getTextMessage("English", "dateRangeReport", [], BOT);
  const flowData = {
    screen: "Date_Range",
    data: {
      minDate: minDate.toString(),
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
}

function parseUserData(userData, user) {
  let recipient = {};

  try {
    recipient = JSON.parse(userData);
  } catch (error) {
    console.error("Error parsing flow message user Data: " + userData);
    recipient = user;
  }

  return recipient;
}

function generateCheckboxRequests(checkboxes, result, key) {
  const arrs = splitArray(checkboxes, Object.keys(result).length);

  arrs.forEach((arr, i) => {
    result[`${key}${i + 1}`].push(...arr);
  });

  return result;
}

async function updateAttendance(data) {
  if (data.documentId === "undefined") {
    const res = await Attendance.create(data);

    if (res) {
      return res._id;
    }

    return false;
  } else {
    const res = await Attendance.updateOne(
      { _id: data.documentId },
      {
        checkInTime: data.checkInTime,
        checkOutTime: data.checkOutTime,
        creationType: data.creationType,
      }
    );

    if (res && res.acknowledged) {
      return data.documentId;
    }

    return false;
  }
}

function getIds(arrays) {
  return arrays.map((array) => {
    if (array.id === "none") return "";
    else return array.id;
  });
}

function getFlowData(screenName, dynamicData, language, messageId) {
  const message = getTextMessage(language, messageId, [], BOT);

  return [
    {
      screen: screenName,
      data: {
        ...message.label,
        ...dynamicData,
      },
    },
    message.body,
  ];
}

// async function handleAttendanceManagement(flowMessage, user, recipientPhone) {
//   const { reports, deleteplaces, editshift, places, deleteemployee, buseinessSettings } =
//     flowMessage;
//   const reportAndApprovals = flowMessage["report-approval"];
//   const recipient = parseUserData(flowMessage.userData, user);

//   if (reports) {
//     await generateAndSendReport(reports, recipientPhone);
//   }

//   if (deleteplaces) {
//     if (deleteplaces === "delete-multiple-places") {
//       // const message = getTextMessage(user.language, "remove-branch", [], BOT);

//       let employees = await Employee.findEmployees(recipient.companyId);

//       if (!employees || employees.length === 0) {
//         employees = {
//           employeeList1: [
//             {
//               id: "noEmployees",
//               title: "No Employees",
//             },
//           ],
//           employeeList2: [
//             {
//               id: "noEmployees",
//               title: "",
//             },
//           ],
//           employeeList3: [
//             {
//               id: "noEmployees",
//               title: "",
//             },
//           ],
//           employeeList4: [
//             {
//               id: "noEmployees",
//               title: "",
//             },
//           ],
//         };
//       } else if (employees.length > 0) {
//         employees = createEmployeeProperties(employees);
//       }

//       const flowData = {
//         screen: "Add_Coowner",
//         data: {
//           // ...message.label,
//           ...employees,
//         },
//       };

//       await sendFlow({
//         // body: message.body,
//         body: "Add Co-owner",
//         flow_cta: "Add",
//         flow_data: flowData,
//         flow_id: ADD_COOWNER_FLOW_ID,
//         flow_token: ADD_COOWNER_FLOW_TOKEN,
//         recipientPhone,
//       });
//     } else {
//       const deleteRes = await Employer.updateOne(
//         {
//           _id: recipient.companyId,
//           "branch.name": deleteplaces,
//         },
//         { $pull: { branch: { name: deleteplaces } } }
//       );

//       if (deleteRes && deleteRes.acknowledged) {
//         const res = await Employee.updateMany(
//           { companyId: recipient.companyId, "locations.name": deleteplaces },
//           { $pull: { locations: { name: deleteplaces } } },
//           { multi: true }
//         );

//         session.get(recipientPhone).user.places = session
//           .get(recipientPhone)
//           .user.places.filter((place) => place.name !== deleteplaces);

//         if (res) {
//           const message = getTextMessage(user.language, "placeDeleted");
//           await sendTextMessage(message, recipientPhone);
//         }

//         // else {
//         //   await sendTextMessage("failed to delete place, please try again.", recipientPhone);
//         // }
//       } else {
//         await sendTextMessage("failed to delete place, please try again.", recipientPhone);
//       }
//     }
//   }

//   if (places) {
//     if (places === "multiple-edit-palces") {
//       const placesList = user.places.map((place) => {
//         return {
//           id: place.name,
//           title: place.name,
//           description: `${place.range} meters`,
//         };
//       });

//       const employees = await Employee.findEmployees(recipient.companyId);
//       const formattedEmployees = createEmployeeProperties(employees);

//       const message = getTextMessage(user.language, "edit_geolocation", [], BOT);
//       const flowData = {
//         screen: "Edit_Geo_Fencing",
//         data: {
//           ...message.label,
//           branches: placesList,
//           init_values: {
//             place: [],
//           },
//           ...formattedEmployees,
//         },
//       };

//       await sendFlow({
//         body: message.body,
//         flow_cta: "Edit Locations",
//         flow_data: flowData,
//         flow_id: EDIT_GEO_LOCATION_FLOW_ID,
//         flow_token: EDIT_GEO_LOCATION_FLOW_TOKEN,
//         recipientPhone,
//       });
//     } else {
//       const placesList = [];

//       user.places.forEach((place) => {
//         if (place.name === places) {
//           placesList.push({
//             id: place.name,
//             title: place.name,
//             description: `${place.range} meters`,
//           });
//         }
//       });

//       const employees = await Employee.findEmployees(recipient.companyId);
//       const employeeInPlaces = new Set();

//       employees.forEach((employee) => {
//         const locations = employee.locations;
//         if (locations.length > 0) {
//           locations.forEach((location) => {
//             if (location.name === places.trim()) {
//               employeeInPlaces.add(String(employee.employeeNumber));
//             }
//           });
//         }
//       });

//       const formattedEmployees = createEmployeeProperties(employees);

//       const message = getTextMessage(user.language, "edit_geolocation", [], BOT);
//       const flowData = {
//         screen: "Edit_Geo_Fencing",
//         data: {
//           ...message.label,
//           branches: placesList,
//           init_values: {
//             place: [placesList[0].id],
//             employees1: [
//               ...formattedEmployees.employeeList1
//                 .filter((emp) => employeeInPlaces.has(emp.id))
//                 .map((emp) => emp.id),
//             ],
//             employees2: [
//               ...formattedEmployees.employeeList2
//                 .filter((emp) => employeeInPlaces.has(emp.id))
//                 .map((emp) => emp.id),
//             ],
//             employees3: [
//               ...formattedEmployees.employeeList3
//                 .filter((emp) => employeeInPlaces.has(emp.id))
//                 .map((emp) => emp.id),
//             ],
//             employees4: [
//               ...formattedEmployees.employeeList4
//                 .filter((emp) => employeeInPlaces.has(emp.id))
//                 .map((emp) => emp.id),
//             ],
//           },
//           ...formattedEmployees,
//         },
//       };

//       await sendFlow({
//         body: message.body,
//         flow_cta: "Edit Locations",
//         flow_data: flowData,
//         flow_id: EDIT_GEO_LOCATION_FLOW_ID,
//         flow_token: EDIT_GEO_LOCATION_FLOW_TOKEN,
//         recipientPhone,
//       });
//     }
//   }

//   if (deleteemployee) {
//     if (deleteemployee === "delete-multiple-employees") {
//       const message = getTextMessage(user.language, "remove-employees", [user.companyName], BOT);

//       let employees = await Employee.findEmployees(recipient.companyId);

//       if (!employees || employees.length === 0) {
//         employees = {
//           employeeList1: [
//             {
//               id: "noEmployees",
//               title: "No Employees",
//             },
//           ],
//           employeeList2: [
//             {
//               id: "noEmployees",
//               title: "",
//             },
//           ],
//           employeeList3: [
//             {
//               id: "noEmployees",
//               title: "",
//             },
//           ],
//           employeeList4: [
//             {
//               id: "noEmployees",
//               title: "",
//             },
//           ],
//         };
//       } else if (employees.length > 0) {
//         employees = createEmployeeProperties(employees);
//       }

//       const flowData = {
//         screen: "Remove_Employees",
//         data: {
//           ...message.label,
//           ...employees,
//         },
//       };

//       await sendFlow({
//         body: message.body,
//         flow_cta: "Remove",
//         flow_data: flowData,
//         flow_id: REMOVE_EMPLOYEES_FLOW_ID,
//         flow_token: REMOVE_EMPLOYEES_FLOW_TOKEN,
//         recipientPhone,
//       });
//     } else {
//       const res = await Employee.updateEmployeeStatus(deleteemployee, recipient.companyId);

//       if (res && res.acknowledged) {
//         const message = getTextMessage(user.language, "employeeRemove");
//         await sendTextMessage(message, recipientPhone);
//       }
//     }
//   }

//   if (editshift) {
//     if (editshift === "multiple-edit-shift") {
//       const employees = await Employee.findEmployees(recipient.companyId);

//       if (employees) {
//         const empProps = createEmployeeProperties(employees);

//         const message = getTextMessage(user.language, "edit-timings", [], BOT);
//         const flowData = {
//           screen: "Edit_Timings",
//           data: {
//             ...message.label,
//             init_values: {
//               workinghours: "09:00",
//               checkin: "09:30",
//               checkout: "18:30",
//               // workdays: [...employees.workDays.map(String)],
//             },
//             ...empProps,
//           },
//         };
//         await sendFlow({
//           body: message.body,
//           flow_cta: "Edit Timings",
//           flow_data: flowData,
//           flow_id: EDIT_TIMING_FLOW_ID,
//           flow_token: EDIT_TIMING_FLOW_TOKEN,
//           recipientPhone,
//         });
//       }
//     } else {
//       const employee = await Employee.findOne({
//         companyId: recipient.companyId,
//         employeeNumber: Number(editshift),
//       });

//       if (employee) {
//         const empProps = createEmployeeProperties([employee]);

//         const message = getTextMessage(user.language, "edit-timings", [], BOT);

//         const checkin = formatTime12h(employee.checkIn, employee.timeZone);
//         const checkout = formatTime12h(employee.checkOut, employee.timeZone);

//         const flowData = {
//           screen: "Edit_Timings",
//           data: {
//             ...message.label,
//             init_values: {
//               timing: employee.natureOfTime,
//               shiftType: employee.shiftType,
//               checkin,
//               checkout,
//               workdays: [...employee.workDays.map(String)],
//               employees1: [String(employee.employeeNumber)],
//             },
//             ...empProps,
//           },
//         };
//         await sendFlow({
//           body: message.body,
//           flow_cta: "Edit Timings",
//           flow_data: flowData,
//           flow_id: EDIT_TIMING_FLOW_ID,
//           flow_token: EDIT_TIMING_FLOW_TOKEN,
//           recipientPhone,
//         });
//       }
//     }
//   }

//   if (reportAndApprovals) {
//     if (reportAndApprovals === "livereport") {
//       const isReport = await createLiveReport(
//         recipientPhone,
//         recipient.companyId,
//         recipient.language,
//         recipient.timeZone
//       );

//       //

//       if (isReport) {
//         await sendDocument({
//           recipientPhone,
//           file_path: path.join(process.env.ROOT_PATH, `${recipientPhone}-liveReport.pdf`),
//           caption: "Live Report",
//         });
//         await deleteFile(`${recipientPhone}-liveReport.pdf`);
//       }
//     } else if (reportAndApprovals === "leaveApprovals") {
//       const { registeredOn, timeZone, companyId } = parseUserData(flowMessage.userData, user);
//       const { monthStart, monthEnd } = calculateMonthRange(registeredOn, timeZone);

//       const leaves = await Leave.findByDate(monthStart, monthEnd, companyId);
//       const employees = await Employee.find(
//         { companyId, isActive: true },
//         { employeeName: 1, _id: 1 }
//       );

//       let leavesCheckBox = [];
//       if (leaves && leaves.length === 0) {
//         leavesCheckBox = {
//           requestsCheckbox1: [{ id: "null", title: "No Leave Requests" }],
//           requestsCheckbox2: [{ id: "null", title: "" }],
//           requestsCheckbox3: [{ id: "null", title: "" }],
//           requestsCheckbox4: [{ id: "null", title: "" }],
//           requestsCheckbox5: [{ id: "null", title: "" }],
//         };
//       } else if (leaves && leaves.length > 0) {
//         const result = {
//           requestsCheckbox1: [],
//           requestsCheckbox2: [],
//           requestsCheckbox3: [],
//           requestsCheckbox4: [],
//           requestsCheckbox5: [],
//         };

//         const checkboxes = leaves.map((leave) => {
//           const employee = employees.find(
//             (employee) => employee._id.toString() === leave.employeeId
//           );
//           const from = moment.tz(leave.from, timeZone);
//           const to = moment.tz(leave.to, timeZone);
//           return {
//             id: leave._id.toString(),
//             title: `${employee.employeeName.slice(0, 5)} ${leave.leaveType} ${from.format(
//               "DD/MM"
//             )} - ${to.format("DD/MM")}`,
//           };
//         });
//         leavesCheckBox = generateCheckboxRequests(checkboxes, result, "requestsCheckbox");
//       }

//       const flowData = {
//         screen: "Leave_Approvals",
//         data: {
//           leaveApprovalsLabel: "Approval Type",
//           requestsLable: "Leave Requests",
//           userData: "",
//           leaveApprovalsRadio: [
//             {
//               id: "approve",
//               title: "Approve",
//             },
//             {
//               id: "reject",
//               title: "Reject",
//             },
//           ],
//           init_values: {
//             userData: "",
//             approveType: "approve",
//             requests1: [...getIds(leavesCheckBox.requestsCheckbox1)],
//             requests2: [...getIds(leavesCheckBox.requestsCheckbox2)],
//             requests3: [...getIds(leavesCheckBox.requestsCheckbox3)],
//             requests4: [...getIds(leavesCheckBox.requestsCheckbox4)],
//             requests5: [...getIds(leavesCheckBox.requestsCheckbox5)],
//           },
//           ...leavesCheckBox,
//           // ...message.label,
//         },
//       };

//       await sendFlow({
//         body: "Leave Requests",
//         // body: message.body,
//         flow_cta: "Requests",
//         flow_data: flowData,
//         flow_id: LEAVE_REQUESTS_FLOW_ID,
//         flow_token: LEAVE_REQUESTS_FLOW_TOKEN,
//         recipientPhone,
//       });
//     } else if (reportAndApprovals === "attendanceCorrections") {
//       const { registeredOn, timeZone, companyId } = parseUserData(flowMessage.userData, user);

//       const { monthStart, monthEnd } = calculateMonthRange(registeredOn, timeZone);

//       const attendances = await Attendance.find(
//         {
//           companyId,
//           "creationType.status": "pending",
//           $and: [{ date: { $gte: monthStart } }, { date: { $lte: monthEnd } }],
//         },
//         { employeeId: 1, _id: 1, checkInTime: 1, checkOutTime: 1, date: 1 }
//       );
//       const employees = await Employee.find(
//         { companyId, isActive: true },
//         { employeeName: 1, _id: 1 }
//       );

//       let attendancesCheckBox = [];
//       if (attendances && attendances.length === 0) {
//         attendancesCheckBox = {
//           correctionsChechbox1: [{ id: "null", title: "No Correction Requests" }],
//           correctionsChechbox2: [{ id: "null", title: "" }],
//           correctionsChechbox3: [{ id: "null", title: "" }],
//           correctionsChechbox4: [{ id: "null", title: "" }],
//           correctionsChechbox5: [{ id: "null", title: "" }],
//         };
//       } else if (attendances && attendances.length > 0) {
//         const result = {
//           correctionsChechbox1: [],
//           correctionsChechbox2: [],
//           correctionsChechbox3: [],
//           correctionsChechbox4: [],
//           correctionsChechbox5: [],
//         };

//         const checkboxes = attendances.map((attendance) => {
//           const employee = employees.find(
//             (employee) => employee._id.toString() === attendance.employeeId
//           );

//           const checkIn = moment.tz(attendance.checkInTime, timeZone);
//           const checkOut = moment.tz(attendance.checkOutTime, timeZone);
//           const date = moment.tz(attendance.date, timeZone);

//           return {
//             id: attendance._id.toString(),
//             title: `${employee.employeeName.slice(0, 5)} ${date.format("DD/MM")} ${checkIn.format(
//               "HH:MM"
//             )} - ${checkOut.format("HH:MM")}`,
//           };
//         });
//         attendancesCheckBox = generateCheckboxRequests(checkboxes, result, "correctionsChechbox");
//       }

//       const flowData = {
//         screen: "Attendance_Approvals",
//         data: {
//           approvalsLabel: "Approval Type",
//           correctionLable: "Correction Requests",
//           userData: "fd",
//           approvalsRadio: [
//             {
//               id: "approve",
//               title: "Approve",
//             },
//             {
//               id: "reject",
//               title: "Reject",
//             },
//           ],
//           init_values: {
//             userData: "fd",
//             approveType: "approve",
//             corrections1: [...getIds(attendancesCheckBox.correctionsChechbox1)],
//             corrections2: [...getIds(attendancesCheckBox.correctionsChechbox2)],
//             corrections3: [...getIds(attendancesCheckBox.correctionsChechbox3)],
//             corrections4: [...getIds(attendancesCheckBox.correctionsChechbox4)],
//             corrections5: [...getIds(attendancesCheckBox.correctionsChechbox5)],
//           },
//           ...attendancesCheckBox,
//           // ...message.label,
//         },
//       };

//       await sendFlow({
//         body: "Attendance Correction Requests",
//         // body: message.body,
//         flow_cta: "Requests",
//         flow_data: flowData,
//         flow_id: ATTENDANCE_REQUESTS_FLOW_ID,
//         flow_token: ATTENDANCE_REQUESTS_FLOW_TOKEN,
//         recipientPhone,
//       });
//     } else if (reportAndApprovals === "broadcast") {
//       const employees = await Employee.findEmployees(recipient.companyId);

//       const dynamicFlowData = {
//         employeesRadio: employees.map((employee) => ({
//           id: String(employee.employeeNumber),
//           title: employee.employeeName,
//         })),
//       };
//       const [flowData, body] = getFlowData(
//         "Broadcast",
//         dynamicFlowData,
//         user.language,
//         "broadcast"
//       );
//       await sendFlow({
//         body,
//         flow_cta: "Broadcast",
//         flow_data: flowData,
//         flow_id: BROADCAST_FLOW_ID,
//         flow_token: BROADCAST_FLOW_TOKEN,
//         recipientPhone,
//       });
//     }
//   }

//   if (buseinessSettings) {
//     const dynamicData = { init_values: {} };

//     const employer = await Employer.findOne(
//       {
//         employerNumber: Number(recipientPhone),
//         _id: recipient.companyId,
//       },
//       { _id: 0 }
//     );

//     if (employer) {
//       Object.entries(employer._doc).forEach(([key, value]) => {
//         if (key === "fullName") {
//           dynamicData.init_values.employerName = value;
//         } else {
//           dynamicData.init_values[key] = String(value);
//         }
//       });
//     }

//     const [flowData, body] = getFlowData(
//       "Edit_Business",
//       dynamicData,
//       user.language,
//       "business-settings"
//     );
//     await sendFlow({
//       body,
//       flow_cta: "Update",
//       flow_data: flowData,
//       flow_id: EDIT_BUSINESS_FLOW_ID,
//       flow_token: EDIT_BUSINESS_FLOW_TOKEN,
//       recipientPhone,
//     });
//   }
// }

// async function generateAndSendReport(reportType, user) {
//   let isReportGenerated = false;
//   let reportFilePath = "";

//   switch (reportType) {
//     case "yesterdayreport":
//       isReportGenerated = await createLiveReport(
//         user.recipientPhone,
//         user.companyId,
//         user.language,
//         user.timeZone,
//         "yesterday"
//       );
//       reportFilePath = `${user.recipientPhone}-yesterdayReport.pdf`;
//       break;
//     case "currentmonth": {
//       const currentDate = moment.tz(new Date(), user.timeZone);
//       isReportGenerated = await createMonthlyReport(currentDate.month(), user.user);
//       reportFilePath = `${user.recipientPhone}-MonthlyReport.pdf`;
//       break;
//     }
//     case "allEmployees":
//       isReportGenerated = await createAllEmployeeReport(
//         user.recipientPhone,
//         user.companyId,
//         user.language
//       );
//       reportFilePath = `${user.recipientPhone}-allEmployeeReport.pdf`;
//       break;
//     case "customdaterangepdf":
//       await sendDateRangeFlow(user.registeredOn, user.recipientPhone);
//       return;
//   }

//   if (isReportGenerated) {
//     await sendDocument({
//       file_path: path.join(process.env.ROOT_PATH, reportFilePath),
//       caption:
//         reportType === "yesterdayreport"
//           ? "Yesterday Report"
//           : reportType === "currentmonth"
//           ? "Current Month Report"
//           : "All Employees Report",
//       recipientPhone: user.recipientPhone,
//     });
//     await deleteFile(reportFilePath);
//   }
// }

export default handleFlowMessage;
