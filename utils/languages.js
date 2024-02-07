const mainBotLanguage = {
  English: {
    hi: {
      message: (name) => `Hello ${name}\n I'm your friendly Attendance Bot here to assist you.`,
      buttons: (userData) => [
        {
          id: "MarkAttendance",
          title: "Mark Attendance",
        },
        // {
        //   id: "Report",
        //   title: "Report",
        // },
        {
          id: `empFl@${userData}`,
          // id: "employeeFlow",
          title: "Other",
        },
      ],
    },
    MarkAttendance: {
      message: () =>
        "*Mark Attendance*\n\n- To mark the start of their workday, click on [IN].\n- To mark the the end of your workday, click on [OUT].",
      buttons: [
        { id: "in", title: "🟢 IN" },
        { id: "out", title: "🔴 OUT" },
      ],
    },
    in: {
      message: () =>
        "*Location* \n📍 Please share your current location by following these steps:\n1. 📩 Select this message.\n2. 💬 Click 'Reply'.\n3. 📎 Tap the attachment or clip icon.\n4. 📍Select 'Location'.\n5. ✅ Choose 'Send Your Current Location'.",
    },
    out: {
      message: () =>
        "*Location* \n📍 Please share your current location by following these steps:\n1. 📩 Select this message.\n2. 💬 Click 'Reply'.\n3. 📎 Tap the attachment or clip icon.\n4. 📍Select 'Location'.\n5. ✅ Choose 'Send Your Current Location'.",
    },
    attendanceLocation: {
      message: () =>
        "📸 For attendance, please send a selfie with the background showing your location within the geofencing area.",
    },
    clickAttendanceLocation: {
      message: () =>
        "*⚠️ Do not send directly* . First, ensure you're *replying*, then choose 'Send Your Current Location'.\n📍 Please share your current location by following these steps:\n1. 📩 Select this message.\n2. 💬 Click 'Reply'.\n3. 📎 Tap the attachment or clip icon.\n4. 📍 Select 'Location'.",
    },
    locNotInRange: {
      message: () =>
        `🚫 We're sorry, but we couldn't register your location 📍 and attendance ⏲️ at this time. You are not within the company's range 🚷. Please move within the company's range and then retry from the start 🔁.👣`,
    },
    attendancePic: {
      message: () => "📸 Please send a selfie photo of yours 🤳.",
    },
    Report: {
      message: () => "Download your current Month report or previous month report",
      buttons: [
        {
          id: "currentMonth",
          title: "Current Month",
        },
        // {
        //   id: 'previousMonth',
        //   title: 'Previous Month',
        // },
      ],
    },
    uploadEmployee: {
      message: () => "Please upload all your employee contacts.",
    },
    Other: {
      message: () =>
        "Hello! How can we assist you today? Please choose from the following options.",
      buttons: [
        {
          id: "requestLeave",
          title: "Request Leave",
        },
        {
          id: "support",
          title: "Support",
        },
        // {
        //   id: 'question',
        //   title: 'Ask Question',
        // },
      ],
    },
    startLeaveRequest: {
      message: () =>
        "We have successfully completed marking attendance demo.\nNext demo is how you can ask Request Leaves",
      buttons: [{ id: "requestLeave", title: "Start Request Leave" }],
    },
    requestLeave: {
      message: () =>
        "Thinking of taking a little break?\nPlease let us know how many days you'd like to request off:",
      buttons: [
        { id: "oneDay", title: "ONE DAY" },
        { id: "moreThanOneDay", title: "MORE THAN ONE DAY" },
      ],
    },
    oneDay: {
      message: () => ({
        body: "Please specify the date and Reason by clicking below button",
        label: {
          title: "Request Leave",
          startdatelabel: "Start Date",
          reasonlabel: "Reason For Leave",
        },
      }),
    },
    moreThanOneDay: {
      message: () => ({
        body: "Please specify the date and Reason by clicking below button",
        label: {
          title: "Request Leave",
          startdatelabel: "Start Date",
          enddatelabel: "End Date",
          requestlabel: "Request For Leave",
          reasonlabel: "Reason For Leave",
        },
      }),
    },
    leaveSummary: {
      message: (
        employeeName,
        department,
        leaveType,
        startDate,
        endDate,
        reasonForLeave,
        ticketNumber,
        recipientPhone
      ) =>
        `Name: *${employeeName}*\nDepartment: *${
          department ?? "-"
        }* \nFor: *Request Leave*\nLeave Type: *${leaveType}*\nStart Date: *${startDate}*\n${
          endDate !== "Invalid Date" ? `End Date: *${endDate}*\n` : ""
        }Reason: *${reasonForLeave}*\nNumber : *${recipientPhone}* \nTicket No. : *${ticketNumber}*`,
    },
    support: {
      message: () => "Welcome! We're here to assist you. Please select the issues you are facing:",
      buttons: [
        {
          title: `🔎 Issues`,
          headers: `🔎 Issues`,
          rows: [
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
              title: "OTHER ❓",
              description: "Other Issue",
            },
          ],
        },
      ],
    },
    checkIn: {
      message: () => "Please type your remark.",
    },
    checkOut: {
      message: () => "Please type your remark.",
    },
    other_issue: {
      message: () => "Please type your remark.",
    },
    Salary_Issue: {
      message: () => "Please type your remark.",
    },
    employeeIssue: {
      message: () => "Please type your remark.",
    },
    registerComplain: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `Name: *${name}*\nDepartment: *${
          department ?? "-"
        }*\nFor: *Support*\nproblem : *${problem}*\nRemark. : *${message}*\nNumber : *${recipientPhone}*\nTicket no. : *${ticketNumber}*`,
    },
    sendIssue: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `*Employee Issue Report*\nDear Employer, there is an issue reported by an employee:\nEmployee Name : ${name}\nNumber : *${recipientPhone}*\nIssue : *${problem}*\nIssue Description : *${message}*\nTicket no. : *${ticketNumber}*\nPlease take appropriate action to address this concern.`,
      buttons: (employeeNumber, ticketNumber) => [
        { title: "Approve", id: `issue_approve-${employeeNumber}-${ticketNumber}` },
        { title: "Reject", id: `issue_reject-${employeeNumber}-${ticketNumber}` },
        { title: "Hold", id: `issue_hold-${employeeNumber}-${ticketNumber}` },
      ],
    },
    sendLeave: {
      message: (employeeName, leaveType, startDate, endDate, reason) =>
        `*Leave Request Notification* \n👤 Employee Name: ${employeeName}\nLeave Type: ${leaveType}\nStart Date: *${startDate}*\n${
          endDate != "Invalid Date" ? `End Date: *${endDate}*\n` : ""
        }Reason: ${reason}\nPlease review and take necessary action.`,
      buttons: (employeePhone, ticketNumber) => [
        {
          id: `request_approve-${employeePhone}-${ticketNumber}`,
          title: "Approve",
        },
        {
          id: `request_reject-${employeePhone}-${ticketNumber}`,
          title: "Reject",
        },
        {
          id: `request_hold-${employeePhone}-${ticketNumber}`,
          title: "Hold",
        },
      ],
    },
    approvals: {
      buttons: [
        { title: "Leave-Approve", id: "leaveApprove" },
        { title: "Active-Issues", id: "activeIssues" },
      ],
      message: () =>
        `Hello,Please select an option below:\n 1️⃣ For approving leaves.\n 2️⃣ To view active issues awaiting your approval.\nJust click on the corresponding button to proceed!`,
    },
    leaveApprove: {
      message: () =>
        `*Employee Leave Reported*\nDear Employer, there is a leave request by an employee\n *Ticket No.: RL4545* \n *Name*: Ram \n *Dates*: 23/12/2023 \n *Reason* : Wedding \n *Type* : Request Leave`,
      buttons: [
        { title: "Approve", id: "request_approve" },
        { title: "Reject", id: "request_reject" },
        { title: "Hold", id: "request_hold" },
      ],
    },
    activeIssues: {
      message: () =>
        `*Employee Issue Report*\nDear Employer, there is an issue reported by an employee:\n *Employee Name* : Sham \n *Issue* : Salary \n *Issue Description* : Salary less credited\nPlease take appropriate action to address this concern.`,
      buttons: [
        { title: "Approve", id: "issue_approve" },
        { title: "Reject", id: "issue_reject" },
        { title: "Hold", id: "issue_hold" },
      ],
    },
    issue_approve: {
      message: () =>
        "Status Update: Approved\nWe're pleased to inform you that your request/application has been approved!\nThank you for your patience and cooperation",
    },
    issue_reject: {
      message: () =>
        "Status Update: Rejected \nWe regret to inform you that your request/application has been rejected.\nWe appreciate your understanding.",
    },
    issue_hold: {
      message: () =>
        "Status Update: On Hold \nYour request/application is currently on hold while we review and assess the situation.\nWe appreciate your patience during this time.",
    },
    request_approve: {
      message: () =>
        `*Leave Request Update*: Approved\nWe're pleased to inform you that your leave request for has been approved!\nThank you for your patience and cooperation.`,
    },
    request_reject: {
      message: () =>
        `*Leave Request Update*: Rejected \nWe regret to inform you that your leave request for has been rejected.\nWe appreciate your understanding.`,
    },
    request_hold: {
      message: () =>
        `*Leave Request Update*: On Hold \nYour leave request for is currently on hold while we review and assess the situation.\nWe appreciate your patience during this time.`,
    },
    addEmployee: {
      message: (employeeName, employeeNumber, timing, geofen) =>
        `Adding:\n*Name*: ${employeeName}\n*Number*: ${employeeNumber}\n*Type*: ${timing}\n*GeoFencing*: ${geofen}`,
    },
    editEmployee: {
      message: () => ({
        body: `Edit Employee by clicking the button 'Edit Employee' and filling the form.`,
        label: {
          title: "Edit Employee Details",
          employeeNameLabel: "Employee Name",
          employeeNumberLabel: "Employee Number",
          timingTypeLabel: "timing type",
          checkInLabel: "Check-In",
          checkOutLabel: "Check-Out",
          designationLabel: "Designation",
          branchLabel: "Place",
          joiningDateLabel: "Joining Date",
          dobLabel: "Date Of Birth",
          shiftTypeLabel: "Shift Type",
          workdaysLabel: "Work Days",
          proofLabel: "Proof",
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
      }),
    },
    ticketUpdate: {
      message: (ticketNumber) =>
        `Status of Ticket No: ${ticketNumber} has been updated successfully`,
    },
    employerStart: {
      message: () =>
        "Hello, Please select an option from the following choices:\n\n1️⃣. Get Report:  Click this button to receive a detailed report..\n2️⃣. Approvals: Need to check or manage employee leave approvals? Use this button to navigate through.\n3️⃣. Profile/Settings: Manage your profile and settings here.",
      buttons: [
        { id: "employerReports", title: "Get-Report" },
        { id: "approvals", title: "Approvals" },
        { id: "profile-settings", title: "Profile & Settings" },
      ],
    },
    employerReports: {
      message: () =>
        "Welcome! Please select an option:\n1. Live Report: View real-time updates.\n2. Yesterday Report: Access the yesterday report.\n3. Employee Master Sheet: Access the employee master sheet.",
      buttons: [
        {
          title: "Reports",
          headers: "Reports",
          rows: [
            {
              id: "liveReport",
              title: "Live Report",
              description: "Download Live Report",
            },
            {
              id: "yesterdayReport",
              title: "Yesterday Report",
              description: "Download Yesterday Report",
            },
            {
              id: "dateRangeReport",
              title: "Date Range Report",
              description: "Download Date Range Report",
            },
            {
              id: "emp_master_sheet",
              title: "Show All Employees",
              description: "Download Report of all your Employees",
            },
          ],
        },
      ],
      // buttons: [
      //   {
      //     id: "liveReport",
      //     title: "Live Report",
      //   },
      //   // {
      //   //   id: "yesterdayReport",
      //   //   title: "Yesterday Report",
      //   // },
      //   {
      //     id: "dateRangeReport",
      //     title: "Date Range Report",
      //   },
      //   {
      //     id: "emp_master_sheet",
      //     title: "Show All Employees",
      //   },
      // ],
    },
    employeeDemoStart: {
      buttons: [{ id: "MarkAttendance", title: "Mark Attendance" }],
      message: () =>
        "1️⃣ *Employee Demo Steps*:\n   a. ✅ Mark Attendance\n   b. 🙋 Request Leave\n   c. 🎫 Raise a Ticket\n   d. 📊 View Report\n2️⃣ *Employer Demo Steps* (after completing the Employee Demo steps)",
    },
    "addGeo-fencing-emplyer": {
      message: () =>
        `If you wish to incorporate geo-fencing functionality, kindly select the "Yes" option below.`,
      buttons: [
        { id: "yes-geofencing", title: "Yes" },
        { id: "no-geofencing", title: "No" },
      ],
    },
    "yes-employer": {
      message: () => `Please share the current location of your office `,
    },
    "office-geo-fencing": {
      message: () => `Thank you for providing the current location of your office`,
    },
    "reminder-in": {
      message: () => `This is a friendly reminder to mark Check-In in the next 5 minutes`,
    },
    "reminder-out": {
      message: () => `This is a friendly reminder to mark Check-Out in the next 5 minutes`,
    },
    addBranch: {
      message: () => ({
        body: `Add Place by clicking the "Add Place" button.`,
        label: {
          title: "Geo Fencing",
          heading: "Place Coordinates",
          rangelabel: "Range",
          rangeheadinglabel: "Range must be 200 meters and above",
          branchnamelabel: "Place Name",
        },
      }),
    },
    employeeUploaded: {
      message: () =>
        "✅ Successfully created the employee profile.\n\nA formal notification and attendance initiation message has been sent to the employee`s WhatsApp number.\n\nPlease inform employees to promptly complete the demonstration and begin marking their attendance. Following is the status: \n",
    },
    employeeDemoCompleted: {
      message: () =>
        "✅ Successfully completed the Demo.\nYou are requested to start Marking your attendance daily on this number. You can type `Hi` anytime to start the flow.",
    },
    "profile-settings": {
      message: () =>
        `*Profile Settings*\n\nSelect an option below:\n\n1. *Business Settings*:Configure your business preferences.\n2. *Notifications*:for Live Reports on a Daily Basis.\n3. *Edit / Delete*\n\ta. Edit Shift Timing`,
      // message: () =>
      //   `*Profile Settings*\n\nSelect an option below:\n\n1. *Business Settings*:Configure your business preferences.\n2. *Notifications*:for Live Reports on a Daily Basis.\n3. *Edit / Delete*\n\ta. Edit Geo Fencing\n\tb. Edit Shift Timing`,
      buttons: [
        {
          id: "business-settings",
          title: "Business Settings",
        },
        {
          id: "notification-settings",
          title: "Notifications",
        },
        {
          id: "edit-delete",
          title: "Edit / Delete",
        },
      ],
    },
    "business-settings": {
      message: () => ({
        body: `Please update your business information by clicking the button below. Thank you!`,

        label: {
          title: "Edit Business Settings",
          employerNamelabel: "Employee Name",
          employernolabel: "Employee Number",
          bufferTimelabel: "Buffer Time",
          companyNamelabel: "Company Name",
          monthlySickLeavelabel: "Monthly Sick Leave",
          casualLeavelabel: "Casual Leave",
          annualLeavelabel: "Annual Leave",
          maternityLeaveAllowedlabel: "Maternity Leave",
          paternityLeaveAllowedlabel: "Paternity Leave",
          unpaidLeavePolicylabel: "Unpaid Leave",
          leaveEncashmentlabel: "Leave Encashment",
          consequencesUnapprovedLeavelabel: "Leave Consequences",
          halfDayPolicylabel: "Half Day",
          Languagelabel: "Language",
          carryForwardLimitlabel: "Carry Forward",
        },
      }),
    },
    "edit-delete": {
      message: () =>
        `You have selected the option to edit or delete. Please choose from the following features\n\n1. Edit Shift Timings:Adjust employee schedules based on company time.\n2.Edit Geo Fencing: Modify or update geographical boundaries or restrictions.\n3.Delete:This option allows you to delete any data related to employees`,
      buttons: [
        { id: "edit-timings", title: "Edit Shift Timings" },
        { id: "edit-geo-fencing", title: "Edit Geo Fencing" },
        { id: "delete", title: "Delete" },
      ],
    },
    "edit-timings": {
      message: () => ({
        body: `Kindly manage and optimize employee schedules by accessing the button below to Edit Shift Timings. Your attention to this matter is highly appreciated. Thank you.`,
        label: {
          title: "Edit Shift Timings",
          timingTypeLabel: "Timing Type",
          checkInLabel: "Check IN",
          checkOutLabel: "Check OUT",
          employeesLabel: "Employees",
          shiftTypeLabel: "Shift Type",
          workdaysLabel: "Work Days",
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
      }),
    },
    "edit-geo-fencing": {
      message: () =>
        `Please ensure precise control over employee locations by utilizing the button below to access and edit Geo Fencing settings. Your attention to this task is valued. Thank you`,
    },
    link_employee: {
      message: () => ({
        body: `Add new Place and employees into the Place`,
        label: {
          title: "Geo Fencing",
          heading: "Place Coordinates",
          rangelabel: "Range",
          rangeheadinglabel: "Range must be 50 meters and above",
          employeelabel: "Link Place to Employee:",
          branchnamelabel: "Place Name",
        },
      }),
    },
    edit_geolocation: {
      message: () => ({
        body: `Edit Geo Fencing of Employees by clicking the below button`,
        label: {
          title: "Edit Geo Location",
          workingHoursLabel: "Working Hours",
          branchLabel: "Employee",
          timingTypeLabel: "Timing Type",
          placelabel: "Places",
        },
      }),
    },
    "edit-notifs": {
      message: (companyName) => ({
        body: `Update notifications by clicking the Update button.`,
        label: {
          companyNamelabel: companyName,
          Notificationslabel: "Notifications+1 lang",
          dailyreportlabel: "Daily Morning Report",
          dailyeveningreportlabel: "Daily Evening Report",
          monthendlabel: "Month End Report",
        },
        buttons: [
          { id: "checkIn", title: "Check-Ins" },
          { id: "checkOut", title: "Check-Outs" },
          { id: "leaveRequest", title: "Leave Requests" },
          { id: "support", title: "Support Requests" },
        ],
      }),
    },
    "notification-settings": {
      message: () =>
        `Enhance your managerial experience with our latest feature - the Edit Notification button\n\nCheck In: Receive notification when your employees check-In.\nCheck Out: Receive notification when your employees check-Out.\nMorning Report: Receive a live report in morning.\nEvening Report: Receive a live report in Evening.`,
      buttons: [{ id: "edit-notifs", title: "Edit Notifications" }],
    },
    "remove-employees": {
      message: (companyName) => {
        return {
          body: `Kindly click the button below to initiate the employee removal process.`,
          label: {
            title: "Remove Employees",
            employeesLabel: "Employees",
            companylabel: companyName,
          },
        };
      },
    },
    "remove-branch": {
      message: () => ({
        body: `Please click the button below to initiate the employee remove from the Place.`,
        label: {
          title: "Remove Employees From Place",
          branchLabel: "Places",
          employeesLabel: "Employees",
          companylabel: "Company Name",
        },
      }),
    },
    "live-report-templates": {
      message: () => ({
        employees: "Employees",
        onTime: "On Time",
        late: "Late",
        halfDay: "Half Day",
        fullDay: "Full Day",
        absent: "Absent",
        onLeave: "On Leave",
        attendance: "Attendance",
        employee: "Name",
        date: "Date",
        shiftTime: "Shift Time",
        shiftStatus: "Status",
        checkIn: "Check In",
        checkOut: "Check Out",
        requiredTime: "Required Time",
        duration: "Duration",
        shiftDuration: "Shift Duration",
        leaveRequests: "Leave Requests",
        leaveType: "Leave Type",
        startDate: "Start Date",
        endDate: "End Date",
        status: "Status",
        reason: "Reason",
        open: "open",
        logs: "Logs",
      }),
    },
    "employee-report-templates": {
      message: () => ({
        employees: "Employees",
        present: "Present",
        absent: "Absent",
        leaves: "Leaves",
        attendance: "Attendance",
        date: "Date",
        shiftStatus: "Shift & Status",
        checkIn: "Check In",
        checkOut: "Check Out",
        requiredTime: "Required Time",
        actualTime: "Actual Time",
        shiftDuration: "Shift Duration",
        leaveRequests: "Leave Requests",
        leaveType: "Leave Type",
        startDate: "Start Date",
        endDate: "End Date",
        status: "Status",
      }),
    },
    "emp-attendance-templates": {
      message: () => ({
        employeeAttendenceLogs: "Employee Attendence Logs",
        totalTickets: "Total Tickets",
        ticketOpen: "Ticket Open",
        ticketClosed: "Ticket Closed",
        employeeAttendenceLog: "Employee Attendence Log",
      }),
    },
    "all-emp-ticket-templates": {
      message: () => ({
        employeeTickets: "Employee Tickets",
        totalTickets: "Total Tickets",
        ticketOpen: "Ticket Open",
        ticketClosed: "Ticket Closed",
        ticketsOpen: "Tickets Open",
        ticketsClosed: "Tickets Closed",
      }),
    },
    "all-emp-report-templates": {
      message: () => ({
        employeesLabel: "Employees",
        employeesInfo: "Employees Info",
        employee: "Employee",
        position: "Position",
        shiftTimings: "CheckIn-CheckOut",
        joiningDate: "Joining Date",
        language: "Language",
        natureOfTime: "Nature of Time",
        countryName: "Country Name",
        timeZone: "Time Zone",
        locations: "GeoFancing",
        workDays: "Working days",
        // companyName : "Company Name"
        shiftType: "Shift Type",
        proof: "Proofs",
      }),
    },
    delete: {
      message: () =>
        `Hello,Please select an option below:\n1. Remove Employees: Remove Employees from organization.\n2. Remove Place: Remove Employees from Place`,
      buttons: [
        { id: "remove-employees", title: "Remove Employees" },
        { id: "remove-branch", title: "Remove Place" },
      ],
    },
    dateRangeReport: {
      message: () => ({
        body: `We have prepared a comprehensive Date Range Report for your review. Please specify your preferred date range, and we'll promptly provide you with the insights and analysis.`,
        label: {
          title: "Date Range Report",
          startdatelabel: "Start Date",
          enddatelabel: "End Date",
        },
      }),
    },
    attendanceManagement: {
      message: () => ({
        body: `Welcome to AutoWhat Attendance Management Chat Bot.`,
        label: {
          label1: "Quick Options",
          label2: "Reports",
          label3: "Team",
          label7: "Edit Places",
          label9: "Delete Places",
          label10: "Edit Shift Timing",
          label11: "Delete Employee",
          labeldelete: "Delete Options",
          labeledit: "Edit Options",
          labelbusiness: "Business Settings",
          labelBussinessRadio: "Edit Business Settings",
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
              id: "allEmployees",
              title: "All Employees Report",
            },
          ],
          quick: [
            {
              id: "livereport",
              title: "Live Report",
            },
            {
              id: "leaveApprovals",
              title: "Leave Approvals",
            },
            {
              id: "attendanceCorrections",
              title: "Attendance Correction",
            },
            {
              id: "supportTickets",
              title: "Support Tickets",
            },
            {
              id: "taskApprovals",
              title: "Task Approval",
            },
            {
              id: "broadcast",
              title: "Broadcast",
            },
            {
              id: "changeLanguage",
              title: "Change Language"
            }
          ],
          labelBussinessList: [
            {
              id: "editBusiness",
              title: "Edit Business Settings",
            },
            {
              id: "addCoOwner",
              title: "Add Co-owner",
            },
            {
              id: "transferOwner",
              title: "Transfer Ownership",
            },
            {
              id: "deleteAccount",
              title: "Delete Account",
            },
          ],
        },
      }),
    },
    contacts: {
      message: () => `Sorry! You cannot upload contacts.`,
    },
    contactsUpdate: {
      message: () => `Employee details have been successfully updated.`,
    },
    placeCreated: {
      message: () => `New place and geo-fencing have been successfully Created`,
    },
    employeeGeoFencing: {
      message: () => `Employee geo-fencing has been successfully Updated.`,
    },
    employeeRemove: {
      message: () => `Employee has been removed from the organization.`,
    },
    employeeRemovePlace: {
      message: () => `Employees have been removed from the place`,
    },
    placeDeleted: {
      message: () => `place has been successfully deleted.`,
    },
    broadcast: {
      message: () => ({
        body: `Broadcast your message to all your employees`,
        label: {
          broadcastLabel: "Broadcast Message",
          filesLabel: "Files",
          employeesLabel: "Employees",
          fileRadios: [
            {
              id: "document",
              title: "Document",
            },
            {
              id: "image",
              title: "Image",
            },
            {
              id: "video",
              title: "Video",
            },
          ],
        },
      }),
    },
    leaveApprovalsFlow: {
      //TODO: implement
    },
    attendanceCorrectionFlow: {
      //TODO: implement
    },
  },
  Hindi: {
    hi: {
      message: (name) => `नमस्ते ${name}!\n मैं आपका अटेंडेंस बॉट हूं, आपकी मदद के लिए यहाँ हूं।`,
      buttons: [
        {
          id: "MarkAttendance",
          title: "उपस्थिति दर्ज करें",
        },
        {
          id: "Report",
          title: "रिपोर्ट",
        },
        {
          id: "Other",
          title: "अन्य",
        },
      ],
    },
    MarkAttendance: {
      message: () =>
        "*उपस्थिति दर्ज करें*\n\n- अपने काम की शुरुआत के लिए [IN] पर क्लिक करें।\n- काम के अंत के लिए [OUT] पर क्लिक करें।",
      buttons: [
        { id: "in", title: "🟢 IN" },
        { id: "out", title: "🔴 OUT" },
      ],
    },
    in: {
      message: () =>
        "*स्थान*\n📍 अपना वर्तमान स्थान शेयर करने के लिए:\n1. 📩 इस मैसेज को चुनें।\n2. 💬 'रिप्लाई' पर क्लिक करें।\n3. 📎 अटैचमेंट या क्लिप आइकन टैप करें।\n4. 📍 'लोकेशन' चुनें।\n5. ✅ 'अपना वर्तमान स्थान भेजें' पर क्लिक करें।",
    },
    out: {
      message: () =>
        "*स्थान*\n📍 अपना वर्तमान स्थान शेयर करने के लिए:\n1. 📩 इस मैसेज को चुनें।\n2. 💬 'रिप्लाई' पर क्लिक करें।\n3. 📎 अटैचमेंट या क्लिप आइकन टैप करें।\n4. 📍 'लोकेशन' चुनें।\n5. ✅ 'अपना वर्तमान स्थान भेजें' पर क्लिक करें।",
    },
    attendanceLocation: {
      message: () => "📸 उपस्थिति के लिए, अपने स्थान की पृष्ठभूमि के साथ एक सेल्फी भेजें।",
    },
    clickAttendanceLocation: {
      message: () =>
        "*⚠️ सीधे न भेजें*। पहले सुनिश्चित करें कि आप *जवाब दे रहे हैं*, फिर 'अपना वर्तमान स्थान भेजें' चुनें।\n📍 अपना वर्तमान स्थान शेयर करने के लिए ये कदम अपनाएं:\n1. 📩 इस मैसेज को चुनें।\n2. 💬 'रिप्लाई' पर क्लिक करें।\n3. 📎 अटैचमेंट या क्लिप आइकन टैप करें।\n4. 📍 'लोकेशन' चुनें।",
    },
    locNotInRange: {
      message: () =>
        `🚫 आम्हाला खेद आहे, परंतु आम्ही आपल्या स्थानाची 📍 व उपस्थिती ⏲️ या वेळी नोंदवू शकलो नाही. आपण कंपनीच्या सीमेमध्ये नाहीत 🚷. कृपया कंपनीच्या सीमेमध्ये जाऊन पुन्हा प्रारंभापासून प्रयत्न करा 🔁👣.`,
    },
    attendancePic: {
      message: () => "📸 अपनी एक सेल्फी फोटो भेजें 🤳।",
    },
    Report: {
      message: () => "अपनी इस महीने की या पिछले महीने की रिपोर्ट डाउनलोड करें",
      buttons: [
        {
          id: "currentMonth",
          title: "इस महीने",
        },
        // {
        //   id: 'previousMonth',
        //   title: 'पिछला महीना',
        // },
      ],
    },
    uploadEmployee: {
      message: () => "कृपया अपने कर्मचारियों के सम्पूर्ण संपर्कों की सूची को अपलोड करें।",
    },
    Other: {
      message: () =>
        "नमस्ते! आज आपकी किस प्रकार से मदद कर सकते हैं? कृपया निम्न विकल्पों में से चुनें।",
      buttons: [
        {
          id: "requestLeave",
          title: "छुट्टी की अनुमति",
        },
        {
          id: "support",
          title: "सहायता",
        },
        // {
        //   id: 'question',
        //   title: 'प्रश्न पूछें',
        // },
      ],
    },
    startLeaveRequest: {
      message: () =>
        "हमने सफलतापूर्वक अटेंडेंस डेमो पूरा किया है। अगला डेमो यह है कि आप छुट्टी के लिए कैसे अनुरोध कर सकते हैं।",
      buttons: [{ id: "requestLeave", title: "Start Request Leave" }],
    },
    requestLeave: {
      message: () =>
        "थोड़ा ब्रेक लेने की सोच रहे हैं?\nकृपया हमें बताएं कि आप कितने दिनों की छुट्टी चाहते हैं:",
      buttons: [
        { id: "oneDay", title: "एक दिन" },
        { id: "moreThanOneDay", title: "एक से अधिक दिन" },
      ],
    },
    oneDay: {
      message: () => ({
        body: "नीचे बटन पर क्लिक करके तारीख और कारण बताएं",
        label: {
          title: "छुट्टी का अनुरोध करें",
          startdatelabel: "प्रारंभ तिथि",
          enddatelabel: "समाप्ति तिथि",
          reasonlabel: "अवकाश का कारण",
        },
      }),
    },
    moreThanOneDay: {
      message: () => ({
        body: "नीचे बटन पर क्लिक करके तारीख और कारण बताएं",
        label: {
          title: "छुट्टी का अनुरोध करें",
          startdatelabel: "प्रारंभ तिथि",
          enddatelabel: "समाप्ति तिथि",
          reasonlabel: "अवकाश का कारण",
        },
      }),
    },
    leaveSummary: {
      message: (
        employeeName,
        department,
        leaveType,
        startDate,
        endDate,
        reasonForLeave,
        ticketNumber,
        recipientPhone
      ) =>
        `नाम: *${employeeName}*\nविभाग: *${
          department ?? "-"
        }*\nके लिए: *छुट्टी की अनुमति*\nछुट्टी का प्रकार: *${leaveType}*\nशुरुआत की तारीख: *${startDate}*\n${
          endDate !== "Invalid Date" ? `अंत की तारीख: *${endDate}*\n` : ""
        }कारण: *${reasonForLeave}*\nनंबर : *${recipientPhone}* \nटिकट नं. : *${ticketNumber}*`,
    },
    support: {
      message: () =>
        "स्वागत है! हम आपकी सहायता के लिए यहां हैं। कृपया चुनें कि आपको किस समस्या का सामना है:",
      buttons: [
        {
          title: "🔎 समस्याएं",
          headers: "🔎 समस्याएं",
          rows: [
            {
              id: "check-in",
              title: "चेक इन",
              description: "चेक इन समस्या",
            },
            {
              id: "check-out",
              title: "चेक आउट",
              description: "चेक आउट समस्या",
            },
            {
              id: "salary-issue",
              title: "वेतन समस्या",
              description: "वेतन समस्या",
            },
            {
              id: "other-issue",
              title: "अन्य ❓",
              description: "अन्य समस्या",
            },
          ],
        },
      ],
    },
    checkIn: {
      message: () => "कृपया अपनी टिप्पणी टाइप करें।",
    },
    checkOut: {
      message: () => "कृपया अपनी टिप्पणी टाइप करें।",
    },
    other_issue: {
      message: () => "कृपया अपनी टिप्पणी टाइप करें।",
    },
    Salary_Issue: {
      message: () => "कृपया अपनी टिप्पणी टाइप करें।",
    },
    employeeIssue: {
      message: () => "कृपया अपनी टिप्पणी टाइप करें।",
    },
    sendIssue: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `नाम: *${name}*\nविभाग: *${
          department ?? "-"
        }*\nके लिए: *सहायता*\nसमस्या: *${problem}*\nटिप्पणी: *${message}*\nनंबर: *${recipientPhone}*\nटिकट नं.: *${ticketNumber}*`,
      buttons: (employeeNumber, ticketNumber) => [
        { title: "मंज़ूरी देना", id: `issue_approve-${employeeNumber}-${ticketNumber}` },
        { title: "अस्वीकार करना", id: `issue_reject-${employeeNumber}-${ticketNumber}` },
        { title: "रोकना", id: `issue_hold-${employeeNumber}-${ticketNumber}` },
      ],
    },
    sendLeave: {
      message: (employeeName, leaveType, startDate, endDate, reason) =>
        `*छुट्टी अनुरोध अधिसूचना* \n👤 कर्मचारी का नाम: ${employeeName}\nछुट्टी का प्रकार: ${leaveType}\nप्रारंभ तिथि: *${startDate}*\n${
          endDate !== "Invalid Date" ? `अंतिम तिथि: *${endDate}*\n` : ""
        }\nकारण: ${reason}कृपया समीक्षा करें और आवश्यक कार्रवाई करें।`,
      buttons: (employeePhone, ticketNumber) => [
        {
          id: `request_approve-${employeePhone}-${ticketNumber}`,
          title: "मंजूर",
        },
        {
          id: `request_reject-${employeePhone}-${ticketNumber}`,
          title: "नाकार",
        },
        {
          id: `request_hold-${employeePhone}-${ticketNumber}`,
          title: "रोकें",
        },
      ],
    },
    registerComplain: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `नाम: *${name}*\nविभाग: *${
          department ?? "-"
        }*\nके लिए: *सहायता*\nसमस्या: *${problem}*\nटिप्पणी: *${message}*\nनंबर: *${recipientPhone}*\nटिकट नं.: *${ticketNumber}*`,
    },
    approvals: {
      buttons: [
        { title: "छुट्टी-मंजूरी", id: "leaveApprove" },
        { title: "सक्रिय-मुद्दे", id: "activeIssues" },
      ],
      message: () =>
        `नमस्ते, कृपया नीचे दिए गए विकल्पों में से चुनें:\n 1️⃣ छुट्टियों की मंजूरी के लिए।\n 2️⃣ आपकी मंजूरी की प्रतीक्षा कर रहे सक्रिय मुद्दों को देखने के लिए।\nआगे बढ़ने के लिए संबंधित बटन पर क्लिक करें!`,
    },
    leaveApprove: {
      message: () =>
        `*कर्मचारी की छुट्टी की सूचना दी गई*\nप्रिय नियोक्ता, एक कर्मचारी ने छुट्टी का अनुरोध किया है\n *टिकट नंबर: RL4545* \n *नाम*: राम \n *दिनांक*: 23/12/2023 \n *कारण* : शादी \n *प्रकार* : छुट्टी का अनुरोध करें`,
      buttons: [
        { title: "मंज़ूरी देना", id: "request_approve" },
        { title: "अस्वीकार करना", id: "request_reject" },
        { title: "रोकना", id: "request_hold" },
      ],
    },
    activeIssues: {
      message: () =>
        `*कर्मचारी समस्या रिपोर्ट*\nप्रिय नियोक्ता, एक कर्मचारी द्वारा रिपोर्ट की गई एक समस्या है:\n *कर्मचारी का नाम* : दिखावा \n *मुद्दा* : वेतन \n *समस्या विवरण* : वेतन कम जमा किया गया\nकृपया उचित कार्रवाई करें इस चिंता का समाधान करने के लिए.`,
      buttons: [
        { title: "मंज़ूरी देना", id: "issue_approve" },
        { title: "अस्वीकार करना", id: "issue_reject" },
        { title: "रोकना", id: "issue_hold" },
      ],
    },
    issue_approve: {
      message: () =>
        "स्थिति अपडेट: स्वीकृत\nहमें आपको यह बताते हुए खुशी हो रही है कि आपका अनुरोध/आवेदन स्वीकृत हो गया है!\nआपके धैर्य और सहयोग के लिए धन्यवाद।",
    },
    issue_reject: {
      message: () =>
        "स्थिति अद्यतन: अस्वीकृत \nहमें आपको यह बताते हुए खेद है कि आपका अनुरोध/आवेदन अस्वीकार कर दिया गया है।\nहम आपकी समझ की सराहना करते हैं।",
    },
    issue_hold: {
      message: () =>
        "स्थिति अपडेट: होल्ड पर \nजब तक हम स्थिति की समीक्षा और आकलन कर रहे हैं, आपका अनुरोध/आवेदन फिलहाल होल्ड पर है।\nहम इस दौरान आपके धैर्य की सराहना करते हैं।",
    },
    request_approve: {
      message: () =>
        `*छुट्टी अनुरोध अपडेट*: स्वीकृत\nहमें आपको यह बताते हुए खुशी हो रही है कि आपकी छुट्टी का अनुरोध स्वीकृत हो गया है!\nआपके धैर्य और सहयोग के लिए धन्यवाद।`,
    },
    request_reject: {
      message: () =>
        `*छुट्टी अनुरोध अद्यतन*: अस्वीकृत \nहमें आपको यह बताते हुए खेद है कि आपकी छुट्टी का अनुरोध अस्वीकार कर दिया गया है।\nहम आपकी समझ की सराहना करते हैं।`,
    },
    request_hold: {
      message: () =>
        `*छुट्टी अनुरोध अपडेट*: होल्ड पर \nजब तक हम स्थिति की समीक्षा और आकलन कर रहे हैं, तब तक आपकी छुट्टी का अनुरोध होल्ड पर है।\nहम इस दौरान आपके धैर्य की सराहना करते हैं।`,
    },
    addEmployee: {
      message: (employeeName, employeeNumber, timing, geofen) =>
        `जोड़ रहे हैं:\n*नाम*: ${employeeName}\n*नंबर*: ${employeeNumber}\n*प्रकार*: ${timing}\n*जियोफेंसिंग*: ${geofen}`,
    },
    editEmployee: {
      message: () => ({
        body: `'कर्मचारी संपादित करें' बटन पर क्लिक करके और फॉर्म भरकर कर्मचारी को संपादित करें।`,
        label: {
          title: "कर्मचारी विवरण संपादित करें",
          employeeNameLabel: "कर्मचारी का नाम",
          employeeNumberLabel: "कर्मचारी मोबाइल नंबर",
          timingTypeLabel: "समय प्रकार",
          workingHoursNote: "फ्लेक्सिबल कामकाज का समय",
          checkInOutNote: "निश्चित समय: चेक-इन और चेक-आउट",
          checkInLabel: "चेक-इन",
          checkOutLabel: "चेक-आउट",
          workingHoursLabel: "कामकाज का समय",
          designationLabel: "पदनाम",
          branchLabel: "जगह",
          joiningDateLabel: "सम्मिलन तिथि",
          dobLabel: "जन्मतिथि",
          timingTyperadio: [
            {
              id: "Flexible",
              title: "फ्लेक्सिबल टाइमिंग",
            },
            {
              id: "Fixed",
              title: "फिक्स्ड टाइमिंग",
            },
          ],
          shiftTyperadio: [
            {
              id: "day",
              title: "डे शिफ्ट",
            },
            {
              id: "day/night",
              title: "डे/नाइट शिफ्ट",
            },
          ],
          workdaysList: [
            {
              id: "0",
              title: "रविवार",
            },
            {
              id: "1",
              title: "सोमवार",
            },
            {
              id: "2",
              title: "मंगलवार",
            },
            {
              id: "3",
              title: "बुधवार",
            },
            {
              id: "4",
              title: "गुरुवार",
            },
            {
              id: "5",
              title: "शुक्रवार",
            },
            {
              id: "6",
              title: "शनिवार",
            },
          ],
          proofList: [
            {
              id: "location",
              title: "स्थान",
            },
            {
              id: "image",
              title: "फ़ोटो",
            },
            {
              id: "logs",
              title: "लॉग्स",
            },
          ],
        },
      }),
    },
    ticketUpdate: {
      message: (ticketNumber) =>
        `टिकट नंबर: ${ticketNumber} का स्थिति अपडेट सफलतापूर्वक किया गया है`,
    },
    employerReports: {
      message: () =>
        "स्वागत! कृपया एक विकल्प चुनें:\n1. लाइव रिपोर्ट: वास्तविक समय के अपडेट देखें।\n2. कल की रिपोर्ट: कल की रिपोर्ट तक पहुंचें।\n3. कर्मचारी मास्टर शीट: कर्मचारी मास्टर शीट तक पहुंचें।",
      buttons: [
        {
          title: "Reports",
          headers: "Reports",
          rows: [
            {
              id: "liveReport",
              title: "लाइव रिपोर्ट",
              description: "Download Live Report",
            },
            {
              id: "yesterdayReport",
              title: "कल की रिपोर्ट",
              description: "Download Yesterday Report",
            },
            {
              id: "dateRangeReport",
              title: "दिनांक सीमा रिपोर्ट",
              description: "Download Date Range Report",
            },
            {
              id: "emp_master_sheet",
              title: "सभी कर्मचारी दिखाएं",
              description: "Download Report of all your Employees",
            },
          ],
        },
      ],
      // buttons: [
      //   {
      //     id: "liveReport",
      //     title: "लाइव रिपोर्ट",
      //   },
      //   {
      //     id: "yesterdayReport",
      //     title: "कल की रिपोर्ट",
      //   },
      //   {
      //     id: "emp_master_sheet",
      //     title: "सभी कर्मचारी दिखाएं",
      //   },
      // ],
    },
    employerStart: {
      message: () =>
        `नमस्ते, कृपया निम्नलिखित विकल्पों में से एक विकल्प चुनें:\n\n1️⃣। रिपोर्ट प्राप्त करें: विस्तृत रिपोर्ट प्राप्त करने के लिए इस बटन पर क्लिक करें..\n2️⃣. स्वीकृतियाँ: कर्मचारी अवकाश स्वीकृतियों की जाँच या प्रबंधन करने की आवश्यकता है? नेविगेट करने के लिए इस बटन का उपयोग करें।\n3️⃣. प्रोफ़ाइल/सेटिंग्स: अपनी प्रोफ़ाइल और सेटिंग्स यहां प्रबंधित करें।'`,
      buttons: [
        { id: "employerReports", title: "रिपोर्ट-प्राप्त करें" },
        { id: "approvals", title: "मंजूरियां" },
        { id: "profile-settings", title: "पार्श्वचित्र समायोजन" },
      ],
    },
    employeeDemoStart: {
      buttons: [{ id: "MarkAttendance", title: "उपस्थिति दर्ज करें" }],
      message: () =>
        "1️⃣ *कर्मचारी डेमो चरण*:\n   a. ✅ उपस्थिति चिह्नित करें\n   b. 🙋 छुट्टी का अनुरोध करें\n   c. 🎫 एक टिकट उठाएं\n   d. 📊 रिपोर्ट देखें\n2️⃣ *नियोक्ता डेमो चरण* (कर्मचारी डेमो चरणों को पूरा करने के बाद)",
    },
    "addGeo-fencing-emplyer": {
      message: () => `क्या आप जियो-फेंसिंग जोड़ना चाहते हैं तो नीचे बटन दबाएं`,
      buttons: [
        { id: "yes-geofencing", title: "हाँ" },
        { id: "no-geofencing", title: "नहीं" },
      ],
    },
    "yes-geofencing": {
      message: () => `कृपया अपने कार्यालय का वर्तमान स्थान साझा करें`,
    },
    "office-geo-fencing": {
      message: () => `अपने कार्यालय का वर्तमान स्थान उपलब्ध कराने के लिए धन्यवाद`,
    },
    "reminder-in": {
      message: () => `यह अगले 5 मिनट में चेक-इन चिह्नित करने के लिए एक अनुकूल अनुस्मारक है`,
    },
    "reminder-out": {
      message: () => `यह अगले 5 मिनट में चेक-इन चिह्नित करने के लिए एक अनुकूल अनुस्मारक है`,
    },
    employeeUploaded: {
      message: () =>
        "✅ कर्मचारी प्रोफ़ाइल सफलतापूर्वक बना गया है।\n\nकर्मचारी के WhatsApp नंबर पर एक साक्षात्कार और उपस्थिति प्रारंभ संदेश भेजा गया है।\n\nकृपया कर्मचारियों को सूचित करें कि वे शीघ्रता से प्रदर्शन पूरा करें और अपनी उपस्थिति चिह्नित करना शुरू करें।\n\nकिसी भी प्रश्न/समर्थन के लिए आप +918448804355 पर WhatsApp कर सकते हैं।\n\nआप अपनी प्रवाह शुरू करने के लिए कभी भी *'हाय'* टाइप कर सकते हैं।",
    },
    employeeDemoCompleted: {
      message: () =>
        "डेमो सफलतापूर्वक पूरा कर लिया गया है। आपसे अनुरोध है कि आप इस नंबर पर अपनी दैनिक उपस्थिति दर्ज करना प्रारंभ करें। किसी भी समय 'हाय' टाइप करके आप प्रक्रिया शुरू कर सकते हैं।",
    },
    "profile-settings": {
      message: () =>
        `*प्रोफ़ाइल सेटिंग*\n\nनीचे एक विकल्प चुनें:\n\n1. *व्यावसायिक सेटिंग्स*: अपनी व्यावसायिक प्राथमिकताओं को कॉन्फ़िगर करें।\n2. *सूचनाएँ*:दैनिक आधार पर लाइव रिपोर्ट के लिए।\n3. *संपादित करें/हटाएं*\n\ta. शिफ्ट टाइमिंग संपादित करें`,
      // message: () =>
      //   `*प्रोफ़ाइल सेटिंग*\n\nनीचे एक विकल्प चुनें:\n\n1. *व्यावसायिक सेटिंग्स*: अपनी व्यावसायिक प्राथमिकताओं को कॉन्फ़िगर करें।\n2. *सूचनाएँ*:दैनिक आधार पर लाइव रिपोर्ट के लिए।\n3. *संपादित करें/हटाएं*\n\ta. जियो फेंसिंग संपादित करें\n\tb. शिफ्ट टाइमिंग संपादित करें`,
      buttons: [
        {
          id: "business-settings",
          title: "व्यावसायिक सेटिंग्स",
        },
        {
          id: "notification-settings",
          title: "सूचनाएँ",
        },
        {
          id: "edit-delete",
          title: "संपादित करें/हटाएं",
        },
      ],
    },
    "business-settings": {
      message: () => ({
        body: `कृपया नीचे दिए गए बटन पर क्लिक करके अपनी व्यावसायिक जानकारी अपडेट करें। धन्यवाद!`,
        label: {
          title: "व्यापार सेटिंग्स संपादित करें",
          employerNamelabel: "कर्मचारी का नाम",
          employernolabel: "कर्मचारी संख्या",
          bufferTimelabel: "बफर समय",
          companyNamelabel: "कंपनी का नाम",
          monthlySickLeavelabel: "मासिक बीमारी का अवकाश",
          casualLeavelabel: "तात्कालिक अवकाश",
          annualLeavelabel: "वार्षिक अवकाश",
          maternityLeaveAllowedlabel: "मातृत्व अवकाश स्वीकृत",
          paternityLeaveAllowedlabel: "पितृत्व अवकाश स्वीकृत",
          unpaidLeavePolicylabel: "निर्देश अवकाश",
          leaveEncashmentlabel: "अवकाश एनकैशमेंट",
          consequencesUnapprovedLeavelabel: "अस्वीकृत अवकाश के परिणाम",
          halfDayPolicylabel: "आधे दिन की नीति",
          Languagelabel: "भाषा",
          carryForwardLimitlabel: "आगे बढ़ने की सीमा",
        },
      }),
    },
    "edit-delete": {
      message: () =>
        `आपने संपादित करने या हटाने का विकल्प चुना है. कृपया निम्नलिखित सुविधाओं में से चुनें\n\n1. शिफ्ट समय संपादित करें: कंपनी के समय के आधार पर कर्मचारी शेड्यूल समायोजित करें।\n2. जियो फेंसिंग संपादित करें: भौगोलिक सीमाओं या प्रतिबंधों को संशोधित या अपडेट करें।\n3.हटाएं: यह विकल्प आपको कर्मचारियों से संबंधित किसी भी डेटा को हटाने की अनुमति देता है।`,
      buttons: [
        { id: "edit-timings", title: "कार्यक्षेत्र समय" },
        { id: "edit-geo-fencing", title: "जियो-फेंसिंग संपादित" },
        { id: "delete", title: "मिटाना" },
      ],
    },
    "edit-timings": {
      message: () => ({
        body: `कृपया शिफ्ट टाइमिंग संपादित करने के लिए नीचे दिए गए बटन तक पहुंच कर कर्मचारी शेड्यूल को प्रबंधित और अनुकूलित करें। इस मामले पर आपका ध्यान अत्यधिक सराहनीय है। धन्यवाद।`,
        label: {
          title: "शिफ्ट समय संपादित करें",
          timingTypeLabel: "समय प्रकार",
          checkInLabel: "चेक इन",
          checkOutLabel: "चेक आउट",
          workingHoursLabel: "कार्यक्षेत्र समय",
          branchLabel: "शाखाएं",
          employeesLabel: "कर्मचारी",
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
      }),
    },
    "edit-geo-fencing": {
      message: () =>
        `कृपया जियो फेंसिंग सेटिंग्स तक पहुंचने और संपादित करने के लिए नीचे दिए गए बटन का उपयोग करके कर्मचारी स्थानों पर सटीक नियंत्रण सुनिश्चित करें। इस कार्य पर आपका ध्यान मूल्यवान है. धन्यवाद`,
    },
    link_employee: {
      message: () => ({
        body: `स्थान में नया स्थान और कर्मचारी जोड़ें`,
        label: {
          title: "जियो फेंसिंग",
          heading: "जगह संयोजन",
          rangelabel: "सीमा",
          rangeheadinglabel: "सीमा 50 मीटर और ऊपर होनी चाहिए",
          employeelabel: "कर्मचारी से जगह को जोड़ें:",
          branchnamelabel: "जगह का नाम",
        },
      }),
    },
    edit_geolocation: {
      message: () => ({
        body: `नीचे दिए गए बटन पर क्लिक करके कर्मचारियों की जियो फेंसिंग संपादित करें`,
        label: {
          title: "भौगोलिक स्थान संपादित करें",
          workingHoursLabel: "कार्यक्षेत्र समय",
          branchLabel: "कर्मचारी",
          timingTypeLabel: "समय प्रकार",
          placelabel: "स्थान",
        },
      }),
    },
    "edit-notifs": {
      message: (companyName) => ({
        body: `अपडेट बटन पर क्लिक करके सूचनाएं अपडेट करें।`,
        label: {
          companyNamelabel: companyName,
          Notificationslabel: "सूचनाएं",
          dailyreportlabel: "रोजाना सुबह की रिपोर्ट",
          dailyeveningreportlabel: "रोजाना शाम की रिपोर्ट",
          monthendlabel: "महीने की अंतिम रिपोर्ट",
        },
        buttons: [
          { id: "checkIn", title: "चेक-इन" },
          { id: "checkOut", title: "चेक-आउट" },
          { id: "leaveRequest", title: "अवकाश विनंती" },
          { id: "support", title: "समर्थन विनंती" },
        ],
      }),
    },
    "notification-settings": {
      message: () =>
        `हमारी नवीनतम सुविधा के साथ अपने प्रबंधकीय अनुभव को बढ़ाएं - अधिसूचना संपादित करें बटन\n\nचेक इन करें: जब आपके कर्मचारी चेक-इन करें तो अधिसूचना प्राप्त करें।\nचेक आउट करें: जब आपके कर्मचारी चेक-आउट करें तो अधिसूचना प्राप्त करें।\nसुबह की रिपोर्ट: एक लाइव रिपोर्ट प्राप्त करें सुबह।\nशाम की रिपोर्ट: शाम को लाइव रिपोर्ट प्राप्त करें।`,
      buttons: [{ id: "edit-notifs", title: "सूचनाएं संपादित करें" }],
    },
    "remove-employees": {
      message: () => ({
        body: `कर्मचारी को हटाने की प्रक्रिया शुरू करने के लिए कृपया नीचे दिए गए बटन पर क्लिक करें।`,
        label: {
          title: "कर्मचारी हटाएं",
          employeesLabel: "कर्मचारी",
          companylabel: "कंपनी का नाम",
        },
      }),
    },
    "remove-branch": {
      message: () => ({
        body: `कर्मचारी को जगह से निकालने के लिए कृपया नीचे दिए गए बटन पर क्लिक करें।`,
        label: {
          title: "जगह से कर्मचारी हटाएं",
          branchLabel: "स्थानों",
          employeesLabel: "कर्मचारी",
          companylabel: "कंपनी का नाम",
        },
      }),
    },
    "live-report-templates": {
      message: () => ({
        employees: "कर्मचारी",
        onTime: "समय पर",
        late: "देर से",
        absent: "अनुपस्थित",
        onLeave: "छुट्टी पर",
        attendance: "उपस्थिति",
        employee: "कर्मचारी",
        shiftStatus: "शिफ्ट और स्थिति",
        checkIn: "चेक इन",
        checkOut: "चेक आउट",
        requiredTime: "आवश्यक समय",
        actualTime: "वास्तविक समय",
        shiftDuration: "शिफ्ट अवधि",
        leaveRequests: "अवकाश अनुरोध",
        leaveType: "अवकाश प्रकार",
        startDate: "प्रारंभ तिथि",
        endDate: "समाप्ति तिथि",
        status: "स्थिति",
        open: "खुली",
        onHold: "होल्ड पर है",
      }),
    },
    "employee-report-templates": {
      message: () => ({
        present: "उपस्थित",
        absent: "अनुपस्थित",
        leaves: "अवकाश",
        attendance: "उपस्थिति",
        date: "तारीख",
        shiftStatus: "शिफ्ट और स्थिति",
        checkIn: "चेक इन",
        checkOut: "चेक आउट",
        requiredTime: "आवश्यक समय",
        actualTime: "वास्तविक समय",
        shiftDuration: "शिफ्ट अवधि",
        leaveRequests: "अवकाश अनुरोध",
        leaveType: "अवकाश प्रकार",
        startDate: "प्रारंभ तिथि",
        endDate: "समाप्ति तिथि",
        status: "स्थिति",
      }),
    },
    "emp-attendance-templates": {
      message: () => ({
        employeeAttendenceLogs: "कर्मचारी उपस्थिति लॉग",
        totalTickets: "कुल टिकट",
        ticketOpen: "टिकट खुली",
        ticketClosed: "टिकट बंद",
        employeeAttendenceLog: "कर्मचारी उपस्थिति लॉग",
      }),
    },
    "all-emp-ticket-templates": {
      message: () => ({
        employeeTickets: "कर्मचारी टिकट्स",
        totalTickets: "कुल टिकट्स",
        ticketOpen: "टिकट खुली",
        ticketClosed: "टिकट बंद",
        ticketsOpen: "टिकट्स खुली",
        ticketsClosed: "टिकट्स बंद",
      }),
    },
    "all-emp-report-templates": {
      message: () => ({
        employeesLabel: "कर्मचारी",
        employeesInfo: "कर्मचारी जानकारी",
        employee: "कर्मचारी",
        position: "पद",
        shiftTimings: "शिफ्ट समय",
        joiningDate: "शामिल होने की तिथि",
      }),
    },
    addBranch: {
      message: () => ({
        body: `"जगह जोड़ें" बटन पर क्लिक करके जगह जोड़ें।`,
        label: {
          title: "Geo Fencing",
          heading: "Place Coordinates",
          rangelabel: "Range",
          rangeheadinglabel: "Range must be 200 meters and above",
          branchnamelabel: "Place Name",
        },
      }),
    },
    delete: {
      message: () =>
        `नमस्ते,कृपया नीचे एक विकल्प चुनें:\n1. कर्मचारियों को हटाएं: कर्मचारियों को संगठन से हटा दें.\n2. स्थान हटाएँ: कर्मचारियों को स्थान से हटाएँ`,
      buttons: [
        { id: "remove-employees", title: "कर्मचारी निकालें" },
        { id: "remove-branch", title: "स्थान से निकालें" },
      ],
    },
    dateRangeReport: {
      message: () => ({
        body: `हमने आपकी समीक्षा के लिए एक व्यापक दिनांक सीमा रिपोर्ट तैयार की है। कृपया अपनी पसंदीदा तिथि सीमा निर्दिष्ट करें, और हम तुरंत आपको जानकारी और विश्लेषण प्रदान करेंगे।`,
        label: {
          title: "दिनांक सीमा रिपोर्ट",
          startdatelabel: "प्रारंभ तिथि",
          enddatelabel: "समाप्ति तिथि",
        },
      }),
    },
    attendanceManagement: {
      message: () => ({
        body: `ऑटोवॉट उपस्थिति प्रबंधन चैट बॉट में आपका स्वागत है।`,
        label: {
          label1: "रिपोर्ट एवं अनुमोदन",
          label2: "रिपोर्ट्स",
          label3: "टीम",
          label7: "स्थान संपादित करें",
          label9: "स्थानों को हटाएं",
          label10: "एडिट शिफ्ट टाइमिंग",
          label11: "कर्मचारी हटाएं",
          labeldelete: "डिलीट विकल्प",
          labeledit: "एडिट ऑप्शन्स",
          labelbusiness: "बिजनेस सेटिंग्स",
          labelBussinessRadio: "एडिट बिजनेस सेटिंग्स",
          reportsdd: [
            {
              id: "yesterdayreport",
              title: "कल की रिपोर्ट",
            },
            {
              id: "currentmonth",
              title: "चालू महिना",
            },
            {
              id: "customdaterangepdf",
              title: "कस्टम तिथि रिपोर्ट",
            },
            {
              id: "allEmployees",
              title: "सभी कर्मचारी रिपोर्ट",
            },
          ],
          quick: [
            {
              id: "livereport",
              title: "लाइव रिपोर्ट",
            },
            {
              id: "leaveApprovals",
              title: "छुट्टी की मंजूरी",
            },
            {
              id: "attendanceCorrections",
              title: "हाजिरी सुधार",
            },
            {
              id: "supportTickets",
              title: "सहायता टिकट",
            },
            {
              id: "taskApprovals",
              title: "कार्य मंजूरी",
            },
            {
              id: "broadcast",
              title: "ब्राडकास्ट",
            },
          ],
          labelBussinessList: [
            {
              id: "editBusiness",
              title: "एडिट बिजनेस सेटिंग्स",
            },
          ],
        },
      }),
    },
    contacts: {
      message: () => `क्षमा मांगना! आप संपर्क अपलोड नहीं कर सकते.`,
    },
    contactsUpdate: {
      message: () =>
        `मुझे आपको यह बताते हुए खुशी हो रही है कि कर्मचारी विवरण सफलतापूर्वक अपडेट कर दिया गया है।`,
    },
    placeCreated: {
      message: () => `हम आपको सूचित करना चाहेंगे कि नई जगह और जियो-फेंसिंग सफलतापूर्वक बनाई गई है`,
    },
    employeeGeoFencing: {
      message: () =>
        `हम आपको सूचित करना चाहेंगे कि कर्मचारी जियो-फेंसिंग को सफलतापूर्वक अपडेट कर दिया गया है।`,
    },
    employeeRemove: {
      message: () => `हम आपको सूचित करना चाहेंगे कि कर्मचारी को संगठन से हटा दिया गया है।`,
    },
    employeeRemovePlace: {
      message: () => `हम आपको बताना चाहेंगे कि कर्मचारियों को वहां से हटा दिया गया है`,
    },
    placeDeleted: {
      message: () => `स्थान सफलतापूर्वक हटा दिया गया है.`,
    },
    broadcast: {
      message: () => ({
        body: `अपने सभी कर्मचारियों को अपना संदेश प्रसारित करें`,
        label: {
          broadcastLabel: "प्रसार संदेश",
          filesLabel: "फ़ाइलें",
          employeesLabel: "कर्मचारी",
          fileRadios: [
            {
              id: "document",
              title: "डॉक्यूमेंट",
            },
            {
              id: "image",
              title: "इमेज",
            },
            {
              id: "video",
              title: "वीडियो",
            },
          ],
        },
      }),
    },
  },
  Bengali: {
    hi: {
      message: (name) => `হ্যালো ${name}\n আমি আপনার সহায়ক উপস্থিতি বট।`,
      buttons: [
        { id: "MarkAttendance", title: "মার্ক উপস্থিতি" },
        { id: "Report", title: "রিপোর্ট" },
        { id: "Other", title: "অন্যান্য" },
      ],
    },
    MarkAttendance: {
      message: () =>
        `*উপস্থিতি চিহ্নিত করুন*\n\n- কাজের শুরুতে [IN] ক্লিক করুন।\n- কাজ শেষে [OUT] ক্লিক করুন।`,
      buttons: [
        { id: "in", title: "🟢 IN" },
        { id: "out", title: "🔴 OUT" },
      ],
    },
    in: {
      message: () => `*অবস্থান* \n📍 নির্দিষ্ট পদক্ষেপ অনুসরণ করে আপনার অবস্থান ভাগ করুন।`,
    },
    out: {
      message: () => `*অবস্থান* \n📍 নির্দিষ্ট পদক্ষেপ অনুসরণ করে আপনার অবস্থান ভাগ করুন।`,
    },
    attendanceLocation: {
      message: () => `📸 উপস্থিতির জন্য, আপনার অবস্থান দেখানো সেলফি পাঠান।`,
    },
    clickAttendanceLocation: {
      message: () => `*⚠️ সরাসরি পাঠাবেন না*। 'লোকেশন' নির্বাচন করুন।`,
    },
    locNotInRange: {
      message: () =>
        `🚫 আমরা দুঃখিত, কিন্তু আমরা এই সময়ে আপনার অবস্থান 📍 এবং উপস্থিতি ⏲️ নিবন্ধন করতে পারিনি। আপনি কোম্পানির সীমার মধ্যে নন 🚷৷ অনুগ্রহ করে কোম্পানির সীমার মধ্যে যান এবং তারপর শুরু থেকে আবার চেষ্টা করুন 🔁.👣`,
    },
    attendancePic: {
      message: () => "📸 আপনার সেলফি ফটো পাঠান 🤳।",
    },
    uploadEmployee: {
      message: () => "দয়া করে সমস্ত কর্মচারীর যোগাযোগ তথ্য আপলোড করুন।",
    },
    Report: {
      message: () => "আপনার বর্তমান মাসের বা গত মাসের রিপোর্ট ডাউনলোড করুন",
      buttons: [
        { id: "currentMonth", title: "বর্তমান মাস" },
        // { id: 'previousMonth', title: 'গত মাস' },
      ],
    },
    Other: {
      message: () => "হ্যালো! আজ আমরা কীভাবে আপনাকে সাহায্য করতে পারি?",
      buttons: [
        { id: "requestLeave", title: "ছুটির অনুরোধ" },
        { id: "support", title: "সহায়তা" },
        // { id: 'question', title: 'প্রশ্ন জিজ্ঞাসা' },
      ],
    },
    startLeaveRequest: {
      message: () =>
        "আমরা সফলভাবে উপস্থিতি ডেমো চিহ্নিতকরণ সম্পন্ন করেছি।\nপরবর্তী ডেমো হল কীভাবে আপনার কর্মচারী *ছুটির অনুরোধ করতে পারেন*",
      buttons: [{ id: "requestLeave", title: "Start Request Leave" }],
    },
    requestLeave: {
      message: () => "ছোট্ট বিরতি নিতে চান?\nকত দিনের ছুটি চান তা জানান:",
      buttons: [
        { id: "oneDay", title: "এক দিন" },
        { id: "moreThanOneDay", title: "একাধিক দিন" },
      ],
    },
    oneDay: {
      message: () => ({
        body: "নির্দিষ্ট তারিখ ও কারণ নির্বাচন করুন",
        label: {
          title: "অবকাশের অনুরোধ",
          startdatelabel: "শুরুর তারিখ",
          enddatelabel: "শেষ তারিখ",
          reasonlabel: "অবকাশের কারণ",
        },
      }),
    },
    moreThanOneDay: {
      message: () => ({
        body: "নির্দিষ্ট তারিখ ও কারণ নির্বাচন করুন",
        label: {
          title: "অবকাশের অনুরোধ",
          startdatelabel: "শুরুর তারিখ",
          enddatelabel: "শেষ তারিখ",
          reasonlabel: "অবকাশের কারণ",
        },
      }),
    },
    leaveSummary: {
      message: (
        employeeName,
        department,
        leaveType,
        startDate,
        endDate,
        reasonForLeave,
        ticketNumber,
        recipientPhone
      ) =>
        `নাম: *${employeeName}*\nবিভাগ: *${
          department ?? "-"
        }*\nছুটির ধরন: *${leaveType}*\nশুরুর তারিখ: *${startDate}*\n${
          endDate !== "Invalid Date" ? `শেষের তারিখ: *${endDate}*\n` : ""
        }কারণ: *${reasonForLeave}*\nফোন নম্বর: *${recipientPhone}*\nটিকেট নং: *${ticketNumber}*`,
    },
    support: {
      message: () => "স্বাগতম! আমরা আপনাকে সহায়তা করার জন্য এখানে।",
      buttons: [
        {
          title: `🔎 সমস্যা`,
          headers: `🔎 সমস্যা`,
          rows: [
            { id: "check-in", title: "চেক ইন", description: "চেক ইন সমস্যা" },
            { id: "check-out", title: "চেক আউট", description: "চেক আউট সমস্যা" },
            { id: "salary-issue", title: "বেতন সমস্যা", description: "বেতন সমস্যা" },
            { id: "other-issue", title: "অন্যান্য ❓", description: "অন্যান্য সমস্যা" },
          ],
        },
      ],
    },
    checkIn: {
      message: () => "আপনার মন্তব্য টাইপ করুন",
    },
    checkOut: {
      message: () => "আপনার মন্তব্য টাইপ করুন",
    },
    other_issue: {
      message: () => "আপনার মন্তব্য টাইপ করুন",
    },
    Salary_Issue: {
      message: () => "আপনার মন্তব্য টাইপ করুন",
    },
    employeeIssue: {
      message: () => "দয়া করে আপনার মন্তব্য লিখুন।",
    },
    sendIssue: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `নাম: *${name}*\nবিভাগ: *${
          department ?? "-"
        }*\nসমস্যা: *${problem}*\nমন্তব্য: *${message}*\nফোন নম্বর: *${recipientPhone}*\nটিকেট নং: *${ticketNumber}*`,
      buttons: (employeeNumber, ticketNumber) => [
        { title: "অনুমোদন", id: `issue_approve-${employeeNumber}-${ticketNumber}` },
        { title: "প্রত্যাখ্যান", id: `issue_reject-${employeeNumber}-${ticketNumber}` },
        { title: "ধারণ করা", id: `issue_hold-${employeeNumber}-${ticketNumber}` },
      ],
    },
    sendLeave: {
      message: (employeeName, leaveType, startDate, endDate, reason) =>
        `*ছাড়ের অনুরোধ বিজ্ঞপ্তি* \n👤 কর্মচারীর নাম: ${employeeName}\nছাড়ের ধরন: ${leaveType}\nশুরু করার তারিখ: *${startDate}*\n${
          endDate !== "Invalid Date" ? `শেষ তারিখ: *${endDate}*\n` : ""
        }\nকারণ: ${reason}দয়া করে পর্যালোচনা করুন এবং প্রয়োজনীয় ব্যবস্থা নিন।`,
      buttons: (employeePhone, ticketNumber) => [
        {
          id: `request_approve-${employeePhone}-${ticketNumber}`,
          title: "অনুমোদন",
        },
        {
          id: `request_reject-${employeePhone}-${ticketNumber}`,
          title: "প্রত্যাখ্যান",
        },
        {
          id: `request_hold-${employeePhone}-${ticketNumber}`,
          title: "রাখা",
        },
      ],
    },
    registerComplain: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `নাম: *${name}*\nবিভাগ: *${
          department ?? "-"
        }*\nসমস্যা: *${problem}*\nমন্তব্য: *${message}*\nফোন নম্বর: *${recipientPhone}*\nটিকেট নং: *${ticketNumber}*`,
    },
    approvals: {
      buttons: [
        { title: "ছুটি-অনুমোদন", id: "leaveApprove" },
        { title: "সক্রিয়-ইস্যুগুলি", id: "activeIssues" },
      ],
      message: () =>
        `হ্যালো, অনুগ্রহ করে নিচের অপশন নির্বাচন করুন:\n ১️⃣ ছুটি অনুমোদনের জন্য।\n ২️⃣ আপনার অনুমোদনের অপেক্ষায় থাকা সক্রিয় ইস্যুগুলি দেখতে।\nপ্রক্রিয়া অগ্রসর করতে সংশ্লিষ্ট বোতামে ক্লিক করুন!`,
    },
    leaveApprove: {
      message: () =>
        `*কর্মচারীর ছুটির রিপোর্ট করা হয়েছে*\nপ্রিয় নিয়োগকর্তা, একজন কর্মচারীর একটি ছুটির অনুরোধ রয়েছে\n *টিকিট নম্বর: RL4545* \n *নাম*: Ram \n *তারিখ*: 23/12/2023 \n *কারণ* : বিবাহ \n *প্রকার* : ছুটির অনুরোধ করুন`,
      buttons: [
        { title: "অনুমোদন", id: "request_approve" },
        { title: "প্রত্যাখ্যান", id: "request_reject" },
        { title: "ধারণ করা", id: "request_hold" },
      ],
    },
    activeIssues: {
      message: () =>
        `*কর্মচারী ইস্যু রিপোর্ট*\nপ্রিয় নিয়োগকর্তা, একজন কর্মচারীর দ্বারা রিপোর্ট করা একটি সমস্যা আছে:\n *কর্মচারীর নাম* : শ্যাম \n *ইস্যু* : বেতন \n *ইস্যু বিবরণ* : বেতন কম জমা দেওয়া হয়েছে\nদয়া করে উপযুক্ত ব্যবস্থা নিন এই উদ্বেগ মোকাবেলা করতে।`,
      buttons: [
        { title: "অনুমোদন", id: "issue_approve" },
        { title: "প্রত্যাখ্যান", id: "issue_reject" },
        { title: "ধারণ করা", id: "issue_hold" },
      ],
    },
    issue_approve: {
      message: () =>
        "স্ট্যাটাস আপডেট: অনুমোদিত\nআমরা আপনাকে জানাতে পেরে আনন্দিত যে আপনার অনুরোধ/আবেদন অনুমোদিত হয়েছে!\nআপনার ধৈর্য এবং সহযোগিতার জন্য আপনাকে ধন্যবাদ।",
    },
    issue_reject: {
      message: () =>
        "স্ট্যাটাস আপডেট: প্রত্যাখ্যাত \nআমরা আপনাকে জানাতে দুঃখিত যে আপনার অনুরোধ/আবেদন প্রত্যাখ্যান করা হয়েছে।\nআমরা আপনার বোঝার প্রশংসা করি।",
    },
    issue_hold: {
      message: () =>
        "স্ট্যাটাস আপডেট: স্থগিত রাখা \nআমরা পরিস্থিতি পর্যালোচনা এবং মূল্যায়ন করার সময় আপনার অনুরোধ/আবেদন বর্তমানে আটকে আছে।\nএই সময়ে আমরা আপনার ধৈর্যের প্রশংসা করি।",
    },
    request_approve: {
      message: () =>
        `*ত্যাগের অনুরোধ আপডেট*: অনুমোদিত\nআমরা আপনাকে জানাতে পেরে আনন্দিত যে আপনার ছুটির অনুরোধ অনুমোদিত হয়েছে!\nআপনার ধৈর্য এবং সহযোগিতার জন্য আপনাকে ধন্যবাদ।`,
    },
    request_reject: {
      message: () =>
        `*লিভ রিকোয়েস্ট আপডেট*: প্রত্যাখ্যাত \nআমরা আপনাকে জানাতে দুঃখিত যে আপনার ছুটির অনুরোধ প্রত্যাখ্যান করা হয়েছে।\nআমরা আপনার বোঝার প্রশংসা করি।`,
    },
    request_hold: {
      message: () =>
        `*লিভ রিকোয়েস্ট আপডেট*: হোল্ডে \nআমরা পরিস্থিতি পর্যালোচনা ও মূল্যায়ন করার সময় আপনার ছুটির অনুরোধ বর্তমানে আটকে আছে।\nএই সময়ে আপনার ধৈর্য্যের প্রশংসা করি।`,
    },
    addEmployee: {
      message: (employeeName, employeeNumber, timing, geofen) =>
        `যোগ করা হচ্ছে:\n*নাম*: ${employeeName}\n*নম্বর*: ${employeeNumber}\n*ধরন*: ${timing}\n*জিওফেন্সিং*: ${geofen}`,
    },
    editEmployee: {
      message: () => ({
        body: `কর্মচারী সম্পাদনা করুন' বোতামে ক্লিক করে কর্মচারী সম্পাদনা করুন এবং ফর্মটি পূরণ করুন।`,
        label: {
          title: "কর্মচারীর বিবরণ সম্পাদনা করুন",
          employeeNameLabel: "কর্মচারীর নাম",
          employeeNumberLabel: "কর্মচারী মোবাইল নম্বর",
          timingTypeLabel: "সময়ের প্রকার",
          workingHoursNote: "ফ্লেক্সিবল কাজের ঘণ্টা",
          checkInOutNote: "নির্দিষ্ট সময়: চেক ইন এবং চেক আউট",
          checkInLabel: "চেক ইন",
          checkOutLabel: "চেক আউট",
          workingHoursLabel: "কাজের ঘণ্টা",
          designationLabel: "উপাধি",
          branchLabel: "স্থান",
          joiningDateLabel: "যোগদানের তারিখ",
          dobLabel: "জন্ম তারিখ",
        },
        list: {
          timingTyperadio: [
            {
              id: "Flexible",
              title: "ফ্লেক্সিবল টাইমিং",
            },
            {
              id: "Fixed",
              title: "ফিক্সড টাইমিং",
            },
          ],
          shiftTyperadio: [
            {
              id: "day",
              title: "ডে শিফট",
            },
            {
              id: "day/night",
              title: "ডে/নাইট শিফট",
            },
          ],
          workdaysList: [
            {
              id: "0",
              title: "রবিবার",
            },
            {
              id: "1",
              title: "সোমবার",
            },
            {
              id: "2",
              title: "মঙ্গলবার",
            },
            {
              id: "3",
              title: "বুধবার",
            },
            {
              id: "4",
              title: "বৃহস্পতিবার",
            },
            {
              id: "5",
              title: "শুক্রবার",
            },
            {
              id: "6",
              title: "শনিবার",
            },
          ],
          proofList: [
            {
              id: "location",
              title: "অবস্থান",
            },
            {
              id: "image",
              title: "ছবি",
            },
            {
              id: "logs",
              title: "লগ",
            },
          ],
        },
      }),
    },
    ticketUpdate: {
      message: (ticketNumber) => `টিকেট নং: ${ticketNumber} এর স্ট্যাটাস সফলভাবে আপডেট করা হয়েছে`,
    },
    employerStart: {
      message: () =>
        "হ্যালো, দয়া করে নিম্নলিখিত পছন্দগুলির মধ্যে একটি চয়ন করুন:\n\n1️⃣. রিপোর্ট পান: একটি বিস্তারিত রিপোর্ট পেতে এই বোতামটি ক্লিক করুন।\n2️⃣. অনুমোদন: কর্মীদের অনুমোদনের যাচাই করতে বা পরিচালনা করতে এই বোতামটি ব্যবহার করুন।\n3️⃣ প্রোফাইল/সেটিংস: এখানে আপনার প্রোফাইল এবং সেটিংস পরিচালনা করুন।",
      buttons: [
        { id: "employerReports", title: "রিপোর্ট পান" },
        { id: "approvals", title: "অনুমোদন" },
        { id: "profile-settings", title: "প্রোফাইল সেটিংস" },
      ],
    },
    employerReports: {
      message: () =>
        "স্বাগত! অনুগ্রহ করে একটি বিকল্প নির্বাচন করুন:\n1. লাইভ রিপোর্ট: রিয়েল-টাইম আপডেট দেখুন।\n2. গতকালের প্রতিবেদন: গতকালের প্রতিবেদনটি অ্যাক্সেস করুন।\n3. কর্মচারী মাস্টার শীট: কর্মচারী মাস্টার শীট অ্যাক্সেস করুন.",
      buttons: [
        {
          title: "Reports",
          headers: "Reports",
          rows: [
            {
              id: "liveReport",
              title: "লাইভ রিপোর্ট",
              description: "Download Live Report",
            },
            {
              id: "yesterdayReport",
              title: "গতকালের প্রতিবেদন",
              description: "Download Yesterday Report",
            },
            {
              id: "dateRangeReport",
              title: "তারিখ পরিসীমারিপোর্ট",
              description: "Download Date Range Report",
            },
            {
              id: "emp_master_sheet",
              title: "সকল কর্মচারী দেখান",
              description: "Download Report of all your Employees",
            },
          ],
        },
      ],
    },
    employeeDemoStart: {
      buttons: [{ id: "MarkAttendance", title: "উপস্থিতি চিহ্নিত" }],
      message: () =>
        "1. *কর্মচারী ডেমো ধাপসমূহ*:\n   a. ✅ উপস্থিতি চিহ্নিত করুন\n   b. 🙋 ছুটির অনুরোধ\n   c. 🎫 একটি টিকেট উত্থাপন করুন\n   d. 📊 রিপোর্ট দেখুন\n২️⃣ *নিয়োগকর্তা ডেমো ধাপসমূহ* (কর্মচারী ডেমো ধাপগুলি সম্পন্ন করার পরে)",
    },
    "addGeo-fencing-emplyer": {
      message: () => `আপনি কি জিও-ফেন্সিং যোগ করতে চান তারপর নিচের বোতামটি চাপুন`,
      buttons: [
        { id: "yes-geofencing", title: "হ্যাঁ" },
        { id: "no-geofencing", title: "ন" },
      ],
    },
    "yes-geofencing": {
      message: () => `আপনার অফিসের বর্তমান অবস্থান শেয়ার করুন`,
    },
    "office-geo-fencing": {
      message: () => `আপনার অফিসের বর্তমান অবস্থান প্রদান করার জন্য আপনাকে ধন্যবাদ`,
    },
    "reminder-in": {
      message: () =>
        `এটি পরবর্তী 5 মিনিটের মধ্যে চেক-ইন চিহ্নিত করার জন্য একটি বন্ধুত্বপূর্ণ অনুস্মারক৷`,
    },
    "reminder-out": {
      message: () =>
        `এটি পরবর্তী 5 মিনিটের মধ্যে চেক-ইন চিহ্নিত করার জন্য একটি বন্ধুত্বপূর্ণ অনুস্মারক৷`,
    },
    employeeUploaded: {
      message: () =>
        "✅ কর্মীর প্রোফাইল সফলভাবে তৈরি হয়েছে।\n\nকর্মীর WhatsApp নম্বরে একটি আনুষ্ঠানিক বিজ্ঞপ্তি এবং উপস্থিতি শুরুর বার্তা পাঠানো হয়েছে।\n\nদয়া করে কর্মীদের দ্রুত ডেমো সম্পন্ন করে তাদের উপস্থিতি চিহ্নিত করা শুরু করতে বলুন।",
    },
    employeeDemoCompleted: {
      message: () =>
        "ডেমো সফলভাবে সম্পন্ন হয়েছে। আপনাকে এই নম্বরে প্রতিদিনের উপস্থিতি চিহ্নিত করার অনুরোধ করা হচ্ছে। আপনি যে কোনো সময় 'হাই' টাইপ করে প্রক্রিয়া শুরু করতে পারেন।",
    },
    "profile-settings": {
      message: () =>
        `*প্রোফাইল সেটিংস*\n\nনীচে একটি বিকল্প নির্বাচন করুন:\n\n1. *ব্যবসায়িক সেটিংস*:আপনার ব্যবসার পছন্দগুলি কনফিগার করুন।\n2. *বিজ্ঞপ্তি*:প্রতিদিনের ভিত্তিতে লাইভ রিপোর্টের জন্য।\n3. *সম্পাদনা/মুছুন*\n\ta. শিফট টাইমিং সম্পাদনা করুন`,
      // message: () =>
      //   `*প্রোফাইল সেটিংস*\n\nনীচে একটি বিকল্প নির্বাচন করুন:\n\n1. *ব্যবসায়িক সেটিংস*:আপনার ব্যবসার পছন্দগুলি কনফিগার করুন।\n2. *বিজ্ঞপ্তি*:প্রতিদিনের ভিত্তিতে লাইভ রিপোর্টের জন্য।\n3. *সম্পাদনা/মুছুন*\n\ta. জিও ফেন্সিং সম্পাদনা করুন\n\tb. শিফট টাইমিং সম্পাদনা করুন`,
      buttons: [
        {
          id: "business-settings",
          title: "ব্যবসার সেটিংস",
        },
        {
          id: "notification-settings",
          title: "বিজ্ঞপ্তি",
        },
        {
          id: "edit-delete",
          title: "সম্পাদনা/মুছুন",
        },
      ],
    },
    "business-settings": {
      message: () => ({
        body: `নিচের বোতামে ক্লিক করে আপনার ব্যবসার তথ্য আপডেট করুন। ধন্যবাদ!`,
        label: {
          title: "ব্যবসা সেটিংস সম্পাদনা করুন",
          employerNamelabel: "কর্মচারীর নাম",
          employernolabel: "কর্মচারী নম্বর",
          bufferTimelabel: "বাফার সময়",
          companyNamelabel: "কোম্পানির নাম",
          monthlySickLeavelabel: "মাসিক অসুস্থ ছুটি",
          casualLeavelabel: "ক্যাজুয়াল ছুটি",
          annualLeavelabel: "বার্ষিক ছুটি",
          maternityLeaveAllowedlabel: "মেটার্নিটি ছুটি অনুমোদিত",
          paternityLeaveAllowedlabel: "প্যাটার্নিটি ছুটি অনুমোদিত",
          unpaidLeavePolicylabel: "অমুল্য ছুটি নীতি",
          leaveEncashmentlabel: "ছুটি এনক্যাশমেন্ট",
          consequencesUnapprovedLeavelabel: "অননুমোদিত ছুটির ফলাফল",
          halfDayPolicylabel: "অর্ধদিনের নীতি",
          Languagelabel: "ভাষা",
          carryForwardLimitlabel: "পূর্ববর্তী সীমা",
        },
      }),
    },
    "edit-delete": {
      message: () =>
        `আপনি সম্পাদনা বা মুছে ফেলার বিকল্প নির্বাচন করেছেন। অনুগ্রহ করে নিম্নলিখিত বৈশিষ্ট্যগুলি থেকে চয়ন করুন\n\n1. শিফটের সময় সম্পাদনা করুন: কোম্পানির সময়ের উপর ভিত্তি করে কর্মচারীর সময়সূচী সামঞ্জস্য করুন।\n2.জিও ফেন্সিং সম্পাদনা করুন: ভৌগলিক সীমানা বা সীমাবদ্ধতা সংশোধন বা আপডেট করুন।\n3.মুছুন: এই বিকল্পটি আপনাকে কর্মচারীদের সাথে সম্পর্কিত যেকোন ডেটা মুছে ফেলতে দেয়`,

      buttons: [
        { id: "edit-timings", title: "শিফট টাইমিং এডিট করু" },
        { id: "edit-geo-fencing", title: "জিও ফেন্সিং এডিট করু" },
        { id: "delete", title: "মুছে ফেলা" },
      ],
    },
    "edit-timings": {
      message: () => ({
        body: `শিফ্ট টাইমিং সম্পাদনা করতে নীচের বোতামটি অ্যাক্সেস করে দয়া করে কর্মচারীর সময়সূচী পরিচালনা এবং অপ্টিমাইজ করুন। এই বিষয়ে আপনার মনোযোগ অত্যন্ত প্রশংসা করা হয়. ধন্যবাদ.`,
        label: {
          title: "শিফট সময় সম্পাদনা করুন",
          timingTypeLabel: "সময় প্রকার",
          checkInLabel: "চেক ইন",
          checkOutLabel: "চেক আউট",
          workingHoursLabel: "কাজের ঘণ্টা",
          branchLabel: "শাখা",
          employeesLabel: "কর্মচারী",
          shiftTyperadio: [
            {
              id: "day",
              title: "ডে শিফট",
            },
            {
              id: "day/night",
              title: "ডে/নাইট শিফট",
            },
          ],
          timingTyperadio: [
            {
              id: "Flexible",
              title: "ফ্লেক্সিবল টাইমিং",
            },
            {
              id: "Fixed",
              title: "ফিক্সড টাইমিং",
            },
          ],
          workdaysList: [
            {
              id: "0",
              title: "রবিবার",
            },
            {
              id: "1",
              title: "সোমবার",
            },
            {
              id: "2",
              title: "মঙ্গলবার",
            },
            {
              id: "3",
              title: "বুধবার",
            },
            {
              id: "4",
              title: "বৃহস্পতিবার",
            },
            {
              id: "5",
              title: "শুক্রবার",
            },
            {
              id: "6",
              title: "শনিবার",
            },
          ],
        },
      }),
    },
    "edit-geo-fencing": {
      message: () =>
        `জিও ফেন্সিং সেটিংস অ্যাক্সেস এবং সম্পাদনা করতে নীচের বোতামটি ব্যবহার করে অনুগ্রহ করে কর্মচারী অবস্থানগুলির উপর সুনির্দিষ্ট নিয়ন্ত্রণ নিশ্চিত করুন৷ এই টাস্ক আপনার মনোযোগ মূল্যবান. ধন্যবাদ`,
    },
    link_employee: {
      message: () => ({
        body: `জায়গায় নতুন স্থান এবং কর্মচারী যোগ করুন`,
        label: {
          title: "জিও ফেন্সিং",
          heading: "স্থান সমন্বয়",
          rangelabel: "পরিসীমা",
          rangeheadinglabel: "পরিসীমা 50 মিটার এবং উপরে হতে হবে",
          employeelabel: "কর্মচারীকে স্থান সংযুক্ত করুন:",
          branchnamelabel: "স্থান নাম",
        },
      }),
    },
    edit_geolocation: {
      message: () => ({
        body: `নীচের বোতামে ক্লিক করে কর্মচারীদের জিও ফেন্সিং সম্পাদনা করুন`,
        label: {
          title: "জিও লোকেশন সম্পাদনা",
          workingHoursLabel: "কার্যক্ষমতা ঘণ্টা",
          branchLabel: "কর্মচারী",
          timingTypeLabel: "সময় প্রকার",
          placelabel: "স্থান",
        },
      }),
    },
    "edit-notifs": {
      message: (companyName) => ({
        body: `আপডেট বোতামে ক্লিক করে বিজ্ঞপ্তি আপডেট করুন।`,
        label: {
          companyNamelabel: companyName,
          Notificationslabel: "বিজ্ঞপ্তিসমূহ",
          dailyreportlabel: "দৈনিক সকালের রিপোর্ট",
          dailyeveningreportlabel: "দৈনিক সায়ের রিপোর্ট",
          monthendlabel: "মাসের শেষে রিপোর্ট",
        },
        buttons: [
          { id: "checkIn", title: "চেক-ইন" },
          { id: "checkOut", title: "চেক-আউট" },
          { id: "leaveRequest", title: "বিদায় অনুরোধ" },
          { id: "support", title: "সমর্থন অনুরোধ" },
        ],
      }),
    },
    "notification-settings": {
      message: () =>
        `আমাদের সর্বশেষ বৈশিষ্ট্য - সম্পাদনা বিজ্ঞপ্তি বোতামের সাথে আপনার পরিচালনার অভিজ্ঞতা উন্নত করুন\n\nচেক ইন: আপনার কর্মীরা চেক-ইন করলে বিজ্ঞপ্তি পান।\nচেক আউট: আপনার কর্মীরা চেক-আউট করার সময় বিজ্ঞপ্তি পান। সকাল।\nসন্ধ্যার রিপোর্ট: সন্ধ্যায় একটি লাইভ রিপোর্ট পান।`,
      buttons: [{ id: "edit-notifs", title: "বিজ্ঞপ্তি সম্পাদনা" }],
    },
    "remove-employees": {
      message: () => ({
        body: `কর্মচারী অপসারণ প্রক্রিয়া শুরু করতে দয়া করে নীচের বোতামে ক্লিক করুন।`,
        label: {
          title: "কর্মচারী সরাও",
          employeesLabel: "কর্মচারীগণ",
          companylabel: "কোম্পানির নাম",
        },
      }),
    },
    "remove-branch": {
      message: () => ({
        body: `অবস্থান থেকে কর্মচারী অপসারণ শুরু করতে নীচের বোতামে ক্লিক করুন.`,
        label: {
          title: "জায়গা থেকে কর্মচারী সরান",
          branchLabel: "জায়গা",
          employeesLabel: "কর্মচারীগণ",
          companylabel: "কোম্পানির নাম",
        },
      }),
    },
    "live-report-templates": {
      message: () => ({
        employees: "কর্মচারী",
        onTime: "সঠিক সময়ে",
        late: "দেরি",
        absent: "অনুপস্থিত",
        onLeave: "ছুটিতে",
        attendance: "উপস্থিতি",
        employee: "কর্মচারী",
        shiftStatus: "শিফট এবং অবস্থা",
        checkIn: "চেক ইন",
        checkOut: "চেক আউট",
        requiredTime: "প্রয়োজনীয় সময়",
        actualTime: "বাস্তব সময়",
        shiftDuration: "শিফট সময়কাল",
        leaveRequests: "ছুটি অনুরোধ",
        leaveType: "ছুটির ধরণ",
        startDate: "শুরুর তারিখ",
        endDate: "শেষ তারিখ",
        status: "অবস্থা",
      }),
    },
    "employee-report-templates": {
      message: () => ({
        present: "উপস্থিত",
        absent: "অনুপস্থিত",
        leaves: "ছুটি",
        attendance: "হাজিরা",
        date: "তারিখ",
        shiftStatus: "শিফট এবং স্থিতি",
        checkIn: "চেক ইন",
        checkOut: "চেক আউট",
        requiredTime: "প্রয়োজনীয় সময়",
        actualTime: "বাস্তব সময়",
        shiftDuration: "শিফট সময়কাল",
        leaveRequests: "ছুটি অনুরোধ",
        leaveType: "ছুটির ধরণ",
        startDate: "শুরুর তারিখ",
        endDate: "শেষ তারিখ",
        status: "স্থিতি",
      }),
    },
    "emp-attendance-templates": {
      message: () => ({
        employeeAttendenceLogs: "কর্মচারী উপস্থিতি লগ",
        totalTickets: "মোট টিকেট",
        ticketOpen: "টিকেট খোলা",
        ticketClosed: "টিকেট বন্ধ",
        employeeAttendenceLog: "কর্মচারী উপস্থিতি লগ",
      }),
    },
    "all-emp-ticket-templates": {
      message: () => ({
        employeeTickets: "কর্মচারী টিকেটস",
        totalTickets: "মোট টিকেটস",
        ticketOpen: "টিকেট খোলা",
        ticketClosed: "টিকেট বন্ধ",
        ticketsOpen: "টিকেটস খোলা",
        ticketsClosed: "টিকেটস বন্ধ",
      }),
    },
    "all-emp-report-templates": {
      message: () => ({
        employeesLabel: "কর্মচারীগণ",
        employeesInfo: "কর্মচারীগণের তথ্য",
        employee: "কর্মচারী",
        position: "পদ",
        shiftTimings: "শিফট সময়",
        joiningDate: "যোগদানের তারিখ",
      }),
    },
    addBranch: {
      message: () => ({
        body: `"অ্যাড প্লেস" বোতামে ক্লিক করে স্থান যোগ করুন।`,
        label: {
          title: "Geo Fencing",
          heading: "Place Coordinates",
          rangelabel: "Range",
          rangeheadinglabel: "Range must be 200 meters and above",
          branchnamelabel: "Place Name",
        },
      }),
    },
    delete: {
      message: () =>
        `হ্যালো, অনুগ্রহ করে নীচের একটি বিকল্প নির্বাচন করুন:\n1. কর্মচারীদের সরান: প্রতিষ্ঠান থেকে কর্মচারীদের সরান।\n2. স্থান সরান: স্থান থেকে কর্মচারীদের সরান`,
      buttons: [
        { id: "remove-employees", title: "কর্মচারী বিহিন করা " },
        { id: "remove-branch", title: "স্থান সরান" },
      ],
    },
    dateRangeReport: {
      message: () => ({
        body: `আমরা আপনার পর্যালোচনার জন্য একটি বিস্তৃত তারিখ পরিসর প্রতিবেদন প্রস্তুত করেছি। অনুগ্রহ করে আপনার পছন্দের তারিখের সীমা নির্দিষ্ট করুন, এবং আমরা অবিলম্বে আপনাকে অন্তর্দৃষ্টি এবং বিশ্লেষণ প্রদান করব।`,
        label: {
          title: "তারিখ ব্যাপ্তি রিপোর্ট",
          startdatelabel: "শুরুর তারিখ",
          enddatelabel: "শেষ তারিখ",
        },
      }),
    },
    attendanceManagement: {
      message: () => ({
        body: `স্বয়ংক্রিয়ভাবে উপস্থিতি স্বাগতম ব্যবস্থাপনা চ্যাট বট`,
        label: {
          label1: "রিপোর্ট এবং অনুমোদন",
          label2: "রিপোর্ট",
          label3: "দল",
          label7: "স্থান সম্পাদনা",
          label9: "স্থান মুছুন",
          label10: "শিফট সময় সম্পাদনা",
          label11: "কর্মী মুছুন",
          labeldelete: "মুছুন বিকল্প",
          labeledit: "সম্পাদনা বিকল্প",
          labelbusiness: "ব্যবসা সেটিংস",
          labelBussinessRadio: "ব্যবসা সেটিংস সম্পাদ",
          reportsdd: [
            {
              id: "yesterdayreport",
              title: "গতকালের রিপোর্ট",
            },
            {
              id: "currentmonth",
              title: "বর্তমান মাস",
            },
            {
              id: "customdaterangepdf",
              title: "তারিখ রিপোর্ট (PDF)",
            },
            {
              id: "allEmployees",
              title: "সকল কর্মচারীর রিপোর্ট",
            },
          ],
          quick: [
            {
              id: "livereport",
              title: "লাইভ রিপোর্ট",
            },
            {
              id: "leaveApprovals",
              title: "অনুমোদন ছুটি",
            },
            {
              id: "attendanceCorrections",
              title: "উপস্থিতি সংশোধন",
            },
            {
              id: "supportTickets",
              title: "সাপোর্ট টিকেট",
            },
            {
              id: "taskApprovals",
              title: "কাজের অনুমোদন",
            },
            {
              id: "broadcast",
              title: "ব্রডকাস্ট",
            },
          ],
          labelBussinessList: [
            {
              id: "editBusiness",
              title: "Edit Business Settings",
            },
          ],
        },
      }),
    },
    contacts: {
      message: () => `দুঃখিত! আপনি পরিচিতি আপলোড করতে পারবেন না.`,
    },
    contactsUpdate: {
      message: () => `আমি আপনাকে জানাতে পেরে আনন্দিত যে কর্মচারীর বিবরণ সফলভাবে আপডেট করা হয়েছে।`,
    },
    placeCreated: {
      message: () =>
        `আমরা আপনাকে জানাতে চাই যে নতুন জায়গা এবং জিও-ফেন্সিং সফলভাবে তৈরি করা হয়েছে`,
    },
    employeeGeoFencing: {
      message: () => `আমরা আপনাকে জানাতে চাই যে কর্মচারী জিও-ফেন্সিং সফলভাবে আপডেট করা হয়েছে।`,
    },
    employeeRemove: {
      message: () => `আমরা আপনাকে জানাতে চাই যে কর্মচারীকে সংস্থা থেকে সরিয়ে দেওয়া হয়েছে।`,
    },
    employeeRemovePlace: {
      message: () => `আমরা আপনাকে জানাতে চাই যে কর্মচারীদের স্থান থেকে সরিয়ে দেওয়া হয়েছে`,
    },
    placeDeleted: {
      message: () => `স্থান সফলভাবে মুছে ফেলা হয়েছে.`,
    },
    broadcast: {
      message: () => ({
        body: `আপনার সমস্ত কর্মচারীদের কাছে আপনার বার্তা সম্প্রচার করুন`,
        label: {
          broadcastLabel: "ব্রডকাস্ট মেসেজ",
          filesLabel: "ফাইল",
          employeesLabel: "কর্মচারী",
          fileRadios: [
            {
              id: "document",
              title: "ডকুমেন্ট",
            },
            {
              id: "image",
              title: "চিত্র",
            },
            {
              id: "video",
              title: "ভিডিও",
            },
          ],
        },
      }),
    },
  },
  Telugu: {
    hi: {
      message: (name) =>
        `హలో ${name}\n నేను మీ స్నేహపూర్వక హాజరు బాట్, మీకు సహాయం చేయడానికి ఇక్కడ ఉన్నాను.`,
      buttons: [
        {
          id: "MarkAttendance",
          title: "హాజరు గుర్తించు",
        },
        {
          id: "Report",
          title: "నివేదించు",
        },
        {
          id: "Other",
          title: "ఇతరత్రా",
        },
      ],
    },
    MarkAttendance: {
      message: () =>
        "*హాజరు గుర్తించు*\n\n- మీ పనిదినాన్ని ప్రారంభించడానికి [IN] పై క్లిక్ చేయండి.\n- మీ పనిదినం ముగిసినట్లు [OUT] పై క్లిక్ చేయండి.",
      buttons: [
        { id: "in", title: "🟢 IN" },
        { id: "out", title: "🔴 OUT" },
      ],
    },
    in: {
      message: () =>
        "*స్థానం* \n📍 ఈ క్రింది అడుగులు అనుసరించి మీ ప్రస్తుత స్థానాన్ని పంచుకోండి:\n1. 📩 ఈ సందేశం ఎంచుకోండి.\n2. 💬 'ప్రతిస్పందన' పై క్లిక్ చేయండి.\n3. 📎 జతపరచు లేదా క్లిప్ చిహ్నాన్ని నొక్కండి.\n4. 📍'స్థానం' ఎంచుకోండి.\n5. ✅ 'మీ ప్రస్తుత స్థానం పంపండి' ఎంచుకోండి.",
    },
    out: {
      message: () =>
        "*స్థానం* \n📍 ఈ క్రింది అడుగులు అనుసరించి మీ ప్రస్తుత స్థానాన్ని పంచుకోండి:\n1. 📩 ఈ సందేశం ఎంచుకోండి.\n2. 💬 'ప్రతిస్పందన' పై క్లిక్ చేయండి.\n3. 📎 జతపరచు లేదా క్లిప్ చిహ్నాన్ని నొక్కండి.\n4. 📍'స్థానం' ఎంచుకోండి.\n5. ✅ 'మీ ప్రస్తుత స్థానం పంపండి' ఎంచుకోండి.",
    },
    attendanceLocation: {
      message: () => "📸 హాజరు కోసం, మీ స్థానం నేపథ్యంలో ఉన్న మీ సెల్ఫీని పంపండి.",
    },
    clickAttendanceLocation: {
      message: () =>
        "*⚠️ నేరుగా పంపవద్దు* . మొదట *ప్రతిస్పందన* ఇచ్చి, తరువాత 'మీ ప్రస్తుత స్థానం పంపండి' ఎంచుకోండి.\n📍 ఈ క్రింది అడుగులు అనుసరించి మీ ప్రస్తుత స్థానాన్ని పంచుకోండి:\n1. 📩 ఈ సందేశం ఎంచుకోండి.\n2. 💬 'ప్రతిస్పందన' పై క్లిక్ చేయండి.\n3. 📎 జతపరచు లేదా క్లిప్ చిహ్నాన్ని నొక్కండి.\n4. 📍 'స్థానం' ఎంచుకోండి.",
    },
    locNotInRange: {
      message: () =>
        `🚫 మమ్మల్ని క్షమించండి, కానీ మేము ఈ సమయంలో మీ స్థానాన్ని 📍 మరియు హాజరు ⏲️ నమోదు చేయలేకపోయాము. మీరు కంపెనీ పరిధిలో లేరు 🚷. దయచేసి కంపెనీ పరిధిలోకి వెళ్లి, ప్రారంభం నుండి మళ్లీ ప్రయత్నించండి 🔁.👣`,
    },
    attendancePic: {
      message: () => "📸 మీ సెల్ఫీ ఫొటో పంపండి 🤳.",
    },
    Report: {
      message: () =>
        "మీ ప్రస్తుత నెల నివేదనను అనుమతించుకోండి లేదా మునుపు నెల నివేదనను డౌన్లోడ్ చేయండి.",
      buttons: [
        {
          id: "currentMonth",
          title: "ప్రస్తుత నెల",
        },
        // {
        //   id: 'previousMonth',
        //   title: 'మునుపు నెల',
        // },
      ],
    },
    uploadEmployee: {
      message: () => "దయచేసి అన్ని ఉద్యోగస్థుల సంప్రదించండి.",
    },
    Other: {
      message: () => "హలో! మేము మీకు ఎలా సహాయం చేయగలము? దయచేసి క్రింది ఎంపికల నుండి ఎంచుకోండి.",
      buttons: [
        {
          id: "requestLeave",
          title: "అవకాశం అభ్యర్థించండి",
        },
        {
          id: "support",
          title: "మద్దతు",
        },
        // {
        //   id: 'question',
        //   title: 'ప్రశ్నించండి',
        // },
      ],
    },
    startLeaveRequest: {
      message: () =>
        "మేము హాజరు డెమోను గుర్తించడాన్ని విజయవంతంగా పూర్తి చేసాము.\nతదుపరి డెమో మీ ఉద్యోగి *సెలవును అభ్యర్థించవచ్చు*",
      buttons: [{ id: "requestLeave", title: "Start Request Leave" }],
    },
    requestLeave: {
      message: () =>
        "ఒక సణ్ణ విరామం తీసుకోకున్నారా? దయచేసి మేము మీకు ఎన్నో రోజులు అభ్యర్థించడానికి మీరు ఎంచుకోండి:",
      buttons: [
        { id: "oneDay", title: "ఒక రోజు" },
        { id: "moreThanOneDay", title: "ఒక రోజుకు కనుక మరింత" },
      ],
    },
    oneDay: {
      message: () => ({
        body: "దయచేసి తేదీ మరియు కారణాన్ని పొందడానికి దగ్గరగా ఉంచండి",
        label: {
          title: "అవకాశం అభ్యర్థన",
          startdatelabel: "ప్రారంభం తేదీ",
          enddatelabel: "అంతం తేదీ",
          reasonlabel: "అవకాశం కారణం",
        },
      }),
    },
    moreThanOneDay: {
      message: () => ({
        body: "దయచేసి తేదీ మరియు కారణాన్ని పొందడానికి దగ్గరగా ఉంచండి",
        label: {
          title: "అవకాశం అభ్యర్థన",
          startdatelabel: "ప్రారంభం తేదీ",
          enddatelabel: "అంతం తేదీ",
          reasonlabel: "అవకాశం కారణం",
        },
      }),
    },
    leaveSummary: {
      message: (
        employeeName,
        department,
        leaveType,
        startDate,
        endDate,
        reasonForLeave,
        ticketNumber,
        recipientPhone
      ) =>
        `పేరు: *${employeeName}*\nశాఖ: *${
          department ?? "-"
        }* \nకోసం: *అవకాశం అభ్యర్థించండి*\nఅవకాశం రకం: *${leaveType}*\nప్రారంభ తేదీ: *${startDate}*\n${
          endDate !== "చెలాని తేదీ" ? `ముగింపు తేదీ: *${endDate}*\n` : ""
        }కారణం: *${reasonForLeave}*\nసంఖ్య : *${recipientPhone}* \nటికెట్ సంఖ్య : *${ticketNumber}*`,
    },
    support: {
      message: () =>
        "స్వాగతం! మేము మీకు సహాయం చేయగలము. దయచేసి మీరు ఏ సమస్యలు తప్పక సెలవులో చూడండి:",
      buttons: [
        {
          title: `🔎 సమస్యలు`,
          headers: `🔎 సమస్యలు`,
          rows: [
            {
              id: "check-in",
              title: "చెక్ ఇన్",
              description: "చెక్ ఇన్ సమస్య",
            },
            {
              id: "check-out",
              title: "చెక్ ఆట్",
              description: "చెక్ ఆట్ సమస్య",
            },
            {
              id: "salary-issue",
              title: "జీతం సమస్య",
              description: "జీతం సమస్య",
            },
            {
              id: "other-issue",
              title: "ఇతర ❓",
              description: "ఇతర సమస్య",
            },
          ],
        },
      ],
    },
    checkIn: {
      message: () => "దయచేసి మీ వ్యాఖ్యను టైప్ చేయండి",
    },
    checkOut: {
      message: () => "దయచేసి మీ వ్యాఖ్యను టైప్ చేయండి",
    },
    other_issue: {
      message: () => "దయచేసి మీ వ్యాఖ్యను టైప్ చేయండి",
    },
    Salary_Issue: {
      message: () => "దయచేసి మీ వ్యాఖ్యను టైప్ చేయండి",
    },
    employeeIssue: {
      message: () => "దయచేసి మీ లక్ష్యాన్ని టైప్ చేయండి.",
    },
    sendIssue: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `పేరు: *${name}*\nశాఖ: *${
          department ?? "-"
        }*\nకోసం: *మద్దతు*\nసమస్య: *${problem}*\nటిప్పణి: *${message}*\nసంఖ్య : *${recipientPhone}*\nటికెట్ సంఖ్య : *${ticketNumber}*`,
      buttons: (employeeNumber, ticketNumber) => [
        { title: "ఆమోదించడానికి", id: `issue_approve-${employeeNumber}-${ticketNumber}` },
        { title: "తిరస్కరించు", id: `issue_reject-${employeeNumber}-${ticketNumber}` },
        { title: "పట్టుకోండి", id: `issue_hold-${employeeNumber}-${ticketNumber}` },
      ],
    },
    sendLeave: {
      message: (employeeName, leaveType, startDate, endDate, reason) =>
        `*లీవ్ రిక్వెస్ట్ నోటిఫికేషన్* \n👤 ఉద్యోగి పేరు: ${employeeName}\nలీవ్ రకం: ${leaveType}\nప్రారంభ తేదీ: *${startDate}*\n${
          endDate !== "Invalid Date" ? `ముగింపు తేదీ: *${endDate}*\n` : ""
        }\nకారణం: ${reason}దయచేసి సమీక్షించండి మరియు అవసరమైన చర్య తీసుకోండి.`,
      buttons: (employeePhone, ticketNumber) => [
        {
          id: `request_approve-${employeePhone}-${ticketNumber}`,
          title: "ఆమోదించడానికి",
        },
        {
          id: `request_reject-${employeePhone}-${ticketNumber}`,
          title: "తిరస్కరించండి",
        },
        {
          id: `request_hold-${employeePhone}-${ticketNumber}`,
          title: "పట్టుకోండి",
        },
      ],
    },
    registerComplain: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `పేరు: *${name}*\nశాఖ: *${
          department ?? "-"
        }*\nకోసం: *మద్దతు*\nసమస్య: *${problem}*\nటిప్పణి: *${message}*\nసంఖ్య : *${recipientPhone}*\nటికెట్ సంఖ్య : *${ticketNumber}*`,
    },
    approvals: {
      buttons: [
        { title: "అవకాశం-అనుమతి", id: "leaveApprove" },
        { title: "కార్యాపరాలు-అనుమతి", id: "activeIssues" },
      ],
      message: () =>
        `హలో, దయచేసి దిగువన ఒక ఎంపికను ఎంచుకోండి:\n 1️⃣ లీవ్‌లను ఆమోదించడానికి.\n 2️⃣ మీ ఆమోదం కోసం వేచి ఉన్న సక్రియ సమస్యలను వీక్షించడానికి.\nకొనసాగించడానికి సంబంధిత బటన్‌పై క్లిక్ చేయండి!`,
    },
    leaveApprove: {
      message: () =>
        `*ఉద్యోగి సెలవు నివేదించబడింది*\nప్రియమైన యజమాని, ఒక ఉద్యోగి ద్వారా సెలవు అభ్యర్థన ఉంది\n *టికెట్ నంబర్: RL4545* \n *పేరు*: రామ్ \n *తేదీలు*: 23/12/2023 \n *కారణం* : వివాహ \n *రకం* : సెలవు అభ్యర్థన`,
      buttons: [
        { title: "ఆమోదించడానికి", id: "request_approve" },
        { title: "తిరస్కరించు", id: "request_reject" },
        { title: "పట్టుకోండి", id: "request_hold" },
      ],
    },
    activeIssues: {
      message: () =>
        `*ఉద్యోగి ఇష్యూ రిపోర్ట్*\nప్రియమైన యజమాని, ఒక ఉద్యోగి ద్వారా ఒక సమస్య నివేదించబడింది:\n *ఉద్యోగి పేరు* : షామ్ \n *సమస్య* : జీతం \n *సమస్య వివరణ* : జీతం తక్కువ జమ చేయబడింది\nదయచేసి తగిన చర్య తీసుకోండి ఈ ఆందోళనను పరిష్కరించడానికి.`,
      buttons: [
        { title: "ఆమోదించడానికి", id: "issue_approve" },
        { title: "తిరస్కరించు", id: "issue_reject" },
        { title: "పట్టుకోండి", id: "issue_hold" },
      ],
    },
    issue_approve: {
      message: () =>
        "స్థితి అప్‌డేట్: ఆమోదించబడింది\nమీ అభ్యర్థన/అప్లికేషన్ ఆమోదించబడిందని మీకు తెలియజేయడానికి మేము సంతోషిస్తున్నాము!\nమీ సహనానికి మరియు సహకారానికి ధన్యవాదాలు.",
    },
    issue_reject: {
      message: () =>
        "స్థితి అప్‌డేట్: తిరస్కరించబడింది \nమీ అభ్యర్థన/అప్లికేషన్ తిరస్కరించబడిందని మీకు తెలియజేయడానికి మేము చింతిస్తున్నాము.\nమీ అవగాహనను మేము అభినందిస్తున్నాము.",
    },
    issue_hold: {
      message: () =>
        "స్టేటస్ అప్‌డేట్: హోల్డ్‌లో ఉంది \nమేము పరిస్థితిని సమీక్షించి, అంచనా వేసేటప్పుడు మీ అభ్యర్థన/అప్లికేషన్ ప్రస్తుతం హోల్డ్‌లో ఉంది.\nఈ సమయంలో మీ సహనానికి మేము అభినందిస్తున్నాము.",
    },
    request_approve: {
      message: () =>
        `*లివ్ రిక్వెస్ట్ అప్‌డేట్*: హోల్డ్‌లో ఉంది \nమేము పరిస్థితిని సమీక్షించి, అంచనా వేసే సమయంలో మీ సెలవు అభ్యర్థన ప్రస్తుతం హోల్డ్‌లో ఉంది.\nఈ సమయంలో మీ సహనాన్ని మేము అభినందిస్తున్నాము.`,
    },
    request_reject: {
      message: () =>
        `*లీవ్ రిక్వెస్ట్ అప్‌డేట్*: తిరస్కరించబడింది \nమీ సెలవు అభ్యర్థన తిరస్కరించబడిందని మీకు తెలియజేయడానికి మేము చింతిస్తున్నాము.\nమీ అవగాహనను మేము అభినందిస్తున్నాము.`,
    },
    request_hold: {
      message: () =>
        `*లివ్ రిక్వెస్ట్ అప్‌డేట్*: హోల్డ్‌లో ఉంది \nమేము పరిస్థితిని సమీక్షించి, అంచనా వేసే సమయంలో మీ సెలవు అభ్యర్థన ప్రస్తుతం హోల్డ్‌లో ఉంది.\nఈ సమయంలో మీ సహనాన్ని మేము అభినందిస్తున్నాము.`,
    },
    addEmployee: {
      message: (
        employeeName,
        employeeNumber,
        timing,
        geofen
      ) => `జోడించినది:\n*పేరు*: ${employeeName}\n*నెంబర్*: ${employeeNumber}\n*రకం*: ${timing}\n*జియోఫెన్సింగ్*: ${geofen}
      `,
    },
    editEmployee: {
      message: () => ({
        body: `ఎడిట్ ఎంప్లాయీ బటన్‌ను క్లిక్ చేసి, ఫారమ్‌ను పూరించడం ద్వారా ఉద్యోగిని సవరించండి.`,
        label: {
          title: "ఉద్యోగి వివరాలను సవరించండి",
          employeeNameLabel: "ఉద్యోగి పేరు",
          employeeNumberLabel: "ఉద్యోగి మొబైల్ నంబర్",
          timingTypeLabel: "సమయ రకం",
          workingHoursNote: "స్వయంచాలక పని గంటలు",
          checkInOutNote: "నిర్ధారిత సమయం: చెక్-ఇన్ & చెక్-ఔట్",
          checkInLabel: "చెక్-ఇన్",
          checkOutLabel: "చెక్-ఔట్",
          workingHoursLabel: "పనిచేసే అవకాశం",
          designationLabel: "అవకాశం",
          branchLabel: "స్థలం",
          joiningDateLabel: "చేరికలు తేదీ",
          dobLabel: "పుట్టిన తేదీ",
        },
        list: {
          timingTyperadio: [
            {
              id: "Flexible",
              title: "స్థాయి సమయం",
            },
            {
              id: "Fixed",
              title: "నిర్ధారిత సమయం",
            },
          ],
          shiftTyperadio: [
            {
              id: "day",
              title: "డే షిఫ్ట్",
            },
            {
              id: "day/night",
              title: "డే/నైట్ షిఫ్ట్",
            },
          ],
          workdaysList: [
            {
              id: "0",
              title: "ఆదివారం",
            },
            {
              id: "1",
              title: "సోమవారం",
            },
            {
              id: "2",
              title: "మంగళవారం",
            },
            {
              id: "3",
              title: "బుధవారం",
            },
            {
              id: "4",
              title: "గురువారం",
            },
            {
              id: "5",
              title: "శుక్రవారం",
            },
            {
              id: "6",
              title: "శనివారం",
            },
          ],
          proofList: [
            {
              id: "location",
              title: "స్థానం",
            },
            {
              id: "image",
              title: "ఫోటో",
            },
            {
              id: "logs",
              title: "లాగ్స్",
            },
          ],
        },
      }),
    },
    ticketUpdate: {
      message: (ticketNumber) =>
        `టికెట్ నెం: ${ticketNumber} యొక్క స్థితి విజయవంతమైనదిగా నవీకరించబడింది`,
    },
    employerStart: {
      message: () =>
        `హలో, దయచేసి కింది ఎంపికల నుండి ఒక ఎంపికను ఎంచుకోండి:\n\n1️⃣. నివేదిక పొందండి: వివరణాత్మక నివేదికను స్వీకరించడానికి ఈ బటన్‌ను క్లిక్ చేయండి..\n2️⃣. ఆమోదాలు: ఉద్యోగి సెలవు ఆమోదాలను తనిఖీ చేయాలా లేదా నిర్వహించాలా? నావిగేట్ చేయడానికి ఈ బటన్‌ని ఉపయోగించండి.\n3️⃣. ప్రొఫైల్/సెట్టింగ్‌లు: మీ ప్రొఫైల్ మరియు సెట్టింగ్‌లను ఇక్కడ నిర్వహించండి.`,
      buttons: [
        { id: "employerReports", title: "పొందు-నివేదిక" },
        { id: "approvals", title: "ఆప్రోవల్స్" },
        { id: "profile-settings", title: "ప్రొఫైల్ సెట్టింగ్‌ల" },
      ],
    },
    employerReports: {
      message: () =>
        "స్వాగతం! దయచేసి ఒక ఎంపికను ఎంచుకోండి:\n1. ప్రత్యక్ష నివేదిక: నిజ-సమయ నవీకరణలను వీక్షించండి.\n2. నిన్నటి నివేదిక: నిన్నటి నివేదికను యాక్సెస్ చేయండి.\n3. ఉద్యోగి మాస్టర్ షీట్: ఉద్యోగి మాస్టర్ షీట్‌ని యాక్సెస్ చేయండి.",
      // buttons: [
      //   {
      //     id: "liveReport",
      //   },
      //   {
      //     id: "yesterdayReport",
      //   },
      //   {
      //     id: "emp_master_sheet",
      //   },
      // ],
      buttons: [
        {
          title: "Reports",
          headers: "Reports",
          rows: [
            {
              id: "liveReport",
              title: "లైవ్ రిపోర్ట్",
              description: "Download Live Report",
            },
            {
              id: "yesterdayReport",
              title: "నిన్నటి నివేదిక",
              description: "Download Yesterday Report",
            },
            {
              id: "dateRangeReport",
              title: "తేదీ పరిధి నివేదిక",
              description: "Download Date Range Report",
            },
            {
              id: "emp_master_sheet",
              title: "ఉద్యోగులు నివేదిక",
              description: "Download Report of all your Employees",
            },
          ],
        },
      ],
    },
    employeeDemoStart: {
      buttons: [{ id: "MarkAttendance", title: "హాజరు చేయండి" }],

      message: () =>
        `1️⃣ *ఉద్యోగి డెమో దశలు*:\n a. ✅ మార్క్ హాజరు\n బి. 🙋 రిక్వెస్ట్ లీవ్\n సి. 🎫 టికెట్ పెంచండి\n డి. 📊 నివేదికను వీక్షించండి\n2️⃣ *ఎంప్లాయర్ డెమో దశలు* (ఉద్యోగి డెమో దశలను పూర్తి చేసిన తర్వాత)`,
    },
    "addGeo-fencing-emplyer": {
      message: () =>
        `మీరు జియో-ఫెన్సింగ్‌ను జోడించాలనుకుంటున్నారా, ఆపై దిగువ బటన్‌ను ప్రీస్ చేయండి`,
      buttons: [
        { id: "yes-geofencing", title: "అవును" },
        { id: "no-geofencing", title: "నం" },
      ],
    },
    "yes-geofencing": {
      message: () => `దయచేసి మీ కార్యాలయం యొక్క ప్రస్తుత స్థానాన్ని భాగస్వామ్యం చేయండి`,
    },
    "office-geo-fencing": {
      message: () => `మీ కార్యాలయం యొక్క ప్రస్తుత స్థానాన్ని అందించినందుకు ధన్యవాదాలు`,
    },
    "reminder-in": {
      message: () => `తదుపరి 5 నిమిషాల్లో చెక్-ఇన్‌ని గుర్తు పెట్టడానికి ఇది స్నేహపూర్వక రిమైండర్`,
    },
    "reminder-out": {
      message: () => `తదుపరి 5 నిమిషాల్లో చెక్-ఇన్‌ని గుర్తు పెట్టడానికి ఇది స్నేహపూర్వక రిమైండర్`,
    },
    employeeUploaded: {
      message: () =>
        "✅ ఉద్యోగి ప్రొఫైల్‌ను విజయవంతంగా సృష్టించారు।\n\nఉద్యోగి యొక్క WhatsApp నంబర్‌కు ఒక ఔపచారిక నోటిఫికేషన్ మరియు హాజరు ప్రారంభ సందేశం పంపించబడింది।\n\nఉద్యోగులను త్వరగా డెమోను పూర్తి చేసి, వారి హాజరు గుర్తించడం ప్రారంభించమని తెలియజేయండి।",
    },
    employeeDemoCompleted: {
      message: () =>
        "డెమో విజయవంతంగా పూర్తయింది. ఈ నంబరుపై మీ రోజువారీ హాజరును గుర్తించడాన్ని మీరు ప్రారంభించమని కోరబడుతున్నారు. 'హాయ్' అని టైప్ చేసి మీరు ఏదైనా సమయంలో ప్రవాహాన్ని ప్రారంభించవచ్చు.",
    },
    "profile-settings": {
      message: () =>
        `*ప్రొఫైల్ సెట్టింగ్‌లు*\n\nదిగువ ఎంపికను ఎంచుకోండి:\n\n1. *బిజినెస్ సెట్టింగ్‌లు*:మీ వ్యాపార ప్రాధాన్యతలను కాన్ఫిగర్ చేయండి.\n2. *నోటిఫికేషన్‌లు*:రోజువారీ ప్రత్యక్ష నివేదికల కోసం.\n3. *సవరించు / తొలగించు*\n\ta. షిఫ్ట్ సమయాన్ని సవరించండి`,
      // message: () =>
      //   `*ప్రొఫైల్ సెట్టింగ్‌లు*\n\nదిగువ ఎంపికను ఎంచుకోండి:\n\n1. *బిజినెస్ సెట్టింగ్‌లు*:మీ వ్యాపార ప్రాధాన్యతలను కాన్ఫిగర్ చేయండి.\n2. *నోటిఫికేషన్‌లు*:రోజువారీ ప్రత్యక్ష నివేదికల కోసం.\n3. *సవరించు / తొలగించు*\n\ta. జియో ఫెన్సింగ్‌ని సవరించండి\n\tb. షిఫ్ట్ సమయాన్ని సవరించండి`,
      buttons: [
        {
          id: "business-settings",
          title: "వ్యాపార సెట్టింగ్‌లు",
        },
        {
          id: "notification-settings",
          title: "నోటిఫికేషన్‌లు",
        },
        {
          id: "edit-delete",
          title: "సవరించండి/తొలగించండి",
        },
      ],
    },
    "business-settings": {
      message: () => ({
        body: `దయచేసి దిగువ బటన్‌ను క్లిక్ చేయడం ద్వారా మీ వ్యాపార సమాచారాన్ని నవీకరించండి. ధన్యవాదాలు!`,
        label: {
          title: "వ్యాపార అమరికలను సవరించండి",
          employerNamelabel: "ఉద్యోగి పేరు",
          employernolabel: "ఉద్యోగి సంఖ్య",
          bufferTimelabel: "బఫర్ సమయం",
          companyNamelabel: "కంపెనీ పేరు",
          monthlySickLeavelabel: "నెలవారీ అనుకూలమైన సైక్ అవకాశం",
          casualLeavelabel: "సాధారణ అవకాశం",
          annualLeavelabel: "సాంవత్సరిక అవకాశం",
          maternityLeaveAllowedlabel: "మాతృత్వ అవకాశం అనుమోదించబడింది",
          paternityLeaveAllowedlabel: "పితృత్వ అవకాశం అనుమోదించబడింది",
          unpaidLeavePolicylabel: "అన్‌పెయిడ్ అవకాశ విధానం",
          leaveEncashmentlabel: "అవకాశ ఎన్కాష్‌మెంట్",
          consequencesUnapprovedLeavelabel: "అనధికృత అవకాశం కారణాలు",
          halfDayPolicylabel: "అర్ధరాత్రి విధానం",
          Languagelabel: "భాష",
          carryForwardLimitlabel: "ముందుకు అగతి పరిమితి",
        },
      }),
    },
    "edit-delete": {
      message: () =>
        `మీరు సవరించడానికి లేదా తొలగించడానికి ఎంపికను ఎంచుకున్నారు. దయచేసి క్రింది లక్షణాల నుండి ఎంచుకోండి\n\n1. షిఫ్ట్ సమయాలను సవరించండి: కంపెనీ సమయం ఆధారంగా ఉద్యోగి షెడ్యూల్‌లను సర్దుబాటు చేయండి.\n2. జియో ఫెన్సింగ్‌ను సవరించండి: భౌగోళిక సరిహద్దులు లేదా పరిమితులను సవరించండి లేదా నవీకరించండి.\n3. తొలగించండి: ఉద్యోగులకు సంబంధించిన ఏదైనా డేటాను తొలగించడానికి ఈ ఎంపిక మిమ్మల్ని అనుమతిస్తుంది`,
      buttons: [
        { id: "edit-timings", title: "షిఫ్ట్ సమయాను సవరించ" },
        { id: "edit-geo-fencing", title: "జియోఫెన్సిగ్‌ని సవర" },
        { id: "delete", title: "తొలగించు" },
      ],
    },
    "edit-timings": {
      message: () => ({
        body: `దయచేసి షిఫ్ట్ టైమింగ్‌లను సవరించడానికి దిగువ బటన్‌ను యాక్సెస్ చేయడం ద్వారా ఉద్యోగుల షెడ్యూల్‌లను నిర్వహించండి మరియు ఆప్టిమైజ్ చేయండి. ఈ విషయంపై మీ శ్రద్ధ చాలా ప్రశంసించబడింది. ధన్యవాదాలు.`,
        label: {
          title: "షిఫ్ట్ సమయాలను సవరించండి",
          timingTypeLabel: "సమయ రకం",
          checkInLabel: "చెక్ ఇన్",
          checkOutLabel: "చెక్ ఔట్",
          workingHoursLabel: "పనిచేసే అవకాశం",
          branchLabel: "శాఖలు",
          employeesLabel: "ఉద్యోగులు",
          shiftTyperadio: [
            {
              id: "day",
              title: "డే షిఫ్ట్",
            },
            {
              id: "day/night",
              title: "డే/నైట్ షిఫ్ట్",
            },
          ],
          timingTyperadio: [
            {
              id: "Flexible",
              title: "స్థాయి సమయం",
            },
            {
              id: "Fixed",
              title: "నిర్ధారిత సమయం",
            },
          ],
          workdaysList: [
            {
              id: "0",
              title: "ఆదివారం",
            },
            {
              id: "1",
              title: "సోమవారం",
            },
            {
              id: "2",
              title: "మంగళవారం",
            },
            {
              id: "3",
              title: "బుధవారం",
            },
            {
              id: "4",
              title: "గురువారం",
            },
            {
              id: "5",
              title: "శుక్రవారం",
            },
            {
              id: "6",
              title: "శనివారం",
            },
          ],
        },
        list: {},
      }),
    },
    "edit-geo-fencing": {
      message: () =>
        `దయచేసి జియో ఫెన్సింగ్ సెట్టింగ్‌లను యాక్సెస్ చేయడానికి మరియు సవరించడానికి దిగువ బటన్‌ను ఉపయోగించడం ద్వారా ఉద్యోగుల స్థానాలపై ఖచ్చితమైన నియంత్రణను నిర్ధారించండి. ఈ పని పట్ల మీ శ్రద్ధ విలువైనది. ధన్యవాదాలు`,
    },
    link_employee: {
      message: () => ({
        body: `ప్లేస్‌లో కొత్త ప్లేస్ మరియు ఉద్యోగులను జోడించండి`,
        label: {
          title: "జియో ఫెన్సింగ్",
          heading: "స్థలం యొక్క సంకేతాలు",
          rangelabel: "శాఖ",
          rangeheadinglabel: "శాఖ 50 మీటర్ల మరియు ప్రారంభం అయితే ఉండాలి",
          employeelabel: "ఉద్యోగిక స్థలం శాఖను లింక్ చేయండి:",
          branchnamelabel: "స్థలం పేరు",
        },
      }),
    },
    edit_geolocation: {
      message: () => ({
        body: `దిగువ బటన్‌ను క్లిక్ చేయడం ద్వారా ఉద్యోగుల జియో ఫెన్సింగ్‌ని సవరించండి`,
        label: {
          title: "భౌగోళిక స్థానం సవరించు",
          workingHoursLabel: "పని గడువున అవకాశం",
          branchLabel: "ఉద్యోగి",
          timingTypeLabel: "సమయ రకం",
          placelabel: "ప్రదేశం",
        },
      }),
    },
    "edit-notifs": {
      message: (companyName) => ({
        body: `అప్‌డేట్ బటన్‌ను క్లిక్ చేయడం ద్వారా నోటిఫికేషన్‌లను అప్‌డేట్ చేయండి.`,
        label: {
          companyNamelabel: companyName,
          Notificationslabel: "నోటిఫికేషన్లు",
          dailyreportlabel: "రోజువారం సకాలం నివృత్తి",
          dailyeveningreportlabel: "రోజువారం సాయంనివృత్తి",
          monthendlabel: "నెలా ముగియింది నివృత్తి",
        },
        buttons: [
          { id: "checkIn", title: "చెక్-ఇన్లు" },
          { id: "checkOut", title: "చెక్-అవుట్‌లు" },
          { id: "leaveRequest", title: "అవకాశ అభ్యర్థనలు" },
          { id: "support", title: "మద్దతు అభ్యర్థన" },
        ],
      }),
    },
    "notification-settings": {
      message: () =>
        `మా తాజా ఫీచర్‌తో మీ నిర్వాహక అనుభవాన్ని మెరుగుపరచుకోండి - ఎడిట్ నోటిఫికేషన్ బటన్\n\nచెక్ ఇన్: మీ ఉద్యోగులు చెక్-ఇన్ చేసినప్పుడు నోటిఫికేషన్ స్వీకరించండి.\nచెక్ అవుట్: మీ ఉద్యోగులు చెక్-అవుట్ చేసినప్పుడు నోటిఫికేషన్‌ను స్వీకరించండి.\nఉదయం నివేదిక: ప్రత్యక్ష నివేదికను స్వీకరించండి ఉదయం.\nసాయంత్రం నివేదిక: సాయంత్రం ప్రత్యక్ష నివేదికను స్వీకరించండి.`,
      buttons: [{ id: "edit-notifs", title: "నోటిఫికేషన్‌లను సవరి" }],
    },
    "remove-employees": {
      message: () => ({
        body: `ఉద్యోగుల తొలగింపు ప్రక్రియను ప్రారంభించడానికి దయచేసి దిగువ బటన్‌ను క్లిక్ చేయండి.`,
        label: {
          title: "ఉద్యోగిగళను తొలగించండి",
          employeesLabel: "ఉద్యోగిగారు",
          companylabel: "కంపెనీ పేరు",
        },
      }),
    },
    "remove-branch": {
      message: () => ({
        body: `ప్లేస్ నుండి ఉద్యోగిని తొలగించడాన్ని ప్రారంభించడానికి దయచేసి దిగువ బటన్‌ను క్లిక్ చేయండి.`,
        label: {
          title: "ఉద్యోగులను స్థలం నుండి తొలగించండి",
          branchLabel: "స్థలాలు",
          employeesLabel: "ఉద్యోగిగారు",
          companylabel: "కంపెనీ పేరు",
        },
      }),
    },
    "live-report-templates": {
      message: () => ({
        employees: "ఉద్యోగిగారు",
        onTime: "సమయంలో",
        late: "దీర్ఘకాలం",
        absent: "అంశం",
        onLeave: "అవకాశంలో",
        attendance: "హాజరు",
        employee: "ఉద్యోగి",
        shiftStatus: "షిఫ్టు & స్థితి",
        checkIn: "చెక్ ఇన్",
        checkOut: "చెక్ ఔట్",
        requiredTime: "అవసరమైన సమయం",
        actualTime: "వాస్తవ సమయం",
        shiftDuration: "షిఫ్టు కాలం",
        leaveRequests: "అవకాశ అభ్యర్ధనలు",
        leaveType: "అవకాశ రకం",
        startDate: "ప్రారంభ తేదీ",
        endDate: "ముగింపు తేదీ",
        status: "స్థితి",
      }),
    },
    "employee-report-templates": {
      message: () => ({
        present: "ఉపస్థితం",
        absent: "అనుపస్థితం",
        leaves: "అవకాశాలు",
        attendance: "హాజరు",
        date: "తేది",
        shiftStatus: "షిఫ్ట్ & స్థితి",
        checkIn: "చెక్ ఇన్",
        checkOut: "చెక్ ఔట్",
        requiredTime: "అవసరమైన సమయం",
        actualTime: "వాస్తవ సమయం",
        shiftDuration: "షిఫ్ట్ కాలం",
        leaveRequests: "అవకాశ అభ్యర్థనలు",
        leaveType: "అవకాశ రకం",
        startDate: "ప్రారంభ తేదీ",
        endDate: "ముగింపు తేదీ",
        status: "స్థితి",
      }),
    },
    "emp-attendance-templates": {
      message: () => ({
        employeeAttendenceLogs: "ఉద్యోగి హాజరు లాగ్స్",
        totalTickets: "మొత్తం టికెట్లు",
        ticketOpen: "టికెట్ తెరవిలో",
        ticketClosed: "టికెట్ మూసివేయబడింది",
        employeeAttendenceLog: "ఉద్యోగి హాజరు లాగ్",
      }),
    },
    "all-emp-ticket-templates": {
      message: () => ({
        employeeTickets: "ఉద్యోగి టికెట్స్",
        totalTickets: "మొత్తం టికెట్లు",
        ticketOpen: "టికెట్ తెరవిలో",
        ticketClosed: "టికెట్ మూసివేయబడింది",
        ticketsOpen: "టికెట్స్ తెరవిలో",
        ticketsClosed: "టికెట్స్ మూసివేయబడింది",
      }),
    },
    "all-emp-report-templates": {
      message: () => ({
        employeesLabel: "ఉద్యోగిగారు",
        employeesInfo: "ఉద్యోగిగార సమాచారం",
        employee: "ఉద్యోగి",
        position: "పోసిషన్",
        shiftTimings: "షిఫ్ట్ టైమింగ్స్",
        joiningDate: "చేరడం తేదీ",
      }),
    },
    addBranch: {
      message: () => ({
        body: `"స్థలాన్ని జోడించు" బటన్‌ను క్లిక్ చేయడం ద్వారా స్థలాన్ని జోడించండి.`,
        label: {
          title: "Geo Fencing",
          heading: "Place Coordinates",
          rangelabel: "Range",
          rangeheadinglabel: "Range must be 200 meters and above",
          branchnamelabel: "Place Name",
        },
      }),
    },
    delete: {
      message: () =>
        `హలో, దయచేసి దిగువన ఒక ఎంపికను ఎంచుకోండి:\n1. ఉద్యోగులను తీసివేయండి: సంస్థ నుండి ఉద్యోగులను తీసివేయండి.\n2. ప్లేస్‌ని తీసివేయండి: ప్లేస్ నుండి ఉద్యోగులను తీసివేయండి`,
      buttons: [
        { id: "remove-employees", title: "ఉద్యోగి తీసివేయండి" },
        { id: "remove-branch", title: "స్థలం తొలగించండి" },
      ],
    },
    dateRangeReport: {
      message: () => ({
        body: `మేము మీ సమీక్ష కోసం సమగ్ర తేదీ పరిధి నివేదికను సిద్ధం చేసాము. దయచేసి మీ ప్రాధాన్య తేదీ పరిధిని పేర్కొనండి మరియు మేము మీకు తక్షణమే అంతర్దృష్టులు మరియు విశ్లేషణలను అందిస్తాము.`,
        label: {
          title: "తేదీ శ్రేణి నివేదిక",
          startdatelabel: "ప్రారంభ తేదీ",
          enddatelabel: "ముగింపు తేదీ",
        },
      }),
    },
    attendanceManagement: {
      message: () => ({
        body: `ఆటోవాట్ అటెండెన్స్ మేనేజ్‌మెంట్ చాట్ బాట్‌కు స్వాగతం.`,
        label: {
          label1: "నివేదికలు  ఆమోదాలు",
          label2: "నివేదికలు",
          label3: "జట్టు",
          label7: "స్థలాలను సవరించండి",
          label9: "స్థలాలను తొలగించండి",
          label10: "షిఫ్ట్ సమయం సవరించండ",
          label11: "ఉద్యోగిని తొలగించండి",
          labeldelete: "ఎంపికలను తొలగించండి",
          labeledit: "ఎంపికలను సవరించండి",
          labelbusiness: "వ్యాపార సెట్టింగ్‌లు",
          labelBussinessRadio: "వ్యాపార సెట్టింగ్స్",
          reportsdd: [
            {
              id: "yesterdayreport",
              title: "నిన్నటి నివేదికcs",
            },
            {
              id: "currentmonth",
              title: "ప్రస్తుత నెల",
            },
            {
              id: "customdaterangepdf",
              title: "తేదీ నివేదిక(PDF)",
            },
            {
              id: "allEmployees",
              title: "అన్ని ఉద్యోగుల నివేద",
            },
          ],
          quick: [
            {
              id: "livereport",
              title: "ప్రత్యక్ష నివేదిక",
            },
            {
              id: "leaveApprovals",
              title: "ఆమోదాలను వదిలివేయండి",
            },
            {
              id: "attendanceCorrections",
              title: "హాజరు దిద్దుబాటు",
            },
            {
              id: "supportTickets",
              title: "మద్దతు టిక్కెట్లు",
            },
            {
              id: "taskApprovals",
              title: "టాస్క్ ఆమోదం",
            },
            {
              id: "broadcast",
              title: "ప్రసార",
            },
          ],
          labelBussinessList: [
            {
              id: "editBusiness",
              title: "వ్యాపార సెట్టింగ్స్",
            },
          ],
        },
      }),
    },
    contacts: {
      message: () => `క్షమించండి! మీరు పరిచయాలను అప్‌లోడ్ చేయలేరు.`,
    },
    contactsUpdate: {
      message: () =>
        `ఉద్యోగి వివరాలు విజయవంతంగా నవీకరించబడినట్లు మీకు తెలియజేయడానికి నేను సంతోషిస్తున్నాను.`,
    },
    placeCreated: {
      message: () =>
        `కొత్త స్థలం మరియు జియో-ఫెన్సింగ్ విజయవంతంగా సృష్టించబడినట్లు మేము మీకు తెలియజేయాలనుకుంటున్నాము`,
    },
    employeeGeoFencing: {
      message: () =>
        `ఉద్యోగి జియో-ఫెన్సింగ్ విజయవంతంగా నవీకరించబడిందని మేము మీకు తెలియజేయాలనుకుంటున్నాము.`,
    },
    employeeRemove: {
      message: () => `సంస్థ నుండి ఉద్యోగి తీసివేయబడ్డారని మేము మీకు తెలియజేయాలనుకుంటున్నాము.`,
    },
    employeeRemovePlace: {
      message: () => `ఉద్యోగులను స్థలం నుండి తొలగించారని మేము మీకు తెలియజేయాలనుకుంటున్నాము.`,
    },
    placeDeleted: {
      message: () => `స్థలం విజయవంతంగా తొలగించబడింది.`,
    },
    broadcast: {
      message: () => ({
        body: `మీ ఉద్యోగులందరికీ మీ సందేశాన్ని ప్రసారం చేయండి`,
        label: {
          broadcastLabel: "బ్రాడ్కాస్ట్ సందేశం",
          filesLabel: "అంగడాలు",
          employeesLabel: "ఉద్యోగులు",
          fileRadios: [
            {
              id: "document",
              title: "డాక్యుమెంట్",
            },
            {
              id: "image",
              title: "చిత్రం",
            },
            {
              id: "video",
              title: "వీడియో",
            },
          ],
        },
        list: {},
      }),
    },
  },
  Marathi: {
    hi: {
      message: (name) => `नमस्कार ${name}\nमी तुमच्याला साथ देणारा आणि आपल्याला मदतीसाठी येथे आहे.`,
      buttons: [
        {
          id: "MarkAttendance",
          title: "उपस्थिती नोंदणी",
        },
        {
          id: "Report",
          title: "अहवाल",
        },
        {
          id: "Other",
          title: "इतर",
        },
      ],
    },
    MarkAttendance: {
      message: () =>
        "उपस्थिती नोंदणी\n\n- आपल्या कामदिनाच्या प्रारंभाला [IN] वर क्लिक करा.\n- आपल्या कामदिनाच्या समापनाला [OUT] वर क्लिक करा.",
      buttons: [
        { id: "in", title: "🟢 IN" },
        { id: "out", title: "🔴 OUT" },
      ],
    },
    in: {
      message: () =>
        "स्थान \n📍 कृपया आपले सध्याचे स्थान सामायिक करण्यासाठी खालील क्रमांकांच्या माध्यमातून सामायिक करा:\n1. 📩 या संदेशाची निवडणूक करा.\n2. 💬 'उत्तर' वर क्लिक करा.\n3. 📎 अटॅचमेंट किंवा क्लिप आयकनावर क्लिक करा.\n4. 📍 'स्थान' निवडा.\n5. ✅ 'आपला सध्याचे स्थान पाठवा' निवडा.",
    },
    out: {
      message: () =>
        "स्थान \n📍 कृपया आपले सध्याचे स्थान सामायिक करण्यासाठी खालील क्रमांकांच्या माध्यमातून सामायिक करा:\n1. 📩 या संदेशाची निवडणूक करा.\n2. 💬 'उत्तर' वर क्लिक करा.\n3. 📎 अटॅचमेंट किंवा क्लिप आयकनावर क्लिक करा.\n4. 📍 'स्थान' निवडा.\n5. ✅ 'आपला सध्याचे स्थान पाठवा' निवडा.",
    },
    attendanceLocation: {
      message: () =>
        "📸 सामायिक साठविण्यासाठी कृपया आपला सेल्फी या क्षेत्रफेन्सिंग क्षेत्रातील आपल्याच्या स्थानाच्या पार्श्वभूमि दर्शविण्यात आपली मदत करा.",
    },
    clickAttendanceLocation: {
      message: () =>
        "*⚠️ प्रत्यक्षपणे पाठवू नका*. पहिल्यांना सुनिश्चित करा की आपण *उत्तर देता* आहात, नंतर 'आपला सध्याचे स्थान पाठवा' निवडा.\n📍 कृपया आपले सध्याचे स्थान सामायिक करण्यासाठी खालील क्रमांकांच्या माध्यमातून सामायिक करा:\n1. 📩 या संदेशाची निवडणूक करा.\n2. 💬 'उत्तर' वर क्लिक करा.\n3. 📎 अटॅचमेंट किंवा क्लिप आयकनावर क्लिक करा.\n4. 📍 'स्थान' निवडा.",
    },
    locNotInRange: {
      message: () =>
        `🚫 आम्ही दिलगीर आहोत, परंतु आम्ही यावेळी तुमचे स्थान 📍 आणि उपस्थिती ⏲️ नोंदवू शकलो नाही. तुम्ही कंपनीच्या मर्यादेत नाही 🚷. कृपया कंपनीच्या मर्यादेत जा आणि नंतर सुरुवातीपासून पुन्हा प्रयत्न करा 🔁.👣`,
    },
    attendancePic: {
      message: () => "📸 कृपया आपली सेल्फी फोटो पाठवा 🤳.",
    },
    Report: {
      message: () => "आपल्या सध्याच्या महिन्याची किंवा मागील महिन्याची अहवाल डाउनलोड करा",
      buttons: [
        {
          id: "currentMonth",
          title: "सध्याचा महिना",
        },
        // {
        //   id: 'previousMonth',
        //   title: 'मागील महिना',
        // },
      ],
    },
    uploadEmployee: {
      message: () => "कृपया सर्व कर्मचार्‍यांचा संपर्क नोंद करा.",
    },
    Other: {
      message: () =>
        "नमस्कार! आम्ही आपल्याला आज कसे मदतीकरू शकतो? कृपया खालील पर्यायांपासून निवडा.",
      buttons: [
        {
          id: "requestLeave",
          title: "अवकाश विचारा",
        },
        {
          id: "support",
          title: "समर्थन",
        },
        // {
        //   id: 'question',
        //   title: 'प्रश्न विचारा',
        // },
      ],
    },
    startLeaveRequest: {
      message: () =>
        "आम्ही यशस्वीरित्या अटेंडन्स डेमो पूर्ण केला आहे. पुढील डेमो म्हणजे आपण रजा कसे विनंती करू शकता।",
      buttons: [{ id: "requestLeave", title: "Start Request Leave" }],
    },
    requestLeave: {
      message: () =>
        "सावधानीपूर्वक काही वेळ घेण्याची कल्पना करता? कृपया आपल्याला किती दिवस अर्ज करायचं सांगा:",
      buttons: [
        { id: "oneDay", title: "एक दिवस" },
        { id: "moreThanOneDay", title: "एकापेक्षा अधिक दिवस" },
      ],
    },
    oneDay: {
      message: () => ({
        body: "कृपया किंवा दिनांक आणि कारण सूचित करण्यासाठी खालील बटणावर क्लिक करा",
        label: {
          title: "अवकाशाची विनंती",
          startdatelabel: "प्रारंभ तारीख",
          enddatelabel: "समाप्ती तारीख",
          reasonlabel: "अवकाशाचा कारण",
        },
      }),
    },
    moreThanOneDay: {
      message: () => ({
        body: "कृपया किंवा दिनांक आणि कारण सूचित करण्यासाठी खालील बटणावर क्लिक करा",
        label: {
          title: "अवकाशाची विनंती",
          startdatelabel: "प्रारंभ तारीख",
          enddatelabel: "समाप्ती तारीख",
          reasonlabel: "अवकाशाचा कारण",
        },
      }),
    },
    leaveSummary: {
      message: (
        employeeName,
        department,
        leaveType,
        startDate,
        endDate,
        reasonForLeave,
        ticketNumber,
        recipientPhone
      ) =>
        `नाव: *${employeeName}*\nविभाग: *${
          department ?? "-"
        }* \nसाठविण्याचा प्रकार: *${leaveType}*\nसुरूवातीची दिनांक: *${startDate}*\n${
          endDate !== "Invalid Date" ? `समापन तारीख: *${endDate}*\n` : ""
        }कारण: *${reasonForLeave}*\nनंबर: *${recipientPhone}* \nटिकिट नंबर: *${ticketNumber}*`,
    },
    support: {
      message: () =>
        "स्वागत आहे! आम्ही आपल्या सहाय्यासाठी येथे आहोत. कृपया आपल्याला सापडलेली समस्यांमध्ये निवडा:",
      buttons: [
        {
          title: `🔎 समस्या`,
          headers: `🔎 समस्या`,
          rows: [
            {
              id: "check-in",
              title: "Check IN",
              description: "Check In समस्या",
            },
            {
              id: "check-out",
              title: "Check OUT",
              description: "Check Out समस्या",
            },
            {
              id: "salary-issue",
              title: "पगार समस्या",
              description: "पगार समस्या",
            },
            {
              id: "other-issue",
              title: "इतर ❓",
              description: "इतर समस्या",
            },
          ],
        },
      ],
    },
    checkIn: {
      message: () => "कृपया आपली टिप्पणी टाइप करा",
    },
    checkOut: {
      message: () => "कृपया आपली टिप्पणी टाइप करा",
    },
    other_issue: {
      message: () => "कृपया आपली टिप्पणी टाइप करा",
    },
    Salary_Issue: {
      message: () => "कृपया आपली टिप्पणी टाइप करा",
    },
    employeeIssue: {
      message: () => "कृपया आपला टिपणी टंकाना.",
    },
    sendIssue: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `नाव: *${name}*\nविभाग: *${
          department ?? "-"
        }*\nसापडलेली समस्या: *${problem}*\nटिपणी: *${message}*\nनंबर: *${recipientPhone}*\nटिकिट नंबर: *${ticketNumber}*`,
      buttons: (employeeNumber, ticketNumber) => [
        { title: "मंजूर", id: `issue_approve-${employeeNumber}-${ticketNumber}` },
        { title: "नाकारणे", id: `issue_reject-${employeeNumber}-${ticketNumber}` },
        { title: "ठामणे", id: `issue_hold-${employeeNumber}-${ticketNumber}` },
      ],
    },
    sendLeave: {
      message: (employeeName, leaveType, startDate, endDate, reason) =>
        `*रजेची विनंती सूचना* \n👤 कर्मचाऱ्याचे नाव: ${employeeName}\nरजेचा प्रकार: ${leaveType}\nसुरुवात तारीख: *${startDate}*\n${
          endDate !== "Invalid Date" ? `अंतिम तारीख: *${endDate}*\n` : ""
        }\nकारण: ${reason}कृपया पुनरावलोकन करा आणि आवश्यक कारवाई करा.`,
      buttons: (employeePhone, ticketNumber) => [
        {
          id: `request_approve-${employeePhone}-${ticketNumber}`,
          title: "मंजूर",
        },
        {
          id: `request_reject-${employeePhone}-${ticketNumber}`,
          title: "नकारा",
        },
        {
          id: `request_hold-${employeePhone}-${ticketNumber}`,
          title: "थांबा",
        },
      ],
    },
    registerComplain: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `नाव: *${name}*\nविभाग: *${
          department ?? "-"
        }*\nसापडलेली समस्या: *${problem}*\nटिपणी: *${message}*\nनंबर: *${recipientPhone}*\nटिकिट नंबर: *${ticketNumber}*`,
    },
    approvals: {
      buttons: [
        { title: "Leave-Approve", id: "leaveApprove" },
        { title: "Active-Issues", id: "activeIssues" },
      ],
      message: () =>
        `नमस्कार, कृपया खालीलप्रमाणे निवडा:\n 1️⃣ अवकाश मंजूरी द्या.\n 2️⃣ तुमच्या मंजूरीकरणासाठी अपेक्षित आहेलेल्या कामाच्या आपल्या मंजूरीद्वारे जुळवा.\nकृपया संबंधित बटणावर क्लिक करण्यात आपली प्राधान्य द्या!`,
    },
    leaveApprove: {
      message: () =>
        `*कर्मचारी रजेचा अहवाल*\nप्रिय नियोक्ता, एका कर्मचाऱ्याने रजेची विनंती केली आहे\n *तिकीट क्रमांक: RL4545* \n *नाव*: राम \n *तारीख*: 23/12/2023 \n *कारण* : लग्न \n *प्रकार* : रजेची विनंती करा`,
      buttons: [
        { title: "मंजूर", id: "request_approve" },
        { title: "नाकारणे", id: "request_reject" },
        { title: "ठामणे", id: "request_hold" },
      ],
    },
    activeIssues: {
      message: () =>
        `*कर्मचारी समस्या अहवाल*\nप्रिय नियोक्ता, कर्मचाऱ्याने तक्रार नोंदवली आहे:\n *कर्मचाऱ्याचे नाव* : शम \n *समस्या* : पगार \n *समस्याचे वर्णन* : पगार कमी जमा\nकृपया योग्य कारवाई करा या चिंतेचे निराकरण करण्यासाठी.`,
      buttons: [
        { title: "मंजूर", id: "issue_approve" },
        { title: "नाकारणे", id: "issue_reject" },
        { title: "ठामणे", id: "issue_hold" },
      ],
    },
    issue_approve: {
      message: () =>
        "स्थिती अपडेट: मंजूर\nतुमची विनंती/अर्ज मंजूर करण्यात आला आहे हे कळवण्यात आम्हाला आनंद होत आहे!\nतुमच्या संयम आणि सहकार्याबद्दल धन्यवाद.",
    },
    issue_reject: {
      message: () =>
        "स्थिती अपडेट: नाकारले \nतुमची विनंती/अर्ज नाकारण्यात आला आहे हे कळवण्यास आम्हाला खेद वाटतो.\nआम्ही तुमच्या समजुतीचे कौतुक करतो.",
    },
    issue_hold: {
      message: () =>
        "स्थिती अपडेट: होल्डवर \nआम्ही परिस्थितीचे पुनरावलोकन आणि मूल्यांकन करत असताना तुमची विनंती/अर्ज सध्या होल्डवर आहे.\nया वेळी तुमच्या संयमाची आम्ही प्रशंसा करतो.",
    },
    request_approve: {
      message: () =>
        `*रजा विनंती अपडेट*: मंजूर\nआम्हाला कळविण्यात आनंद होत आहे की तुमची रजेची विनंती मंजूर झाली आहे!\nतुमच्या संयम आणि सहकार्याबद्दल धन्यवाद.`,
    },
    request_reject: {
      message: () =>
        `*रजा विनंती अपडेट*: नाकारले \nआम्ही तुम्हाला कळविण्यास खेद व्यक्त करतो की तुमची रजेची विनंती नाकारण्यात आली आहे.\nआम्ही तुमच्या समजुतीची प्रशंसा करतो.`,
    },
    request_hold: {
      message: () =>
        `*रजा विनंती अपडेट*: होल्डवर \nआम्ही परिस्थितीचे पुनरावलोकन आणि मूल्यांकन करत असताना तुमची रजेची विनंती सध्या होल्डवर आहे.\nया वेळी तुमच्या संयमाची आम्ही प्रशंसा करतो.`,
    },
    addEmployee: {
      message: (employeeName, employeeNumber, timing, geofen) =>
        `जोडण्यात आहे:\n*नाव*: ${employeeName}\n*क्रमांक*: ${employeeNumber}\n*प्रकार*: ${timing}\n*GeoFencing*: ${geofen}`,
    },
    editEmployee: {
      message: () => ({
        body: `कर्मचारी संपादित करा बटणावर क्लिक करून कर्मचारी संपादित करा आणि फॉर्म भरा.`,
        label: {
          title: "कर्मचारीचे तपशील संपादित करा",
          employeeNameLabel: "कर्मचारीचं नाव",
          employeeNumberLabel: "कर्मचारी मोबाईल क्रमांक",
          timingTypeLabel: "समय प्रकार",
          workingHoursNote: "स्वतंत्र कामकाज समय",
          checkInOutNote: "निश्चित समय: चेक-इन आणि चेक-आउट",
          checkInLabel: "चेक-इन",
          checkOutLabel: "चेक-आउट",
          workingHoursLabel: "कामकाज समय",
          designationLabel: "पदनाम",
          branchLabel: "ठिकाण",
          joiningDateLabel: "सामील होण्याची तारीख",
          dobLabel: "जन्मतारीख",
        },
        list: {
          timingTyperadio: [
            {
              id: "Flexible",
              title: "सुविधाजनक समय",
            },
            {
              id: "Fixed",
              title: "निश्चित समय",
            },
          ],
          shiftTyperadio: [
            {
              id: "day",
              title: "दिवस काम",
            },
            {
              id: "day/night",
              title: "दिवस/रात्री काम",
            },
          ],
          workdaysList: [
            {
              id: "0",
              title: "रविवार",
            },
            {
              id: "1",
              title: "सोमवार",
            },
            {
              id: "2",
              title: "मंगळवार",
            },
            {
              id: "3",
              title: "बुधवार",
            },
            {
              id: "4",
              title: "गुरुवार",
            },
            {
              id: "5",
              title: "शुक्रवार",
            },
            {
              id: "6",
              title: "शनिवार",
            },
          ],
          proofList: [
            {
              id: "location",
              title: "स्थान",
            },
            {
              id: "image",
              title: "फोटो",
            },
            {
              id: "logs",
              title: "लॉग्स",
            },
          ],
        },
      }),
    },
    ticketUpdate: {
      message: (ticketNumber) =>
        `टिकीचा क्रमांक: ${ticketNumber} यशस्वीरित्या अद्यतनित केला गेला आहे`,
    },
    employerStart: {
      message: () =>
        "नमस्कार, कृपया खालील पर्यायांतून एक विकल्प निवडा:\n\n1️⃣. अहवाल मिळवा: विस्तृत अहवाल मिळवण्यासाठी हे बटण क्लिक करा.\n2️⃣. मान्यता: कर्मचारी अवकाश मान्यता तपासा किंवा व्यवस्थापित करायचं आहे का? हे बटण वापरून येथे संचालन करा.\n3️⃣.प्रोफाइल/सेटिंग्ज: तुमची प्रोफाइल आणि सेटिंग्ज येथे व्यवस्थापित करा.",
      buttons: [
        { id: "employerReports", title: "अहवाल-मिळवा" },
        { id: "approvals", title: "मान्यता" },
        { id: "profile-settings", title: "प्रोफाइल सेटिंग्ज" },
      ],
    },
    employerReports: {
      message: () =>
        "स्वागत आहे! कृपया एक पर्याय निवडा:\n1. थेट अहवाल: रिअल-टाइम अपडेट पहा.\n2. कालचा अहवाल: कालच्या अहवालात प्रवेश करा.\n3. कर्मचारी मास्टर शीट: कर्मचारी मास्टर शीटमध्ये प्रवेश करा.",
      buttons: [
        {
          title: "Reports",
          headers: "Reports",
          rows: [
            {
              id: "liveReport",
              title: "लाइव अपडेट",
              description: "Download Live Report",
            },
            {
              id: "yesterdayReport",
              title: "कालचा अहवाल  ",
              description: "Download Yesterday Report",
            },
            {
              id: "dateRangeReport",
              title: "तारीख श्रेणी अहवाल",
              description: "Download Date Range Report",
            },
            {
              id: "emp_master_sheet",
              title: "कर्मचारी मास्टर शीट",
              description: "Download Report of all your Employees",
            },
          ],
        },
      ],
    },
    employeeDemoStart: {
      buttons: [{ id: "MarkAttendance", title: "उपस्थिती चिन्ह" }],
      message: () =>
        "1️⃣ *कर्मचाऱ्य डेमो कदम*:\n   a. ✅ उपस्थिती चिन्हांकन करा\n   b. 🙋 अवकाश विचारा\n   c. 🎫 एक टिकीट उधारा\n   d. 📊 अहवाल पहा\n2️⃣ *कर्मचाऱ्य डेमो कदम* (कर्मचाऱ्य डेमो कदमे पूर्ण केल्यानंतर)",
    },
    "addGeo-fencing-emplyer": {
      message: () => `तुम्हाला जिओ-फेन्सिंग जोडायचे आहे का नंतर खाली बटण दाबा`,
      buttons: [
        { id: "yes-geofencing", title: "होय" },
        { id: "no-geofencing", title: "नाही" },
      ],
    },
    "yes-geofencing": {
      message: () => `कृपया तुमच्या कार्यालयाचे वर्तमान स्थान शेअर करा`,
    },
    "office-geo-fencing": {
      message: () => `आपल्या कार्यालयाचे वर्तमान स्थान प्रदान केल्याबद्दल धन्यवाद`,
    },
    "reminder-in": {
      message: () =>
        `पुढील 5 मिनिटांमध्ये चेक-आउट चिन्हांकित करण्यासाठी हे एक अनुकूल स्मरणपत्र आहे`,
    },
    "reminder-out": {
      message: () =>
        `पुढील 5 मिनिटांमध्ये चेक-आउट चिन्हांकित करण्यासाठी हे एक अनुकूल स्मरणपत्र आहे`,
    },
    employeeUploaded: {
      message: () =>
        "✅ कर्मचारी प्रोफाइल यशस्वीरित्या तयार केले आहे।\n\nकर्मचार्याच्या WhatsApp क्रमांकावर एक औपचारिक सूचना आणि उपस्थिती प्रारंभ संदेश पाठविण्यात आला आहे।\n\nकृपया कर्मचाऱ्यांना लवकरात लवकर डेमो पूर्ण करण्यास सांगा आणि त्यांची उपस्थिती नोंदविण्यास सुरुवात करा।",
    },
    employeeDemoCompleted: {
      message: () =>
        "डेमो यशस्वीपणे पूर्ण झाला आहे. तुम्हाला या क्रमांकावर दररोज उपस्थिती नोंदविण्याची विनंती केली जात आहे. तुम्ही 'हाय' टाइप करून कोणत्याही वेळी प्रवाह सुरू करू शकता.",
    },
    "profile-settings": {
      message: () =>
        `*प्रोफाइल सेटिंग्ज*\n\nखालील एक पर्याय निवडा:\n\n1. *व्यवसाय सेटिंग्ज*:तुमची व्यवसाय प्राधान्ये कॉन्फिगर करा.\n2. *सूचना*:रोजच्या आधारावर थेट अहवालांसाठी.\n3. *संपादित करा/हटवा*\n\ta. शिफ्ट टाइमिंग संपादित करा`,
      // message: () =>
      //   `*प्रोफाइल सेटिंग्ज*\n\nखालील एक पर्याय निवडा:\n\n1. *व्यवसाय सेटिंग्ज*:तुमची व्यवसाय प्राधान्ये कॉन्फिगर करा.\n2. *सूचना*:रोजच्या आधारावर थेट अहवालांसाठी.\n3. *संपादित करा/हटवा*\n\ta. जिओ फेन्सिंग संपादित करा\n\tb. शिफ्ट टाइमिंग संपादित करा`,
      buttons: [
        {
          id: "business-settings",
          title: "व्यवसाय सेटिंग्ज",
        },
        {
          id: "notification-settings",
          title: "अधिसूचना",
        },
        {
          id: "edit-delete",
          title: "संपादित करा/हटवा",
        },
      ],
    },
    "business-settings": {
      message: () => ({
        body: `कृपया खालील बटणावर क्लिक करून तुमची व्यवसाय माहिती अपडेट करा. धन्यवाद!`,
        label: {
          title: "व्यापार सेटिंग्ज संपादित करा",
          employerNamelabel: "कर्मचारीचे नाव",
          employernolabel: "कर्मचारी क्रमांक",
          bufferTimelabel: "बफर वेळ",
          companyNamelabel: "कंपनीचे नाव",
          monthlySickLeavelabel: "मासिक आजारात बिना",
          casualLeavelabel: "कॅझ्यूअल विरमाण",
          annualLeavelabel: "वार्षिक विरमाण",
          maternityLeaveAllowedlabel: "मातृत्व विरमाण स्वीकृत",
          paternityLeaveAllowedlabel: "पितृत्व विरमाण स्वीकृत",
          unpaidLeavePolicylabel: "अपेक्षित विरमाण धन",
          leaveEncashmentlabel: "विरमाण संपन्न",
          consequencesUnapprovedLeavelabel: "अनमंजूर विरमाणाचे परिणाम",
          halfDayPolicylabel: "अर्धदिवस धन",
          Languagelabel: "भाषा",
          carryForwardLimitlabel: "आगाऊ घेतल्याची सीमा",
        },
      }),
    },
    "edit-delete": {
      message: () =>
        `तुम्ही संपादित किंवा हटवण्याचा पर्याय निवडला आहे. कृपया खालील वैशिष्ट्यांमधून निवडा\n\n1. शिफ्ट वेळा संपादित करा:कंपनीच्या वेळेवर आधारित कर्मचारी वेळापत्रक समायोजित करा.\n2. कर्मचारी काढून टाका: कर्मचाऱ्यांना संस्थेतून काढून टाका.\n3. शाखा काढा: कर्मचाऱ्यांना शाखेतून काढा.`,

      buttons: [
        { id: "edit-timings", title: "शिफ्ट वेळ संपा करा" },
        { id: "edit-geo-fencing", title: "जिओ फेन्सिंग संपाकरा" },
        { id: "delete", title: "हटवा" },
      ],
    },
    "edit-timings": {
      message: () => ({
        body: `तुम्ही संपादित किंवा हटवण्याचा पर्याय निवडला आहे. कृपया खालील वैशिष्ट्यांमधून निवडा\n\n1. शिफ्ट वेळा संपादित करा:कंपनीच्या वेळेनुसार कर्मचारी वेळापत्रक समायोजित करा.\n2. भौगोलिक कुंपण संपादित करा: भौगोलिक सीमा किंवा निर्बंध सुधारित किंवा अद्यतनित करा.\n3.हटवा:हा पर्याय तुम्हाला कर्मचार्‍यांशी संबंधित कोणताही डेटा हटविण्याची परवानगी देतो`,
        label: {
          title: "शिफ्ट समय संपादित करा",
          timingTypeLabel: "समय प्रकार",
          checkInLabel: "चेक इन",
          checkOutLabel: "चेक आउट",
          workingHoursLabel: "कामकाजाचे वेळ",
          branchLabel: "शाखाएं",
          employeesLabel: "कर्मचारी",
          shiftTyperadio: [
            {
              id: "day",
              title: "दिवस काम",
            },
            {
              id: "day/night",
              title: "दिवस/रात्री काम",
            },
          ],
          timingTyperadio: [
            {
              id: "Flexible",
              title: "सुविधाजनक समय",
            },
            {
              id: "Fixed",
              title: "निश्चित समय",
            },
          ],
          workdaysList: [
            {
              id: "0",
              title: "रविवार",
            },
            {
              id: "1",
              title: "सोमवार",
            },
            {
              id: "2",
              title: "मंगळवार",
            },
            {
              id: "3",
              title: "बुधवार",
            },
            {
              id: "4",
              title: "गुरुवार",
            },
            {
              id: "5",
              title: "शुक्रवार",
            },
            {
              id: "6",
              title: "शनिवार",
            },
          ],
        },
      }),
    },
    "edit-geo-fencing": {
      message: () =>
        `कृपया जिओ फेन्सिंग सेटिंग्जमध्ये प्रवेश करण्यासाठी आणि संपादित करण्यासाठी खालील बटणाचा वापर करून कर्मचारी स्थानांवर अचूक नियंत्रण सुनिश्चित करा. या कार्याकडे आपले लक्ष मोलाचे आहे. धन्यवाद`,
    },
    link_employee: {
      message: () => ({
        body: `ठिकाणी नवीन ठिकाण आणि कर्मचारी जोडा`,
        label: {
          title: "जिओ फेन्सिंग",
          heading: "ठिकाण संयोजन",
          rangelabel: "परिसर",
          rangeheadinglabel: "परिसर 50 मीटर आणि वरील असणे आवश्यक आहे",
          employeelabel: "कर्मचारीला ठिकाण लिंक करा:",
          branchnamelabel: "ठिकाण नाव",
        },
      }),
    },
    edit_geolocation: {
      message: () => ({
        body: `खालील बटणावर क्लिक करून कर्मचाऱ्यांचे जिओ फेन्सिंग संपादित करा`,
        label: {
          title: "जिओ स्थान संपादित करा",
          workingHoursLabel: "कामगार कामाचे तीन",
          branchLabel: "कर्मचारी",
          timingTypeLabel: "कामगाराचे प्रकार",
          placelabel: "स्थान",
        },
      }),
    },
    "edit-notifs": {
      message: (companyName) => ({
        body: `अपडेट बटणावर क्लिक करून सूचना अपडेट करा.`,
        label: {
          companyNamelabel: companyName,
          Notificationslabel: "सूचना",
          dailyreportlabel: "रोजची सकाळची अहवाल",
          dailyeveningreportlabel: "रोजची संध्याकाळची अहवाल",
          monthendlabel: "महिन्याचा अंत अहवाल",
        },
        buttons: [
          { id: "checkIn", title: "चेक-इन" },
          { id: "checkOut", title: "चेक-आउट" },
          { id: "leaveRequest", title: "अवकाश विनंती" },
          { id: "support", title: "समर्थन विनंती" },
        ],
      }),
    },
    "notification-settings": {
      message: () =>
        `आमच्या नवीनतम वैशिष्ट्यासह तुमचा व्यवस्थापकीय अनुभव वर्धित करा - सूचना संपादित करा बटण\n\nचेक इन: तुमचे कर्मचारी चेक-इन केल्यावर सूचना प्राप्त करा.\nचेक आउट: तुमचे कर्मचारी चेक-आउट केल्यावर सूचना प्राप्त करा.\nसकाळचा अहवाल: मध्ये एक थेट अहवाल प्राप्त करा सकाळी.\nसंध्याकाळचा अहवाल: संध्याकाळी थेट अहवाल प्राप्त करा.`,
      buttons: [{ id: "edit-notifs", title: "सूचना संपादित करा" }],
    },
    "remove-employees": {
      message: () => ({
        body: `कर्मचारी काढून टाकण्याची प्रक्रिया सुरू करण्यासाठी कृपया खालील बटणावर क्लिक करा.`,
        label: {
          title: "कर्मचारी काढा",
          employeesLabel: "कर्मचारी",
          companylabel: "कंपनीचे नाव",
        },
      }),
    },
    "remove-branch": {
      message: () => ({
        body: `कर्मचार्‍याला ठिकाणाहून काढून टाकण्यास प्रारंभ करण्यासाठी कृपया खालील बटणावर क्लिक करा.`,
        label: {
          title: "कर्मचाऱ्यांना जागेवरून काढा",
          branchLabel: "ठिकाणे",
          employeesLabel: "कर्मचारी",
          companylabel: "कंपनीचे नाव",
        },
      }),
    },
    "live-report-templates": {
      message: () => ({
        employees: "कर्मचारी",
        onTime: "वेळेस",
        late: "उशीरा",
        absent: "गैरहाजिर",
        onLeave: "छुट्टीवर",
        attendance: "उपस्थिती",
        employee: "कर्मचारी",
        shiftStatus: "शिफ्ट आणि स्थिती",
        checkIn: "चेक इन",
        checkOut: "चेक आउट",
        requiredTime: "आवश्यक वेळ",
        actualTime: "वास्तविक वेळ",
        shiftDuration: "शिफ्ट अवधि",
        leaveRequests: "अवकाश विनंती",
        leaveType: "अवकाश प्रकार",
        startDate: "सुरूवात तारीख",
        endDate: "समाप्ती तारीख",
        status: "स्थिती",
      }),
    },
    "employee-report-templates": {
      message: () => ({
        present: "उपस्थित",
        absent: "अनुपस्थित",
        leaves: "अवकाश",
        attendance: "उपस्थिती",
        date: "तारीख",
        shiftStatus: "शिफ्ट आणि स्थिती",
        checkIn: "चेक इन",
        checkOut: "चेक आउट",
        requiredTime: "आवश्यक समय",
        actualTime: "वास्तविक समय",
        shiftDuration: "शिफ्ट कालावधी",
        leaveRequests: "अवकाश विनंती",
        leaveType: "अवकाश प्रकार",
        startDate: "सुरूवात तारीख",
        endDate: "समाप्ती तारीख",
        status: "स्थिती",
      }),
    },
    "emp-attendance-templates": {
      message: () => ({
        employeeAttendenceLogs: "कर्मचारी हजर लॉग्स",
        totalTickets: "एकूण टिकिट्स",
        ticketOpen: "टिकिट उघडीत",
        ticketClosed: "टिकिट बंद",
        employeeAttendenceLog: "कर्मचारी हजर लॉग",
      }),
    },
    "all-emp-ticket-templates": {
      message: () => ({
        employeeTickets: "कर्मचारी टिकिट्स",
        totalTickets: "एकूण टिकिट्स",
        ticketOpen: "टिकिट उघडीत",
        ticketClosed: "टिकिट बंद",
        ticketsOpen: "टिकिट्स उघडीत",
        ticketsClosed: "टिकिट्स बंद",
      }),
    },
    "all-emp-report-templates": {
      message: () => ({
        employeesLabel: "कर्मचारी",
        employeesInfo: "कर्मचारी माहिती",
        employee: "कर्मचारी",
        position: "स्थिती",
        shiftTimings: "शिफ्ट वेळ",
        joiningDate: "सामील होण्याची तारीख",
      }),
    },
    addBranch: {
      message: () => ({
        body: `"स्थान जोडा" बटणावर क्लिक करून ठिकाण जोडा.`,
        label: {
          title: "Geo Fencing",
          heading: "Place Coordinates",
          rangelabel: "Range",
          rangeheadinglabel: "Range must be 200 meters and above",
          branchnamelabel: "Place Name",
        },
      }),
    },
    delete: {
      message: () =>
        `नमस्कार, कृपया खालील पर्याय निवडा:\n1. कर्मचाऱ्यांना काढून टाका: कर्मचाऱ्यांना संस्थेतून काढून टाका.\n२. ठिकाण काढून टाका: कर्मचाऱ्यांना ठिकाणाहून काढून टाका`,
      buttons: [
        { id: "remove-employees", title: "कर्मचारींचं निरसन" },
        { id: "remove-branch", title: "जागा काढा" },
      ],
    },
    dateRangeReport: {
      message: () => ({
        body: `आम्ही तुमच्या पुनरावलोकनासाठी सर्वसमावेशक तारीख श्रेणी अहवाल तयार केला आहे. कृपया तुमची पसंतीची तारीख श्रेणी निर्दिष्ट करा आणि आम्ही तुम्हाला तत्काळ अंतर्दृष्टी आणि विश्लेषण प्रदान करू.`,
        label: {
          title: "तारीख सीमा अहवाल",
          startdatelabel: " प्रारंभ तारीख",
          enddatelabel: "समाप्त तारीख",
        },
      }),
    },
    attendanceManagement: {
      message: () => ({
        body: `ऑटोवॉट उपस्थिति प्रबंधन चैट बॉटमध्ये आपले स्वागत आहे।`,
        label: {
          label1: "रिपोर्ट आणि मंजूरी",
          label2: "रिपोर्ट",
          label3: "संघ",
          label7: "स्थान संपादित करा",
          label9: "स्थाने हटवा",
          label10: "एडिट शिफ्ट टाइमिंग",
          label11: "कर्मचारी हटवा",
          labeldelete: "हटवा विकल्प",
          labeledit: "संपादन क्षमता",
          labelbusiness: "व्यापार सेटिंग्ज",
          labelBussinessRadio: "एडिट बिजनेस सेटिंग्स",
          reportsdd: [
            {
              id: "yesterdayreport",
              title: "कालचा रिपोर्ट",
            },
            {
              id: "currentmonth",
              title: "चालू महिना",
            },
            {
              id: "customdaterangepdf",
              title: " तारीख रिपोर्ट(PDF)",
            },
            {
              id: "allEmployees",
              title: "सर्व कर्मचारीरिपोर्ट",
            },
          ],
          quick: [
            {
              id: "livereport",
              title: "लाइव रिपोर्ट ",
            },
            {
              id: "leaveApprovals",
              title: "अवकाश मंजूरी",
            },
            {
              id: "attendanceCorrections",
              title: "उपस्थिति सुधारणा",
            },
            {
              id: "supportTickets",
              title: "समर्थन तिकिटे",
            },
            {
              id: "taskApprovals",
              title: "कार्य मंजूरी",
            },
            {
              id: "broadcast",
              title: "प्रसारित करा",
            },
          ],
          labelBussinessList: [
            {
              id: "editBusiness",
              title: "एडिट बिजनेस सेटिंग्स",
            },
          ],
        },
      }),
    },
    contacts: {
      message: () => `क्षमस्व! तुम्ही संपर्क अपलोड करू शकत नाही.`,
    },
    contactsUpdate: {
      message: () =>
        `मला तुम्हाला कळविण्यात आनंद होत आहे की कर्मचारी तपशील यशस्वीरित्या अद्यतनित केले गेले आहेत.`,
    },
    placeCreated: {
      message: () =>
        `आम्ही तुम्हाला कळवू इच्छितो की नवीन ठिकाण आणि जिओ-फेन्सिंग यशस्वीरित्या तयार केले गेले आहे`,
    },
    employeeGeoFencing: {
      message: () =>
        `आम्ही तुम्हाला कळवू इच्छितो की कर्मचारी भू-फेन्सिंग यशस्वीरित्या अद्यतनित केले गेले आहे.`,
    },
    employeeRemove: {
      message: () =>
        `आम्ही तुम्हाला कळवू इच्छितो की कर्मचाऱ्याला संस्थेतून काढून टाकण्यात आले आहे.`,
    },
    employeeRemovePlace: {
      message: () =>
        `आम्ही तुम्हाला कळवू इच्छितो की कर्मचाऱ्यांना ठिकाणाहून काढून टाकण्यात आले आहे`,
    },
    placeDeleted: {
      message: () => `ठिकाण यशस्वीरित्या हटवले गेले आहे.`,
    },
    broadcast: {
      message: () => ({
        body: `तुमचा संदेश तुमच्या सर्व कर्मचाऱ्यांना प्रसारित करा`,
        label: {
          broadcastLabel: "प्रसार संदेश",
          filesLabel: "फाइलें",
          employeesLabel: "कर्मचारी",
          fileRadios: [
            {
              id: "document",
              title: "डॉक्यूमेंट",
            },
            {
              id: "image",
              title: "इमेज",
            },
            {
              id: "video",
              title: "वीडियो",
            },
          ],
        },
        list: {},
      }),
    },
  },
  Tamil: {
    hi: {
      message: (name) =>
        `வணக்கம் ${name}\n நீங்கள் அசிவிக்கு உதவ விருந்தினார் உங்கள் பரிசோதனை பாட்.`,
      buttons: [
        {
          id: "MarkAttendance",
          title: "காலம் குறித்த பதிவு",
        },
        {
          id: "Report",
          title: "அறிக்கை",
        },
        {
          id: "Other",
          title: "பிற விசைகள்",
        },
      ],
    },
    MarkAttendance: {
      message: () =>
        "*காலம் குறித்த பதிவு*\n\n- வேலைக் காலத்தின் ஆரம்பம் குறிக்க [IN] ஐ அழுத்தவும்.\n- வேலைக் காலத்தின் முடிவுக்கு [OUT] ஐ அழுத்தவும்.",
      buttons: [
        { id: "in", title: "🟢 IN" },
        { id: "out", title: "🔴 OUT" },
      ],
    },
    in: {
      message: () =>
        "*இடம்* \n📍 தற்போதைய இடம் பகிர்ந்துக்கொள்ளுங்கள் இந்த படிவத்தை அடையவும்:\n1. 📩 இந்த செய்தியை தேர்வு செய்க.\n2. 💬 'பதிலளிக்கவும்' என்பதை அழுத்துக.\n3. 📎 அடையும் அல்லது கிளிப்பு ஐகளைக் கிளிக் செய்யுங்கள்.\n4. 📍 'இடம்' ஐ தேர்வுசெய்யுங்கள்.\n5. ✅ 'உங்கள் தற்போதைய இடம் அனுப்புக' என்பதை தேர்வுசெய்யுங்கள்.",
    },
    out: {
      message: () =>
        "*இடம்* \n📍 தற்போதைய இடம் பகிர்ந்துக்கொள்ளுங்கள் இந்த படிவத்தை அடையவும்:\n1. 📩 இந்த செய்தியை தேர்வு செய்க.\n2. 💬 'பதிலளிக்கவும்' என்பதை அழுத்துக.\n3. 📎 அடையும் அல்லது கிளிப்பு ஐகளைக் கிளிக் செய்யுங்கள்.\n4. 📍 'இடம்' ஐ தேர்வுசெய்யுங்கள்.\n5. ✅ 'உங்கள் தற்போதைய இடம் அனுப்புக' என்பதை தேர்வுசெய்யுங்கள்.",
    },
    attendanceLocation: {
      message: () =>
        "📸 அசிவுக்கு, அனுப்ப ஒரு செல்ஃபி உங்கள் இருப்பு பரிமாணத்தைக் காட்டும் படம் அனுப்புங்கள்.",
    },
    clickAttendanceLocation: {
      message: () =>
        "*⚠️ உங்கள் இருப்புக்கு செய்தியை அனுப்ப வேண்டாம்* . முதலில் உங்கள் *பதிலளிக்கின்றீர்கள்*, பின் 'உங்கள் தற்போதைய இடம் அனுப்புக' என்பதை தேர்வுசெய்யுங்கள்.\n📍 தற்போதைய இருப்பு பரிமாணத்தைக் காட்டும் படம் அனுப்புக.",
    },
    locNotInRange: {
      message: () =>
        `🚫 மன்னிக்கவும், உங்கள் இருப்பிடத்தையும் 📍 வருகையையும் ⏲️ தற்போது பதிவு செய்ய முடியவில்லை. நீங்கள் நிறுவனத்தின் வரம்பிற்குள் இல்லை🚷. தயவு செய்து நிறுவனத்தின் வரம்பிற்குள் சென்று, தொடக்கத்தில் இருந்து மீண்டும் முயற்சிக்கவும் 🔁.👣`,
    },
    attendancePic: {
      message: () => "📸 உங்கள் செல்ஃபி படத்தை அனுப்புங்கள் 🤳.",
    },
    Report: {
      message: () => "உங்கள் தற்போதைய மாதத்தை அறிக்கை அல்லது முந்தைய மாதத்தை பதிவிறக்கவும்",
      buttons: [
        {
          id: "currentMonth",
          title: "தற்போதைய மாதம்",
        },
        // {
        //   id: 'previousMonth',
        //   title: 'முந்தைய மாதம்',
        // },
      ],
    },
    Other: {
      message: () =>
        "வணக்கம்! நீங்கள் இன்னும் என்ன உதவ விரும்பினால் தயவுசெய்து பின்வரும் விருப்பங்களில் ஒன்றை தேர்ந்தெடுக்கவும்.",
      buttons: [
        {
          id: "requestLeave",
          title: "அவகாதம் கேட்கவும்",
        },
        {
          id: "support",
          title: "ஆதரவு",
        },
        // {
        //   id: 'question',
        //   title: 'கேள்கை',
        // },
      ],
    },
    startLeaveRequest: {
      message: () =>
        "நாங்கள் வெற்றிகரமாக அட்டெண்டன்ஸ் டெமோவை முடித்துள்ளோம். அடுத்த டெமோ நீங்கள் விடுமுறைக்கு எப்படி கோரிக்கை விடுக்கலாம் என்பதுதான்.",
      buttons: [{ id: "requestLeave", title: "Start Request Leave" }],
    },
    requestLeave: {
      message: () =>
        "குடியிருப்பை குறைய விரும்பினால்?\nநீங்கள் எந்த நாட்கள் அவகாதம் கேட்க விரும்புகின்றீர்கள் என்று தெரிக்கின்றனர்:",
      buttons: [
        { id: "oneDay", title: "ஒரு நாள்" },
        { id: "moreThanOneDay", title: "ஒரு நாள் கூட அதிகம்" },
      ],
    },
    uploadEmployee: {
      message: () =>
        "தயவுசெய்து உங்கள் அனைத்து ஊழியர்களின் தொடர்பு தகவல்களை பதிவிறக்கம் செய்யவும்.",
    },
    oneDay: {
      message: () => ({
        body: "தயவுசெய்து கீழே உள்ள பொத்தானை அழுத்தி தெரிவிக்கவும்",
        label: {
          title: "குறிப்பு அனுமதி",
          startdatelabel: "தொடக்க தேதி",
          enddatelabel: "முடிவு தேதி",
          reasonlabel: "காரணம் அவகாசம்",
        },
      }),
    },
    moreThanOneDay: {
      message: () => ({
        body: "தயவுசெய்து கீழே உள்ள பொத்தானை அழுத்தி தெரிவிக்கவும்",
        label: {
          title: "குறிப்பு அனுமதி",
          startdatelabel: "தொடக்க தேதி",
          enddatelabel: "முடிவு தேதி",
          reasonlabel: "காரணம் அவகாசம்",
        },
      }),
    },
    leaveSummary: {
      message: (
        employeeName,
        department,
        leaveType,
        startDate,
        endDate,
        reasonForLeave,
        ticketNumber,
        recipientPhone
      ) =>
        `பெயர்: *${employeeName}*\nபிரிவு: *${
          department ?? "-"
        }* \nகுறிப்பிட்டது: *${leaveType}*\nஆரம்ப தேதி: *${startDate}*\n${
          endDate !== "Invalid Date" ? `முடிவு தேதி: *${endDate}*\n` : ""
        }காரணம்: *${reasonForLeave}*\nஎண் : *${recipientPhone}* \nடிக்கெட் எண் : *${ticketNumber}*`,
    },
    support: {
      message: () =>
        "வருக! நீங்கள் உங்களுக்கு உதவ இங்கே உள்ளோம். தயவுசெய்து நீங்கள் எந்த சிக்கல்களில் உள்ளீர்கள் என்பதை தேர்வு செய்க:",
      buttons: [
        {
          title: `🔎 சிக்கல்கள்`,
          headers: `🔎 சிக்கல்கள்`,
          rows: [
            {
              id: "check-in",
              title: "செக் இன்",
              description: "செக் இன் சிக்கல்",
            },
            {
              id: "check-out",
              title: "செக் ஔட்",
              description: "செக் ஔட் சிக்கல்",
            },
            {
              id: "salary-issue",
              title: "சம்பள சிக்கல்",
              description: "சம்பள சிக்கல்",
            },
            {
              id: "other-issue",
              title: "மற்றவை ❓",
              description: "மற்ற சிக்கல்",
            },
          ],
        },
      ],
    },
    checkIn: {
      message: () => "தயவுசெய்து உங்கள் கருத்தை டைப் செய்யவும்.",
    },
    checkOut: {
      message: () => "தயவுசெய்து உங்கள் கருத்தை டைப் செய்யவும்.",
    },
    other_issue: {
      message: () => "தயவுசெய்து உங்கள் கருத்தை டைப் செய்யவும்.",
    },
    Salary_Issue: {
      message: () => "தயவுசெய்து உங்கள் கருத்தை டைப் செய்யவும்.",
    },
    employeeIssue: {
      message: () => "உங்கள் கருத்தை அளிக்கவும்.",
    },
    sendIssue: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `பெயர்: *${name}*\nபிரிவு: *${
          department ?? "-"
        }*\nபராமர்பல் பரிசிக்கல் : *${problem}*\nகருத்து : *${message}*\nதொலைபேசி எண் : *${recipientPhone}*\nடிக்கெட் எண் : *${ticketNumber}*`,
      buttons: (employeeNumber, ticketNumber) => [
        { title: "அங்கீகரிக்க", id: `issue_approve-${employeeNumber}-${ticketNumber}` },
        { title: "நிராகரிக்க", id: `issue_reject-${employeeNumber}-${ticketNumber}` },
        { title: "கைகொள்", id: `issue_hold-${employeeNumber}-${ticketNumber}` },
      ],
    },
    sendLeave: {
      message: (employeeName, leaveType, startDate, endDate, reason) =>
        `*விடுப்பு கோரிக்கை அறிவிப்பு* \n👤 பணியாளர் பெயர்: ${employeeName}\nவிடுப்பு வகை: ${leaveType}\nதொடக்க தேதி: *${startDate}*\n${
          endDate !== "Invalid Date" ? `முடிவு தேதி: *${endDate}*\n` : ""
        }\nகாரணம்: ${reason}தயவுசெய்து மதிப்பாய்வு செய்து தேவையான நடவடிக்கை எடுக்கவும்.`,
      buttons: (employeePhone, ticketNumber) => [
        {
          id: `request_approve-${employeePhone}-${ticketNumber}`,
          title: "ஒப்புதல்",
        },
        {
          id: `request_reject-${employeePhone}-${ticketNumber}`,
          title: "நிராகரிக்கின்றன",
        },
        {
          id: `request_hold-${employeePhone}-${ticketNumber}`,
          title: "பிடி",
        },
      ],
    },
    registerComplain: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `பெயர்: *${name}*\nபிரிவு: *${
          department ?? "-"
        }*\nபராமர்பல் பரிசிக்கல் : *${problem}*\nகருத்து : *${message}*\nதொலைபேசி எண் : *${recipientPhone}*\nடிக்கெட் எண் : *${ticketNumber}*`,
    },
    approvals: {
      buttons: [
        { title: "அவதிச் செய்ய", id: "leaveApprove" },
        { title: "செயல் சிக்கல்கள்", id: "activeIssues" },
      ],
      message: () =>
        `வணக்கம், தயவுசெய்து கீழே உள்ள விருப்பத்தைத் தேர்வு செய்யவும்:\n 1️⃣ அவதிச் செய்ய விருப்பத்தைத் தேர்வு செய்யவும்.\n 2️⃣ உங்கள் அனுமதியை கொண்டிருக்கும் செயல் சிக்கல்களைப் பார்க்க மேலும் குடுக்கவும்!\nசெயல்பட்டியில் பொத்தானை அழுத்த அதிசாய பொத்தானைத் தேர்ந்தெடுக்கவும்!`,
    },
    leaveApprove: {
      message: () =>
        `*பணியாளர் விடுப்பு அறிவிக்கப்பட்டுள்ளது*\nஅன்புள்ள முதலாளி, ஒரு பணியாளரின் விடுப்பு கோரிக்கை\n *டிக்கெட் எண்: RL4545* \n *பெயர்*: ராம் \n *தேதிகள்*: 23/12/2023 \n *காரணம்* : திருமணம் \n *வகை* : விடுப்புக் கோரிக்கை`,
      buttons: [
        { title: "அங்கீகரிக்க", id: "request_approve" },
        { title: "நிராகரிக்க", id: "request_reject" },
        { title: "கைகொள்", id: "request_hold" },
      ],
    },
    activeIssues: {
      message: () =>
        `*பணியாளர் பிரச்சினை அறிக்கை*\nஅன்புள்ள முதலாளி, ஒரு ஊழியர் புகாரளித்த ஒரு சிக்கல் உள்ளது:\n *பணியாளர் பெயர்* : ஷாம் \n *சிக்கல்* : சம்பளம் \n *சிக்கல் விவரம்* : சம்பளம் குறைவாக வரவு வைக்கப்பட்டுள்ளது\nதயவுசெய்து தகுந்த நடவடிக்கை எடுக்கவும் இந்த கவலையை நிவர்த்தி செய்ய.`,
      buttons: [
        { title: "அங்கீகரிக்க", id: "issue_approve" },
        { title: "நிராகரிக்க", id: "issue_reject" },
        { title: "கைகொள்", id: "issue_hold" },
      ],
    },
    issue_approve: {
      message: () =>
        "நிலை புதுப்பிப்பு: அங்கீகரிக்கப்பட்டது\nஉங்கள் கோரிக்கை/விண்ணப்பம் அங்கீகரிக்கப்பட்டது என்பதை மகிழ்ச்சியுடன் தெரிவித்துக் கொள்கிறோம்!\nஉங்கள் பொறுமை மற்றும் ஒத்துழைப்புக்கு நன்றி.",
    },
    issue_reject: {
      message: () =>
        "நிலை புதுப்பிப்பு: நிராகரிக்கப்பட்டது \nஉங்கள் கோரிக்கை/விண்ணப்பம் நிராகரிக்கப்பட்டது என்பதை உங்களுக்குத் தெரிவிக்க வருந்துகிறோம்.\nஉங்கள் புரிதலைப் பாராட்டுகிறோம்.",
    },
    issue_hold: {
      message: () =>
        "நிலை புதுப்பிப்பு: நிறுத்தி வைக்கப்பட்டுள்ளது \nஉங்கள் கோரிக்கை/விண்ணப்பம் தற்போது நிறுத்தி வைக்கப்பட்டுள்ளது, நாங்கள் நிலைமையை மதிப்பாய்வு செய்து மதிப்பீடு செய்கிறோம்.\nஇந்த நேரத்தில் உங்கள் பொறுமையை நாங்கள் பாராட்டுகிறோம்.",
    },
    request_approve: {
      message: () =>
        `*விடுப்புக் கோரிக்கை புதுப்பிப்பு*: அங்கீகரிக்கப்பட்டது\nஉங்கள் விடுப்புக் கோரிக்கை ஏற்கப்பட்டது என்பதைத் தெரிவித்துக் கொள்வதில் மகிழ்ச்சி அடைகிறோம்!\nஉங்கள் பொறுமைக்கும் ஒத்துழைப்பிற்கும் நன்றி.`,
    },
    request_reject: {
      message: () =>
        `*விடுப்புக் கோரிக்கை புதுப்பிப்பு*: நிராகரிக்கப்பட்டது \nஉங்கள் விடுப்புக் கோரிக்கை நிராகரிக்கப்பட்டது என்பதை உங்களுக்குத் தெரிவிக்க வருந்துகிறோம்.\nஉங்கள் புரிதலைப் பாராட்டுகிறோம்.`,
    },
    request_hold: {
      message: () =>
        `*விடுப்பு கோரிக்கை புதுப்பிப்பு*: நிறுத்தி வைக்கப்பட்டுள்ளது \nஉங்கள் விடுப்பு கோரிக்கை தற்போது நிறுத்தி வைக்கப்பட்டுள்ளது, நாங்கள் நிலைமையை மதிப்பாய்வு செய்து மதிப்பிடுகிறோம்.\nஇந்த நேரத்தில் உங்கள் பொறுமையை நாங்கள் பாராட்டுகிறோம்.`,
    },
    addEmployee: {
      message: (employeeName, employeeNumber, timing, geofen) =>
        `சேர்க்கின்றது:\n*பெயர்*: ${employeeName}\n*எண்*: ${employeeNumber}\n*வகை*: ${timing}\n*புகார் கிண்டுவா*: ${geofen}`,
    },
    editEmployee: {
      message: () => ({
        body: `பணியாளரைத் திருத்து பொத்தானைக் கிளிக் செய்து படிவத்தை நிரப்பவும்.`,
        label: {
          title: "பணியாளர் விவரங்களை திருத்து",
          employeeNameLabel: "பணியாளரின் பெயர்",
          employeeNumberLabel: "பணியாளர் மொபைல் எண்",
          timingTypeLabel: "நேர வகை",
          workingHoursNote: "விருப்பமான வேலை மணிகள்",
          checkInOutNote: "நிர்வாகித்த நேரம்: செக்-இன் மற்றும் செக்-ஆவுட்",
          checkInLabel: "செக்-இன்",
          checkOutLabel: "செக்-ஆவுட்",
          workingHoursLabel: "வேலை மணிகள்",
          designationLabel: "பதவி",
          branchLabel: "இடம்",
          joiningDateLabel: "சேரும் தேதி",
          dobLabel: "பிறந்த தேதி",
        },
        list: {
          timingTyperadio: [
            {
              id: "Flexible",
              title: "சொல்லுதல் நேரம்",
            },
            {
              id: "Fixed",
              title: "நிலையான நேரம்",
            },
          ],
          shiftTyperadio: [
            {
              id: "day",
              title: "நாள் முழுவதும்",
            },
            {
              id: "day/night",
              title: "நாள்/இரவு முழுவதும்",
            },
          ],
          workdaysList: [
            {
              id: "0",
              title: "ஞாயிறு",
            },
            {
              id: "1",
              title: "திங்கள்",
            },
            {
              id: "2",
              title: "செவ்வாய்",
            },
            {
              id: "3",
              title: "புதன்",
            },
            {
              id: "4",
              title: "வியாழன்",
            },
            {
              id: "5",
              title: "வெள்ளி",
            },
            {
              id: "6",
              title: "சனிக்கிழமை",
            },
          ],
          proofList: [
            {
              id: "location",
              title: "இடம்",
            },
            {
              id: "image",
              title: "புகைப்படம்",
            },
            {
              id: "logs",
              title: "பதிவுகள்",
            },
          ],
        },
      }),
    },
    ticketUpdate: {
      message: (ticketNumber) => `டிக்கெட் எண்: ${ticketNumber} விருப்பமாக புதுப்பிக்கப்பட்டுள்ளது`,
    },
    employerStart: {
      message: () =>
        `வணக்கம், பின்வரும் தேர்வுகளில் இருந்து ஒரு விருப்பத்தைத் தேர்ந்தெடுக்கவும்:\n\n1️⃣. அறிக்கையைப் பெறவும்: விரிவான அறிக்கையைப் பெற இந்தப் பொத்தானைக் கிளிக் செய்யவும்..\n2️⃣. ஒப்புதல்கள்: பணியாளர் விடுப்பு அனுமதிகளை சரிபார்க்க அல்லது நிர்வகிக்க வேண்டுமா? வழிசெலுத்த இந்த பொத்தானைப் பயன்படுத்தவும்\n3️⃣. சுயவிவரம்/அமைப்புகள்: உங்கள் சுயவிவரத்தையும் அமைப்புகளையும் இங்கே நிர்வகிக்கவும்.`,
      buttons: [
        { id: "employerReports", title: "அறிக்கைகள் பெற" },
        { id: "approvals", title: "ஒப்புதல்கள்" },
        { id: "profile-settings", title: "சுயவிவர அமைப்புகள்" },
      ],
    },
    employerReports: {
      message: () =>
        "வரவேற்பு! தயவுசெய்து ஒரு விருப்பத்தைத் தேர்ந்தெடுக்கவும்:\n1. நேரடி அறிக்கை: நிகழ்நேர புதுப்பிப்புகளைப் பார்க்கவும்.\n2. நேற்றைய அறிக்கை: நேற்றைய அறிக்கையை அணுகவும்.\n3. பணியாளர் முதன்மை தாள்: பணியாளர் முதன்மை தாளை அணுகவும்.",
      buttons: [
        {
          title: "Reports",
          headers: "Reports",
          rows: [
            {
              id: "liveReport",
              title: "நேரடி அறிக்கை",
              description: "Download Live Report",
            },
            {
              id: "yesterdayReport",
              title: "நேற்றைய அறிக்கை",
              description: "Download Yesterday Report",
            },
            {
              id: "dateRangeReport",
              title: "தேதி வரம்பு அறிக்கை",
              description: "Download Date Range Report",
            },
            {
              id: "emp_master_sheet",
              title: "பணியாளர் அறிக்கை",
              description: "Download Report of all your Employees",
            },
          ],
        },
      ],
    },
    employeeDemoStart: {
      buttons: [{ id: "MarkAttendance", title: "காலாண்டியா அட்டகாசம்" }],
      message: () =>
        "1️⃣ *பணிகள் பார்க்குதல் படிகள்*:\n   a. ✅ காலாண்டியா அட்டகாசம்\n   b. 🙋 விடுதிகோர்க்கா கோரி\n   c. 🎫 ஒரு டிக்கெட் உயர்த்துக\n   d. 📊 அறிக்கை பார்க்க\n2️⃣ *வேலைச்செய்தி படிகள்* (பணிகள் பார்க்குதல் படிகள் முடித்தம் பின்னர்)",
    },
    "addGeo-fencing-emplyer": {
      message: () =>
        `ஜியோ-ஃபென்சிங்கைச் சேர்க்க விரும்புகிறீர்களா, பின்னர் கீழே உள்ள பொத்தானை அழுத்தவும்`,
      buttons: [
        { id: "yes-geofencing", title: "ஆம்" },
        { id: "no-geofencing", title: "இல்லை" },
      ],
    },
    "yes-geofencing": {
      message: () => `உங்கள் அலுவலகத்தின் தற்போதைய இருப்பிடத்தைப் பகிரவும்`,
    },
    "office-geo-fencing": {
      message: () => `உங்கள் அலுவலகத்தின் தற்போதைய இருப்பிடத்தை வழங்கியதற்கு நன்றி`,
    },
    "reminder-in": {
      message: () =>
        `அடுத்த 5 நிமிடங்களில் செக்-அவுட் என்பதைக் குறிக்க இது ஒரு நட்பு நினைவூட்டலாகும்`,
    },
    "reminder-out": {
      message: () =>
        `அடுத்த 5 நிமிடங்களில் செக்-அவுட் என்பதைக் குறிக்க இது ஒரு நட்பு நினைவூட்டலாகும்`,
    },
    employeeUploaded: {
      message: () =>
        "✅ ஊழியர் சுயவிவரம் வெற்றிகரமாக உருவாக்கப்பட்டது.\n\nஊழியரின் WhatsApp எண்ணுக்கு ஒரு ஔபசாரிக அறிவிப்பு மற்றும் வருகை தொடக்க செய்தி அனுப்பப்பட்டுள்ளது.\n\nஊழியர்களுக்கு உடனடியாக டெமோ முடித்து தங்கள் வருகையை குறித்துக்கொள்ள சொல்லுங்கள்.",
    },
    employeeDemoCompleted: {
      message: () =>
        "டெமோ வெற்றிகரமாக முடிந்தது. இந்த எண்ணில் உங்கள் தினசரி வருகையை குறிப்பிட தொடங்குவதற்கு உங்களை கோரப்படுகிறீர்கள். 'ஹாய்' என்று டைப் செய்து எப்போதும் பிரவாகத்தை தொடங்கலாம்.",
    },
    "profile-settings": {
      message: () =>
        `*சுயவிவர அமைப்புகள்*\n\nகீழே ஒரு விருப்பத்தைத் தேர்ந்தெடுக்கவும்:\n\n1. *வணிக அமைப்புகள்*:உங்கள் வணிக விருப்பங்களை உள்ளமைக்கவும்.\n2. *அறிவிப்புகள்*: தினசரி நேரடி அறிக்கைகளுக்கு.\n3. *திருத்து / நீக்கு*\n\ta. ஷிப்ட் நேரத்தைத் திருத்தவும்`,
      // message: () =>
      //   `*சுயவிவர அமைப்புகள்*\n\nகீழே ஒரு விருப்பத்தைத் தேர்ந்தெடுக்கவும்:\n\n1. *வணிக அமைப்புகள்*:உங்கள் வணிக விருப்பங்களை உள்ளமைக்கவும்.\n2. *அறிவிப்புகள்*: தினசரி நேரடி அறிக்கைகளுக்கு.\n3. *திருத்து / நீக்கு*\n\ta. ஜியோ ஃபென்சிங்கைத் திருத்தவும்\n\tb. ஷிப்ட் நேரத்தைத் திருத்தவும்`,
      buttons: [
        {
          id: "business-settings",
          title: "வணிக அமைப்புகள்",
        },
        {
          id: "notification-settings",
          title: "அறிவிப்புகள்",
        },
        {
          id: "edit-delete",
          title: "திருத்து / நீக்கு",
        },
      ],
    },
    "business-settings": {
      message: () => ({
        body: `கீழே உள்ள பொத்தானைக் கிளிக் செய்வதன் மூலம் உங்கள் வணிகத் தகவலைப் புதுப்பிக்கவும். நன்றி!`,
        label: {
          title: "வணிக அமைப்புகளை திருத்து",
          employerNamelabel: "பணியாளர் பெயர்",
          employernolabel: "பணியாளர் எண்",
          bufferTimelabel: "பஃபர் நேரம்",
          companyNamelabel: "கம்பெனி பெயர்",
          monthlySickLeavelabel: "மாதந்திர உடல்நோய் அவகாதம்",
          casualLeavelabel: "பொது அவகாதம்",
          annualLeavelabel: "ஆண்டுக் குழுவுதல்",
          maternityLeaveAllowedlabel: "கர்ப்பகால அவகாதம் அனுமதி",
          paternityLeaveAllowedlabel: "பிதுக்குழு அவகாதம் அனுமதி",
          unpaidLeavePolicylabel: "சம்பளமில்லாத அவகாதம்",
          leaveEncashmentlabel: "அவகாத பணப்பரிவு",
          consequencesUnapprovedLeavelabel: "அனப்ரூவுட் அவகாதம் விளக்கம்",
          halfDayPolicylabel: "அரைநாள் கொள்கை",
          Languagelabel: "மொழி",
          carryForwardLimitlabel: "முன்னூறு எடுத்துக் கொள்கை",
        },
      }),
    },
    "edit-delete": {
      message: () =>
        `திருத்த அல்லது நீக்குவதற்கான விருப்பத்தைத் தேர்ந்தெடுத்துள்ளீர்கள். பின்வரும் அம்சங்களில் இருந்து தேர்வு செய்யவும்\n\n1. ஷிப்ட் நேரங்களைத் திருத்தவும்: நிறுவன நேரத்தை அடிப்படையாகக் கொண்டு பணியாளர் அட்டவணையை சரிசெய்யவும்.\n2. புவி ஃபென்சிங்கைத் திருத்தவும்: புவியியல் எல்லைகள் அல்லது கட்டுப்பாடுகளை மாற்றவும் அல்லது புதுப்பிக்கவும்.\n3.நீக்கு: பணியாளர்கள் தொடர்பான எந்தத் தரவையும் நீக்க இந்த விருப்பம் உங்களை அனுமதிக்கிறது`,
      buttons: [
        { id: "edit-timings", title: "ஷிப்டநேரஙளைத் திருத்" },
        { id: "edit-geo-fencing", title: "ஜியஃபென்சிங்கை திருத" },
        { id: "delete", title: "அழி" },
      ],
    },
    "edit-timings": {
      message: () => ({
        body: `ஷிப்ட் டைமிங்ஸைத் திருத்த, கீழே உள்ள பட்டனை அணுகுவதன் மூலம் பணியாளர் அட்டவணையை நிர்வகிக்கவும் மேம்படுத்தவும். இந்த விஷயத்தில் உங்கள் கவனம் மிகவும் பாராட்டப்படுகிறது. நன்றி.`,
        label: {
          title: "முறையை திருத்தவும்",
          timingTypeLabel: "நேர வகை",
          checkInLabel: "சரிபார் இன்",
          checkOutLabel: "சரிபார் வெளியேறு",
          workingHoursLabel: "வேலைநேர மணம்",
          branchLabel: "கிளைகள்",
          employeesLabel: "பணியாளர்கள்",
          shiftTyperadio: [
            {
              id: "day",
              title: "நாள் முழுவதும்",
            },
            {
              id: "day/night",
              title: "நாள்/இரவு முழுவதும்",
            },
          ],
          timingTyperadio: [
            {
              id: "Flexible",
              title: "சொல்லுதல் நேரம்",
            },
            {
              id: "Fixed",
              title: "நிலையான நேரம்",
            },
          ],
          workdaysList: [
            {
              id: "0",
              title: "ஞாயிறு",
            },
            {
              id: "1",
              title: "திங்கள்",
            },
            {
              id: "2",
              title: "செவ்வாய்",
            },
            {
              id: "3",
              title: "புதன்",
            },
            {
              id: "4",
              title: "வியாழன்",
            },
            {
              id: "5",
              title: "வெள்ளி",
            },
            {
              id: "6",
              title: "சனிக்கிழமை",
            },
          ],
        },
      }),
    },
    "edit-geo-fencing": {
      message: () =>
        `ஜியோ ஃபென்சிங் அமைப்புகளை அணுகுவதற்கும் திருத்துவதற்கும் கீழே உள்ள பொத்தானைப் பயன்படுத்தி, பணியாளர் இருப்பிடங்களின் மீது துல்லியமான கட்டுப்பாட்டை உறுதி செய்யவும். இந்த பணியில் உங்கள் கவனம் மதிப்புக்குரியது. நன்றி`,
    },
    link_employee: {
      message: () => ({
        body: `புதிய இடம் மற்றும் பணியாளர்களை இடத்தில் சேர்க்கவும்`,
        label: {
          title: "ஜியோ பரிவர்த்தனை",
          heading: "இடம் அருகிலுள்ள அமைப்புகள்",
          rangelabel: "பரிசோதனை",
          rangeheadinglabel: "பரிசோதனை 50 மீட்டருக்கும் மேலும் இருக்க வேண்டும்",
          employeelabel: "உங்கள் இடம் கிளையை இணைக்க:",
          branchnamelabel: "இடம் பெயர்",
        },
      }),
    },
    edit_geolocation: {
      message: () => ({
        body: `கீழே உள்ள பொத்தானைக் கிளிக் செய்வதன் மூலம் ஊழியர்களின் ஜியோ ஃபென்சிங்கைத் திருத்தவும்`,
        label: {
          title: "ஜியோ இருப்பிடத்தை திருத்து",
          workingHoursLabel: "பணியாளர் நேர அவகாஶம்",
          branchLabel: "பணியாளர்",
          timingTypeLabel: "நேர வகை",
          placelabel: "இடம்",
        },
      }),
    },
    "edit-notifs": {
      message: (companyName) => ({
        body: `புதுப்பிப்பு பொத்தானைக் கிளிக் செய்வதன் மூலம் அறிவிப்புகளைப் புதுப்பிக்கவும்.`,
        label: {
          companyNamelabel: companyName,
          Notificationslabel: "அறிவிப்புகள்",
          dailyreportlabel: "தினசரி காலை அறிகுறி",
          dailyeveningreportlabel: "தினசரி சாய்ந்திரம் அறிகுறி",
          monthendlabel: "மாதம் முடிந்து அறிகுறி",
        },
        buttons: [
          { id: "checkIn", title: "செக்-இன்கள்" },
          { id: "checkOut", title: "செக்-அவுட்கள்" },
          { id: "leaveRequest", title: "அவகை கோரிக்கைகள்" },
          { id: "support", title: "ஆதரவு கோரிக்கை" },
        ],
      }),
    },
    "notification-settings": {
      message: () =>
        `எங்களின் சமீபத்திய அம்சத்துடன் உங்கள் நிர்வாக அனுபவத்தை மேம்படுத்தவும் - அறிவிப்பைத் திருத்து பொத்தான்\n\nசெக்-இன்: உங்கள் ஊழியர்கள் செக்-இன் செய்யும்போது அறிவிப்பைப் பெறுங்கள்.\nசெக்-அவுட்: உங்கள் பணியாளர்கள் செக்-அவுட் செய்யும் போது அறிவிப்பைப் பெறுங்கள்.\nகாலை அறிக்கை: நேரலை அறிக்கையைப் பெறுங்கள் காலை.\nமாலை அறிக்கை: மாலை நேரலை அறிக்கையைப் பெறவும்.`,
      buttons: [{ id: "edit-notifs", title: "அறிவிப்புகளைத் திருத" }],
    },
    "remove-employees": {
      message: () => ({
        body: `பணியாளரை அகற்றும் செயல்முறையைத் தொடங்க கீழே உள்ள பொத்தானைக் கிளிக் செய்யவும்.`,
        label: {
          title: "பணியாளர்களை அகற்று",
          employeesLabel: "பணியாளர்கள்",
          companylabel: "நிறுவனத்தின் பெயர்",
        },
      }),
    },
    "remove-branch": {
      message: () => ({
        body: `பணியாளரை இடத்திலிருந்து அகற்றுவதற்கு கீழே உள்ள பொத்தானைக் கிளிக் செய்யவும்.`,
        label: {
          title: "பணியாளர்களை இடத்திலிருந்து அகற்றவும்",
          branchLabel: "இடங்கள்",
          employeesLabel: "பணியாளர்கள்",
          companylabel: "நிறுவனத்தின் பெயர்",
        },
      }),
    },
    "live-report-templates": {
      message: () => ({
        employees: "பணியாளர்கள்",
        onTime: "நேரத்தில்",
        late: "தாமதம்",
        absent: "இல்லை",
        onLeave: "அவகாஶம் உள்ளது",
        attendance: "ஹாஜர்",
        employee: "பணியாளர்",
        shiftStatus: "ஷிஃப்டு & நிலை",
        checkIn: "செக் இன்",
        checkOut: "செக் ஆவுட்",
        requiredTime: "தேவையான நேரம்",
        actualTime: "உண்டாக்கப்பட்ட நேரம்",
        shiftDuration: "ஷிஃப்டு காலம்",
        leaveRequests: "அவகாஶ கோரிக்கைகள்",
        leaveType: "அவகாஶ வகை",
        startDate: "ஆரம்ப தேதி",
        endDate: "முடிவு தேதி",
        status: "நிலை",
      }),
    },
    "employee-report-templates": {
      message: () => ({
        present: "உள்ளோர்",
        absent: "இல்லை",
        leaves: "அவகாசங்கள்",
        attendance: "ஹாஜரி",
        date: "தேதி",
        shiftStatus: "மாறு & நிலை",
        checkIn: "சரிபார்க்க",
        checkOut: "சரிபார்க்க",
        requiredTime: "தேவையான நேரம்",
        actualTime: "உண்டாக்கப்பட்ட நேரம்",
        shiftDuration: "மாறு காலம்",
        leaveRequests: "அவகாச கேட்கைகள்",
        leaveType: "அவகாச வகை",
        startDate: "ஆரம்ப தேதி",
        endDate: "முடிவு தேதி",
        status: "நிலை",
      }),
    },
    "emp-attendance-templates": {
      message: () => ({
        employeeAttendenceLogs: "ஊழியர் உபஸ்திதி பதிவுகள்",
        totalTickets: "மொத்த டிக்கெட்கள்",
        ticketOpen: "டிக்கெட் திறக்கப்பட்டது",
        ticketClosed: "டிக்கெட் மூடப்பட்டது",
        employeeAttendenceLog: "ஊழியர் உபஸ்திதி பதிவு",
      }),
    },
    "all-emp-ticket-templates": {
      message: () => ({
        employeeTickets: "பணியாளர் டிக்கெட்கள்",
        totalTickets: "மொத்த டிக்கெட்கள்",
        ticketOpen: "டிக்கெட் திறக்கப்பட்டது",
        ticketClosed: "டிக்கெட் மூடப்பட்டது",
        ticketsOpen: "டிக்கெட்கள் திறந்து",
        ticketsClosed: "டிக்கெட்கள் மூடப்பட்டன",
      }),
    },
    "all-emp-report-templates": {
      message: () => ({
        employeesLabel: "பணியாளர்கள்",
        employeesInfo: "பணியாளர்கள் தகவல்",
        employee: "பணியாளர்",
        position: "பதவி",
        shiftTimings: "மாறு நேரம்",
        joiningDate: "சேருதல் தேதி",
      }),
    },
    addBranch: {
      message: () => ({
        body: `"இடத்தைச் சேர்" பொத்தானைக் கிளிக் செய்வதன் மூலம் இடத்தைச் சேர்க்கவும்.`,
        label: {
          title: "Geo Fencing",
          heading: "Place Coordinates",
          rangelabel: "Range",
          rangeheadinglabel: "Range must be 200 meters and above",
          branchnamelabel: "Place Name",
        },
      }),
    },
    delete: {
      message: () =>
        `வணக்கம், கீழே ஒரு விருப்பத்தைத் தேர்ந்தெடுக்கவும்:\n1. பணியாளர்களை அகற்று: நிறுவனத்தில் இருந்து பணியாளர்களை அகற்றவும்.\n2. இடத்தை அகற்று: இடத்திலிருந்து பணியாளர்களை அகற்று`,
      buttons: [
        { id: "remove-employees", title: "பணியாளர்களை நீக" },
        { id: "remove-branch", title: "இடம் அகற்றவும்" },
      ],
    },
    dateRangeReport: {
      message: () => ({
        body: `உங்கள் மதிப்பாய்வுக்காக விரிவான தேதி வரம்பு அறிக்கையை நாங்கள் தயார் செய்துள்ளோம். உங்கள் விருப்பமான தேதி வரம்பைக் குறிப்பிடவும், நாங்கள் உங்களுக்கு நுண்ணறிவு மற்றும் பகுப்பாய்வுகளை உடனடியாக வழங்குவோம்.`,
        label: {
          title: "தேதி வரி அறிக்கை",
          startdatelabel: " தொடக்க தேதி",
          enddatelabel: "முடிவு தேதி",
        },
      }),
    },
    attendanceManagement: {
      message: () => ({
        body: `ஆட்டோவாட் காலநிரந்தர பரிசோதனை மேலாண்மை சேவையில் உங்களை வரவேற்கிறோம்.`,
        label: {
          label1: "அறிக்கைகள் ஒப்புதல",
          label2: "அறிக்கைகள்",
          label3: "குழு",
          label7: "இடங்களைத் திருத்து",
          label9: "இடங்களை நீக்கு",
          label10: "ஷிப்ட் நேரம் திருத்த",
          label11: "பணியாளரை நீக்கு",
          labeldelete: "நீக்கு விருப்பம்",
          labeledit: "தொகுப்பு விருப்பங்கள",
          labelbusiness: "வணிக அமைப்புகள்",
          labelBussinessRadio: "வணிக அமைப்பைத் திருத",
          reportsdd: [
            {
              id: "yesterdayreport",
              title: "நேற்றைய அறிக்கை",
            },
            {
              id: "currentmonth",
              title: "நடப்பு மாதம்",
            },
            {
              id: "customdaterangepdf",
              title: "தேதி அறிக்கை(PDF)",
            },
            {
              id: "allEmployees",
              title: "வணிக அமைப்பைத் திருத",
            },
          ],
          quick: [
            {
              id: "livereport",
              title: "நேரடி அறிக்கை",
            },
            {
              id: "leaveApprovals",
              title: "அனுமதிகளை விடுங்கள்",
            },
            {
              id: "attendanceCorrections",
              title: "வருகை திருத்தம்",
            },
            {
              id: "supportTickets",
              title: "ஆதரவு டிக்கெட்டுகள்",
            },
            {
              id: "taskApprovals",
              title: "பணி ஒப்புதல்",
            },
            {
              id: "broadcast",
              title: "ஒளிபரப்பு",
            },
          ],
          labelBussinessList: [
            {
              id: "editBusiness",
              title: "வணிக அமைப்பைத் திருத",
            },
          ],
        },
      }),
    },
    contacts: {
      message: () => `மன்னிக்கவும்! நீங்கள் தொடர்புகளை பதிவேற்ற முடியாது.`,
    },
    contactsUpdate: {
      message: () =>
        `பணியாளர் விவரங்கள் வெற்றிகரமாக புதுப்பிக்கப்பட்டுள்ளன என்பதைத் தெரிவித்துக் கொள்வதில் மகிழ்ச்சி அடைகிறேன்.`,
    },
    placeCreated: {
      message: () =>
        `புதிய இடமும் புவி வேலியும் வெற்றிகரமாக உருவாக்கப்பட்டன என்பதை உங்களுக்குத் தெரிவிக்க விரும்புகிறோம்`,
    },
    employeeGeoFencing: {
      message: () =>
        `பணியாளர் புவி-வேலி வெற்றிகரமாக புதுப்பிக்கப்பட்டது என்பதை உங்களுக்குத் தெரிவிக்க விரும்புகிறோம்.`,
    },
    employeeRemove: {
      message: () =>
        `நிறுவனத்தில் இருந்து ஊழியர் நீக்கப்பட்டுள்ளார் என்பதை உங்களுக்குத் தெரிவிக்க விரும்புகிறோம்.`,
    },
    employeeRemovePlace: {
      message: () =>
        `ஊழியர்கள் அந்த இடத்திலிருந்து நீக்கப்பட்டுள்ளனர் என்பதைத் தெரிவித்துக் கொள்கிறோம்`,
    },
    placeDeleted: {
      message: () => `இடம் வெற்றிகரமாக நீக்கப்பட்டது.`,
    },
    broadcast: {
      message: () => ({
        body: `உங்கள் எல்லா ஊழியர்களுக்கும் உங்கள் செய்தியை ஒளிபரப்புங்கள்`,
        label: {
          broadcastLabel: "பிரசார செய்தி",
          filesLabel: "கோப்புகள்",
          employeesLabel: "பணியாளர்கள்",
          fileRadios: [
            {
              id: "document",
              title: "ஆவணம்",
            },
            {
              id: "image",
              title: "படம்",
            },
            {
              id: "video",
              title: "காட்சி",
            },
          ],
        },
        list: {},
      }),
    },
  },
  Kannada: {
    hi: {
      message: (name) =>
        `ಹಲೋ ${name}\n ನೀವು ಸಹಾಯಕ್ಕಾಗಿ ಇಲ್ಲಿದ್ದಾರೆ ನಾನು ನಿಮ್ಮ ಸ್ನೇಹಪೂರಿತ ಹೌದು ಬಿಂದು.`,
      buttons: [
        {
          id: "MarkAttendance",
          title: "ಹುಮಾನಿಜಮ ಗಣಾಂಕಚ್ಯು",
        },
        {
          id: "Report",
          title: "ವರದಿ",
        },
        {
          id: "Other",
          title: "ಇತರ",
        },
      ],
    },
    MarkAttendance: {
      message: () =>
        "*ಹುಮಾನಿಜಮ ಗಣಾಂಕಚ್ಯು*\n\n- ತಮ್ಮ ಕೆಲಸದಿನದ ಆರಂಭವನ್ನು ಗಣಾಂಕಿಸಲು [IN] ಕ್ಲಿಕ್ ಮಾಡಿ.\n- ಕೆಲಸದಿನದ ಕೊನೆಯನ್ನು ಗಣಾಂಕಿಸಲು [OUT] ಕ್ಲಿಕ್ ಮಾಡಿ.",
      buttons: [
        { id: "in", title: "🟢 IN" },
        { id: "out", title: "🔴 OUT" },
      ],
    },
    in: {
      message: () =>
        "*ಸ್ಥಳ* \n📍 ದಯವಿಟ್ಟು ಈ ಹೆಜ್ಜೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳಲು ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಸ್ಥಳವನ್ನು ಹಂಚಿಕೊಳ್ಳುವ ಹೆಜ್ಜೆಗಳನ್ನು ಅನುಸರಿಸಿ:\n1. 📩 ಈ ಸಂದೇಶವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.\n2. 💬 'ಉತ್ತರ ನೀಡು' ಕ್ಲಿಕ್ ಮಾಡಿ.\n3. 📎 ಸಂಯೋಜಿಸಿ ಅಥವಾ ಕ್ಲಿಪ್ ಐಕಾನ್ ಕ್ಲಿಕ್ ಮಾಡಿ.\n4. 📍 'ಸ್ಥಳ' ಆಯ್ಕೆ ಮಾಡಿ.\n5. ✅ 'ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಸ್ಥಳವನ್ನು ಕಳುಹಿಸಿ' ಆಯ್ಕೆ ಮಾಡಿ.",
    },
    out: {
      message: () =>
        "*ಸ್ಥಳ* \n📍 ದಯವಿಟ್ಟು ಈ ಹೆಜ್ಜೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳಲು ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಸ್ಥಳವನ್ನು ಹಂಚಿಕೊಳ್ಳುವ ಹೆಜ್ಜೆಗಳನ್ನು ಅನುಸರಿಸಿ:\n1. 📩 ಈ ಸಂದೇಶವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.\n2. 💬 'ಉತ್ತರ ನೀಡು' ಕ್ಲಿಕ್ ಮಾಡಿ.\n3. 📎 ಸಂಯೋಜಿಸಿ ಅಥವಾ ಕ್ಲಿಪ್ ಐಕಾನ್ ಕ್ಲಿಕ್ ಮಾಡಿ.\n4. 📍 'ಸ್ಥಳ' ಆಯ್ಕೆ ಮಾಡಿ.\n5. ✅ 'ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಸ್ಥಳವನ್ನು ಕಳುಹಿಸಿ' ಆಯ್ಕೆ ಮಾಡಿ.",
    },
    attendanceLocation: {
      message: () => "📸 ಹಾಜರಾತಿನ ಹೊರಗಿನ ಕಡೆ ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ತಿಳಿಸಲು ಒಂದು ಸೆಲ್ಫಿಯನ್ನು ಕಳುಹಿಸಿ.",
    },
    clickAttendanceLocation: {
      message: () =>
        "*⚠️ ನೀವು ನೇರವಾಗಿ ಕಳುಹಿಸಬಾರದು* . ಮೊದಲು, ನೀವು *ಉತ್ತರ ನೀಡುವಿಕೆಗೆ* ಎಂಚುಕೊಂಡು, ನಂತರ 'ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಸ್ಥಳವನ್ನು ಕಳುಹಿಸಿ' ಆಯ್ಕೆ ಮಾಡಿ.\n📍 ದಯವಿಟ್ಟು ಈ ಹೆಜ್ಜೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳಲು ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಸ್ಥಳವನ್ನು ಹಂಚಿಕೊಳ್ಳಲು ಒಂದು ಸೆಲ್ಫಿಯನ್ನು ಕಳುಹಿಸಿ.",
    },
    locNotInRange: {
      message: () =>
        `🚫 ನಮ್ಮನ್ನು ಕ್ಷಮಿಸಿ, ಆದರೆ ಈ ಸಮಯದಲ್ಲಿ ನಿಮ್ಮ ಸ್ಥಳ 📍 ಮತ್ತು ಹಾಜರಾತಿಯನ್ನು ನೋಂದಾಯಿಸಲು ನಮಗೆ ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ನೀವು ಕಂಪನಿಯ ವ್ಯಾಪ್ತಿಯಲ್ಲಿಲ್ಲ 🚷. ದಯವಿಟ್ಟು ಕಂಪನಿಯ ವ್ಯಾಪ್ತಿಯೊಳಗೆ ಸರಿಸಿ ಮತ್ತು ನಂತರ ಪ್ರಾರಂಭದಿಂದ ಮರುಪ್ರಯತ್ನಿಸಿ 🔁.👣`,
    },
    attendancePic: {
      message: () => "📸 ದಯವಿಟ್ಟು ನಿಮ್ಮ ಸೆಲ್ಫಿ ಫೋಟೋ ಕಳುಹಿಸಿ 🤳.",
    },
    Report: {
      message: () => "ನಿಮ್ಮ ಪ್ರಸ್ತುತ ತಿಂಗಳ ವರದಿ ಅಥವಾ ಹಿಂದಿನ ತಿಂಗಳ ವರದಿಯನ್ನು ಡೌನ್ಲೋಡ್ ಮಾಡಿ",
      buttons: [
        {
          id: "currentMonth",
          title: "ಪ್ರಸ್ತುತ ತಿಂಗಳ",
        },
        // {
        //   id: 'previousMonth',
        //   title: 'ಹಿಂದಿನ ತಿಂಗಳ',
        // },
      ],
    },
    uploadEmployee: {
      message: () => "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಎಲ್ಲಾ ನಿರ್ವಾಹಕ ಸಂಪರ್ಕ ವಿವರಗಳನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ.",
    },
    Other: {
      message: () =>
        "ಹಲೋ! ನೀವು ನಮಗೆ ಇಂದೇನು ಸಹಾಯ ಮಾಡಬಹುದು ಎಂದು ನಿರ್ಧರಿಸಿ. ದಯವಿಟ್ಟು ಕೆಳಗಿನ ಆಯ್ಕೆಗಳಿಂದ ಆಯ್ಕೆ ಮಾಡಿ.",
      buttons: [
        {
          id: "requestLeave",
          title: "ಅವಕಾಶ ಕೋರಿ",
        },
        {
          id: "support",
          title: "ಸಹಾಯ",
        },
        // {
        //   id: 'question',
        //   title: 'ಪ್ರಶ್ನೆ ಕೇಳಿ',
        // },
      ],
    },
    startLeaveRequest: {
      message: () =>
        "ನಾವು ಯಶಸ್ವಿಯಾಗಿ ಅಟೆಂಡೆನ್ಸ್ ಡೆಮೋ ಪೂರೈಸಿದ್ದೇವೆ. ಮುಂದಿನ ಡೆಮೋ ನೀವು ರಜೆಗಾಗಿ ಹೇಗೆ ಕೋರಿಕೆ ಮಾಡಬಹುದು ಅನ್ನುವುದು.",
      buttons: [{ id: "requestLeave", title: "Start Request Leave" }],
    },
    requestLeave: {
      message: () =>
        "ಕುಟುಂಬದ ಸದಸ್ಯರೊಂದಿಗೆ ಸಣ್ಣ ವಿರಾಮ ತೆಗೆಯುತ್ತಿದ್ದೀರಾ?\nದಯವಿಟ್ಟು ನೀವು ಎಷ್ಟು ದಿನಗಳನ್ನು ವಿರಾಮಕ್ಕೆ ಕೋರುತ್ತೀರಿ ಎಂದು ನಮಗೆ ತಿಳಿಸಿ:",
      buttons: [
        { id: "oneDay", title: "ಒಂದು ದಿನ" },
        { id: "moreThanOneDay", title: "ಒಂದು ದಿನದಿಂದ ಹೆಚ್ಚು" },
      ],
    },
    oneDay: {
      message: () => ({
        body: "ದಯವಿಟ್ಟು ದಿನಾಂಕವನ್ನು ಮತ್ತು ಕಾರಣವನ್ನು ಕೆಳಗಿನ ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ",
        label: {
          title: "ಅವಕಾಶ ಕೇಳಿ",
          startdatelabel: "ಪ್ರಾರಂಭ ದಿನಾಂಕ",
          enddatelabel: "ಕೊನೆಯ ದಿನಾಂಕ",
          reasonlabel: "ಅವಕಾಶ ಕಾರಣ",
        },
      }),
    },
    moreThanOneDay: {
      message: () => ({
        body: "ದಯವಿಟ್ಟು ಕೆಳಗಿನ ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿದ್ದುಕೊಂಡು ದಿನಾಂಕ ಮತ್ತು ಕಾರಣವನ್ನು ನಿರ್ದಿಷ್ಟಪಡಿಸಿ",
        label: {
          title: "ಅವಕಾಶ ಕೇಳಿ",
          startdatelabel: "ಪ್ರಾರಂಭ ದಿನಾಂಕ",
          enddatelabel: "ಕೊನೆಯ ದಿನಾಂಕ",
          reasonlabel: "ಅವಕಾಶ ಕಾರಣ",
        },
      }),
    },
    leaveSummary: {
      message: (
        employeeName,
        department,
        leaveType,
        startDate,
        endDate,
        reasonForLeave,
        ticketNumber,
        recipientPhone
      ) =>
        `ಹೆಸರು: *${employeeName}*\nವಿಭಾಗ: *${
          department ?? "-"
        }* \nಹೋಗಿದ್ದೇನೆ: *ಕೋರಿಕೆ ಮಾಡಿ*\nಅವಧಿ ಪ್ರಕಾರ: *${leaveType}*\nಪ್ರಾರಂಭ ದಿನಾಂಕ: *${startDate}*\n${
          endDate !== "Invalid Date" ? `ಅಂತ್ಯ ದಿನಾಂಕ: *${endDate}*\n` : ""
        }ಕಾರಣ: *${reasonForLeave}*\nಸಂಖ್ಯೆ : *${recipientPhone}* \nಟಿಕೆಟ್ ಸಂಖ್ಯೆ : *${ticketNumber}*`,
    },
    support: {
      message: () => "ಸುಸ್ವಾಗತ! ನೀವು ಎದುರಿಸುತ್ತಿರುವ ಸಮಸ್ಯೆಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ:",
      buttons: [
        {
          title: `🔎 ಸಮಸ್ಯೆಗಳು`,
          headers: `🔎 ಸಮಸ್ಯೆಗಳು`,
          rows: [
            {
              id: "check-in",
              title: "ಚೆಕ್ ಇನ್",
              description: "ಚೆಕ್ ಇನ್ ಸಮಸ್ಯೆ",
            },
            {
              id: "check-out",
              title: "ಚೆಕ್ ಔಟ್",
              description: "ಚೆಕ್ ಔಟ್ ಸಮಸ್ಯೆ",
            },
            {
              id: "salary-issue",
              title: "ಸಾಲರಿ ಸಮಸ್ಯೆ",
              description: "ಸಾಲರಿ ಸಮಸ್ಯೆ",
            },
            {
              id: "other-issue",
              title: "ಇತರ ❓",
              description: "ಇತರ ಸಮಸ್ಯೆ",
            },
          ],
        },
      ],
    },
    checkIn: {
      message: () => "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಟೀಕೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ",
    },
    checkOut: {
      message: () => "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಟೀಕೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ",
    },
    other_issue: {
      message: () => "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಟೀಕೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ",
    },
    Salary_Issue: {
      message: () => "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಟೀಕೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ",
    },
    employeeIssue: {
      message: () => "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಟಿಪ್ಪಣಿಯನ್ನು ಟೈಪ್ ಮಾಡಿ.",
    },
    registerComplain: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `ಹೆಸರು: *${name}*\nವಿಭಾಗ: *${
          department ?? "-"
        }*\nಹೋಗಿದ್ದೇನೆ: *ಬೆಂಬಲ*\nಸಮಸ್ಯೆ : *${problem}*\nಟಿಪ್ಪಣಿ. : *${message}*\nಸಂಖ್ಯೆ : *${recipientPhone}*\nಟಿಕೆಟ್ ಸಂಖ್ಯೆ : *${ticketNumber}*`,
    },
    sendIssue: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `ಹೆಸರು: *${name}*\nವಿಭಾಗ: *${
          department ?? "-"
        }*\nಹೋಗಿದ್ದೇನೆ: *ಬೆಂಬಲ*\nಸಮಸ್ಯೆ : *${problem}*\nಟಿಪ್ಪಣಿ. : *${message}*\nಸಂಖ್ಯೆ : *${recipientPhone}*\nಟಿಕೆಟ್ ಸಂಖ್ಯೆ : *${ticketNumber}*`,
      buttons: (employeeNumber, ticketNumber) => [
        { title: "ಅನುಮೋದಿಸಿ", id: `issue_approve-${employeeNumber}-${ticketNumber}` },
        { title: "ತಿರಸ್ಕರಿಸಿ", id: `issue_reject-${employeeNumber}-${ticketNumber}` },
        { title: "ಹಿಡಿದುಕೊಳ್ಳಿ", id: `issue_hold-${employeeNumber}-${ticketNumber}` },
      ],
    },
    sendLeave: {
      message: (employeeName, leaveType, startDate, endDate, reason) =>
        `*ವಿನಂತಿಯನ್ನು ಬಿಟ್ಟುಬಿಡಿ* \n👤 ಉದ್ಯೋಗಿಯ ಹೆಸರು: ${employeeName}\nಬಿಡುವ ಪ್ರಕಾರ: ${leaveType}\nಪ್ರಾರಂಭ ದಿನಾಂಕ: *${startDate}*\n${
          endDate !== "Invalid Date" ? `ಅಂತ್ಯ ದಿನಾಂಕ: *${endDate}*\n` : ""
        }\nಕಾರಣ: ${reason}ದಯವಿಟ್ಟು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಅಗತ್ಯ ಕ್ರಮ ತೆಗೆದುಕೊಳ್ಳಿ.`,
      buttons: (employeePhone, ticketNumber) => [
        {
          id: `request_approve-${employeePhone}-${ticketNumber}`,
          title: "ಅನುಮೋದಿಸಿ",
        },
        {
          id: `request_reject-${employeePhone}-${ticketNumber}`,
          title: "ತಿರಸ್ಕರಿಸಿ",
        },
        {
          id: `request_hold-${employeePhone}-${ticketNumber}`,
          title: "ಹಿಡಿದುಕೊಳ್ಳಿ",
        },
      ],
    },
    approvals: {
      buttons: [
        { title: "ಅವಕಾಶ ಅನುಮೋದನೆ", id: "leaveApprove" },
        { title: "ಸಕ್ರಿಯ ಸಮಸ್ಯೆಗಳು", id: "activeIssues" },
      ],
      message: () =>
        `ಹಲೋ, ದಯವಿಟ್ಟು ಕೆಳಗಿನ ಆಯ್ಕೆಯನ್ನು ಮಾಡಿ:\n 1️⃣ ಅವಕಾಶಗಳನ್ನು ಅನುಮೋದಿಸಲು.\n 2️⃣ ನಿಮ್ಮ ಅನುಮೋದನೆಗಳನ್ನು ಕಾಯುತ್ತಿರುವ ಸಕ್ರಿಯ ಸಮಸ್ಯೆಗಳನ್ನು ವೀಕ್ಷಿಸಲು.\nಮೇಲಿನ ಸಂದೇಶದ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ!`,
    },
    leaveApprove: {
      message: () =>
        `*ನೌಕರರ ರಜೆ ವರದಿಯಾಗಿದೆ*\nಆತ್ಮೀಯ ಉದ್ಯೋಗದಾತರೇ, ಉದ್ಯೋಗಿಯೊಬ್ಬರಿಂದ ರಜೆ ವಿನಂತಿ ಇದೆ\n *ಟಿಕೆಟ್ ಸಂಖ್ಯೆ: RL4545* \n *ಹೆಸರು*: ರಾಮ್ \n *ದಿನಾಂಕಗಳು*: 23/12/2023 \n *ಕಾರಣ* : ಮದುವೆ \n *ಪ್ರಕಾರ* : ರಜೆಯನ್ನು ವಿನಂತಿಸಿ`,
      buttons: [
        { title: "ಅನುಮೋದಿಸಿ", id: "request_approve" },
        { title: "ತಿರಸ್ಕರಿಸಿ", id: "request_reject" },
        { title: "ಹಿಡಿದುಕೊಳ್ಳಿ", id: "request_hold" },
      ],
    },
    activeIssues: {
      message: () =>
        `*ಉದ್ಯೋಗಿಗಳ ಸಮಸ್ಯೆ ವರದಿ*\nಆತ್ಮೀಯ ಉದ್ಯೋಗದಾತರೇ, ಉದ್ಯೋಗಿಯೊಬ್ಬರು ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಿದ್ದಾರೆ:\n *ನೌಕರರ ಹೆಸರು* : ಶಾಮ್ \n *ಸಮಸ್ಯೆ* : ಸಂಬಳ \n *ಸಮಸ್ಯೆ ವಿವರ* : ಸಂಬಳ ಕಡಿಮೆಯಾಗಿದೆ\nದಯವಿಟ್ಟು ಸೂಕ್ತ ಕ್ರಮ ಕೈಗೊಳ್ಳಿ ಈ ಕಾಳಜಿಯನ್ನು ಪರಿಹರಿಸಲು.`,
      buttons: [
        { title: "ಅನುಮೋದಿಸಿ", id: "issue_approve" },
        { title: "ತಿರಸ್ಕರಿಸಿ", id: "issue_reject" },
        { title: "ಹಿಡಿದುಕೊಳ್ಳಿ", id: "issue_hold" },
      ],
    },
    issue_approve: {
      message: () =>
        "ಸ್ಥಿತಿ ಅಪ್‌ಡೇಟ್: ಅನುಮೋದಿಸಲಾಗಿದೆ\nನಿಮ್ಮ ವಿನಂತಿ/ಅರ್ಜಿಯನ್ನು ಅನುಮೋದಿಸಲಾಗಿದೆ ಎಂದು ನಿಮಗೆ ತಿಳಿಸಲು ನಾವು ಸಂತೋಷಪಡುತ್ತೇವೆ!\nನಿಮ್ಮ ತಾಳ್ಮೆ ಮತ್ತು ಸಹಕಾರಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು.",
    },
    issue_reject: {
      message: () =>
        "ಸ್ಥಿತಿ ಅಪ್‌ಡೇಟ್: ತಿರಸ್ಕರಿಸಲಾಗಿದೆ \nನಿಮ್ಮ ವಿನಂತಿ/ಅರ್ಜಿಯನ್ನು ತಿರಸ್ಕರಿಸಲಾಗಿದೆ ಎಂದು ನಿಮಗೆ ತಿಳಿಸಲು ನಾವು ವಿಷಾದಿಸುತ್ತೇವೆ.\nನಿಮ್ಮ ತಿಳುವಳಿಕೆಯನ್ನು ನಾವು ಪ್ರಶಂಸಿಸುತ್ತೇವೆ.",
    },
    issue_hold: {
      message: () =>
        "ಸ್ಥಿತಿ ನವೀಕರಣ: ತಡೆಹಿಡಿಯಲಾಗಿದೆ \nನಾವು ಪರಿಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸುವಾಗ ಮತ್ತು ನಿರ್ಣಯಿಸುವಾಗ ನಿಮ್ಮ ವಿನಂತಿ/ಅಪ್ಲಿಕೇಶನ್ ಪ್ರಸ್ತುತ ತಡೆಹಿಡಿಯಲಾಗಿದೆ.\nಈ ಸಮಯದಲ್ಲಿ ನಿಮ್ಮ ತಾಳ್ಮೆಯನ್ನು ನಾವು ಪ್ರಶಂಸಿಸುತ್ತೇವೆ.",
    },
    request_approve: {
      message: () =>
        `*ವಿನಂತಿಯನ್ನು ಬಿಡಿ*: ಅನುಮೋದಿಸಲಾಗಿದೆ\nನಿಮ್ಮ ರಜೆ ವಿನಂತಿಯನ್ನು ಅನುಮೋದಿಸಲಾಗಿದೆ ಎಂದು ನಿಮಗೆ ತಿಳಿಸಲು ನಾವು ಸಂತೋಷಪಡುತ್ತೇವೆ!\nನಿಮ್ಮ ತಾಳ್ಮೆ ಮತ್ತು ಸಹಕಾರಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು.`,
    },
    request_reject: {
      message: () =>
        `*ವಿನಂತಿಯನ್ನು ಬಿಡಿ*: ತಿರಸ್ಕರಿಸಲಾಗಿದೆ \nನಿಮ್ಮ ರಜೆ ವಿನಂತಿಯನ್ನು ತಿರಸ್ಕರಿಸಲಾಗಿದೆ ಎಂದು ತಿಳಿಸಲು ನಾವು ವಿಷಾದಿಸುತ್ತೇವೆ.\nನಿಮ್ಮ ತಿಳುವಳಿಕೆಯನ್ನು ನಾವು ಪ್ರಶಂಸಿಸುತ್ತೇವೆ.`,
    },
    request_hold: {
      message: () =>
        `*ವಿನಂತಿಯ ನವೀಕರಣವನ್ನು ಬಿಡಿ*: ತಡೆಹಿಡಿಯಲಾಗಿದೆ \nನಾವು ಪರಿಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸುವಾಗ ಮತ್ತು ನಿರ್ಣಯಿಸುವಾಗ ನಿಮ್ಮ ರಜೆ ವಿನಂತಿಯನ್ನು ಪ್ರಸ್ತುತ ತಡೆಹಿಡಿಯಲಾಗಿದೆ.\nಈ ಸಮಯದಲ್ಲಿ ನಿಮ್ಮ ತಾಳ್ಮೆಯನ್ನು ನಾವು ಪ್ರಶಂಸಿಸುತ್ತೇವೆ.`,
    },
    addEmployee: {
      message: (employeeName, employeeNumber, timing, geofen) =>
        `ಸೇರಿಸುವಲ್ಲಿ:\n*ಹೆಸರು*: ${employeeName}\n*ಸಂಖ್ಯೆ*: ${employeeNumber}\n*ಪ್ರಕಾರ*: ${timing}\n*ಭೂಗೋಳಾಕೃತಿ*: ${geofen}`,
    },
    editEmployee: {
      message: () => ({
        body: `ಎಡಿಟ್ ಉದ್ಯೋಗಿ ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡುವ ಮೂಲಕ ಉದ್ಯೋಗಿ ಸಂಪಾದಿಸಿ ಮತ್ತು ಫಾರ್ಮ್ ಅನ್ನು ಭರ್ತಿ ಮಾಡಿ.`,
        label: {
          title: "ಉದ್ಯೋಗಿ ವಿವರಗಳನ್ನು ಸಂಪಾದಿಸಿ",
          employeeNameLabel: "ಉದ್ಯೋಗಿ ಹೆಸರು",
          employeeNumberLabel: "ಉದ್ಯೋಗಿ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
          timingTypeLabel: "ಸಮಯ ರೀತಿ",
          workingHoursNote: "ಸ್ವಚ್ಛ ಕೆಲಸ ಗಂಟೆಗಳು",
          checkInOutNote: "ನಿರ್ದಿಷ್ಟ ಸಮಯ: ಚೆಕ್-ಇನ್ ಮತ್ತು  ಚೆಕ್-ಆಉಟ್",
          checkInLabel: "ಚೆಕ್-ಇನ್",
          checkOutLabel: "ಚೆಕ್-ಆಉಟ್",
          workingHoursLabel: "ಕೆಲಸ ಗಂಟೆಗಳು",
          designationLabel: "ಹೆಸರು",
          branchLabel: "இடம்",
          joiningDateLabel: "ಸೇರಿಸುವ ದಿನಾಂಕ",
          dobLabel: "ಹುಟ್ಟಿದ ದಿನಾಂಕ",
        },
        list: {
          timingTyperadio: [
            {
              id: "day",
              title: "ಡೇ ಶಿಫ್ಟ್",
            },
            {
              id: "day/night",
              title: "ಡೇ/ನೈಟ್ ಶಿಫ್ಟ್",
            },
          ],
          shiftTyperadio: [
            {
              id: "day",
              title: "ಡೇ ಶಿಫ್ಟ್",
            },
            {
              id: "day/night",
              title: "ಡೇ/ನೈಟ್ ಶಿಫ್ಟ್",
            },
          ],
          workdaysList: [
            {
              id: "0",
              title: "ಭಾನುವಾರ",
            },
            {
              id: "1",
              title: "ಸೋಮವಾರ",
            },
            {
              id: "2",
              title: "ಮಂಗಳವಾರ",
            },
            {
              id: "3",
              title: "ಬುಧವಾರ",
            },
            {
              id: "4",
              title: "ಗುರುವಾರ",
            },
            {
              id: "5",
              title: "ಶುಕ್ರವಾರ",
            },
            {
              id: "6",
              title: "ಶನಿವಾರ",
            },
          ],
          proofList: [
            {
              id: "location",
              title: "ಸ್ಥಳ",
            },
            {
              id: "image",
              title: "ಫೋಟೊ",
            },
            {
              id: "logs",
              title: "ಲಾಗ್‌ಗಳು",
            },
          ],
        },
      }),
    },
    ticketUpdate: {
      message: (ticketNumber) =>
        `ಟಿಕೆಟ್ ಸಂಖ್ಯೆ ${ticketNumber} ಯ ಸ್ಥಿತಿ ಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ`,
    },
    employerStart: {
      message: () =>
        `ಹಲೋ, ದಯವಿಟ್ಟು ಕೆಳಗಿನ ಆಯ್ಕೆಗಳಿಂದ ಒಂದು ಆಯ್ಕೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:\n\n1️⃣. ವರದಿ ಪಡೆಯಿರಿ: ವಿವರವಾದ ವರದಿಯನ್ನು ಸ್ವೀಕರಿಸಲು ಈ ಬಟನ್ ಅನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ..\n2️⃣. ಅನುಮೋದನೆಗಳು: ಉದ್ಯೋಗಿ ರಜೆ ಅನುಮೋದನೆಗಳನ್ನು ಪರಿಶೀಲಿಸುವ ಅಥವಾ ನಿರ್ವಹಿಸುವ ಅಗತ್ಯವಿದೆಯೇ? ನ್ಯಾವಿಗೇಟ್ ಮಾಡಲು ಈ ಬಟನ್ ಅನ್ನು ಬಳಸಿ.\n3️⃣. ಪ್ರೊಫೈಲ್/ಸೆಟ್ಟಿಂಗ್‌ಗಳು: ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಮತ್ತು ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಇಲ್ಲಿ ನಿರ್ವಹಿಸಿ.`,
      buttons: [
        { id: "employerReports", title: "அறிக்கை பெற" },
        { id: "approvals", title: "ಅನುಮೋದನೆಗಳು" },
        { id: "profile-settings", title: "ಪ್ರೊಫೈಲ್ ಸೆಟ್ಟಿಂಗ್‌" },
      ],
    },
    employerReports: {
      message: () =>
        "ಸ್ವಾಗತ! ದಯವಿಟ್ಟು ಒಂದು ಆಯ್ಕೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:\n1. ಲೈವ್ ವರದಿ: ನೈಜ-ಸಮಯದ ನವೀಕರಣಗಳನ್ನು ವೀಕ್ಷಿಸಿ.\n2. ನಿನ್ನೆಯ ವರದಿ: ನಿನ್ನೆಯ ವರದಿಯನ್ನು ಪ್ರವೇಶಿಸಿ.\n3. ಉದ್ಯೋಗಿ ಮಾಸ್ಟರ್ ಶೀಟ್: ಉದ್ಯೋಗಿ ಮಾಸ್ಟರ್ ಶೀಟ್ ಅನ್ನು ಪ್ರವೇಶಿಸಿ.",
      // buttons: [
      //   {
      //     id: "liveReport",
      //     title: "ಲೈವ್ ವರದಿ",
      //   },
      //   {
      //     id: "yesterdayReport",
      //     title: "ನಿನ್ನೆ ವರದಿ",
      //   },
      //   {
      //     id: "emp_master_sheet",
      //     title: "ಉದ್ಯೋಗಿ ವರದಿ",
      //   },
      // ],
      buttons: [
        {
          title: "Reports",
          headers: "Reports",
          rows: [
            {
              id: "liveReport",
              title: "ಲೈವ್ ವರದಿ",
              description: "Download Live Report",
            },
            {
              id: "yesterdayReport",
              title: "ನಿನ್ನೆಯ ವರದಿ",
              description: "Download Yesterday Report",
            },
            {
              id: "dateRangeReport",
              title: "ದಿನಾಂಕ ಶ್ರೇಣಿ ವರದಿ",
              description: "Download Date Range Report",
            },
            {
              id: "emp_master_sheet",
              title: "ಉದ್ಯೋಗಿ ವರದಿ",
              description: "Download Report of all your Employees",
            },
          ],
        },
      ],
    },
    employeeDemoStart: {
      buttons: [{ id: "MarkAttendance", title: "ಹೋಗಿದ್ದೇನೆ ಗುರುತಿಸಿ" }],
      message: () =>
        "1️⃣ *ಕರ್ಮಚಾರಿ ಡೆಮೊ ಹೆಗ್ಗಳು*:\n   a. ✅ ಹೋಗಿದ್ದೇನೆ ಗುರುತಿಸಿ\n   b. 🙋 ಕೋರಿಕೆ ಮಾಡಿ\n   c. 🎫 ಟಿಕೆಟ್ ಮೇಲೆ ಎತ್ತಿರಿ\n   d. 📊 ವರದಿಗಳನ್ನು ವೀಕ್ಷಿಸಿ\n2️⃣ *ಉದ್ಯಮಿ ಡೆಮೊ ಹೆಗ್ಗಳು* (ಕರ್ಮಚಾರಿ ಡೆಮೊ ಹೆಗ್ಗಳು ಪೂರೈಸಿದ ನಂತರ)",
    },
    "addGeo-fencing-emplyer": {
      message: () =>
        `ನೀವು ಜಿಯೋ-ಫೆನ್ಸಿಂಗ್ ಅನ್ನು ಸೇರಿಸಲು ಬಯಸುವಿರಾ ನಂತರ ಕೆಳಗಿನ ಬಟನ್ ಅನ್ನು ಪ್ರಿಸ್ ಮಾಡಿ`,
      buttons: [
        { id: "yes-geofencing", title: "ಹೌದು" },
        { id: "no-geofencing", title: "ಸಂ" },
      ],
    },
    "yes-geofencing": {
      message: () => `ದಯವಿಟ್ಟು ನಿಮ್ಮ ಕಚೇರಿಯ ಪ್ರಸ್ತುತ ಸ್ಥಳವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ`,
    },
    "office-geo-fencing": {
      message: () => `ನಿಮ್ಮ ಕಚೇರಿಯ ಪ್ರಸ್ತುತ ಸ್ಥಳವನ್ನು ಒದಗಿಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು`,
    },
    "reminder-in": {
      message: () => `ಮುಂದಿನ 5 ನಿಮಿಷಗಳಲ್ಲಿ ಚೆಕ್-ಔಟ್ ಅನ್ನು ಗುರುತಿಸಲು ಇದು ಸ್ನೇಹಪರ ಜ್ಞಾಪನೆಯಾಗಿದೆ`,
    },
    "reminder-out": {
      message: () => `ಮುಂದಿನ 5 ನಿಮಿಷಗಳಲ್ಲಿ ಚೆಕ್-ಔಟ್ ಅನ್ನು ಗುರುತಿಸಲು ಇದು ಸ್ನೇಹಪರ ಜ್ಞಾಪನೆಯಾಗಿದೆ`,
    },
    employeeUploaded: {
      message: () =>
        "✅ ಉದ್ಯೋಗಿಯ ಪ್ರೊಫೈಲ್ ಯಶಸ್ವಿಯಾಗಿ ರಚಿಸಲಾಗಿದೆ.\n\nಉದ್ಯೋಗಿಯ ವಾಟ್ಸಾಪ್ ನಂಬರ್‌ಗೆ ಔಪಚಾರಿಕ ಸೂಚನೆ ಮತ್ತು ಹಾಜರಾತಿ ಆರಂಭದ ಸಂದೇಶ ಕಳುಹಿಸಲಾಗಿದೆ.\n\nದಯವಿಟ್ಟು ಉದ್ಯೋಗಿಗಳಿಗೆ ಡೆಮೋವನ್ನು ತ್ವರಿತವಾಗಿ ಮುಗಿಸಿ, ತಮ್ಮ ಹಾಜರಾತಿ ಚಿಹ್ನಿಸುವಂತೆ ಹೇಳಿ.",
    },
    employeeDemoCompleted: {
      message: () =>
        "ಡೆಮೋ ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಂಡಿದೆ. ನೀವು ಈ ಸಂಖ್ಯೆಯಲ್ಲಿ ನಿತ್ಯ ಹಾಜರಾತಿ ಗುರುತಿಸಲು ಪ್ರಾರಂಭಿಸಲು ಕೋರಲಾಗಿದೆ. 'ಹೈ' ಎಂದು ಟೈಪ್ ಮಾಡಿ ಯಾವುದೇ ಸಮಯದಲ್ಲಿ ಪ್ರವಾಹವನ್ನು ಆರಂಭಿಸಬಹುದು.",
    },
    "profile-settings": {
      message: () =>
        `*ಪ್ರೊಫೈಲ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳು*\n\nಕೆಳಗಿನ ಆಯ್ಕೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:\n\n1. *ವ್ಯಾಪಾರ ಸೆಟ್ಟಿಂಗ್‌ಗಳು*: ನಿಮ್ಮ ವ್ಯಾಪಾರದ ಆದ್ಯತೆಗಳನ್ನು ಕಾನ್ಫಿಗರ್ ಮಾಡಿ.\n2. *ಅಧಿಸೂಚನೆಗಳು*: ದೈನಂದಿನ ಆಧಾರದ ಮೇಲೆ ಲೈವ್ ವರದಿಗಳಿಗಾಗಿ.\n3. *ಸಂಪಾದಿಸು / ಅಳಿಸಿ*\n\ta. ಶಿಫ್ಟ್ ಸಮಯವನ್ನು ಸಂಪಾದಿಸಿ`,

      buttons: [
        {
          id: "business-settings",
          title: "ವ್ಯಾಪಾರ ಸೆಟ್ಟಿಂಗ್‌ಗಳ",
        },
        {
          id: "notification-settings",
          title: "ಅಧಿಸೂಚನೆಗಳು",
        },
        {
          id: "edit-delete",
          title: "ಸಂಪಾದಿಸಿ/ಅಳಿಸಿ",
        },
      ],
    },
    "business-settings": {
      message: () => ({
        body: `ದಯವಿಟ್ಟು ಕೆಳಗಿನ ಬಟನ್ ಅನ್ನು ಕ್ಲಿಕ್ ಮಾಡುವ ಮೂಲಕ ನಿಮ್ಮ ವ್ಯಾಪಾರ ಮಾಹಿತಿಯನ್ನು ನವೀಕರಿಸಿ. ಧನ್ಯವಾದ!`,
        label: {
          title: "ವ್ಯಾಪಾರ ಸೆಟ್ಟಿಂಗ್ಗಳನ್ನು ಸಂಪಾದಿಸಿ",
          employernolabel: "ಉದ್ಯೋಗಿ ಸಂಖ್ಯೆ",
          employerNamelabel: "ಉದ್ಯೋಗಿಯ ಹೆಸರು",
          companyNamelabel: "ಕಂಪೆನಿ ಹೆಸರು",
          bufferTimelabel: "ಬಫರ್ ಸಮಯ",
          monthlySickLeavelabel: "ಮಾಸಿಕ ಕಾಯಿಲೆ ಅವಕಾಶ",
          casualLeavelabel: "ಸಾಮಾನ್ಯ ಅವಕಾಶ",
          annualLeavelabel: "ವಾರ್ಷಿಕ ಅವಕಾಶ",
          maternityLeaveAllowedlabel: "ಗರ್ಭಿಣಿ ಅವಕಾಶ ಅನುಮತಿಸಲಾಗಿದೆ",
          paternityLeaveAllowedlabel: "ಪಿತೃತ್ವ ಅವಕಾಶ ಅನುಮತಿಸಲಾಗಿದೆ",
          unpaidLeavePolicylabel: "ಅವಕಾಶ ಸಂಪೂರ್ಣ ವಿರಮಾಣ ನೀತಿ",
          leaveEncashmentlabel: "ಅವಕಾಶ ನಗದುರವಾದುದು",
          consequencesUnapprovedLeavelabel: "ಅನಾಪ್ರೋವ್ಡ್ ಅವಕಾಶ ಪರಿಣಾಮಗಳು",
          halfDayPolicylabel: "ಅರ್ಧ ದಿನ ನೀತಿ",
          Languagelabel: "ಭಾಷೆ",
          carryForwardLimitlabel: "ಮುನ್ನಡೆ ಮಾಡಿದ ಮಿತಿ",
        },
      }),
    },
    "edit-delete": {
      message: () =>
        `ನೀವು ಸಂಪಾದಿಸಲು ಅಥವಾ ಅಳಿಸಲು ಆಯ್ಕೆಯನ್ನು ಆರಿಸಿದ್ದೀರಿ. ದಯವಿಟ್ಟು ಕೆಳಗಿನ ವೈಶಿಷ್ಟ್ಯಗಳಿಂದ ಆಯ್ಕೆಮಾಡಿ\n\n1. ಶಿಫ್ಟ್ ಸಮಯಗಳನ್ನು ಸಂಪಾದಿಸಿ: ಕಂಪನಿಯ ಸಮಯವನ್ನು ಆಧರಿಸಿ ಉದ್ಯೋಗಿ ವೇಳಾಪಟ್ಟಿಯನ್ನು ಹೊಂದಿಸಿ.\n2. ಜಿಯೋ ಫೆನ್ಸಿಂಗ್ ಅನ್ನು ಸಂಪಾದಿಸಿ: ಭೌಗೋಳಿಕ ಗಡಿಗಳು ಅಥವಾ ನಿರ್ಬಂಧಗಳನ್ನು ಮಾರ್ಪಡಿಸಿ ಅಥವಾ ನವೀಕರಿಸಿ.\n3. ಅಳಿಸಿ: ಉದ್ಯೋಗಿಗಳಿಗೆ ಸಂಬಂಧಿಸಿದ ಯಾವುದೇ ಡೇಟಾವನ್ನು ಅಳಿಸಲು ಈ ಆಯ್ಕೆಯು ನಿಮಗೆ ಅನುಮತಿಸುತ್ತದೆ`,

      buttons: [
        { id: "edit-timings", title: "ಶಿಫ್ಟ್ ಸಮಯವನ್ನು ಸಂಪ" },
        { id: "edit-geo-fencing", title: "ಭೂ-ಅಂಚೆ ಸಂಪಾದಿಸಿ" },
        { id: "delete", title: "ಅಳಿಸಿ" },
      ],
    },
    "edit-timings": {
      message: () => ({
        body: `ಶಿಫ್ಟ್ ಟೈಮಿಂಗ್‌ಗಳನ್ನು ಎಡಿಟ್ ಮಾಡಲು ಕೆಳಗಿನ ಬಟನ್ ಅನ್ನು ಪ್ರವೇಶಿಸುವ ಮೂಲಕ ಉದ್ಯೋಗಿ ವೇಳಾಪಟ್ಟಿಯನ್ನು ದಯವಿಟ್ಟು ನಿರ್ವಹಿಸಿ ಮತ್ತು ಆಪ್ಟಿಮೈಜ್ ಮಾಡಿ. ಈ ವಿಷಯದ ಬಗ್ಗೆ ನಿಮ್ಮ ಗಮನವು ಹೆಚ್ಚು ಮೆಚ್ಚುಗೆ ಪಡೆದಿದೆ. ಧನ್ಯವಾದ.`,
        label: {
          title: "ಶಿಫ್ಟ್ ಸಮಯಗಳನ್ನು ಸಂಪಾದಿಸಿ",
          timingTypeLabel: "ಸಮಯ ರೀತಿ",
          checkInLabel: "ಚೆಕ್ ಇನ್",
          checkOutLabel: "ಚೆಕ್ ಔಟ್",
          workingHoursLabel: "ಕೆಲಸ ಗಂಟೆಗಳು",
          branchLabel: "ಶಾಖೆಗಳು",
          employeesLabel: "ನೌಕರರು",
          shiftTyperadio: [
            {
              id: "day",
              title: "ಡೇ ಶಿಫ್ಟ್",
            },
            {
              id: "day/night",
              title: "ಡೇ/ನೈಟ್ ಶಿಫ್ಟ್",
            },
          ],
          timingTyperadio: [
            {
              id: "day",
              title: "ಡೇ ಶಿಫ್ಟ್",
            },
            {
              id: "day/night",
              title: "ಡೇ/ನೈಟ್ ಶಿಫ್ಟ್",
            },
          ],
          workdaysList: [
            {
              id: "0",
              title: "ಭಾನುವಾರ",
            },
            {
              id: "1",
              title: "ಸೋಮವಾರ",
            },
            {
              id: "2",
              title: "ಮಂಗಳವಾರ",
            },
            {
              id: "3",
              title: "ಬುಧವಾರ",
            },
            {
              id: "4",
              title: "ಗುರುವಾರ",
            },
            {
              id: "5",
              title: "ಶುಕ್ರವಾರ",
            },
            {
              id: "6",
              title: "ಶನಿವಾರ",
            },
          ],
        },
      }),
    },
    "edit-geo-fencing": {
      message: () =>
        `ಜಿಯೋ ಫೆನ್ಸಿಂಗ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಪ್ರವೇಶಿಸಲು ಮತ್ತು ಸಂಪಾದಿಸಲು ಕೆಳಗಿನ ಬಟನ್ ಅನ್ನು ಬಳಸುವ ಮೂಲಕ ದಯವಿಟ್ಟು ಉದ್ಯೋಗಿ ಸ್ಥಳಗಳ ಮೇಲೆ ನಿಖರವಾದ ನಿಯಂತ್ರಣವನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ. ಈ ಕಾರ್ಯಕ್ಕೆ ನಿಮ್ಮ ಗಮನವು ಮೌಲ್ಯಯುತವಾಗಿದೆ. ಧನ್ಯವಾದ`,
    },
    link_employee: {
      message: () => ({
        body: `ಹೊಸ ಸ್ಥಳ ಮತ್ತು ಉದ್ಯೋಗಿಗಳನ್ನು ಸ್ಥಳಕ್ಕೆ ಸೇರಿಸಿ`,
        label: {
          title: "ಜಿಯೋ ಫೆನ್ಸಿಂಗ್",
          heading: "இடம் ಸೂಚನೆಗಳು",
          rangelabel: "ಶಾಖಾ",
          rangeheadinglabel: "ಶಾಖಾ 50 ಮೀಟರ್ ಮತ್ತು ಅದಕ್ಕೆ ಮೇಲಾಗಿ ಇರಬೇಕು",
          employeelabel: "ಉದ್ಯೋಗಿಗೆ இடம் ಲಿಂಕ್ ಮಾಡಿ:",
          branchnamelabel: "இடம் ಹೆಸರು",
        },
      }),
    },
    edit_geolocation: {
      message: () => ({
        body: `ಕೆಳಗಿನ ಬಟನ್ ಅನ್ನು ಕ್ಲಿಕ್ ಮಾಡುವ ಮೂಲಕ ಉದ್ಯೋಗಿಗಳ ಜಿಯೋ ಫೆನ್ಸಿಂಗ್ ಅನ್ನು ಎಡಿಟ್ ಮಾಡಿ`,
        label: {
          title: "ಜಿಯೋ ಸ್ಥಳ ಸಂಪಾದಿಸಿ",
          workingHoursLabel: "ಕಾರ್ಯಸಮಯ",
          branchLabel: "ಉದ್ಯೋಗಿ",
          timingTypeLabel: "ಸಮಯ ರೀತಿ",
          placelabel: "ಸ್ಥಳ",
        },
      }),
    },
    "edit-notifs": {
      message: (companyName) => ({
        body: `ಅಪ್‌ಡೇಟ್ ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡುವ ಮೂಲಕ ಅಧಿಸೂಚನೆಗಳನ್ನು ನವೀಕರಿಸಿ.`,
        label: {
          companyNamelabel: companyName,
          Notificationslabel: "ಅಱಿಯಲು",
          dailyreportlabel: "ದಿನಪ್ರತಿ ಬೆಳಿಗ್ಗೆ ವರದಿ",
          dailyeveningreportlabel: "ಪ್ರತಿದಿನ ಸಾಯಂಕಾಲ ವರದಿ",
          monthendlabel: "ತಿಂಗಳ ಕೊನೆಗೆ ವರದಿ",
        },
        buttons: [
          { id: "checkIn", title: "ಚೆಕ್-ಇನ್‌ಗಳು" },
          { id: "checkOut", title: "ಚೆಕ್-ಔಟ್‌ಗಳು" },
          { id: "leaveRequest", title: "ಅವಕಾಶ ವಿನಂತಿಗಳು" },
          { id: "support", title: "ಬೆಂಬಲ ಕೇಳುಗರ ಕೇಳಿಕೆ" },
        ],
      }),
    },
    "notification-settings": {
      message: () =>
        `ನಮ್ಮ ಇತ್ತೀಚಿನ ವೈಶಿಷ್ಟ್ಯದೊಂದಿಗೆ ನಿಮ್ಮ ನಿರ್ವಹಣಾ ಅನುಭವವನ್ನು ವರ್ಧಿಸಿ - ಅಧಿಸೂಚನೆಯನ್ನು ಸಂಪಾದಿಸು ಬಟನ್\n\nಚೆಕ್ ಇನ್: ನಿಮ್ಮ ಉದ್ಯೋಗಿಗಳು ಚೆಕ್-ಇನ್ ಮಾಡಿದಾಗ ಅಧಿಸೂಚನೆಯನ್ನು ಸ್ವೀಕರಿಸಿ.\nಚೆಕ್ ಔಟ್: ನಿಮ್ಮ ಉದ್ಯೋಗಿಗಳು ಚೆಕ್-ಔಟ್ ಮಾಡಿದಾಗ ಅಧಿಸೂಚನೆಯನ್ನು ಸ್ವೀಕರಿಸಿ.\nಬೆಳಿಗ್ಗೆ ವರದಿ: ಲೈವ್ ವರದಿಯನ್ನು ಸ್ವೀಕರಿಸಿ ಬೆಳಿಗ್ಗೆ.\nಸಂಜೆ ವರದಿ: ಸಂಜೆ ನೇರ ವರದಿಯನ್ನು ಸ್ವೀಕರಿಸಿ.`,
      buttons: [{ id: "edit-notifs", title: "ಅಧಿಸೂಚನೆಗಳನ್ನು ಸಂಪಾ" }],
    },
    "remove-employees": {
      message: () => ({
        body: `ಉದ್ಯೋಗಿಗಳನ್ನು ತೆಗೆದುಹಾಕುವ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಪ್ರಾರಂಭಿಸಲು ದಯವಿಟ್ಟು ಕೆಳಗಿನ ಬಟನ್ ಅನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ.`,
        label: {
          title: "ನೌಕರರನ್ನು ತೆಗೆದುಹಾಕಿ",
          employeesLabel: "ನೌಕರರು",
          companylabel: "ಕಂಪೆನಿ ಹೆಸರು",
        },
      }),
    },
    "remove-branch": {
      message: () => ({
        body: `ಉದ್ಯೋಗಿಯನ್ನು ಸ್ಥಳದಿಂದ ತೆಗೆದುಹಾಕುವುದನ್ನು ಪ್ರಾರಂಭಿಸಲು ದಯವಿಟ್ಟು ಕೆಳಗಿನ ಬಟನ್ ಅನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ.`,
        label: {
          title: "ಉದ್ಯೋಗಿಗಳನ್ನು ಸ್ಥಳದಿಂದ ತೆಗೆದುಹಾಕಿ",
          branchLabel: "ಸ್ಥಳಗಳು",
          employeesLabel: "ನೌಕರರು",
          companylabel: "ಕಂಪೆನಿ ಹೆಸರು",
        },
      }),
    },
    "live-report-templates": {
      message: () => ({
        employees: "ಉದ್ಯೋಗಿಗಳು",
        onTime: "ಸಮಯದಲ್ಲಿ",
        late: "ಹೊರಗೊಮ್ಮಲು",
        absent: "ಇಲ್ಲದಿದ್ದರು",
        onLeave: "ಅವಕಾಶದಲ್ಲಿ",
        attendance: "ಹಾಜರಾತಿ",
        employee: "ಉದ್ಯೋಗಿ",
        shiftStatus: "ಶಿಫ್ಟ್ ಮತ್ತು ಸ್ಥಿತಿ",
        checkIn: "ಚೆಕ್ ಇನ್",
        checkOut: "ಚೆಕ್ ಔಟ್",
        requiredTime: "ಅಗತ್ಯವಿರುವ ಸಮಯ",
        actualTime: "ವಾಸ್ತವ ಸಮಯ",
        shiftDuration: "ಶಿಫ್ಟ್ ಕಾಲ",
        leaveRequests: "ಅವಕಾಶ ವಿನಂತಿಗಳು",
        leaveType: "ಅವಕಾಶ ರೀತಿ",
        startDate: "ಪ್ರಾರಂಭ ದಿನಾಂಕ",
        endDate: "ಅಂತಿಮ ದಿನಾಂಕ",
        status: "ಸ್ಥಿತಿ",
      }),
    },
    "employee-report-templates": {
      message: () => ({
        present: "ಉಪಸ್ಥಿತ",
        absent: "ಅನುಪಸ್ಥಿತ",
        leaves: "ಅವಕಾಶಗಳು",
        attendance: "ಹಾಜರಾ",
        date: "ದಿನಾಂಕ",
        shiftStatus: "ಶಿಫ್ಟ್ & ಸ್ಥಿತಿ",
        checkIn: "ಚೆಕ್ ಇನ್",
        checkOut: "ಚೆಕ್ ಔಟ್",
        requiredTime: "ಅಗತ್ಯವಿರುವ ಸಮಯ",
        actualTime: "ವಾಸ್ತವ ಸಮಯ",
        shiftDuration: "ಶಿಫ್ಟ್ ಅವಧಿ",
        leaveRequests: "ಅವಕಾಶ ಅರ್ಜಿಗಳು",
        leaveType: "ಅವಕಾಶ ರೀತಿ",
        startDate: "ಪ್ರಾರಂಭ ದಿನಾಂಕ",
        endDate: "ಅಂತಿಮ ದಿನಾಂಕ",
        status: "ಸ್ಥಿತಿ",
      }),
    },
    "emp-attendance-templates": {
      message: () => ({
        employeeAttendenceLogs: "ನೌಕರ ಹಾಜರಾತಿ ದಾಖಲೆಗಳು",
        totalTickets: "ಒಟ್ಟು ಟಿಕೆಟ್‌ಗಳು",
        ticketOpen: "ಟಿಕೆಟ್ ತೆರೆದಿದೆ",
        ticketClosed: "ಟಿಕೆಟ್ ಮುಚ್ಚಲಾಗಿದೆ",
        employeeAttendenceLog: "ನೌಕರ ಹಾಜರಾತಿ ದಾಖಲೆ",
      }),
    },
    "all-emp-ticket-templates": {
      message: () => ({
        employeeTickets: "ನೌಕರ ಟಿಕೆಟ್ಗಳು",
        totalTickets: "ಒಟ್ಟು ಟಿಕೆಟ್‌ಗಳು",
        ticketOpen: "ಟಿಕೆಟ್ ತೆರೆದಿದೆ",
        ticketClosed: "ಟಿಕೆಟ್ ಮುಚ್ಚಲಾಗಿದೆ",
        ticketsOpen: "ಟಿಕೆಟ್‌ಗಳು ತೆರೆದಿವೆ",
        ticketsClosed: "ಟಿಕೆಟ್‌ಗಳು ಮುಚ್ಚಲಾಗಿವೆ",
      }),
    },
    "all-emp-report-templates": {
      message: () => ({
        employees: "ನೌಕರರು",
        employeesInfo: "ನೌಕರರ ಮಾಹಿತಿ",
        employee: "ನೌಕರ",
        position: "ಹೊಸದು",
        shiftTimings: "ಶಿಫ್ಟ್ ಸಮಯ",
        joiningDate: "ಸೇರಿದ ದಿನಾಂಕ",
      }),
    },
    addBranch: {
      message: () => ({
        body: `"ಸ್ಥಳವನ್ನು ಸೇರಿಸು" ಬಟನ್ ಅನ್ನು ಕ್ಲಿಕ್ ಮಾಡುವ ಮೂಲಕ ಸ್ಥಳವನ್ನು ಸೇರಿಸಿ.`,
        label: {
          title: "Geo Fencing",
          heading: "Place Coordinates",
          rangelabel: "Range",
          rangeheadinglabel: "Range must be 200 meters and above",
          branchnamelabel: "Place Name",
        },
      }),
    },
    delete: {
      message: () =>
        `ಹಲೋ, ದಯವಿಟ್ಟು ಕೆಳಗಿನ ಆಯ್ಕೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:\n1. ಉದ್ಯೋಗಿಗಳನ್ನು ತೆಗೆದುಹಾಕಿ: ಸಂಸ್ಥೆಯಿಂದ ಉದ್ಯೋಗಿಗಳನ್ನು ತೆಗೆದುಹಾಕಿ.\n2. ಸ್ಥಳವನ್ನು ತೆಗೆದುಹಾಕಿ: ಸ್ಥಳದಿಂದ ಉದ್ಯೋಗಿಗಳನ್ನು ತೆಗೆದುಹಾಕಿ`,
      buttons: [
        { id: "remove-employees", title: "ನೌಕರರನ್ನು ತೆಗೆದುಹಾಕಿ" },
        { id: "remove-branch", title: "ಸ್ಥಳ ತೆಗೆದುಹಾಕಿ" },
      ],
    },
    dateRangeReport: {
      message: () => ({
        body: `ನಿಮ್ಮ ಪರಿಶೀಲನೆಗಾಗಿ ನಾವು ಸಮಗ್ರ ದಿನಾಂಕ ಶ್ರೇಣಿಯ ವರದಿಯನ್ನು ಸಿದ್ಧಪಡಿಸಿದ್ದೇವೆ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಆದ್ಯತೆಯ ದಿನಾಂಕ ಶ್ರೇಣಿಯನ್ನು ನಿರ್ದಿಷ್ಟಪಡಿಸಿ ಮತ್ತು ನಾವು ನಿಮಗೆ ಒಳನೋಟಗಳು ಮತ್ತು ವಿಶ್ಲೇಷಣೆಯನ್ನು ತ್ವರಿತವಾಗಿ ಒದಗಿಸುತ್ತೇವೆ.`,
        label: {
          title: "ದಿನಾಂಕ ಶ್ರೇಣಿ ವರದಿ",
          startdatelabel: "ಪ್ರಾರಂಭ ದಿನಾಂಕ",
          enddatelabel: "ಕೊನೆಯ ದಿನಾಂಕ",
        },
      }),
    },
    attendanceManagement: {
      message: () => ({
        body: ``,
        label: {
          label1: "ವರದಿಗಳು ಮತ್ತು ಅನುಮೋದ",
          label2: "ವರದಿಗಳು",
          label3: "ತಂಡ",
          label7: "ಸ್ಥಳಗಳನ್ನು ಸವರಿಸಿ",
          label9: "ಸ್ಥಳಗಳನ್ನು ಅಳಿಸಿ",
          label10: "ಶಿಫ್ಟ್ ಸಮಯಗಳನ್ನು ಸವರ",
          label11: "ಕರ್ಮಚಾರಿಯನ್ನು ಅಳಿಸಿ",
          labeldelete: "ಅಳಿಸಲು ಆಯ್ಕೆಗಳು",
          labeledit: "ಸವರಿಸಲು ಆಯ್ಕೆಗಳು",
          labelbusiness: "ವ್ಯಾಪಾರ ಸೆಟ್ಟಿಂಗ್‌ಗಳ",
          labelBussinessRadio: "ಸಂಪಾದನೆ ಸೆಟ್ಟಿಂಗ್",
          reportsdd: [
            {
              id: "yesterdayreport",
              title: "ನಿನ್ನೆ ವರದಿ",
            },
            {
              id: "currentmonth",
              title: "ಈ ತಿಂಗಳು",
            },
            {
              id: "customdaterangepdf",
              title: "ದಿನಾಂಕ ವರದಿ(PDF)",
            },
            {
              id: "allEmployees",
              title: "ಎಲ್ಲಾ ಉದ್ಯೋಗಿಗಳ ವರದಿ",
            },
          ],
          quick: [
            {
              id: "livereport",
              title: "ಲೈವ್ ವರದಿ",
            },
            {
              id: "leaveApprovals",
              title: "ಅನುಮೋದನೆಗಳನ್ನು ಬಿಡಿ",
            },
            {
              id: "attendanceCorrections",
              title: "ಹಾಜರಾತಿ ತಿದ್ದುಪಡಿ",
            },
            {
              id: "supportTickets",
              title: "ಬೆಂಬಲ ಟಿಕೆಟ್‌ಗಳು",
            },
            {
              id: "taskApprovals",
              title: "ಕಾರ್ಯ ಅನುಮೋದನೆ",
            },
            {
              id: "broadcast",
              title: "ಪ್ರಸಾರ",
            },
          ],
          labelBussinessList: [
            {
              id: "editBusiness",
              title: "ಸಂಪಾದನೆ ಸೆಟ್ಟಿಂಗ್",
            },
          ],
        },
      }),
    },
    contacts: {
      message: () => `ಕ್ಷಮಿಸಿ! ನೀವು ಸಂಪರ್ಕಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಿಲ್ಲ.`,
    },
    contactsUpdate: {
      message: () =>
        `ಉದ್ಯೋಗಿ ವಿವರಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ ಎಂದು ನಿಮಗೆ ತಿಳಿಸಲು ನನಗೆ ಸಂತೋಷವಾಗಿದೆ.`,
    },
    placeCreated: {
      message: () =>
        `ಹೊಸ ಸ್ಥಳ ಮತ್ತು ಜಿಯೋ ಫೆನ್ಸಿಂಗ್ ಅನ್ನು ಯಶಸ್ವಿಯಾಗಿ ರಚಿಸಲಾಗಿದೆ ಎಂದು ನಾವು ನಿಮಗೆ ತಿಳಿಸಲು ಬಯಸುತ್ತೇವೆ`,
    },
    employeeGeoFencing: {
      message: () =>
        `ಉದ್ಯೋಗಿ ಜಿಯೋ-ಫೆನ್ಸಿಂಗ್ ಅನ್ನು ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ ಎಂದು ನಾವು ನಿಮಗೆ ತಿಳಿಸಲು ಬಯಸುತ್ತೇವೆ.`,
    },
    employeeRemove: {
      message: () => `ಉದ್ಯೋಗಿಯನ್ನು ಸಂಸ್ಥೆಯಿಂದ ತೆಗೆದುಹಾಕಲಾಗಿದೆ ಎಂದು ನಾವು ನಿಮಗೆ ತಿಳಿಸಲು ಬಯಸುತ್ತೇವೆ.`,
    },
    employeeRemovePlace: {
      message: () => `ಉದ್ಯೋಗಿಗಳನ್ನು ಸ್ಥಳದಿಂದ ತೆಗೆದುಹಾಕಲಾಗಿದೆ ಎಂದು ನಾವು ನಿಮಗೆ ತಿಳಿಸಲು ಬಯಸುತ್ತೇವೆ`,
    },
    placeDeleted: {
      message: () => `ಸ್ಥಳವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಅಳಿಸಲಾಗಿದೆ.`,
    },
    broadcast: {
      message: () => ({
        body: `ನಿಮ್ಮ ಎಲ್ಲಾ ಉದ್ಯೋಗಿಗಳಿಗೆ ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಪ್ರಸಾರ ಮಾಡಿ`,
        label: {
          broadcastLabel: "ಪ್ರಸಾರ ಸಂದೇಶ",
          filesLabel: "ಕಡತಗಳು",
          employeesLabel: "ನೌಕರರು",
          fileRadios: [
            {
              id: "document",
              title: "ದಸ್ತಾವೇಜ",
            },
            {
              id: "image",
              title: "ಚಿತ್ರ",
            },
            {
              id: "video",
              title: "ವಿಡಿಯೋ",
            },
          ],
        },
        list: {},
      }),
    },
  },
  Gujarati: {
    hi: {
      message: (name) => `હલો ${name}\n હું તમારો મિત્રક હું છું અને તમારી સહાય માટે અહીં છું.`,
      buttons: [
        {
          id: "MarkAttendance",
          title: "હાજરી મારો",
        },
        {
          id: "Report",
          title: "અહીંથી સંદેશો",
        },
        {
          id: "Other",
          title: "અન્ય",
        },
      ],
    },
    MarkAttendance: {
      message: () =>
        "*હાજરી મારો*\n\n- તમારા કામનું આરંભ કરવા માટે, [IN] પર ક્લિક કરો.\n- તમારા કામનું સમાપન કરવા માટે, [OUT] પર ક્લિક કરો.",
      buttons: [
        { id: "in", title: "🟢 IN" },
        { id: "out", title: "🔴 OUT" },
      ],
    },
    in: {
      message: () =>
        "*સ્થળ* \n📍 આપનું વર્તમાન સ્થાન આપો, આ પ્રક્રિયાને અનુસરતાં:\n1. 📩 આ સંદેશ પસંદ કરો.\n2. 💬 'જવાબ આપો' પર ક્લિક કરો.\n3. 📎 એટેચમેન્ટ અથવા ક્લિપ આઇકન પર ટેપ કરો.\n4. 📍 'સ્થાન' પસંદ કરો.\n5. ✅ 'તમારો વર્તમાન સ્થાન મોકલો' પસંદ કરો.",
    },
    out: {
      message: () =>
        "*સ્થળ* \n📍 આપનું વર્તમાન સ્થાન આપો, આ પ્રક્રિયાને અનુસરતાં:\n1. 📩 આ સંદેશ પસંદ કરો.\n2. 💬 'જવાબ આપો' પર ક્લિક કરો.\n3. 📎 એટેચમેન્ટ અથવા ક્લિપ આઇકન પર ટેપ કરો.\n4. 📍 'સ્થાન' પસંદ કરો.\n5. ✅ 'તમારો વર્તમાન સ્થાન મોકલો' પસંદ કરો.",
    },
    attendanceLocation: {
      message: () => "📸 હાજરી માટે, કૃપયા આપનો સ્થાન દર્શાવતી ફોટો મોકલો જો છો.",
    },
    clickAttendanceLocation: {
      message: () =>
        "*⚠️ સોંપવો નહીં* . પ્રથમ, ખાતરી લો કે તમે *જવાબ આપી* રહ્યા છો, પછી 'તમારો વર્તમાન સ્થાન મોકલો' પસંદ કરો.\n📍 આપનો વર્તમાન સ્થાન આપવાની પ્રક્રિયા આને અનુસરો:\n1. 📩 આ સંદેશ પસંદ કરો.\n2. 💬 'જવાબ આપો' પર ક્લિક કરો.\n3. 📎 એટેચમેન્ટ અથવા ક્લિપ આઇકન પર ટેપ કરો.\n4. 📍 'સ્થાન' પસંદ કરો.",
    },
    locNotInRange: {
      message: () =>
        `🚫 અમે દિલગીર છીએ, પરંતુ અમે આ સમયે તમારું સ્થાન 📍 અને હાજરી ⏲️ રજીસ્ટર કરી શક્યા નથી. તમે કંપનીની રેન્જમાં નથી 🚷. કૃપા કરીને કંપનીની શ્રેણીમાં જાઓ અને પછી શરૂઆતથી ફરી પ્રયાસ કરો 🔁.👣`,
    },
    attendancePic: {
      message: () => "📸 કૃપયા તમારો ફોટો મોકલો 🤳.",
    },
    Report: {
      message: () => "તમારો વર્તમાન મહિનો અથવા પાછલો મહિનો રિપોર્ટ ડાઉનલોડ કરો",
      buttons: [
        {
          id: "currentMonth",
          title: "વર્તમાન મહિનો",
        },
        // {
        //   id: 'previousMonth',
        //   title: 'પાછલો મહિનો',
        // },
      ],
    },
    uploadEmployee: {
      message: () => "કૃપા કરીને તમામ કર્મચારીઓનો સંપર્ક માહિતી અપલોડ કરો.",
    },
    Other: {
      message: () =>
        "હલો! આજ અમે તમને કેવી રીતે સહાય કરી શકીએ? કૃપયા નીચેની વિકલ્પોમાંથી પસંદ કરો.",
      buttons: [
        {
          id: "requestLeave",
          title: "વિનંતી કરો",
        },
        {
          id: "support",
          title: "સહાય",
        },
        // {
        //   id: 'question',
        //   title: 'પ્રશ્ન કરો',
        // },
      ],
    },
    startLeaveRequest: {
      message: () =>
        "અમે સફળતાપૂર્વક એટેન્ડન્સ ડેમો પૂર્ણ કર્યો છે. આગળની ડેમો એ છે કે તમે રજા માટે કેવી રીતે વિનંતી કરી શકો છો.",
      buttons: [{ id: "requestLeave", title: "Start Request Leave" }],
    },
    requestLeave: {
      message: () => "થોડી વખત્નો વિચાર કર રહ્યા છો? કૃપયા મુકાબલે દિવસો મુકાબલે અપાતકીએ:",
      buttons: [
        { id: "oneDay", title: "એક દિવસ" },
        { id: "moreThanOneDay", title: "એક દિવસ કે વધુ" },
      ],
    },
    oneDay: {
      message: () => ({
        body: "કૃપયા નીચેનો બટન દબાવીને તારીખ અને કારણ ની વ્યાખ્યાની રીતે નમૂનીકરણ કરો",
        label: {
          title: "અવકાશનો વિનંતી",
          startdatelabel: "શરૂ તારીખ",
          enddatelabel: "અંત તારીખ",
          reasonlabel: "અવકાશનો કારણ",
        },
      }),
    },
    moreThanOneDay: {
      message: () => ({
        body: "કૃપયા નીચેનો બટન દબાવીને તારીખ અને કારણ ની વ્યાખ્યાની રીતે નમૂનીકરણ કરો",
        label: {
          title: "અવકાશનો વિનંતી",
          startdatelabel: "શરૂ તારીખ",
          enddatelabel: "અંત તારીખ",
          reasonlabel: "અવકાશનો કારણ",
        },
      }),
    },
    leaveSummary: {
      message: (
        employeeName,
        department,
        leaveType,
        startDate,
        endDate,
        reasonForLeave,
        ticketNumber,
        recipientPhone
      ) =>
        `નામ: *${employeeName}*\nવિભાગ: *${
          department ?? "-"
        }* \nમાટે: *વિનંતી કરો*\nરજા પ્રકાર: *${leaveType}*\nપ્રારંભ તારીખ: *${startDate}*\n${
          endDate !== "અમાન્ય તારીખ" ? `અંત તારીખ: *${endDate}*\n` : ""
        }કારણ: *${reasonForLeave}*\nનંબર : *${recipientPhone}* \nટિકિટ નંબર: *${ticketNumber}*`,
    },
    support: {
      message: () =>
        "આપનું સ્વાગત છે! અમે તમારી સહાય કરવા માટે અહીં છીએ. કૃપયા કરીને તમારી આવતી મશકુકો પસંદ કરો:",
      buttons: [
        {
          title: `🔎 મશકુકો`,
          headers: `🔎 મશકુકો`,
          rows: [
            {
              id: "check-in",
              title: "ચેક ઇન",
              description: "ચેક ઇન મસ્યુદો",
            },
            {
              id: "check-out",
              title: "ચેક આઉટ",
              description: "ચેક આઉટ મસ્યુદો",
            },
            {
              id: "salary-issue",
              title: "પગાર મસ્યુદો",
              description: "પગાર મસ્યુદો",
            },
            {
              id: "other-issue",
              title: "અન્ય ❓",
              description: "અન્ય મસ્યુદો",
            },
          ],
        },
      ],
    },
    checkIn: {
      message: () => "કૃપા કરીને તમારી ટિપ્પણી ટાઇપ કરો.",
    },
    checkOut: {
      message: () => "કૃપા કરીને તમારી ટિપ્પણી ટાઇપ કરો.",
    },
    other_issue: {
      message: () => "કૃપા કરીને તમારી ટિપ્પણી ટાઇપ કરો. ",
    },
    Salary_Issue: {
      message: () => "કૃપા કરીને તમારી ટિપ્પણી ટાઇપ કરો. ",
    },
    employeeIssue: {
      message: () => "કૃપયા તમારો મત આપો.",
    },
    sendIssue: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `નામ: *${name}*\nવિભાગ: *${
          department ?? "-"
        }*\nમાટે: *સહાય*\nમસ્યુદો : *${problem}*\nમાત્ર: *${message}*\nનંબર : *${recipientPhone}*\nટિકિટ નંબર : *${ticketNumber}*`,
      buttons: (employeeNumber, ticketNumber) => [
        { title: "મંજૂર", id: `issue_approve-${employeeNumber}-${ticketNumber}` },
        { title: "અસ્વીકાર", id: `issue_reject-${employeeNumber}-${ticketNumber}` },
        { title: "ધરાવું", id: `issue_hold-${employeeNumber}-${ticketNumber}` },
      ],
    },
    sendLeave: {
      message: (employeeName, leaveType, startDate, endDate, reason) =>
        `*છોડાની વિનંતી સૂચના* \n👤 કર્મચારીનું નામ: ${employeeName}\nછોડનો પ્રકાર: ${leaveType}\nપ્રારંભ તારીખ: *${startDate}*\n${
          endDate !== "Invalid Date" ? `સમાપ્તિ તારીખ: *${endDate}*\n` : ""
        }\nકારણ: ${reason}કૃપા કરીને સમીક્ષા કરો અને જરૂરી પગલાં લો.`,
      buttons: (employeePhone, ticketNumber) => [
        {
          id: `request_approve-${employeePhone}-${ticketNumber}`,
          title: "મંજૂર",
        },
        {
          id: `request_reject-${employeePhone}-${ticketNumber}`,
          title: "અસ્વીકાર",
        },
        {
          id: `request_hold-${employeePhone}-${ticketNumber}`,
          title: "રૂકાના",
        },
      ],
    },
    registerComplain: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `નામ: *${name}*\nવિભાગ: *${
          department ?? "-"
        }*\nમાટે: *સહાય*\nમસ્યુદો : *${problem}*\nમાત્ર: *${message}*\nનંબર : *${recipientPhone}*\nટિકિટ નંબર : *${ticketNumber}*`,
    },
    approvals: {
      buttons: [
        { title: "મળવું-મંજૂરી", id: "leaveApprove" },
        { title: "એક્ટિવ મસ્યુદો", id: "activeIssues" },
      ],
      message: () =>
        `હલો, કૃપયા નીચેની વિકલ્પની પસંદ કરો:\n 1️⃣ મંજૂર કરવાની વિનંતીઓ.\n 2️⃣ તમારી મંજૂરી માટે વાંચવા માટે બન્યો મસ્યુદો જોઈએ.\nમાત્ર મેળવાનો બટન પર ક્લિક કરો!`,
    },
    leaveApprove: {
      message: () =>
        `*કર્મચારી રજાની જાણ*\nપ્રિય એમ્પ્લોયર, એક કર્મચારી દ્વારા રજાની વિનંતી છે\n *ટિકિટ નંબર: RL4545* \n *નામ*: રામ \n *તારીખ*: 23/12/2023 \n *કારણ* : લગ્ન \n *પ્રકાર* : રજાની વિનંતી કરો`,
      buttons: [
        { title: "મંજૂર", id: "request_approve" },
        { title: "અસ્વીકાર", id: "request_reject" },
        { title: "ધરાવું", id: "request_hold" },
      ],
    },
    activeIssues: {
      message: () =>
        `*કર્મચારી ઈસ્યુ રિપોર્ટ*\nપ્રિય એમ્પ્લોયર, કર્મચારી દ્વારા એક સમસ્યાની જાણ કરવામાં આવી છે:\n *કર્મચારીનું નામ* : શામ \n *સમસ્યા* : પગાર \n *સમસ્યાનું વર્ણન* : પગાર ઓછો જમા\nકૃપા કરીને યોગ્ય પગલાં લો આ ચિંતાને દૂર કરવા માટે.`,
      buttons: [
        { title: "મંજૂર", id: "issue_approve" },
        { title: "અસ્વીકાર", id: "issue_reject" },
        { title: "ધરાવું", id: "issue_hold" },
      ],
    },
    issue_approve: {
      message: () =>
        "સ્થિતિ અપડેટ: હોલ્ડ પર \nઅમે પરિસ્થિતિની સમીક્ષા અને મૂલ્યાંકન કરીએ છીએ ત્યાં સુધી તમારી વિનંતી/અરજી હાલમાં હોલ્ડ પર છે.\nઆ સમય દરમિયાન અમે તમારી ધીરજની પ્રશંસા કરીએ છીએ.",
    },
    issue_reject: {
      message: () =>
        "સ્થિતિ અપડેટ: અસ્વીકાર \nઅમે તમને જણાવતા ખેદ અનુભવીએ છીએ કે તમારી વિનંતી/અરજી નકારી કાઢવામાં આવી છે.\nઅમે તમારી સમજની પ્રશંસા કરીએ છીએ.",
    },
    issue_hold: {
      message: () =>
        "સ્થિતિ અપડેટ: હોલ્ડ પર \nઅમે પરિસ્થિતિની સમીક્ષા અને મૂલ્યાંકન કરીએ છીએ ત્યાં સુધી તમારી વિનંતી/અરજી હાલમાં હોલ્ડ પર છે.\nઆ સમય દરમિયાન અમે તમારી ધીરજની પ્રશંસા કરીએ છીએ.",
    },
    request_approve: {
      message: () =>
        `*લીવ વિનંતી અપડેટ*: મંજૂર\nઅમને તમને જણાવતા આનંદ થાય છે કે તમારી રજા માટેની વિનંતી મંજૂર કરવામાં આવી છે!\nતમારી ધીરજ અને સહકાર બદલ આભાર.`,
    },
    request_reject: {
      message: () =>
        `*નજીવની વિનંતી અપડેટ*: નકારી કાઢવામાં આવી \nઅમે તમને જણાવતા ખેદ અનુભવીએ છીએ કે તમારી રજા માટેની વિનંતી નકારી કાઢવામાં આવી છે.\nઅમે તમારી સમજની પ્રશંસા કરીએ છીએ.`,
    },
    request_hold: {
      message: () =>
        `*લીવ વિનંતી અપડેટ*: હોલ્ડ પર \nઅમે પરિસ્થિતિની સમીક્ષા અને મૂલ્યાંકન કરીએ છીએ ત્યારે તમારી રજા માટેની વિનંતી હાલમાં હોલ્ડ પર છે.\nઆ સમય દરમિયાન અમે તમારી ધીરજની પ્રશંસા કરીએ છીએ.`,
    },
    addEmployee: {
      message: (employeeName, employeeNumber, timing, geofen) =>
        `ઉમેરવું:\n*નામ*: ${employeeName}\n*નંબર*: ${employeeNumber}\n*પ્રકાર*: ${timing}\n*જીઓફેન્સિંગ*: ${geofen}`,
    },
    editEmployee: {
      message: () => ({
        body: `કર્મચારીને સંપાદિત કરો બટન પર ક્લિક કરીને કર્મચારીને સંપાદિત કરો અને ફોર્મ ભરો.`,
        label: {
          title: "કર્મચારીના વિગતોને સંપાદિત કરો",
          employeeNameLabel: "કર્મચારીનું નામ",
          employeeNumberLabel: "કકર્મચારી મોબાઈલ નંબર",
          timingTypeLabel: "સમય પ્રકાર",
          workingHoursNote: "લચિલ કામ કરવાનો સમય",
          checkInOutNote: "નિર્ધારિત સમય: ચેક-ઇન અને ચેક-આઉટ",
          checkInLabel: "ચેક-ઇન",
          checkOutLabel: "ચેક-આઉટ",
          workingHoursLabel: "કામ કરવાનો સમય",
          designationLabel: "હોદ",
          branchLabel: "સ્થળ",
          joiningDateLabel: "જોડાઇના તારીખ",
          dobLabel: "જન્મ તારીખ",
        },
        list: {
          timingTyperadio: [
            {
              id: "Flexible",
              title: "લચીલ સમય",
            },
            {
              id: "Fixed",
              title: "ફિક્સ સમય",
            },
          ],
          shiftTyperadio: [
            {
              id: "day",
              title: "ડે શિફ્ટ",
            },
            {
              id: "day/night",
              title: "ડે/નાઇટ શિફ્ટ",
            },
          ],
          workdaysList: [
            {
              id: "0",
              title: "રવિવાર",
            },
            {
              id: "1",
              title: "સોમવાર",
            },
            {
              id: "2",
              title: "મંગળવાર",
            },
            {
              id: "3",
              title: "બુધવાર",
            },
            {
              id: "4",
              title: "ગુરુવાર",
            },
            {
              id: "5",
              title: "શુક્રવાર",
            },
            {
              id: "6",
              title: "શનિવાર",
            },
          ],
          proofList: [
            {
              id: "location",
              title: "સ્થાન",
            },
            {
              id: "image",
              title: "ફોટો",
            },
            {
              id: "logs",
              title: "લોગો",
            },
          ],
        },
      }),
    },
    ticketUpdate: {
      message: (ticketNumber) => `ટિકિટ નંબર: ${ticketNumber}નો સ્થિતિ સફળતાથી અપડેટ થયો છે`,
    },
    employerStart: {
      message: () =>
        "હેલો, કૃપયા આવતા વિકલ્પોમાંથી એક વિકલ્પ પસંદ કરો:\n\n1️⃣. રિપોર્ટ મેળવો: વિસ્તારથી રિપોર્ટ મેળવવા માટે આ બટન દબાવો..\n2️⃣. મંજૂરીઓ: કર્મચારીના મંજૂરીઓને તપાસવા અથવા વ્યવસ્થાપન કરવાની જરૂર છે? આ બટનનો ઉપયોગ કરીને સંચરણ કરવા માટે વાપરો.\n3️⃣. પ્રોફાઇલ/સેટિંગ્સ: તમારી પ્રોફાઇલ અને સેટિંગ્સને અહીં મેનેજ કરો.",
      buttons: [
        { id: "employerReports", title: "રિપોર્ટ મેળવો" },
        { id: "approvals", title: "મંજૂરીઓ" },
        { id: "profile-settings", title: "પ્રોફાઇલ સેટિંગ" },
      ],
    },
    employerReports: {
      message: () =>
        "સ્વાગત છે! કૃપા કરીને એક વિકલ્પ પસંદ કરો:\n1. લાઇવ રિપોર્ટ: રીઅલ-ટાઇમ અપડેટ્સ જુઓ.\n2. ગઈકાલનો રિપોર્ટ: ગઈકાલનો રિપોર્ટ ઍક્સેસ કરો.\n3. કર્મચારી માસ્ટર શીટ: કર્મચારી માસ્ટર શીટને ઍક્સેસ કરો.",
      // buttons: [
      //   {
      //     id: "liveReport",
      //     title: "લાઇવ રિપોર્ટ",
      //   },
      //   {
      //     id: "yesterdayReport",
      //     title: "ગઈકાલે અહેવાલ",
      //   },
      //   {
      //     id: "emp_master_sheet",
      //     title: "બધા કર્મચારી બતાવો",
      //   },
      // ],
      buttons: [
        {
          title: "Reports",
          headers: "Reports",
          rows: [
            {
              id: "liveReport",
              title: "લાઈવ રિપોર્ટ",
              description: "Download Live Report",
            },
            {
              id: "yesterdayReport",
              title: "ગઈકાલે અહેવાલ",
              description: "Download Yesterday Report",
            },
            {
              id: "dateRangeReport",
              title: "તારીખ શ્રેણી અહેવાલ",
              description: "Download Date Range Report",
            },
            {
              id: "emp_master_sheet",
              title: "કર્મચારી અહેવાલ",
              description: "Download Report of all your Employees",
            },
          ],
        },
      ],
    },
    employeeDemoStart: {
      buttons: [{ id: "MarkAttendance", title: "હાજરી મુકવું" }],
      message: () =>
        "1️⃣ *કર્મચારી ડેમો સ્ટેપ્સ*:\n   a. ✅ હાજરી મુકવું\n   b. 🙋 રિક્વેસ્ટ છોડો\n   c. 🎫 ટિકિટ ઉઠાવો\n   d. 📊 રિપોર્ટ જુઓ\n2️⃣ *નૌકરીદાર ડેમો સ્ટેપ્સ* (કર્મચારી ડેમો સ્ટેપ્સ પૂર્ણ કર્યા પછી)",
    },
    "addGeo-fencing-emplyer": {
      message: () => `શું તમે જીઓ-ફેન્સીંગ ઉમેરવા માંગો છો પછી નીચે બટન દબાવો`,
      buttons: [
        { id: "yes-geofencing", title: "હા" },
        { id: "no-geofencing", title: "ના" },
      ],
    },
    "yes-geofencing": {
      message: () => `કૃપા કરીને તમારી ઓફિસનું વર્તમાન સ્થાન શેર કરો`,
    },
    "office-geo-fencing": {
      message: () => `તમારી ઑફિસનું વર્તમાન સ્થાન પ્રદાન કરવા બદલ આભાર`,
    },
    "reminder-in": {
      message: () => `આગામી 5 મિનિટમાં ચેક-ઇનને માર્ક કરવા માટે આ એક મૈત્રીપૂર્ણ રીમાઇન્ડર છે`,
    },
    "reminder-out": {
      message: () => `આગામી 5 મિનિટમાં ચેક-આઉટને માર્ક કરવા માટે આ એક મૈત્રીપૂર્ણ રીમાઇન્ડર છે`,
    },
    employeeUploaded: {
      message: () =>
        "✅ કર્મચારીની પ્રોફાઇલ સફળતાપૂર્વક બનાવી છે.\nએક ઔપચારિક સૂચના અને હાજરી શરૂ કરવાનો સંદેશ કર્મચારીના વોટ્સએપ નંબર પર મોકલાઈ ગયો છે.\nકૃપા કરીને કર્મચારીઓને સૂચિત કરો કે તેઓ ત્વરિત રીતે ડેમો પૂર્ણ કરે અને તેમની હાજરી ચિહ્નિત કરવાનું શરૂ કરે.",
    },
    employeeDemoCompleted: {
      message: () =>
        "ડેમો સફળતાપૂર્વક પૂર્ણ થયો છે. આ નંબર પર તમારી દૈનિક હાજરી નોંધવાની વિનંતી કરાઈ છે. તમે કોઈપણ સમયે 'હાય' ટાઈપ કરીને પ્રવાહ શરૂ કરી શકો છો.",
    },
    "profile-settings": {
      message: () =>
        `*પ્રોફાઇલ સેટિંગ્સ*\n\nનીચેનો એક વિકલ્પ પસંદ કરો:\n\n1. *વ્યવસાય સેટિંગ્સ*:તમારી વ્યવસાય પસંદગીઓને ગોઠવો.\n2. *સૂચના*:દૈનિક ધોરણે લાઈવ રિપોર્ટ્સ માટે.\n3. *સંપાદિત કરો / કાઢી નાખો*\n\ta. શિફ્ટ ટાઇમિંગ સંપાદિત કરો`,
      // message: () =>
      //   `*પ્રોફાઇલ સેટિંગ્સ*\n\nનીચેનો એક વિકલ્પ પસંદ કરો:\n\n1. *વ્યવસાય સેટિંગ્સ*:તમારી વ્યવસાય પસંદગીઓને ગોઠવો.\n2. *સૂચના*:દૈનિક ધોરણે લાઈવ રિપોર્ટ્સ માટે.\n3. *સંપાદિત કરો / કાઢી નાખો*\n\ta. જીઓ ફેન્સીંગ સંપાદિત કરો\n\tb. શિફ્ટ ટાઇમિંગ સંપાદિત કરો`,
      buttons: [
        {
          id: "business-settings",
          title: "વ્યવસાય સેટિંગ્સ",
        },
        {
          id: "notification-settings",
          title: "સૂચનાઓ",
        },
        {
          id: "edit-delete",
          title: "સંપાદિત / કાઢવું",
        },
      ],
    },
    "business-settings": {
      message: () => ({
        body: `કૃપા કરીને નીચેના બટન પર ક્લિક કરીને તમારી વ્યવસાય માહિતી અપડેટ કરો. આભાર!`,
        label: {
          title: "વ્યાપાર સેટિંગ્સ સુધારો",
          employerNamelabel: "કર્મચારીનું નામ",
          employernolabel: "કર્મચારી નંબર",
          bufferTimelabel: "બફર સમય",
          companyNamelabel: "કંપનીનું નામ",
          monthlySickLeavelabel: "માસિક આજાદ છૂટ",
          casualLeavelabel: "સામાન્ય છૂટ",
          annualLeavelabel: "વાર્ષિક છૂટ",
          maternityLeaveAllowedlabel: "ગર્ભાવસ્થા છૂટ મંજૂર",
          paternityLeaveAllowedlabel: "પિતૃત્વ છૂટ મંજૂર",
          unpaidLeavePolicylabel: "અમંગણ છૂટ નીતિ",
          leaveEncashmentlabel: "છૂટ એનકેશમેન્ટ",
          consequencesUnapprovedLeavelabel: "મંજૂર થયેલ છૂટના પરિણામો",
          halfDayPolicylabel: "અર્ધ દિવસની નીતિ",
          Languagelabel: "ભાષા",
          carryForwardLimitlabel: "આગળ લઈ જાવવું મર્જી",
        },
      }),
    },
    "edit-delete": {
      message: () =>
        `તમે ફેરફાર અથવા કાઢી નાખવાનો વિકલ્પ પસંદ કર્યો છે. કૃપા કરીને નીચેની સુવિધાઓમાંથી પસંદ કરો\n\n1. શિફ્ટ સમય સંપાદિત કરો:કંપનીના સમયના આધારે કર્મચારીના સમયપત્રકને સમાયોજિત કરો.\n2.જિયો ફેન્સીંગ સંપાદિત કરો: ભૌગોલિક સીમાઓ અથવા પ્રતિબંધોને સંશોધિત કરો અથવા અપડેટ કરો.\n3.કાઢી નાખો:આ વિકલ્પ તમને કર્મચારીઓ સંબંધિત કોઈપણ ડેટાને કાઢી નાખવાની મંજૂરી આપે છે`,
      buttons: [
        { id: "edit-timings", title: "શિફ્ટ સમય સંપાદિત કર" },
        { id: "edit-geo-fencing", title: "ભૂ-અંચન સંપાદિત કરો" },
        { id: "delete", title: "કાઢી નાખો" },
      ],
    },
    "edit-timings": {
      message: () => ({
        body: `કૃપા કરીને શિફ્ટ ટાઇમિંગ્સ સંપાદિત કરવા માટે નીચેના બટનને ઍક્સેસ કરીને કર્મચારી સમયપત્રકનું સંચાલન અને ઑપ્ટિમાઇઝ કરો. આ બાબત પર તમારું ધ્યાન ખૂબ પ્રશંસાપાત્ર છે. આભાર.`,
        label: {
          title: "શિફ્ટ સમયોને સંપાદિત કરો",
          timingTypeLabel: "સમય પ્રકાર",
          checkInLabel: "ચેક ઇન",
          checkOutLabel: "ચેક આઉટ",
          workingHoursLabel: "કામ કરતાં સમય",
          branchLabel: "શાખાઓ",
          employeesLabel: "કર્મચારીઓ",
          shiftTyperadio: [
            {
              id: "day",
              title: "ડે શિફ્ટ",
            },
            {
              id: "day/night",
              title: "ડે/નાઇટ શિફ્ટ",
            },
          ],
          timingTyperadio: [
            {
              id: "Flexible",
              title: "લચીલ સમય",
            },
            {
              id: "Fixed",
              title: "ફિક્સ સમય",
            },
          ],
          workdaysList: [
            {
              id: "0",
              title: "રવિવાર",
            },
            {
              id: "1",
              title: "સોમવાર",
            },
            {
              id: "2",
              title: "મંગળવાર",
            },
            {
              id: "3",
              title: "બુધવાર",
            },
            {
              id: "4",
              title: "ગુરુવાર",
            },
            {
              id: "5",
              title: "શુક્રવાર",
            },
            {
              id: "6",
              title: "શનિવાર",
            },
          ],
        },
      }),
    },
    "edit-geo-fencing": {
      message: () =>
        `કૃપા કરીને જીઓ ફેન્સીંગ સેટિંગ્સને ઍક્સેસ કરવા અને સંપાદિત કરવા માટે નીચેના બટનનો ઉપયોગ કરીને કર્મચારી સ્થાનો પર ચોક્કસ નિયંત્રણની ખાતરી કરો. આ કાર્ય પર તમારું ધ્યાન મૂલ્યવાન છે. આભાર`,
    },
    link_employee: {
      message: () => ({
        body: `પ્લેસમાં નવું સ્થાન અને કર્મચારીઓ ઉમેરો`,
        label: {
          title: "જિયો ફેન્સિંગ",
          heading: "સ્થળ સૂચનાઓ",
          rangelabel: "શાખા",
          rangeheadinglabel: "શાખા 50 મીટર અને તેના ઉપર હોવું જોઈએ",
          employeelabel: "ઉદ્યોગશાખા લિંક સ્થળ માટે:",
          branchnamelabel: "સ્થળ નામ",
        },
      }),
    },
    edit_geolocation: {
      message: () => ({
        body: `નીચેના બટન પર ક્લિક કરીને કર્મચારીઓની જીઓ ફેન્સીંગને સંપાદિત કરો`,
        label: {
          title: "જિયો સ્થાન સંપાદિત કરો",
          workingHoursLabel: "વર્કિંગ કલાક",
          branchLabel: "કર્મચારી",
          timingTypeLabel: "સમય પ્રકાર",
          placelabel: "સ્થાન",
        },
      }),
    },
    "edit-notifs": {
      message: (companyName) => ({
        body: `અપડેટ બટન પર ક્લિક કરીને સૂચનાઓ અપડેટ કરો.`,
        label: {
          companyNamelabel: companyName,
          Notificationslabel: "સૂચનાઓ",
          dailyreportlabel: "દૈનિક સવાર રિપોર્ટ",
          dailyeveningreportlabel: "દૈનિક સાંજ રિપોર્ટ",
          monthendlabel: "મહિનાના અંતે રિપોર્ટ",
        },
        buttons: [
          { id: "checkIn", title: "ચેક-ઇન્સ" },
          { id: "checkOut", title: "ચેક-આઉટ" },
          { id: "leaveRequest", title: "રજા વિનંતિઓ" },
          { id: "support", title: "સપોર્ટ વિનંતિ" },
        ],
      }),
    },
    "notification-settings": {
      message: () =>
        `અમારી નવીનતમ સુવિધા સાથે તમારા સંચાલકીય અનુભવને બહેતર બનાવો - સૂચના સંપાદિત કરો બટન\n\nચેક ઇન કરો: જ્યારે તમારા કર્મચારીઓ ચેક-ઇન કરે ત્યારે સૂચના પ્રાપ્ત કરો.\nચેક આઉટ કરો: જ્યારે તમારા કર્મચારીઓ ચેક-આઉટ કરો ત્યારે સૂચના પ્રાપ્ત કરો.\nમોર્નિંગ રિપોર્ટ: એક લાઇવ રિપોર્ટ પ્રાપ્ત કરો સવાર.\nસાંજનો અહેવાલ: સાંજે લાઈવ રિપોર્ટ મેળવો.`,
      buttons: [{ id: "edit-notifs", title: "સૂચનાઓ સંપાદિત કરો" }],
    },
    "remove-employees": {
      message: () => ({
        body: `કર્મચારીને દૂર કરવાની પ્રક્રિયા શરૂ કરવા માટે કૃપા કરીને નીચેના બટનને ક્લિક કરો.`,
        label: {
          title: "કર્મચારીઓ દૂર કરો",
          employeesLabel: "કર્મચારીઓ",
          companylabel: "કંપનીનું નામ",
        },
      }),
    },
    "remove-branch": {
      message: () => ({
        body: `કર્મચારીને સ્થળ પરથી દૂર કરવા માટે કૃપા કરીને નીચેના બટનને ક્લિક કરો.`,
        label: {
          title: "કર્મચારીઓને સ્થળ પરથી દૂર કરો",
          branchLabel: "સ્થાનો",
          employeesLabel: "કર્મચારીઓ",
          companylabel: "કંપનીનું નામ",
        },
      }),
    },
    "live-report-templates": {
      message: () => ({
        employees: "કર્મચારીઓ",
        onTime: "સમય પર",
        late: "ઊંઘ",
        absent: "અનુપસ્થિત",
        onLeave: "રજા પર",
        attendance: "હાજરી",
        employee: "કર્મચારી",
        shiftStatus: "શિફ્ટ અને સ્થિતિ",
        checkIn: "ચેક ઇન",
        checkOut: "ચેક આઉટ",
        requiredTime: "આવશ્યક સમય",
        actualTime: "વાસ્તવિક સમય",
        shiftDuration: "શિફ્ટ અવધિ",
        leaveRequests: "રજાના અરજી",
        leaveType: "રજાનો પ્રકાર",
        startDate: "શરૂઆત તારીખ",
        endDate: "અંતિમ તારીખ",
        status: "સ્થિતિ",
      }),
    },
    "employee-report-templates": {
      message: () => ({
        present: "હાજર",
        absent: "અનુપસ્થિત",
        leaves: "રજા",
        attendance: "હાજરી",
        date: "તારીખ",
        shiftStatus: "શિફ્ટ અને સ્થિતિ",
        checkIn: "ચેક ઇન",
        checkOut: "ચેક આઉટ",
        requiredTime: "જરૂરી સમય",
        actualTime: "વાસ્તવિક સમય",
        shiftDuration: "શિફ્ટ કાલ",
        leaveRequests: "રજાઓની વિનંતિઓ",
        leaveType: "રજા પ્રકાર",
        startDate: "શરૂઆત તારીખ",
        endDate: "અંતિમ તારીખ",
        status: "સ્થિતિ",
      }),
    },
    "emp-attendance-templates": {
      message: () => ({
        employeeAttendenceLogs: "કર્મચારી હાજરી લોગ",
        totalTickets: "કુલ ટિકટ્સ",
        ticketOpen: "ટિકટ ખોલ્યું",
        ticketClosed: "ટિકટ બંધ",
        employeeAttendenceLog: "કર્મચારી હાજરી લોગ",
      }),
    },
    "all-emp-ticket-templates": {
      message: () => ({
        employeeTickets: "કર્મચારી ટિકટ્સ",
        totalTickets: "કુલ ટિકટ્સ",
        ticketOpen: "ટિકટ ખોલી",
        ticketClosed: "ટિકટ બંધ",
        ticketsOpen: "ટિકટ્સ ખોલેલા",
        ticketsClosed: "ટિકટ્સ બંધ",
      }),
    },
    "all-emp-report-templates": {
      message: () => ({
        employeesLabel: "કર્મચારીઓ",
        employeesInfo: "કર્મચારીઓની માહિતી",
        employee: "કર્મચારી",
        position: "પોઝિશન",
        shiftTimings: "શિફ્ટ ટાઇમિંગ્સ",
        joiningDate: "જોડાઇના તારીખ",
      }),
    },
    addBranch: {
      message: () => ({
        body: `"જગ્યા ઉમેરો" બટન પર ક્લિક કરીને સ્થળ ઉમેરો.`,
        label: {
          title: "Geo Fencing",
          heading: "Place Coordinates",
          rangelabel: "Range",
          rangeheadinglabel: "Range must be 200 meters and above",
          branchnamelabel: "Place Name",
        },
      }),
    },
    delete: {
      message: () =>
        `હેલો,કૃપા કરીને નીચેનો એક વિકલ્પ પસંદ કરો:\n1. કર્મચારીઓને દૂર કરો: કર્મચારીઓને સંસ્થામાંથી દૂર કરો.\n2. સ્થળ દૂર કરો: કર્મચારીઓને સ્થળ પરથી દૂર કરો`,
      buttons: [
        { id: "remove-employees", title: "કર્મચારીઓને દૂર કરો" },
        { id: "remove-branch", title: "સ્થળ દૂર કરો" },
      ],
    },
    dateRangeReport: {
      message: () => ({
        body: `અમે તમારી સમીક્ષા માટે એક વ્યાપક તારીખ શ્રેણી અહેવાલ તૈયાર કર્યો છે. કૃપા કરીને તમારી પસંદગીની તારીખ શ્રેણીનો ઉલ્લેખ કરો, અને અમે તમને તરત જ આંતરદૃષ્ટિ અને વિશ્લેષણ પ્રદાન કરીશું.`,
        label: {
          title: "તારીખ રેન્જ રિપોર્ટ",
          startdatelabel: " શરૂઆતની તારીખ",
          enddatelabel: " અંતિમ તારીખ",
        },
      }),
    },
    attendanceManagement: {
      message: () => ({
        body: `ઓટોવોટ એટેન્ડન્સ મેનેજમેન્ટ ચેટ બોટમાં આપનું સ્વાગત છે.`,
        label: {
          label1: "અહેવાલ અને મંજૂરીઓ",
          label2: "અહેવાલો",
          label3: "ટીમ",
          label7: "સ્થાનો સંપાદિત કરો",
          label9: "સ્થાનો કાઢો",
          label10: "શિફ્ટ સમય સંપાદિત ",
          label11: "કર્મચારી કાઢો",
          labeldelete: "કાઢવાની વિકલ્પો",
          labeledit: "સંપાદિત વિકલ્પો",
          labelbusiness: "વ્યાપાર સેટિંગ્સ",
          labelBussinessRadio: "વ્યવસાય સંપાદિત કરો",
          reportsdd: [
            {
              id: "yesterdayreport",
              title: "ગઈકાલે અહેવાલ",
            },
            {
              id: "currentmonth",
              title: "વર્તમાન મહિનો",
            },
            {
              id: "customdaterangepdf",
              title: "તારીખ અહેવાલ(PDF)",
            },
            {
              id: "allEmployees",
              title: "બધા કર્મચારીઓનો અહેવ",
            },
          ],
          quick: [
            {
              id: "livereport",
              title: "લાઈવ રિપોર્ટ",
            },
            {
              id: "leaveApprovals",
              title: "મંજૂરીઓ છોડો",
            },
            {
              id: "attendanceCorrections",
              title: "હાજરી સુધારણા",
            },
            {
              id: "supportTickets",
              title: "સપોર્ટ ટિકિટ",
            },
            {
              id: "taskApprovals",
              title: "કાર્ય મંજૂરી",
            },
            {
              id: "broadcast",
              title: "પ્રસારણ",
            },
          ],
          labelBussinessList: [
            {
              id: "editBusiness",
              title: "વ્યવસાય સંપાદિત કરો",
            },
          ],
        },
      }),
    },
    contacts: {
      message: () => `માફ કરશો! તમે સંપર્કો અપલોડ કરી શકતા નથી.`,
    },
    contactsUpdate: {
      message: () =>
        `મને તમને જણાવતા આનંદ થાય છે કે કર્મચારીની વિગતો સફળતાપૂર્વક અપડેટ કરવામાં આવી છે.`,
    },
    placeCreated: {
      message: () =>
        `અમે તમને જણાવવા માંગીએ છીએ કે નવી જગ્યા અને જીઓ-ફેન્સીંગ સફળતાપૂર્વક બનાવવામાં આવી છે`,
    },
    employeeGeoFencing: {
      message: () =>
        `અમે તમને જણાવવા માંગીએ છીએ કે કર્મચારીની જીઓ-ફેન્સિંગ સફળતાપૂર્વક અપડેટ કરવામાં આવી છે.`,
    },
    employeeRemove: {
      message: () => `અમે તમને જણાવવા માંગીએ છીએ કે કર્મચારીને સંસ્થામાંથી દૂર કરવામાં આવ્યો છે.`,
    },
    employeeRemovePlace: {
      message: () => `અમે તમને જણાવવા માંગીએ છીએ કે કર્મચારીઓને સ્થળ પરથી દૂર કરવામાં આવ્યા છે`,
    },
    placeDeleted: {
      message: () => `સ્થાન સફળતાપૂર્વક કાઢી નાખવામાં આવ્યું છે.`,
    },
    broadcast: {
      message: () => ({
        body: `તમારા બધા કર્મચારીઓને તમારો સંદેશ પ્રસારિત કરો`,
        label: {
          broadcastLabel: "પ્રસાર સંદેશ",
          filesLabel: "ફાઇલો",
          employeesLabel: "કર્મચારીઓ",
          fileRadios: [
            {
              id: "document",
              title: "દસ્તાવેજ",
            },
            {
              id: "image",
              title: "ચિત્ર",
            },
            {
              id: "video",
              title: "વિડિઓ",
            },
          ],
        },
        list: {},
      }),
    },
  },
  Odia: {
    hi: {
      message: (name) => `ନମସ୍କାର ${name}\n ଆପଣଙ୍କୁ ସହାୟତା କରିବା ଜଣେ Attendance Bot`,
      buttons: [
        {
          id: "MarkAttendance",
          title: "ହାଜିର ଦର୍ଶାଇବା",
        },
        {
          id: "Report",
          title: "ରିପୋର୍ଟ",
        },
        {
          id: "Other",
          title: "ଅନ୍ୟ",
        },
      ],
    },
    MarkAttendance: {
      message: () =>
        "*ହାଜିର ଦର୍ଶାଇବା*\n\n- କାମର ଦିନରେ ଶୁରୁ କରିବା ପାଇଁ, [IN] ଉପରେ କ୍ଲିକ କରନ୍ତୁ।\n- ଆପଣଙ୍କ କାମର ଦିନ ଶେଷ କରିବା ପାଇଁ, [OUT] ଉପରେ କ୍ଲିକ କରନ୍ତୁ।",
      buttons: [
        { id: "in", title: "🟢 IN" },
        { id: "out", title: "🔴 OUT" },
      ],
    },
    in: {
      message: () =>
        "*ସ୍ଥାନ* \n📍 ଦୟାକରି ଆପଣଙ୍କୁ ଆପଣଙ୍କର ସମ୍ପର୍କ ଅବଶ୍ୟ କରିବାକୁ ଆପଣଙ୍କୁ ଏହାରେ ପାଇଥାନ୍ତି:\n1. 📩 ଏହା ସଂଦଶକରୁ ଚୟନ କରନ୍ତୁ।\n2. 💬 'ଜବା' କ୍ଲିକ କରନ୍ତୁ।\n3. 📎 ଆଟାଚ୍‌ମେଣ୍ଟ କିମ୍ବା କ୍ଲିପ୍‌ ଆଇକନ୍‌ ଟିପିନ୍‌।\n4. 📍 'ସ୍ଥାନ' ଚୟନ କରନ୍ତୁ।\n5. ✅ 'ଆପଣଙ୍କର ବର୍ତମାନ ସ୍ଥାନ ପଠାନ୍ତୁ'।",
    },
    out: {
      message: () =>
        "*ସ୍ଥାନ* \n📍 ଦୟାକରି ଆପଣଙ୍କୁ ଆପଣଙ୍କର ସମ୍ପର୍କ ଅବଶ୍ୟ କରିବାକୁ ଆପଣଙ୍କୁ ଏହାରେ ପାଇଥାନ୍ତି:\n1. 📩 ଏହା ସଂଦଶକରୁ ଚୟନ କରନ୍ତୁ।\n2. 💬 'ଜବା' କ୍ଲିକ କରନ୍ତୁ।\n3. 📎 ଆଟାଚ୍‌ମେଣ୍ଟ କିମ୍ବା କ୍ଲିପ୍‌ ଆଇକନ୍‌ ଟିପିନ୍‌।\n4. 📍 'ସ୍ଥାନ' ଚୟନ କରନ୍ତୁ।\n5. ✅ 'ଆପଣଙ୍କର ବର୍ତମାନ ସ୍ଥାନ ପଠାନ୍ତୁ'।",
    },
    attendanceLocation: {
      message: () =>
        "📸 ଉପସ୍ଥିତି ପାଇଁ, ଦୟାକରି ଆପଣଙ୍କୁ ଆପଣଙ୍କର ସ୍ଥାନରେ ଆପଣଙ୍କୁ ଦେଖାଇବା ଛବି ପଠାନ୍ତୁ।",
    },
    clickAttendanceLocation: {
      message: () =>
        "*⚠️ ସ୍ଥାନରେ ଦେଇ ନଦିଆ* . ପ୍ରଥମେ, ଆପଣ *ପାଇଁ ପ୍ରତିଉତ୍ତରକୁ ଉତ୍ତର୍କୁ*, ପରେ 'ସ୍ଥାନ ପଠାନ୍ତୁ' ଚୟନ କରନ୍ତୁ:\n1. 📩 ଏହା ସଂଦଶକରୁ ଚୟନ କରନ୍ତୁ।\n2. 💬 'ଜବା' କ୍ଲିକ କରନ୍ତୁ।\n3. 📎 ଆଟାଚ୍‌ମେଣ୍ଟ କିମ୍ବା କ୍ଲିପ୍‌ ଆଇକନ୍‌ ଟିପିନ୍‌।\n4. 📍 'ସ୍ଥାନ' ଚୟନ କରନ୍ତୁ।",
    },
    locNotInRange: {
      message: () =>
        `🚫 ଆମେ ଦୁ sorry ଖିତ, କିନ୍ତୁ ଏହି ସମୟରେ ଆମେ ଆପଣଙ୍କର ଅବସ୍ଥାନ register ଏବଂ ଉପସ୍ଥାନ ପଞ୍ଜିକରଣ କରିପାରିଲୁ ନାହିଁ | ଆପଣ କମ୍ପାନୀର ପରିସର ମଧ୍ୟରେ ନାହାଁନ୍ତି 🚷। ଦୟାକରି କମ୍ପାନୀର ପରିସର ମଧ୍ୟରେ ଗତି କରନ୍ତୁ ଏବଂ ତା’ପରେ ଆରମ୍ଭରୁ ପୁନ ry ଚେଷ୍ଟା କରନ୍ତୁ 🔁.👣 |`,
    },
    attendancePic: {
      message: () => "📸 ଦୟାକରି ଆପଣଙ୍କୁ ଆପଣଙ୍କର ସେଲ୍ଫି ଫୋଟୋ ପଠାନ୍ତୁ 🤳।",
    },
    Report: {
      message: () => "ଆପଣଙ୍କର ବର୍ତ୍ତମାନ ମାସ ରିପୋର୍ଟ କିମ୍ବା ପୂର୍ବ ମାସ ରିପୋର୍ଟ ଡାଉନଲୋଡ କରନ୍ତୁ",
      buttons: [
        {
          id: "currentMonth",
          title: "ବର୍ତ୍ତମାନ ମାସ",
        },
        // {
        //   id: 'previousMonth',
        //   title: 'ପୂର୍ବ ମାସ',
        // },
      ],
    },
    uploadEmployee: {
      message: () => "ଦୟାକରି ସମସ୍ତ କର୍ମଚାରୀଙ୍କ ସମ୍ପର୍କ ଯାହାରେ ଆପଲୋଡ୍ କରନ୍ତି ତାହା କରନ୍ତୁ।",
    },
    Other: {
      message: () =>
        "ନମସ୍କାର! ଆମେ ଆପଣଙ୍କୁ ଆଜି କିଭଳି ସହାୟତା କରି ପାରୁ? ଦୟାକରି ନିମ୍ନଲିଖିତ ବିକଳ୍ପଗୁଡ଼ିକୁ ଚୟନ କରନ୍ତୁ।",
      buttons: [
        {
          id: "requestLeave",
          title: "ଇଚ୍ଛା ଛୁଟି",
        },
        {
          id: "support",
          title: "ସହଯୋଗ",
        },
        // {
        //   id: 'question',
        //   title: 'ସୁଚନା ଦେଇବା',
        // },
      ],
    },
    startLeaveRequest: {
      message: () =>
        "ଆମେ ସଫଳଭାବେ ଅଟେଣ୍ଡେନ୍ସ ଡେମୋ ସମାପ୍ତ କରିଛୁ। ପରବର୍ତ୍ତୀ ଡେମୋ ହେଉଛି ଆପଣ କିପରି ଛୁଟି ପାଇଁ ଅନୁରୋଧ କରିବେ।",
      buttons: [{ id: "requestLeave", title: "Start Request Leave" }],
    },
    requestLeave: {
      message: () =>
        "ଏକଟି ଛୁଟି ନିକାଳିବାରେ ଚିନ୍ତା କରୁ? ଦୟାକରି ଆମକୁ ଜଣାଇବାରେ କିତି ଦିନ ଆପଣ କେମିତି ବିଶେଷ ଅବଗତ କରାନ୍ତୁ:",
      buttons: [
        { id: "oneDay", title: "ଏକ ଦିନ" },
        { id: "moreThanOneDay", title: "ଏକ ଦିନ ଅଧିକ" },
      ],
    },
    oneDay: {
      message: () => ({
        body: "ଦୟାକରି ନିଚେ ଦିଆ ବଟନ ଦ୍ୱାରା ତାରିଖ ଏବଂ କାରଣ ସ୍ପେସିଫାଇ କରନ୍ତୁ।",
        label: {
          title: "ଅବକାଶ ଅନୁରୋଧ",
          startdatelabel: "ଆରମ୍ଭ ତାରିଖ",
          enddatelabel: "ଶେଷ ତାରିଖ",
          reasonlabel: "ଛାଡିବାର କାରଣ |",
        },
      }),
    },
    moreThanOneDay: {
      message: () => ({
        body: "ଦୟାକରି ନିଚେ ଦିଆ ବଟନ ଦ୍ୱାରା ତାରିଖ ଏବଂ କାରଣ ସ୍ପେସିଫାଇ କରନ୍ତୁ।",
        label: {
          title: "ଅବକାଶ ଅନୁରୋଧ",
          startdatelabel: "ଆରମ୍ଭ ତାରିଖ",
          enddatelabel: "ଶେଷ ତାରିଖ",
          reasonlabel: "ଛାଡିବାର କାରଣ |",
        },
      }),
    },
    leaveSummary: {
      message: (
        employeeName,
        department,
        leaveType,
        startDate,
        endDate,
        reasonForLeave,
        ticketNumber,
        recipientPhone
      ) =>
        `ନାମ: *${employeeName}*\nବିଭାଗ: *${
          department ?? "-"
        }* \nପାଇଁ: *ଇଚ୍ଛା ଛୁଟି*\nଛୁଟି ପ୍ରକାର: *${leaveType}*\nଆରମ୍ଭ ତାରଖ: *${startDate}*\n${
          endDate !== "Invalid Date" ? `ସମାପ୍ତି ତାରଖ: *${endDate}*\n` : ""
        }କାରଣ: *${reasonForLeave}*\nନମ୍ବର : *${recipientPhone}* \nଟିକେଟ ନମ୍ବର : *${ticketNumber}*`,
    },
    support: {
      message: () =>
        "ଆପନାଙ୍କୁ ସହାୟତା କରିବା ପାଇଁ ଆମେ ଆହ୍ଵାନ ରଖୁଛୁ। ଦୟାକରି ଆପଣ ଯେ ସ୍ଥିତି ମୁଳକୁ ପ୍ରବଳଦେବେ:",
      buttons: [
        {
          title: `🔎 ସମସ୍ୟାଗୁଡିକ`,
          headers: `🔎 ସମସ୍ୟାଗୁଡିକ`,
          rows: [
            {
              id: "check-in",
              title: "ଚେକ୍ ଇନ",
              description: "ଚେକ୍ ଇନ ସମସ୍ୟା",
            },
            {
              id: "check-out",
              title: "ଚେକ୍ ଆଉଟ",
              description: "ଚେକ୍ ଆଉଟ ସମସ୍ୟା",
            },
            {
              id: "salary-issue",
              title: "ଦରମୁକ୍ତି ସମସ୍ୟା",
              description: "ଦରମୁକ୍ତି ସମସ୍ୟା",
            },
            {
              id: "other-issue",
              title: "ଅନ୍ୟ ପ୍ରଶ୍ନ",
              description: "ଅନ୍ୟ ସମସ୍ୟା",
            },
          ],
        },
      ],
    },
    checkIn: {
      message: () => "ଦୟାକରି ଆପଣଙ୍କର ଟିପ୍ପଣୀ ଟାଇପ୍ କରନ୍ତୁ |",
    },
    checkOut: {
      message: () => "ଦୟାକରି ଆପଣଙ୍କର ଟିପ୍ପଣୀ ଟାଇପ୍ କରନ୍ତୁ |",
    },
    other_issue: {
      message: () => "ଦୟାକରି ଆପଣଙ୍କର ଟିପ୍ପଣୀ ଟାଇପ୍ କରନ୍ତୁ |",
    },
    Salary_Issue: {
      message: () => "ଦୟାକରି ଆପଣଙ୍କର ଟିପ୍ପଣୀ ଟାଇପ୍ କରନ୍ତୁ |",
    },
    employeeIssue: {
      message: () => "ଦୟାକରି ଆପଣଙ୍କ ସ୍ପଷ୍ଟ ମନ୍ତବ୍ୟ ଲେଖନ୍ତୁ।",
    },
    sendIssue: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `ନାମ: *${name}*\nବିଭାଗ: *${
          department ?? "-"
        }*\nସହାୟତାରେ: *ସମସ୍ୟା*\nସମସ୍ୟା: *${problem}*\nମେସେଜ: *${message}*\nନମ୍ବର : *${recipientPhone}*\nଟିକେଟ ନମ୍ବର : *${ticketNumber}*`,
      buttons: (employeeNumber, ticketNumber) => [
        { title: "ଅନୁମୋଦନ", id: `issue_approve-${employeeNumber}-${ticketNumber}` },
        { title: "ଅଗ୍ରାହ୍ୟ କରନ୍ତୁ |", id: `issue_reject-${employeeNumber}-${ticketNumber}` },
        { title: "ରହିଯାଅ", id: `issue_hold-${employeeNumber}-${ticketNumber}` },
      ],
    },
    sendLeave: {
      message: (employeeName, leaveType, startDate, endDate, reason) =>
        `* ଅନୁରୋଧ ବିଜ୍ଞପ୍ତି ଛାଡନ୍ତୁ *\n👤 କର୍ମଚାରୀଙ୍କ ନାମ: ${employeeName}\nଛାଡ ପ୍ରକାର: ${leaveType}\nଆରମ୍ଭ ତାରିଖ: *${startDate} *\n${
          endDate !== "Invalid Date" ? `ଶେଷ ତାରିଖ: *${endDate}*\n` : ""
        }\nକାରଣ: ${reason}ଦୟାକରି ସମୀକ୍ଷା କରନ୍ତୁ ଏବଂ ଆବଶ୍ୟକ ପଦକ୍ଷେପ ନିଅନ୍ତୁ |`,
      buttons: (employeePhone, ticketNumber) => [
        {
          id: `request_approve-${employeePhone}-${ticketNumber}`,
          title: "ଅନୁମୋଦନ",
        },
        {
          id: `request_reject-${employeePhone}-${ticketNumber}`,
          title: "ପ୍ରତ୍ୟାଖ୍ୟାନ କର |",
        },
        {
          id: `request_hold-${employeePhone}-${ticketNumber}`,
          title: "ରହିଯାଅ",
        },
      ],
    },
    registerComplain: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `ନାମ: *${name}*\nବିଭାଗ: *${
          department ?? "-"
        }*\nସହାୟତାରେ: *ସମସ୍ୟା*\nସମସ୍ୟା: *${problem}*\nମେସେଜ: *${message}*\nନମ୍ବର : *${recipientPhone}*\nଟିକେଟ ନମ୍ବର : *${ticketNumber}*`,
    },
    approvals: {
      buttons: [
        { title: "ଛୁଟି-ମଞ୍ଜୁର", id: "leaveApprove" },
        { title: "କ୍ରିୟାଶୀଳ-ସମସ୍ୟା", id: "activeIssues" },
      ],
      message: () =>
        `ନମସ୍କାର, ଦୟାକରି ନୀଚେ ଦିଆ ପରିକଳ୍ପନାଗୁଡ଼ିକୁ ଚୟନ କରନ୍ତୁ:\n 1️⃣ ଛୁଟି ମଞ୍ଜୁର କରନ୍ତୁ।\n 2️⃣ ଆପଣଙ୍କୁ ମଞ୍ଜୁରି କାମସ୍ୟା ଦର୍ଶାନ୍ତୁ।\nପରିମାଣ ବଟନ୍ରେ କ୍ଲିକ କରିବା ପାଇଁ ସହାୟକ ବଟନ୍ରେ କ୍ଲିକ କରନ୍ତୁ!`,
    },
    leaveApprove: {
      message: () =>
        `* କର୍ମଚାରୀଙ୍କ ଛୁଟି ରିପୋର୍ଟ ହୋଇଛି * \n ପ୍ରିୟ ନିଯୁକ୍ତିଦାତା, ଜଣେ କର୍ମଚାରୀଙ୍କ ଛୁଟି ଅନୁରୋଧ ଅଛି \n * ଟିକେଟ୍ ନଂ: RL4545 * \n * ନାମ *: ରାମ \n * ତାରିଖ *: 23/12/2023 \n * କାରଣ *: ବିବାହ \n * ପ୍ରକାର *: ଛୁଟି ଅନୁରୋଧ |`,
      buttons: [
        { title: "ଅନୁମୋଦନ", id: "request_approve" },
        { title: "ଅଗ୍ରାହ୍ୟ କରନ୍ତୁ |", id: "request_reject" },
        { title: "ରହିଯାଅ", id: "request_hold" },
      ],
    },
    activeIssues: {
      message: () =>
        `* କର୍ମଚାରୀ ଇସୁ ରିପୋର୍ଟ * \n ପ୍ରିୟ ନିଯୁକ୍ତିଦାତା, ଜଣେ କର୍ମଚାରୀଙ୍କ ଦ୍ reported ାରା ରିପୋର୍ଟ ହୋଇଥିବା ଏକ ସମସ୍ୟା ଅଛି: \n* କର୍ମଚାରୀଙ୍କ ନାମ *: ଶ୍ୟାମ \n * ଇସୁ *: ଦରମା \n * ଇସୁ ବର୍ଣ୍ଣନା *: ଦରମା କମ୍ କ୍ରେଡିଟ୍ \n ଦୟାକରି ଉପଯୁକ୍ତ ପଦକ୍ଷେପ ନିଅନ୍ତୁ | ଏହି ଚିନ୍ତାକୁ ସମାଧାନ କରିବାକୁ |`,
      buttons: [
        { title: "ଅନୁମୋଦନ", id: "issue_approve" },
        { title: "ଅଗ୍ରାହ୍ୟ କରନ୍ତୁ |", id: "issue_reject" },
        { title: "ରହିଯାଅ", id: "issue_hold" },
      ],
    },
    issue_approve: {
      message: () =>
        "ସ୍ଥିତି ଅଦ୍ୟତନ: ଅନୁମୋଦିତ \n ଆମେ ଆପଣଙ୍କୁ ଜଣାଇବାକୁ ଖୁସି ଯେ ଆପଣଙ୍କ ଅନୁରୋଧ / ଆବେଦନ ଅନୁମୋଦିତ ହୋଇଛି! \n ଆପଣଙ୍କର ଧ patience ର୍ଯ୍ୟ ଏବଂ ସହଯୋଗ ପାଇଁ ଆପଣଙ୍କୁ ଧନ୍ୟବାଦ |",
    },
    issue_reject: {
      message: () =>
        "ସ୍ଥିତି ଅଦ୍ୟତନ: ପ୍ରତ୍ୟାଖ୍ୟାନ \n ଆମେ ଆପଣଙ୍କୁ ଜଣାଇବାକୁ ଦୁ regret ଖିତ ଯେ ଆପଣଙ୍କର ଅନୁରୋଧ / ଆବେଦନ ପ୍ରତ୍ୟାଖ୍ୟାନ ହୋଇଛି | \n ଆମେ ଆପଣଙ୍କର ବୁ understanding ାମଣାକୁ ପ୍ରଶଂସା କରୁଛୁ |",
    },
    isuue_hold: {
      message: () =>
        "ସ୍ଥିତି ଅଦ୍ୟତନ: ହୋଲ୍ଡରେ \n ତୁମର ଅନୁରୋଧ / ପ୍ରୟୋଗ ବର୍ତ୍ତମାନ ସ୍ଥିତିରେ ଅଛି ଯେତେବେଳେ ଆମେ ପରିସ୍ଥିତିର ସମୀକ୍ଷା ଏବଂ ମୂଲ୍ୟାଙ୍କନ କରୁ |  ଏହି ସମୟ ମଧ୍ୟରେ ଆମେ ତୁମର ଧ patience ର୍ଯ୍ୟକୁ ପ୍ରଶଂସା କରୁ |",
    },
    request_approve: {
      message: () =>
        `*ଅନୁରୋଧ ଅପଡେଟ୍ ଛାଡନ୍ତୁ*: ଅନୁମୋଦିତ\n ଆମେ ଆପଣଙ୍କୁ ଜଣାଇବାକୁ ଖୁସି ଯେ ଆପଣଙ୍କ ଛୁଟି ଅନୁରୋଧ ଅନୁମୋଦିତ ହୋଇଛି!\n ଆପଣଙ୍କର ଧ patience ର୍ଯ୍ୟ ଏବଂ ସହଯୋଗ ପାଇଁ ଆପଣଙ୍କୁ ଧନ୍ୟବାଦ |`,
    },
    request_reject: {
      message: () =>
        `*ଅନୁରୋଧ ଅଦ୍ୟତନ ଛାଡନ୍ତୁ*: ପ୍ରତ୍ୟାଖ୍ୟାନ\n ଆମେ ଆପଣଙ୍କୁ ଜଣାଇବାକୁ ଦୁ regret ଖିତ ଯେ ଆପଣଙ୍କର ଛୁଟି ଅନୁରୋଧ ପ୍ରତ୍ୟାଖ୍ୟାନ ହୋଇଛି |\n ଆମେ ଆପଣଙ୍କର ବୁ understanding ାମଣାକୁ ପ୍ରଶଂସା କରୁଛୁ |`,
    },
    request_hold: {
      message: () =>
        `*ଅନୁରୋଧ ଅପଡେଟ୍ ଛାଡନ୍ତୁ*: ହୋଲ୍ଡରେ\n ଆପଣଙ୍କ ଛୁଟି ଅନୁରୋଧ ବର୍ତ୍ତମାନ ସ୍ଥଗିତ ଅଛି ଯେତେବେଳେ ଆମେ ପରିସ୍ଥିତିର ସମୀକ୍ଷା ଏବଂ ମୂଲ୍ୟାଙ୍କନ କରୁ |\n ଏହି ସମୟ ମଧ୍ୟରେ ଆପଣଙ୍କ ଧ patience ର୍ଯ୍ୟକୁ ଆମେ ପ୍ରଶଂସା କରୁ |`,
    },
    addEmployee: {
      message: (employeeName, employeeNumber, timing, geofen) =>
        `ଯୋଡଣା:\n*ନାମ*: ${employeeName}\n*ନମ୍ବର*: ${employeeNumber}\n*ପ୍ରକାର*: ${timing}\n*ଭୂ-ଫେନ୍ସିଂ*: ${geofen}`,
    },
    editEmployee: {
      message: () => ({
        body: `କର୍ମଚାରୀ ସଂପାଦନ ବଟନ୍ କ୍ଲିକ୍ କରି ଫର୍ମ ପୂରଣ କରି କର୍ମଚାରୀ ସଂପାଦନ କରନ୍ତୁ |`,
        label: {
          title: "କର୍ମଚାରୀ ବିବରଣୀ ସମ୍ପାଦନ କରନ୍ତୁ",
          employeeNameLabel: "କର୍ମଚାରୀଙ୍କର ନାଁ",
          employeeNumberLabel: "କର୍ମଚାରୀ ମୋବାଇଲ୍ ନମ୍ବର |",
          timingTypeLabel: "ସମୟ ପ୍ରକାର",
          workingHoursNote: "ଫ୍ଲେକ୍ସିବଲ କାର୍ଯ୍ୟ ସମୟ",
          checkInOutNote: "ନିଶ୍ଚିତ ସମୟ: ଚେକ-ଇନ୍ ଏବଂ ଚେକ-ଆଉଟ୍",
          checkInLabel: "ଚେକ-ଇନ୍",
          checkOutLabel: "ଚେକ-ଆଉଟ୍",
          workingHoursLabel: "କାର୍ଯ୍ୟ ସମୟ",
          designationLabel: "ପଦନାମ",
          branchLabel: "ସ୍ଥାନ",
          joiningDateLabel: "ଯୋଡିବାରେ ତାରିଖ",
          dobLabel: "ଜନ୍ମ ତାରିଖ",
        },
        list: {
          timingTyperadio: [
            {
              id: "Flexible",
              title: "ମର୍ଜିବିଲ୍ ସମୟ",
            },
            {
              id: "Fixed",
              title: "ନିଶ୍ଚିତ ସମୟ",
            },
          ],
          shiftTyperadio: [
            {
              id: "day",
              title: "ଡେ ଶିଫ୍ଟ",
            },
            {
              id: "day/night",
              title: "ଡେ/ନାଇଟ୍ ଶିଫ୍ଟ",
            },
          ],
          workdaysList: [
            {
              id: "0",
              title: "ରବିବାର",
            },
            {
              id: "1",
              title: "ସୋମବାର",
            },
            {
              id: "2",
              title: "ମଙ୍ଗଳବାର",
            },
            {
              id: "3",
              title: "ବୁଧବାର",
            },
            {
              id: "4",
              title: "ବିରବାର",
            },
            {
              id: "5",
              title: "ଶୁକ୍ରବାର",
            },
            {
              id: "6",
              title: "ଶନିବାର",
            },
          ],
          proofList: [
            {
              id: "location",
              title: "ସ୍ଥାନ",
            },
            {
              id: "image",
              title: "ଫୋଟୋ",
            },
            {
              id: "logs",
              title: "ଲଗ୍‌",
            },
          ],
        },
      }),
    },
    ticketUpdate: {
      message: (ticketNumber) =>
        `ଟିକେଟ ନମ୍ବର: ${ticketNumber} ପରିବର୍ତ୍ତନ ପୂର୍ଣ୍ଣ୍ଣରୁ ସେଥିବାରେ ହୋଇଛି`,
    },
    employerStart: {
      message: () =>
        `ନମସ୍କାର, ଦୟାକରି ନିମ୍ନଲିଖିତ ବିକଳ୍ପଗୁଡ଼ିକରୁ ଏକ ବିକଳ୍ପ ବାଛନ୍ତୁ: \n \n1️⃣ | | ରିପୋର୍ଟ ପାଆନ୍ତୁ: ଏକ ବିସ୍ତୃତ ରିପୋର୍ଟ ଗ୍ରହଣ କରିବାକୁ ଏହି ବଟନ୍ କ୍ଲିକ୍ କରନ୍ତୁ .. \n2️⃣ | | ଅନୁମୋଦନ: କର୍ମଚାରୀଙ୍କ ଛୁଟି ଅନୁମୋଦନ ଯାଞ୍ଚ କିମ୍ବା ପରିଚାଳନା କରିବା ଆବଶ୍ୟକ କି? ନେଭିଗେଟ୍ କରିବାକୁ ଏହି ବଟନ୍ ଗୁଡିକ ବ୍ୟବହାର କରନ୍ତୁ |\n3️⃣। ପ୍ରୋଫାଇଲ୍ / ସେଟିଂସମୂହ: ଏଠାରେ ଆପଣଙ୍କର ପ୍ରୋଫାଇଲ୍ ଏବଂ ସେଟିଂସମୂହ ପରିଚାଳନା କରନ୍ତୁ |`,
      buttons: [
        { id: "employerReports", title: "ରିପୋର୍ଟ ପାଆନ୍ତୁ |" },
        { id: "approvals", title: "ଅନୁମୋଦନ" },
        { id: "profile-settings", title: "ପ୍ରୋଫାଇଲ୍ ସେଟିଂ" },
      ],
    },
    employerReports: {
      message: () =>
        "ସ୍ Welcome ାଗତ! ଦୟାକରି ଏକ ବିକଳ୍ପ ବାଛନ୍ତୁ:\n1| ଲାଇଭ୍ ରିପୋର୍ଟ: ରିଅଲ୍-ଟାଇମ୍ ଅପଡେଟ୍ ଦେଖନ୍ତୁ |\n2| ଗତକାଲି ରିପୋର୍ଟ: ଗତକାଲି ରିପୋର୍ଟକୁ ପ୍ରବେଶ କର |\n3। କର୍ମଚାରୀ ମାଷ୍ଟର ସିଟ୍: କର୍ମଚାରୀଙ୍କ ମାଷ୍ଟର ସିଟ୍ ଆକ୍ସେସ୍ କରନ୍ତୁ |",
      // buttons: [
      //   {
      //     id: "liveReport",
      //     title: "ଲାଇଭ୍ ରିପୋର୍ଟ",
      //   },
      //   {
      //     id: "yesterdayReport",
      //     title: "ଗତକାଲି ରିପୋର୍ଟ",
      //   },
      //   {
      //     id: "emp_master_sheet",
      //     title: "କର୍ମଚାରୀଙ୍କ ରିପୋର୍ଟ",
      //   },
      // ],
      buttons: [
        {
          title: "Reports",
          headers: "Reports",
          rows: [
            {
              id: "liveReport",
              title: "ଲାଇଭ୍ ରିପୋର୍ଟ",
              description: "Download Live Report",
            },
            {
              id: "yesterdayReport",
              title: "ଗତକାଲି ରିପୋର୍ଟ",
              description: "Download Yesterday Report",
            },
            {
              id: "dateRangeReport",
              title: "ତାରିଖ ପରିସର ରିପୋର୍ଟ",
              description: "Download Date Range Report",
            },
            {
              id: "emp_master_sheet",
              title: "",
              description: "Download Report of all your Employees",
            },
          ],
        },
      ],
    },
    employeeDemoStart: {
      buttons: [{ id: "MarkAttendance", title: "ଉପସ୍ଥିତି ଗୁଚ୍ଛାଣ" }],
      message: () =>
        "1️⃣ *କର୍ମଚାରୀ ଡିମୋ ସ୍ଟେପ୍‌*:\n   a. ✅ ଉପସ୍ଥିତି ଗୁଚ୍ଛାଣ\n   b. 🙋 ଅବକାଶ ଅନୁରୋଧ\n   c. 🎫 ଟିକେଟ ଉଠାନ୍ତୁ\n   d. 📊 ରିପୋର୍ଟ ଦେଖନ୍ତୁ\n2️⃣ *ନିଯୁକ୍ତା ଡିମୋ ସ୍ଟେପ୍‌* (କର୍ମଚାରୀ ଡିମୋ ସ୍ଟେପ୍‌ଗୁଡ଼ିକ ପୂର୍ଣ୍ଣ୍ଣ କରିବା ପରେ)",
    },
    "addGeo-fencing-emplyer": {
      message: () =>
        `ଯଦି ଆପଣ ଜିଓ-ଫେନସିଂ କାର୍ଯ୍ୟକାରିତାକୁ ଅନ୍ତର୍ଭୂକ୍ତ କରିବାକୁ ଚାହୁଁଛନ୍ତି, ଦୟାକରି ନିମ୍ନରେ “ହଁ” ବିକଳ୍ପ ଚୟନ କରନ୍ତୁ |`,
      buttons: [
        { id: "yes-geofencing", title: "ହଁ" },
        { id: "no-geofencing", title: "ହଁ" },
      ],
    },
    "yes-geofencing": {
      message: () => `ଦୟାକରି ଆପଣଙ୍କ କାର୍ଯ୍ୟାଳୟର ସାମ୍ପ୍ରତିକ ଅବସ୍ଥାନ ଅଂଶୀଦାର କରନ୍ତୁ |`,
    },
    "office-geo-fencing": {
      message: () => `ଆପଣଙ୍କ କାର୍ଯ୍ୟାଳୟର ସାମ୍ପ୍ରତିକ ସ୍ଥାନ ପ୍ରଦାନ କରିଥିବାରୁ ଧନ୍ୟବାଦ |`,
    },
    "reminder-in": {
      message: () => `ପରବର୍ତ୍ତୀ 5 ମିନିଟରେ ଚେକ୍-ଇନ୍ ଚିହ୍ନିତ କରିବାକୁ ଏହା ଏକ ବନ୍ଧୁତ୍ୱପୂର୍ଣ୍ଣ ସ୍ମାରକ |`,
    },
    "reminder-out": {
      message: () => `ପରବର୍ତ୍ତୀ 5 ମିନିଟରେ ଚେକ୍ ଆଉଟ୍ ମାର୍କ କରିବାକୁ ଏହା ଏକ ବନ୍ଧୁତ୍ୱପୂର୍ଣ୍ଣ ସ୍ମାରକ |`,
    },
    employeeUploaded: {
      message: () =>
        "✅ କର୍ମଚାରୀଙ୍କ ପ୍ରୋଫାଇଲ ସଫଳତାର ସହ ସୃଷ୍ଟି କରାଗଲା।\nଏକ ଔପଚାରିକ ସୂଚନା ଏବଂ ଉପସ୍ଥିତି ଆରମ୍ଭ ବାର୍ତ୍ତା କର୍ମଚାରୀଙ୍କ ୱାଟସଅପ୍ ନମ୍ବରକୁ ପଠାଯାଇଛି।\nଦୟାକରି କର୍ମଚାରୀଙ୍କୁ ଶୀଘ୍ର ଡେମୋ ସମାପ୍ତ କରି ତାଙ୍କ ଉପସ୍ଥିତି ଚିହ୍ନିତ କରାଯାଅନ୍ତୁ ବୋଲି ସୂଚିତ କରନ୍ତୁ।",
    },
    employeeDemoCompleted: {
      message: () =>
        "ଡେମୋ ସଫଳଭାବେ ସମାପ୍ତ ହୋଇଛି। ଆପଣଙ୍କୁ ଏହି ନମ୍ବରରେ ଦୈନିକ ହାଜିରା ଚିହ୍ନଟ କରିବାର ଅନୁରୋଧ କରାଯାଉଛି। ଆପଣ 'ହାଇ' ଟାଇପ୍ କରି ଯେକୌଣସି ସମୟରେ ପ୍ରଭାବକୁ ଆରମ୍ଭ କରିପାରିବେ।",
    },
    "profile-settings": {
      message: () =>
        `* ପ୍ରୋଫାଇଲ୍ ସେଟିଂସମୂହ *\n\nନିମ୍ନରେ ଏକ ବିକଳ୍ପ ଚୟନ କରନ୍ତୁ:\n\n1 | * ବ୍ୟବସାୟ ସେଟିଂସମୂହ *: ଆପଣଙ୍କର ବ୍ୟବସାୟ ପସନ୍ଦକୁ ବିନ୍ୟାସ କରନ୍ତୁ |\n2। * ବିଜ୍ଞପ୍ତି *: ଏକ ଦ Daily ନିକ ଆଧାରରେ ଲାଇଭ୍ ରିପୋର୍ଟ ପାଇଁ |\n3 | * ସଂପାଦନ / ବିଲୋପ କରନ୍ତୁ *\n\ta. ସଂପାଦନ କରନ୍ତୁ | ସିଫ୍ଟ ଟାଇମିଂ ସଂପାଦନ କରନ୍ତୁ |`,
      // message: () =>
      //   `* ପ୍ରୋଫାଇଲ୍ ସେଟିଂସମୂହ *\n\nନିମ୍ନରେ ଏକ ବିକଳ୍ପ ଚୟନ କରନ୍ତୁ:\n\n1 | * ବ୍ୟବସାୟ ସେଟିଂସମୂହ *: ଆପଣଙ୍କର ବ୍ୟବସାୟ ପସନ୍ଦକୁ ବିନ୍ୟାସ କରନ୍ତୁ |\n2। * ବିଜ୍ଞପ୍ତି *: ଏକ ଦ Daily ନିକ ଆଧାରରେ ଲାଇଭ୍ ରିପୋର୍ଟ ପାଇଁ |\n3 | * ସଂପାଦନ / ବିଲୋପ କରନ୍ତୁ *\n\ta | ଜିଓ ଫେନସିଂ\n\tb ସଂପାଦନ କରନ୍ତୁ | ସିଫ୍ଟ ଟାଇମିଂ ସଂପାଦନ କରନ୍ତୁ |`,
      buttons: [
        {
          id: "business-settings",
          title: "ବ୍ୟବସାୟ ସେଟିଂସମୂହ |",
        },
        {
          id: "notification-settings",
          title: "ବିଜ୍ଞପ୍ତିଗୁଡିକ",
        },
        {
          id: "edit-delete",
          title: "ସଂପାଦନ / ବିଲୋପ କରନ",
        },
      ],
    },
    "business-settings": {
      message: () => ({
        body: `ଦୟାକରି ନିମ୍ନରେ ଥିବା ବଟନ୍ କ୍ଲିକ୍ କରି ଆପଣଙ୍କର ବ୍ୟବସାୟ ସୂଚନା ଅଦ୍ୟତନ କରନ୍ତୁ | ଧନ୍ୟବାଦ!`,
        label: {
          title: "ବିଜ୍ଞାପନ ସେଟିଂଗୁଡ଼ିକ ସମ୍ପାଦନ",
          employerNamelabel: "କର୍ମଚାରୀ ନାମ",
          employernolabel: "କର୍ମଚାରୀ ନମ୍ବର",
          bufferTimelabel: "ବଫର୍ ଟାଇମ",
          companyNamelabel: "କମ୍ପାନି ନାମ",
          monthlySickLeavelabel: "ମାସିକ ଅନାରୋଗ୍ୟରେ ଅବକାଶ",
          casualLeavelabel: "କ୍ଯାଜା ଅବକାଶ",
          annualLeavelabel: "ବାର୍ଷିକ ଅବକାଶ",
          maternityLeaveAllowedlabel: "ମାତୃତ୍ଵ ଅବକାଶ ଅନୁମତି ଦେଇଛି",
          paternityLeaveAllowedlabel: "ପେଟ୍ରିୟାର୍ଟି ଅବକାଶ ଅନୁମତି ଦେଇଛି",
          unpaidLeavePolicylabel: "ଅପ୍ରମାଣେ ଅବକାଶ ନୀତି",
          leaveEncashmentlabel: "ଅବକାଶ ଇନକ୍ଯାଶମେଣ୍ଟ",
          consequencesUnapprovedLeavelabel: "ଅମାନ୍ୟାଚିତ ଅବକାଶ ପରିଣାମ",
          halfDayPolicylabel: "ଅର୍ଧ ଦିନ ନୀତି",
          Languagelabel: "ଭାଷା",
          carryForwardLimitlabel: "ଅଗ୍ରଗାମୀ ସୀମା",
        },
      }),
    },
    "edit-delete": {
      message: () =>
        `ଆପଣ ସଂଶୋଧନ କିମ୍ବା ମିଟାଇବା ବିକଳ୍ପ ଚୟନ କରିଛନ୍ତି | ଦୟାକରି ନୀଚେ ଦିଆଗଲା ବିକଳ୍ପଗୁଡ଼ିକୁ ଚୟନ କରନ୍ତୁ:\n\n1.ସମଯ଼ ସରିକି ସଂଶୋଧନ: କମ୍ପାନି ସମୟର ଆଧାରେ କର୍ମଚାରୀଙ୍କ ସେଡ୍ୟୁଲ୍‌ଗୁଡ଼ିକ ସରିକି କରନ୍ତୁ |\n.ଜିଓ ଫେନସିଂ ସଂଶୋଧନ: ଭୂଗୋଳିକ ବାଣିଜ୍ୟିକ ସୀମାଗୁଡ଼ିକ ପରିବର୍ତ୍ତନ କରନ୍ତୁ |\n3.ମିଟାଇବା: ଏହି ବିକଳ୍ପ ଦ୍ୱାରା ଆପଣ କର୍ମଚାରୀଙ୍କ ସମସ୍ତ ତଥ୍ୟ ମିଟାଇ ସାଧିତେ | ଏହାରେ ସତ୍ୟାଧିକ ବ୍ୟବହାର କରନ୍ତୁ, କାରଣ ଏହା ସିଷ୍ଟମରୁ ନିର୍ବାଚିତ କର୍ମଚାରୀଙ୍କ ସୂଚନାରେ ଥାବା ମାହିତି କାଢୁଥାଏ।`,
      buttons: [
        { id: "edit-timings", title: "ସିଫ୍ଟ ଟାଇମିଂ ସଂପାଦନ" },
        { id: "edit-geo-fencing", title: "ଜିଓ ଫେନସିଂ ସଂପାଦନ କର" },
        { id: "delete", title: "ଡିଲିଟ୍ କରନ୍ତୁ |" },
      ],
    },
    "edit-timings": {
      message: () => ({
        body: `ଦୟାକରି ଶିଫ୍ଟ ଟାଇମିଂ ସଂପାଦନ କରିବାକୁ ନିମ୍ନରେ ଥିବା ବଟନ୍ କୁ ପ୍ରବେଶ କରି କର୍ମଚାରୀଙ୍କ କାର୍ଯ୍ୟସୂଚୀକୁ ପରିଚାଳନା ଏବଂ ଅପ୍ଟିମାଇଜ୍ କରନ୍ତୁ | ଏହି ବିଷୟ ପ୍ରତି ତୁମର ଧ୍ୟାନ ଅତ୍ୟନ୍ତ ପ୍ରଶଂସନୀୟ | ଧନ୍ୟବାଦ।`,
        label: {
          title: "ଶିଫ୍ଟ ସମୟ ସମ୍ପାଦନା କରନ୍ତୁ",
          timingTypeLabel: "ସମୟ ପ୍ରକାର",
          checkInLabel: "ଚେକ୍ ଇନ୍",
          checkOutLabel: "ଚେକ୍ ଆଉଟ୍",
          workingHoursLabel: "କାର୍ଯ୍ୟ ସମୟ",
          branchLabel: "ଶାଖା",
          employeesLabel: "କର୍ମଚାରୀ",
          shiftTyperadio: [
            {
              id: "day",
              title: "ଡେ ଶିଫ୍ଟ",
            },
            {
              id: "day/night",
              title: "ଡେ/ନାଇଟ୍ ଶିଫ୍ଟ",
            },
          ],
          timingTyperadio: [
            {
              id: "Flexible",
              title: "ମର୍ଜିବିଲ୍ ସମୟ",
            },
            {
              id: "Fixed",
              title: "ନିଶ୍ଚିତ ସମୟ",
            },
          ],
          workdaysList: [
            {
              id: "0",
              title: "ରବିବାର",
            },
            {
              id: "1",
              title: "ସୋମବାର",
            },
            {
              id: "2",
              title: "ମଙ୍ଗଳବାର",
            },
            {
              id: "3",
              title: "ବୁଧବାର",
            },
            {
              id: "4",
              title: "ବିରବାର",
            },
            {
              id: "5",
              title: "ଶୁକ୍ରବାର",
            },
            {
              id: "6",
              title: "ଶନିବାର",
            },
          ],
        },
      }),
    },
    "edit-geo-fencing": {
      message: () =>
        `ଜିଓ ଫେନସିଂ ସେଟିଂସମୂହକୁ ପ୍ରବେଶ ଏବଂ ସଂପାଦନ କରିବାକୁ ନିମ୍ନରେ ଥିବା ବଟନ୍ ବ୍ୟବହାର କରି କର୍ମଚାରୀଙ୍କ ଅବସ୍ଥାନ ଉପରେ ସଠିକ୍ ନିୟନ୍ତ୍ରଣ ନିଶ୍ଚିତ କରନ୍ତୁ | ଏହି କାର୍ଯ୍ୟ ପ୍ରତି ତୁମର ଧ୍ୟାନ ମୂଲ୍ୟବାନ | ଧନ୍ୟବାଦ`,
    },
    link_employee: {
      message: () => ({
        body: `ନୂତନ ସ୍ଥାନ ଏବଂ କର୍ମଚାରୀମାନଙ୍କୁ ଏହି ସ୍ଥାନରେ ଯୋଡନ୍ତୁ |`,
        label: {
          title: "ଜିଓ ଫେନ୍ସିଂ",
          heading: "ସ୍ଥାନ କୋଅର୍ଡିନେଟ୍‌",
          rangelabel: "ପ୍ରଣାଳୀ",
          rangeheadinglabel: "ପ୍ରଣାଳୀ 50 ମିଟର ଏବଂ ତା' ପରେ ଅନ୍ୟତମ ହେଉଛି",
          employeelabel: "କର୍ମଚାରୀଙ୍କୁ ସ୍ଥାନ ଲିଙ୍କ କରନ୍ତୁ:",
          branchnamelabel: "ସ୍ଥାନ ନାମ",
        },
      }),
    },
    edit_geolocation: {
      message: () => ({
        body: `ନିମ୍ନ ବଟନ୍ କ୍ଲିକ୍ କରି କର୍ମଚାରୀଙ୍କ ଜିଓ ଫେନସିଂ ସଂପାଦନ କରନ୍ତୁ |`,
        label: {
          title: "ଜିଓ ସ୍ଥାନ ସମ୍ପାଦନା",
          workingHoursLabel: "କାମଗାର ସମୟ",
          branchLabel: "କର୍ମଚାରୀ",
          timingTypeLabel: "ସମୟ ପ୍ରକାର",
          placelabel: "ସ୍ଥାନ",
        },
      }),
    },
    "edit-notifs": {
      message: (companyName) => ({
        body: `ଅଦ୍ୟତନ ବଟନ୍ କ୍ଲିକ୍ କରି ବିଜ୍ଞପ୍ତିଗୁଡିକ ଅଦ୍ୟତନ କରନ୍ତୁ |`,
        label: {
          companyNamelabel: companyName,
          Notificationslabel: "ବିଜ୍ଞାପନ",
          dailyreportlabel: "ଦୈନିକ ସକାଳ ରିପୋର୍ଟ",
          dailyeveningreportlabel: "ଦୈନିକ ସାୟଙ୍କାଳ ରିପୋର୍ଟ",
          monthendlabel: "ମାସ ଶେଷ ରିପୋର୍ଟ",
        },
        buttons: [
          { id: "checkIn", title: "ଚେକ୍-ଇନ୍ |" },
          { id: "checkOut", title: "ଚେକ୍ ଆଉଟ୍" },
          { id: "leaveRequest", title: "ବିଦାୟ ଅନୁରୋଧ" },
          { id: "support", title: "ସହଯୋଗ ଅନୁରୋଧ" },
        ],
      }),
    },
    "notification-settings": {
      message: () =>
        `ଆମର ସର୍ବଶେଷ ବ feature ଶିଷ୍ଟ୍ୟ ସହିତ ଆପଣଙ୍କର ପରିଚାଳନାଗତ ଅଭିଜ୍ଞତାକୁ ବ ance ାନ୍ତୁ - ବିଜ୍ଞପ୍ତି ସଂପାଦନ ବଟନ୍\n\nଚେକ୍ ଇନ୍: ଯେତେବେଳେ ଆପଣଙ୍କର କର୍ମଚାରୀମାନେ ଚେକ୍ ଇନ୍ କରନ୍ତି ସେତେବେଳେ ବିଜ୍ଞପ୍ତି ଗ୍ରହଣ କରନ୍ତୁ |\nଚେକ୍ ଆଉଟ୍: ଯେତେବେଳେ ଆପଣଙ୍କର କର୍ମଚାରୀମାନେ ଚେକ୍ ଆଉଟ୍ କରନ୍ତି ବିଜ୍ଞପ୍ତି ଗ୍ରହଣ କରନ୍ତୁ | ସକାଳ।\nସନ୍ଧ୍ୟା ରିପୋର୍ଟ: ସନ୍ଧ୍ୟାରେ ଏକ ଲାଇଭ୍ ରିପୋର୍ଟ ଗ୍ରହଣ କର |`,
      buttons: [{ id: "edit-notifs", title: "ବିଜ୍ଞପ୍ତିଗୁଡିକ ସଂପାଦ" }],
    },
    "remove-employees": {
      message: () => ({
        body: `କର୍ମଚାରୀ ଅପସାରଣ ପ୍ରକ୍ରିୟା ଆରମ୍ଭ କରିବାକୁ ଦୟାକରି ନିମ୍ନରେ ଥିବା ବଟନ୍ କ୍ଲିକ୍ କରନ୍ତୁ |`,
        label: {
          title: "କର୍ମଚାରୀ ହଟାନ୍ତୁ",
          employeesLabel: "କର୍ମଚାରୀ",
          companylabel: "କମ୍ପାନି ନାମ",
        },
      }),
    },
    "remove-branch": {
      message: () => ({
        body: `କର୍ମଚାରୀ ଅପସାରଣ ଆରମ୍ଭ କରିବାକୁ ଦୟାକରି ନିମ୍ନରେ ଥିବା ବଟନ୍ କ୍ଲିକ୍ କରନ୍ତୁ |`,
        label: {
          title: "କର୍ମଚାରୀମାନଙ୍କୁ ସ୍ଥାନରୁ ହଟାନ୍ତୁ |",
          branchLabel: "ସ୍ଥାନଗୁଡିକ",
          employeesLabel: "କର୍ମଚାରୀ",
          companylabel: "କମ୍ପାନି ନାମ",
        },
      }),
    },
    "live-report-templates": {
      message: () => ({
        employees: "କର୍ମଚାରୀ",
        onTime: "ସମୟରେ",
        late: "ଦେରି ହେବ",
        absent: "ଅନୁପସ୍ଥିତ",
        onLeave: "ଅବକାଶରେ",
        attendance: "ହାଜରୀ",
        employee: "କର୍ମଚାରୀ",
        shiftStatus: "ଶିଫ୍ଟ & ଅବସ୍ଥା",
        checkIn: "ଚେକଇନ",
        checkOut: "ଚେକଆଉଟ",
        requiredTime: "ଆବଶ୍ୟକ ସମୟ",
        actualTime: "ବାସ୍ତବ ସମୟ",
        shiftDuration: "ଶିଫ୍ଟ ଅବଧି",
        leaveRequests: "ବିରାମ ଅନୁରୋଧ",
        leaveType: "ବିରାମ ପ୍ରକାର",
        startDate: "ଶୁରୁ ତାରିଖ",
        endDate: "ସମାପ୍ତି ତାରିଖ",
        status: "ସ୍ଥିତି",
      }),
    },
    "employee-report-templates": {
      message: () => ({
        present: "ଉପସ୍ଥିତ",
        absent: "ଅନୁପସ୍ଥିତ",
        leaves: "ଅବକାଶ",
        attendance: "ହାଜରଗାହ",
        date: "ତାରିଖ",
        shiftStatus: "ଶିଫ୍ଟ ଏବଂ ସ୍ଥିତି",
        checkIn: "ଚେକ ଇନ୍",
        checkOut: "ଚେକ ଆଉଟ୍",
        requiredTime: "ଆବଶ୍ୟକ ସମୟ",
        actualTime: "ବାସ୍ତବ ସମୟ",
        shiftDuration: "ଶିଫ୍ଟ ଅବଧି",
        leaveRequests: "ଅବକାଶ ଅନୁରୋଧ",
        leaveType: "ଅବକାଶ ପ୍ରକାର",
        startDate: "ସ୍ଥିତି ତାରିଖ",
        endDate: "ସମାପ୍ତି ତାରିଖ",
        status: "ସ୍ଥିତି",
      }),
    },
    "emp-attendance-templates": {
      message: () => ({
        employeeAttendenceLogs: "କର୍ମଚାରୀ ହାଜର ଲଗ୍",
        totalTickets: "ମୋଟ ଟିକେଟସ୍",
        ticketOpen: "ଟିକେଟ ଖୋଲା",
        ticketClosed: "ଟିକେଟ ବନ୍ଦ",
        employeeAttendenceLog: "କର୍ମଚାରୀ ହାଜରୀ ଲଗ୍",
      }),
    },
    "all-emp-ticket-templates": {
      message: () => ({
        employeeTickets: "କର୍ମଚାରୀ ଟିକେଟସ୍",
        totalTickets: "ମୋଟ ଟିକେଟସ୍",
        ticketOpen: "ଟିକେଟ ଖୋଲା",
        ticketClosed: "ଟିକେଟ ବନ୍ଧ",
        ticketsOpen: "ଟିକେଟସ୍ ଖୋଲା",
        ticketsClosed: "ଟିକେଟସ୍ ବନ୍ଧ",
      }),
    },
    "all-emp-report-templates": {
      message: () => ({
        employeesLabel: "କର୍ମଚାରୀମାନଙ୍କ",
        employeesInfo: "କର୍ମଚାରୀ ସୂଚନା",
        employee: "କର୍ମଚାରୀ",
        position: "ସ୍ଥିତି",
        shiftTimings: "ଶିଫ୍ଟ୍ ସମୟ",
        joiningDate: "ଯୋଡ଼ିହେବାର ତାରିଖ",
      }),
    },
    addBranch: {
      message: () => ({
        body: `"ସ୍ଥାନ ଯୋଡନ୍ତୁ" ବଟନ୍ କ୍ଲିକ୍ କରି ସ୍ଥାନ ଯୋଡନ୍ତୁ |`,
        label: {
          title: "Geo Fencing",
          heading: "Place Coordinates",
          rangelabel: "Range",
          rangeheadinglabel: "Range must be 200 meters and above",
          branchnamelabel: "Place Name",
        },
      }),
    },
    delete: {
      message: () =>
        `ନମସ୍କାର, ଦୟାକରି ନିମ୍ନରେ ଏକ ବିକଳ୍ପ ବାଛନ୍ତୁ: \n1 | କର୍ମଚାରୀଙ୍କୁ ହଟାନ୍ତୁ: କର୍ମଚାରୀମାନଙ୍କୁ ସଂଗଠନରୁ ବାହାର କରନ୍ତୁ | \n2। ସ୍ଥାନ ଅପସାରଣ କରନ୍ତୁ: କର୍ମଚାରୀମାନଙ୍କୁ ସ୍ଥାନରୁ ବାହାର କରନ୍ତୁ |`,
      buttons: [
        { id: "remove-employees", title: "କର୍ମଚାରୀଙ୍କୁ ହଟାନ୍ତ|" },
        { id: "remove-branch", title: "ସ୍ଥାନ ହଟାନ୍ତୁ |" },
      ],
    },
    dateRangeReport: {
      message: () => ({
        body: `ଆପଣଙ୍କ ସମୀକ୍ଷା ପାଇଁ ଆମେ ଏକ ବିସ୍ତୃତ ତାରିଖ ପରିସର ରିପୋର୍ଟ ପ୍ରସ୍ତୁତ କରିଛୁ | ଦୟାକରି ଆପଣଙ୍କର ପସନ୍ଦିତ ତାରିଖ ସୀମା ନିର୍ଦ୍ଦିଷ୍ଟ କରନ୍ତୁ, ଏବଂ ଆମେ ତୁରନ୍ତ ଆପଣଙ୍କୁ ଅନ୍ତର୍ନିହିତ ଏବଂ ବିଶ୍ଳେଷଣ ପ୍ରଦାନ କରିବୁ |`,
        label: {
          title: "ତାରିଖ ପ୍ରମାଣ ରିପୋର୍ଟ",
          startdatelabel: "ଶୁରୁ ହେବା ତାରିଖ",
          enddatelabel: " ଶେଷ ତାରିଖ",
        },
      }),
    },
    attendanceManagement: {
      message: () => ({
        body: `ଅଟୋୱାଟ ଉପସ୍ଥାନ ପରିଚାଳନା ଚାଟ୍ ବଟ୍ କୁ ସ୍ୱାଗତ |`,
        label: {
          label1: "ରିପୋର୍ଟ ଏବଂ ଅନୁମୋଦନ",
          label2: "ରିପୋର୍ଟସ୍",
          label3: "ଟିମ୍",
          label7: "ସ୍ଥାନ ସମ୍ପାଦନ",
          label9: "ସ୍ଥାନ ମିଟାଇବା",
          label10: "ସିଫ୍ଟ ସମୟ ସମ୍ପାଦନ",
          label11: "କର୍ମଚାରୀ ମିଟାଇବା",
          labeldelete: "ମିଟାଇବା ବିକଳ୍ପ",
          labeledit: "ସମ୍ପାଦନ ବିକଳ୍ପ",
          labelbusiness: "ବିଜନେସ୍ ସେଟିଂସ୍",
          labelBussinessRadio: "ବିଜନେସ୍ ସେଟିଂସ୍ ସମ୍ପ",

          reportsdd: [
            {
              id: "yesterdayreport",
              title: "ଗତକାଲି ରିପୋର୍ଟ",
            },
            {
              id: "currentmonth",
              title: "ସାମ୍ପ୍ରତିକ ମାସ",
            },
            {
              id: "customdaterangepdf",
              title: "ତାରିଖ ରିପୋର୍ଟ(PDF)",
            },
            {
              id: "allEmployees",
              title: "ସମସ୍ତ କର୍ମଚାରୀ ରିପୋର",
            },
          ],
          quick: [
            {
              id: "livereport",
              title: "ଲାଇଭ୍ ରିପୋର୍ଟ",
            },
            {
              id: "leaveApprovals",
              title: "ଅନୁମୋଦନ ଛାଡନ୍ତୁ |",
            },
            {
              id: "attendanceCorrections",
              title: "ଉପସ୍ଥାନ ସଂଶୋଧନ |",
            },
            {
              id: "supportTickets",
              title: "ସମର୍ଥନ ଟିକେଟ୍ |",
            },
            {
              id: "taskApprovals",
              title: "କାର୍ଯ୍ୟ ଅନୁମୋଦନ",
            },
            {
              id: "broadcast",
              title: "ପ୍ରସାରଣ |",
            },
          ],
          labelBussinessList: [
            {
              id: "editBusiness",
              title: "ବିଜନେସ୍ ସେଟିଂସ୍ ସମ୍ପ",
            },
          ],
        },
      }),
    },
    contacts: {
      message: () => `ଦୁ Sorry ଖିତ! ଆପଣ ସମ୍ପର୍କ ଅପଲୋଡ୍ କରିପାରିବେ ନାହିଁ |`,
    },
    contactsUpdate: {
      message: () => `ମୁଁ ଆପଣଙ୍କୁ ଜଣାଇ ଖୁସି ଯେ କର୍ମଚାରୀଙ୍କ ବିବରଣୀ ସଫଳତାର ସହିତ ଅପଡେଟ୍ ହୋଇଛି |`,
    },
    placeCreated: {
      message: () =>
        `ଆମେ ଆପଣଙ୍କୁ ଜଣାଇବାକୁ ଚାହିଁବୁ ଯେ ନୂତନ ସ୍ଥାନ ଏବଂ ଜିଓ-ଫେନସିଂ ସଫଳତାର ସହିତ ସୃଷ୍ଟି ହୋଇଛି |.`,
    },
    employeeGeoFencing: {
      message: () =>
        `ଆମେ ଆପଣଙ୍କୁ ଜଣାଇବାକୁ ଚାହିଁବୁ ଯେ କର୍ମଚାରୀ ଜିଓ-ଫେନସିଂ ସଫଳତାର ସହିତ ଅପଡେଟ୍ ହୋଇଛି |`,
    },
    employeeRemove: {
      message: () => `ଆମେ ଆପଣଙ୍କୁ ଜଣାଇବାକୁ ଚାହୁଁଛୁ ଯେ କର୍ମଚାରୀଙ୍କୁ ସଂଗଠନରୁ ହଟାଇ ଦିଆଯାଇଛି।`,
    },
    employeeRemovePlace: {
      message: () => `ଆମେ ଆପଣଙ୍କୁ ଜଣାଇବାକୁ ଚାହୁଁଛୁ ଯେ କର୍ମଚାରୀମାନଙ୍କୁ ସେହି ସ୍ଥାନରୁ ହଟାଇ ଦିଆଯାଇଛି`,
    },
    placeDeleted: {
      message: () => `ସ୍ଥାନ ସଫଳତାର ସହିତ ବିଲୋପ ହୋଇଯାଇଛି |`,
    },
    broadcast: {
      message: () => ({
        body: `ଆପଣଙ୍କର ସମସ୍ତ କର୍ମଚାରୀଙ୍କୁ ଆପଣଙ୍କର ବାର୍ତ୍ତା ପ୍ରସାରଣ କରନ୍ତୁ |`,
        label: {
          broadcastLabel: "ବ୍ରଡକାଷ୍ଟ ସଂଦେଶ",
          filesLabel: "ଫାଇଲ୍‌ଗୁଡ଼ିକ",
          employeesLabel: "କର୍ମଚାରୀ",
          fileRadios: [
            {
              id: "document",
              title: "ଡକ୍ୟୁମେଣ୍ଟ",
            },
            {
              id: "image",
              title: "ଛାଯାଚିତ୍ର",
            },
            {
              id: "video",
              title: "ଭିଡିଓ",
            },
          ],
        },
        list: {},
      }),
    },
  },
  Malayalam: {
    hi: {
      message: (name) =>
        `ഹലോ ${name}\n ഞാൻ നിന്നിൽ നിന്ന് സൌഹൃദ ഹാഡവൻ ആയി നിന്നെ സഹായിക്കുന്ന ആപ്പറൻസ് ബോട്ടാണ്.`,
      buttons: [
        {
          id: "MarkAttendance",
          title: "ഹാജർമാർക്കുക",
        },
        {
          id: "Report",
          title: "റിപ്പോർട്ട്",
        },
        {
          id: "Other",
          title: "മറ്റ്",
        },
      ],
    },
    MarkAttendance: {
      message: () =>
        "*ഹാജർമാർക്കുക*\n\n- തങ്ങളുടെ പ്രവർത്തനത്തിന്റെ ആരംഭിക്കൽ ചെയ്യുന്നതിന്, [IN] അമർത്തുന്നതിൽ ക്ലിക്കുക.\n- തങ്ങളുടെ പ്രവർത്തനത്തിന്റെ അന്തിമാവസാനം ചെയ്യുന്നതിന്, [OUT] അമർത്തുന്നതിൽ ക്ലിക്കുക.",
      buttons: [
        { id: "in", title: "🟢 IN" },
        { id: "out", title: "🔴 OUT" },
      ],
    },
    in: {
      message: () =>
        "*സ്ഥലം* \n📍 ദയവായി ഈ പടക്കൊല്ലം പങ്കാളിക്കുന്നതിന് താഴെയുള്ള ചെയ്തികളനുസരിച്ച് നിന്ന് നിന്നും തങ്ങളുടെ സ്ഥാനം പങ്കാളിക്കുന്നതിന്:\n1. 📩 ഈ സന്ദേശം തിരഞ്ഞെടുക്കുക.\n2. 💬 'ഉത്തരവിളി' ക്ലിക്കുചെയ്യുക.\n3. 📎 അടക്കമുള്ള അടയാളം അല്ലെങ്കിൽ ക്ലിപ്പ് ഐക്കൺ ക്ലിക്കുചെയ്യുക.\n4. 📍 'സ്ഥാനം' തിരഞ്ഞെടുക്കുക.\n5. ✅ 'നിന്നുള്ള നിന്നും സ്ഥാനം അയയ്ക്കുക' തിരഞ്ഞെടുക്കുക.",
    },
    out: {
      message: () =>
        "*സ്ഥലം* \n📍 ദയവായി ഈ പടക്കൊല്ലം പങ്കാളിക്കുന്നതിന് താഴെയുള്ള ചെയ്തികളനുസരിച്ച് നിന്ന് നിന്നും തങ്ങളുടെ സ്ഥാനം പങ്കാളിക്കുന്നതിന്:\n1. 📩 ഈ സന്ദേശം തിരഞ്ഞെടുക്കുക.\n2. 💬 'ഉത്തരവിളി' ക്ലിക്കുചെയ്യുക.\n3. 📎 അടക്കമുള്ള അടയാളം അല്ലെങ്കിൽ ക്ലിപ്പ് ഐക്കൺ ക്ലിക്കുചെയ്യുക.\n4. 📍 'സ്ഥാനം' തിരഞ്ഞെടുക്കുക.\n5. ✅ 'നിന്നുള്ള നിന്നും സ്ഥാനം അയയ്ക്കുക' തിരഞ്ഞെടുക്കുക.",
    },
    attendanceLocation: {
      message: () => "📸 ഹാജർമാർക്കുകാനായി, ഒരു സ്ഥലം കാണിക്കുന്ന നിന്നെ പ്രദർശിപ്പിക്കുക.",
    },
    clickAttendanceLocation: {
      message: () =>
        "*⚠️ നിന്നെ ലഭിക്കുന്നത്* . ആദ്യം, നിന്നെ *പ്രതിക്രിയ ചെയ്യുന്നതിന്* ഉറപ്പാക്കുക, പിന്നീട് 'നിന്നുള്ള നിന്നും സ്ഥാനം അയയ്ക്കുക' തിരഞ്ഞെടുക്കുക.\n📍 ദയവായി താഴെയുള്ള ചെയ്തികളനുസരിച്ച് നിന്ന് നിന്നും തങ്ങളുടെ സ്ഥാനം പങ്കാളിക്കുക:\n1. 📩 ഈ സന്ദേശം തിരഞ്ഞെടുക്കുക.\n2. 💬 'ഉത്തരവിളി' ക്ലിക്കുചെയ്യുക.\n3. 📎 അടക്കമുള്ള അടയാളം അല്ലെങ്കിൽ ക്ലിപ്പ് ഐക്കൺ ക്ലിക്കുചെയ്യുക.\n4. 📍 'സ്ഥാനം' തിരഞ്ഞെടുക്കുക.\n5. ✅ 'നിന്നുള്ള നിന്നും സ്ഥാനം അയയ്ക്കുക' തിരഞ്ഞെടുക്കുക.",
    },
    locNotInRange: {
      message: () =>
        `🚫 ക്ഷമിക്കണം, ഞങ്ങൾക്ക് ഇപ്പോൾ നിങ്ങളുടെ ലൊക്കേഷനും 📍 ഹാജർ ⏲️ രജിസ്റ്റർ ചെയ്യാനായില്ല. നിങ്ങൾ കമ്പനിയുടെ പരിധിയിലല്ല 🚷. കമ്പനിയുടെ പരിധിക്കുള്ളിൽ നീങ്ങുക, തുടർന്ന് ആദ്യം മുതൽ വീണ്ടും ശ്രമിക്കുക 🔁.👣`,
    },
    attendancePic: {
      message: () => "📸 ദയവായി നിന്നെ പ്രദർശിപ്പിക്കുക 🤳.",
    },
    startLeaveRequest: {
      message: () =>
        "ഹാജർ ഡെമോ അടയാളപ്പെടുത്തൽ ഞങ്ങൾ വിജയകരമായി പൂർത്തിയാക്കി.\nനിങ്ങളുടെ ജീവനക്കാരന് എങ്ങനെ *ലീവ് അഭ്യർത്ഥിക്കാം* എന്നതാണ് അടുത്ത ഡെമോ",
      buttons: [{ id: "requestLeave", title: "അഭ്യർത്ഥന അവധി ആ" }],
    },
    Report: {
      message: () => "നിന്നെന്ന മാസം റിപ്പോർട്ട് അല്ലെങ്കിൽ കഴിഞ്ഞ മാസം റിപ്പോർട്ട് ഡൗൺലോഡുചെയ്യുക",
      buttons: [
        {
          id: "currentMonth",
          title: "നിലവിലെ മാസം",
        },
        // {
        //   id: 'previousMonth',
        //   title: 'മുന്നറിയിപ്പ് മാസം',
        // },
      ],
    },
    uploadEmployee: {
      message: () => "ଦୟାକରି ସମସ୍ତ କର୍ମଚାରୀଙ୍କ ସମ୍ପର୍କ ଯାହାରେ ଆପଲୋଡ୍ କରନ୍ତି ତାହା କରନ୍ତୁ।",
    },
    Other: {
      message: () =>
        "ഹലോ! ഞങ്ങൾക്ക് നിന്നെ എങ്ങനെ സഹായിക്കാനായി? ദയവായി പിന്നെയുള്ള ഓപ്ഷനുകൾ തിരഞ്ഞെടുക്കുക.",
      buttons: [
        {
          id: "requestLeave",
          title: "അഭ്യർത്ഥിക്കുക",
        },
        {
          id: "support",
          title: "പിന്നെയുള്ളവ",
        },
        // {
        //   id: 'question',
        //   title: 'ചോദിക്കുക',
        // },
      ],
    },
    requestLeave: {
      message: () =>
        "ഒരു ചെറിയ ഇടവേള എടുക്കാൻ ആലോചിക്കുകയാണോ?\nഎത്ര ദിവസം ഓഫ് അഭ്യർത്ഥിക്കാൻ നിങ്ങൾ ആഗ്രഹിക്കുന്നുവെന്ന് ഞങ്ങളെ അറിയിക്കുക:",
      buttons: [
        { id: "oneDay", title: "ഒരു ദിവസം" },
        { id: "moreThanOneDay", title: "ഒന്നിലധികം ദിവസം" },
      ],
    },
    oneDay: {
      message: () => ({
        body: "ദയവായി താഴെയുള്ള ബട്ടണിൽ ക്ലിക്ക് ചെയ്ത് തീയതിയും കാരണവും നിർദ്ദേശിക്കുക",
        label: {
          title: "അവധി അഭ്യർത്ഥിക്കുക",
          startdatelabel: "ആരംഭിക്കുന്ന തീയതി",
          enddatelabel: "അവസാന ദിവസം",
          reasonlabel: "അവധിക്കുള്ള കാരണം",
        },
      }),
    },
    moreThanOneDay: {
      message: () => ({
        body: "ദയവായി താഴെയുള്ള ബട്ടണിൽ ക്ലിക്ക് ചെയ്ത് തീയതിയും കാരണവും നിർദ്ദേശിക്കുക",
        label: {
          title: "അവധി അഭ്യർത്ഥിക്കുക",
          startdatelabel: "ആരംഭിക്കുന്ന തീയതി",
          enddatelabel: "അവസാന ദിവസം",
          reasonlabel: "അവധിക്കുള്ള കാരണം",
        },
      }),
    },
    leaveSummary: {
      message: (
        employeeName,
        department,
        leaveType,
        startDate,
        endDate,
        reasonForLeave,
        ticketNumber,
        recipientPhone
      ) =>
        `Name: *${employeeName}*\nDepartment: *${
          department ?? "-"
        }*\nFor: *അനുമതി ചോദിക്കുക*\nഅനുമതി തരം: *${leaveType}*\nആരംഭ തീയതി: *${startDate}*\n${
          endDate !== "Invalid Date" ? `അവസാന തീയതി: *${endDate}*\n` : ""
        }കാരണം: *${reasonForLeave}*\nനമ്പർ : *${recipientPhone}*\nടിക്കറ്റ് നമ്പർ : *${ticketNumber}*`,
    },
    support: {
      message: () =>
        "*ടിക്കറ്റ് ഉയർത്തുക* \n ചുവടെയുള്ള ഇഷ്യൂ തരങ്ങളിൽ ക്ലിക്കുചെയ്ത് നിങ്ങൾക്ക് ടിക്കറ്റ് ഉയർത്താം",
      buttons: [
        { id: "CheckIn", title: "ഇൻ & ഔട്ട്" },
        { id: "Salary_Issue", title: "ശമ്പള പ്രശ്നം" },
        { id: "other_issue", title: "മറ്റുള്ളവ" },
      ],
    },
    checkIn: {
      message: () => "ദയവായി നിങ്ങളുടെ അഭിപ്രായം ടൈപ്പ് ചെയ്യുക.",
    },
    checkOut: {
      message: () => "ദയവായി നിങ്ങളുടെ അഭിപ്രായം ടൈപ്പ് ചെയ്യുക.",
    },
    other_issue: {
      message: () => "ദയവായി നിങ്ങളുടെ അഭിപ്രായം ടൈപ്പ് ചെയ്യുക.",
    },
    Salary_Issue: {
      message: () => "ദയവായി നിങ്ങളുടെ അഭിപ്രായം ടൈപ്പ് ചെയ്യുക.",
    },
    employeeIssue: {
      message: () => "ദയവായി നിങ്ങളുടെ അഭിപ്രായം ടൈപ്പ് ചെയ്യുക.",
    },
    sendIssue: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `പേര്: *${name}*\nവകുപ്പ്: *${
          department ?? "-"
        }*\nകാരണം: *സഹായം*\nപ്രശ്നം: *${problem}*\nഅഭിപ്രായം: *${message}*\nനമ്പർ: *${recipientPhone}*\nടിക്കറ്റ് നമ്പർ: *${ticketNumber}*`,
      buttons: (employeeNumber, ticketNumber) => [
        { title: "അംഗീകരിക്കുക", id: `issue_approve-${employeeNumber}-${ticketNumber}` },
        { title: "നിരസിക്കുക", id: `issue_reject-${employeeNumber}-${ticketNumber}` },
        { title: "പിടിക്കുക", id: `issue_hold-${employeeNumber}-${ticketNumber}` },
      ],
    },
    sendLeave: {
      message: (employeeName, leaveType, startDate, endDate, reason) =>
        `*ലീവ് അഭ്യർത്ഥന അറിയിപ്പ്* \n👤 ജീവനക്കാരുടെ പേര്: ${employeeName}\nലീവ് തരം: ${leaveType}\nആരംഭ തീയതി: *${startDate}*\n${
          endDate !== "അസാധുവായ തീയതി" ? `അവസാന തീയതി: *${endDate}*\n` : ""
        }\nകാരണം: ${reason}ദയവായി അവലോകനം ചെയ്ത് ആവശ്യമായ നടപടി സ്വീകരിക്കുക.`,
      buttons: (employeePhone, ticketNumber) => [
        {
          id: `request_approve-${employeePhone}-${ticketNumber}`,
          title: "അംഗീകരിക്കുക",
        },
        {
          id: `request_reject-${employeePhone}-${ticketNumber}`,
          title: "നിരസിക്കുക",
        },
        {
          id: `request_hold-${employeePhone}-${ticketNumber}`,
          title: "പിടിക്കുക",
        },
      ],
    },
    registerComplain: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `പേര്: *${name}*\nവകുപ്പ്: *${
          department ?? "-"
        }*\nകാരണം: *സഹായം*\nപ്രശ്നം: *${problem}*\nഅഭിപ്രായം: *${message}*\nനമ്പർ: *${recipientPhone}*\nടിക്കറ്റ് നമ്പർ: *${ticketNumber}*`,
    },
    approvals: {
      buttons: [
        { title: "അനുമതി-ഇടുക്കുക", id: "leaveApprove" },
        { title: "സജീവ-സമസ്യ", id: "activeIssues" },
      ],
      message: () =>
        `ഹലോ, ദയവായി ചുവടെയുള്ള ഒരു ഓപ്‌ഷൻ തിരഞ്ഞെടുക്കുക:\n 1️⃣ ലീവുകൾ അംഗീകരിക്കുന്നതിന്.\n 2️⃣ നിങ്ങളുടെ അംഗീകാരത്തിനായി കാത്തിരിക്കുന്ന സജീവ പ്രശ്നങ്ങൾ കാണുന്നതിന്.\nതുടരുന്നതിന് അനുബന്ധ ബട്ടണിൽ ക്ലിക്ക് ചെയ്യുക!`,
    },
    leaveApprove: {
      message: () =>
        `*ജീവനക്കാരുടെ ലീവ് റിപ്പോർട്ട് ചെയ്തു*\nപ്രിയ തൊഴിലുടമ, ഒരു ജീവനക്കാരന്റെ ലീവ് അഭ്യർത്ഥനയുണ്ട്\n *ടിക്കറ്റ് നമ്പർ: RL4545* \n *പേര്*: റാം \n *തീയതി*: 23/12/2023 \n *കാരണം* : കല്യാണം \n *തരം* : ലീവ് അഭ്യർത്ഥിക്കുക`,
      buttons: [
        { title: "അംഗീകരിക്കുക", id: "request_approve" },
        { title: "നിരസിക്കുക", id: "request_reject" },
        { title: "പിടിക്കുക", id: "request_hold" },
      ],
    },
    activeIssues: {
      message: () =>
        `*എംപ്ലോയി ഇഷ്യൂ റിപ്പോർട്ട്*\nപ്രിയ തൊഴിലുടമ, ഒരു ജീവനക്കാരൻ റിപ്പോർട്ട് ചെയ്ത ഒരു പ്രശ്നമുണ്ട്:\n *തൊഴിലാളിയുടെ പേര്* : ഷാം \n *പ്രശ്നം* : ശമ്പളം \n *പ്രശ്നത്തിന്റെ വിവരണം* : ശമ്പളം കുറവ് ക്രെഡിറ്റ് ചെയ്തു\nദയവായി ഉചിതമായ നടപടി സ്വീകരിക്കുക ഈ ആശങ്ക പരിഹരിക്കാൻ.`,
      buttons: [
        { title: "അംഗീകരിക്കുക", id: "issue_approve" },
        { title: "നിരസിക്കുക", id: "issue_reject" },
        { title: "പിടിക്കുക", id: "issue_hold" },
      ],
    },
    issue_approve: {
      message: () =>
        "സ്റ്റാറ്റസ് അപ്‌ഡേറ്റ്: അംഗീകരിച്ചു\nനിങ്ങളുടെ അഭ്യർത്ഥന/അപേക്ഷ അംഗീകരിച്ചുവെന്ന് നിങ്ങളെ അറിയിക്കുന്നതിൽ ഞങ്ങൾക്ക് സന്തോഷമുണ്ട്!\nനിങ്ങളുടെ ക്ഷമയ്ക്കും സഹകരണത്തിനും നന്ദി.",
    },
    issue_reject: {
      message: () =>
        "ಸ್ಥಿತಿ ಅಪ್‌ಡೇಟ್: ತಿರಸ್ಕರಿಸಲಾಗಿದೆ \nನಿಮ್ಮ ವಿನಂತಿ/ಅರ್ಜಿಯನ್ನು ತಿರಸ್ಕರಿಸಲಾಗಿದೆ ಎಂದು ನಿಮಗೆ ತಿಳಿಸಲು ನಾವು ವಿಷಾದಿಸುತ್ತೇವೆ.\nನಿಮ್ಮ ತಿಳುವಳಿಕೆಯನ್ನು ನಾವು ಪ್ರಶಂಸಿಸುತ್ತೇವೆ.",
    },
    issue_hold: {
      message: () =>
        "സ്റ്റാറ്റസ് അപ്‌ഡേറ്റ്: ഹോൾഡ് ചെയ്യുന്നു \nഞങ്ങൾ സ്ഥിതിഗതികൾ അവലോകനം ചെയ്യുകയും വിലയിരുത്തുകയും ചെയ്യുമ്പോൾ നിങ്ങളുടെ അഭ്യർത്ഥന/അപേക്ഷ നിലവിൽ ഹോൾഡിലാണ്.\nഈ സമയത്ത് നിങ്ങളുടെ ക്ഷമയെ ഞങ്ങൾ അഭിനന്ദിക്കുന്നു.",
    },
    request_approve: {
      message: () =>
        `*ലീവ് അഭ്യർത്ഥന അപ്‌ഡേറ്റ്*: അംഗീകരിച്ചു\nനിങ്ങളുടെ ലീവ് അഭ്യർത്ഥന അംഗീകരിച്ചുവെന്ന് നിങ്ങളെ അറിയിക്കുന്നതിൽ ഞങ്ങൾക്ക് സന്തോഷമുണ്ട്!\nനിങ്ങളുടെ ക്ഷമയ്ക്കും സഹകരണത്തിനും നന്ദി.`,
    },
    request_reject: {
      message: () =>
        `*ലീവ് അഭ്യർത്ഥന അപ്‌ഡേറ്റ്*: നിരസിച്ചു \nനിങ്ങളുടെ ലീവ് അഭ്യർത്ഥന നിരസിക്കപ്പെട്ടുവെന്ന് നിങ്ങളെ അറിയിക്കുന്നതിൽ ഞങ്ങൾ ഖേദിക്കുന്നു.\nനിങ്ങളുടെ ധാരണയെ ഞങ്ങൾ അഭിനന്ദിക്കുന്നു.`,
    },
    request_hold: {
      message: () =>
        `*ലീവ് അഭ്യർത്ഥന അപ്‌ഡേറ്റ്*: ഹോൾഡ് ആണ് \nഞങ്ങൾ സ്ഥിതിഗതികൾ അവലോകനം ചെയ്യുകയും വിലയിരുത്തുകയും ചെയ്യുന്ന സമയത്ത് നിങ്ങളുടെ ലീവ് അഭ്യർത്ഥന നിലവിൽ ഹോൾഡിലാണ്.\nഈ സമയത്ത് നിങ്ങളുടെ ക്ഷമയെ ഞങ്ങൾ അഭിനന്ദിക്കുന്നു.`,
    },
    addEmployee: {
      message: (employeeName, employeeNumber, timing, geofen) =>
        `ചേർന്നു:\n*പേര്*: ${employeeName}\n*നമ്പർ*: ${employeeNumber}\n*തരം*: ${timing}\n*ജിയോഫെൻസിംഗ്*: ${geofen}`,
    },
    editEmployee: {
      message: () => ({
        body: `എഡിറ്റ് എംപ്ലോയി ബട്ടണിൽ ക്ലിക്ക് ചെയ്ത് ഫോം പൂരിപ്പിച്ചുകൊണ്ട് ജീവനക്കാരനെ എഡിറ്റ് ചെയ്യുക.`,
        label: {
          title: "ജോലിയുടെ വിശദാംശങ്ങൾ എഡിറ്റുചെയ്യുക",
          employeeNameLabel: "ജോലിയാളുടെ പേര്",
          employeeNumberLabel: "ജോലിയാളുടെ നമ്പർ",
          timingTypeLabel: "സമയ തരം",
          workingHoursNote: "പ്രവർത്തിക്ഷേത്രം സ്വന്തമാക്കാൻ സമയം",
          checkInOutNote: "നിയന്ത്രിത സമയം: ചെക്ക്-ഇൻ ആണുള്ളത് & ചെക്ക്-ഔട്ട്",
          checkInLabel: "ചെക്ക്-ഇൻ",
          checkOutLabel: "ചെക്ക്-ഔട്ട്",
          workingHoursLabel: "പ്രവർത്തന സമയം",
          designationLabel: "പദവി",
          branchLabel: "സ്ഥലം",
          joiningDateLabel: "ചേരൽ തീയതി",
          dobLabel: "ജനനതാരിഖ",
        },
        list: {
          timingTyperadio: [
            {
              id: "Flexible",
              title: "മാറ്റംനിര്",
            },
            {
              id: "Fixed",
              title: "നിര്‍ദിഷ്ട സമയം",
            },
          ],
          shiftTyperadio: [
            {
              id: "day",
              title: "ദിവസ ശിഫ്റ്റ്",
            },
            {
              id: "day/night",
              title: "ദിവസ/രാത്രി ശിഫ്റ്റ്",
            },
          ],
          workdaysList: [
            {
              id: "0",
              title: "ഞായർ",
            },
            {
              id: "1",
              title: "തിങ്കൾ",
            },
            {
              id: "2",
              title: "ചൊവ്വ",
            },
            {
              id: "3",
              title: "ബുധൻ",
            },
            {
              id: "4",
              title: "വ്യാഴം",
            },
            {
              id: "5",
              title: "വെള്ളി",
            },
            {
              id: "6",
              title: "ശനി",
            },
          ],
          proofList: [
            {
              id: "location",
              title: "സ്ഥലം",
            },
            {
              id: "image",
              title: "ഫോട്ടോ",
            },
            {
              id: "logs",
              title: "ലോഗുകൾ",
            },
          ],
        },
      }),
    },
    ticketUpdate: {
      message: (ticketNumber) =>
        `ടിക്കറ്റ് നമ്പർ: ${ticketNumber} യുടെ പരിസ്ഥിതി വിജയകരമായി പുതുക്കപ്പെട്ടു`,
    },
    employerStart: {
      message: () =>
        `ഹലോ, ഇനിപ്പറയുന്ന ചോയ്‌സുകളിൽ നിന്ന് ഒരു ഓപ്ഷൻ തിരഞ്ഞെടുക്കുക:\n\n1️⃣. റിപ്പോർട്ട് നേടുക: വിശദമായ റിപ്പോർട്ട് ലഭിക്കാൻ ഈ ബട്ടൺ ക്ലിക്ക് ചെയ്യുക..\n2️⃣. അംഗീകാരങ്ങൾ: ജീവനക്കാരുടെ അവധി അംഗീകാരങ്ങൾ പരിശോധിക്കണോ അല്ലെങ്കിൽ നിയന്ത്രിക്കണോ? നാവിഗേറ്റ് ചെയ്യാൻ ഈ ബട്ടൺ ഉപയോഗിക്കുക.\n3️⃣. പ്രൊഫൈൽ/ക്രമീകരണങ്ങൾ: നിങ്ങളുടെ പ്രൊഫൈലും ക്രമീകരണങ്ങളും ഇവിടെ നിയന്ത്രിക്കുക.`,
      buttons: [
        { id: "employerReports", title: "റിപ്പോർട്ട് ലഭിക്കുക" },
        { id: "approvals", title: "അനുമതി" },
        { id: "profile-settings", title: "പ്രൊഫൈൽ ക്രമീകരണം" },
      ],
    },
    employerReports: {
      message: () =>
        "സ്വാഗതം! ദയവായി ഒരു ഓപ്ഷൻ തിരഞ്ഞെടുക്കുക:\n1. തത്സമയ റിപ്പോർട്ട്: തത്സമയ അപ്‌ഡേറ്റുകൾ കാണുക.\n2. ഇന്നലത്തെ റിപ്പോർട്ട്: ഇന്നലത്തെ റിപ്പോർട്ട് ആക്‌സസ് ചെയ്യുക.\n3. ജീവനക്കാരുടെ മാസ്റ്റർ ഷീറ്റ്: ജീവനക്കാരുടെ മാസ്റ്റർ ഷീറ്റ് ആക്‌സസ് ചെയ്യുക.",
      // buttons: [
      //   {
      //     id: "liveReport",
      //     title: "ലൈവ് റിപ്പോർട്ട്",
      //   },
      //   {
      //     id: "yesterdayReport",
      //     title: "ഇന്നലെ റിപ്പോർട്ട്",
      //   },
      //   {
      //     id: "emp_master_sheet",
      //     title: "എല്ലാ സജീവ ജോലികളും",
      //   },
      // ],
      buttons: [
        {
          title: "Reports",
          headers: "Reports",
          rows: [
            {
              id: "liveReport",
              title: "തത്സമയ റിപ്പോർട്ട്",
              description: "Download Live Report",
            },
            {
              id: "yesterdayReport",
              title: "ഇന്നലെ റിപ്പോർട്ട്",
              description: "Download Yesterday Report",
            },
            {
              id: "dateRangeReport",
              title: "തീയതി റേഞ്ച് റിപ്പോർ",
              description: "Download Date Range Report",
            },
            {
              id: "emp_master_sheet",
              title: "എല്ലാ ജീവനക്കാരെയും",
              description: "Download Report of all your Employees",
            },
          ],
        },
      ],
    },
    employeeDemoStart: {
      buttons: [{ id: "MarkAttendance", title: "ഹാജരാക്കുക" }],

      message: () =>
        "1️⃣ *എംപ്ലോയി ഡെമോ സ്റ്റെപ്പുകൾ:\n എ. ✅ മാർക്ക് ഹാജർ\n ബി. 🙋 അഭ്യർത്ഥന ലീവ്\n സി. 🎫 ഒരു ടിക്കറ്റ് ഉയർത്തുക\n ഡി. 📊 റിപ്പോർട്ട് കാണുക\n2️⃣ *എംപ്ലോയർ ഡെമോ സ്റ്റെപ്പുകൾ* (എംപ്ലോയി ഡെമോ സ്റ്റെപ്പുകൾ പൂർത്തിയാക്കിയ ശേഷം)",
    },
    "addGeo-fencing-emplyer": {
      message: () =>
        `ജിയോ-ഫെൻസിംഗ് ഫംഗ്‌ഷണാലിറ്റി സംയോജിപ്പിക്കാൻ നിങ്ങൾ ആഗ്രഹിക്കുന്നുവെങ്കിൽ, ദയവായി ചുവടെയുള്ള "അതെ" ഓപ്ഷൻ തിരഞ്ഞെടുക്കുക.`,
      buttons: [
        { id: "yes-geofencing", title: "അതെ" },
        { id: "no-geofencing", title: "ഇല്ല" },
      ],
    },
    "yes-geofencing": {
      message: () => `നിങ്ങളുടെ ഓഫീസിന്റെ നിലവിലെ സ്ഥാനം പങ്കിടുക`,
    },
    "office-geo-fencing": {
      message: () => `നിങ്ങളുടെ ഓഫീസിന്റെ നിലവിലെ സ്ഥാനം നൽകിയതിന് നന്ദി`,
    },
    "reminder-in": {
      message: () =>
        `അടുത്ത 5 മിനിറ്റിനുള്ളിൽ ചെക്ക്-ഇൻ അടയാളപ്പെടുത്താനുള്ള സൗഹൃദ ഓർമ്മപ്പെടുത്തലാണിത്`,
    },
    "reminder-out": {
      message: () =>
        `അടുത്ത 5 മിനിറ്റിനുള്ളിൽ ചെക്ക്-ഔട്ട് അടയാളപ്പെടുത്താനുള്ള സൗഹൃദ ഓർമ്മപ്പെടുത്തലാണിത്`,
    },
    employeeUploaded: {
      message: () =>
        "✅ ജീവനക്കാരന്റെ പ്രൊഫൈൽ വിജയകരമായി സൃഷ്ടിച്ചു.\n\nഒരു ഔപചാരിക അറിയിപ്പും അറ്റെൻഡൻസ് ആരംഭ സന്ദേശവും ജീവനക്കാരന്റെ വാട്സ്ആപ്പ് നമ്പറിലേക്ക് അയച്ചിട്ടുണ്ട്.\n\nദയവായി ജീവനക്കാരോട് പ്രദർശനം പെട്ടെന്ന് പൂർത്തിയാക്കാൻ പറയുകയും അവരുടെ അറ്റെൻഡൻസ് മാർക്ക് ചെയ്യാൻ തുടങ്ങുകയും ചെയ്യുക.",
    },
    employeeDemoCompleted: {
      message: () =>
        "ഡെമോ വിജയകരമായി പൂർത്തിയാക്കി.\nനിങ്ങൾക്ക് ഈ നമ്പറിൽ ദിവസേന ഹാജർ മാർക്ക് ചെയ്യാൻ അഭ്യർത്ഥിക്കുന്നു. പ്രവാഹം തുടങ്ങാൻ 'ഹായ്' എന്ന് ഏത് സമയത്തും ടൈപ്പ് ചെയ്യാം.",
    },
    "profile-settings": {
      message: () =>
        `*പ്രൊഫൈൽ ക്രമീകരണങ്ങൾ*\n\nചുവടെയുള്ള ഒരു ഓപ്ഷൻ തിരഞ്ഞെടുക്കുക:\n\n1. *ബിസിനസ് ക്രമീകരണങ്ങൾ*: നിങ്ങളുടെ ബിസിനസ്സ് മുൻഗണനകൾ കോൺഫിഗർ ചെയ്യുക.\n2. *അറിയിപ്പുകൾ*: ദിവസേനയുള്ള തത്സമയ റിപ്പോർട്ടുകൾക്കായി.\n3. *എഡിറ്റ് / ഡിലീറ്റ്*\n\ta. ഷിഫ്റ്റ് ടൈമിംഗ് എഡിറ്റ് ചെയ്യുക`,
      // message: () =>
      //   `*പ്രൊഫൈൽ ക്രമീകരണങ്ങൾ*\n\nചുവടെയുള്ള ഒരു ഓപ്ഷൻ തിരഞ്ഞെടുക്കുക:\n\n1. *ബിസിനസ് ക്രമീകരണങ്ങൾ*: നിങ്ങളുടെ ബിസിനസ്സ് മുൻഗണനകൾ കോൺഫിഗർ ചെയ്യുക.\n2. *അറിയിപ്പുകൾ*: ദിവസേനയുള്ള തത്സമയ റിപ്പോർട്ടുകൾക്കായി.\n3. *എഡിറ്റ് / ഡിലീറ്റ്*\n\ta. ജിയോ ഫെൻസിംഗ് എഡിറ്റ് ചെയ്യുക\n\tb. ഷിഫ്റ്റ് ടൈമിംഗ് എഡിറ്റ് ചെയ്യുക`,
      buttons: [
        {
          id: "business-settings",
          title: "ബിസിനസ് ക്രമീകരണങ്ങൾ",
        },
        {
          id: "notification-settings",
          title: "അറിയിപ്പുകൾ",
        },
        {
          id: "edit-delete",
          title: "എഡിറ്റ് / ഇല്ലാതാക്",
        },
      ],
    },
    "business-settings": {
      message: () => ({
        body: `ചുവടെയുള്ള ബട്ടണിൽ ക്ലിക്കുചെയ്ത് നിങ്ങളുടെ ബിസിനസ്സ് വിവരങ്ങൾ അപ്ഡേറ്റ് ചെയ്യുക. നന്ദി!`,
        label: {
          title: "ബിസിനസ് സെറ്റിങ്ങുകൾ എഡിറ്റുചെയ്യുക",
          employerNamelabel: "ജോലിക്ക് പേര്",
          employernolabel: "ജോലിയാളി നമ്പർ",
          bufferTimelabel: "ബഫർ സമയം",
          companyNamelabel: "കമ്പനിയുടെ പേര്",
          monthlySickLeavelabel: "മാസിക രോഗ അവധി",
          casualLeavelabel: "അനാവശ്യ അവധി",
          annualLeavelabel: "വാർഷിക അവധി",
          maternityLeaveAllowedlabel: "ഗര്‍ഭാവസ്ഥ അവധി അനുവദനീയം",
          paternityLeaveAllowedlabel: "പിതൃവാത്സല്യ അവധി അനുവദനീയം",
          unpaidLeavePolicylabel: "അനാര്‍ഥക അവധി നയം",
          leaveEncashmentlabel: "അവധി എൻക്യാഷ്മെന്റ്",
          consequencesUnapprovedLeavelabel: "അനധികൃത അവധിയുടെ പരിണാമങ്ങൾ",
          halfDayPolicylabel: "അർധ ദിവസ നയം",
          Languagelabel: "ഭാഷ",
          carryForwardLimitlabel: "മുന്നോക്കി കൊണ്ടുവരുകയുള്ള പരിധി",
        },
      }),
    },
    "edit-delete": {
      message: () =>
        `എഡിറ്റ് ചെയ്യാനോ ഇല്ലാതാക്കാനോ ഉള്ള ഓപ്ഷൻ നിങ്ങൾ തിരഞ്ഞെടുത്തു. ഇനിപ്പറയുന്ന ഫീച്ചറുകളിൽ നിന്ന് തിരഞ്ഞെടുക്കുക\n\n1. ഷിഫ്റ്റ് ടൈമിംഗുകൾ എഡിറ്റുചെയ്യുക: കമ്പനി സമയത്തെ അടിസ്ഥാനമാക്കി ജീവനക്കാരുടെ ഷെഡ്യൂളുകൾ ക്രമീകരിക്കുക.\n2.ജിയോ ഫെൻസിങ് എഡിറ്റുചെയ്യുക: ഭൂമിശാസ്ത്രപരമായ അതിരുകളോ നിയന്ത്രണങ്ങളോ പരിഷ്‌ക്കരിക്കുക അല്ലെങ്കിൽ അപ്‌ഡേറ്റ് ചെയ്യുക.\n3. ഇല്ലാതാക്കുക: ജീവനക്കാരുമായി ബന്ധപ്പെട്ട ഏത് ഡാറ്റയും ഇല്ലാതാക്കാൻ ഈ ഓപ്ഷൻ നിങ്ങളെ അനുവദിക്കുന്നു`,
      buttons: [
        { id: "edit-timings", title: "ഷിഫ്റ്റ് സമയ എഡിറ്റു" },
        { id: "edit-geo-fencing", title: "ജിയോ ഫെൻസിങ് എ" },
        { id: "delete", title: "ഇല്ലാതാക്കുക" },
      ],
    },
    "edit-timings": {
      message: () => ({
        body: `ഷിഫ്റ്റ് ടൈമിംഗുകൾ എഡിറ്റുചെയ്യുന്നതിന് ചുവടെയുള്ള ബട്ടൺ ആക്‌സസ് ചെയ്‌ത് ദയവായി ജീവനക്കാരുടെ ഷെഡ്യൂളുകൾ നിയന്ത്രിക്കുകയും ഒപ്റ്റിമൈസ് ചെയ്യുകയും ചെയ്യുക. ഈ വിഷയത്തിൽ നിങ്ങളുടെ ശ്രദ്ധ വളരെ വിലമതിക്കപ്പെടുന്നു. നന്ദി.`,
        label: {
          title: "ഷിഫ്റ്റ് സമയങ്ങൾ എഡിറ്റുചെയ്യുക",
          timingTypeLabel: "സമയ തരം",
          checkInLabel: "ചെക്ക് ഇൻ",
          checkOutLabel: "ചെക്ക് ഔട്ട്",
          workingHoursLabel: "പ്രവൃത്തി സമയം",
          branchLabel: "ബ്രാൻചുകൾ",
          employeesLabel: "ജോലിക്കാരുകൾ",
          shiftTyperadio: [
            {
              id: "day",
              title: "ദിവസ ശിഫ്റ്റ്",
            },
            {
              id: "day/night",
              title: "ദിവസ/രാത്രി ശിഫ്റ്റ്",
            },
          ],
          timingTyperadio: [
            {
              id: "Flexible",
              title: "മാറ്റംനിര്",
            },
            {
              id: "Fixed",
              title: "നിര്‍ദിഷ്ട സമയം",
            },
          ],
          workdaysList: [
            {
              id: "0",
              title: "ഞായർ",
            },
            {
              id: "1",
              title: "തിങ്കൾ",
            },
            {
              id: "2",
              title: "ചൊവ്വ",
            },
            {
              id: "3",
              title: "ബുധൻ",
            },
            {
              id: "4",
              title: "വ്യാഴം",
            },
            {
              id: "5",
              title: "വെള്ളി",
            },
            {
              id: "6",
              title: "ശനി",
            },
          ],
        },
      }),
    },
    "edit-geo-fencing": {
      message: () =>
        `ജിയോ ഫെൻസിംഗ് ക്രമീകരണങ്ങൾ ആക്‌സസ് ചെയ്യാനും എഡിറ്റ് ചെയ്യാനും താഴെയുള്ള ബട്ടൺ ഉപയോഗിച്ച് ജീവനക്കാരുടെ ലൊക്കേഷനുകളിൽ കൃത്യമായ നിയന്ത്രണം ഉറപ്പാക്കുക. ഈ ചുമതലയിൽ നിങ്ങളുടെ ശ്രദ്ധ വിലമതിക്കുന്നു. നന്ദി`,
    },
    link_employee: {
      message: () => ({
        body: `പുതിയ സ്ഥലത്തെയും ജീവനക്കാരെയും സ്ഥലത്തേക്ക് ചേർക്കുക`,
        label: {
          title: "ജിയോ ഫെൻസിംഗ്",
          heading: "സ്ഥലം കോർഡിനേറ്റുകൾ",
          rangelabel: "പരിധി",
          rangeheadinglabel: "പരിധി 50 മീറ്റർ കൂടി ഉണ്ടായിരിക്കണം",
          employeelabel: "കർമ്മചാരന്മാർക്ക് സ്ഥലം ലിങ്ക് ചെയ്യുക:",
          branchnamelabel: "സ്ഥലം പേര്",
        },
      }),
    },
    edit_geolocation: {
      message: () => ({
        body: `Edit Geo Fencing of Employees by clicking the below button`,
        label: {
          title: "ജിയോ സ്ഥാനം എഡിറ്റുചെയ്യുക",
          workingHoursLabel: "പ്രവൃത്തി സമയം",
          branchLabel: "കർമ്മചാരി",
          timingTypeLabel: "സമയ രീതി",
          placelabel: "സ്ഥലം",
        },
      }),
    },
    "edit-notifs": {
      message: (companyName) => ({
        body: `അപ്‌ഡേറ്റ് ബട്ടൺ ക്ലിക്കുചെയ്‌ത് അറിയിപ്പുകൾ അപ്‌ഡേറ്റ് ചെയ്യുക`,
        label: {
          companyNamelabel: companyName,
          Notificationslabel: "അറിയിപ്പ്",
          dailyreportlabel: "ദിനചരി പ്രകാശ റിപ്പോർട്ട്",
          dailyeveningreportlabel: "ദിനചരി സായം റിപ്പോർട്ട്",
          monthendlabel: "മാസത്തിന്റെ അന്തത്തിന് റിപ്പോർട്ട്",
        },
        buttons: [
          { id: "checkIn", title: "ചെക്ക്-ഇന്നുകൾ" },
          { id: "checkOut", title: "ചെക്ക്-ഔട്ടുകൾ" },
          { id: "leaveRequest", title: "അവധി അഭ്യർത്ഥിക്കുക" },
          { id: "support", title: "പിന്തുണ അഭ്യർത്ഥന" },
        ],
      }),
    },
    "notification-settings": {
      message: () =>
        `ഞങ്ങളുടെ ഏറ്റവും പുതിയ ഫീച്ചർ ഉപയോഗിച്ച് നിങ്ങളുടെ മാനേജർ അനുഭവം മെച്ചപ്പെടുത്തുക - അറിയിപ്പ് എഡിറ്റ് ബട്ടൺ\n\nചെക്ക് ഇൻ: നിങ്ങളുടെ ജീവനക്കാർ ചെക്ക്-ഇൻ ചെയ്യുമ്പോൾ അറിയിപ്പ് സ്വീകരിക്കുക.\nചെക്ക് ഔട്ട്: നിങ്ങളുടെ ജീവനക്കാർ ചെക്ക്-ഔട്ട് ചെയ്യുമ്പോൾ അറിയിപ്പ് സ്വീകരിക്കുക.\nരാവിലെ റിപ്പോർട്ട്: ഒരു തത്സമയ റിപ്പോർട്ട് സ്വീകരിക്കുക. രാവിലെ.\nസായാഹ്ന റിപ്പോർട്ട്: വൈകുന്നേരം ഒരു തത്സമയ റിപ്പോർട്ട് സ്വീകരിക്കുക.`,
      buttons: [{ id: "edit-notifs", title: "അറിയിപ്പുകൾ എഡിറ്റ്" }],
    },
    "remove-employees": {
      message: () => ({
        body: `ജീവനക്കാരുടെ നീക്കം ചെയ്യൽ പ്രക്രിയ ആരംഭിക്കുന്നതിന് ദയവായി താഴെയുള്ള ബട്ടണിൽ ക്ലിക്ക് ചെയ്യുക.`,
        label: {
          title: "ജോലിക്കാർ നീക്കാം",
          employeesLabel: "ജോലിക്കാർ",
          companylabel: "കമ്പനിയുടെ പേര്",
        },
      }),
    },
    "remove-branch": {
      message: () => ({
        body: `ജീവനക്കാരനെ സ്ഥലത്ത് നിന്ന് നീക്കം ചെയ്യാൻ താഴെയുള്ള ബട്ടണിൽ ക്ലിക്ക് ചെയ്യുക.`,
        label: {
          title: "ജീവനക്കാരെ സ്ഥലത്ത് നിന്ന് നീക്കം ചെയ്യുക",
          branchLabel: "സ്ഥലങ്ങൾ",
          employeesLabel: "ജോലിക്കാർ",
          companylabel: "കമ്പനിയുടെ പേര്",
        },
      }),
    },
    "live-report-templates": {
      message: () => ({
        employees: "ജോലിക്കാരൻ",
        onTime: "സമയത്തിൽ",
        late: "പിൻവലിച്ചു",
        absent: "അനുപസ്ഥിതനായ",
        onLeave: "അവസരമുള്ള",
        attendance: "ഹാജർ",
        employee: "ജോലിക്കാരൻ",
        shiftStatus: "ഷിഫ്റ്റ് ആണ് സ്ഥിതി",
        checkIn: "ചെക്ക് ഇൻ",
        checkOut: "ചെക്ക് ഔട്ട്",
        requiredTime: "ആവശ്യമായ സമയം",
        actualTime: "യാഥാർത്ഥ്യ സമയം",
        shiftDuration: "ഷിഫ്റ്റ് ദൈർഘ്യം",
        leaveRequests: "അവസര അഭ്യർത്ഥനകൾ",
        leaveType: "അവസര തരം",
        startDate: "ആരംഭ തീയതി",
        endDate: "അവസാന തീയതി",
        status: "സ്ഥിതി",
      }),
    },
    "employee-report-templates": {
      message: () => ({
        present: "ഉപസ്ഥിതം",
        absent: "അനുപസ്ഥിതം",
        leaves: "അവകാശങ്ങൾ",
        attendance: "ഹാജരാ",
        date: "തീയതി",
        shiftStatus: "ഷിഫ്റ്റ് & സ്റ്റാറ്റസ്",
        checkIn: "ചെക്ക് ഇൻ",
        checkOut: "ചെക്ക് ഔട്ട്",
        requiredTime: "ആവശ്യമായ സമയം",
        actualTime: "നിജമായ സമയം",
        shiftDuration: "ഷിഫ്റ്റ് ദൈർഘ്യം",
        leaveRequests: "അവകാശ അഭ്യർത്ഥനകൾ",
        leaveType: "അവകാശ രീതി",
        startDate: "ആരംഭ തീയതി",
        endDate: "അവസാന തീയതി",
        status: "സ്ഥിതി",
      }),
    },
    "emp-attendance-templates": {
      message: () => ({
        employeeAttendenceLogs: "സൗകര്യസ്ഥിതി ലോഗുകൾ",
        totalTickets: "ആകെ ടിക്കറ്റുകൾ",
        ticketOpen: "ടിക്കറ്റ് തുറക്കുന്നു",
        ticketClosed: "ടിക്കറ്റ് അടയ്ക്കുന്നു",
        employeeAttendenceLog: "സൗകര്യസ്ഥിതി ലോഗ്",
      }),
    },
    "all-emp-ticket-templates": {
      message: () => ({
        employeeTickets: "സൗകര്യ ടിക്കറ്റുകൾ",
        totalTickets: "ആകെ ടിക്കറ്റുകൾ",
        ticketOpen: "ടിക്കറ്റ് തുറക്കുന്നു",
        ticketClosed: "ടിക്കറ്റ് അടയ്ക്കുന്നു",
        ticketsOpen: "ടിക്കറ്റുകൾ തുറക്കുന്നു",
        ticketsClosed: "ടിക്കറ്റുകൾ അടയ്ക്കുന്നു",
      }),
    },
    "all-emp-report-templates": {
      message: () => ({
        employees: "സജീവരുത്താനുകൾ",
        employeesInfo: "സജീവ വിവരങ്ങൾ",
        employee: "സജീവൻ",
        position: "പോസിഷൻ",
        shiftTimings: "ശിഫ്റ്റ് സമയം",
        joiningDate: "ചേരുന്ന തീയതി",
      }),
    },
    addBranch: {
      message: () => ({
        body: `"സ്ഥലം ചേർക്കുക" ബട്ടൺ ക്ലിക്കുചെയ്ത് സ്ഥലം ചേർക്കുക.`,
        label: {
          title: "Geo Fencing",
          heading: "Place Coordinates",
          rangelabel: "Range",
          rangeheadinglabel: "Range must be 200 meters and above",
          branchnamelabel: "Place Name",
        },
      }),
    },
    delete: {
      message: () =>
        `ഹലോ, ദയവായി താഴെ ഒരു ഓപ്ഷൻ തിരഞ്ഞെടുക്കുക:\n1. ജീവനക്കാരെ നീക്കം ചെയ്യുക: സ്ഥാപനത്തിൽ നിന്ന് ജീവനക്കാരെ നീക്കം ചെയ്യുക.\n2. സ്ഥലം നീക്കം ചെയ്യുക: സ്ഥലത്ത് നിന്ന് ജീവനക്കാരെ നീക്കം ചെയ്യുക`,
      buttons: [
        { id: "remove-employees", title: "ജീവനക്കാരന നീക" },
        { id: "remove-branch", title: "സ്ഥലം നീക്കം ചെയ്യുക" },
      ],
    },
    dateRangeReport: {
      message: () => ({
        body: `നിങ്ങളുടെ അവലോകനത്തിനായി ഞങ്ങൾ ഒരു സമഗ്രമായ തീയതി റേഞ്ച് റിപ്പോർട്ട് തയ്യാറാക്കിയിട്ടുണ്ട്. നിങ്ങൾ തിരഞ്ഞെടുത്ത തീയതി ശ്രേണി വ്യക്തമാക്കുക, സ്ഥിതിവിവരക്കണക്കുകളും വിശകലനങ്ങളും ഞങ്ങൾ നിങ്ങൾക്ക് ഉടനടി നൽകും.`,
        label: {
          title: " തീയതി ശ്രേണി റിപ്പോർട്ട്",
          startdatelabel: " ആരംഭ തീയതി",
          enddatelabel: "അവസാന തീയതി",
        },
      }),
    },
    attendanceManagement: {
      message: () => ({
        body: `ഓട്ടോവാട്ട് അറ്റൻഡൻസ് മാനേജ്മെൻ്റ് ചാറ്റ് ബോട്ടിലേക്ക് സ്വാഗതം.`,
        label: {
          label1: "റിപ്പോർട്ട് അംഗീകാരം",
          label2: "റിപ്പോർട്ടുകൾ",
          label3: "ടീം",
          label7: "സ്ഥലം എഡിറ്റ് ചെയ്യു",
          label9: "സ്ഥലങ്ങൾ ഇല്ലാതാക്കു",
          label10: "ഷിഫ്റ്റ് ടൈമിംഗ്",
          label11: "എംപി ഇല്ലാതാക്കുക",
          labeldelete: "ഓപ്ഷനുകൾ ഇല്ലാതാക്കു",
          labeledit: "എഡിറ്റ് ഓപ്ഷൻ",
          labelbusiness: "ബിസിനസ് ക്രമീകരണങ്ങൾ",
          labelBussinessRadio: "എഡിറ്റ് ബിസിനസ്സ്",
          reportsdd: [
            {
              id: "yesterdayreport",
              title: "ഇന്നലെ റിപ്പോർട്ട്",
            },
            {
              id: "currentmonth",
              title: "ഈ മാസം",
            },
            {
              id: "customdaterangepdf",
              title: "തീയതി റിപ്പോർട്ട്(PDF)",
            },
            {
              id: "allEmployees",
              title: "എല്ലാ എംപി റിപ്പോർട്ട്",
            },
          ],
          quick: [
            {
              id: "livereport",
              title: "തത്സമയ റിപ്പോർട്ട്",
            },
            {
              id: "leaveApprovals",
              title: "അംഗീകാരങ്ങൾ വിടുക",
            },
            {
              id: "attendanceCorrections",
              title: "ഹാജർ തിരുത്തൽ",
            },
            {
              id: "supportTickets",
              title: "പിന്തുണ ടിക്കറ്റുകൾ",
            },
            {
              id: "taskApprovals",
              title: "ടാസ്ക് അംഗീകാരം",
            },
            {
              id: "broadcast",
              title: "പ്രക്ഷേപണം",
            },
          ],
          labelBussinessList: [
            {
              id: "editBusiness",
              title: "എഡിറ്റ് ബിസിനസ്സ്",
            },
          ],
        },
      }),
    },
    contacts: {
      message: () => `ക്ഷമിക്കണം! നിങ്ങൾക്ക് കോൺടാക്റ്റുകൾ അപ്‌ലോഡ് ചെയ്യാൻ കഴിയില്ല.`,
    },
    contactsUpdate: {
      message: () =>
        `ജീവനക്കാരുടെ വിശദാംശങ്ങൾ വിജയകരമായി അപ്‌ഡേറ്റ് ചെയ്‌തുവെന്ന് നിങ്ങളെ അറിയിക്കുന്നതിൽ എനിക്ക് സന്തോഷമുണ്ട്.`,
    },
    placeCreated: {
      message: () =>
        `പുതിയ സ്ഥലവും ജിയോ ഫെൻസിംഗും വിജയകരമായി സൃഷ്ടിച്ചുവെന്ന് നിങ്ങളെ അറിയിക്കാൻ ഞങ്ങൾ ആഗ്രഹിക്കുന്നു`,
    },
    employeeGeoFencing: {
      message: () =>
        `ജീവനക്കാരുടെ ജിയോ ഫെൻസിംഗ് വിജയകരമായി അപ്‌ഡേറ്റ് ചെയ്‌തുവെന്ന് നിങ്ങളെ അറിയിക്കാൻ ഞങ്ങൾ ആഗ്രഹിക്കുന്നു.`,
    },
    employeeRemove: {
      message: () =>
        `സ്ഥാപനത്തിൽ നിന്ന് ജീവനക്കാരനെ നീക്കം ചെയ്തതായി നിങ്ങളെ അറിയിക്കാൻ ഞങ്ങൾ ആഗ്രഹിക്കുന്നു.`,
    },
    employeeRemovePlace: {
      message: () =>
        `ജീവനക്കാരെ സ്ഥലത്ത് നിന്ന് നീക്കം ചെയ്തതായി നിങ്ങളെ അറിയിക്കാൻ ഞങ്ങൾ ആഗ്രഹിക്കുന്നു.`,
    },
    placeDeleted: {
      message: () => `സ്ഥലം വിജയകരമായി ഇല്ലാതാക്കി.`,
    },
    broadcast: {
      message: () => ({
        body: `നിങ്ങളുടെ എല്ലാ ജീവനക്കാർക്കും നിങ്ങളുടെ സന്ദേശം പ്രക്ഷേപണം ചെയ്യുക`,
        label: {
          broadcastLabel: "ബ്രോഡ്കാസ്റ്റ് സന്ദേ",
          filesLabel: "ഫയലുകൾ",
          employeesLabel: "കർമ്മചാരികൾ",
          fileRadios: [
            {
              id: "document",
              title: "ഡോക്യുമെന്റ്",
            },
            {
              id: "image",
              title: "ചിത്രം",
            },
            {
              id: "video",
              title: "വീഡിയോ",
            },
          ],
        },
      }),
    },
  },
  German: {
    hi: {
      message: (name) =>
        `Hallo ${name}\n Ich bin Ihr freundlicher Anwesenheits-Bot, der Ihnen gerne weiterhilft.`,
      buttons: (userData) => [
        {
          id: "MarkAttendance",
          title: "Anwesenheit markieren",
        },
        // {
        //   id: "Report",
        //   title: "Report",
        // },
        {
          id: `empFl@${userData}`,
          // id: "employeeFlow",
          title: "Andere",
        },
      ],
    },
    MarkAttendance: {
      message: () =>
        "*Anwesenheit markieren*\n\n- Um den Beginn ihres Arbeitstages zu markieren, klicken Sie auf [IN].\n- Um das Ende Ihres Arbeitstages zu markieren, klicken Sie auf [OUT].",
      buttons: [
        { id: "in", title: "🟢 IN" },
        { id: "out", title: "🔴 OUT" },
      ],
    },
    in: {
      message: () =>
        "*Standort* \n📍 Bitte teilen Sie Ihren aktuellen Standort mit, indem Sie die folgenden Schritte ausführen:\n1. 📩 Wählen Sie diese Nachricht aus.\n2. 💬 Klicken Sie auf „Antworten“.\n3. 📎 Tippen Sie auf das Anhang- oder Clip-Symbol.\n4. 📍Wählen Sie „Standort“.\n5. ✅ Wählen Sie „Ihren aktuellen Standort senden“.",
    },
    out: {
      message: () =>
        "*Standort* \n📍 Bitte teilen Sie Ihren aktuellen Standort mit, indem Sie die folgenden Schritte ausführen:\n1. 📩 Wählen Sie diese Nachricht aus.\n2. 💬 Klicken Sie auf „Antworten“.\n3. 📎 Tippen Sie auf das Anhang- oder Clip-Symbol.\n4. 📍Wählen Sie „Standort“.\n5. ✅ Wählen Sie „Ihren aktuellen Standort senden“.",
    },
    attendanceLocation: {
      message: () =>
        "📸 Für die Teilnahme senden Sie bitte ein Selfie mit dem Hintergrund, auf dem Ihr Standort innerhalb des Geofencing-Bereichs zu sehen ist.",
    },
    clickAttendanceLocation: {
      message: () =>
        "*⚠️ Nicht direkt senden* . Stellen Sie zunächst sicher, dass Sie *antworten*, und wählen Sie dann „Ihren aktuellen Standort senden“.\n📍 Bitte teilen Sie Ihren aktuellen Standort mit, indem Sie die folgenden Schritte ausführen:\n1. 📩 Wählen Sie diese Nachricht aus.\n2. 💬 Klicken Sie auf „Antworten“.\n3. 📎 Tippen Sie auf das Anhang- oder Clip-Symbol.\n4. 📍 Wählen Sie „Standort“.",
    },
    locNotInRange: {
      message: () =>
        `🚫 Es tut uns leid, aber wir konnten Ihren Standort 📍 und Ihre Anwesenheit ⏲️ derzeit nicht registrieren. Sie befinden sich nicht im Wirkungsbereich des Unternehmens 🚷. Bitte bewegen Sie sich innerhalb der Reichweite des Unternehmens und versuchen Sie es dann noch einmal von Anfang an 🔁.👣`,
    },
    attendancePic: {
      message: () => "📸 Bitte schicke ein Selfie-Foto von Dir 🤳.",
    },
    uploadEmployee: {
      message: () => "Bitte laden Sie alle Ihre Mitarbeiterkontakte hoch.",
    },
    oneDay: {
      message: () => ({
        body: "Bitte geben Sie das Datum und den Grund an, indem Sie auf die Schaltfläche unten klicken",
        label: {
          title: "Urlaub beantragen",
          startdatelabel: "Startdatum",
          reasonlabel: "Grund, zu gehen",
        },
      }),
    },
    moreThanOneDay: {
      message: () => ({
        body: "Bitte geben Sie das Datum und den Grund an, indem Sie auf die Schaltfläche unten klicken",
        label: {
          title: "Urlaub beantragen",
          startdatelabel: "Startdatum",
          enddatelabel: "Endtermin",
          requestlabel: "Urlaubsantrag",
          reasonlabel: "Grund, zu gehen",
        },
      }),
    },
    leaveSummary: {
      message: (
        employeeName,
        department,
        leaveType,
        startDate,
        endDate,
        reasonForLeave,
        ticketNumber,
        recipientPhone
      ) =>
        `Name: *${employeeName}*\nAbteilung: *${
          department ?? "-"
        }* \nFür: *Urlaub beantragen*\nUrlaubstyp: *${leaveType}*\nStartdatum: *${startDate}*\n${
          endDate !== "Ungültiges Datum" ? `Endtermin: *${endDate}*\n` : ""
        }Grund: *${reasonForLeave}*\nNummer : *${recipientPhone}* \nTicket-Nr. : *${ticketNumber}*`,
    },
    support: {
      message: () =>
        "Willkommen! Wir sind hier, um Ihnen zu helfen. Bitte wählen Sie die Probleme aus, mit denen Sie konfrontiert sind:",
      buttons: [
        {
          title: `🔎 Probleme`,
          headers: `🔎 Probleme`,
          rows: [
            {
              id: "check-in",
              title: "Einchecken",
              description: "Check-in-Problem",
            },
            {
              id: "check-out",
              title: "Kasse",
              description: "Schauen Sie sich das Problem an",
            },
            {
              id: "salary-issue",
              title: "Gehaltsfrage",
              description: "Gehaltsfrage",
            },
            {
              id: "other-issue",
              title: "ANDERE❓",
              description: "Anderes Problem",
            },
          ],
        },
      ],
    },
    checkIn: {
      message: () => "Bitte geben Sie Ihre Bemerkung ein.",
    },
    checkOut: {
      message: () => "Bitte geben Sie Ihre Bemerkung ein.",
    },
    other_issue: {
      message: () => "Bitte geben Sie Ihre Bemerkung ein.",
    },
    Salary_Issue: {
      message: () => "Bitte geben Sie Ihre Bemerkung ein.",
    },
    employeeIssue: {
      message: () => "Bitte geben Sie Ihre Bemerkung ein.",
    },
    registerComplain: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `Name: *${name}*\nAbteilung:*${
          department ?? "-"
        }*\nFür: *Support*\nProblem: *${problem}*\nAnmerkung. : *${message}*\nNummer: *${recipientPhone}*\nTicket-Nr.: *${ticketNumber}*`,
    },
    sendIssue: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `*Employee Issue Report*\nSehr geehrter Arbeitgeber, es liegt ein Problem vor, das von einem Mitarbeiter gemeldet wurde:\nEmployee Name: ${name}\nNumber: *${recipientPhone}*\nIssue: *${problem}*\nIssue Description: * ${message}*\nTicket-Nr. : *${ticketNumber}*\nBitte ergreifen Sie geeignete Maßnahmen, um dieses Problem zu beheben.`,
      buttons: (employeeNumber, ticketNumber) => [
        { title: "Genehmigen", id: `issue_approve-${employeeNumber}-${ticketNumber}` },
        { title: "Ablehnen", id: `issue_reject-${employeeNumber}-${ticketNumber}` },
        { title: "Halten", id: `issue_hold-${employeeNumber}-${ticketNumber}` },
      ],
    },
    sendLeave: {
      message: (employeeName, leaveType, startDate, endDate, reason) =>
        `*Benachrichtigung über Urlaubsantrag* \n👤 Name des Mitarbeiters: ${employeeName}\nUrlaubstyp: ${leaveType}\nStartdatum: *${startDate}*\n${
          endDate != "Invalid Date" ? `End Date: *${endDate}*\n` : ""
        }Grund: ${reason}\nBitte überprüfen Sie die Informationen und ergreifen Sie die erforderlichen Maßnahmen.`,
      buttons: (employeePhone, ticketNumber) => [
        {
          id: `request_approve-${employeePhone}-${ticketNumber}`,
          title: "Genehmigen",
        },
        {
          id: `request_reject-${employeePhone}-${ticketNumber}`,
          title: "Ablehnen",
        },
        {
          id: `request_hold-${employeePhone}-${ticketNumber}`,
          title: "Halten",
        },
      ],
    },
    approvals: {
      buttons: [
        { title: "Urlaubsgenehmigung", id: "leaveApprove" },
        { title: "Aktive Probleme", id: "activeIssues" },
      ],
      message: () =>
        `Hallo, bitte wählen Sie unten eine Option aus:\n 1️⃣ Zum Genehmigen von Urlaub.\n 2️⃣ Zum Anzeigen aktiver Probleme, die auf Ihre Genehmigung warten.\nKlicken Sie einfach auf die entsprechende Schaltfläche, um fortzufahren!`,
    },
    leaveApprove: {
      message: () =>
        `*Mitarbeiterurlaub gemeldet*\nSehr geehrter Arbeitgeber, es liegt ein Urlaubsantrag eines Mitarbeiters vor\n *Ticket-Nr.: RL4545* \n *Name*: Ram \n *Daten*: 23.12.2023 \n *Grund*: Hochzeit \n *Typ*: Urlaub beantragen`,
      buttons: [
        { title: "Genehmigen", id: "request_approve" },
        { title: "Ablehnen", id: "request_reject" },
        { title: "Halten", id: "request_hold" },
      ],
    },
    activeIssues: {
      message: () =>
        `*Problembericht eines Mitarbeiters*\nSehr geehrter Arbeitgeber, es liegt ein Problem vor, das von einem Mitarbeiter gemeldet wurde:\n *Name des Mitarbeiters*: Schein \n *Problem*: Gehalt \n *Problembeschreibung*: Gehalt weniger gutgeschrieben\nBitte ergreifen Sie geeignete Maßnahmen zur Behebung dieses Anliegen.`,
      buttons: [
        { title: "Genehmigen", id: "issue_approve" },
        { title: "Ablehnen", id: "issue_reject" },
        { title: "Halten", id: "issue_hold" },
      ],
    },
    issue_approve: {
      message: () =>
        "Statusaktualisierung: Genehmigt\nWir freuen uns, Ihnen mitteilen zu können, dass Ihre Anfrage/Anmeldung genehmigt wurde!\nVielen Dank für Ihre Geduld und Zusammenarbeit",
    },
    issue_reject: {
      message: () =>
        "Statusaktualisierung: Abgelehnt \nWir bedauern, Ihnen mitteilen zu müssen, dass Ihre Anfrage/Bewerbung abgelehnt wurde.\nWir bedanken uns für Ihr Verständnis.",
    },
    issue_hold: {
      message: () =>
        "Statusaktualisierung: In der Warteschleife \nIhre Anfrage/Bewerbung wird derzeit zurückgestellt, während wir die Situation prüfen und beurteilen.\nWir bedanken uns für Ihre Geduld in dieser Zeit.",
    },
    request_approve: {
      message: () =>
        `*Aktualisierung des Urlaubsantrags*: Genehmigt\nWir freuen uns, Ihnen mitteilen zu können, dass Ihr Urlaubsantrag genehmigt wurde!\nVielen Dank für Ihre Geduld und Zusammenarbeit.`,
    },
    request_reject: {
      message: () =>
        `*Aktualisierung des Urlaubsantrags*: Abgelehnt \nWir bedauern, Ihnen mitteilen zu müssen, dass Ihr Urlaubsantrag abgelehnt wurde.\nWir bedanken uns für Ihr Verständnis.`,
    },
    request_hold: {
      message: () =>
        `*Aktualisierung des Urlaubsantrags*: In der Warteschleife \nIhr Urlaubsantrag für wird derzeit zurückgestellt, während wir die Situation prüfen und beurteilen.\nWir danken Ihnen für Ihre Geduld in dieser Zeit.`,
    },
    "remove-branch": {
      message: () => ({
        body: `Klicken Sie bitte auf die Schaltfläche unten, um die Entfernung des Mitarbeiters vom Standort einzuleiten.`,
        label: {
          title: "Entfernen Sie Mitarbeiter vom Standort",
          branchLabel: "Setzt",
          employeesLabel: "Mitarbeiter",
          companylabel: "Name der Firma",
        },
      }),
    },
    edit_geolocation: {
      message: () => ({
        body: `Bearbeiten Sie die Geo-Einzäunung von Mitarbeitern, indem Sie auf die Schaltfläche unten klicken`,
        label: {
          title: "Geolokalisierung bearbeiten",
          workingHoursLabel: "Vertikale Zeit",
          branchLabel: "Mitarbeiter",
          timingTypeLabel: "Zeittyp",
          placelabel: "Ort",
        },
      }),
    },
    "edit-timings": {
      message: () => ({
        body: `Bitte verwalten und passen Sie die Zeitpläne Ihrer Mitarbeiter an, indem Sie auf die Schaltfläche unten zugreifen, um die Schichtzeiten zu bearbeiten. Wir wissen Ihre Aufmerksamkeit für diese Angelegenheit sehr zu schätzen. Danke schön.`,
        label: {
          title: "Schichtzeit bearbeiten",
          timingTypeLabel: "Zeittyp",
          checkInLabel: "einchecken",
          checkOutLabel: "Kasse",
          workingHoursLabel: "Vertikale Zeit",
          branchLabel: "Geäst",
          employeesLabel: "Mitarbeiter",
          shiftTyperadio: [
            {
              id: "day",
              title: "Tagschicht (D)",
            },
            {
              id: "day/night",
              title: "Tag-/Nachtschicht (N)",
            },
          ],
          timingTyperadio: [
            {
              id: "Flexible",
              title: "Flexibles Timing",
            },
            {
              id: "Fixed",
              title: "Festes Timing",
            },
          ],
          workdaysList: [
            {
              id: "0",
              title: "Sonntag",
            },
            {
              id: "1",
              title: "Montag",
            },
            {
              id: "2",
              title: "Dienstag",
            },
            {
              id: "3",
              title: "Mittwoch",
            },
            {
              id: "4",
              title: "Donnerstag",
            },
            {
              id: "5",
              title: "Freitag",
            },
            {
              id: "6",
              title: "Samstag",
            },
          ],
        },
      }),
    },
    "addGeo-fencing-emplyer": {
      message: () =>
        `Wenn Sie die Geo-Fencing-Funktionalität integrieren möchten, wählen Sie bitte unten die Option „Ja“.`,
      buttons: [
        { id: "yes-geofencing", title: "Ja" },
        { id: "no-geofencing", title: "NoNEIN" },
      ],
    },
    "yes-employer": {
      message: () => `Bitte teilen Sie uns den aktuellen Standort Ihres Büros mit `,
    },
    "office-geo-fencing": {
      message: () => `Vielen Dank für die Angabe des aktuellen Standorts Ihres Büros`,
    },
    "reminder-in": {
      message: () =>
        `Dies ist eine freundliche Erinnerung, den Check-in in den nächsten 5 Minuten zu markieren`,
    },
    "reminder-out": {
      message: () =>
        `Dies ist eine freundliche Erinnerung, den Check-Out in den nächsten 5 Minuten zu markieren`,
    },
    "business-settings": {
      message: () => ({
        body: `Bitte aktualisieren Sie Ihre Unternehmensinformationen, indem Sie auf die Schaltfläche unten klicken. Danke schön!`,

        label: {
          title: "Bearbeiten Sie die Unternehmenseinstellungen",
          employerNamelabel: "Mitarbeitername",
          employernolabel: "Mitarbeiternummer",
          bufferTimelabel: "Pufferzeit",
          companyNamelabel: "Name der Firma",
          monthlySickLeavelabel: "Monatlicher Krankheitsurlaub",
          casualLeavelabel: "Freizeiturlaub",
          annualLeavelabel: "Jahresurlaub",
          maternityLeaveAllowedlabel: "Mutterschaftsurlaub",
          paternityLeaveAllowedlabel: "Vaterschaftsurlaub",
          unpaidLeavePolicylabel: "Unbezahlter Urlaub",
          leaveEncashmentlabel: "Einlösung hinterlassen",
          consequencesUnapprovedLeavelabel: "Hinterlassen Sie Konsequenzen",
          halfDayPolicylabel: "Halber Tag",
          Languagelabel: "Sprache",
          carryForwardLimitlabel: "Vortragen",
        },
      }),
    },
    link_employee: {
      message: () => ({
        body: `Fügen Sie dem Ort einen neuen Ort und neue Mitarbeiter hinzu`,
        label: {
          title: "Geo-Zäune",
          heading: "Koordinaten platzieren",
          rangelabel: "Reichweite",
          rangeheadinglabel: "Die Reichweite muss 50 Meter und mehr betragen",
          employeelabel: "Ort mit Mitarbeiter verknüpfen:",
          branchnamelabel: "Ortsname",
        },
      }),
    },
    addBranch: {
      message: () => ({
        body: `Fügen Sie einen Ort hinzu, indem Sie auf die Schaltfläche „Ort hinzufügen“ klicken.`,
        label: {
          title: "Geo Fencing",
          heading: " Koordinaten platzieren",
          rangelabel: "Reichweite",
          rangeheadinglabel: "Die Reichweite muss 200 Meter und mehr betragen",
          branchnamelabel: "Ortsname",
        },
      }),
    },
    dateRangeReport: {
      message: () => ({
        body: `Wir haben für Sie einen umfassenden Datumsbereichsbericht erstellt. Bitte geben Sie Ihren bevorzugten Zeitraum an und wir stellen Ihnen umgehend die Erkenntnisse und Analysen zur Verfügung.`,
        label: {
          title: "Datumsbereichsbericht",
          startdatelabel: "Startdatum",
          enddatelabel: "Endtermin",
        },
      }),
    },
    attendanceManagement: {
      message: () => ({
        body: `Willkommen beim AutoWhat Anwesenheitsmanagement-Chatbot.`,
        label: {
          label1: "Berichte und Genehmigungen",
          label2: "Berichte",
          label3: "Team",
          label7: "Orte bearbeiten",
          label9: "Orte löschen",
          label10: "Bearbeiten Sie den Schichtzeitpunkt",
          label11: "Mitarbeiter löschen",
          labeldelete: "Optionen löschen",
          labeledit: "Optionen bearbeiten",
          labelbusiness: "Geschäftseinstellungen",
          labelBussinessRadio: "Bearbeiten Sie die Unternehmenseinstellungen",
          reportsdd: [
            {
              id: "yesterdayreport",
              title: "Bericht von gestern",
            },
            {
              id: "currentmonth",
              title: "Aktueller Monat",
            },
            {
              id: "customdaterangepdf",
              title: "Benutzerdefinierter Datumsbericht (PDF)",
            },
            {
              id: "allEmployees",
              title: "Bericht aller Mitarbeiter",
            },
          ],
          quick: [
            {
              id: "livereport",
              title: "Live-Bericht",
            },
            {
              id: "leaveApprovals",
              title: "Genehmigungen hinterlassen",
            },
            {
              id: "attendanceCorrections",
              title: "Anwesenheitskorrektur",
            },
            {
              id: "supportTickets",
              title: "Support-Tickets",
            },
            {
              id: "taskApprovals",
              title: "Aufgabengenehmigung",
            },
            {
              id: "broadcast",
              title: "Übertragen",
            },
          ],
          labelBussinessList: [
            {
              id: "editBusiness",
              title: "Bearbeiten Sie die Unternehmenseinstellungen",
            },
          ],
        },
      }),
    },
    contacts: {
      message: () => `Entschuldigung! Sie können keine Kontakte hochladen.`,
    },
    contactsUpdate: {
      message: () => `Die Mitarbeiterdaten wurden erfolgreich aktualisiert.`,
    },
    placeCreated: {
      message: () => `Neuer Ort und Geo-Fencing wurden erfolgreich erstellt`,
    },
    employeeGeoFencing: {
      message: () => `Das Mitarbeiter-Geofencing wurde erfolgreich aktualisiert.`,
    },
    employeeRemove: {
      message: () => `Der Mitarbeiter wurde aus der Organisation entfernt.`,
    },
    employeeRemovePlace: {
      message: () => `Mitarbeiter wurden vom Standort entfernt`,
    },
    placeDeleted: {
      message: () => `Der Ort wurde erfolgreich gelöscht.`,
    },
    broadcast: {
      message: () => ({
        body: `Übertragen Sie Ihre Botschaft an alle Ihre Mitarbeiter`,
        label: {
          broadcastLabel: "Broadcast-Nachricht",
          filesLabel: "Dateien",
          employeesLabel: "Mitarbeiter",
          fileRadios: [
            {
              id: "document",
              title: "Dokumentieren",
            },
            {
              id: "image",
              title: "Bild",
            },
            {
              id: "video",
              title: "Video",
            },
          ],
        },
      }),
    },
    leaveApprovalsFlow: {
      //TODO: implement
    },
    attendanceCorrectionFlow: {
      //TODO: implement
    },
  },
  Spanish: {
    hi: {
      message: (name) =>
        `Hola ${name}\n Soy su amigable robot de asistencia y estoy aquí para ayudarlo.`,
      buttons: (userData) => [
        {
          id: "MarkAttendance",
          title: "Marcar asistencia",
        },
        // {
        //   id: "Report",
        //   title: "Report",
        // },
        {
          id: `empFl@${userData}`,
          // id: "employeeFlow",
          title: "Otro",
        },
      ],
    },
    MarkAttendance: {
      message: () =>
        "*Marcar asistencia*\n\n- Para marcar el inicio de su jornada laboral, haga clic en [IN].\n- Para marcar el final de su jornada laboral, haga clic en [OUT].",
      buttons: [
        { id: "in", title: "🟢 IN" },
        { id: "out", title: "🔴 OUT" },
      ],
    },
    in: {
      message: () =>
        "*Ubicación* \n📍 Comparte tu ubicación actual siguiendo estos pasos:\n1. 📩 Selecciona este mensaje.\n2. 💬 Haz clic en 'Responder'.\n3. 📎 Toca el icono de archivo adjunto o clip.\n4. 📍Selecciona 'Ubicación'.\n5. ✅ Elige 'Enviar tu ubicación actual'.",
    },
    out: {
      message: () =>
        "*Ubicación* \n📍 Comparte tu ubicación actual siguiendo estos pasos:\n1. 📩 Selecciona este mensaje.\n2. 💬 Haz clic en 'Responder'.\n3. 📎 Toca el icono de archivo adjunto o clip.\n4. 📍Selecciona 'Ubicación'.\n5. ✅ Elige 'Enviar tu ubicación actual'.",
    },
    attendanceLocation: {
      message: () =>
        "📸 Para asistir, envíe una selfie con el fondo que muestre su ubicación dentro del área de geocerca.",
    },
    clickAttendanceLocation: {
      message: () =>
        "*⚠️ No envíes directamente*. Primero, asegúrate de *responder* y luego elige 'Enviar tu ubicación actual'.\n📍 Comparte tu ubicación actual siguiendo estos pasos:\n1. 📩 Selecciona este mensaje. n2. 💬 Haga clic en 'Responder'.\n3. 📎 Toque el icono del archivo adjunto o clip.\n4. 📍 Seleccione 'Ubicación'.",
    },
    locNotInRange: {
      message: () =>
        `🚫 We're sorry, but we couldn't register your location 📍 and attendance ⏲️ at this time. You are not within the company's range 🚷. Please move within the company's range and then retry from the start 🔁.👣`,
    },
    attendancePic: {
      message: () => "📸 Por favor envía una foto selfie tuya 🤳.",
    },
    uploadEmployee: {
      message: () => "Por favor cargue todos los contactos de sus empleados.",
    },
    oneDay: {
      message: () => ({
        body: "Por favor especifique la fecha y el motivo haciendo clic en el botón de abajo",
        label: {
          title: "Solicitar permiso",
          startdatelabel: "Fecha de inicio",
          reasonlabel: "Razón para irse",
        },
      }),
    },
    moreThanOneDay: {
      message: () => ({
        body: "Por favor especifique la fecha y el motivo haciendo clic en el botón de abajo",
        label: {
          title: "Solicitar permiso",
          startdatelabel: "Fecha de inicio",
          enddatelabel: "Fecha final",
          requestlabel: "Solicitud de licencia",
          reasonlabel: "Razón para irse",
        },
      }),
    },
    leaveSummary: {
      message: (
        employeeName,
        department,
        leaveType,
        startDate,
        endDate,
        reasonForLeave,
        ticketNumber,
        recipientPhone
      ) =>
        `Nombre: *${employeeName}*\nDepartamento: *${
          department ?? "-"
        }* \nPara: *Solicitar permiso*\nTipo de permiso: *${leaveType}*\nFecha de inicio: *${startDate}*\n${
          endDate !== "Fecha invalida" ? `Fecha final: *${endDate}*\n` : ""
        }Razón: *${reasonForLeave}*\nNúmero : *${recipientPhone}* \nBoleto No. : *${ticketNumber}*`,
    },
    support: {
      message: () =>
        "¡Bienvenido! Estamos aquí para ayudarle. Seleccione los problemas que enfrenta:",
      buttons: [
        {
          title: `🔎Asuntos`,
          headers: `🔎 Asuntos`,
          rows: [
            {
              id: "check-in",
              title: "Registrarse",
              description: "Problema de registro",
            },
            {
              id: "check-out",
              title: "Verificar",
              description: "Verificar problema",
            },
            {
              id: "salary-issue",
              title: "Problema salarial",
              description: "Problema salarial",
            },
            {
              id: "other-issue",
              title: "OTRO❓",
              description: "Otro tema",
            },
          ],
        },
      ],
    },
    checkIn: {
      message: () => "Por favor escriba su comentario.",
    },
    checkOut: {
      message: () => "Por favor escriba su comentario.",
    },
    other_issue: {
      message: () => "Por favor escriba su comentario.",
    },
    Salary_Issue: {
      message: () => "Por favor escriba su comentario.",
    },
    employeeIssue: {
      message: () => "Por favor escriba su comentario.",
    },
    registerComplain: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `Nombre: *${name}*\nDepartamento:*${
          department ?? "-"
        }*\nPara: *Soporte*\nproblema: *${problem}*\nObservación. : *${message}*\número: *${recipientPhone}*\nBoleto no. : *${ticketNumber}*`,
    },
    sendIssue: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `*Informe de problemas del empleado*\nEstimado empleador, hay un problema informado por un empleado:\nNombre del empleado:${name}\nNúmero : *${recipientPhone}*\nAsunto : *${problem}*\ndescripcion del problema: *${message}*\nBoleto no. : *${ticketNumber}*\nTome las medidas adecuadas para abordar esta inquietud.`,
      buttons: (employeeNumber, ticketNumber) => [
        { title: "Aprobar", id: `issue_approve-${employeeNumber}-${ticketNumber}` },
        { title: "Rechazar", id: `issue_reject-${employeeNumber}-${ticketNumber}` },
        { title: "Sostener", id: `issue_hold-${employeeNumber}-${ticketNumber}` },
      ],
    },
    sendLeave: {
      message: (employeeName, leaveType, startDate, endDate, reason) =>
        `*Notificación de solicitud de salida* \n👤 Nombre del empleado: ${employeeName}\nTipo de licencia: ${leaveType}\nFecha de inicio: *${startDate}*\n${
          endDate != "Fecha invalida" ? `Fecha final: *${endDate}*\n` : ""
        }Razón: ${reason}\nRevise y tome las medidas necesarias.`,
      buttons: (employeePhone, ticketNumber) => [
        {
          id: `request_approve-${employeePhone}-${ticketNumber}`,
          title: "Aprobar",
        },
        {
          id: `request_reject-${employeePhone}-${ticketNumber}`,
          title: "Rechazar",
        },
        {
          id: `request_hold-${employeePhone}-${ticketNumber}`,
          title: "Sostener",
        },
      ],
    },
    approvals: {
      buttons: [
        { title: "Dejar-aprobar", id: "leaveApprove" },
        { title: "Problemas activos", id: "activeIssues" },
      ],
      message: () =>
        `Hola, selecciona una de las siguientes opciones:\n 1️⃣ Para aprobar permisos.\n 2️⃣ Para ver los problemas activos en espera de tu aprobación.\n¡Simplemente haz clic en el botón correspondiente para continuar!`,
    },
    leaveApprove: {
      message: () =>
        `*Se informó la licencia del empleado*\nEstimado empleador, hay una solicitud de licencia por parte de un empleado\n *N.º de ticket: RL4545* \n *Nombre*: Ram \n *Fechas*: 23/12/2023 \n *Razón* : Boda \n *Tipo* : Solicitar permiso`,
      buttons: [
        { title: "Aprobar", id: "request_approve" },
        { title: "Rechazar", id: "request_reject" },
        { title: "Sostener", id: "request_hold" },
      ],
    },
    activeIssues: {
      message: () =>
        `*Informe de problemas del empleado*\nEstimado empleador, hay un problema reportado por un empleado:\n *Nombre del empleado*: Falso \n *Problema*: Salario \n *Descripción del problema*: Salario menos acreditado\nTome las medidas apropiadas para abordar esta preocupación.`,
      buttons: [
        { title: "Aprobar", id: "issue_approve" },
        { title: "Rechazar", id: "issue_reject" },
        { title: "Sostener", id: "issue_hold" },
      ],
    },
    issue_approve: {
      message: () =>
        "Actualización de estado: Aprobado\n¡Nos complace informarle que su solicitud/solicitud ha sido aprobada!\nGracias por su paciencia y cooperación",
    },
    issue_reject: {
      message: () =>
        "Actualización de estado: Rechazada \nLamentamos informarle que su solicitud/solicitud ha sido rechazada.\nAgradecemos su comprensión.",
    },
    issue_hold: {
      message: () =>
        "Actualización de estado: En espera \nSu solicitud/solicitud está actualmente en espera mientras revisamos y evaluamos la situación.\nAgradecemos su paciencia durante este tiempo.",
    },
    request_approve: {
      message: () =>
        `*Actualización de solicitud de licencia*: Aprobada\n¡Nos complace informarle que su solicitud de licencia ha sido aprobada!\nGracias por su paciencia y cooperación.`,
    },
    request_reject: {
      message: () =>
        `*Actualización de solicitud de licencia*: Rechazada \nLamentamos informarle que su solicitud de licencia ha sido rechazada.\nAgradecemos su comprensión.`,
    },
    request_hold: {
      message: () =>
        `*Actualización de solicitud de licencia*: En espera \nSu solicitud de licencia está actualmente en espera mientras revisamos y evaluamos la situación.\nAgradecemos su paciencia durante este tiempo.`,
    },
    "remove-branch": {
      message: () => ({
        body: `Haga clic en el botón a continuación para iniciar la eliminación del empleado del Lugar.`,
        label: {
          title: "Eliminar empleados del lugar",
          branchLabel: "Lugares",
          employeesLabel: "Empleados",
          companylabel: "nombre de empresa",
        },
      }),
    },
    edit_geolocation: {
      message: () => ({
        body: `Edite las cercas geográficas de los empleados haciendo clic en el botón a continuación`,
        label: {
          title: "Editar geolocalización",
          workingHoursLabel: "tiempo de campo",
          branchLabel: "Empleado",
          timingTypeLabel: "tipo de tiempo",
          placelabel: "lugar",
        },
      }),
    },
    "edit-timings": {
      message: () => ({
        body: `UbicaciónAdministre y personalice los horarios de los empleados accediendo al botón a continuación para editar los horarios de los turnos. Se agradece mucho su atención a este asunto. Gracias`,
        label: {
          title: "Editar tiempo de turno",
          timingTypeLabel: "tipo de tiempo",
          checkInLabel: "registrarse",
          checkOutLabel: "verificar",
          workingHoursLabel: "tiempo de campo",
          branchLabel: "sucursales",
          employeesLabel: "Empleado",
          shiftTyperadio: [
            {
              id: "day",
              title: "Turno de dia (D)",
            },
            {
              id: "day/night",
              title: "Turno Día/Noche (N)",
            },
          ],
          timingTyperadio: [
            {
              id: "Flexible",
              title: "Horarios flexibles",
            },
            {
              id: "Fixed",
              title: "Tiempo fijo",
            },
          ],
          workdaysList: [
            {
              id: "0",
              title: "Domingo",
            },
            {
              id: "1",
              title: "Lunes",
            },
            {
              id: "2",
              title: "Martes",
            },
            {
              id: "3",
              title: "Miércoles",
            },
            {
              id: "4",
              title: "Jueves",
            },
            {
              id: "5",
              title: "Viernes",
            },
            {
              id: "6",
              title: "Sábado",
            },
          ],
        },
      }),
    },
    "addGeo-fencing-emplyer": {
      message: () =>
        `Si desea incorporar la funcionalidad de geocercado, seleccione la opción "Sí" a continuación.`,
      buttons: [
        { id: "yes-geofencing", title: "Sí" },
        { id: "no-geofencing", title: "No" },
      ],
    },
    "yes-employer": {
      message: () => `Por favor comparta la ubicación actual de su oficina.`,
    },
    "office-geo-fencing": {
      message: () => `Gracias por proporcionar la ubicación actual de su oficina.`,
    },
    "reminder-in": {
      message: () =>
        `Este es un recordatorio amistoso para marcar el check-in en los próximos 5 minutos.`,
    },
    "reminder-out": {
      message: () =>
        `Este es un recordatorio amistoso para marcar la salida en los próximos 5 minutos.`,
    },
    "business-settings": {
      message: () => ({
        body: `Actualice la información de su empresa haciendo clic en el botón a continuación. ¡Gracias!`,

        label: {
          title: "Editar configuración empresarial",
          employerNamelabel: "Nombre de empleado",
          employernolabel: "Número de empleado",
          bufferTimelabel: "Tiempo de amortiguamiento",
          companyNamelabel: "nombre de empresa",
          monthlySickLeavelabel: "Licencia por enfermedad mensual",
          casualLeavelabel: "Licencia ocasional",
          annualLeavelabel: "Vacaciones anuales",
          maternityLeaveAllowedlabel: "Licencia de maternidad",
          paternityLeaveAllowedlabel: "El permiso de paternidad",
          unpaidLeavePolicylabel: "Licencia no remunerada",
          leaveEncashmentlabel: "Dejar cobro",
          consequencesUnapprovedLeavelabel: "Dejar consecuencias",
          halfDayPolicylabel: "Medio día",
          Languagelabel: "Idioma",
          carryForwardLimitlabel: "Llevar adelante",
        },
      }),
    },
    link_employee: {
      message: () => ({
        body: `Agregar nuevo lugar y empleados al lugar`,
        label: {
          title: "Cercado geográfico",
          heading: "Colocar coordenadas",
          rangelabel: "Rango",
          rangeheadinglabel: "El alcance debe ser de 50 metros o más.",
          employeelabel: "Vincular lugar al empleado:",
          branchnamelabel: "Ponga su nombre",
        },
      }),
    },
    addBranch: {
      message: () => ({
        body: `Agregue un lugar haciendo clic en el botón "Agregar un lugar".`,
        label: {
          title: "Cercado geográfico",
          heading: "Colocar coordenadas",
          rangelabel: "Rango",
          rangeheadinglabel: "El alcance debe ser de 200 metros o más.",
          branchnamelabel: "Ponga su nombre",
        },
      }),
    },
    dateRangeReport: {
      message: () => ({
        body: `Hemos preparado un informe completo de rango de fechas para su revisión. Especifique su intervalo de fechas preferido y le proporcionaremos información y análisis de inmediato.`,
        label: {
          title: "Informe de rango de fechas",
          startdatelabel: "Fecha de inicio",
          enddatelabel: "Fecha final",
        },
      }),
    },
    attendanceManagement: {
      message: () => ({
        body: `Bienvenido al chatbot de gestión de asistencia de AutoWhat.`,
        label: {
          label1: "Informes y aprobaciones",
          label2: "Informes",
          label3: "Equipo",
          label7: "Editar lugares",
          label9: "Eliminar lugares",
          label10: "Editar tiempo de turno",
          label11: "Eliminar empleado",
          labeldelete: "Opciones de eliminación",
          labeledit: "Editar opciones",
          labelbusiness: "Configuración empresarial",
          labelBussinessRadio: "Editar configuración empresarial",
          reportsdd: [
            {
              id: "yesterdayreport",
              title: "Informe de ayer",
            },
            {
              id: "currentmonth",
              title: "Mes actual",
            },
            {
              id: "customdaterangepdf",
              title: "Informe de fecha personalizado (PDF)",
            },
            {
              id: "allEmployees",
              title: "Informe de todos los empleados",
            },
          ],
          quick: [
            {
              id: "livereport",
              title: "Informe en vivo",
            },
            {
              id: "leaveApprovals",
              title: "Dejar aprobaciones",
            },
            {
              id: "attendanceCorrections",
              title: "Corrección de asistencia",
            },
            {
              id: "supportTickets",
              title: "Boletos de soporte",
            },
            {
              id: "taskApprovals",
              title: "Aprobación de tarea",
            },
            {
              id: "broadcast",
              title: "Transmisión",
            },
          ],
          labelBussinessList: [
            {
              id: "editBusiness",
              title: "Editar configuración empresarial",
            },
          ],
        },
      }),
    },
    contacts: {
      message: () => `¡Lo siento! No puedes cargar contactos.`,
    },
    contactsUpdate: {
      message: () => `Los datos del empleado se han actualizado correctamente.`,
    },
    placeCreated: {
      message: () => `Se han creado con éxito un nuevo lugar y una geovalla`,
    },
    employeeGeoFencing: {
      message: () => `La geocerca de los empleados se ha actualizado con éxito.`,
    },
    employeeRemove: {
      message: () => `El empleado ha sido eliminado de la organización.`,
    },
    employeeRemovePlace: {
      message: () => `Los empleados han sido retirados del lugar.`,
    },
    placeDeleted: {
      message: () => `El lugar se ha eliminado correctamente.`,
    },
    broadcast: {
      message: () => ({
        body: `Transmite tu mensaje a todos tus empleados`,
        label: {
          broadcastLabel: "Mensaje de difusión",
          filesLabel: "Archivos",
          employeesLabel: "Empleados",
          fileRadios: [
            {
              id: "document",
              title: "Documento",
            },
            {
              id: "image",
              title: "Imagen",
            },
            {
              id: "video",
              title: "Video",
            },
          ],
        },
      }),
    },
    leaveApprovalsFlow: {
      //TODO: implement
    },
    attendanceCorrectionFlow: {
      //TODO: implement
    },
  },
  Urdu: {
    hi: {
      message: (name) =>
        `سلام ${name}\n میں آپکا دوستانہ حاضری بوٹ ہوں، آپکی مدد کرنے کے لئے یہاں ہوں۔`,
      buttons: (userData) => [
        {
          id: "MarkAttendance",
          title: "حاضری درج کریں",
        },
        // {
        //   id: "Report",
        //   title: "Report",
        // },
        {
          id: `empFl@${userData}`,
          // id: "employeeFlow",
          title: "دیگر",
        },
      ],
    },

    MarkAttendance: {
      message: () =>
        "*حاضری درج کریں*\n\n- اپنے کام کی شروعات کے لیے [IN] پر کلک کریں۔\n- کام کے انتہا کے لیے [OUT] پر کلک کریں۔",
      buttons: [
        { id: "in", title: "🟢 حاضر" },
        { id: "out", title: "🔴 خارج" },
      ],
    },

    in: {
      message: () =>
        "*لوکیشن* \n📍 براہ کرم اپنا موجودہ مقام شیئر کرنے کے لئے یہ کچھ چاروں کدموں کو فالو کریں:\n1. 📩 یہ پیغام منتخب کریں۔\n2. 💬 'ریپلائ' پر کلک کریں۔\n3. 📎 ایٹیچمنٹ یا کلپ آئیکن ٹیپ کریں۔\n4. 📍 'لوکیشن' منتخب کریں۔\n5. ✅ 'اپنا موجودہ مقام بھیجیں' پر کلک کریں۔",
    },
    out: {
      message: () =>
        "*لوکیشن* \n📍 براہ کرم اپنا موجودہ مقام شیئر کرنے کے لئے یہ کچھ چاروں کدموں کو فالو کریں:\n1. 📩 یہ پیغام منتخب کریں۔\n2. 💬 'ریپلائ' پر کلک کریں۔\n3. 📎 ایٹیچمنٹ یا کلپ آئیکن ٹیپ کریں۔\n4. 📍 'لوکیشن' منتخب کریں۔\n5. ✅ 'اپنا موجودہ مقام بھیجیں' پر کلک کریں۔",
    },
    attendanceLocation: {
      message: () =>
        "📸 حاضری کے لئے، براہ کرم ایک سیلفی بھیجیں جس میں آپکا مقام جیوفینسنگ ایریا کے اندر دکھایا گیا ہو۔",
    },
    clickAttendanceLocation: {
      message: () =>
        "*⚠️ سیدھے نہ بھیجیں*۔ پہلے یہ سنجیدگی سے لیں کہ آپ *جواب دے رہے ہیں*، پھر 'اپنا موجودہ مقام بھیجیں' چنیں۔\n📍 براہ کرم اپنا موجودہ مقام شیئر کرنے کے لئے یہ کچھ چاروں کدموں کو فالو کریں:\n1. 📩 یہ پیغام منتخب کریں۔\n2. 💬 'ریپلائ' پر کلک کریں۔\n3. 📎 ایٹیچمنٹ یا کلپ آئیکن ٹیپ کریں۔\n4. 📍 'لوکیشن' منتخب کریں۔",
    },
    locNotInRange: {
      message: () =>
        `🚫 معاف کریں، لیکن ہم آپکے مقام 📍 اور حاضری ⏲️ کو اس وقت رجسٹر نہیں کر سکتے۔ آپ کمپنی کی حدوں میں 🚷 نہیں ہیں۔ براہ کرم کمپنی کی حدوں میں چلا جائیں اور پھر دوبارہ شروع سے کوشش کریں 🔁.👣`,
    },
    attendancePic: {
      message: () => "📸 براہ کرم اپنی ایک سیلفی تصویر بھیجیں 🤳۔",
    },
    uploadEmployee: {
      message: () => "براہ کرم اپنے تمام ملازمین کے رابطے اپ لوڈ کریں۔",
    },
    oneDay: {
      message: () => ({
        body: "براہ کرم تاریخ اور چھٹی کا باعث مخصوص کریں نیچے دیے گئے بٹن پر کلک کرکے",
        label: {
          title: "چھٹی کی درخواست",
          startdatelabel: "شروع ہونے کی تاریخ",
          reasonlabel: "چھٹی کا باعث",
        },
      }),
    },
    moreThanOneDay: {
      message: () => ({
        body: "براہ کرم تاریخ اور چھٹی کا باعث مخصوص کریں نیچے دیے گئے بٹن پر کلک کرکے",
        label: {
          title: "چھٹی کی درخواست",
          startdatelabel: "شروع ہونے کی تاریخ",
          enddatelabel: "ختم ہونے کی تاریخ",
          requestlabel: "چھٹی کا درخواست",
          reasonlabel: "چھٹی کا باعث",
        },
      }),
    },
    leaveSummary: {
      message: (
        employeeName,
        department,
        leaveType,
        startDate,
        endDate,
        reasonForLeave,
        ticketNumber,
        recipientPhone
      ) =>
        `نام: *${employeeName}*\n ڈیپارٹمنٹ: *${
          department ?? "-"
        }* \nکے لئے: *چھٹی کی درخواست*\n چھٹی کی قسم: *${leaveType}*\nشروع ہونے کی تاریخ: *${startDate}*\n${
          endDate !== "Invalid Date" ? `ختم ہونے کی تاریخ: *${endDate}*\n` : ""
        }باعث: *${reasonForLeave}*\n نمبر : *${recipientPhone}* \nٹکٹ نمبر: *${ticketNumber}*`,
    },
    support: {
      message: () =>
        "خوش آمدید! ہم آپکی مدد کرنے کے لئے یہاں ہیں۔ براہ کرما چنیں کہ آپ کس مسئلے کا سامنا کر رہے ہیں:",
      buttons: [
        {
          title: "🔎 مسائل",
          headers: "🔎 مسائل",
          rows: [
            {
              id: "check-in",
              title: "چیک ان",
              description: "چیک ان مسئلہ",
            },
            {
              id: "check-out",
              title: "چیک آؤٹ",
              description: "چیک آؤٹ مسئلہ",
            },
            {
              id: "salary-issue",
              title: "تنخواہ مسئلہ",
              description: "تنخواہ مسئلہ",
            },
            {
              id: "other-issue",
              title: "دیگر ❓",
              description: "دیگر مسئلہ",
            },
          ],
        },
      ],
    },
    checkIn: {
      message: () => "براہ کرما اپنا ریمارک ٹائپ کریں۔",
    },
    checkOut: {
      message: () => "براہ کرما اپنا ریمارک ٹائپ کریں۔",
    },
    other_issue: {
      message: () => "براہ کرما اپنا ریمارک ٹائپ کریں۔",
    },
    Salary_Issue: {
      message: () => "براہ کرما اپنا ریمارک ٹائپ کریں۔",
    },
    employeeIssue: {
      message: () => "براہ کرما اپنا ریمارک ٹائپ کریں۔",
    },
    registerComplain: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `نام: *${name}*\nڈیپارٹمنٹ: *${
          department ?? "-"
        }*\nکے لئے: *سہارا*\nمسئلہ: *${problem}*\nتنبیہ: *${message}*\nنمبر: *${recipientPhone}*\nٹکٹ نمبر: *${ticketNumber}*`,
    },
    sendIssue: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `*ملازم مسئلہ رپورٹ*\nعزیز ملازم، ایک مسئلہ رپورٹ ہوا ہے:\nملازم کا نام: ${name}\nنمبر: *${recipientPhone}*\nمسئلہ: *${problem}*\nمسئلہ کی تفصیلات: *${message}*\nٹکٹ نمبر: *${ticketNumber}*\nبراہ کرما اس معاملے کا حل کرنے کے لئے مناسب اقدامات اٹھائیں۔`,
      buttons: (employeeNumber, ticketNumber) => [
        { title: "منظور کریں", id: `issue_approve-${employeeNumber}-${ticketNumber}` },
        { title: "رد کریں", id: `issue_reject-${employeeNumber}-${ticketNumber}` },
        { title: "روکیں", id: `issue_hold-${employeeNumber}-${ticketNumber}` },
      ],
    },
    sendLeave: {
      message: (employeeName, leaveType, startDate, endDate, reason) =>
        `*چھٹی کی درخواست کا نوٹیفکیشن* \n👤 ملازم کا نام: ${employeeName}\nچھٹی کی قسم: ${leaveType}\nشروع ہونے کی تاریخ: *${startDate}*\n${
          endDate !== "Invalid Date" ? `انتہائی تاریخ: *${endDate}*\n` : ""
        }\nوجہ: ${reason}\nبراہ کرما جائزہ لیں اور ضروری کارروائی کریں۔`,
      buttons: (employeePhone, ticketNumber) => [
        {
          id: `request_approve-${employeePhone}-${ticketNumber}`,
          title: "منظور کریں",
        },
        {
          id: `request_reject-${employeePhone}-${ticketNumber}`,
          title: "رد کریں",
        },
        {
          id: `request_hold-${employeePhone}-${ticketNumber}`,
          title: "روکیں",
        },
      ],
    },
    approvals: {
      buttons: [
        { title: "چھٹی-منظور", id: "leaveApprove" },
        { title: "فعال مسائل", id: "activeIssues" },
      ],
      message: () =>
        `ہیلو، براہ کرما مندرجہ ذیل میں سے ایک اختیار کریں:\n 1️⃣ چھٹیوں کو منظور کرنے کے لئے۔\n 2️⃣ آپکی منظوری کا انتظار کرنے والے فعال مسائل دیکھنے کے لئے۔\nبراہ کرما جاری کرنے کے لئے متعلقہ بٹن پر کلک کریں!`,
    },
    leaveApprove: {
      message: () =>
        `*ملازم چھٹی کی رپورٹ*\nعزیز کارفرما، ایک ملازم نے چھٹی کی درخواست دی ہے\n *ٹکٹ نمبر: RL4545* \n *نام*: رام \n *تاریخیں*: 23/12/2023 \n *وجہ* : شادی \n *قسم* : چھٹی کی درخواست`,
      buttons: [
        { title: "منظور کریں", id: "request_approve" },
        { title: "رد کریں", id: "request_reject" },
        { title: "روکیں", id: "request_hold" },
      ],
    },
    activeIssues: {
      message: () =>
        `*ملازم مسئلہ رپورٹ*\nعزیز کارفرما، ایک ملازم نے ایک مسئلہ رپورٹ کیا ہے:\n *ملازم کا نام* : شام \n *مسئلہ* : تنخواہ \n *مسئلہ کا تفصیل* : تنخواہ کم ہو گئی ہے\nبراہ کرما اس مسئلہ کو حل کرنے کے لئے مناسب کارروائی کریں۔`,
      buttons: [
        { title: "منظور کریں", id: "issue_approve" },
        { title: "رد کریں", id: "issue_reject" },
        { title: "روکیں", id: "issue_hold" },
      ],
    },
    issue_approve: {
      message: () =>
        "حالت کا اپ ڈیٹ: منظور\nہم آپ کو خوش آمدید کہتے ہیں کہ آپکی درخواست/اہلکار کو منظوری حاصل ہو گئی ہے!\nآپکی صبر اور تعاون کا شکریہ",
    },
    issue_reject: {
      message: () =>
        "حالت کا اپ ڈیٹ: رد \nہم آپ کو مطلع کرنے کا افسوس ہے کہ آپکی درخواست/اہلکار کو رد کر دیا گیا ہے۔\nہم آپکی سمجھ کا قدر کرتے ہیں۔",
    },
    issue_hold: {
      message: () =>
        "حالت کا اپ ڈیٹ: روکے ہوئے \nآپکی درخواست/اہلکار یہ وقت میں جائزہ لیا جا رہا ہے۔\nہم آپکی صبر کا قدر کرتے ہیں۔",
    },
    request_approve: {
      message: () =>
        `*چھٹی کی درخواست کا اپ ڈیٹ*: منظور\nہم آپ کو خوش آمدید کہتے ہیں کہ آپکی چھٹی کی درخواست منظور ہو گئی ہے!\nآپکی صبر اور تعاون کا شکریہ۔`,
    },
    request_reject: {
      message: () =>
        `*چھٹی کی درخواست کا اپ ڈیٹ*: رد \nہم آپ کو مطلع کرنے کا افسوس ہے کہ آپکی چھٹی کی درخواست رد کر دی گئی ہے۔\nہم آپکی سمجھ کا قدر کرتے ہیں۔`,
    },
    request_hold: {
      message: () =>
        `*چھٹی کی درخواست کا اپ ڈیٹ*: روکے ہوئے \nآپکی چھٹی کی درخواست یہ وقت میں جائزہ لی گئی ہے۔\nہم آپکی صبر کا قدر کرتے ہیں۔`,
    },

    "remove-branch": {
      message: () => ({
        body: `براہ کرما ملازم کو جگہ سے ہٹانے کے لئے نیچے دیے گئے بٹن پر کلک کریں۔`,
        label: {
          title: "جگہ سے ملازم ہٹائیں",
          branchLabel: "جگہیں",
          employeesLabel: "ملازمین",
          companylabel: "کمپنی کا نام",
        },
      }),
    },

    edit_geolocation: {
      message: () => ({
        body: `براہ کرما ملازم کی جیو فینسنگ کو نیچے دیے گئے بٹن پر کلک کرکے ترتیب دیں`,
        label: {
          title: "جیو گرافیکل مقام میں ترتیبات",
          workingHoursLabel: "کام کے اوقات",
          branchLabel: "ملازمین",
          timingTypeLabel: "وقت کی قسم",
          placelabel: "مقام",
        },
      }),
    },

    "edit-timings": {
      message: () => ({
        body: `براہ کرما شفٹ ٹائمنگ کو ترتیب دینے کے لئے نیچے دیے گئے بٹن پر کلک کریں اور ملازمان کا شیڈول منظم اور موزوں کریں۔ اس معاملے میں آپکا کردار بہت محسن ہوگا۔ شکریہ۔`,
        label: {
          title: "شفٹ ٹائمنگ کو ترتیب دینا",
          timingTypeLabel: "وقت کی قسم",
          checkInLabel: "چیک ان",
          checkOutLabel: "چیک آؤٹ",
          workingHoursLabel: "کام کے اوقات",
          branchLabel: "شاخیں",
          employeesLabel: "ملازمین",
          shiftTyperadio: [
            {
              id: "day",
              title: "ڈے شفٹ (D)",
            },
            {
              id: "day/night",
              title: "ڈے/نائٹ شفٹ (N)",
            },
          ],
          timingTyperadio: [
            {
              id: "Flexible",
              title: "مرنج وقت",
            },
            {
              id: "Fixed",
              title: "ثابت وقت",
            },
          ],
          workdaysList: [
            {
              id: "0",
              title: "اتوار",
            },
            {
              id: "1",
              title: "پیر",
            },
            {
              id: "2",
              title: "منگل",
            },
            {
              id: "3",
              title: "بدھ",
            },
            {
              id: "4",
              title: "جمعرات",
            },
            {
              id: "5",
              title: "جمعہ",
            },
            {
              id: "6",
              title: "ہفتہ",
            },
          ],
        },
      }),
    },

    "addGeo-fencing-emplyer": {
      message: () =>
        `اگر آپ جیو فینسنگ کی فعالیت شامل کرنا چاہتے ہیں، تو براہ کرما نیچے دیے گئے "ہاں" اختیار کو منتخب کریں۔`,
      buttons: [
        { id: "yes-geofencing", title: "ہاں" },
        { id: "no-geofencing", title: "نہیں" },
      ],
    },
    "yes-employer": {
      message: () => `براہ کرما اپنے دفتر کے حالیہ مقام کو شیئر کریں`,
    },
    "office-geo-fencing": {
      message: () => `آپکے دفتر کے حالیہ مقام فراہم کرنے کا شکریہ`,
    },
    "reminder-in": {
      message: () => `یہ چیک ان میں داخلے کا دوستانہ یاد دھیان ہے اگلے 5 منٹوں میں`,
    },
    "reminder-out": {
      message: () => `یہ چیک آؤٹ میں داخلے کا دوستانہ یاد دھیان ہے اگلے 5 منٹوں میں`,
    },
    "business-settings": {
      message: () => ({
        body: `براہ کرما نیچے دیے گئے بٹن پر کلک کرکے اپنی کاروبار کی معلومات کو اپ ڈیٹ کریں۔ شکریہ!`,

        label: {
          title: "کاروبار کی ترتیبات میں ترتیبات کریں",
          employerNamelabel: "ملازم کا نام",
          employernolabel: "ملازم نمبر",
          bufferTimelabel: "بفر ٹائم",
          companyNamelabel: "کمپنی کا نام",
          monthlySickLeavelabel: "ماہانہ بیماری کی چھٹی",
          casualLeavelabel: "عارضی چھٹی",
          annualLeavelabel: "سالانہ چھٹی",
          maternityLeaveAllowedlabel: "حمل کی چھٹی",
          paternityLeaveAllowedlabel: "والدت کی چھٹی",
          unpaidLeavePolicylabel: "غیر ادائیگی چھٹی",
          leaveEncashmentlabel: "چھٹی کا نقد کرنا",
          consequencesUnapprovedLeavelabel: "منظور نہ ہونے والی چھٹی کے نتائج",
          halfDayPolicylabel: "آدھا دن کا قانون",
          Languagelabel: "زبان",
          carryForwardLimitlabel: "آگے بڑھنے کی حد",
        },
      }),
    },

    link_employee: {
      message: () => ({
        body: `نئے مقام اور مقام میں ملازمین شامل کریں`,
        label: {
          title: "جیو فینسنگ",
          heading: "جگہ کی کوآرڈینیٹس",
          rangelabel: "رینج",
          rangeheadinglabel: "رینج میں 50 میٹر اور اس سے زیادہ ہونا چاہئے",
          employeelabel: "ملازم کو جگہ سے ملائیں:",
          branchnamelabel: "جگہ کا نام",
        },
      }),
    },

    addBranch: {
      message: () => ({
        body: `ہوا جگہ ڈالنے کے لئے "جگہ ڈالیں" بٹن پر کلک کریں۔`,
        label: {
          title: "جیو فینسنگ",
          heading: "جگہ کی کوآرڈینیٹس",
          rangelabel: "رینج",
          rangeheadinglabel: "رینج میں 200 میٹر اور اس سے زیادہ ہونا چاہئے",
          branchnamelabel: "جگہ کا نام",
        },
      }),
    },

    dateRangeReport: {
      message: () => ({
        body: `ہم نے آپ کی جائزہ لینے کے لئے ایک جامع تاریخ کے دائرہ کار تیار کرلیا ہے۔ براہ کرم اپنی ترجیحی تاریخ کا مخصوص کریں، اور ہم فوراً آپ کو تجوید اور تجزیے فراہم کریں گے۔`,
        label: {
          title: "تاریخ کے حدود کا رپورٹ",
          startdatelabel: "شروع ہونے کی تاریخ",
          enddatelabel: "ختم ہونے کی تاریخ",
        },
      }),
    },

    attendanceManagement: {
      message: () => ({
        body: `AutoWhat Attendance Management چیٹ بوٹ میں خوش آمدید ہے۔`,
        label: {
          label1: "رپورٹ اور منظوریاں",
          label2: "رپورٹس",
          label3: "ٹیم",
          label7: "جگاھیں میں ترتیب دیں",
          label9: "جگاہوں کو حذف کریں",
          label10: "شفٹ ٹائمنگ میں ترتیب دیں",
          label11: "ملازم حذف کریں",
          labeldelete: "حذف کرنے کے اہل خواص",
          labeledit: "ترتیبات میں ترتیب دیں",
          labelbusiness: "بزنس کی ترتیبات",
          labelBussinessRadio: "بزنس کی ترتیبات میں ترتیب دیں",
          reportsdd: [
            {
              id: "yesterdayreport",
              title: "گزشتہ رپورٹ",
            },
            {
              id: "currentmonth",
              title: "موجودہ مہینہ",
            },
            {
              id: "customdaterangepdf",
              title: "کسٹم ڈیٹ رپورٹ (PDF)",
            },
            {
              id: "allEmployees",
              title: "تمام ملازمین کی رپورٹ",
            },
          ],
          quick: [
            {
              id: "livereport",
              title: "لائیو رپورٹ",
            },
            {
              id: "leaveApprovals",
              title: "رخصتیں منظور ہوئیں",
            },
            {
              id: "attendanceCorrections",
              title: "حاضری کی ترتیبات",
            },
            {
              id: "supportTickets",
              title: "سپورٹ ٹکٹس",
            },
            {
              id: "taskApprovals",
              title: "کام کی منظوریاں",
            },
            {
              id: "broadcast",
              title: "بڑ کاسٹ",
            },
          ],
          labelBussinessList: [
            {
              id: "editBusiness",
              title: "بزنس کی ترتیبات میں ترتیب دیں",
            },
          ],
        },
      }),
    },

    contacts: {
      message: () => `معاف کریں! آپ کونٹیکٹس اپ لوڈ نہیں کرسکتے۔`,
    },
    contactsUpdate: {
      message: () => `ملازم کی تفصیلات کامیابی کے ساتھ اپ ڈیٹ ہوگئی ہیں۔`,
    },
    placeCreated: {
      message: () => `نیا مقام اور جیو فینسنگ کامیابی کے ساتھ تخلیق ہو گئے ہیں`,
    },
    employeeGeoFencing: {
      message: () => `ملازم کی جیو فینسنگ کامیابی کے ساتھ اپ ڈیٹ ہو گئی ہے۔`,
    },
    employeeRemove: {
      message: () => `ملازم کو تنظیم سے ہٹا دیا گیا ہے۔`,
    },
    employeeRemovePlace: {
      message: () => `ملازمین کو جگہ سے ہٹا دیا گیا ہے`,
    },
    placeDeleted: {
      message: () => `جگہ کامیابی کے ساتھ حذف ہو گئی ہے۔`,
    },
    broadcast: {
      message: () => ({
        body: `اپنے پیغام کو اپنے تمام ملازمین تک براڈکاسٹ کریں`,
        label: {
          broadcastLabel: "براڈکاسٹ میسج",
          filesLabel: "فائلیں",
          employeesLabel: "ملازمین",
          fileRadios: [
            {
              id: "document",
              title: "دستاویز",
            },
            {
              id: "image",
              title: "تصویر",
            },
            {
              id: "video",
              title: "ویڈیو",
            },
          ],
        },
      }),
    },
    leaveApprovalsFlow: {
      //TODO: implement
    },
    attendanceCorrectionFlow: {
      //TODO: implement
    },
  },
  French: {
    hi: {
      message: (name) =>
        `Bonjour ${name}\n Je suis votre bot amical de pointage ici pour vous aider.`,
      buttons: (userData) => [
        {
          id: "MarkAttendance",
          title: "Marquer la présence",
        },
        // {
        //   id: "Report",
        //   title: "Rapport",
        // },
        {
          id: `empFl@${userData}`,
          // id: "employeeFlow",
          title: "Autre",
        },
      ],
    },
    MarkAttendance: {
      message: () =>
        "*Marquer la présence*\n\n- Pour marquer le début de votre journée de travail, cliquez sur [IN].\n- Pour marquer la fin de votre journée de travail, cliquez sur [OUT].",
      buttons: [
        { id: "in", title: "🟢 IN" },
        { id: "out", title: "🔴 OUT" },
      ],
    },
    in: {
      message: () =>
        "*Emplacement* \n📍 Veuillez partager votre emplacement actuel en suivant ces étapes:\n1. 📩 Sélectionnez ce message.\n2. 💬 Cliquez sur 'Répondre'.\n3. 📎 Appuyez sur l'icône d'attachement ou de clip.\n4. 📍 Sélectionnez 'Emplacement'.\n5. ✅ Choisissez 'Envoyer votre emplacement actuel'.",
    },
    out: {
      message: () =>
        "*Emplacement* \n📍 Veuillez partager votre emplacement actuel en suivant ces étapes:\n1. 📩 Sélectionnez ce message.\n2. 💬 Cliquez sur 'Répondre'.\n3. 📎 Appuyez sur l'icône d'attachement ou de clip.\n4. 📍 Sélectionnez 'Emplacement'.\n5. ✅ Choisissez 'Envoyer votre emplacement actuel'.",
    },
    attendanceLocation: {
      message: () =>
        "📸 Pour la présence, veuillez envoyer un selfie avec l'arrière-plan montrant votre emplacement dans la zone de géorepérage.",
    },
    clickAttendanceLocation: {
      message: () =>
        "*⚠️ Ne pas envoyer directement*. Tout d'abord, assurez-vous de *répondre*, puis choisissez 'Envoyer votre emplacement actuel'.\n📍 Veuillez partager votre emplacement actuel en suivant ces étapes:\n1. 📩 Sélectionnez ce message.\n2. 💬 Cliquez sur 'Répondre'.\n3. 📎 Appuyez sur l'icône d'attachement ou de clip.\n4. 📍 Sélectionnez 'Emplacement'.",
    },
    locNotInRange: {
      message: () =>
        `🚫 Nous sommes désolés, mais nous n'avons pas pu enregistrer votre emplacement 📍 et votre présence ⏲️ pour le moment. Vous n'êtes pas dans la plage de l'entreprise 🚷. Veuillez vous déplacer dans la plage de l'entreprise et réessayez depuis le début 🔁.👣`,
    },
    attendancePic: {
      message: () => "📸 Veuillez envoyer une photo selfie de vous 🤳.",
    },
    uploadEmployee: {
      message: () => "Veuillez télécharger tous les contacts de vos employés.",
    },
    oneDay: {
      message: () => ({
        body: "Veuillez spécifier la date et la raison en cliquant sur le bouton ci-dessous",
        label: {
          title: "Demander un congé",
          startdatelabel: "Date de début",
          reasonlabel: "Raison du congé",
        },
      }),
    },
    moreThanOneDay: {
      message: () => ({
        body: "Veuillez spécifier la date et la raison en cliquant sur le bouton ci-dessous",
        label: {
          title: "Demander un congé",
          startdatelabel: "Date de début",
          enddatelabel: "Date de fin",
          requestlabel: "Demander un congé",
          reasonlabel: "Raison du congé",
        },
      }),
    },
    leaveSummary: {
      message: (
        employeeName,
        department,
        leaveType,
        startDate,
        endDate,
        reasonForLeave,
        ticketNumber,
        recipientPhone
      ) =>
        `Nom: *${employeeName}*\nDépartement: *${
          department ?? "-"
        }* \nPour: *Demander un congé*\nType de congé: *${leaveType}*\nDate de début: *${startDate}*\n${
          endDate !== "Invalid Date" ? `Date de fin: *${endDate}*\n` : ""
        }Raison: *${reasonForLeave}*\nNuméro : *${recipientPhone}* \nN° de ticket : *${ticketNumber}*`,
    },
    support: {
      message: () =>
        "Bienvenue ! Nous sommes là pour vous aider. Veuillez sélectionner les problèmes auxquels vous êtes confronté :",
      buttons: [
        {
          title: `🔎 Problèmes`,
          headers: `🔎 Problèmes`,
          rows: [
            {
              id: "check-in",
              title: "Check IN",
              description: "Problème d'enregistrement",
            },
            {
              id: "check-out",
              title: "Check OUT",
              description: "Problème de départ",
            },
            {
              id: "salary-issue",
              title: "Problème de salaire",
              description: "Problème de salaire",
            },
            {
              id: "other-issue",
              title: "AUTRE ❓",
              description: "Autre problème",
            },
          ],
        },
      ],
    },
    checkIn: {
      message: () => "Veuillez saisir votre commentaire.",
    },
    checkOut: {
      message: () => "Veuillez saisir votre commentaire.",
    },
    other_issue: {
      message: () => "Veuillez saisir votre commentaire.",
    },
    Salary_Issue: {
      message: () => "Veuillez saisir votre commentaire.",
    },
    employeeIssue: {
      message: () => "Veuillez saisir votre commentaire.",
    },
    registerComplain: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `Nom : *${name}*\nDépartement : *${
          department ?? "-"
        }*\nPour : *Support*\nProblème : *${problem}*\nRemarque : *${message}*\nNuméro : *${recipientPhone}*\nNuméro de ticket : *${ticketNumber}*`,
    },
    sendIssue: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `*Rapport de problème de l'employé*\nCher employeur, un problème a été signalé par un employé :\nNom de l'employé : ${name}\nNuméro : *${recipientPhone}*\nProblème : *${problem}*\nDescription du problème : *${message}*\nNuméro de ticket : *${ticketNumber}*\nVeuillez prendre les mesures appropriées pour résoudre ce problème.`,
      buttons: (employeeNumber, ticketNumber) => [
        { title: "Approuver", id: `issue_approve-${employeeNumber}-${ticketNumber}` },
        { title: "Rejeter", id: `issue_reject-${employeeNumber}-${ticketNumber}` },
        { title: "En attente", id: `issue_hold-${employeeNumber}-${ticketNumber}` },
      ],
    },
    sendLeave: {
      message: (employeeName, leaveType, startDate, endDate, reason) =>
        `*Notification de demande de congé* \n👤 Nom de l'employé : ${employeeName}\nType de congé : ${leaveType}\nDate de début : *${startDate}*\n${
          endDate !== "Invalid Date" ? `Date de fin : *${endDate}*\n` : ""
        }Raison : ${reason}\nVeuillez examiner et prendre les mesures nécessaires.`,
      buttons: (employeePhone, ticketNumber) => [
        {
          id: `request_approve-${employeePhone}-${ticketNumber}`,
          title: "Approuver",
        },
        {
          id: `request_reject-${employeePhone}-${ticketNumber}`,
          title: "Rejeter",
        },
        {
          id: `request_hold-${employeePhone}-${ticketNumber}`,
          title: "En attente",
        },
      ],
    },
    approvals: {
      buttons: [
        { title: "Approuver congé", id: "leaveApprove" },
        { title: "Problèmes actifs", id: "activeIssues" },
      ],
      message: () =>
        `Bonjour, veuillez sélectionner une option ci-dessous :\n 1️⃣ Pour approuver les congés.\n 2️⃣ Pour voir les problèmes actifs en attente de votre approbation.\nCliquez simplement sur le bouton correspondant pour continuer !`,
    },
    leaveApprove: {
      message: () =>
        `*Congé de l'employé signalé*\nCher employeur, il y a une demande de congé par un employé\n *Numéro de ticket : RL4545* \n *Nom* : Ram \n *Dates* : 23/12/2023 \n *Raison* : Mariage \n *Type* : Demande de congé`,
      buttons: [
        { title: "Approuver", id: "request_approve" },
        { title: "Rejeter", id: "request_reject" },
        { title: "En attente", id: "request_hold" },
      ],
    },
    activeIssues: {
      message: () =>
        `*Rapport de problème de l'employé*\nCher employeur, un problème a été signalé par un employé :\n *Nom de l'employé* : Sham \n *Problème* : Salaire \n *Description du problème* : Salaire crédité en moins\nVeuillez prendre les mesures appropriées pour résoudre ce problème.`,
      buttons: [
        { title: "Approuver", id: "issue_approve" },
        { title: "Rejeter", id: "issue_reject" },
        { title: "En attente", id: "issue_hold" },
      ],
    },
    issue_approve: {
      message: () =>
        "Mise à jour du statut : Approuvé\nNous avons le plaisir de vous informer que votre demande/application a été approuvée !\nMerci pour votre patience et votre coopération.",
    },
    issue_reject: {
      message: () =>
        "Mise à jour du statut : Rejeté \nNous regrettons de vous informer que votre demande/application a été rejetée.\nNous apprécions votre compréhension.",
    },
    issue_hold: {
      message: () =>
        "Mise à jour du statut : En Attente \nVotre demande/application est actuellement en attente pendant que nous examinons et évaluons la situation.\nNous apprécions votre patience pendant cette période.",
    },
    request_approve: {
      message: () =>
        `*Mise à jour de la demande de congé* : Approuvée\nNous avons le plaisir de vous informer que votre demande de congé a été approuvée !\nMerci pour votre patience et votre coopération.`,
    },
    request_reject: {
      message: () =>
        `*Mise à jour de la demande de congé* : Rejetée \nNous regrettons de vous informer que votre demande de congé a été rejetée.\nNous apprécions votre compréhension.`,
    },
    request_hold: {
      message: () =>
        `*Mise à jour de la demande de congé* : En Attente \nVotre demande de congé est actuellement en attente pendant que nous examinons et évaluons la situation.\nNous apprécions votre patience pendant cette période.`,
    },
    "remove-branch": {
      message: () => ({
        body: `Veuillez cliquer sur le bouton ci-dessous pour initier la suppression de l'employé du lieu.`,
        label: {
          title: "Supprimer les employés du lieu",
          branchLabel: "Lieux",
          employeesLabel: "Employés",
          companylabel: "Nom de l'entreprise",
        },
      }),
    },
    edit_geolocation: {
      message: () => ({
        body: `Modifiez la géolocalisation des employés en cliquant sur le bouton ci-dessous.`,
        label: {
          title: "Modifier la géolocalisation",
          workingHoursLabel: "Heures de travail",
          branchLabel: "Employé",
          timingTypeLabel: "Type de timing",
          placelabel: "Lieux",
        },
      }),
    },
    "edit-timings": {
      message: () => ({
        body: `Veuillez gérer et optimiser les horaires des employés en accédant au bouton ci-dessous pour modifier les horaires de travail. Votre attention à cette question est grandement appréciée. Merci.`,
        label: {
          title: "Réglez les horaires de travail",
          timingTypeLabel: "Type de timing",
          checkInLabel: "Enregistrement",
          checkOutLabel: "Pointage",
          employeesLabel: "Employés",
          shiftTypeLabel: "Type de quart",
          workdaysLabel: "Jours de travail",

          shiftTyperadio: [
            {
              id: "day",
              title: "Quart de jour (J)",
            },
            {
              id: "day/night",
              title: "Quart de jour/nuit (J/N)",
            },
          ],
          timingTyperadio: [
            {
              id: "Flexible",
              title: "Timing flexible",
            },
            {
              id: "Fixed",
              title: "Timing fixe",
            },
          ],
          workdaysList: [
            {
              id: "0",
              title: "Dimanche",
            },
            {
              id: "1",
              title: "Lundi",
            },
            {
              id: "2",
              title: "Mardi",
            },
            {
              id: "3",
              title: "Mercredi",
            },
            {
              id: "4",
              title: "Jeudi",
            },
            {
              id: "5",
              title: "Vendredi",
            },
            {
              id: "6",
              title: "Samedi",
            },
          ],
        },
      }),
    },
    "addGeo-fencing-emplyer": {
      message: () =>
        `Si vous souhaitez intégrer la fonctionnalité de géo-positionnement, veuillez sélectionner l'option "Oui" ci-dessous.`,
      buttons: [
        { id: "yes-geofencing", title: "Oui" },
        { id: "no-geofencing", title: "Non" },
      ],
    },
    "yes-employer": {
      message: () => `Veuillez partager l'emplacement actuel de votre bureau.`,
    },
    "office-geo-fencing": {
      message: () => `Merci d'avoir fourni l'emplacement actuel de votre bureau.`,
    },
    "reminder-in": {
      message: () =>
        `Ceci est un rappel amical pour marquer l'entrée dans les 5 prochaines minutes.`,
    },
    "reminder-out": {
      message: () =>
        `Ceci est un rappel amical pour marquer la sortie dans les 5 prochaines minutes.`,
    },
    "business-settings": {
      message: () => ({
        body: `Veuillez mettre à jour les informations de votre entreprise en cliquant sur le bouton ci-dessous. Merci !`,

        label: {
          title: "Modifier les paramètres de l'entreprise",
          employerNamelabel: "Nom de l'employé",
          employernolabel: "Numéro de l'employé",
          bufferTimelabel: "Temps tampon",
          companyNamelabel: "Nom de l'entreprise",
          monthlySickLeavelabel: "Congé maladie mensuel",
          casualLeavelabel: "Congé décontracté",
          annualLeavelabel: "Congé annuel",
          maternityLeaveAllowedlabel: "Congé de maternité",
          paternityLeaveAllowedlabel: "Congé de paternité",
          unpaidLeavePolicylabel: "Congé non payé",
          leaveEncashmentlabel: "Encaissement des congés",
          consequencesUnapprovedLeavelabel: "Conséquences du congé non approuvé",
          halfDayPolicylabel: "Demi-journée",
          Languagelabel: "Langue",
          carryForwardLimitlabel: "Report des congés",
        },
      }),
    },
    link_employee: {
      message: () => ({
        body: `Ajoutez un nouveau lieu et des employés dans le lieu.`,
        label: {
          title: "Géo-positionnement",
          heading: "Coordonnées du lieu",
          rangelabel: "Plage",
          rangeheadinglabel: "La plage doit être de 50 mètres et plus",
          employeelabel: "Lier le lieu à l'employé :",
          branchnamelabel: "Nom du lieu",
        },
      }),
    },
    addBranch: {
      message: () => ({
        body: `Ajoutez un lieu en cliquant sur le bouton "Ajouter un lieu".`,
        label: {
          title: "Géo-positionnement",
          heading: "Coordonnées du lieu",
          rangelabel: "Plage",
          rangeheadinglabel: "La plage doit être de 200 mètres et plus",
          branchnamelabel: "Nom du lieu",
        },
      }),
    },
    dateRangeReport: {
      message: () => ({
        body: `Nous avons préparé un rapport complet sur la plage de dates pour votre examen. Veuillez spécifier la plage de dates souhaitée, et nous vous fournirons rapidement les informations et l'analyse.`,
        label: {
          title: "Rapport sur la plage de dates",
          startdatelabel: "Date de début",
          enddatelabel: "Date de fin",
        },
      }),
    },
    attendanceManagement: {
      message: () => ({
        body: `Bienvenue sur AutoWhat Attendance Management Chat Bot.`,
        label: {
          label1: "Rapports et approbations",
          label2: "Rapports",
          label3: "Équipe",
          label7: "Modifier les lieux",
          label9: "Supprimer les lieux",
          label10: "Modifier les horaires",
          label11: "Supprimer l'employé",
          labeldelete: "Options de suppression",
          labeledit: "Options de modification",
          labelbusiness: "Paramètres de l'entreprise",
          labelBussinessRadio: "Modifier les paramètres de l'entreprise",
          reportsdd: [
            {
              id: "yesterdayreport",
              title: "Rapport d'hier",
            },
            {
              id: "currentmonth",
              title: "Mois en cours",
            },
            {
              id: "customdaterangepdf",
              title: "Rapport de date personnalisée (PDF)",
            },
            {
              id: "allEmployees",
              title: "Rapport de tous les employés",
            },
          ],
          quick: [
            {
              id: "livereport",
              title: "Rapport en direct",
            },
            {
              id: "leaveApprovals",
              title: "Approbations de congé",
            },
            {
              id: "attendanceCorrections",
              title: "Correction de présence",
            },
            {
              id: "supportTickets",
              title: "Tickets de support",
            },
            {
              id: "taskApprovals",
              title: "Approbations de tâches",
            },
            {
              id: "broadcast",
              title: "Diffusion",
            },
          ],
          labelBussinessList: [
            {
              id: "editBusiness",
              title: "Modifier les paramètres de l'entreprise",
            },
          ],
        },
      }),
    },
    contacts: {
      message: () => `Désolé ! Vous ne pouvez pas télécharger les contacts.`,
    },
    contactsUpdate: {
      message: () => `Les détails de l'employé ont été mis à jour avec succès.`,
    },
    placeCreated: {
      message: () => `Nouveau lieu et géo-positionnement créés avec succès`,
    },
    employeeGeoFencing: {
      message: () => `Le géo-positionnement de l'employé a été mis à jour avec succès.`,
    },
    employeeRemove: {
      message: () => `L'employé a été supprimé de l'organisation.`,
    },
    employeeRemovePlace: {
      message: () => `Les employés ont été supprimés du lieu`,
    },
    placeDeleted: {
      message: () => `Le lieu a été supprimé avec succès.`,
    },
    broadcast: {
      message: () => ({
        body: `Diffusez votre message à tous vos employés`,
        label: {
          broadcastLabel: "Message de diffusion",
          filesLabel: "Fichiers",
          employeesLabel: "Employés",
          fileRadios: [
            {
              id: "document",
              title: "Document",
            },
            {
              id: "image",
              title: "Image",
            },
            {
              id: "video",
              title: "Vidéo",
            },
          ],
        },
      }),
    },
    leaveApprovalsFlow: {
      //TODO: implementer
    },
    attendanceCorrectionFlow: {
      //TODO: implementer
    },
  },
  Portuguese: {
    hi: {
      message: (name) =>
        `Olá ${name}\n Eu sou o seu amigável Bot de Presença aqui para ajudar você.`,
      buttons: [
        {
          id: "MarkAttendance",
          title: "Marcar Presença",
        },
        {
          id: "Report",
          title: "Relatório",
        },
        {
          id: "Other",
          title: "Outro",
        },
      ],
    },
    MarkAttendance: {
      message: () =>
        "*Marcar Presença*\n\n- Para marcar o início do dia de trabalho, clique em [ENTRAR].\n- Para marcar o final do dia de trabalho, clique em [SAIR].",
      buttons: [
        { id: "in", title: "🟢 ENTRAR" },
        { id: "out", title: "🔴 SAIR" },
      ],
    },
    in: {
      message: () =>
        `*Localização* \n📍 Por favor, compartilhe sua localização atual seguindo essas etapas:\n1. 📩 Selecione esta mensagem.\n2. 💬 Clique em 'Responder'.\n3. 📎 Toque no ícone de anexo ou clipe.\n4. 📍 Selecione 'Localização'.\n5. ✅ Escolha 'Enviar Sua Localização Atual'.`,
    },
    out: {
      message: () =>
        "Localização \n📍 Por favor, compartilhe sua localização atual seguindo estes passos:\n1. 📩 Selecione esta mensagem.\n2. 💬 Clique em 'Responder'.\n3. 📎 Toque no ícone de anexo ou clipe.\n4. 📍 Selecione 'Localização'.\n5. ✅ Escolha 'Enviar Sua Localização Atual'.",
    },
    attendanceLocation: {
      message: () =>
        "📸 Para registro de presença, por favor, envie uma selfie com o fundo mostrando sua localização dentro da área de geofencing.",
    },
    clickAttendanceLocation: {
      message: () =>
        "⚠️ Não envie diretamente . Primeiro, certifique-se de estar respondendo, depois escolha 'Enviar Sua Localização Atual'.\n📍 Por favor, compartilhe sua localização atual seguindo estes passos:\n1. 📩 Selecione esta mensagem.\n2. 💬 Clique em 'Responder'.\n3. 📎 Toque no ícone de anexo ou clipe.\n4. 📍 Selecione 'Localização'.",
    },
    locNotInRange: {
      message: () =>
        `🚫 Pedimos desculpas, mas não conseguimos registrar sua localização 📍 e presença ⏲️ neste momento. Você não está dentro da faixa da empresa 🚷. Por favor, mova-se para dentro da faixa da empresa e tente novamente desde o início 🔁.👣`,
    },
    attendancePic: {
      message: () => "📸 Por favor, envie uma foto sua com a câmera 🤳.",
    },
    uploadEmployee: {
      message: () => "Por favor, faça o upload de todos os contatos dos seus funcionários.",
    },
    oneDay: {
      message: () => ({
        body: "Por favor, especifique a data e o motivo clicando no botão abaixo",
        label: {
          title: "Solicitar Licença",
          startdatelabel: "Data de Início",
          reasonlabel: "Motivo da Licença",
        },
      }),
    },
    moreThanOneDay: {
      message: () => ({
        body: "Por favor, especifique a data e o motivo clicando no botão abaixo",
        label: {
          title: "Solicitar Licença",
          startdatelabel: "Data de Início",
          enddatelabel: "Data de Término",
          requestlabel: "Solicitação de Licença",
          reasonlabel: "Motivo da Licença",
        },
      }),
    },
    leaveSummary: {
      message: (
        employeeName,
        department,
        leaveType,
        startDate,
        endDate,
        reasonForLeave,
        ticketNumber,
        recipientPhone
      ) =>
        `Nome: *${employeeName}*
      Departamento: *${department ?? "-"}*
      Para: *Solicitar Licença*
      Tipo de Licença: *${leaveType}*
      Data de Início: *${startDate}*
      ${endDate !== "Invalid Date" ? `Data de Término: *${endDate}*\n` : ""}
      Motivo: *${reasonForLeave}*
      Número: *${recipientPhone}*
      Número do Ticket: *${ticketNumber}*`,
    },
    support: {
      message: () =>
        "Bem-vindo! Estamos aqui para ajudar. Por favor, selecione os problemas que você está enfrentando:",
      buttons: [
        {
          title: `🔎 Problemas`,
          headers: `🔎 Problemas`,
          rows: [
            {
              id: "check-in",
              title: "Check IN",
              description: "Problema no Check In",
            },
            {
              id: "check-out",
              title: "Check OUT",
              description: "Problema no Check Out",
            },
            {
              id: "salary-issue",
              title: "Problema de Salário",
              description: "Problema de Salário",
            },
            {
              id: "other-issue",
              title: "OUTRO ❓",
              description: "Outro Problema",
            },
          ],
        },
      ],
    },
    checkIn: {
      message: () => "Por favor, digite sua observação.",
    },
    checkOut: {
      message: () => "Por favor, digite sua observação.",
    },
    other_issue: {
      message: () => "Por favor, digite sua observação.",
    },
    Salary_Issue: {
      message: () => "Por favor, digite sua observação.",
    },
    employeeIssue: {
      message: () => "Por favor, digite sua observação.",
    },
    registerComplain: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `Nome: *${name}*
        Departamento: *${department ?? "-"}*
        Para: *Suporte*
        Problema: *${problem}*
        Observação: *${message}*
        Número: *${recipientPhone}*
        Número do Ticket: *${ticketNumber}*`,
    },
    sendIssue: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `*Relatório de Problema do Funcionário*\nPrezado Empregador, há um problema relatado por um funcionário:\nNome do Funcionário: ${name}\nNúmero: *${recipientPhone}*\nProblema: *${problem}*\nDescrição do Problema: *${message}*\nNúmero do Ticket: *${ticketNumber}*\nPor favor, tome as medidas apropriadas para resolver esta questão.`,
      buttons: (employeeNumber, ticketNumber) => [
        { title: "Aprovar", id: `issue_approve-${employeeNumber}-${ticketNumber}` },
        { title: "Rejeitar", id: `issue_reject-${employeeNumber}-${ticketNumber}` },
        { title: "Segurar", id: `issue_hold-${employeeNumber}-${ticketNumber}` },
      ],
    },
    sendLeave: {
      message: (employeeName, leaveType, startDate, endDate, reason) =>
        `*Notificação de Solicitação de Licença* \n👤 Nome do Funcionário: ${employeeName}\nTipo de Licença: ${leaveType}\nData de Início: *${startDate}*\n${
          endDate != "Invalid Date" ? `Data de Término: *${endDate}*\n` : ""
        }Motivo: ${reason}\nPor favor, reveja e tome as medidas necessárias.`,
      buttons: (employeePhone, ticketNumber) => [
        {
          id: `request_approve-${employeePhone}-${ticketNumber}`,
          title: "Aprovar",
        },
        {
          id: `request_reject-${employeePhone}-${ticketNumber}`,
          title: "Rejeitar",
        },
        {
          id: `request_hold-${employeePhone}-${ticketNumber}`,
          title: "Segurar",
        },
      ],
    },
    approvals: {
      buttons: [
        { title: "Aprovar Licença", id: "leaveApprove" },
        { title: "Questões Ativas", id: "activeIssues" },
      ],
      message: () =>
        `Olá, por favor, selecione uma opção abaixo:\n 1️⃣ Para aprovar licenças.\n 2️⃣ Para visualizar questões ativas aguardando sua aprovação.\nBasta clicar no botão correspondente para continuar!`,
    },
    leaveApprove: {
      message: () =>
        `*Licença Solicitada pelo Funcionário*\nPrezado Empregador, há uma solicitação de licença por um funcionário\n *Número do Ticket: RL4545* \n *Nome*: Ram \n *Datas*: 23/12/2023 \n *Motivo* : Casamento \n *Tipo* : Solicitar Licença`,
      buttons: [
        { title: "Aprovar", id: "request_approve" },
        { title: "Rejeitar", id: "request_reject" },
        { title: "Segurar", id: "request_hold" },
      ],
    },
    activeIssues: {
      message: () =>
        `*Relatório de Problema do Funcionário*\nPrezado Empregador, há um problema relatado por um funcionário:\n *Nome do Funcionário* : Sham \n *Problema* : Salário \n *Descrição do Problema* : Salário creditado a menos\nPor favor, tome as medidas apropriadas para resolver esta questão.`,
      buttons: [
        { title: "Aprovar", id: "issue_approve" },
        { title: "Rejeitar", id: "issue_reject" },
        { title: "Segurar", id: "issue_hold" },
      ],
    },
    issue_approve: {
      message: () =>
        "Atualização de Status: Aprovado\nTemos o prazer de informar que sua solicitação/aplicação foi aprovada!\nObrigado pela sua paciência e cooperação.",
    },
    issue_reject: {
      message: () =>
        "Atualização de Status: Rejeitado \nLamentamos informar que sua solicitação/aplicação foi rejeitada.\nAgradecemos pela sua compreensão.",
    },
    issue_hold: {
      message: () =>
        "Atualização de Status: Em Espera \nSua solicitação/aplicação está atualmente em espera enquanto revisamos e avaliamos a situação.\nAgradecemos sua paciência durante este período.",
    },
    request_approve: {
      message: () =>
        `*Atualização de Solicitação de Licença*: Aprovada\nTemos o prazer de informar que sua solicitação de licença foi aprovada!\nAgradecemos pela sua paciência e cooperação.`,
    },
    request_reject: {
      message: () =>
        `*Atualização de Solicitação de Licença*: Rejeitada \nLamentamos informar que sua solicitação de licença foi rejeitada.\nAgradecemos pela sua compreensão.`,
    },
    request_hold: {
      message: () =>
        `*Atualização de Solicitação de Licença*: Em Espera \nSua solicitação de licença está atualmente em espera enquanto revisamos e avaliamos a situação.\nAgradecemos sua paciência durante este período.`,
    },
    "remove-branch": {
      message: () => ({
        body: `Clique no botão abaixo para iniciar a remoção do funcionário do Local.`,
        label: {
          title: "Remover Funcionários do Local",
          branchLabel: "Locais",
          employeesLabel: "Funcionários",
          companylabel: "Nome da Empresa",
        },
      }),
    },
    edit_geolocation: {
      message: () => ({
        body: `Editar Cerca Geográfica dos Funcionários ao clicar no botão abaixo`,
        label: {
          title: "Editar Localização Geográfica",
          workingHoursLabel: "Horário de Trabalho",
          branchLabel: "Funcionário",
          timingTypeLabel: "Tipo de Horário",
          placelabel: "Locais",
        },
      }),
    },
    "edit-timings": {
      message: () => ({
        body: `Gerencie e otimize as agendas dos funcionários acessando o botão abaixo para Editar horários dos turnos. Sua atenção a este assunto é muito apreciada. Obrigado.`,
        label: {
          title: "Editar Horário Turno",
          timingTypeLabel: "Tipo Horário",
          checkInLabel: "Entrada",
          checkOutLabel: "Saída",
          employeesLabel: "Funcionários",
          shiftTypeLabel: "Tipo de Turno",
          workdaysLabel: "Dias de Trabalho",
        },
        list: {
          shiftTyperadio: [
            {
              id: "day",
              title: "Turno Diurno (D)",
            },
            {
              id: "day/night",
              title: "Turno Diurno/Noturno",
            },
          ],
          timingTyperadio: [
            {
              id: "Flexible",
              title: "Tempo flexível",
            },
            {
              id: "Fixed",
              title: "Tempo Fixo",
            },
          ],
          workdaysList: [
            {
              id: "0",
              title: "Domingo",
            },
            {
              id: "1",
              title: "Segunda-feira",
            },
            {
              id: "2",
              title: "Terça-feira",
            },
            {
              id: "3",
              title: "Quarta-feira",
            },
            {
              id: "4",
              title: "Quinta-feira",
            },
            {
              id: "5",
              title: "Sexta-feira",
            },
            {
              id: "6",
              title: "Sábado",
            },
          ],
        },
      }),
    },
    "addGeo-fencing-emplyer": {
      message: () =>
        `Se você deseja incorporar a funcionalidade de cerca geográfica, selecione a opção "Sim" abaixo.`,
      buttons: [
        { id: "yes-geofencing", title: "Sim" },
        { id: "no-geofencing", title: "Não" },
      ],
    },
    "yes-employer": {
      message: () => `por favor, compartilhe a localização atual do seu escritório `,
    },
    "office-geo-fencing": {
      message: () => `Obrigado por fornecer a localização atual do seu escritório`,
    },
    "reminder-in": {
      message: () => `Este é um lembrete amigável para marcar o Check-In nos próximos 5 minutos`,
    },
    "reminder-out": {
      message: () => `Este é um lembrete amigável para marcar o Check-Out nos próximos 5 minutos`,
    },
    "business-settings": {
      message: () => ({
        body: `Atualize as informações da sua empresa clicando no botão abaixo. Obrigado!`,

        label: {
          title: "Editar Configurações Empresariais",
          employerNamelabel: "Nome do Funcionário",
          employernolabel: "Número do Funcionário",
          bufferTimelabel: "Tempo de Reserva",
          companyNamelabel: "Nome da Empresa",
          monthlySickLeavelabel: "Licença Médica Mensal",
          casualLeavelabel: "Licença Casual",
          annualLeavelabel: "Licença Anual",
          maternityLeaveAllowedlabel: "Licença Maternidade",
          paternityLeaveAllowedlabel: "Licença Paternidade",
          unpaidLeavePolicylabel: "Licença Não Remunerada",
          leaveEncashmentlabel: "Pagamento de Licença Não Utilizada",
          consequencesUnapprovedLeavelabel: "Consequências de Licença Não Aprovada",
          halfDayPolicylabel: "Meio Dia",
          Languagelabel: "linguagem",
          carryForwardLimitlabel: "Limite de Acúmulo",
        },
      }),
    },
    link_employee: {
      message: () => ({
        body: `Adicionar novo local e funcionários ao local`,
        label: {
          title: "Cerca Geográfica",
          heading: "Coordenadas do Local",
          rangelabel: "Alcance",
          rangeheadinglabel: "Alcance deve ser 50 metros ou mais",
          employeelabel: "Vincular Local ao Funcionário:",
          branchnamelabel: "Nome do Local",
        },
      }),
    },
    addBranch: {
      message: () => ({
        body: `Adicione local clicando no botão "Adicionar local".`,
        label: {
          title: "Cerca geográfica",
          heading: "Coordenadas de lugar",
          rangelabel: "Faixa",
          rangeheadinglabel: "O alcance deve ser de 200 metros ou mais",
          branchnamelabel: "Coloque o nome",
        },
      }),
    },
    dateRangeReport: {
      message: () => ({
        body: `Preparamos um relatório abrangente de intervalo de datas para sua análise. Especifique o período de sua preferência e forneceremos imediatamente os insights e as análises.`,
        label: {
          title: "Relatório de Intervalo de Datas",
          startdatelabel: "Data de Início",
          enddatelabel: "Data de Término",
        },
      }),
    },
    attendanceManagement: {
      message: () => ({
        body: `Bem-vindo ao bot de bate-papo de gerenciamento de atendimento AutoWatt.`,
        label: {
          label1: "Relatórios e Aprovações",
          label2: "Relatórios",
          label3: "Equipe",
          label7: "Editar Locais",
          label9: "Excluir Locais",
          label10: "Editar Horário do Turno",
          label11: "Excluir Funcionário",
          labeldelete: "Opções de Exclusão",
          labeledit: "Opções de Edição",
          labelbusiness: "Configurações Empresariais",
          labelBussinessRadio: "Editar Configurações Empresariais",

          reportsdd: [
            {
              id: "yesterdayreport",
              title: "Relatório de ontem",
            },
            {
              id: "currentmonth",
              title: "Mês atual",
            },
            {
              id: "customdaterangepdf",
              title: "relatório de data",
            },
            {
              id: "allEmployees",
              title: "Funcionários Relat",
            },
          ],
          quick: [
            {
              id: "livereport",
              title: "Relatório ao vivo",
            },
            {
              id: "leaveApprovals",
              title: "Deixar aprovações",
            },
            {
              id: "attendanceCorrections",
              title: "Correção de Presença",
            },
            {
              id: "supportTickets",
              title: "Tíquetes de suporte",
            },
            {
              id: "taskApprovals",
              title: "Aprovação de Tarefa",
            },
            {
              id: "broadcast",
              title: "Transmissão",
            },
          ],
          labelBussinessList: [
            {
              id: "editBusiness",
              title: "Editar Config. Emp.",
            },
          ],
        },
      }),
    },
    contacts: {
      message: () => `Desculpe! Você não pode fazer upload de contatos.`,
    },
    contactsUpdate: {
      message: () =>
        `Tenho o prazer de informar que os dados dos funcionários foram atualizados com sucesso.`,
    },
    placeCreated: {
      message: () =>
        `Gostaríamos de informar que o novo local e a cerca geográfica foram criados com sucesso`,
    },
    employeeGeoFencing: {
      message: () =>
        `Gostaríamos de informar que a cerca geográfica dos funcionários foi atualizada com sucesso.`,
    },
    employeeRemove: {
      message: () => `Gostaríamos de informar que o funcionário foi afastado da organização.`,
    },
    employeeRemovePlace: {
      message: () => `Gostaríamos de informar que funcionários foram afastados do local.`,
    },
    placeDeleted: {
      message: () => `local foi excluído com sucesso.`,
    },
    broadcast: {
      message: () => ({
        body: `Transmita sua mensagem para todos os seus funcionários`,
        label: {
          broadcastLabel: "Mensagem de Transmissão",
          filesLabel: "Arquivos",
          employeesLabel: "Funcionários",
        },
        list: {
          fileRadios: [
            {
              id: "document",
              title: "Documento",
            },
            {
              id: "image",
              title: "Imagem",
            },
            {
              id: "video",
              title: "Vídeo",
            },
          ],
        },
      }),
    },
    leaveApprovalsFlow: {
      //TODO: implement
    },
    attendanceCorrectionFlow: {
      //TODO: implement
    },
  },
  Russian: {
    hi: {
      message: (name) => `Привет, ${name}! Я ваш дружелюбный Бот по учету, готовый помочь вам.`,
      buttons: (userData) => [
        {
          id: "MarkAttendance",
          title: "Отметить присутствие",
        },
        // {
        //   id: "Report",
        //   title: "Report",
        // },
        {
          id: `empFl@${userData}`,
          // id: "employeeFlow",
          title: "Другое",
        },
      ],
    },
    MarkAttendance: {
      message: () =>
        "Отметить присутствие\n\n- Чтобы отметить начало рабочего дня, нажмите [IN].\n- Чтобы отметить конец рабочего дня, нажмите [OUT].",
      buttons: [
        { id: "in", title: "🟢 ВХОД" },
        { id: "out", title: "🔴 ВЫХОД" },
      ],
    },
    in: {
      message: () =>
        "*Местоположение*\n📍 Пожалуйста, поделитесь вашим текущим местоположением, следуя этим шагам:\n1. 📩 Выберите это сообщение.\n2. 💬 Нажмите 'Ответить'.\n3. 📎 Коснитесь значка вложения или скрепки.\n4. 📍Выберите 'Местоположение'.\n5. ✅ Выберите 'Отправить ваше текущее местоположение'.",
    },
    out: {
      message: () =>
        "*Местоположение*\n📍 Пожалуйста, поделитесь своим текущим местоположением, следуя этим шагам:\n1. 📩 Выберите это сообщение.\n2. 💬 Нажмите 'Ответить'.\n3. 📎 Нажмите на иконку вложения или скрепки.\n4. 📍 Выберите 'Местоположение'.\n5. ✅ Выберите 'Отправить ваше текущее местоположение'.",
    },
    attendanceLocation: {
      message: () =>
        "📸 Для отметки присутствия, отправьте селфи с фоном, на котором видно ваше местоположение в пределах геозоны.",
    },
    clickAttendanceLocation: {
      message: () =>
        "⚠️ Не отправляйте напрямую. Сначала убедитесь, что вы отвечаете, затем выберите 'Отправить ваше текущее местоположение'.\n📍 Пожалуйста, поделитесь своим текущим местоположением, следуя этим шагам:\n1. 📩 Выберите это сообщение.\n2. 💬 Нажмите 'Ответить'.\n3. 📎 Нажмите на иконку вложения или скрепки.\n4. 📍 Выберите 'Местоположение'.",
    },
    locNotInRange: {
      message: () =>
        `🚫 Мы извиняемся, но мы не смогли зарегистрировать ваше местоположение 📍 и присутствие ⏲️ в данный момент. Вы находитесь вне диапазона компании 🚷. Пожалуйста, переместитесь в пределы диапазона компании и повторите сначала 🔁.👣`,
    },
    attendancePic: {
      message: () => "📸 Пожалуйста, отправьте селфи 🤳.",
    },
    uploadEmployee: {
      message: () => "Извините, но я не могу помочь с этим.",
    },
    oneDay: {
      message: () => ({
        body: "Пожалуйста, уточните дату и причину, нажав на кнопку ниже.",
        label: {
          title: "Запросить отпуск",
          startdatelabel: "Дата начала",
          reasonlabel: "Причина отпуска",
        },
      }),
    },
    moreThanOneDay: {
      message: () => ({
        body: "Пожалуйста, укажите дату и причину, нажав на кнопку ниже.",
        label: {
          title: "Запросить отпуск",
          startdatelabel: "Дата начала",
          enddatelabel: "Дата окончания",
          requestlabel: "Запрос на отпуск",
          reasonlabel: "Причина отпуска",
        },
      }),
    },
    leaveSummary: {
      message: (
        employeeName,
        department,
        leaveType,
        startDate,
        endDate,
        reasonForLeave,
        ticketNumber,
        recipientPhone
      ) =>
        `Имя: *${employeeName}*
        Отдел: *${department ?? "-"}*
        Для: *Запросить отпуск*
        Тип отпуска: *${leaveType}*
        Дата начала: *${startDate}*
        ${endDate !== "Invalid Date" ? `Дата окончания: *${endDate}*\n` : ""}
        Причина: *${reasonForLeave}*
        Номер: *${recipientPhone}*
        Номер билета: *${ticketNumber}*`,
    },
    support: {
      message: () =>
        "Добро пожаловать! Мы здесь, чтобы помочь вам. Пожалуйста, выберите проблемы, с которыми вы сталкиваетесь:",
      buttons: [
        {
          title: `🔎 Проблемы`,
          headers: `🔎 Проблемы`,
          rows: [
            {
              id: "check-in",
              title: "Регистрация входа",
              description: "Проблема с регистрацией входа",
            },
            {
              id: "check-out",
              title: "Регистрация выхода",
              description: "Проблема с регистрацией выхода",
            },
            {
              id: "salary-issue",
              title: "Проблема с зарплатой",
              description: "Проблема с выплатой зарплаты",
            },
            {
              id: "other-issue",
              title: "ДРУГОЕ ❓",
              description: "Другая проблема",
            },
          ],
        },
      ],
    },
    checkIn: {
      message: () => "Пожалуйста, введите ваш комментарий.",
    },
    checkOut: {
      message: () => "Пожалуйста, введите свой комментарий.",
    },
    other_issue: {
      message: () => "Пожалуйста, введите свой комментарий.",
    },
    Salary_Issue: {
      message: () => "Пожалуйста, введите свой комментарий.",
    },
    employeeIssue: {
      message: () => "Пожалуйста, введите свой комментарий.",
    },
    registerComplain: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `Имя: *${name}*
       Отдел: *${department ?? "-"}*
       Для: *Поддержка*
       Проблема: *${problem}*
       Комментарий: *${message}*
       Номер: *${recipientPhone}*
       Номер билета: *${ticketNumber}*`,
    },
    sendIssue: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `Отчет о проблеме сотрудника\nУважаемый работодатель, поступила жалоба от сотрудника:\nИмя сотрудника: ${name}\nНомер: ${recipientPhone}\nПроблема: ${problem}\nОписание проблемы: ${message}\nНомер билета: ${ticketNumber}\nПожалуйста, примите соответствующие меры для решения этой проблемы.`,
      buttons: (employeeNumber, ticketNumber) => [
        { title: "Одобрить", id: `issue_approve-${employeeNumber}-${ticketNumber}` },
        { title: "Отклонить", id: `issue_reject-${employeeNumber}-${ticketNumber}` },
        { title: "Удержать", id: `issue_hold-${employeeNumber}-${ticketNumber}` },
      ],
    },
    sendLeave: {
      message: (employeeName, leaveType, startDate, endDate, reason) =>
        `Уведомление о запросе на отпуск \n👤 Имя сотрудника: ${employeeName}\nТип отпуска: ${leaveType}\nДата начала: ${startDate}\n${
          endDate != "Invalid Date" ? `Дата окончания: *${endDate}*\n` : ""
        }Причина: ${reason}\nПожалуйста, рассмотрите и примите необходимые меры.`,
      buttons: (employeePhone, ticketNumber) => [
        {
          id: `request_approve-${employeePhone}-${ticketNumber}`,
          title: "Одобрить",
        },
        {
          id: `request_reject-${employeePhone}-${ticketNumber}`,
          title: "Отклонить",
        },
        {
          id: `request_hold-${employeePhone}-${ticketNumber}`,
          title: "Удержать",
        },
      ],
    },
    approvals: {
      buttons: [
        { title: "Одобрение отпуска", id: "leaveApprove" },
        { title: "Активные проблемы", id: "activeIssues" },
      ],
      message: () =>
        `Привет! Пожалуйста, выберите один из вариантов ниже:\n 1️⃣ Для утверждения отпусков.\n 2️⃣ Для просмотра активных проблем, ожидающих вашего утверждения.\nПросто нажмите на соответствующую кнопку для продолжения!`,
    },
    leaveApprove: {
      message: () =>
        `Сообщено об отпуске сотрудника\nУважаемый работодатель, поступил запрос на отпуск от сотрудника\n Номер билета: RL4545 \n Имя: Рам \n Даты: 23/12/2023 \n Причина : Свадьба \n Тип : Запрос отпуска`,
      buttons: [
        { title: "Одобрить", id: "request_approve" },
        { title: "Отклонить", id: "request_reject" },
        { title: "Удержать", id: "request_hold" },
      ],
    },
    activeIssues: {
      message: () =>
        `Отчет о проблеме сотрудника\nУважаемый работодатель, поступила жалоба от сотрудника:\n Имя сотрудника : Шам \n Проблема : Зарплата \n Описание проблемы : Зарплата начислена недостаточно\nПожалуйста, примите соответствующие меры для решения этой проблемы.`,
      buttons: [
        { title: "Одобрить", id: "issue_approve" },
        { title: "Отклонить", id: "issue_reject" },
        { title: "Удержать", id: "issue_hold" },
      ],
    },
    issue_approve: {
      message: () =>
        "Обновление статуса: Одобрено\nМы рады сообщить вам, что ваш запрос/заявка был одобрен!\nСпасибо за ваше терпение и сотрудничество.",
    },
    issue_reject: {
      message: () =>
        "Обновление статуса: Отклонено\nС сожалением сообщаем вам, что ваш запрос/заявка был отклонен.\nМы благодарим за ваше понимание.",
    },
    issue_hold: {
      message: () =>
        "Обновление статуса: В ожидании\nВаш запрос/заявка в настоящее время находится на удержании во время рассмотрения и оценки ситуации.\nМы благодарим вас за терпение в этот период.",
    },
    request_approve: {
      message: () =>
        `*Обновление запроса на отпуск*: Одобрено\nМы рады сообщить вам, что ваш запрос на отпуск был утвержден!\nБлагодарим за ваше терпение и сотрудничество.`,
    },
    request_reject: {
      message: () =>
        `*Обновление запроса на отпуск*: Отклонено\nС сожалением сообщаем вам, что ваш запрос на отпуск был отклонен.\nМы благодарим за ваше понимание.`,
    },
    request_hold: {
      message: () =>
        `*Обновление запроса на отпуск*: В ожидании\nВаш запрос на отпуск находится на удержании во время рассмотрения и оценки ситуации.\nМы благодарим за ваше терпение в этот период.`,
    },
    "remove-branch": {
      message: () => ({
        body: `Пожалуйста, нажмите кнопку ниже, чтобы инициировать удаление сотрудника из места.`,
        label: {
          title: "Удалить сотрудников из места",
          branchLabel: "Места",
          employeesLabel: "Сотрудники",
          companylabel: "Название компании",
        },
      }),
    },
    edit_geolocation: {
      message: () => ({
        body: "Изменить геозону сотрудников, нажав на кнопку ниже",
        label: {
          title: "Изменить геолокацию",
          workingHoursLabel: "Рабочие часы",
          branchLabel: "Сотрудник",
          timingTypeLabel: "Тип времени",
          placelabel: "Места",
        },
      }),
    },
    "edit-timings": {
      message: () => ({
        body: "Добросердечно управляйте и оптимизируйте графики сотрудников, получив доступ к кнопке ниже для редактирования времени смены. Ваше внимание к этому вопросу высоко ценится. Спасибо.",
        label: {
          title: "Редактировать время смены",
          timingTypeLabel: "Тип времени",
          checkInLabel: "Регистрация входа",
          checkOutLabel: "Регистрация выхода",
          employeesLabel: "Сотрудники",
          shiftTypeLabel: "Тип смены",
          workdaysLabel: "Рабочие дни",
        },
        list: {
          shiftTyperadio: [
            {
              id: "day",
              title: "Дневная смена",
            },
            {
              id: "day/night",
              title: "Дневно-ночная смена",
            },
          ],
          timingTyperadio: [
            {
              id: "Flexible",
              title: "Гибкий график",
            },
            {
              id: "Fixed",
              title: "Фиксированный график",
            },
          ],
          workdaysList: [
            {
              id: "0",
              title: "Воскресенье",
            },
            {
              id: "1",
              title: "Понедельник",
            },
            {
              id: "2",
              title: "Вторник",
            },
            {
              id: "3",
              title: "Среда",
            },
            {
              id: "4",
              title: "Четверг",
            },
            {
              id: "5",
              title: "Пятница",
            },
            {
              id: "6",
              title: "Суббота",
            },
          ],
        },
      }),
    },
    "addGeo-fencing-emplyer": {
      message: () =>
        `Если вы хотите включить функционал геозоны, любезно выберите опцию "Да" ниже.`,
      buttons: [
        { id: "yes-geofencing", title: "Да" },
        { id: "no-geofencing", title: "Нет" },
      ],
    },
    "yes-employer": {
      message: () => `Пожалуйста, поделитесь текущим местоположением вашего офиса.`,
    },
    "office-geo-fencing": {
      message: () => `Спасибо за предоставление текущего местоположения вашего офиса.`,
    },
    "reminder-in": {
      message: () =>
        `Это дружественное напоминание о том, чтобы отметить вход в ближайшие 5 минут.`,
    },
    "reminder-out": {
      message: () =>
        `Это дружественное напоминание о том, чтобы отметить выход в ближайшие 5 минут.`,
    },
    "business-settings": {
      message: () => ({
        body: `Пожалуйста, обновите информацию о вашем бизнесе, нажав на кнопку ниже. Спасибо!`,

        label: {
          title: "Изменить настройки бизнеса",
          employerNamelabel: "Имя сотрудника",
          employernolabel: "Номер сотрудника",
          bufferTimelabel: "Время буфера",
          companyNamelabel: "Название компании",
          monthlySickLeavelabel: "Ежемесячный больничный отпуск",
          casualLeavelabel: "Случайный отпуск",
          annualLeavelabel: "Ежегодный отпуск",
          maternityLeaveAllowedlabel: "Декретный отпуск",
          paternityLeaveAllowedlabel: "Отпуск по уходу за ребенком",
          unpaidLeavePolicylabel: "Неоплачиваемый отпуск",
          leaveEncashmentlabel: "Обналичивание отпуска",
          consequencesUnapprovedLeavelabel: "Последствия неутвержденного отпуска",
          halfDayPolicylabel: "Полдня",
          Languagelabel: "Язык",
          carryForwardLimitlabel: "Лимит переноса",
        },
      }),
    },
    link_employee: {
      message: () => ({
        body: "Добавьте новое место и сотрудников в это место",
        label: {
          title: "Геозона",
          heading: "Координаты места",
          rangelabel: "Диапазон",
          rangeheadinglabel: "Диапазон должен быть от 50 метров и выше",
          employeelabel: "Привязать место к сотруднику:",
          branchnamelabel: "Название места",
        },
      }),
    },
    addBranch: {
      message: () => ({
        body: `Добавьте место, нажав кнопку "Добавить место".`,
        label: {
          title: "Геозона",
          heading: "Координаты места",
          rangelabel: "Диапазон",
          rangeheadinglabel: "Диапазон должен быть от 200 метров и выше",
          branchnamelabel: "Название места",
        },
      }),
    },
    dateRangeReport: {
      message: () => ({
        body: `Мы подготовили подробный отчет по диапазону дат для вашего рассмотрения. Укажите предпочтительный диапазон дат, и мы незамедлительно предоставим вам аналитику и исследования.`,
        label: {
          title: "Отчет по диапазону дат",
          startdatelabel: "Дата начала",
          enddatelabel: "Дата окончания",
        },
      }),
    },
    attendanceManagement: {
      message: () => ({
        body: "Добро пожаловать в чат-бот по управлению посещаемостью AutoWhat.",
        label: {
          label1: "Отчеты и утверждения",
          label2: "Отчеты",
          label3: "Команда",
          label7: "Редактировать места",
          label9: "Удалить места",
          label10: "Редактировать время смены",
          label11: "Удалить сотрудника",
          labeldelete: "Опции удаления",
          labeledit: "Опции редактирования",
          labelbusiness: "Настройки бизнеса",
          labelBussinessRadio: "Изменить настройки бизнеса",
          reportsdd: [
            {
              id: "yesterdayreport",
              title: "Вчерашний отчет",
            },
            {
              id: "currentmonth",
              title: "Текущий месяц",
            },
            {
              id: "customdaterangepdf",
              title: "Отчет о дате (PDF)",
            },
            {
              id: "allEmployees",
              title: "Все отчеты Emp",
            },
          ],
          quick: [
            {
              id: "livereport",
              title: "Живой отчет",
            },
            {
              id: "leaveApprovals",
              title: "Оставить одобрение",
            },
            {
              id: "attendanceCorrections",
              title: "коррекция посещаемости",
            },
            {
              id: "supportTickets",
              title: "Техподдержка",
            },
            {
              id: "taskApprovals",
              title: "Утверждение задачи",
            },
            {
              id: "broadcast",
              title: "Транслировать",
            },
          ],
          labelBussinessList: [
            {
              id: "editBusiness",
              title: "Настройки бизнеса",
            },
          ],
        },
      }),
    },
    contacts: {
      message: () => `Извините, но вы не можете загружать контакты.`,
    },
    contactsUpdate: {
      message: () => `Информация о сотруднике успешно обновлена.`,
    },
    placeCreated: {
      message: () => `Новое место и геозона успешно созданы.`,
    },
    employeeGeoFencing: {
      message: () => `Геозона сотрудника успешно обновлена.`,
    },
    employeeRemove: {
      message: () => `Сотрудник был удален из организации.`,
    },
    employeeRemovePlace: {
      message: () => `Сотрудники были удалены из места.`,
    },
    placeDeleted: {
      message: () => `Место успешно удалено.`,
    },
    broadcast: {
      message: () => ({
        body: `Распространите ваше сообщение всем вашим сотрудникам.`,
        label: {
          broadcastLabel: "Широковещательное сообщение",
          filesLabel: "Файлы",
          employeesLabel: "Сотрудники",
          fileRadios: [
            {
              id: "document",
              title: "Документ",
            },
            {
              id: "image",
              title: "Изображение",
            },
            {
              id: "video",
              title: "Видео",
            },
          ],
        },
      }),
    },
    leaveApprovalsFlow: {
      //TODO: implement
    },
    attendanceCorrectionFlow: {
      //TODO: implement
    },
  },
};

const demoBotLanguage = {
  English: {
    createDailyTask: {
      message: () => ({
        body: `Welcome to Autowhat Tasks`,
        label: {
          title1: "Daily  Repitative Task Creation",
          title2: "Daily Repitative Task Creation",
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
          taskactivityheader: "Simple Daily Repitative Task Creation",
          taskactivitysubheader: "Few tips for creation and effective implemntation of task",
          taskactivitysteps:
            " \n Step 1 : Task Info - Name, Description, Instructions \n Step 2: Proofs: Type,Quantity,Strictness \n Step 3: Priority and Assignment \n Step 4: Notifications & Reminder \n\n--------------------------------\n Standard Operating Procedure (SOP) \n-------------------------------\n 1. Task Information : \n -Task Name:- Cleaning \n -Task Description :- This task involves capturing a photo of a dustbin, and location proof is required for site visits \n -Task Instruction :- Be on time follow SOP and timings \n\n2.Proofs : \n Users can select proof options,quantity of proofs such as\n   -📷 Photo✔️ - 1,\n   -📝 Text✔️ - 2,\n   -🎥 Video❌ ,\n   -📁 File❌,\n   -🔊 Audio❌ \n with strictness preferences. \n\n3.Priorities: \n  -🔴 Critical✔️ \n  -🔶 High \n  -🟡 Medium \n  -🔵 Low \n  -⚪ No Priority \n\n Timings: \n   -⏰ Activity start time- 09:00 am\n   -⌛ Task duration- 30 mins \n   -🔔 Frequency- Twice. \n\n Notifications:\n   - All Real-time updates✔️ \n    -Task start\n  - Assignee Changes \n   -Task Completion. \n\n Date: 17/9/23 \nPrepared & Approved By: Ram Sharma ",
          button1label: "Create Daily Task",
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
            taskdescription: "This is most important task , Cleaniness is Next to Godliness",
            taskinstruction: "Need to first sweep, then using water clean , empty dustbin ,etc",
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
      }),
    },
    hi: {
      message: () =>
        "*Welcome to AutoWhat Attendance on WhatsApp!*\n\nPlease select options from below:\n\t1.Start Demo: Start Live Interactive Demo of our WhatsApp Bot.\n\t2.Sign Up: Sign Up for Attendance Management on WhatsApp.",
      buttons: [
        // {
        //   id: "startDemo",
        //   title: "Start Demo",
        // },
        {
          id: "startSignup",
          title: "Sign Up",
        },
      ],
    },
    startSignup: {
      message: () =>
        "*Please select language from below*. Either you can select One Language or Multi Language.",
      buttons: [
        {
          id: "langSignup",
          title: "One Language",
        },
        {
          id: "langSignup_",
          title: "English+One Language",
        },
      ],
    },
    timezoneLocation: {
      message: () =>
        "Please Send you current location to customize timing according to your location.",
    },
    startDemo: {
      message: () =>
        "*Welcome to the Interactive demo of AutoWhat Attendance on WhatsApp!* \n\nPlease select language from below",
      buttons: [
        {
          id: "singlelanguage",
          title: "One Language",
        },
        {
          id: "duallanguage",
          title: "English+One Language",
        },
      ],
    },
    startempdemo: {
      message: () =>
        "Let's begin step-by-step process to *mark attendance.* \n 📣 Post-signup, you have the capability to configure geo-fencing in your master settings, ensuring location-specific employee mapping.",
      buttons: [{ id: "mark_attendance", title: "Mark Attendance" }],
    },
    MarkAttendance: {
      message: () =>
        "*Step 1- Mark Attendance*\n - To mark the start of their workday, employees will click on [IN].\n- To indicate the end of their workday, they will select [OUT].",
      buttons: [
        { id: "in", title: "🟢 IN" },
        { id: "out", title: "🔴 OUT" },
      ],
    },
    singlelanguage: {
      message: () =>
        "*Choose your preferred language.*\n\nFor any support/query you can Whatsapp on +918448804355 anytime.",
      buttons: [
        {
          title: "🌐 Language Selection",
          headers: "🌐 Language Selection",
          rows: [
            {
              id: "English",
              title: "English",
              description: "Messages in English.",
            },
            {
              id: "Hindi",
              title: "Hindi",
              description: "संदेश हिंदी में।",
            },
            {
              id: "Bengali",
              title: "Bengali",
              description: "বার্তাগুলি বাংলায়।",
            },
            {
              id: "Telugu",
              title: "Telugu",
              description: "సందేశాలు తెలుగులో.",
            },
            {
              id: "Marathi",
              title: "Marathi",
              description: "संदेश मराठीत.",
            },
            {
              id: "Tamil",
              title: "Tamil",
              description: "செய்திகள் தமிழில்.",
            },
            {
              id: "Kannada",
              title: "Kannada",
              description: "ಸಂದೇಶಗಳು ಕನ್ನಡದಲ್ಲಿ.",
            },
            {
              id: "Gujarati",
              title: "Gujarati",
              description: "સંદેશાઓ ગુજરાતીમાં.",
            },
            {
              id: "Odia",
              title: "Odia",
              description: "ସନ୍ଦେଶ ଓଡ଼ିଆରେ.",
            },
            {
              id: "Malayalam",
              title: "Malayalam",
              description: "സന്ദേശങ്ങൾ മലയാളത്തിൽ.",
            },
          ],
        },
      ],
    },
    duallanguage: {
      message: () =>
        "You've chosen English complemented with your chosen secondary language.\n\n*Choose your secondary language.*\n\n For any Support/Query you can Whatsapp on +918448804355 anytime",
      buttons: [
        {
          title: "🌐 Language Selection",
          headers: "🌐 Language Selection",
          rows: [
            {
              id: "English+Hindi",
              title: "English+Hindi",
              description: "द्विभाषी संदेश: अंग्रेजी और हिंदी में।",
            },
            {
              id: "English+Bengali",
              title: "English+Bengali",
              description: "দ্বিভাষিক বার্তা: ইংরেজি এবং বাংলায়।",
            },
            {
              id: "English+Telugu",
              title: "English+Telugu",
              description: "ద్విభాషా సందేశాలు: ఆంగ్ల మరియు తెలుగులో।",
            },
            {
              id: "English+Marathi",
              title: "English+Marathi",
              description: "द्विभाषिक संदेश: इंग्रजी आणि मराठीत।",
            },
            {
              id: "English+Tamil",
              title: "English+Tamil",
              description: "இருமொழி செய்திகள்: ஆங்கிலம் மற்றும் தமிழில்।",
            },
            {
              id: "English+Kannada",
              title: "English+Kannada",
              description: "ದ್ವಿಭಾಷಾ ಸಂದೇಶಗಳು: ಇಂಗ್ಲಿಷ್ ಮತ್ತು ಕನ್ನಡದಲ್ಲಿ।",
            },
            {
              id: "English+Gujarati",
              title: "English+Gujarati",
              description: "બીલિંગ્વલ મેસેજ: અંગ્રેજી અને ગુજરાતીમાં।",
            },
            {
              id: "English+Odia",
              title: "English+Odia",
              description: "ଦ୍ଵିଭାଷିକ ସନ୍ଦେଶ: ଇଂରାଜୀ ଏବଂ ଓଡ଼ିଆରେ।",
            },
            {
              id: "English+Malayalam",
              title: "English+Malayalam",
              description: "ദ്വിഭാഷാ സന്ദേശങ്ങൾ: ഇംഗ്ലീഷ് മലയാളത്തില്‍.",
            },
          ],
        },
      ],
    },
    in: {
      message: () =>
        "*Location* \n📍 Please share your current location by following these steps:\n1. 📩 Select this message.\n2. 💬 Click 'Reply'.\n3. 📎 Tap the attachment or clip icon.\n4. 📍Select 'Location'.\n5. ✅ Choose 'Send Your Current Location'.",
    },
    out: {
      message: () =>
        "*Location* \n📍 Please share your current location by following these steps:\n1. 📩 Select this message.\n2. 💬 Click 'Reply'.\n3. 📎 Tap the attachment or clip icon.\n4. 📍Select 'Location'.\n5. ✅ Choose 'Send Your Current Location'.",
    },
    attendanceLocation: {
      message: () =>
        "📸 For attendance, please send a selfie with the background showing your location within the geofencing area.",
    },
    clickAttendanceLocation: {
      message: () =>
        "*⚠️ Do not send directly* . First, ensure you're *replying*, then choose 'Send Your Current Location'.\n📍 Please share your current location by following these steps:\n1. 📩 Select this message.\n2. 💬 Click 'Reply'.\n3. 📎 Tap the attachment or clip icon.\n4. 📍 Select 'Location'.",
    },
    attendancePic: {
      message: () => "📸 Please send a selfie photo of yours 🤳.",
    },
    startLeaveRequest: {
      message: () =>
        "We have successfully completed marking attendance demo.\nNext demo is how your Employee can *Request Leave*",
      buttons: [{ id: "requestLeave", title: "Start Request Leave" }],
    },
    Report: {
      message: () => "Download your current Month report or previous month report",
      buttons: [
        {
          id: "currentMonth",
          title: "Current Month",
        },
        {
          id: "previousMonth",
          title: "Previous Month",
        },
      ],
    },
    Other: {
      message: () =>
        "Hello! How can we assist you today? Please choose from the following options.",
      buttons: [
        {
          id: "requestLeave",
          title: "Request Leave",
        },
        {
          id: "support",
          title: "Support",
        },
        // {
        //   id: 'question',
        //   title: 'Ask Question',
        // },
      ],
    },
    requestLeave: {
      message: () =>
        "Thinking of taking a little break?\nPlease let us know how many days you'd like to request off:",
      buttons: [
        { id: "oneDay", title: "ONE DAY" },
        { id: "moreThanOneDay", title: "MORE THAN ONE DAY" },
      ],
    },
    oneDay: {
      message: () => ({
        body: "Please specify the date and Reason by clicking below button",
        label: {
          title: "Request Leave",
          startdatelabel: "Start Date",
          reasonlabel: "Reason For Leave",
        },
      }),
    },
    moreThanOneDay: {
      message: () => ({
        body: "Please specify the date and Reason by clicking below button",
        label: {
          title: "Request Leave",
          startdatelabel: "Start Date",
          enddatelabel: "End Date",
          requestlabel: "Request For Leave",
          reasonlabel: "Reason For Leave",
        },
      }),
    },
    leaveSummary: {
      message: (
        employeeName,
        department,
        leaveType,
        startDate,
        endDate,
        reasonForLeave,
        ticketNumber,
        recipientPhone
      ) =>
        `Name: *${employeeName}*\nDepartment: *${
          department ?? "-"
        }* \nFor: *Request Leave*\nLeave Type: *${leaveType}*\nStart Date: *${startDate}*\n${
          endDate !== "Invalid Date" ? `End Date: *${endDate}*\n` : ""
        }Reason: *${reasonForLeave}*\nNumber : *${recipientPhone}* \nTicket No. : *${ticketNumber}*`,
    },
    startSupport: {
      message: () =>
        "We have successfully completed Request leave demo. \nNext demo is- *How your Employee can Raise Ticket*",
      buttons: [{ id: "support", title: "Support" }],
    },
    support: {
      message: () => "*Raise Ticket* \n You can raise ticket by clicking below issue types",
      buttons: [
        { id: "checkIn", title: "CheckIn & CheckOut" },
        { id: "Salary_Issue", title: "Salary Issue" },
        { id: "other_issue", title: "Other" },
      ],
    },
    checkIn: {
      message: () => "Please type your remark.",
    },
    checkOut: {
      message: () => "Please type your remark.",
    },
    other_issue: {
      message: () => "Please type your remark.",
    },
    Salary_Issue: {
      message: () => "Please type your remark.",
    },
    employeeIssue: {
      message: () => "Please type your remark.",
    },
    registerComplain: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `Name: *${name}*\nDepartment: *${
          department ?? "-"
        }*\nFor: *Support*\nproblem : *${problem}*\nRemark. : *${message}*\nNumber : *${recipientPhone}*\nTicket no. : *${ticketNumber}*`,
    },
    employeeReportStart: {
      message: () =>
        "We have successfully completed Support tickets raise by Employee\nNext - are *reports* which Employee can see",
      buttons: [
        {
          title: "Current Month",
          id: "employe_report1",
        },
      ],
    },
    employerDemoStart: {
      message: () =>
        "We have Completed Employee Demo\nNext - *Employer Demo*:\n   a. 📑 View reports\n   b.  See employee list\n   c. ✍️ Approve leave requests\n   d. ❌ Resolve tickets",
      buttons: [{ id: "isEmployer", title: "Start Employer Demo" }],
    },
    employerReports: {
      message: () =>
        "First feature for Employer are Reports.\nBelow are some *Reports* for Employer",
      buttons: [
        {
          id: "liveReport",
          title: "Live Report",
        },
        {
          id: "emp_master_sheet",
          title: "Show All Employees",
        },
      ],
    },
    liveReport: {
      message: () => "Lets Start Approvals Employer Demo\nClick any of below button",
      buttons: [
        {
          title: "Tickets & Approvals",
          id: "approvals",
        },
      ],
    },
    emp_master_sheet: {
      message: () => "Lets Start Approvals Employer Demo\nClick any of below button",
      buttons: [
        {
          title: "Tickets & Approvals",
          id: "approvals",
        },
      ],
    },
    approvals: {
      buttons: [
        { title: "Leave-Approve", id: "leaveApprove" },
        { title: "Active-Issues", id: "activeIssues" },
      ],
      message: () =>
        `Hello,Please select an option below:\n 1️⃣ For approving leaves.\n 2️⃣ To view active issues awaiting your approval.\nJust click on the corresponding button to proceed!`,
    },
    leaveApprove: {
      message: () =>
        `*Employee Leave Reported*\nDear Employer, there is an leave request by an employee\n *Ticket No.: RL4545* \n *Name*: Ram \n *Dates*: 23/12/2023 \n *Reason* : Wedding \n *Type* : Request Leave`,
      buttons: [
        { title: "Approve", id: "request_approve" },
        { title: "Reject", id: "request_reject" },
        { title: "Hold", id: "request_hold" },
      ],
    },
    activeIssues: {
      message: () =>
        `*Employee Issue Report*\nDear Employer, there is an issue reported by an employee:\n *Employee Name* : Sham \n *Issue* : Salary \n *Issue Description* : Salary less credited\nPlease take appropriate action to address this concern.`,
      buttons: [
        { title: "Approve", id: "issue_approve" },
        { title: "Reject", id: "issue_reject" },
        { title: "Hold", id: "issue_hold" },
      ],
    },
    issue_approve: {
      message: () =>
        "Status Update: Approved\nWe're pleased to inform you that your request/application has been approved!\nThank you for your patience and cooperation",
    },
    issue_reject: {
      message: () =>
        "Status Update: Rejected \nWe regret to inform you that your request/application has been rejected.\nWe appreciate your understanding.",
    },
    issue_hold: {
      message: () =>
        "Status Update: On Hold \nYour request/application is currently on hold while we review and assess the situation.\nWe appreciate your patience during this time.",
    },
    request_: {
      message: () =>
        "*Leave Request Updated*\nYour leave request is now updated. Thank you for using our leave management system.",
    },
    request_approve: {
      message: () =>
        "*Leave Request Updated*\nYour leave request is now updated. Thank you for using our leave management system.",
    },
    request_reject: {
      message: () => "",
    },
    request_hold: {
      message: () => "",
    },
    signupStart: {
      message: () =>
        "We are pleased to announce the successful completion of both demonstrations. You can now avail yourself of a complimentary one-week (7 days) free trial. Following the trial period, our subscription plans are as follows:\n\n₹399 per month for 20 employees.\n₹299 per month for 10 employees.\n\nFor any inquiries or assistance, please feel free to contact us on WhatsApp at +918369644748. We appreciate your interest and look forward to providing you with exceptional service.",
      buttons: [{ id: "signup", title: "Signup Free Trial" }],
    },
    signup: {
      message: () => ({
        body: "Sign Up by clicking the button 'Sign Up' and filling the form.",
        label: {
          title: "Sign Up",
          namelabel: "Full Name",
          companylabel: "Company Name",
          bufferlabel: "Buffer In/Out Mins",
        },
      }),
    },
    uploadEmployee: {
      message: () => "Please upload all your employee contacts.",
    },
    addEmployee: {
      message: (employeeName, employeeNumber, timing, geofen) =>
        `Adding:\n*Name*: ${employeeName}\n*Number*: ${employeeNumber}\n*Type*: ${timing}\n*GeoFencing*: ${geofen}`,
    },
    ticketUpdate: {
      message: (ticketNumber) =>
        `Status of Ticket No: ${ticketNumber} has been updated successfully`,
    },
    employeeDemoStart: {
      buttons: [{ id: "MarkAttendance", title: "Mark Attendance" }],
      message: () =>
        "1️⃣ *Employee Demo Steps*:\n   a. ✅ Mark Attendance\n   b. 🙋 Request Leave\n   c. 🎫 Raise a Ticket\n   d. 📊 View Report\n2️⃣ *Employer Demo Steps* (after completing the Employee Demo steps)",
    },
    employerStart: {
      message: () =>
        "Hello, Please select an option from the following choices:\n\n1️⃣. Get Report:  Click this button to receive a detailed report..\n2️⃣. Approvals: Need to check or manage employee leave approvals? Use this button to navigate through.\n3️⃣. Profile/Settings: Manage your profile and settings here.",
      buttons: [
        { id: "employerReports", title: "Get-Report" },
        { id: "approvals", title: "Approvals" },
        { id: "profile-settings", title: "Profile/Settings" },
      ],
    },
  },
  Hindi: {
    hi: {
      message: (name) =>
        `नमस्ते ${name} 👋\n\n मैं आपका दोस्ताना अटेंडेंस बॉट हूँ, आपकी मदद करने के लिए। 🤖 \n आइए शुरू करते हैं। ✨`,
      buttons: [
        { id: "MarkAttendance", title: "हाजिरी लगाएं✅" },
        {
          id: "Report",
          title: "रिपोर्ट✉️",
        },
        {
          id: "Other",
          title: "अन्य🔄",
        },
      ],
    },
    startempdemo: {
      message: () =>
        "आइए शुरू करते हैं उस क्रमिक प्रक्रिया की व्याख्या से जिसका आप *उपस्थिति* चिह्नित करते समय अनुसरण करेंगे। \n 📣 साइन अप के बाद, आपके पास अपनी मुख्य सेटिंग्स में भौगोलिक सीमांकन (जियो-फेंसिंग) को कॉन्फ़िगर करने की क्षमता होती है, जिससे स्थान-विशिष्ट कर्मचारी मैपिंग सुनिश्चित होती है।",
      buttons: [{ id: "mark_attendance", title: "अटेंडेंस दर्ज करें" }],
    },
    MarkAttendance: {
      message: () =>
        "*Step 1. उपस्थिति चिह्नित करें*\n- अपने कार्यदिवस की शुरुआत चिह्नित करने के लिए, कर्मचारी 🟢 [ *अंदर* ] पर क्लिक करेंगे।\n- अपने कार्यदिवस की समाप्ति दर्शाने के लिए, वे 🔴 [ *बाहर* ] का चयन करेंगे।",
      buttons: [
        { id: "in", title: "🟢 अंदर" },
        { id: "out", title: "🔴 बाहर" },
      ],
    },
    in: {
      message: () =>
        "*लोकेशन* \n📍 अपनी वर्तमान लोकेशन साझा करने के लिए इन चरणों का पालन करें:\n1. 📩 इस संदेश को चुनें।\n2. 💬 'रिप्लाई' पर क्लिक करें।\n3. 📎 अटैचमेंट या क्लिप आइकन पर टैप करें।\n4. 📍'लोकेशन' चुनें।\n5. ✅ 'अपनी वर्तमान लोकेशन भेजें' का चयन करें।",
    },
    out: {
      message: () =>
        "*लोकेशन* \n📍 अपनी वर्तमान लोकेशन साझा करने के लिए इन चरणों का पालन करें:\n1. 📩 इस संदेश को चुनें।\n2. 💬 'रिप्लाई' पर क्लिक करें।\n3. 📎 अटैचमेंट या क्लिप आइकन पर टैप करें।\n4. 📍'लोकेशन' चुनें।\n5. ✅ 'अपनी वर्तमान लोकेशन भेजें' का चयन करें।",
    },
    attendanceLocation: {
      message: () => "📸 उपस्थिति के लिए, अपने स्थान की पृष्ठभूमि के साथ एक सेल्फी भेजें।",
    },
    clickAttendanceLocation: {
      message: () =>
        "*⚠️ सीधे न भेजें*। पहले सुनिश्चित करें कि आप *जवाब दे रहे हैं*, फिर 'अपना वर्तमान स्थान भेजें' चुनें।\n📍 अपना वर्तमान स्थान शेयर करने के लिए ये कदम अपनाएं:\n1. 📩 इस मैसेज को चुनें।\n2. 💬 'रिप्लाई' पर क्लिक करें।\n3. 📎 अटैचमेंट या क्लिप आइकन टैप करें।\n4. 📍 'लोकेशन' चुनें।",
    },
    attendancePic: {
      message: () => "📸 कृपया अपनी सेल्फी तस्वीर भेजें 🤳.",
    },
    startLeaveRequest: {
      message: () =>
        "हमने उपस्थिति चिन्हित करने का प्रदर्शन सफलतापूर्वक पूरा कर लिया है।\n अगला प्रदर्शन यह होगा कि कर्मचारी कैसे *छुट्टी की मांग* कर सकते हैं।",
      buttons: [{ id: "requestLeave", title: "Start Request Leave" }],
    },
    Report: {
      message: () => "अपनी वर्तमान महीने की रिपोर्ट या पिछले महीने की रिपोर्ट डाउनलोड करें।",
      buttons: [
        {
          id: "currentMonth",
          title: "चलता महीना",
        },
        {
          id: "previousMonth",
          title: "पिछला महीना",
        },
      ],
    },
    Other: {
      message: () =>
        "नमस्ते! आज हम आपकी कैसे सहायता कर सकते हैं? कृपया निम्नलिखित विकल्पों में से चयन करें.",
      buttons: [
        {
          id: "requestLeave",
          title: "अवकाश का अनुरोध",
        },
        {
          id: "support",
          title: "समर्थन",
        },
        // {
        //   id: 'question',
        //   title: 'सवाल पूछें',
        // },
      ],
    },
    requestLeave: {
      message: () =>
        "थोड़ा ब्रेक लेने का सोच रहे हैं?\nकृपया हमें बताएं कि आप कितने दिनों की छुट्टी चाहते हैं:",
      buttons: [
        { id: "oneDay", title: "एक दिन" },
        { id: "moreThanOneDay", title: "एक दिन से अधिक" },
      ],
    },
    oneDay: {
      message: () => ({
        body: "नीचे बटन पर क्लिक करके तारीख और कारण बताएं",
        label: {
          title: "छुट्टी का अनुरोध करें",
          startdatelabel: "प्रारंभ तिथि",
          enddatelabel: "समाप्ति तिथि",
          reasonlabel: "अवकाश का कारण",
        },
      }),
    },
    moreThanOneDay: {
      message: () => ({
        body: "नीचे बटन पर क्लिक करके तारीख और कारण बताएं",
        label: {
          title: "छुट्टी का अनुरोध करें",
          startdatelabel: "प्रारंभ तिथि",
          enddatelabel: "समाप्ति तिथि",
          reasonlabel: "अवकाश का कारण",
        },
      }),
    },
    leaveSummary: {
      message: (
        employeeName,
        department,
        leaveType,
        startDate,
        endDate,
        reasonForLeave,
        ticketNumber,
        recipientPhone
      ) =>
        `नाम: *${employeeName}*\nविभाग: *${
          department ?? "-"
        }*\nके लिए: *Request Leave*\nछुट्टी का प्रकार: *${leaveType}*\nप्रारंभ तिथि: *${startDate}*\n${
          endDate !== "Invalid Date" ? `समाप्ति तिथि: *${endDate}*\n` : ""
        }कारण: *${reasonForLeave}*\n*मोबाइल नंबर : *${recipientPhone}* \nटिकट नंबर: *${ticketNumber}*`,
    },
    startSupport: {
      message: () =>
        "हमने सफलतापूर्वक छुट्टी के लिए अनुरोध का प्रदर्शन पूरा किया है। \n अगला प्रदर्शन यह होगा कि आपका कर्मचारी कैसे टिकट उठा सकता है।",
      buttons: [{ id: "support", title: "समर्थन" }],
    },
    support: {
      message: () =>
        "नया टिकट खोलें \n आप नीचे दिए गए मुद्दे के प्रकारों पर क्लिक करके टिकट उठा सकते हैं",
      buttons: [
        { id: "checkIn", title: "चेकइन और चेकआउट" },
        { id: "Salary_Issue", title: "वेतन समस्या" },
        { id: "other_issue", title: "अन्य" },
      ],
    },
    checkIn: {
      message: () => "कृपया अपनी टिप्पणी टाइप करें।",
    },
    checkOut: {
      message: () => "कृपया अपनी टिप्पणी टाइप करें।",
    },
    other_issue: {
      message: () => "कृपया अपनी टिप्पणी टाइप करें।",
    },
    Salary_Issue: {
      message: () => "कृपया अपनी टिप्पणी टाइप करें।",
    },
    employeeIssue: {
      message: () => "कृपया अपनी टिप्पणी टाइप करें।",
    },
    registerComplain: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `नाम: *${name}*\nविभाग: *${
          department ?? "-"
        }*\nके लिए: *समर्थन*\nसमस्या: *${problem}*\nटिप्पणी: *${message}*\nनंबर: *${recipientPhone}*\nटिकट नंबर: *${ticketNumber}*`,
    },
    employeeReportStart: {
      message: () =>
        "हमने कर्मचारियों द्वारा सहायता टिकट उठाने का कार्य सफलतापूर्वक पूरा कर लिया है।\nअगले बेसिक *रिपोर्ट्स* हैं जो कर्मचारी देख सकते हैं",
      buttons: [
        {
          title: "चालू महीना",
          id: "employe_report1",
        },
      ],
    },
    employerDemoStart: {
      message: () =>
        "हमने कर्मचारी डेमो पूरा कर लिया है\nअगला - *नियोक्ता डेमो*:\n   a. 📑 रिपोर्ट्स देखें\n   b.  कर्मचारी सूची देखें\n   c. ✍️ छुट्टी के अनुरोधों को मंजूर करें\n   d. ❌ टिकट्स का समाधान करें",
      buttons: [{ id: "isEmployer", title: "नियोक्ता डेमो" }],
    },
    employerReports: {
      message: () =>
        "नियोक्ता के लिए पहली सुविधा रिपोर्ट्स हैं।\nनीचे नियोक्ता के लिए कुछ रिपोर्ट्स दी गई हैं।",
      buttons: [
        {
          id: "liveReport",
          title: "लाइव रिपोर्ट",
        },
        {
          id: "emp_master_sheet",
          title: "कर्मचारी मास्टर शीट",
        },
      ],
    },
    liveReport: {
      message: () => "आइए नियोक्ता डेमो शुरू करें\nनीचे दिए गए किसी भी बटन पर क्लिक करें",
      buttons: [
        {
          title: "Tickets & Approvals",
          id: "approvals",
        },
      ],
    },
    emp_master_sheet: {
      message: () => "आइए नियोक्ता डेमो शुरू करें\nनीचे दिए गए किसी भी बटन पर क्लिक करें",
      buttons: [
        {
          title: "Tickets & Approvals",
          id: "approvals",
        },
      ],
    },
    approvals: {
      buttons: [
        { title: "अवकाश-मंजूरी", id: "leaveApprove" },
        { title: "सक्रिय समस्याएँ", id: "activeIssues" },
      ],
      message: () =>
        `नमस्ते,कृपया नीचे एक विकल्प चुनें:\n 1️⃣ पत्तों को मंजूरी देने के लिए।\n 2️⃣ आपके अनुमोदन की प्रतीक्षा में सक्रिय मुद्दों को देखने के लिए।\nआगे बढ़ने के लिए बस संबंधित बटन पर क्लिक करें!`,
    },
    leaveApprove: {
      message: () =>
        `*कर्मचारी की छुट्टी की सूचना दी गई*\nप्रिय नियोक्ता, एक कर्मचारी ने छुट्टी का अनुरोध किया है\n *टिकट नंबर: RL4545* \n *नाम*: राम \n *दिनांक*: 23/12/2023 \n *कारण* : शादी \n *प्रकार* : छुट्टी का अनुरोध करें`,
      buttons: [
        { title: "मंज़ूरी देना", id: "request_approve" },
        { title: "अस्वीकार करना", id: "request_reject" },
        { title: "रोकना", id: "request_hold" },
      ],
    },
    activeIssues: {
      message: () =>
        `*कर्मचारी समस्या रिपोर्ट*\nप्रिय नियोक्ता, एक कर्मचारी द्वारा रिपोर्ट की गई एक समस्या है:\n *कर्मचारी का नाम* : दिखावा \n *मुद्दा* : वेतन \n *समस्या विवरण* : वेतन कम जमा किया गया\nकृपया उचित कार्रवाई करें इस चिंता का समाधान करने के लिए.`,
      buttons: [
        { title: "मंज़ूरी देना", id: "issue_approve" },
        { title: "अस्वीकार करना", id: "issue_reject" },
        { title: "रोकना", id: "issue_hold" },
      ],
    },
    issue_approve: {
      message: () =>
        "स्थिति अपडेट: स्वीकृत\nहमें आपको यह बताते हुए खुशी हो रही है कि आपका अनुरोध/आवेदन स्वीकृत हो गया है!\nआपके धैर्य और सहयोग के लिए धन्यवाद।",
    },
    issue_reject: {
      message: () =>
        "स्थिति अद्यतन: अस्वीकृत \nहमें आपको यह बताते हुए खेद है कि आपका अनुरोध/आवेदन अस्वीकार कर दिया गया है।\nहम आपकी समझ की सराहना करते हैं।",
    },
    issue_hold: {
      message: () =>
        "स्थिति अपडेट: होल्ड पर \nजब तक हम स्थिति की समीक्षा और आकलन कर रहे हैं, आपका अनुरोध/आवेदन फिलहाल होल्ड पर है।\nहम इस दौरान आपके धैर्य की सराहना करते हैं।",
    },
    request_: {
      message: () =>
        "*छुट्टी अनुरोध अपडेट*\nआपका छुट्टी अनुरोध अब अपडेट कर दिया गया है। हमारी छुट्टी प्रबंधन प्रणाली का उपयोग करने के लिए धन्यवाद।",
    },
    request_approve: {
      message: () => "",
    },
    request_reject: {
      message: () => "",
    },
    request_hold: {
      message: () => "",
    },
    signupStart: {
      message: () =>
        "अब हमने दोनों डेमो पूरा कर लिया है। अब आप 7 दिनों के मुफ्त परीक्षण का लाभ उठा सकते हैं। परीक्षण की अवधि के बाद, हमारे सदस्यता योजनाएं निम्नलिखित हैं:\n\n20 कर्मचारियों के लिए ₹399 प्रतिमाह।\n10 कर्मचारियों के लिए ₹299 प्रतिमाह।\n\nकिसी भी पूछताछ या सहायता के लिए, कृपया हमसे WhatsApp पर संपर्क करें: +918369644748। हम आपके रुचि की कद्र करते हैं और आपको उत्कृष्ट सेवा प्रदान करने की उम्मीद करते हैं।",
      buttons: [{ id: "signup", title: "मुफ्त परीक्षण लें" }],
    },
    signup: {
      message: () => ({
        body: "साइन अप' बटन पर क्लिक करके और फॉर्म भरकर साइन अप करें।",
        label: {
          title: "साइन अप",
          namelabel: "पूरा नाम",
          companylabel: "कंपनी का नाम",
          bufferlabel: "बफर इन/आउट मिनट्स",
        },
      }),
    },
    uploadEmployee: {
      message: () => "कृपया अपने कर्मचारियों के सम्पूर्ण संपर्कों की सूची को अपलोड करें।",
    },
    addEmployee: {
      message: (employeeName, employeeNumber, timing, geofen) =>
        `जोड़ा गया है:\n*नाम*: ${employeeName}\n*नंबर*: ${employeeNumber}\n*प्रकार*: ${timing}\n*जियोफेंसिंग*: ${geofen}`,
    },
    ticketUpdate: {
      message: (ticketNumber) =>
        `टिकट नंबर: ${ticketNumber} की स्थिति को सफलतापूर्वक अपडेट किया गया है`,
    },
    employeeDemoStart: {
      buttons: [{ id: "MarkAttendance", title: "उपस्थिति मार्क करें" }],

      message: () =>
        "1️⃣ *कर्मचारी डेमो चरण*:\n   a. ✅ उपस्थिति चिह्नित करें\n   b. 🙋 अवकाश का अनुरोध करें\n   c. 🎫 टिकट जारी करें\n   d. 📊 रिपोर्ट देखें\n2️⃣ *नियोक्ता डेमो चरण* (कर्मचारी डेमो चरणों को पूरा करने के बाद)",
    },
    employerStart: {
      message: () =>
        `नमस्ते, कृपया निम्नलिखित विकल्पों में से एक विकल्प चुनें:\n\n1️⃣। रिपोर्ट प्राप्त करें: विस्तृत रिपोर्ट प्राप्त करने के लिए इस बटन पर क्लिक करें..\n2️⃣. स्वीकृतियाँ: कर्मचारी अवकाश स्वीकृतियों की जाँच या प्रबंधन करने की आवश्यकता है? नेविगेट करने के लिए इस बटन का उपयोग करें।\n3️⃣. प्रोफ़ाइल/सेटिंग्स: अपनी प्रोफ़ाइल और सेटिंग्स यहां प्रबंधित करें।'`,
      buttons: [
        { id: "employerReports", title: "रिपोर्ट-प्राप्त करें" },
        { id: "approvals", title: "मंजूरियां" },
        { id: "profile-settings", title: "पार्श्वचित्र समायोजन" },
      ],
    },
  },
  Bengali: {
    hi: {
      message: (name) =>
        `হ্যালো ${name} 👋\n\n আমি আপনার সুখবর জনক উপস্থিতি বট, আপনাকে সাহায্য করতে। 🤖 \n চলুন শুরু করা যাক। ✨`,
      buttons: [
        {
          id: "MarkAttendance",
          title: "মার্ক উপস্থিতি✅",
        },
        {
          id: "Report",
          title: "রিপোর্ট✉️",
        },
        {
          id: "Other",
          title: "অন্যান্য🔄",
        },
      ],
    },
    startempdemo: {
      message: () =>
        "চলুন শুরু করি এই অনুসরণ করে সেই ক্রমবিক্রম প্রক্রিয়া সম্বর্থনে যাত্রা করি যা আপনি *উপস্থিতি* চিহ্নিত করতে সময অনুসরণ করবেন। \n 📣 সাইন-আপ করার পর, আপনি আপনার মূল্যায়িত সেটিংসে ভৌগোলিক সীমাংকন (জিও-ফেন্সিং) কনফিগার করতে পারেন, যা করে নিশ্চিত হয় যে স্থান-বিশেষ কর্মী ম্যাপিং হয়।",
      buttons: [{ id: "mark_attendance", title: "উপস্থিতি চিহ্ন" }],
    },
    MarkAttendance: {
      message: () =>
        "*পদক্ষেপ 1- উপস্থিতি চিহ্নিত করুন*\n - তাদের কর্মদিবসের শুরু চিহ্নিত করতে, কর্মীরা    [ভিতরে]-এ ক্লিক করবেন।\n- তাদের কর্মদিবসের সমাপ্তি নির্দেশ করতে, তারা 🔴 [আউট] নির্বাচন করবে।",
      buttons: [
        { id: "in", title: "🟢 ভিতরে" },
        { id: "out", title: "🔴 আউট" },
      ],
    },
    in: {
      message: () =>
        "*অবস্থান* \n📍 অনুগ্রহ করে এই ধাপগুলি অনুসরণ করে আপনার বর্তমান অবস্থান শেয়ার করুন:\n1. 📩 এই মেসেজটি বেছে নিন।\n2. 💬 'উত্তর দিন' ক্লিক করুন।\n3. 📎 অ্যাটাচমেন্ট বা ক্লিপ আইকনে ট্যাপ করুন।\n৪. 📍 'অবস্থান' নির্বাচন করুন।\n৫. ✅ 'আপনার বর্তমান অবস্থান পাঠান' বেছে নিন .",
    },
    out: {
      message: () =>
        "*অবস্থান* \n📍 অনুগ্রহ করে এই ধাপগুলি অনুসরণ করে আপনার বর্তমান অবস্থান শেয়ার করুন:\n1. 📩 এই মেসেজটি বেছে নিন।\n2. 💬 'উত্তর দিন' ক্লিক করুন।\n3. 📎 অ্যাটাচমেন্ট বা ক্লিপ আইকনে ট্যাপ করুন।\n৪. 📍 'অবস্থান' নির্বাচন করুন।\n৫. ✅ 'আপনার বর্তমান অবস্থান পাঠান' বেছে নিন .",
    },
    attendanceLocation: {
      message: () => `📸 উপস্থিতির জন্য, আপনার অবস্থান দেখানো সেলফি পাঠান।`,
    },
    clickAttendanceLocation: {
      message: () => `*⚠️ সরাসরি পাঠাবেন না*। 'লোকেশন' নির্বাচন করুন।`,
    },
    attendancePic: {
      message: () => "📸 আপনার একটি সেলফি ছবি পাঠান 🤳।",
    },
    startLeaveRequest: {
      message: () =>
        "আমরা সফলভাবে উপস্থিতি ডেমো চিহ্নিতকরণ সম্পন্ন করেছি।\nপরবর্তী ডেমো হল কীভাবে আপনার কর্মচারী *ছুটির অনুরোধ করতে পারেন*",
      buttons: [{ id: "requestLeave", title: "Start Request Leave" }],
    },
    Report: {
      message: () => "আপনার বর্তমান মাসের রিপোর্ট অথবা আগের মাসের রিপোর্ট ডাউনলোড করুন।",
      buttons: [
        {
          id: "currentMonth",
          title: "চলতি মাস",
        },
        {
          id: "previousMonth",
          title: "পূর্ববর্তী মাস",
        },
      ],
    },
    Other: {
      message: () =>
        "হ্যালো! আজকে আমরা আপনাদের কীভাবে সাহায্য করতে পারি? দয়া করে নিম্নলিখিত বিকল্পগুলি থেকে চয়ন করুন।",
      buttons: [
        {
          id: "requestLeave",
          title: "ইজারা অনুরোধ",
        },
        {
          id: "support",
          title: "সাহায্য",
        },
        // {
        //   id: 'question',
        //   title: 'প্রশ্ন করুন',
        // },
      ],
    },
    requestLeave: {
      message: () =>
        "একটু বিরতি নেওয়ার কথা ভাবছেন?\nঅনুগ্রহ করে আমাদের জানান আপনি কত দিনের ছুটির অনুরোধ করতে চান:",
      buttons: [
        { id: "oneDay", title: "এক দিন" },
        { id: "moreThanOneDay", title: "একদিনের বেশি" },
      ],
    },
    oneDay: {
      message: () => ({
        body: "নির্দিষ্ট তারিখ ও কারণ নির্বাচন করুন",
        label: {
          title: "অবকাশের অনুরোধ",
          startdatelabel: "শুরুর তারিখ",
          enddatelabel: "শেষ তারিখ",
          reasonlabel: "অবকাশের কারণ",
        },
      }),
    },
    moreThanOneDay: {
      message: () => ({
        body: "নির্দিষ্ট তারিখ ও কারণ নির্বাচন করুন",
        label: {
          title: "অবকাশের অনুরোধ",
          startdatelabel: "শুরুর তারিখ",
          enddatelabel: "শেষ তারিখ",
          reasonlabel: "অবকাশের কারণ",
        },
      }),
    },
    leaveSummary: {
      message: (
        employeeName,
        department,
        leaveType,
        startDate,
        endDate,
        reasonForLeave,
        ticketNumber,
        recipientPhone
      ) =>
        `নাম: *${employeeName}*\nবিভাগ: *${
          department ?? "-"
        }*\nজন্য: *ছুটি চাওয়া*\nছুটির ধরণ: *${leaveType}*\nশুরুর তারিখ: *${startDate}*\n${
          endDate !== "Invalid Date" ? `শেষ তারিখ: *${endDate}*\n` : ""
        }কারণ: *${reasonForLeave}*\nফোন নম্বর: *${recipientPhone}*\nটিকেট নম্বর: *${ticketNumber}*`,
    },
    startSupport: {
      message: () =>
        "আমরা সফলভাবে ছুটির জন্য অনুরোধ ডেমো সম্পন্ন করেছি। \n পরবর্তী ডেমো হল- আপনার কর্মী কীভাবে টিকিট উত্থাপন করতে পারেন",
      buttons: [{ id: "support", title: "সাপোর্ট" }],
    },
    support: {
      message: () => "*টিকিট বাড়ান* \n আপনি নিচের ইস্যু প্রকারে ক্লিক করে টিকিট বাড়াতে পারবেন",
      buttons: [
        { id: "checkIn", title: "চেকইন ও চেকআউট" },
        { id: "Salary_Issue", title: "বেতন সমস্যা" },
        { id: "other_issue", title: "অন্যান্য" },
      ],
    },
    checkIn: {
      message: () => "আপনার মন্তব্য টাইপ করুন",
    },
    checkOut: {
      message: () => "আপনার মন্তব্য টাইপ করুন",
    },
    other_issue: {
      message: () => "আপনার মন্তব্য টাইপ করুন",
    },
    Salary_Issue: {
      message: () => "আপনার মন্তব্য টাইপ করুন",
    },
    employeeIssue: {
      message: () => "আপনার মন্তব্য টাইপ করুন",
    },
    registerComplain: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `নাম: *${name}*\nবিভাগ: *${
          department ?? "-"
        }*\nজন্য: *সহায়*\nসমস্যা: *${problem}*\nমন্তব্য: *${message}*\nনম্বর: *${recipientPhone}*\nটিকেট নম্বর: *${ticketNumber}*`,
    },
    employeeReportStart: {
      message: () =>
        "আমরা সফলভাবে কর্মচারী দ্বারা সাপোর্ট টিকিট বৃদ্ধি সম্পন্ন করেছি\nপরবর্তী - মৌলিক *রিপোর্ট* যা কর্মচারী দেখতে পাবে",
      buttons: [
        {
          title: "বর্তমান মাস",
          id: "  employe_report1",
        },
      ],
    },
    employerDemoStart: {
      message: () =>
        "আমরা কর্মচারী ডেমো সম্পন্ন করেছি\nপরবর্তী - *নিয়োক্তা ডেমো*:\na. 📑 রিপোর্ট দেখুন\nb.  কর্মচারী তালিকা দেখুন\nc. ✍️ অনুমোদন ছুটি অনুরোধ\nd. ❌ টিকেট সমাধান করুন",
      buttons: [{ id: "isEmployer", title: "কর্মচারী ডেমো শুরু" }],
    },
    employerReports: {
      message: () =>
        "নিয়োগকর্তার জন্য প্রথম বৈশিষ্ট্য হল রিপোর্ট।\nনিচে নিয়োগকর্তার জন্য কিছু মৌলিক *রিপোর্ট* দেওয়া হল",
      buttons: [
        {
          id: "liveReport",
          title: "লাইভ রিপোর্ট",
        },
        {
          id: "emp_master_sheet",
          title: "সমস্ত কর্মচারী দেখান",
        },
      ],
    },
    liveReport: {
      message: () => "অনুমোদনের নিয়োগকর্তা ডেমো শুরু করা যাক\nনিচের যে কোনো বোতামে ক্লিক করুন",
      buttons: [
        {
          title: "Tickets & Approvals",
          id: "approvals",
        },
      ],
    },
    emp_master_sheet: {
      message: () => "অনুমোদনের নিয়োগকর্তা ডেমো শুরু করা যাক\nনিচের যে কোনো বোতামে ক্লিক করুন",
      buttons: [
        {
          title: "Tickets & Approvals",
          id: "approvals",
        },
      ],
    },
    approvals: {
      buttons: [
        { title: "ছুটি - অনুমোদন", id: "leaveApprove" },
        { title: "সক্রিয়-ইস্যু", id: "activeIssues" },
      ],
      message: () =>
        `হ্যালো, অনুগ্রহ করে নীচের একটি বিকল্প নির্বাচন করুন:\n 1️⃣ পাতা অনুমোদনের জন্য।\n 2️⃣ আপনার অনুমোদনের জন্য অপেক্ষারত সক্রিয় সমস্যাগুলি দেখতে।\nশুধুমাত্র এগিয়ে যাওয়ার জন্য সংশ্লিষ্ট বোতামে ক্লিক করুন!`,
    },
    leaveApprove: {
      message: () =>
        `*কর্মচারীর ছুটির রিপোর্ট করা হয়েছে*\nপ্রিয় নিয়োগকর্তা, একজন কর্মচারীর একটি ছুটির অনুরোধ রয়েছে\n *টিকিট নম্বর: RL4545* \n *নাম*: Ram \n *তারিখ*: 23/12/2023 \n *কারণ* : বিবাহ \n *প্রকার* : ছুটির অনুরোধ করুন`,
      buttons: [
        { title: "অনুমোদন", id: "request_approve" },
        { title: "প্রত্যাখ্যান", id: "request_reject" },
        { title: "ধারণ করা", id: "request_hold" },
      ],
    },
    activeIssues: {
      message: () =>
        `*কর্মচারী ইস্যু রিপোর্ট*\nপ্রিয় নিয়োগকর্তা, একজন কর্মচারীর দ্বারা রিপোর্ট করা একটি সমস্যা আছে:\n *কর্মচারীর নাম* : শ্যাম \n *ইস্যু* : বেতন \n *ইস্যু বিবরণ* : বেতন কম জমা দেওয়া হয়েছে\nদয়া করে উপযুক্ত ব্যবস্থা নিন এই উদ্বেগ মোকাবেলা করতে।`,
      buttons: [
        { title: "অনুমোদন", id: "issue_approve" },
        { title: "প্রত্যাখ্যান", id: "issue_reject" },
        { title: "ধারণ করা", id: "issue_hold" },
      ],
    },
    issue_approve: {
      message: () =>
        "স্ট্যাটাস আপডেট: অনুমোদিত\nআমরা আপনাকে জানাতে পেরে আনন্দিত যে আপনার অনুরোধ/আবেদন অনুমোদিত হয়েছে!\nআপনার ধৈর্য এবং সহযোগিতার জন্য আপনাকে ধন্যবাদ।",
    },
    issue_reject: {
      message: () =>
        "স্ট্যাটাস আপডেট: প্রত্যাখ্যাত \nআমরা আপনাকে জানাতে দুঃখিত যে আপনার অনুরোধ/আবেদন প্রত্যাখ্যান করা হয়েছে।\nআমরা আপনার বোঝার প্রশংসা করি।",
    },
    issue_hold: {
      message: () =>
        "স্ট্যাটাস আপডেট: স্থগিত রাখা \nআমরা পরিস্থিতি পর্যালোচনা এবং মূল্যায়ন করার সময় আপনার অনুরোধ/আবেদন বর্তমানে আটকে আছে।\nএই সময়ে আমরা আপনার ধৈর্যের প্রশংসা করি।",
    },
    request_: {
      message: () =>
        "*লিভ রিকোয়েস্ট আপডেটেড*\nআপনার ছুটির অনুরোধ এখন আপডেট হয়েছে। আমাদের ছুটি ব্যবস্থাপনা সিস্টেম ব্যবহার করার জন্য ধন্যবাদ।",
    },
    request_approve: {
      message: () => "",
    },
    request_reject: {
      message: () => "",
    },
    request_hold: {
      message: () => "",
    },
    signupStart: {
      message: () =>
        "আমরা এখন উভয় ডেমো সম্পন্ন করেছি। ১ মাসের বিনামূল্যের ট্রায়ালের জন্য সাইন আপ করুন। ট্রায়াল শেষ হওয়ার পর: ২০ জন কর্মী পর্যন্ত মাত্র ৩৯৯ রুপি।",
      buttons: [{ id: "signup", title: "মুফতট্রায়াল সাইন আপ" }],
    },
    signup: {
      message: () => ({
        body: "'সাইন আপ' বোতামে ক্লিক করে এবং ফর্মটি পূরণ করে সাইন আপ করুন।",
        label: {
          title: "সাইন আপ",
          namelabel: "পুরো নাম",
          companylabel: "কোম্পানির নাম",
          bufferlabel: "বাফার ইন/আউট মিনিট",
        },
      }),
    },
    uploadEmployee: {
      message: () => "দয়া করে সমস্ত কর্মচারীর যোগাযোগ তথ্য আপলোড করুন।",
    },
    addEmployee: {
      message: (employeeName, employeeNumber, timing, geofen) =>
        `যোগ করতেছে:\n*নাম*: ${employeeName}\n*নম্বর*: ${employeeNumber}\n*ধরণ*: ${timing}\n*জিওফেনসিং*: ${geofen}`,
    },
    ticketUpdate: {
      message: (ticketNumber) => `টিকেট নং: ${ticketNumber} এর স্থিতি সফলভাবে আপডেট হয়েছে`,
    },
    employeeDemoStart: {
      buttons: [{ id: "MarkAttendance", title: "মার্ক উপস্থিতি" }],

      message: () =>
        "1️⃣ *কর্মী ডেমো পদক্ষেপ*:\n   a. ✅ উপস্থিতি চিহ্নিত করুন\n   b. 🙋 ছুটির অনুরোধ করুন\n   c. 🎫 টিকেট জারি করুন\n   d. 📊 রিপোর্ট দেখুন\n2️⃣ *নিয়োক্তা ডেমো পদক্ষেপ* (কর্মী ডেমো পদক্ষেপগুলি সম্পন্ন করার পরে)",
    },
    employerStart: {
      message: () =>
        "হ্যালো, দয়া করে নিম্নলিখিত পছন্দগুলির মধ্যে একটি চয়ন করুন:\n\n1️⃣. রিপোর্ট পান: একটি বিস্তারিত রিপোর্ট পেতে এই বোতামটি ক্লিক করুন।\n2️⃣. অনুমোদন: কর্মীদের অনুমোদনের যাচাই করতে বা পরিচালনা করতে এই বোতামটি ব্যবহার করুন।\n3️⃣ প্রোফাইল/সেটিংস: এখানে আপনার প্রোফাইল এবং সেটিংস পরিচালনা করুন।",
      buttons: [
        { id: "employerReports", title: "রিপোর্ট পান" },
        { id: "approvals", title: "অনুমোদন" },
        { id: "profile-settings", title: "প্রোফাইল সেটিংস" },
      ],
    },
  },
  Telugu: {
    hi: {
      message: (name) =>
        `హలో ${name} 👋\n\n నాకు మీ సౌహార్దమైన అటెండన్స్ బాట్, మీకు సహాయపడటానికి ఇక్కడ ఉన్నాను.🤖 \n మొదటి అవును ప్రారంభించాలి.✨`,
      buttons: [
        {
          id: "MarkAttendance",
          title: "హాజరు ఇవ్వండి✅",
        },
        {
          id: "Report",
          title: "నివేదిక✉️",
        },
        {
          id: "Other",
          title: "ఇతర🔄",
        },
      ],
    },
    startempdemo: {
      message: () =>
        "*హాజరు గుర్తించడానికి దశల వారీ ప్రక్రియను ప్రారంభిద్దాం.* \n 📣 సైన్అప్ తర్వాత, మీరు మీ మాస్టర్ సెట్టింగ్‌లలో జియో-ఫెన్సింగ్‌ను కాన్ఫిగర్ చేయగల సామర్థ్యాన్ని కలిగి ఉంటారు, లొకేషన్-నిర్దిష్ట ఉద్యోగి మ్యాపింగ్‌ను నిర్ధారిస్తారు.",
      buttons: [{ id: "mark_attendance", title: "హాజరు చేయండి" }],
    },
    MarkAttendance: {
      message: () =>
        "*దశ 1- హాజరును గుర్తించండి*\n - వారి పనిదినం ప్రారంభానికి గుర్తుగా, ఉద్యోగులు [లో]పై క్లిక్ చేస్తారు.\n- వారి పనిదినం ముగింపును సూచించడానికి, వారు 🔴 [బయటకు]ని ఎంచుకుంటారు.",
      buttons: [
        { id: "in", title: "🟢 లో" },
        { id: "out", title: "🔴 బయటకు" },
      ],
    },
    in: {
      message: () =>
        "*స్థానం* \n📍 దయచేసి ఈ దశలను అనుసరించడం ద్వారా మీ ప్రస్తుత స్థానాన్ని భాగస్వామ్యం చేయండి:\n1. 📩 ఈ సందేశాన్ని ఎంచుకోండి.\n2. 💬 'ప్రత్యుత్తరం' క్లిక్ చేయండి.\n3. 📎 జోడింపు లేదా క్లిప్ చిహ్నాన్ని నొక్కండి.\n4. 📍'స్థానం'ని ఎంచుకోండి.\n5. ✅ 'మీ ప్రస్తుత స్థానాన్ని పంపండి' ఎంచుకోండి.",
    },
    out: {
      message: () =>
        "*స్థానం* \n📍 దయచేసి ఈ దశలను అనుసరించడం ద్వారా మీ ప్రస్తుత స్థానాన్ని భాగస్వామ్యం చేయండి:\n1. 📩 ఈ సందేశాన్ని ఎంచుకోండి.\n2. 💬 'ప్రత్యుత్తరం' క్లిక్ చేయండి.\n3. 📎 జోడింపు లేదా క్లిప్ చిహ్నాన్ని నొక్కండి.\n4. 📍'స్థానం'ని ఎంచుకోండి.\n5. ✅ 'మీ ప్రస్తుత స్థానాన్ని పంపండి' ఎంచుకోండి.",
    },
    attendanceLocation: {
      message: () => "📸 హాజరు కోసం, మీ స్థానం నేపథ్యంలో ఉన్న మీ సెల్ఫీని పంపండి.",
    },
    clickAttendanceLocation: {
      message: () =>
        "*⚠️ నేరుగా పంపవద్దు* . మొదట *ప్రతిస్పందన* ఇచ్చి, తరువాత 'మీ ప్రస్తుత స్థానం పంపండి' ఎంచుకోండి.\n📍 ఈ క్రింది అడుగులు అనుసరించి మీ ప్రస్తుత స్థానాన్ని పంచుకోండి:\n1. 📩 ఈ సందేశం ఎంచుకోండి.\n2. 💬 'ప్రతిస్పందన' పై క్లిక్ చేయండి.\n3. 📎 జతపరచు లేదా క్లిప్ చిహ్నాన్ని నొక్కండి.\n4. 📍 'స్థానం' ఎంచుకోండి.",
    },
    attendancePic: {
      message: () => "📸 మీ సెల్ఫీ ఫొటోను పంపండి 🤳.",
    },
    startLeaveRequest: {
      message: () =>
        "మేము హాజరు డెమోను గుర్తించడాన్ని విజయవంతంగా పూర్తి చేసాము.\nతదుపరి డెమో మీ ఉద్యోగి *సెలవును అభ్యర్థించవచ్చు*",
      buttons: [{ id: "requestLeave", title: "Start Request Leave" }],
    },
    Report: {
      message: () => "మీ ప్రస్తుతం నెల నివేదిక లేదా మొదట నెల నివేదికను డౌన్‌లోడ్ చేయండి.",
      buttons: [
        {
          id: "currentMonth",
          title: "ప్రస్తుతం",
        },
        {
          id: "previousMonth",
          title: "గత నెల",
        },
      ],
    },
    Other: {
      message: () =>
        "హలో! ఈ రోజు మేము మీకు ఎలా సహాయించగలము? దయచేసి కింది ఎంపికల నుండి ఒకటిని ఎంపిక చేయండి.",
      buttons: [
        {
          id: "requestLeave",
          title: "రిక్వెస్ట్ అవకాశం",
        },
        {
          id: "support",
          title: "సహాయం",
        },
        // {
        //   id: 'question',
        //   title: 'ప్రశ్నించండి',
        // },
      ],
    },
    requestLeave: {
      message: () =>
        "కొంచెం విరామం తీసుకోవాలని ఆలోచిస్తున్నారా?\nదయచేసి మీరు ఎన్ని రోజులు ఆఫ్ రిక్వెస్ట్ చేయాలనుకుంటున్నారో మాకు తెలియజేయండి:",
      buttons: [
        { id: "oneDay", title: "ఒక రోజు" },
        { id: "moreThanOneDay", title: "ఒక రోజు కంటే ఎక్కువ" },
      ],
    },
    oneDay: {
      message: () => ({
        body: "దయచేసి తేదీ మరియు కారణాన్ని పొందడానికి దగ్గరగా ఉంచండి",
        label: {
          title: "అవకాశం అభ్యర్థన",
          startdatelabel: "ప్రారంభం తేదీ",
          enddatelabel: "అంతం తేదీ",
          reasonlabel: "అవకాశం కారణం",
        },
      }),
    },
    moreThanOneDay: {
      message: () => ({
        body: "దయచేసి తేదీ మరియు కారణాన్ని పొందడానికి దగ్గరగా ఉంచండి",
        label: {
          title: "అవకాశం అభ్యర్థన",
          startdatelabel: "ప్రారంభం తేదీ",
          enddatelabel: "అంతం తేదీ",
          reasonlabel: "అవకాశం కారణం",
        },
      }),
    },
    leaveSummary: {
      message: (
        employeeName,
        department,
        leaveType,
        startDate,
        endDate,
        reasonForLeave,
        ticketNumber,
        recipientPhone
      ) =>
        `పేరు: *${employeeName}*\nవిభాగం: *${
          department ?? "-"
        }*\nకోసం: *లీవ్ అభ్యర్థన*\nలీవ్ రకం: *${leaveType}*\nప్రారంభ తేదీ: *${startDate}*\n${
          endDate !== "Invalid Date" ? `ముగింపు తేదీ: *${endDate}*\n` : ""
        }కారణం: *${reasonForLeave}*\nఫోన్ సంఖ్య: *${recipientPhone}*\nటికెట్ సంఖ్య: *${ticketNumber}*`,
    },
    startSupport: {
      message: () =>
        "మేము విజయవంతంగా సెలవు అభ్యర్థన డెమోను పూర్తి చేసాము. \n తరువాత డెమో ఇది - మీ ఉద్యోగి ఎలా టికెట్ పెంచవచ్చు",
      buttons: [{ id: "support", title: "సపోర్ట్" }],
    },
    support: {
      message: () =>
        "*టికెట్‌ని పెంచండి* \n దిగువన ఉన్న ఇష్యూ రకాలను క్లిక్ చేయడం ద్వారా మీరు టిక్కెట్‌ను పెంచుకోవచ్చు",
      buttons: [
        { id: "checkIn", title: "చెక్‌ఇన్‌ & అవుట్‌" },
        { id: "Salary_Issue", title: "జీతం సమస్య" },
        { id: "other_issue", title: "ఇతర" },
      ],
    },
    checkIn: {
      message: () => "దయచేసి మీ వ్యాఖ్యను టైప్ చేయండి",
    },
    checkOut: {
      message: () => "దయచేసి మీ వ్యాఖ్యను టైప్ చేయండి",
    },
    other_issue: {
      message: () => "దయచేసి మీ వ్యాఖ్యను టైప్ చేయండి",
    },
    Salary_Issue: {
      message: () => "దయచేసి మీ వ్యాఖ్యను టైప్ చేయండి",
    },
    employeeIssue: {
      message: () => "దయచేసి మీ వ్యాఖ్యను టైప్ చేయండి",
    },
    registerComplain: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `పేరు: *${name}*\nవిభాగం: *${
          department ?? "-"
        }*\nకోసం: *మద్దతు*\nసమస్య: *${problem}*\nవ్యాఖ్య: *${message}*\nసంఖ్య: *${recipientPhone}*\nటికెట్ సంఖ్య: *${ticketNumber}*`,
    },
    employeeReportStart: {
      message: () =>
        "మేము ఉద్యోగి ద్వారా సేకరించే మద్దతు టిక్కెట్‌లను విజయవంతంగా పూర్తి చేసాము\nతదుపరి - ఉద్యోగి చూడగలిగే ప్రాథమిక *నివేదికలు*",
      buttons: [
        {
          title: "ప్రస్తుత నెల",
          id: "  employe_report1",
        },
      ],
    },
    employerDemoStart: {
      message: () =>
        "మేము ఉద్యోగి డెమో పూర్తి చేసాము\nతరువాత - *పనితన డెమో*:\na. 📑 నివేదికలు చూడండి\nb. ఉద్యోగి జాబితా చూడండి\nc. ✍️ అవకాశాల అనుమోదనలు ఇవ్వండి\nd. ❌ టికెట్లను పరిష్కరించండి",
      buttons: [{ id: "isEmployer", title: "ఉద్యోగి డెమో ప్రారభి" }],
    },
    employerReports: {
      message: () =>
        "యజమాని కోసం మొదటి ఫీచర్ రిపోర్ట్‌లు.\nఎంప్లాయర్ కోసం కొన్ని ప్రాథమిక *నివేదికలు* క్రింద ఉన్నాయి",
      buttons: [
        {
          id: "liveReport",
          title: "లైవ్ రిపోర్ట్",
        },
        {
          id: "emp_master_sheet",
          title: "ఉద్యోగులు నివేదిక",
        },
      ],
    },
    liveReport: {
      message: () => "ఆమోదాల యజమాని డెమోను ప్రారంభిద్దాం\nక్రింది బటన్‌లో దేనినైనా క్లిక్ చేయండి",
      buttons: [
        {
          title: "Tickets & Approvals",
          id: "approvals",
        },
      ],
    },
    emp_master_sheet: {
      message: () => "ఆమోదాల యజమాని డెమోను ప్రారంభిద్దాం\nక్రింది బటన్‌లో దేనినైనా క్లిక్ చేయండి",
      buttons: [
        {
          title: "Tickets & Approvals",
          id: "approvals",
        },
      ],
    },
    approvals: {
      buttons: [
        { title: "వదిలి-ఆమోదించండి", id: "leaveApprove" },
        { title: "యాక్టివ్-సమస్య", id: "activeIssues" },
      ],
      message: () =>
        `హలో, దయచేసి దిగువన ఒక ఎంపికను ఎంచుకోండి:\n 1️⃣ లీవ్‌లను ఆమోదించడానికి.\n 2️⃣ మీ ఆమోదం కోసం వేచి ఉన్న సక్రియ సమస్యలను వీక్షించడానికి.\nకొనసాగించడానికి సంబంధిత బటన్‌పై క్లిక్ చేయండి!`,
    },
    leaveApprove: {
      message: () =>
        `*ఉద్యోగి సెలవు నివేదించబడింది*\nప్రియమైన యజమాని, ఒక ఉద్యోగి ద్వారా సెలవు అభ్యర్థన ఉంది\n *టికెట్ నంబర్: RL4545* \n *పేరు*: రామ్ \n *తేదీలు*: 23/12/2023 \n *కారణం* : వివాహ \n *రకం* : సెలవు అభ్యర్థన`,
      buttons: [
        { title: "ఆమోదించడానికి", id: "request_approve" },
        { title: "తిరస్కరించు", id: "request_reject" },
        { title: "పట్టుకోండి", id: "request_hold" },
      ],
    },
    activeIssues: {
      message: () =>
        `*ఉద్యోగి ఇష్యూ రిపోర్ట్*\nప్రియమైన యజమాని, ఒక ఉద్యోగి ద్వారా ఒక సమస్య నివేదించబడింది:\n *ఉద్యోగి పేరు* : షామ్ \n *సమస్య* : జీతం \n *సమస్య వివరణ* : జీతం తక్కువ జమ చేయబడింది\nదయచేసి తగిన చర్య తీసుకోండి ఈ ఆందోళనను పరిష్కరించడానికి.`,
      buttons: [
        { title: "ఆమోదించడానికి", id: "issue_approve" },
        { title: "తిరస్కరించు", id: "issue_reject" },
        { title: "పట్టుకోండి", id: "issue_hold" },
      ],
    },
    issue_approve: {
      message: () =>
        "స్థితి అప్‌డేట్: ఆమోదించబడింది\nమీ అభ్యర్థన/అప్లికేషన్ ఆమోదించబడిందని మీకు తెలియజేయడానికి మేము సంతోషిస్తున్నాము!\nమీ సహనానికి మరియు సహకారానికి ధన్యవాదాలు.",
    },
    issue_reject: {
      message: () =>
        "స్థితి అప్‌డేట్: తిరస్కరించబడింది \nమీ అభ్యర్థన/అప్లికేషన్ తిరస్కరించబడిందని మీకు తెలియజేయడానికి మేము చింతిస్తున్నాము.\nమీ అవగాహనను మేము అభినందిస్తున్నాము.",
    },
    issue_hold: {
      message: () =>
        "స్టేటస్ అప్‌డేట్: హోల్డ్‌లో ఉంది \nమేము పరిస్థితిని సమీక్షించి, అంచనా వేసేటప్పుడు మీ అభ్యర్థన/అప్లికేషన్ ప్రస్తుతం హోల్డ్‌లో ఉంది.\nఈ సమయంలో మీ సహనానికి మేము అభినందిస్తున్నాము.",
    },
    request_: {
      message: () =>
        "*లీవ్ రిక్వెస్ట్ అప్‌డేట్*\nమీ సెలవు అభ్యర్థనను ఇప్పుడు అప్‌డేట్ చేయబడింది. మా లీవ్ మేనేజ్‌మెంట్ సిస్టమ్‌ని ఉపయోగించినందుకు ధన్యవాదాలు।",
    },
    request_approve: {
      message: () => "",
    },
    request_reject: {
      message: () => "",
    },
    request_hold: {
      message: () => "",
    },
    signupStart: {
      message: () =>
        "మేము ఇప్పుడు రెండు డెమోలను పూర్తి చేసాము. 1 నెల ఉచిత ట్రయల్ కోసం సైన్ అప్ చేయండి ట్రయల్ ముగిసిన తరువాత: 20 ఉద్యోగుల వరకు రూ.399",
      buttons: [{ id: "signup", title: "సైన్అప్ఉచిత ట్రయల్" }],
    },
    signup: {
      message: () => ({
        body: "'సైన్ అప్' బటన్‌ను క్లిక్ చేసి, ఫారమ్‌ను పూరించడం ద్వారా సైన్ అప్ చేయండి.",
        label: {
          title: "సైన్ అప్",
          namelabel: "పూర్తి పేరు",
          companylabel: "కంపెనీ పేరు",
          bufferlabel: "బఫర్ ఇన్/ఔట్ నిమిషాలు",
        },
      }),
    },
    uploadEmployee: {
      message: () => "దయచేసి అన్ని ఉద్యోగస్థుల సంప్రదించండి.",
    },
    addEmployee: {
      message: (
        employeeName,
        employeeNumber,
        timing,
        geofen
      ) => `జోడించినది:\n*పేరు*: ${employeeName}\n*నెంబర్*: ${employeeNumber}\n*రకం*: ${timing}\n*జియోఫెన్సింగ్*: ${geofen}
      `,
    },
    ticketUpdate: {
      message: (ticketNumber) =>
        `టికెట్ నెం: ${ticketNumber} యొక్క స్థితి విజయవంతమైనదిగా నవీకరించబడింది`,
    },
    employeeDemoStart: {
      buttons: [{ id: "MarkAttendance", title: "హాజరు చేయండి" }],

      message: () =>
        `1️⃣ *ఉద్యోగి డెమో దశలు*:\n a. ✅ మార్క్ హాజరు\n బి. 🙋 రిక్వెస్ట్ లీవ్\n సి. 🎫 టికెట్ పెంచండి\n డి. 📊 నివేదికను వీక్షించండి\n2️⃣ *ఎంప్లాయర్ డెమో దశలు* (ఉద్యోగి డెమో దశలను పూర్తి చేసిన తర్వాత)`,
    },
    employerStart: {
      message: () =>
        `హలో, దయచేసి కింది ఎంపికల నుండి ఒక ఎంపికను ఎంచుకోండి:\n\n1️⃣. నివేదిక పొందండి: వివరణాత్మక నివేదికను స్వీకరించడానికి ఈ బటన్‌ను క్లిక్ చేయండి..\n2️⃣. ఆమోదాలు: ఉద్యోగి సెలవు ఆమోదాలను తనిఖీ చేయాలా లేదా నిర్వహించాలా? నావిగేట్ చేయడానికి ఈ బటన్‌ని ఉపయోగించండి.\n3️⃣. ప్రొఫైల్/సెట్టింగ్‌లు: మీ ప్రొఫైల్ మరియు సెట్టింగ్‌లను ఇక్కడ నిర్వహించండి.`,
      buttons: [
        { id: "employerReports", title: "పొందు-నివేదిక" },
        { id: "approvals", title: "ఆప్రోవల్స్" },
        { id: "profile-settings", title: "ప్రొఫైల్ సెట్టింగ్‌ల" },
      ],
    },
  },
  Marathi: {
    hi: {
      message: (name) =>
        `हॅलो ${name} 👋\n\n माझं मैत्रीपूर्ण अँटेंडन्स बॉट आहे, तुमची सहाय्य करण्यात येतो.🤖 \n चला सुरु होऊया.✨`,
      buttons: [
        {
          id: "MarkAttendance",
          title: "अँटेंडन्स घ्या✅",
        },
        {
          id: "Report",
          title: "रिपोर्ट✉️",
        },
        {
          id: "Other",
          title: "इतर🔄",
        },
      ],
    },
    startempdemo: {
      message: () =>
        "चला *उपस्थिती चिन्हांकित करण्यासाठी चरण-दर-चरण प्रक्रिया सुरू करूया.* \n 📣 साइनअप केल्यानंतर, तुमच्याकडे तुमच्या मास्टर सेटिंग्जमध्ये भू-फेन्सिंग कॉन्फिगर करण्याची क्षमता आहे, स्थान-विशिष्ट कर्मचारी मॅपिंग सुनिश्चित करणे.",
      buttons: [{ id: "mark_attendance", title: "उपस्थिती टिकिट घ्या" }],
    },
    MarkAttendance: {
      message: () =>
        "*चरण 1- उपस्थिती चिन्हांकित करा*\n - त्यांच्या कामाच्या दिवसाची सुरुवात चिन्हांकित करण्यासाठी, कर्मचारी    [मध्ये] वर क्लिक करतील.\n- त्यांच्या कामाचा दिवस संपेल हे सूचित करण्यासाठी, ते 🔴 [बाहेर] निवडतील.",
      buttons: [
        { id: "in", title: "🟢 मध्ये" },
        { id: "out", title: "🔴 बाहेर" },
      ],
    },
    in: {
      message: () =>
        "*स्थान* \n📍 कृपया या चरणांचे अनुसरण करून तुमचे वर्तमान स्थान शेअर करा:\n1. 📩 हा संदेश निवडा.\n२. 💬 'उत्तर द्या' वर क्लिक करा.\n3. 📎 संलग्नक किंवा क्लिप आयकनवर टॅप करा.\n४. 📍 'स्थान' निवडा.\n५. ✅ 'तुमचे वर्तमान स्थान पाठवा' निवडा.",
    },
    out: {
      message: () =>
        "*स्थान* \n📍 कृपया या चरणांचे अनुसरण करून तुमचे वर्तमान स्थान शेअर करा:\n1. 📩 हा संदेश निवडा.\n२. 💬 'उत्तर द्या' वर क्लिक करा.\n3. 📎 संलग्नक किंवा क्लिप आयकनवर टॅप करा.\n४. 📍 'स्थान' निवडा.\n५. ✅ 'तुमचे वर्तमान स्थान पाठवा' निवडा.",
    },
    attendanceLocation: {
      message: () =>
        "📸 सामायिक साठविण्यासाठी कृपया आपला सेल्फी या क्षेत्रफेन्सिंग क्षेत्रातील आपल्याच्या स्थानाच्या पार्श्वभूमि दर्शविण्यात आपली मदत करा.",
    },
    clickAttendanceLocation: {
      message: () =>
        "*⚠️ प्रत्यक्षपणे पाठवू नका*. पहिल्यांना सुनिश्चित करा की आपण *उत्तर देता* आहात, नंतर 'आपला सध्याचे स्थान पाठवा' निवडा.\n📍 कृपया आपले सध्याचे स्थान सामायिक करण्यासाठी खालील क्रमांकांच्या माध्यमातून सामायिक करा:\n1. 📩 या संदेशाची निवडणूक करा.\n2. 💬 'उत्तर' वर क्लिक करा.\n3. 📎 अटॅचमेंट किंवा क्लिप आयकनावर क्लिक करा.\n4. 📍 'स्थान' निवडा.",
    },
    attendancePic: {
      message: () => "📸 कृपया आपली सेल्फी फोटो पाठवा 🤳.",
    },
    startLeaveRequest: {
      message: () =>
        "आम्ही उपस्थिती डेमो चिन्हांकित करणे यशस्वीरित्या पूर्ण केले आहे.\nपुढील डेमो म्हणजे तुमचा कर्मचारी *रजेची विनंती* कशी करू शकतो.",
      buttons: [{ id: "requestLeave", title: "Start Request Leave" }],
    },
    Report: {
      message: () => "आपली सध्याची किंवा मागील महिनची रिपोर्ट डाउनलोड करा.",
      buttons: [
        {
          id: "currentMonth",
          title: "सध्याचा महिना",
        },
        {
          id: "previousMonth",
          title: "मागील महिना",
        },
      ],
    },
    Other: {
      message: () => "हॅलो! आज आम्ही आपली कशी सहाय्य करू शकतो? कृपया खालील पर्यायातून निवडा.",
      buttons: [
        {
          id: "requestLeave",
          title: "अवकाशाची विनंती",
        },
        {
          id: "support",
          title: "समर्थन",
        },
        // {
        //   id: 'question',
        //   title: 'प्रश्न विचारा',
        // },
      ],
    },
    requestLeave: {
      message: () =>
        "थोडा ब्रेक घेण्याचा विचार करत आहात?\nकृपया आम्हाला कळवा की तुम्ही किती दिवसांच्या सुट्टीची विनंती करू इच्छिता:",
      buttons: [
        { id: "oneDay", title: "एक दिवस" },
        { id: "moreThanOneDay", title: "एक दिवसापेक्षा अधिक" },
      ],
    },
    oneDay: {
      message: () => ({
        body: "कृपया किंवा दिनांक आणि कारण सूचित करण्यासाठी खालील बटणावर क्लिक करा",
        label: {
          title: "अवकाशाची विनंती",
          startdatelabel: "प्रारंभ तारीख",
          enddatelabel: "समाप्ती तारीख",
          reasonlabel: "अवकाशाचा कारण",
        },
      }),
    },
    moreThanOneDay: {
      message: () => ({
        body: "कृपया किंवा दिनांक आणि कारण सूचित करण्यासाठी खालील बटणावर क्लिक करा",
        label: {
          title: "अवकाशाची विनंती",
          startdatelabel: "प्रारंभ तारीख",
          enddatelabel: "समाप्ती तारीख",
          reasonlabel: "अवकाशाचा कारण",
        },
      }),
    },
    leaveSummary: {
      message: (
        employeeName,
        department,
        leaveType,
        startDate,
        endDate,
        reasonForLeave,
        ticketNumber,
        recipientPhone
      ) =>
        `नाव: *${employeeName}*\nविभाग: *${
          department ?? "-"
        }*\nकिंवा: *लीव्ह विनंती*\nअवकाश प्रकार: *${leaveType}*\nसुरू तारीख: *${startDate}*\n${
          endDate !== "Invalid Date" ? `समाप्त तारीख: *${endDate}*\n` : ""
        }कारण: *${reasonForLeave}*\nफोन नंबर: *${recipientPhone}*\nटिकट नंबर: *${ticketNumber}*`,
    },
    startSupport: {
      message: () =>
        "आम्ही यशस्वीरित्या सुट्टीसाठी विनंती डेमो पूर्ण केला आहे. \n पुढील डेमो आहे- तुमचा कर्मचारी कसा तिकीट उठवू शकतो",
      buttons: [{ id: "support", title: "समर्थन" }],
    },
    support: {
      message: () => "*तिकीट वाढवा* \n तुम्ही खालील समस्या प्रकारांवर क्लिक करून तिकीट वाढवू शकता",
      buttons: [
        { id: "checkIn", title: "चेक-इन आणि चेक-आउट" },
        { id: "Salary_Issue", title: "पगाराची समस्या" },
        { id: "other_issue", title: "इतर" },
      ],
    },
    checkIn: {
      message: () => "कृपया आपली टिप्पणी टाइप करा",
    },
    checkOut: {
      message: () => "कृपया आपली टिप्पणी टाइप करा",
    },
    other_issue: {
      message: () => "कृपया आपली टिप्पणी टाइप करा",
    },
    Salary_Issue: {
      message: () => "कृपया आपली टिप्पणी टाइप करा",
    },
    employeeIssue: {
      message: () => "कृपया आपली टिप्पणी टाइप करा",
    },
    registerComplain: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `नाव: *${name}*\nविभाग: *${
          department ?? "-"
        }*\nसाठी: *समर्थन*\nसमस्या: *${problem}*\nटिपणी: *${message}*\nनंबर: *${recipientPhone}*\nटिकट क्रमांक: *${ticketNumber}*`,
    },
    employeeReportStart: {
      message: () =>
        " आम्ही कर्मचार्‍यांनी वाढवलेले समर्थन तिकीट यशस्वीरित्या पूर्ण केले आहे\nपुढील - मूलभूत *अहवाल* आहेत जे कर्मचारी पाहू शकतात",
      buttons: [
        {
          title: "चालू महिना",
          id: "  employe_report1",
        },
      ],
    },
    employerDemoStart: {
      message: () =>
        "आम्ही कर्मचारी डेमो संपला आहे\nपुढे - *नियोक्ता डेमो*:\na. 📑 अहवाल पहा\nb. कर्मचारी यादी पहा\nc. ✍️ अवकाश विनंती स्वीकृत करा\nd. ❌ टिकिट सोडा",
      buttons: [{ id: "isEmployer", title: "कर्मचारी डेमो" }],
    },
    employerReports: {
      message: () => "नियोक्त्यासाठी प्रथम वैशिष्ट्य म्हणजे अहवाल.\nखाली काही मूलभूत *अहवाल* आहेत.",
      buttons: [
        {
          id: "liveReport",
          title: "लाइव अपडेट",
        },
        {
          id: "emp_master_sheet",
          title: "कर्मचारी मास्टर शीट",
        },
      ],
    },
    liveReport: {
      message: () => "मंजूरी नियोक्ता डेमो सुरू करूया\nखालीलपैकी कोणत्याही बटणावर क्लिक करा",
      buttons: [
        {
          title: "Tickets & Approvals",
          id: "approvals",
        },
      ],
    },
    emp_master_sheet: {
      message: () => "मंजूरी नियोक्ता डेमो सुरू करूया\nखालीलपैकी कोणत्याही बटणावर क्लिक करा",
      buttons: [
        {
          title: "Tickets & Approvals",
          id: "approvals",
        },
      ],
    },
    approvals: {
      buttons: [
        { title: "अवकाश मान्यता", id: "leaveApprove" },
        { title: "चालू-समस्या", id: "activeIssues" },
      ],
      message: () =>
        `नमस्कार, कृपया खालील पर्याय निवडा:\n 1️⃣ पाने मंजूर करण्यासाठी.\n 2️⃣ तुमच्या मंजुरीच्या प्रतीक्षेत असलेल्या सक्रिय समस्या पाहण्यासाठी.\nपुढे जाण्यासाठी फक्त संबंधित बटणावर क्लिक करा!`,
    },
    leaveApprove: {
      message: () =>
        `*कर्मचारी रजेचा अहवाल*\nप्रिय नियोक्ता, एका कर्मचाऱ्याने रजेची विनंती केली आहे\n *तिकीट क्रमांक: RL4545* \n *नाव*: राम \n *तारीख*: 23/12/2023 \n *कारण* : लग्न \n *प्रकार* : रजेची विनंती करा`,
      buttons: [
        { title: "मंजूर", id: "request_approve" },
        { title: "नाकारणे", id: "request_reject" },
        { title: "ठामणे", id: "request_hold" },
      ],
    },
    activeIssues: {
      message: () =>
        `*कर्मचारी समस्या अहवाल*\nप्रिय नियोक्ता, कर्मचाऱ्याने तक्रार नोंदवली आहे:\n *कर्मचाऱ्याचे नाव* : शम \n *समस्या* : पगार \n *समस्याचे वर्णन* : पगार कमी जमा\nकृपया योग्य कारवाई करा या चिंतेचे निराकरण करण्यासाठी.`,
      buttons: [
        { title: "मंजूर", id: "issue_approve" },
        { title: "नाकारणे", id: "issue_reject" },
        { title: "ठामणे", id: "issue_hold" },
      ],
    },
    issue_approve: {
      message: () =>
        "स्थिती अपडेट: मंजूर\nतुमची विनंती/अर्ज मंजूर करण्यात आला आहे हे कळवण्यात आम्हाला आनंद होत आहे!\nतुमच्या संयम आणि सहकार्याबद्दल धन्यवाद.",
    },
    issue_reject: {
      message: () =>
        "स्थिती अपडेट: नाकारले \nतुमची विनंती/अर्ज नाकारण्यात आला आहे हे कळवण्यास आम्हाला खेद वाटतो.\nआम्ही तुमच्या समजुतीचे कौतुक करतो.",
    },
    isuue_hold: {
      message: () =>
        "स्थिती अपडेट: होल्डवर \nआम्ही परिस्थितीचे पुनरावलोकन आणि मूल्यांकन करत असताना तुमची विनंती/अर्ज सध्या होल्डवर आहे.\nया वेळी तुमच्या संयमाची आम्ही प्रशंसा करतो.",
    },
    request_: {
      message: () =>
        "*रजा विनंती अद्यतनित केली गेली आहे*\nतुमची रजा विनंती आता अद्यतनित केली गेली आहे. आमची रजा व्यवस्थापन प्रणाली वापरल्याबद्दल धन्यवाद।",
    },
    request_approve: {
      message: () => "",
    },
    request_reject: {
      message: () => "",
    },
    request_hold: {
      message: () => "",
    },
    signupStart: {
      message: () =>
        "आपले सौचम्य आभासी व कामगिरी दोन्ही डेमोनस्ट्रेशन्स सफळतेच पूर्ण झाले आहेत. आपल्याला आता एक आठवड्याचं (7 दिवस) मुक्त प्रयोग मिळतो. प्रयोग कालानुसार, आमची सदस्यता योजनांची तपशील खालीलप्रमाणे आहे:\n\n₹399 महिना दरानुसार 20 कर्मचारींसाठी.\n₹299 महिना दरानुसार 10 कर्मचारींसाठी.\n\nकोणत्याही प्रश्नांसाठी किंवा सहाय्यासाठी, कृपया आपले संपर्क आमच्या WhatsApp वर करा: +918369644748. आपल्या आवडीने आमची कीर्ती आहे आणि आपल्याला अत्यंत सेवा पुरवायची आहे.",
      buttons: [{ id: "signup", title: "मुक्त परीक्षण साइनअप" }],
    },
    signup: {
      message: () => ({
        body: "'साइन अप' बटणावर क्लिक करून साइन अप करा आणि फॉर्म भरा.",
        label: {
          title: "साइन अप",
          namelabel: "पूर्ण नाव",
          companylabel: "कंपनीचं नाव",
          bufferlabel: "बफर इन/आउट मिनिट्स",
        },
      }),
    },
    uploadEmployee: {
      message: () => "कृपया सर्व कर्मचार्‍यांचा संपर्क नोंद करा.",
    },
    addEmployee: {
      message: (employeeName, employeeNumber, timing, geofen) =>
        `जोडले आहे:\n*नाव*: ${employeeName}\n*क्रमांक*: ${employeeNumber}\n*प्रकार*: ${timing}\n*जियोफेंसिंग*: ${geofen}`,
    },
    ticketUpdate: {
      message: (ticketNumber) =>
        `टिकट क्र.: ${ticketNumber} ची स्थिती सफळतेने अद्यतित केली गेली आहे`,
    },
    employeeDemoStart: {
      buttons: [{ id: "MarkAttendance", title: "उपस्थिती चिन्ह" }],

      message: () =>
        `1️⃣ *कर्मचारी डेमो पायऱ्या*:\n a. ✅ उपस्थिती चिन्हांकित करा\n b. 🙋 रजेची विनंती\n c. 🎫 तिकीट वाढवा\n d. 📊 अहवाल पहा\n2️⃣ *नियोक्ता डेमो पायऱ्या* (कर्मचारी डेमो पायऱ्या पूर्ण केल्यानंतर)`,
    },
    employerStart: {
      message: () =>
        "नमस्कार, कृपया खालील पर्यायांतून एक विकल्प निवडा:\n\n1️⃣. अहवाल मिळवा: विस्तृत अहवाल मिळवण्यासाठी हे बटण क्लिक करा.\n2️⃣. मान्यता: कर्मचारी अवकाश मान्यता तपासा किंवा व्यवस्थापित करायचं आहे का? हे बटण वापरून येथे संचालन करा.\n3️⃣.प्रोफाइल/सेटिंग्ज: तुमची प्रोफाइल आणि सेटिंग्ज येथे व्यवस्थापित करा.",
      buttons: [
        { id: "employerReports", title: "अहवाल-मिळवा" },
        { id: "approvals", title: "मान्यता" },
        { id: "profile-settings", title: "प्रोफाइल सेटिंग्ज" },
      ],
    },
  },
  Tamil: {
    hi: {
      message: (name) =>
        `ஹலோ ${name} 👋\n\n நான் உங்கள் நலமான அடென்டன்ஸ் பாட், உங்களுக்கு உதவ இங்கே உள்ளேன்.🤖 \n வாடிக்கை ஆரம்பிக்கலாம்.✨`,
      buttons: [
        {
          id: "MarkAttendance",
          title: "காலாண்டன்ஸ்",
        },
        {
          id: "Report",
          title: "அறிக்கை✉️",
        },
        {
          id: "Other",
          title: "பிற✅",
        },
      ],
    },
    startempdemo: {
      message: () =>
        "* வருகையைக் குறிப்பதற்கான படிப்படியான செயல்முறையைத் தொடங்குவோம்.* \n 📣 பதிவுசெய்த பிறகு, உங்கள் முதன்மை அமைப்புகளில் ஜியோ-ஃபென்சிங்கை உள்ளமைக்கும் திறன் உங்களுக்கு உள்ளது.",
      buttons: [{ id: "mark_attendance", title: "வருகை குறி" }],
    },
    MarkAttendance: {
      message: () =>
        "*படி 1- வருகையைக் குறிக்கவும்*\n - தங்கள் வேலைநாளின் தொடக்கத்தைக் குறிக்க, ஊழியர்கள் [உள்ளே] என்பதைக் கிளிக் செய்வார்கள்.\n- தங்கள் வேலைநாளின் முடிவைக் குறிக்க, அவர்கள் 🔴 [வெளியே] என்பதைத் தேர்ந்தெடுப்பார்கள்.",
      buttons: [
        { id: "in", title: "🟢 உள்ளே" },
        { id: "out", title: "🔴 வெளியே" },
      ],
    },
    in: {
      message: () =>
        "*இருப்பிடம்* \n📍 இந்தப் படிகளைப் பின்பற்றி உங்கள் தற்போதைய இருப்பிடத்தைப் பகிரவும்:\n1. 📩 இந்த செய்தியைத் தேர்ந்தெடுக்கவும்.\n2. 💬 'பதில்' என்பதைக் கிளிக் செய்யவும்.\n3. 📎 இணைப்பு அல்லது கிளிப் ஐகானைத் தட்டவும்.\n4. 📍'இருப்பிடம்' என்பதைத் தேர்ந்தெடுக்கவும்.\n5. ✅ 'உங்கள் தற்போதைய இருப்பிடத்தை அனுப்பு' என்பதைத் தேர்ந்தெடுக்கவும் .",
    },
    out: {
      message: () =>
        "*இருப்பிடம்* \n📍 இந்தப் படிகளைப் பின்பற்றி உங்கள் தற்போதைய இருப்பிடத்தைப் பகிரவும்:\n1. 📩 இந்த செய்தியைத் தேர்ந்தெடுக்கவும்.\n2. 💬 'பதில்' என்பதைக் கிளிக் செய்யவும்.\n3. 📎 இணைப்பு அல்லது கிளிப் ஐகானைத் தட்டவும்.\n4. 📍'இருப்பிடம்' என்பதைத் தேர்ந்தெடுக்கவும்.\n5. ✅ 'உங்கள் தற்போதைய இருப்பிடத்தை அனுப்பு' என்பதைத் தேர்ந்தெடுக்கவும் .",
    },
    attendanceLocation: {
      message: () =>
        "📸 அசிவுக்கு, அனுப்ப ஒரு செல்ஃபி உங்கள் இருப்பு பரிமாணத்தைக் காட்டும் படம் அனுப்புங்கள்.",
    },
    clickAttendanceLocation: {
      message: () =>
        "*⚠️ உங்கள் இருப்புக்கு செய்தியை அனுப்ப வேண்டாம்* . முதலில் உங்கள் *பதிலளிக்கின்றீர்கள்*, பின் 'உங்கள் தற்போதைய இடம் அனுப்புக' என்பதை தேர்வுசெய்யுங்கள்.\n📍 தற்போதைய இருப்பு பரிமாணத்தைக் காட்டும் படம் அனுப்புக.",
    },
    attendancePic: {
      message: () => "📸 உங்கள் செல்ஃபி புகைப்படத்தை அனுப்புங்கள் 🤳.",
    },
    startLeaveRequest: {
      message: () =>
        "வருகைப்பதிவு டெமோவைக் குறிப்பதை நாங்கள் வெற்றிகரமாக முடித்துள்ளோம்.\nஅடுத்த டெமோ உங்கள் பணியாளர் எப்படி *விடுப்பைக் கோரலாம்*",
      buttons: [{ id: "requestLeave", title: "Start Request Leave" }],
    },
    Report: {
      message: () =>
        "உங்கள் தற்போதைய மாதத்தின் அறிக்கை அல்லது முந்தைய மாதத்தின் அறிக்கையை பதிவிறக்கம் செய்க.",
      buttons: [
        {
          id: "currentMonth",
          title: "தற்போதைய மாதம்",
        },
        {
          id: "previousMonth",
          title: "முந்தைய மாதம்",
        },
      ],
    },
    Other: {
      message: () =>
        "வணக்கம்! நீங்கள் இன்று எப்படி உங்களுக்கு உதவ முடியும்? தயவுசெய்து கீழே உள்ள விருப்பங்களில் ஒன்றை தேர்ந்தெடுக்கவும்.",
      buttons: [
        {
          id: "requestLeave",
          title: "குறிப்பிடுத்து அவ",
        },
        {
          id: "support",
          title: "ஆதரவு",
        },
        // {
        //   id: 'question',
        //   title: 'கேள்வி கேட்கவும்',
        // },
      ],
    },
    requestLeave: {
      message: () =>
        "சிறிது ஓய்வு எடுக்க நினைக்கிறீர்களா?\nஎவ்வளவு நாட்கள் தள்ளுபடி கோர விரும்புகிறீர்கள் என்பதை எங்களுக்குத் தெரிவிக்கவும்:",
      buttons: [
        { id: "oneDay", title: "ஒரு நாள்" },
        { id: "moreThanOneDay", title: "ஒரு நாளைக்கு அதிகமாக" },
      ],
    },
    oneDay: {
      message: () => ({
        body: "தயவுசெய்து கீழே உள்ள பொத்தானை அழுத்தி தெரிவிக்கவும்",
        label: {
          title: "குறிப்பு அனுமதி",
          startdatelabel: "தொடக்க தேதி",
          enddatelabel: "முடிவு தேதி",
          reasonlabel: "காரணம் அவகாசம்",
        },
      }),
    },
    moreThanOneDay: {
      message: () => ({
        body: "தயவுசெய்து கீழே உள்ள பொத்தானை அழுத்தி தெரிவிக்கவும்",
        label: {
          title: "குறிப்பு அனுமதி",
          startdatelabel: "தொடக்க தேதி",
          enddatelabel: "முடிவு தேதி",
          reasonlabel: "காரணம் அவகாசம்",
        },
      }),
    },
    leaveSummary: {
      message: (
        employeeName,
        department,
        leaveType,
        startDate,
        endDate,
        reasonForLeave,
        ticketNumber,
        recipientPhone
      ) =>
        `Name: *${employeeName}*\nDepartment: *${
          department ?? "-"
        }*\nFor: *அவகாஶ கேட்டல்*\nஅவகாஶ வகை: *${leaveType}*\nதொடக்க தேதி: *${startDate}*\n${
          endDate !== "Invalid Date" ? `கடைசி தேதி: *${endDate}*\n` : ""
        }காரணம்: *${reasonForLeave}*\nஎண் : *${recipientPhone}*\nடிக்கெட் எண் : *${ticketNumber}*`,
    },
    startSupport: {
      message: () =>
        "நாங்கள் விடுப்புக்கு கோரிக்கை டெமோவை வெற்றிகரமாக முடித்துள்ளோம். \n அடுத்த டெமோ இதுவாகும்- உங்கள் ஊழியர் எப்படி டிக்கெட் உயர்த்துவது",
      buttons: [{ id: "support", title: "ஆதரவு" }],
    },
    support: {
      message: () =>
        "*டிக்கெட்டை உயர்த்துங்கள்* \n கீழே உள்ள சிக்கல் வகைகளைக் கிளிக் செய்வதன் மூலம் டிக்கெட்டை உயர்த்தலாம்",
      buttons: [
        { id: "checkIn", title: "செக்இன் &செக் அவுட்" },
        { id: "Salary_Issue", title: "சம்பள பிரச்சினை" },
        { id: "other_issue", title: "மற்ற" },
      ],
    },
    checkIn: {
      message: () => "தயவுசெய்து உங்கள் கருத்தை டைப் செய்யவும்.",
    },
    checkOut: {
      message: () => "தயவுசெய்து உங்கள் கருத்தை டைப் செய்யவும்.",
    },
    other_issue: {
      message: () => "தயவுசெய்து உங்கள் கருத்தை டைப் செய்யவும்.",
    },
    Salary_Issue: {
      message: () => "தயவுசெய்து உங்கள் கருத்தை டைப் செய்யவும்.",
    },
    employeeIssue: {
      message: () => "தயவுசெய்து உங்கள் கருத்தை டைப் செய்யவும்.",
    },
    registerComplain: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `பெயர்: *${name}*\nபிரிவு: *${
          department ?? "-"
        }*\nகுறித்து: *ஆதரவு*\nசிக்கல்: *${problem}*\nகருத்து: *${message}*\nஎண்: *${recipientPhone}*\nடிக்கெட் எண்: *${ticketNumber}*`,
    },
    employeeReportStart: {
      message: () =>
        "பணியாளரால் திரட்டப்பட்ட ஆதரவு டிக்கெட்டுகளை நாங்கள் வெற்றிகரமாக முடித்துள்ளோம்\nஅடுத்து - பணியாளர் பார்க்கக்கூடிய அடிப்படை *அறிக்கைகள்*",
      buttons: [
        {
          title: "நடப்பு மாதம்",
          id: "  employe_report1",
        },
      ],
    },
    employerDemoStart: {
      message: () =>
        "நாங்கள் பணியாளர் டெமோ முடித்துவிட்டோம்\nஅடுத்தது - *பணியாளர் டெமோ*:\na. 📑 அறிக்கைகள் காண்க\nb. பணியாளர் பட்டியலைக் காண்க\nc. ✍️ அவகாஶ கேட்கைகளை அனுமதிக்கவும்\nd. ❌ டிக்கெட்களை தீர்க்கவும்",
      buttons: [{ id: "isEmployer", title: "பணியாள டெமோ ஆரம்ப" }],
    },
    employerReports: {
      message: () =>
        "வேலை வழங்குனருக்கான முதல் அம்சம் அறிக்கைகள்.\nவேலை வழங்குனருக்கான சில அடிப்படை *அறிக்கைகள்* கீழே உள்ளன",
      buttons: [
        {
          id: "liveReport",
          title: "நேரடி அறிக்கை",
        },
        {
          id: "emp_master_sheet",
          title: "பணியாளர் அறிக்கை",
        },
      ],
    },
    liveReport: {
      message: () =>
        "ஒப்புதல்கள் பணி வழங்குநர் டெமோவைத் தொடங்கலாம்\nகீழே உள்ள பட்டனைக் கிளிக் செய்யவும்",
      buttons: [
        {
          title: "Tickets & Approvals",
          id: "approvals",
        },
      ],
    },
    emp_master_sheet: {
      message: () =>
        "ஒப்புதல்கள் பணி வழங்குநர் டெமோவைத் தொடங்கலாம்\nகீழே உள்ள பட்டனைக் கிளிக் செய்யவும்",
      buttons: [
        {
          title: "Tickets & Approvals",
          id: "approvals",
        },
      ],
    },
    approvals: {
      buttons: [
        { title: "விட்டு-அனுமதி", id: "leaveApprove" },
        { title: "செயலில்-சிக்கல்", id: "activeIssues" },
      ],
      message: () =>
        `வணக்கம், கீழே உள்ள ஒரு விருப்பத்தைத் தேர்ந்தெடுக்கவும்:\n 1️⃣ லீவுகளை அங்கீகரிக்க.\n 2️⃣ உங்கள் ஒப்புதலுக்காகக் காத்திருக்கும் செயலில் உள்ள சிக்கல்களைப் பார்க்க.\nதொடர்வதற்கு தொடர்புடைய பொத்தானைக் கிளிக் செய்யவும்!`,
    },
    leaveApprove: {
      message: () =>
        `*பணியாளர் விடுப்பு அறிவிக்கப்பட்டுள்ளது*\nஅன்புள்ள முதலாளி, ஒரு பணியாளரின் விடுப்பு கோரிக்கை\n *டிக்கெட் எண்: RL4545* \n *பெயர்*: ராம் \n *தேதிகள்*: 23/12/2023 \n *காரணம்* : திருமணம் \n *வகை* : விடுப்புக் கோரிக்கை`,
      buttons: [
        { title: "அங்கீகரிக்க", id: "request_approve" },
        { title: "நிராகரிக்க", id: "request_reject" },
        { title: "கைகொள்", id: "request_hold" },
      ],
    },
    activeIssues: {
      message: () =>
        `*பணியாளர் பிரச்சினை அறிக்கை*\nஅன்புள்ள முதலாளி, ஒரு ஊழியர் புகாரளித்த ஒரு சிக்கல் உள்ளது:\n *பணியாளர் பெயர்* : ஷாம் \n *சிக்கல்* : சம்பளம் \n *சிக்கல் விவரம்* : சம்பளம் குறைவாக வரவு வைக்கப்பட்டுள்ளது\nதயவுசெய்து தகுந்த நடவடிக்கை எடுக்கவும் இந்த கவலையை நிவர்த்தி செய்ய.`,
      buttons: [
        { title: "அங்கீகரிக்க", id: "issue_approve" },
        { title: "நிராகரிக்க", id: "issue_reject" },
        { title: "கைகொள்", id: "issue_hold" },
      ],
    },
    issue_approve: {
      message: () =>
        "நிலை புதுப்பிப்பு: அங்கீகரிக்கப்பட்டது\nஉங்கள் கோரிக்கை/விண்ணப்பம் அங்கீகரிக்கப்பட்டது என்பதை மகிழ்ச்சியுடன் தெரிவித்துக் கொள்கிறோம்!\nஉங்கள் பொறுமை மற்றும் ஒத்துழைப்புக்கு நன்றி.",
    },
    issue_reject: {
      message: () =>
        "நிலை புதுப்பிப்பு: நிராகரிக்கப்பட்டது \nஉங்கள் கோரிக்கை/விண்ணப்பம் நிராகரிக்கப்பட்டது என்பதை உங்களுக்குத் தெரிவிக்க வருந்துகிறோம்.\nஉங்கள் புரிதலைப் பாராட்டுகிறோம்.",
    },
    isuue_hold: {
      message: () =>
        "நிலை புதுப்பிப்பு: நிறுத்தி வைக்கப்பட்டுள்ளது \nஉங்கள் கோரிக்கை/விண்ணப்பம் தற்போது நிறுத்தி வைக்கப்பட்டுள்ளது, நாங்கள் நிலைமையை மதிப்பாய்வு செய்து மதிப்பீடு செய்கிறோம்.\nஇந்த நேரத்தில் உங்கள் பொறுமையை நாங்கள் பாராட்டுகிறோம்.",
    },
    request_: {
      message: () =>
        "*விடுப்பு கோரிக்கை புதுப்பிப்பு*\nஉங்கள் விடுப்பு கோரிக்கை இப்போது புதுப்பிக்கப்பட்டுள்ளது. எங்கள் விடுப்பு மேலாண்மை முறையைப் பயன்படுத்தியதற்கு நன்றி.",
    },
    request_approve: {
      message: () => "",
    },
    request_reject: {
      message: () => "",
    },
    request_hold: {
      message: () => "",
    },
    signupStart: {
      message: () =>
        "நாங்கள் இப்போது இரண்டு டெமோக்களை முடித்துள்ளோம். 1 மாத இலவச சோதனைக்கு பதிவு செய்யவும்.சோதனைக்குப் பிறகு: 20 பணியாளர்கள் வரை ரூ.399",
      buttons: [{ id: "signup", title: "இலவச சோதனை பதிவு" }],
    },
    signup: {
      message: () => ({
        body: "'Sign Up' பொத்தானைக் கிளிக் செய்து படிவத்தை நிரப்புவதன் மூலம் பதிவுபெறவும்.",
        label: {
          title: "பதிவு செய்க",
          namelabel: "முழு பெயர்",
          companylabel: "கம்பெனி பெயர்",
          bufferlabel: "பஃபர் இன்/அவுட் நிமிடங்கள்",
        },
      }),
    },
    uploadEmployee: {
      message: () =>
        "தயவுசெய்து உங்கள் அனைத்து ஊழியர்களின் தொடர்பு தகவல்களை பதிவிறக்கம் செய்யவும்.",
    },
    addEmployee: {
      message: (employeeName, employeeNumber, timing, geofen) =>
        `சேர்ந்துள்ளது:\n*பெயர்*: ${employeeName}\n*எண்*: ${employeeNumber}\n*வகை*: ${timing}\n*ஜியோஃபென்சிங்*: ${geofen}`,
    },
    ticketUpdate: {
      message: (ticketNumber) =>
        `டிக்கெட் எண்: ${ticketNumber} ன் நிலை வெற்றியாக புதுப்பிக்கப்பட்டுள்ளது`,
    },
    employeeDemoStart: {
      buttons: [{ id: "MarkAttendance", title: "காலநிலை குறித்து" }],

      message: () =>
        `1️⃣ *பணியாளர் டெமோ படிகள்*:\n ஏ. ✅ மார்க் வருகை\n பி. 🙋 கோரிக்கை விடுப்பு\n c. 🎫 ஒரு டிக்கெட்டை உயர்த்தவும்\n டி. 📊 அறிக்கையைப் பார்க்கவும்\n2️⃣ *முதலாளி டெமோ படிகள்* (பணியாளர் டெமோ படிகளை முடித்த பிறகு)`,
    },
    employerStart: {
      message: () =>
        `வணக்கம், பின்வரும் தேர்வுகளில் இருந்து ஒரு விருப்பத்தைத் தேர்ந்தெடுக்கவும்:\n\n1️⃣. அறிக்கையைப் பெறவும்: விரிவான அறிக்கையைப் பெற இந்தப் பொத்தானைக் கிளிக் செய்யவும்..\n2️⃣. ஒப்புதல்கள்: பணியாளர் விடுப்பு அனுமதிகளை சரிபார்க்க அல்லது நிர்வகிக்க வேண்டுமா? வழிசெலுத்த இந்த பொத்தானைப் பயன்படுத்தவும்\n3️⃣. சுயவிவரம்/அமைப்புகள்: உங்கள் சுயவிவரத்தையும் அமைப்புகளையும் இங்கே நிர்வகிக்கவும்.`,
      buttons: [
        { id: "employerReports", title: "அறிக்கைகள் பெற" },
        { id: "approvals", title: "ஒப்புதல்கள்" },
        { id: "profile-settings", title: "சுயவிவர அமைப்புகள்" },
      ],
    },
  },
  Kannada: {
    hi: {
      message: (name) =>
        `ಹಲೋ ${name} 👋\n\n ನಾನು ನಿಮ್ಮ ಸ್ನೇಹಪೂರಿತ ಅಟೆಂಡೆನ್ಸ್ ಬೋಟ್, ನಿಮಗೆ ಸಹಾಯಕ್ಕಾಗಿ ಇಲ್ಲಿಯೇ ಇದ್ದೇನೆ.🤖 \nಆರಂಭಿಸಲು ನಾವು ನಡೆಸೋಣ.✨`,
      buttons: [
        {
          id: "MarkAttendance",
          title: "ಹಾಜರು ಹಾಕಿ✅",
        },
        {
          id: "Report",
          title: "ವರದಿ✉️",
        },
        {
          id: "Other",
          title: "ಇತರ🔄",
        },
      ],
    },
    startempdemo: {
      message: () =>
        "*ಹಾಜರಾತಿಯನ್ನು ಗುರುತಿಸಲು ಹಂತ-ಹಂತದ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಪ್ರಾರಂಭಿಸೋಣ.* \n 📣 ಸೈನ್ ಅಪ್ ನಂತರ, ನಿಮ್ಮ ಮಾಸ್ಟರ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳಲ್ಲಿ ಜಿಯೋ-ಫೆನ್ಸಿಂಗ್ ಅನ್ನು ಕಾನ್ಫಿಗರ್ ಮಾಡುವ ಸಾಮರ್ಥ್ಯವನ್ನು ನೀವು ಹೊಂದಿದ್ದೀರಿ, ಸ್ಥಳ-ನಿರ್ದಿಷ್ಟ ಉದ್ಯೋಗಿ ಮ್ಯಾಪಿಂಗ್ ಅನ್ನು ಖಾತ್ರಿಪಡಿಸಿಕೊಳ್ಳುತ್ತೀರಿ.",
      buttons: [{ id: "mark_attendance", title: "ಉಪಸ್ಥಿತಿಯನ್ನು ಮಾಡಿ" }],
    },
    MarkAttendance: {
      message: () =>
        "*ಹಂತ 1- ಹಾಜರಾತಿಯನ್ನು ಗುರುತಿಸಿ*\n - ತಮ್ಮ ಕೆಲಸದ ದಿನದ ಪ್ರಾರಂಭವನ್ನು ಗುರುತಿಸಲು, ಉದ್ಯೋಗಿಗಳು [ಒಳಗೆ] ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡುತ್ತಾರೆ.\n- ತಮ್ಮ ಕೆಲಸದ ದಿನದ ಅಂತ್ಯವನ್ನು ಸೂಚಿಸಲು, ಅವರು 🔴 [ಹೊರಗೆ] ಅನ್ನು ಆಯ್ಕೆ ಮಾಡುತ್ತಾರೆ.",
      buttons: [
        { id: "in", title: "🟢 ಒಳಗೆ" },
        { id: "out", title: "🔴 ಹೊರಗೆ" },
      ],
    },
    in: {
      message: () =>
        "*ಸ್ಥಳ* \n📍 ದಯವಿಟ್ಟು ಈ ಹಂತಗಳನ್ನು ಅನುಸರಿಸುವ ಮೂಲಕ ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಸ್ಥಳವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ:\n1. 📩 ಈ ಸಂದೇಶವನ್ನು ಆಯ್ಕೆಮಾಡಿ.\n2. 💬 'ಪ್ರತ್ಯುತ್ತರ' ಕ್ಲಿಕ್ ಮಾಡಿ.\n3. 📎 ಲಗತ್ತು ಅಥವಾ ಕ್ಲಿಪ್ ಐಕಾನ್ ಅನ್ನು ಟ್ಯಾಪ್ ಮಾಡಿ.\n4. 📍'ಸ್ಥಳ' ಆಯ್ಕೆಮಾಡಿ.\n5. ✅ 'ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಸ್ಥಳವನ್ನು ಕಳುಹಿಸಿ' ಆಯ್ಕೆಮಾಡಿ.",
    },
    out: {
      message: () =>
        "*ಸ್ಥಳ* \n📍 ದಯವಿಟ್ಟು ಈ ಹಂತಗಳನ್ನು ಅನುಸರಿಸುವ ಮೂಲಕ ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಸ್ಥಳವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ:\n1. 📩 ಈ ಸಂದೇಶವನ್ನು ಆಯ್ಕೆಮಾಡಿ.\n2. 💬 'ಪ್ರತ್ಯುತ್ತರ' ಕ್ಲಿಕ್ ಮಾಡಿ.\n3. 📎 ಲಗತ್ತು ಅಥವಾ ಕ್ಲಿಪ್ ಐಕಾನ್ ಅನ್ನು ಟ್ಯಾಪ್ ಮಾಡಿ.\n4. 📍'ಸ್ಥಳ' ಆಯ್ಕೆಮಾಡಿ.\n5. ✅ 'ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಸ್ಥಳವನ್ನು ಕಳುಹಿಸಿ' ಆಯ್ಕೆಮಾಡಿ.",
    },
    attendanceLocation: {
      message: () => "📸 ಹಾಜರಾತಿನ ಹೊರಗಿನ ಕಡೆ ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ತಿಳಿಸಲು ಒಂದು ಸೆಲ್ಫಿಯನ್ನು ಕಳುಹಿಸಿ.",
    },
    clickAttendanceLocation: {
      message: () =>
        "*⚠️ ನೀವು ನೇರವಾಗಿ ಕಳುಹಿಸಬಾರದು* . ಮೊದಲು, ನೀವು *ಉತ್ತರ ನೀಡುವಿಕೆಗೆ* ಎಂಚುಕೊಂಡು, ನಂತರ 'ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಸ್ಥಳವನ್ನು ಕಳುಹಿಸಿ' ಆಯ್ಕೆ ಮಾಡಿ.\n📍 ದಯವಿಟ್ಟು ಈ ಹೆಜ್ಜೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳಲು ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಸ್ಥಳವನ್ನು ಹಂಚಿಕೊಳ್ಳಲು ಒಂದು ಸೆಲ್ಫಿಯನ್ನು ಕಳುಹಿಸಿ.",
    },
    attendancePic: {
      message: () => "📸 ನಿಮ್ಮ ಸೆಲ್ಫಿ ಫೋಟೊನ್ನು ಕಳುಹಿಸಿ 🤳.",
    },
    startLeaveRequest: {
      message: () =>
        "ಹಾಜರಾತಿ ಡೆಮೊವನ್ನು ಗುರುತಿಸುವುದನ್ನು ನಾವು ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಳಿಸಿದ್ದೇವೆ.\nಮುಂದಿನ ಡೆಮೊ ನಿಮ್ಮ ಉದ್ಯೋಗಿ ಹೇಗೆ *ರಜೆಯನ್ನು ವಿನಂತಿಸಬಹುದು*",
      buttons: [{ id: "requestLeave", title: "Start Request Leave" }],
    },
    Report: {
      message: () => "ನಿಮ್ಮ ಪ್ರಸ್ತುತ ತಿಂಗಳ ವರದಿ ಅಥವಾ ಹಿಂದಿನ ತಿಂಗಳ ವರದಿಯನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.",
      buttons: [
        {
          id: "currentMonth",
          title: "ಈ ತಿಂಗಳು",
        },
        {
          id: "previousMonth",
          title: "ಹಿಂದಿನ ತಿಂಗಳು",
        },
      ],
    },
    Other: {
      message: () =>
        "ಹಲೋ! ಇಂದು ನೀವು ಹೇಗೆ ನಮಗೆ ಸಹಾಯ ಮಾಡಬಹುದು? ದಯವಿಟ್ಟು ಕೆಳಗಿನ ಆಯ್ಕೆಗಳಲ್ಲಿನ ಒಂದನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
      buttons: [
        {
          id: "requestLeave",
          title: "ಕೋರಿಕೆ ಇಚ್ಛಿಸಿ",
        },
        {
          id: "support",
          title: "ಬೆಂಬಲ",
        },
        // {
        //   id: 'question',
        //   title: 'ಪ್ರಶ್ನಿಸಿ',
        // },
      ],
    },
    requestLeave: {
      message: () =>
        "ಸ್ವಲ್ಪ ವಿರಾಮವನ್ನು ತೆಗೆದುಕೊಳ್ಳಲು ಯೋಚಿಸುತ್ತಿರುವಿರಾ?\nದಯವಿಟ್ಟು ನೀವು ಎಷ್ಟು ದಿನಗಳನ್ನು ವಿನಂತಿಸಲು ಬಯಸುತ್ತೀರಿ ಎಂಬುದನ್ನು ನಮಗೆ ತಿಳಿಸಿ:",
      buttons: [
        { id: "oneDay", title: "ಒಂದು ದಿನ" },
        { id: "moreThanOneDay", title: "ಒಂದಕ್ಕಿಂತ ಹೆಚ್ಚು ದಿನ" },
      ],
    },
    oneDay: {
      message: () => ({
        body: "ದಯವಿಟ್ಟು ದಿನಾಂಕವನ್ನು ಮತ್ತು ಕಾರಣವನ್ನು ಕೆಳಗಿನ ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ",
        label: {
          title: "ಅವಕಾಶ ಕೇಳಿ",
          startdatelabel: "ಪ್ರಾರಂಭ ದಿನಾಂಕ",
          enddatelabel: "ಕೊನೆಯ ದಿನಾಂಕ",
          reasonlabel: "ಅವಕಾಶ ಕಾರಣ",
        },
      }),
    },
    moreThanOneDay: {
      message: () => ({
        body: "ದಯವಿಟ್ಟು ಕೆಳಗಿನ ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿದ್ದುಕೊಂಡು ದಿನಾಂಕ ಮತ್ತು ಕಾರಣವನ್ನು ನಿರ್ದಿಷ್ಟಪಡಿಸಿ",
        label: {
          title: "ಅವಕಾಶ ಕೇಳಿ",
          startdatelabel: "ಪ್ರಾರಂಭ ದಿನಾಂಕ",
          enddatelabel: "ಕೊನೆಯ ದಿನಾಂಕ",
          reasonlabel: "ಅವಕಾಶ ಕಾರಣ",
        },
      }),
    },
    leaveSummary: {
      message: (
        employeeName,
        department,
        leaveType,
        startDate,
        endDate,
        reasonForLeave,
        ticketNumber,
        recipientPhone
      ) =>
        `Name: *${employeeName}*\nDepartment: *${
          department ?? "-"
        }*\nFor: *ರಜೆ ಕೇಳಿಕೆ*\nರಜೆ ರೀತಿ: *${leaveType}*\nಪ್ರಾರಂಭ ದಿನಾಂಕ: *${startDate}*\n${
          endDate !== "Invalid Date" ? `ಕೊನೆಯ ದಿನಾಂಕ: *${endDate}*\n` : ""
        }ಕಾರಣ: *${reasonForLeave}*\nಸಂಖ್ಯೆ : *${recipientPhone}*\nಟಿಕೆಟ್ ಸಂಖ್ಯೆ : *${ticketNumber}*`,
    },
    startSupport: {
      message: () =>
        "ನಾವು ಯಶಸ್ವಿಯಾಗಿ ರಜೆಯ ವಿನಂತಿ ಡೆಮೋ ಪೂರೈಸಿದ್ದೇವೆ. \n ಮುಂದಿನ ಡೆಮೋ - ನಿಮ್ಮ ಉದ್ಯೋಗಿ ಹೇಗೆ ಟಿಕೆಟ್ ಎತ್ತಲು ಸಾಧ್ಯ",
      buttons: [{ id: "support", title: "ಬೆಂಬಲ" }],
    },
    support: {
      message: () =>
        "*ಟಿಕೆಟ್ ಅನ್ನು ಹೆಚ್ಚಿಸಿ* \n ಕೆಳಗಿನ ಸಮಸ್ಯೆಯ ಪ್ರಕಾರಗಳನ್ನು ಕ್ಲಿಕ್ ಮಾಡುವ ಮೂಲಕ ನೀವು ಟಿಕೆಟ್ ಅನ್ನು ಹೆಚ್ಚಿಸಬಹುದು",
      buttons: [
        { id: "checkIn", title: "ಚೆಕ್-ಇನ್ & ಚೆಕ್-ಔಟ್" },
        { id: "Salary_Issue", title: "ಸಂಬಳ ಸಮಸ್ಯೆ" },
        { id: "other_issue", title: "ಇತರೆ" },
      ],
    },
    checkIn: {
      message: () => "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಟೀಕೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ",
    },
    checkOut: {
      message: () => "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಟೀಕೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ",
    },
    other_issue: {
      message: () => "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಟೀಕೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ",
    },
    Salary_Issue: {
      message: () => "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಟೀಕೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ",
    },
    employeeIssue: {
      message: () => "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಟೀಕೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ",
    },
    registerComplain: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `ಹೆಸರು: *${name}*\nವಿಭಾಗ: *${
          department ?? "-"
        }*\nಗಾಗಿ: *ಬೆಂಬಲ*\nಸಮಸ್ಯೆ: *${problem}*\nಟಿಪ್ಪಣಿ: *${message}*\nಸಂಖ್ಯೆ: *${recipientPhone}*\nಟಿಕೆಟ್ ಸಂಖ್ಯೆ: *${ticketNumber}*`,
    },
    employeeReportStart: {
      message: () =>
        "ಉದ್ಯೋಗಿಯಿಂದ ಸಂಗ್ರಹಿಸಲಾದ ಬೆಂಬಲ ಟಿಕೆಟ್‌ಗಳನ್ನು ನಾವು ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಳಿಸಿದ್ದೇವೆ\nಮುಂದೆ - ಉದ್ಯೋಗಿಗಳು ನೋಡಬಹುದಾದ ಮೂಲ *ವರದಿಗಳು*",
      buttons: [
        {
          title: "ಈ ತಿಂಗಳು",
          id: "  employe_report1",
        },
      ],
    },
    employerDemoStart: {
      message: () =>
        "ನಾವು ಉದ್ಯೋಗಿ ಡೆಮೋ ಮುಗಿಸಿದ್ದೇವೆ\nಮುಂದಿನ - *ಉದ್ಯೋಗದಾತಾ ಡೆಮೋ*:\na. 📑 ಅಂಗಡಿಯನ್ನು ನೋಡಿ\nb. ಉದ್ಯೋಗಿ ಪಟ್ಟಿಯನ್ನು ನೋಡಿ\nc. ✍️ ಅವಕಾಶ ಕೋರಿಕೆಗಳನ್ನು ಅನುಮೋದಿಸಿ\nd. ❌ ಟಿಕೆಟ್‌ಗಳನ್ನು ಸರಿಪಡಿಸಿ",
      buttons: [{ id: "isEmployer", title: "ಉದ್ಯೋಗಿ ಡೆಮೊ ಪ್ರಾರಂಭ" }],
    },
    employerReports: {
      message: () =>
        "ಉದ್ಯೋಗದಾತರ ಮೊದಲ ವೈಶಿಷ್ಟ್ಯವೆಂದರೆ ವರದಿಗಳು.\nಕೆಳಗೆ ಉದ್ಯೋಗದಾತರಿಗೆ ಕೆಲವು ಮೂಲ *ವರದಿಗಳು*",
      buttons: [
        {
          id: "liveReport",
          title: "ಲೈವ್ ರಿಪೋರ್ಟ್",
        },
        {
          id: "emp_master_sheet",
          title: "ಉದ್ಯೋಗಿ ವರದಿ",
        },
      ],
    },
    liveReport: {
      message: () =>
        "ಅನುಮೋದನೆಗಳ ಉದ್ಯೋಗದಾತ ಡೆಮೊವನ್ನು ಪ್ರಾರಂಭಿಸೋಣ\nಕೆಳಗಿನ ಯಾವುದಾದರೂ ಬಟನ್ ಅನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ",
      buttons: [
        {
          title: "Tickets & Approvals",
          id: "approvals",
        },
      ],
    },
    emp_master_sheet: {
      message: () =>
        "ಅನುಮೋದನೆಗಳ ಉದ್ಯೋಗದಾತ ಡೆಮೊವನ್ನು ಪ್ರಾರಂಭಿಸೋಣ\nಕೆಳಗಿನ ಯಾವುದಾದರೂ ಬಟನ್ ಅನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ",
      buttons: [
        {
          title: "Tickets & Approvals",
          id: "approvals",
        },
      ],
    },
    approvals: {
      buttons: [
        { title: "ಬಿಡಿ-ಅನುಮೋದಿಸಿ", id: "leaveApprove" },
        { title: "ಸಕ್ರಿಯ-ಸಮಸ್ಯೆ", id: "activeIssues" },
      ],
      message: () =>
        `ಹಲೋ, ದಯವಿಟ್ಟು ಕೆಳಗಿನ ಆಯ್ಕೆಯನ್ನು ಆರಿಸಿ:\n 1️⃣ ಎಲೆಗಳನ್ನು ಅನುಮೋದಿಸಲು.\n 2️⃣ ನಿಮ್ಮ ಅನುಮೋದನೆಗಾಗಿ ಕಾಯುತ್ತಿರುವ ಸಕ್ರಿಯ ಸಮಸ್ಯೆಗಳನ್ನು ವೀಕ್ಷಿಸಲು.\nಮುಂದುವರಿಯಲು ಅನುಗುಣವಾದ ಬಟನ್ ಅನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ!`,
    },
    leaveApprove: {
      message: () =>
        `*ನೌಕರರ ರಜೆ ವರದಿಯಾಗಿದೆ*\nಆತ್ಮೀಯ ಉದ್ಯೋಗದಾತರೇ, ಉದ್ಯೋಗಿಯೊಬ್ಬರಿಂದ ರಜೆ ವಿನಂತಿ ಇದೆ\n *ಟಿಕೆಟ್ ಸಂಖ್ಯೆ: RL4545* \n *ಹೆಸರು*: ರಾಮ್ \n *ದಿನಾಂಕಗಳು*: 23/12/2023 \n *ಕಾರಣ* : ಮದುವೆ \n *ಪ್ರಕಾರ* : ರಜೆಯನ್ನು ವಿನಂತಿಸಿ`,
      buttons: [
        { title: "ಅನುಮೋದಿಸಿ", id: "request_approve" },
        { title: "ತಿರಸ್ಕರಿಸಿ", id: "request_reject" },
        { title: "ಹಿಡಿದುಕೊಳ್ಳಿ", id: "request_hold" },
      ],
    },
    activeIssues: {
      message: () =>
        `*ಉದ್ಯೋಗಿಗಳ ಸಮಸ್ಯೆ ವರದಿ*\nಆತ್ಮೀಯ ಉದ್ಯೋಗದಾತರೇ, ಉದ್ಯೋಗಿಯೊಬ್ಬರು ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಿದ್ದಾರೆ:\n *ನೌಕರರ ಹೆಸರು* : ಶಾಮ್ \n *ಸಮಸ್ಯೆ* : ಸಂಬಳ \n *ಸಮಸ್ಯೆ ವಿವರ* : ಸಂಬಳ ಕಡಿಮೆಯಾಗಿದೆ\nದಯವಿಟ್ಟು ಸೂಕ್ತ ಕ್ರಮ ಕೈಗೊಳ್ಳಿ ಈ ಕಾಳಜಿಯನ್ನು ಪರಿಹರಿಸಲು.`,
      buttons: [
        { title: "ಅನುಮೋದಿಸಿ", id: "issue_approve" },
        { title: "ತಿರಸ್ಕರಿಸಿ", id: "issue_reject" },
        { title: "ಹಿಡಿದುಕೊಳ್ಳಿ", id: "issue_hold" },
      ],
    },
    issue_approve: {
      message: () =>
        "ಸ್ಥಿತಿ ಅಪ್‌ಡೇಟ್: ಅನುಮೋದಿಸಲಾಗಿದೆ\nನಿಮ್ಮ ವಿನಂತಿ/ಅರ್ಜಿಯನ್ನು ಅನುಮೋದಿಸಲಾಗಿದೆ ಎಂದು ನಿಮಗೆ ತಿಳಿಸಲು ನಾವು ಸಂತೋಷಪಡುತ್ತೇವೆ!\nನಿಮ್ಮ ತಾಳ್ಮೆ ಮತ್ತು ಸಹಕಾರಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು.",
    },
    issue_reject: {
      message: () =>
        "ಸ್ಥಿತಿ ಅಪ್‌ಡೇಟ್: ತಿರಸ್ಕರಿಸಲಾಗಿದೆ \nನಿಮ್ಮ ವಿನಂತಿ/ಅರ್ಜಿಯನ್ನು ತಿರಸ್ಕರಿಸಲಾಗಿದೆ ಎಂದು ನಿಮಗೆ ತಿಳಿಸಲು ನಾವು ವಿಷಾದಿಸುತ್ತೇವೆ.\nನಿಮ್ಮ ತಿಳುವಳಿಕೆಯನ್ನು ನಾವು ಪ್ರಶಂಸಿಸುತ್ತೇವೆ.",
    },
    isuue_hold: {
      message: () =>
        "ಸ್ಥಿತಿ ನವೀಕರಣ: ತಡೆಹಿಡಿಯಲಾಗಿದೆ \nನಾವು ಪರಿಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸುವಾಗ ಮತ್ತು ನಿರ್ಣಯಿಸುವಾಗ ನಿಮ್ಮ ವಿನಂತಿ/ಅಪ್ಲಿಕೇಶನ್ ಪ್ರಸ್ತುತ ತಡೆಹಿಡಿಯಲಾಗಿದೆ.\nಈ ಸಮಯದಲ್ಲಿ ನಿಮ್ಮ ತಾಳ್ಮೆಯನ್ನು ನಾವು ಪ್ರಶಂಸಿಸುತ್ತೇವೆ.",
    },
    request_: {
      message: () =>
        "*ರಜೆ ವಿನಂತಿ ನವೀಕರಣ*\nನಿಮ್ಮ ರಜೆ ವಿನಂತಿಯನ್ನು ಈಗ ನವೀಕರಿಸಲಾಗಿದೆ. ನಮ್ಮ ರಜೆ ನಿರ್ವಹಣೆ ವ್ಯವಸ್ಥೆಯನ್ನು ಬಳಸಿದ್ದಕ್ಕೆ ಧನ್ಯವಾದಗಳು.",
    },
    request_approve: {
      message: () => "",
    },
    request_reject: {
      message: () => "",
    },
    request_hold: {
      message: () => "",
    },
    signupStart: {
      message: () =>
        "ನಾವು ಈಗ ಎರಡು ಡೆಮೊಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದ್ದೇವೆ. 1 ತಿಂಗಳ ಉಚಿತ ಪ್ರಯೋಗಕ್ಕಾಗಿ ಸೈನ್ ಅಪ್ ಮಾಡಿ.ಪ್ರಯೋಗದ ನಂತರ: 20 ಉದ್ಯೋಗಿಗಳಿಗೆ ರೂ.399",
      buttons: [{ id: "signup", title: "ಸೈನ್ ಅಪ್ ಉಚಿತ ಪ್ರಯೋಗ" }],
    },
    signup: {
      message: () => ({
        body: "'ಸೈನ್ ಅಪ್' ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡುವ ಮೂಲಕ ಮತ್ತು ಫಾರ್ಮ್ ಅನ್ನು ಭರ್ತಿ ಮಾಡುವ ಮೂಲಕ ಸೈನ್ ಅಪ್ ಮಾಡಿ.",
        label: {
          title: "ಸೈನ್ ಅಪ್",
          namelabel: "ಪೂರ್ಣ ಹೆಸರು",
          companylabel: "ಕಂಪೆನಿ ಹೆಸರು",
          bufferlabel: "ಬಫರ್ ಇನ್/ಔಟ್ ನಿಮಿಷಗಳು",
        },
      }),
    },
    uploadEmployee: {
      message: () => "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಎಲ್ಲಾ ನಿರ್ವಾಹಕ ಸಂಪರ್ಕ ವಿವರಗಳನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ.",
    },
    addEmployee: {
      message: (employeeName, employeeNumber, timing, geofen) =>
        `ಸೇರಿದೆ:\n*ಹೆಸರು*: ${employeeName}\n*ಸಂಖ್ಯೆ*: ${employeeNumber}\n*ರೀತಿ*: ${timing}\n*ಜಿಯೋಫೆನ್ಸಿಂಗ್*: ${geofen}`,
    },
    ticketUpdate: {
      message: (ticketNumber) =>
        `ಟಿಕೆಟ್ ನಂ: ${ticketNumber} ಯ ಸ್ಥಿತಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ`,
    },
    employeeDemoStart: {
      buttons: [{ id: "MarkAttendance", title: "ಹಾಜರಾಗಿರಿ ಗುರುತಿಸಿ" }],

      message: () =>
        `1️⃣ *ಉದ್ಯೋಗಿ ಡೆಮೊ ಹಂತಗಳು*:\n a. ✅ ಮಾರ್ಕ್ ಹಾಜರಾತಿ\n ಬಿ. 🙋 ವಿನಂತಿ ರಜೆ\n ಸಿ. 🎫 ಟಿಕೆಟ್ ಅನ್ನು ಹೆಚ್ಚಿಸಿ\n ಡಿ. 📊 ವರದಿಯನ್ನು ವೀಕ್ಷಿಸಿ\n2️⃣ *ಉದ್ಯೋಗದಾತ ಡೆಮೊ ಹಂತಗಳು* (ನೌಕರ ಡೆಮೊ ಹಂತಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದ ನಂತರ)`,
    },
    employerStart: {
      message: () =>
        `ಹಲೋ, ದಯವಿಟ್ಟು ಕೆಳಗಿನ ಆಯ್ಕೆಗಳಿಂದ ಒಂದು ಆಯ್ಕೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:\n\n1️⃣. ವರದಿ ಪಡೆಯಿರಿ: ವಿವರವಾದ ವರದಿಯನ್ನು ಸ್ವೀಕರಿಸಲು ಈ ಬಟನ್ ಅನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ..\n2️⃣. ಅನುಮೋದನೆಗಳು: ಉದ್ಯೋಗಿ ರಜೆ ಅನುಮೋದನೆಗಳನ್ನು ಪರಿಶೀಲಿಸುವ ಅಥವಾ ನಿರ್ವಹಿಸುವ ಅಗತ್ಯವಿದೆಯೇ? ನ್ಯಾವಿಗೇಟ್ ಮಾಡಲು ಈ ಬಟನ್ ಅನ್ನು ಬಳಸಿ.\n3️⃣. ಪ್ರೊಫೈಲ್/ಸೆಟ್ಟಿಂಗ್‌ಗಳು: ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಮತ್ತು ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಇಲ್ಲಿ ನಿರ್ವಹಿಸಿ.`,
      buttons: [
        { id: "employerReports", title: "அறிக்கை பெற" },
        { id: "approvals", title: "ಅನುಮೋದನೆಗಳು" },
        { id: "profile-settings", title: "ಪ್ರೊಫೈಲ್ ಸೆಟ್ಟಿಂಗ್‌" },
      ],
    },
  },
  Gujarati: {
    hi: {
      message: (name) =>
        `હેલો ${name} 👋\n\n હું તમારો મિત્રપ્રિય અટેન્ડન્સ બોટ છું, તમારા સહાય કરવા માટે અહીં છું.🤖 \n ચાલો શરૂ કરીએ.✨`,
      buttons: [
        {
          id: "MarkAttendance",
          title: "હાજરી આપો✅",
        },
        {
          id: "Report",
          title: "અહેવાલ✉️",
        },
        {
          id: "Other",
          title: "અન્ય🔄",
        },
      ],
    },
    startempdemo: {
      message: () =>
        "ચાલો *હાજરી ચિહ્નિત કરવા માટે પગલું-દર-પગલાની પ્રક્રિયા શરૂ કરીએ.* \n 📣 પોસ્ટ-સાઇનઅપ, તમારી પાસે સ્થાન-વિશિષ્ટ કર્મચારી મેપિંગને સુનિશ્ચિત કરીને, તમારા માસ્ટર સેટિંગ્સમાં જિયો-ફેન્સિંગને ગોઠવવાની ક્ષમતા છે.",
      buttons: [{ id: "mark_attendance", title: "હાજરી માર્ક કરો" }],
    },
    MarkAttendance: {
      message: () =>
        "*પગલું 1- હાજરીને ચિહ્નિત કરો*\n - તેમના કામકાજના દિવસની શરૂઆતને ચિહ્નિત કરવા માટે, કર્મચારીઓ    [માં] પર ક્લિક કરશે.\n- તેમના કામના દિવસનો અંત દર્શાવવા માટે, તેઓ 🔴 [બહાર] પસંદ કરશે.",
      buttons: [
        { id: "in", title: "🟢 માં" },
        { id: "out", title: "🔴 બહાર" },
      ],
    },
    in: {
      message: () =>
        "*સ્થાન* \n📍 કૃપા કરીને આ પગલાંને અનુસરીને તમારું વર્તમાન સ્થાન શેર કરો:\n1. 📩 આ સંદેશ પસંદ કરો.\n2. 💬 'જવાબ' પર ક્લિક કરો.\n3. 📎 જોડાણ અથવા ક્લિપ આઇકન પર ટૅપ કરો.\n4. 📍'સ્થાન' પસંદ કરો.\n5. ✅ 'તમારું વર્તમાન સ્થાન મોકલો' પસંદ કરો .",
    },
    out: {
      message: () =>
        "*સ્થાન* \n📍 કૃપા કરીને આ પગલાંને અનુસરીને તમારું વર્તમાન સ્થાન શેર કરો:\n1. 📩 આ સંદેશ પસંદ કરો.\n2. 💬 'જવાબ' પર ક્લિક કરો.\n3. 📎 જોડાણ અથવા ક્લિપ આઇકન પર ટૅપ કરો.\n4. 📍'સ્થાન' પસંદ કરો.\n5. ✅ 'તમારું વર્તમાન સ્થાન મોકલો' પસંદ કરો .",
    },
    attendanceLocation: {
      message: () => "📸 હાજરી માટે, કૃપયા આપનો સ્થાન દર્શાવતી ફોટો મોકલો જો છો.",
    },
    clickAttendanceLocation: {
      message: () =>
        "*⚠️ સોંપવો નહીં* . પ્રથમ, ખાતરી લો કે તમે *જવાબ આપી* રહ્યા છો, પછી 'તમારો વર્તમાન સ્થાન મોકલો' પસંદ કરો.\n📍 આપનો વર્તમાન સ્થાન આપવાની પ્રક્રિયા આને અનુસરો:\n1. 📩 આ સંદેશ પસંદ કરો.\n2. 💬 'જવાબ આપો' પર ક્લિક કરો.\n3. 📎 એટેચમેન્ટ અથવા ક્લિપ આઇકન પર ટેપ કરો.\n4. 📍 'સ્થાન' પસંદ કરો.",
    },
    attendancePic: {
      message: () => "📸 કૃપા કરીને તમારી સેલ્ફી ફોટો મોકલો 🤳.",
    },
    startLeaveRequest: {
      message: () =>
        "અમે હાજરી ડેમોને ચિહ્નિત કરવાનું સફળતાપૂર્વક પૂર્ણ કર્યું છે.\nઆગલો ડેમો એ છે કે તમારો કર્મચારી કેવી રીતે *રજાની વિનંતી કરી શકે છે*",
      buttons: [{ id: "requestLeave", title: "Start Request Leave" }],
    },
    Report: {
      message: () => "તમારી વર્તમાન મહિનાની અથવા પાછલા મહિનાની અહેવાલ ડાઉનલોડ કરો.",
      buttons: [
        {
          id: "currentMonth",
          title: "વર્તમાન મહિનો",
        },
        {
          id: "previousMonth",
          title: "પાછલા મહિનો",
        },
      ],
    },
    Other: {
      message: () =>
        "હેલો! આજે અમે તમારી કેવી રીતે સહાય કરી શકીએ? કૃપા કરીને નીચેના વિકલ્પોમાંથી ચયન કરો.",
      buttons: [
        {
          id: "requestLeave",
          title: "કૃપાસ્વરૂપ અવકાશ",
        },
        {
          id: "support",
          title: "આધાર",
        },
        // {
        //   id: 'question',
        //   title: 'પ્રશ્ન કરો',
        // },
      ],
    },
    requestLeave: {
      message: () =>
        "થોડો વિરામ લેવાનું વિચારી રહ્યાં છો?\nકૃપા કરીને અમને જણાવો કે તમે કેટલા દિવસો માટે વિરામ લેવા માગો છો:",
      buttons: [
        { id: "oneDay", title: "એક દિવસ" },
        { id: "moreThanOneDay", title: "એક દિવસ કરતાં વધુ" },
      ],
    },
    oneDay: {
      message: () => ({
        body: "કૃપયા નીચેનો બટન દબાવીને તારીખ અને કારણ ની વ્યાખ્યાની રીતે નમૂનીકરણ કરો",
        label: {
          title: "અવકાશનો વિનંતી",
          startdatelabel: "શરૂ તારીખ",
          enddatelabel: "અંત તારીખ",
          reasonlabel: "અવકાશનો કારણ",
        },
      }),
    },
    moreThanOneDay: {
      message: () => ({
        body: "કૃપયા નીચેનો બટન દબાવીને તારીખ અને કારણ ની વ્યાખ્યાની રીતે નમૂનીકરણ કરો",
        label: {
          title: "અવકાશનો વિનંતી",
          startdatelabel: "શરૂ તારીખ",
          enddatelabel: "અંત તારીખ",
          reasonlabel: "અવકાશનો કારણ",
        },
      }),
    },
    leaveSummary: {
      message: (
        employeeName,
        department,
        leaveType,
        startDate,
        endDate,
        reasonForLeave,
        ticketNumber,
        recipientPhone
      ) =>
        `Name: *${employeeName}*\nDepartment: *${
          department ?? "-"
        }*\nFor: *રજા માટે વિનંતી*\nરજા પ્રકાર: *${leaveType}*\nપ્રારંભ તારીખ: *${startDate}*\n${
          endDate !== "Invalid Date" ? `અંત તારીખ: *${endDate}*\n` : ""
        }કારણ: *${reasonForLeave}*\nનંબર : *${recipientPhone}*\nટિકટ નંબર : *${ticketNumber}*`,
    },
    startSupport: {
      message: () =>
        "અમે રજાની વિનંતીનું ડેમો સફળતાપૂર્વક પૂર્ણ કર્યું છે. \n આગળનું ડેમો - તમારા કર્મચારી કેવી રીતે ટિકિટ ઉઠાવી શકે",
      buttons: [{ id: "support", title: "સપોર્ટ" }],
    },
    support: {
      message: () =>
        "*ટિકિટ વધારો* \n તમે નીચે આપેલા મુદ્દાના પ્રકારો પર ક્લિક કરીને ટિકિટ વધારી શકો છો",
      buttons: [
        { id: "checkIn", title: "ચેક-ઇન & ચેક-આઉટ" },
        { id: "Salary_Issue", title: "પગારની સમસ્યા" },
        { id: "other_issue", title: "અન્ય" },
      ],
    },
    checkIn: {
      message: () => "કૃપા કરીને તમારી ટિપ્પણી ટાઇપ કરો.",
    },
    checkOut: {
      message: () => "કૃપા કરીને તમારી ટિપ્પણી ટાઇપ કરો.",
    },
    other_issue: {
      message: () => "કૃપા કરીને તમારી ટિપ્પણી ટાઇપ કરો.",
    },
    Salary_Issue: {
      message: () => "કૃપા કરીને તમારી ટિપ્પણી ટાઇપ કરો.",
    },
    employeeIssue: {
      message: () => "કૃપા કરીને તમારી ટિપ્પણી ટાઇપ કરો.",
    },
    registerComplain: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `નામ: *${name}*\nવિભાગ: *${
          department ?? "-"
        }*\nમાટે: *સહાય*\nસમસ્યા: *${problem}*\nટિપ્પણી: *${message}*\nનંબર: *${recipientPhone}*\nટિકટ નંબર: *${ticketNumber}*`,
    },
    employeeReportStart: {
      message: () =>
        "અમે કર્મચારી દ્વારા વધારવામાં આવેલ સપોર્ટ ટિકિટ સફળતાપૂર્વક પૂર્ણ કરી છે\nઆગળ - મૂળભૂત *રિપોર્ટ* છે જે કર્મચારી જોઈ શકે છે",
      buttons: [
        {
          title: "વર્તમાન મહિનો",
          id: "  employe_report1",
        },
      ],
    },
    employerDemoStart: {
      message: () =>
        "અમે કર્મચારી ડેમો પૂર્ણ કર્યો છે\nઆગામી - *નોકરીદાતા ડેમો*:\na. 📑 રિપોર્ટ્સ જુઓ\nb. કર્મચારી યાદી જુઓ\nc. ✍️ રજાનું મંજૂર કરો\nd. ❌ ટિકટ્સને સુલઝાઓ",
      buttons: [{ id: "isEmployer", title: "કર્મચારી ડેમો શરૂ" }],
    },
    employerReports: {
      message: () =>
        "એમ્પ્લોયર માટે પ્રથમ લક્ષણ રિપોર્ટ્સ છે.\nનીચે એમ્પ્લોયર માટે કેટલાક મૂળભૂત *અહેવાલ* છે",
      buttons: [
        {
          id: "liveReport",
          title: "લાઇવ રિપોર્ટ",
        },
        {
          id: "emp_master_sheet",
          title: "બધા કર્મચારીઓ બતાવો",
        },
      ],
    },
    liveReport: {
      message: () => "ચાલો મંજૂરીઓ એમ્પ્લોયર ડેમો શરૂ કરીએ\nનીચેના કોઈપણ બટન પર ક્લિક કરો",
      buttons: [
        {
          title: "Tickets & Approvals",
          id: "approvals",
        },
      ],
    },
    emp_master_sheet: {
      message: () => "ચાલો મંજૂરીઓ એમ્પ્લોયર ડેમો શરૂ કરીએ\nનીચેના કોઈપણ બટન પર ક્લિક કરો",
      buttons: [
        {
          title: "Tickets & Approvals",
          id: "approvals",
        },
      ],
    },
    approvals: {
      buttons: [
        { title: "રજા-અનુદાન", id: "leaveApprove" },
        { title: "સક્રિય-મુદ્દો", id: "activeIssues" },
      ],
      message: () =>
        `હેલો,કૃપા કરીને નીચેનો એક વિકલ્પ પસંદ કરો:\n 1️⃣ પાંદડા મંજૂર કરવા માટે.\n 2️⃣ તમારી મંજૂરીની રાહ જોઈ રહેલા સક્રિય મુદ્દાઓ જોવા માટે.\nઆગળ વધવા માટે ફક્ત અનુરૂપ બટન પર ક્લિક કરો!`,
    },
    leaveApprove: {
      message: () =>
        `*કર્મચારી રજાની જાણ*\nપ્રિય એમ્પ્લોયર, એક કર્મચારી દ્વારા રજાની વિનંતી છે\n *ટિકિટ નંબર: RL4545* \n *નામ*: રામ \n *તારીખ*: 23/12/2023 \n *કારણ* : લગ્ન \n *પ્રકાર* : રજાની વિનંતી કરો`,
      buttons: [
        { title: "મંજૂર", id: "request_approve" },
        { title: "અસ્વીકાર", id: "request_reject" },
        { title: "ધરાવું", id: "request_hold" },
      ],
    },
    activeIssues: {
      message: () =>
        `*કર્મચારી ઈસ્યુ રિપોર્ટ*\nપ્રિય એમ્પ્લોયર, કર્મચારી દ્વારા એક સમસ્યાની જાણ કરવામાં આવી છે:\n *કર્મચારીનું નામ* : શામ \n *સમસ્યા* : પગાર \n *સમસ્યાનું વર્ણન* : પગાર ઓછો જમા\nકૃપા કરીને યોગ્ય પગલાં લો આ ચિંતાને દૂર કરવા માટે.`,
      buttons: [
        { title: "મંજૂર", id: "issue_approve" },
        { title: "અસ્વીકાર", id: "issue_reject" },
        { title: "ધરાવું", id: "issue_hold" },
      ],
    },
    issue_approve: {
      message: () =>
        "સ્થિતિ અપડેટ: હોલ્ડ પર \nઅમે પરિસ્થિતિની સમીક્ષા અને મૂલ્યાંકન કરીએ છીએ ત્યાં સુધી તમારી વિનંતી/અરજી હાલમાં હોલ્ડ પર છે.\nઆ સમય દરમિયાન અમે તમારી ધીરજની પ્રશંસા કરીએ છીએ.",
    },
    issue_reject: {
      message: () =>
        "સ્થિતિ અપડેટ: અસ્વીકાર \nઅમે તમને જણાવતા ખેદ અનુભવીએ છીએ કે તમારી વિનંતી/અરજી નકારી કાઢવામાં આવી છે.\nઅમે તમારી સમજની પ્રશંસા કરીએ છીએ.",
    },
    isuue_hold: {
      message: () =>
        "સ્થિતિ અપડેટ: હોલ્ડ પર \nઅમે પરિસ્થિતિની સમીક્ષા અને મૂલ્યાંકન કરીએ છીએ ત્યાં સુધી તમારી વિનંતી/અરજી હાલમાં હોલ્ડ પર છે.\nઆ સમય દરમિયાન અમે તમારી ધીરજની પ્રશંસા કરીએ છીએ.",
    },
    request_: {
      message: () =>
        "*રજા વિનંતી અપડેટ કરવામાં આવી*\nતમારી રજા વિનંતી હવે અપડેટ કરવામાં આવી છે. અમારી રજા વ્યવસ્થાપન પ્રણાલીનો ઉપયોગ કરવા બદલ આભાર.",
    },
    request_approve: {
      message: () => "",
    },
    request_reject: {
      message: () => "",
    },
    request_hold: {
      message: () => "",
    },
    signupStart: {
      message: () =>
        "અમે હવે બે ડેમો પૂર્ણ કર્યા છે. 1 મહિનાની મફત અજમાયશ માટે સાઇન અપ કરો.ટ્રાયલ પછી: 20 જેટલા કર્મચારીઓ માટે રૂ.399",
      buttons: [{ id: "signup", title: "મુકાબલો નવાચાર" }],
    },
    signup: {
      message: () => ({
        body: "'સાઇન અપ' બટન પર ક્લિક કરીને અને ફોર્મ ભરીને સાઇન અપ કરો.",
        label: {
          title: "સાઇન અપ",
          namelabel: "પૂરું નામ",
          companylabel: "કંપનીનું નામ",
          bufferlabel: "બફર ઇન/આઉટ મિનિટ",
        },
      }),
    },
    uploadEmployee: {
      message: () => "કૃપા કરીને તમામ કર્મચારીઓનો સંપર્ક માહિતી અપલોડ કરો.",
    },
    addEmployee: {
      message: (employeeName, employeeNumber, timing, geofen) =>
        `ઉમેર્યું છે:\n*નામ*: ${employeeName}\n*નંબર*: ${employeeNumber}\n*પ્રકાર*: ${timing}\n*જીઓફેન્સિંગ*: ${geofen}`,
    },
    ticketUpdate: {
      message: (ticketNumber) => `ટિકટ નંબર: ${ticketNumber} નું સ્થિતિ સફળતાપૂર્વક અપડેટ કરાઈ છે`,
    },
    employeeDemoStart: {
      buttons: [{ id: "MarkAttendance", title: "હાજરી મારો" }],

      message: () =>
        `1️⃣ *કર્મચારી ડેમો સ્ટેપ્સ*:\n a. ✅ હાજરી ચિહ્નિત કરો\n b. 🙋 રજાની વિનંતી કરો\n c. 🎫 ટિકિટ વધારો\n ડી. 📊 રિપોર્ટ જુઓ\n2️⃣ *એમ્પ્લોયર ડેમો સ્ટેપ્સ* (કર્મચારી ડેમો સ્ટેપ્સ પૂર્ણ કર્યા પછી)`,
    },
    employerStart: {
      message: () =>
        "હેલો, કૃપયા આવતા વિકલ્પોમાંથી એક વિકલ્પ પસંદ કરો:\n\n1️⃣. રિપોર્ટ મેળવો: વિસ્તારથી રિપોર્ટ મેળવવા માટે આ બટન દબાવો..\n2️⃣. મંજૂરીઓ: કર્મચારીના મંજૂરીઓને તપાસવા અથવા વ્યવસ્થાપન કરવાની જરૂર છે? આ બટનનો ઉપયોગ કરીને સંચરણ કરવા માટે વાપરો.\n3️⃣. પ્રોફાઇલ/સેટિંગ્સ: તમારી પ્રોફાઇલ અને સેટિંગ્સને અહીં મેનેજ કરો.",
      buttons: [
        { id: "employerReports", title: "રિપોર્ટ મેળવો" },
        { id: "approvals", title: "મંજૂરીઓ" },
        { id: "profile-settings", title: "પ્રોફાઇલ સેટિંગ" },
      ],
    },
  },
  Odia: {
    hi: {
      message: (name) =>
        `ହେଲୋ ${name} 👋\n\n ମୁଁ ଆପଣଙ୍କ ସୌହାର୍ଦପୂର୍ଣ ଅଟେଣ୍ଡାନ୍ସ୍ ବଟ୍, ଆପଣକୁ ସହାୟ୍ୟ କରିବା ପାଇଁ ଇଥିରେ ଅଛି।🤖 \n ଆରମ୍ଭ କରିବା ପାଇଁ, ଚାଲନ୍ତୁ.✨`,
      buttons: [
        {
          id: "MarkAttendance",
          title: "ହାଜିର ରଖନ୍ତୁ✅",
        },
        {
          id: "Report",
          title: "ରିପୋର୍ଟ✉️",
        },
        {
          id: "Other",
          title: "ଅନ୍ୟ🔄",
        },
      ],
    },
    startempdemo: {
      message: () =>
        "ଚାଲନ୍ତୁ ତାକେ ସମଯରେ ଆପଣ *ହାଜରୀ* ଚିହ୍ନିତ କରନ୍ତୁ, ଆମେ ସେତେ ପରି ସ୍ଥିତି ରେ ଅନୁସରଣ କରିବୁ ଯାହା *ହାଜରୀ* କରନ୍ତୁ। \n 📣 ସାଇନ୍ ଅପ୍ କରିବାରେ, ଆପଣଙ୍କର ମୁଖ୍ୟ ସେଟିଂସରେ ଜିଓ-ଫେନ୍ସିଂ କୋନଫିଗୁରେସନ୍ (ଭୌଗୋଳିକ ସୀମାନ୍ତ) କରାଯାଇଛ, ଯାହାରେ ସ୍ଥାନ-ବିଶେଷ କର୍ମଚାରୀ ମ୍ୟାପିଂ ନିଶ୍ଚିତ ହୋଇଥାଏ।",
      buttons: [{ id: "mark_attendance", title: "ହାଜର ଚିହ୍ନିତ କରନ୍ତୁ" }],
    },
    MarkAttendance: {
      message: () =>
        "* ଷ୍ଟେପ୍ 1- ମାର୍କ ଉପସ୍ଥାନ *  n - ସେମାନଙ୍କର କାର୍ଯ୍ୟ ଦିବସ ଆରମ୍ଭ କରିବାକୁ, କର୍ମଚାରୀମାନେ    [ଭିତରେ] ଉପରେ କ୍ଲିକ୍ କରିବେ |  n- ସେମାନଙ୍କର କାର୍ଯ୍ୟଦିବସ ଶେଷ କରିବାକୁ ସୂଚାଇବା ପାଇଁ, ସେମାନେ 🔴 [ବାହାରେ] ଚୟନ କରିବେ |",
      buttons: [
        { id: "in", title: "🟢 ଭିତରେ" },
        { id: "out", title: "🔴 ବାହାରେ" },
      ],
    },
    in: {
      message: () =>
        "* ପଦାଙ୍କ 2: ଅବସ୍ଥାନ *  n📍 ଦୟାକରି ଏହି ପଦକ୍ଷେପଗୁଡ଼ିକୁ ଅନୁସରଣ କରି ଆପଣଙ୍କର ସାମ୍ପ୍ରତିକ ଅବସ୍ଥାନ ଅଂଶୀଦାର କରନ୍ତୁ:  n1 | ଏହି ବାର୍ତ୍ତା ଚୟନ କରନ୍ତୁ  n2 'ଉତ୍ତର' କ୍ଲିକ୍ କରନ୍ତୁ  n3 | ସଂଲଗ୍ନ କିମ୍ବା କ୍ଲିପ୍ ଆଇକନ୍ ଟ୍ୟାପ୍ କରନ୍ତୁ  n4 'ଅବସ୍ଥାନ' ଚୟନ କରନ୍ତୁ  n5 'ଆପଣଙ୍କର ସାମ୍ପ୍ରତିକ ଅବସ୍ଥାନ ପଠାନ୍ତୁ' ଚୟନ କରନ୍ତୁ |",
    },
    out: {
      message: () =>
        "* ପଦାଙ୍କ 2: ଅବସ୍ଥାନ *  n📍 ଦୟାକରି ଏହି ପଦକ୍ଷେପଗୁଡ଼ିକୁ ଅନୁସରଣ କରି ଆପଣଙ୍କର ସାମ୍ପ୍ରତିକ ଅବସ୍ଥାନ ଅଂଶୀଦାର କରନ୍ତୁ:  n1 | ଏହି ବାର୍ତ୍ତା ଚୟନ କରନ୍ତୁ  n2 'ଉତ୍ତର' କ୍ଲିକ୍ କରନ୍ତୁ  n3 | ସଂଲଗ୍ନ କିମ୍ବା କ୍ଲିପ୍ ଆଇକନ୍ ଟ୍ୟାପ୍ କରନ୍ତୁ  n4 'ଅବସ୍ଥାନ' ଚୟନ କରନ୍ତୁ  n5 'ଆପଣଙ୍କର ସାମ୍ପ୍ରତିକ ଅବସ୍ଥାନ ପଠାନ୍ତୁ' ଚୟନ କରନ୍ତୁ |",
    },
    attendanceLocation: {
      message: () =>
        "📸 ଉପସ୍ଥିତି ପାଇଁ, ଦୟାକରି ଆପଣଙ୍କୁ ଆପଣଙ୍କର ସ୍ଥାନରେ ଆପଣଙ୍କୁ ଦେଖାଇବା ଛବି ପଠାନ୍ତୁ।",
    },
    clickAttendanceLocation: {
      message: () =>
        "*⚠️ ସ୍ଥାନରେ ଦେଇ ନଦିଆ* . ପ୍ରଥମେ, ଆପଣ *ପାଇଁ ପ୍ରତିଉତ୍ତରକୁ ଉତ୍ତର୍କୁ*, ପରେ 'ସ୍ଥାନ ପଠାନ୍ତୁ' ଚୟନ କରନ୍ତୁ:\n1. 📩 ଏହା ସଂଦଶକରୁ ଚୟନ କରନ୍ତୁ।\n2. 💬 'ଜବା' କ୍ଲିକ କରନ୍ତୁ।\n3. 📎 ଆଟାଚ୍‌ମେଣ୍ଟ କିମ୍ବା କ୍ଲିପ୍‌ ଆଇକନ୍‌ ଟିପିନ୍‌।\n4. 📍 'ସ୍ଥାନ' ଚୟନ କରନ୍ତୁ।",
    },
    attendancePic: {
      message: () => "📸 ଆପଣଙ୍କ ଏକ ସେଲଫି ଫୋଟୋ ପଠାନ୍ତୁ 🤳।",
    },
    startLeaveRequest: {
      message: () =>
        "ଆମେ ଉପସ୍ଥାନ ଡେମୋକୁ ସଫଳତାର ସହିତ ମାର୍କିଂ କରିସାରିଛୁ।  n ପରବର୍ତ୍ତୀ ଡେମୋ ହେଉଛି ଆପଣଙ୍କର କର୍ମଚାରୀ କିପରି * ଛୁଟି ଅନୁରୋଧ * କରିପାରିବେ |",
      buttons: [{ id: "requestLeave", title: "Start Request Leave" }],
    },
    Report: {
      message: () => "ଆପଣଙ୍କ ବର୍ତ୍ତମାନ ମାସ ରିପୋର୍ଟ କିମ୍ବା ପୂର୍ବ ମାସ ରିପୋର୍ଟ ଡାଉନଲୋଡ କରନ୍ତୁ।",
      buttons: [
        {
          id: "currentMonth",
          title: "ଏହି ମାସ",
        },
        {
          id: "previousMonth",
          title: "ପୂର୍ବବର୍ତ୍ତୀ ମାସ",
        },
      ],
    },
    Other: {
      message: () => "ହେଲୋ! ଆଜି ଆମେ କେମିତି ଆପଣଙ୍କୁ ସହାୟ୍ୟ କରିପାରି? ଦୟାକରି ନୀଚେରୁ ଚୟନ କରନ୍ତୁ।",
      buttons: [
        {
          id: "requestLeave",
          title: "ଅବକାଶ ବିନନ୍ତି",
        },
        {
          id: "support",
          title: "ସମର୍ଥନ",
        },
        // {
        //   id: 'question',
        //   title: 'ପ୍ରଶ୍ନ କର',
        // },
      ],
    },
    requestLeave: {
      message: () =>
        "ଟିକେ ବିରତି ନେବାକୁ ଚିନ୍ତା କରୁଛନ୍ତି କି?  N ଦୟାକରି ଆମକୁ ଜଣାନ୍ତୁ ଆପଣ କେତେ ଦିନ ଅନୁରୋଧ କରିବାକୁ ଚାହୁଁଛନ୍ତି:",
      buttons: [
        { id: "oneDay", title: "ଏକ ଦିନ" },
        { id: "moreThanOneDay", title: "ଏକ ଦିନ ବାହାରେ" },
      ],
    },
    oneDay: {
      message: () => ({
        body: "ଦୟାକରି ନିଚେ ଦିଆ ବଟନ ଦ୍ୱାରା ତାରିଖ ଏବଂ କାରଣ ସ୍ପେସିଫାଇ କରନ୍ତୁ।",
        label: {
          title: "ଅବକାଶ ଅନୁରୋଧ",
          startdatelabel: "ଆରମ୍ଭ ତାରିଖ",
          enddatelabel: "ଶେଷ ତାରିଖ",
          reasonlabel: "ଛାଡିବାର କାରଣ |",
        },
      }),
    },
    moreThanOneDay: {
      message: () => ({
        body: "ଦୟାକରି ନିଚେ ଦିଆ ବଟନ ଦ୍ୱାରା ତାରିଖ ଏବଂ କାରଣ ସ୍ପେସିଫାଇ କରନ୍ତୁ।",
        label: {
          title: "ଅବକାଶ ଅନୁରୋଧ",
          startdatelabel: "ଆରମ୍ଭ ତାରିଖ",
          enddatelabel: "ଶେଷ ତାରିଖ",
          reasonlabel: "ଛାଡିବାର କାରଣ |",
        },
      }),
    },
    leaveSummary: {
      message: (
        employeeName,
        department,
        leaveType,
        startDate,
        endDate,
        reasonForLeave,
        ticketNumber,
        recipientPhone
      ) =>
        `Name: *${employeeName}*\nDepartment: *${
          department ?? "-"
        }*\nFor: *ଅବକାଶ ପ୍ରାର୍ଥନା*\nଅବକାଶ ପ୍ରକାର: *${leaveType}*\nଶୁରୁ ତାରିଖ: *${startDate}*\n${
          endDate !== "Invalid Date" ? `ଶେଷ ତାରିଖ: *${endDate}*\n` : ""
        }କାରଣ: *${reasonForLeave}*\nନମ୍ବର : *${recipientPhone}*\nଟିକେଟ ନମ୍ବର : *${ticketNumber}*`,
    },
    startSupport: {
      message: () =>
        "ଆମେ ସଫଳଭାବେ ଛୁଟି ନେବା ଅନୁରୋଧ ଡେମୋ ସମାପ୍ତ କରିଛୁ। \n ପରବର୍ତୀ ଡେମୋ - ଆପଣଙ୍କ କର୍ମଚାରୀ କିପରି ଟିକେଟ୍ ଉଠାଇପାରନ୍ତି",
      buttons: [{ id: "support", title: "ସହାୟତା" }],
    },
    support: {
      message: () =>
        "* ଟିକେଟ୍ ବ * ଼ାନ୍ତୁ *  n ଆପଣ ନିମ୍ନରେ ଇସ୍ୟୁ ପ୍ରକାରଗୁଡିକ କ୍ଲିକ୍ କରି ଟିକେଟ୍ ବ raise ାଇବେ",
      buttons: [
        { id: "checkIn", title: "ଚେକ୍-ଇନ୍ & ଚେକ୍-ଆଉଟ୍" },
        { id: "Salary_Issue", title: "ଦରମା ସମସ୍ୟା" },
        { id: "other_issue", title: "ଅନ୍ୟ" },
      ],
    },
    checkIn: {
      message: () => "ଦୟାକରି ଆପଣଙ୍କର ଟିପ୍ପଣୀ ଟାଇପ୍ କରନ୍ତୁ",
    },
    checkOut: {
      message: () => "ଦୟାକରି ଆପଣଙ୍କର ଟିପ୍ପଣୀ ଟାଇପ୍ କରନ୍ତୁ |",
    },
    other_issue: {
      message: () => "ଦୟାକରି ଆପଣଙ୍କର ଟିପ୍ପଣୀ ଟାଇପ୍ କରନ୍ତୁ ",
    },
    Salary_Issue: {
      message: () => "ଦୟାକରି ଆପଣଙ୍କର ଟିପ୍ପଣୀ ଟାଇପ୍ କରନ୍ତୁ ",
    },
    employeeIssue: {
      message: () => "ଦୟାକରି ଆପଣଙ୍କର ଟିପ୍ପଣୀ ଟାଇପ୍ କରନ୍ତୁ |",
    },
    registerComplain: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `ନାମ: *${name}*\nବିଭାଗ: *${
          department ?? "-"
        }*\nପାଇଁ: *ସମର୍ଥନ*\nସମସ୍ୟା: *${problem}*\nମ୍ୟାଣ୍ଟି: *${message}*\nନମ୍ବର: *${recipientPhone}*\nଟିକେଟ୍ ନମ୍ବର: *${ticketNumber}*`,
    },
    employeeReportStart: {
      message: () =>
        "ଆମେ କର୍ମଚାରୀଙ୍କ ଦ୍ support ାରା ସହାୟତା ଟିକେଟ୍ ବ successfully ଼ାଇବାରେ ସଫଳତାର ସହିତ ସମାପ୍ତ କରିଛୁ - ପରବର୍ତ୍ତୀ ହେଉଛି - ମ basic ଳିକ * ରିପୋର୍ଟ * ଯାହା କର୍ମଚାରୀ ଦେଖିପାରିବେ |",
      buttons: [
        {
          title: "ସାମ୍ପ୍ରତିକ ମାସ",
          id: "  employe_report1",
        },
      ],
    },
    employerDemoStart: {
      message: () =>
        "ଆମେ କର୍ମଚାରୀ ଡେମୋ ସମାପ୍ତ କରିଛୁ\nପରବର୍ତ୍ତି - *ନିୟୋକ୍ତା ଡେମୋ*:\na. 📑 ରିପୋର୍ଟ୍‌ ଦେଖନ୍ତୁ\nb. କର୍ମଚାରୀ ତାଲିକା ଦେଖନ୍ତୁ\nc. ✍️ ଅବକାଶ ଅନୁରୋଧଗୁଡ଼ିକୁ ଅନୁମୋଦନ ଦିଅନ୍ତୁ\nd. ❌ ଟିକେଟଗୁଡ଼ିକୁ ସମାଧାନ କରନ୍ତୁ",
      buttons: [{ id: "isEmployer", title: "କର୍ମଚାରୀ ଡେମୋ ଶୁରୁ କ" }],
    },
    employerReports: {
      message: () =>
        "ଚାକିରୀ ପାଇଁ ପ୍ରଥମ ବ feature ଶିଷ୍ଟ୍ୟ ହେଉଛି ରିପୋର୍ଟଗୁଡିକ |  n ନିମ୍ନରେ ନିଯୁକ୍ତିଦାତା ପାଇଁ କିଛି ମ basic ଳିକ * ରିପୋର୍ଟ * ଅଛି |",
      buttons: [
        {
          id: "liveReport",
          title: "ଲାଇଭ୍ ରିପୋର୍ଟ୍",
        },
        {
          id: "emp_master_sheet",
          title: "କର୍ମଚାରୀଙ୍କ ରିପୋର୍ଟ",
        },
      ],
    },
    liveReport: {
      message: () =>
        "ଆସନ୍ତୁ ଅନୁମୋଦନ ନିଯୁକ୍ତିଦାତା ଡେମୋ  n ନିମ୍ନରେ ଥିବା କ button ଣସି ବଟନ୍ କ୍ଲିକ୍ କରନ୍ତୁ |",
      buttons: [
        {
          title: "Tickets & Approvals",
          id: "approvals",
        },
      ],
    },
    emp_master_sheet: {
      message: () =>
        "ଆସନ୍ତୁ ଅନୁମୋଦନ ନିଯୁକ୍ତିଦାତା ଡେମୋ  n ନିମ୍ନରେ ଥିବା କ button ଣସି ବଟନ୍ କ୍ଲିକ୍ କରନ୍ତୁ |",
      buttons: [
        {
          title: "Tickets & Approvals",
          id: "approvals",
        },
      ],
    },
    approvals: {
      buttons: [
        { title: "ଛାଡ-ଅନୁମୋଦନ |", id: "leaveApprove" },
        { title: "ସକ୍ରିୟ-ସମସ୍ୟା |", id: "activeIssues" },
      ],
      message: () =>
        `ନମସ୍କାର, ଦୟାକରି ନିମ୍ନରେ ଏକ ବିକଳ୍ପ ବାଛନ୍ତୁ: \n \n 1️⃣ ପତ୍ର ଅନୁମୋଦନ ପାଇଁ। \n 2️⃣ ଆପଣଙ୍କ ଅନୁମୋଦନକୁ ଅପେକ୍ଷା କରୁଥିବା ସକ୍ରିୟ ସମସ୍ୟାଗୁଡିକ ଦେଖିବା ପାଇଁ | \n ଆଗକୁ ବ to ିବାକୁ କେବଳ ସଂପୃକ୍ତ ବଟନ୍ ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ!`,
    },
    leaveApprove: {
      message: () =>
        `* କର୍ମଚାରୀଙ୍କ ଛୁଟି ରିପୋର୍ଟ ହୋଇଛି * \n ପ୍ରିୟ ନିଯୁକ୍ତିଦାତା, ଜଣେ କର୍ମଚାରୀଙ୍କ ଛୁଟି ଅନୁରୋଧ ଅଛି \n * ଟିକେଟ୍ ନଂ: RL4545 * \n * ନାମ *: ରାମ \n * ତାରିଖ *: 23/12/2023 \n * କାରଣ *: ବିବାହ \n * ପ୍ରକାର *: ଛୁଟି ଅନୁରୋଧ |`,
      buttons: [
        { title: "ଅନୁମୋଦନ", id: "request_approve" },
        { title: "ଅଗ୍ରାହ୍ୟ କରନ୍ତୁ |", id: "request_reject" },
        { title: "ରହିଯାଅ", id: "request_hold" },
      ],
    },
    activeIssues: {
      message: () =>
        `* କର୍ମଚାରୀ ଇସୁ ରିପୋର୍ଟ * \n ପ୍ରିୟ ନିଯୁକ୍ତିଦାତା, ଜଣେ କର୍ମଚାରୀଙ୍କ ଦ୍ reported ାରା ରିପୋର୍ଟ ହୋଇଥିବା ଏକ ସମସ୍ୟା ଅଛି: \n* କର୍ମଚାରୀଙ୍କ ନାମ *: ଶ୍ୟାମ \n * ଇସୁ *: ଦରମା \n * ଇସୁ ବର୍ଣ୍ଣନା *: ଦରମା କମ୍ କ୍ରେଡିଟ୍ \n ଦୟାକରି ଉପଯୁକ୍ତ ପଦକ୍ଷେପ ନିଅନ୍ତୁ | ଏହି ଚିନ୍ତାକୁ ସମାଧାନ କରିବାକୁ |`,
      buttons: [
        { title: "ଅନୁମୋଦନ", id: "issue_approve" },
        { title: "ଅଗ୍ରାହ୍ୟ କରନ୍ତୁ |", id: "issue_reject" },
        { title: "ରହିଯାଅ", id: "issue_hold" },
      ],
    },
    issue_approve: {
      message: () =>
        "ସ୍ଥିତି ଅଦ୍ୟତନ: ଅନୁମୋଦିତ \n ଆମେ ଆପଣଙ୍କୁ ଜଣାଇବାକୁ ଖୁସି ଯେ ଆପଣଙ୍କ ଅନୁରୋଧ / ଆବେଦନ ଅନୁମୋଦିତ ହୋଇଛି! \n ଆପଣଙ୍କର ଧ patience ର୍ଯ୍ୟ ଏବଂ ସହଯୋଗ ପାଇଁ ଆପଣଙ୍କୁ ଧନ୍ୟବାଦ |",
    },
    issue_reject: {
      message: () =>
        "ସ୍ଥିତି ଅଦ୍ୟତନ: ପ୍ରତ୍ୟାଖ୍ୟାନ \n ଆମେ ଆପଣଙ୍କୁ ଜଣାଇବାକୁ ଦୁ regret ଖିତ ଯେ ଆପଣଙ୍କର ଅନୁରୋଧ / ଆବେଦନ ପ୍ରତ୍ୟାଖ୍ୟାନ ହୋଇଛି | \n ଆମେ ଆପଣଙ୍କର ବୁ understanding ାମଣାକୁ ପ୍ରଶଂସା କରୁଛୁ |",
    },
    isuue_hold: {
      message: () =>
        "ସ୍ଥିତି ଅଦ୍ୟତନ: ହୋଲ୍ଡରେ \n ତୁମର ଅନୁରୋଧ / ପ୍ରୟୋଗ ବର୍ତ୍ତମାନ ସ୍ଥିତିରେ ଅଛି ଯେତେବେଳେ ଆମେ ପରିସ୍ଥିତିର ସମୀକ୍ଷା ଏବଂ ମୂଲ୍ୟାଙ୍କନ କରୁ |  ଏହି ସମୟ ମଧ୍ୟରେ ଆମେ ତୁମର ଧ patience ର୍ଯ୍ୟକୁ ପ୍ରଶଂସା କରୁ |",
    },
    request_: {
      message: () =>
        "*ଛୁଟି ଅନୁରୋଧ ଅପଡେଟ୍ କରାଯାଇଛି*\nଆପଣଙ୍କର ଛୁଟି ଅନୁରୋଧ ଏବେ ଅପଡେଟ୍ କରାଯାଇଛି। ଆମର ଛୁଟି ପରିଚାଳନା ବ୍ୟବସ୍ଥା ବ୍ୟବହାର କରିବାର ପାଇଁ ଧନ୍ୟବାଦ।",
    },
    request_approve: {
      message: () => "",
    },
    request_reject: {
      message: () => "",
    },
    request_hold: {
      message: () => "",
    },
    signupStart: {
      message: () =>
        "ଆମେ ବର୍ତ୍ତମାନ ଦୁଇଟି ଡେମୋ ସମାପ୍ତ କରିଛୁ | 1 ମାସ ମାଗଣା ପରୀକ୍ଷା ପାଇଁ ସାଇନ୍ ଅପ୍ କରନ୍ତୁ | ପରୀକ୍ଷା ପରେ: 20 ଜଣ କର୍ମଚାରୀଙ୍କ ପାଇଁ 399 ଟଙ୍କା |",
      buttons: [{ id: "signup", title: "ମୁକାବଲୋ ମୁକ୍ତ ଟ୍ରାଇଆ" }],
    },
    signup: {
      message: () => ({
        body: "'ସାଇନ୍ ଅପ୍' ବଟନ୍ କ୍ଲିକ୍ କରି ଫର୍ମ ପୂରଣ କରି ସାଇନ୍ ଅପ୍ କରନ୍ତୁ",
        label: {
          title: "ସାଇନ ଆପ୍",
          namelabel: "ପୂର୍ଣ ନାମ",
          companylabel: "କମ୍ପାନୀ ନାମ",
          bufferlabel: "ବଫର ଇନ/ଆଉଟ୍ ମିନିଟ",
        },
      }),
    },
    addEmployee: {
      message: (
        employeeName,
        employeeNumber,
        timing,
        geofen
      ) => `ଯୋଗ କରାଯାଇଛି:\n*ନାମ*: ${employeeName}\n*ନମ୍ବର*: ${employeeNumber}\n*ପ୍ରକାର*: ${timing}\n*ଜିଓଫେନସିଂ*: ${geofen}
      `,
    },
    uploadEmployee: {
      message: () => "ଦୟାକରି ସମସ୍ତ କର୍ମଚାରୀଙ୍କ ସମ୍ପର୍କ ଯାହାରେ ଆପଲୋଡ୍ କରନ୍ତି ତାହା କରନ୍ତୁ।",
    },
    ticketUpdate: {
      message: (ticketNumber) =>
        `ଟିକେଟ ନମ୍ବର: ${ticketNumber} ର ଅବସ୍ଥା ସେଥାରେ ଯଥେଷ୍ଟ ସଫଳ ଭାବେ ଆପଡେଟ ହୋଇଛି`,
    },
    employeeDemoStart: {
      buttons: [{ id: "MarkAttendance", title: "ଉପସ୍ଥିତି ଚିହ୍ନିତ" }],

      message: () =>
        "1️⃣ * କର୍ମଚାରୀ ଡେମୋ ଷ୍ଟେପସ୍ *:  n a। ✅ ମାର୍କ ଉପସ୍ଥାନ  n b। Leave ଛୁଟି ଅନୁରୋଧ  n c। A ଟିକେଟ୍ ଉଠାନ୍ତୁ  n d। Report ରିପୋର୍ଟ ଦର୍ଶନ କରନ୍ତୁ  n2️⃣ * ନିଯୁକ୍ତିଦାତା ଡେମୋ ଷ୍ଟେପସ୍ * (କର୍ମଚାରୀ ଡେମୋ ଷ୍ଟେପ୍ ସମାପ୍ତ କରିବା ପରେ)",
    },
    employerStart: {
      message: () =>
        `ନମସ୍କାର, ଦୟାକରି ନିମ୍ନଲିଖିତ ବିକଳ୍ପଗୁଡ଼ିକରୁ ଏକ ବିକଳ୍ପ ବାଛନ୍ତୁ: \n \n1️⃣ | | ରିପୋର୍ଟ ପାଆନ୍ତୁ: ଏକ ବିସ୍ତୃତ ରିପୋର୍ଟ ଗ୍ରହଣ କରିବାକୁ ଏହି ବଟନ୍ କ୍ଲିକ୍ କରନ୍ତୁ .. \n2️⃣ | | ଅନୁମୋଦନ: କର୍ମଚାରୀଙ୍କ ଛୁଟି ଅନୁମୋଦନ ଯାଞ୍ଚ କିମ୍ବା ପରିଚାଳନା କରିବା ଆବଶ୍ୟକ କି? ନେଭିଗେଟ୍ କରିବାକୁ ଏହି ବଟନ୍ ଗୁଡିକ ବ୍ୟବହାର କରନ୍ତୁ |\n3️⃣। ପ୍ରୋଫାଇଲ୍ / ସେଟିଂସମୂହ: ଏଠାରେ ଆପଣଙ୍କର ପ୍ରୋଫାଇଲ୍ ଏବଂ ସେଟିଂସମୂହ ପରିଚାଳନା କରନ୍ତୁ |`,
      buttons: [
        { id: "employerReports", title: "ରିପୋର୍ଟ ପାଆନ୍ତୁ |" },
        { id: "approvals", title: "ଅନୁମୋଦନ" },
        { id: "profile-settings", title: "ପ୍ରୋଫାଇଲ୍ ସେଟିଂ" },
      ],
    },
  },
  Malayalam: {
    hi: {
      message: (name) =>
        `ഹലോ ${name} 👋\n\n ഞാൻ നിനക്ക് സൗഹൃദമായ അടെന്റൻസ് ബോട്ടാണ്, നിനക്ക് സഹായിക്കാൻ ഇവിടെ ഉണ്ട്.🤖 \n ആരംഭിക്കാം.✨`,
      buttons: [
        {
          id: "MarkAttendance",
          title: "ഹാജരാകുക✅",
        },
        {
          id: "Report",
          title: "റിപ്പോർട്ട്✉️",
        },
        {
          id: "Other",
          title: "മറ്റ്🔄",
        },
      ],
    },
    startempdemo: {
      message: () =>
        "*ഹാജർ അടയാളപ്പെടുത്തുന്നതിനുള്ള ഘട്ടം ഘട്ടമായുള്ള പ്രക്രിയ ആരംഭിക്കാം.* \n 📣 സൈൻഅപ്പിന് ശേഷം, ലൊക്കേഷൻ-നിർദ്ദിഷ്‌ട ജീവനക്കാരുടെ മാപ്പിംഗ് ഉറപ്പാക്കിക്കൊണ്ട് നിങ്ങളുടെ മാസ്റ്റർ ക്രമീകരണങ്ങളിൽ ജിയോ-ഫെൻസിംഗ് കോൺഫിഗർ ചെയ്യാനുള്ള കഴിവ് നിങ്ങൾക്കുണ്ട്.",
      buttons: [{ id: "mark_attendance", title: "ഹാജരാണ് ചിഹ്നിക്കുക" }],
    },
    MarkAttendance: {
      message: () =>
        "*ഘട്ടം 1- ഹാജർ അടയാളപ്പെടുത്തുക*\n - അവരുടെ പ്രവൃത്തിദിവസത്തിന്റെ തുടക്കം കുറിക്കാൻ, ജീവനക്കാർ [ഇൻ] എന്നതിൽ ക്ലിക്ക് ചെയ്യും.\n- അവരുടെ പ്രവൃത്തിദിനത്തിന്റെ അവസാനം സൂചിപ്പിക്കാൻ, അവർ 🔴 [പുറത്ത്] തിരഞ്ഞെടുക്കും.",
      buttons: [
        { id: "in", title: "🟢 ഇൻ" },
        { id: "out", title: "🔴 പുറത്ത്" },
      ],
    },
    in: {
      message: () =>
        "*ലൊക്കേഷൻ* \n📍 ഈ ഘട്ടങ്ങൾ പിന്തുടർന്ന് നിങ്ങളുടെ നിലവിലെ ലൊക്കേഷൻ പങ്കിടുക:\n1. 📩 ഈ സന്ദേശം തിരഞ്ഞെടുക്കുക.\n2. 💬 'മറുപടി' ക്ലിക്ക് ചെയ്യുക.\n3. 📎 അറ്റാച്ച്മെന്റ് അല്ലെങ്കിൽ ക്ലിപ്പ് ഐക്കൺ ടാപ്പ് ചെയ്യുക.\n4. 📍'ലൊക്കേഷൻ' തിരഞ്ഞെടുക്കുക.\n5. ✅ 'നിങ്ങളുടെ നിലവിലെ ലൊക്കേഷൻ അയയ്ക്കുക' തിരഞ്ഞെടുക്കുക.",
    },
    out: {
      message: () =>
        "*ലൊക്കേഷൻ* \n📍 ഈ ഘട്ടങ്ങൾ പിന്തുടർന്ന് നിങ്ങളുടെ നിലവിലെ ലൊക്കേഷൻ പങ്കിടുക:\n1. 📩 ഈ സന്ദേശം തിരഞ്ഞെടുക്കുക.\n2. 💬 'മറുപടി' ക്ലിക്ക് ചെയ്യുക.\n3. 📎 അറ്റാച്ച്മെന്റ് അല്ലെങ്കിൽ ക്ലിപ്പ് ഐക്കൺ ടാപ്പ് ചെയ്യുക.\n4. 📍'ലൊക്കേഷൻ' തിരഞ്ഞെടുക്കുക.\n5. ✅ 'നിങ്ങളുടെ നിലവിലെ ലൊക്കേഷൻ അയയ്ക്കുക' തിരഞ്ഞെടുക്കുക.",
    },
    attendanceLocation: {
      message: () => "📸 ഹാജർമാർക്കുകാനായി, ഒരു സ്ഥലം കാണിക്കുന്ന നിന്നെ പ്രദർശിപ്പിക്കുക.",
    },
    clickAttendanceLocation: {
      message: () =>
        "*⚠️ നിന്നെ ലഭിക്കുന്നത്* . ആദ്യം, നിന്നെ *പ്രതിക്രിയ ചെയ്യുന്നതിന്* ഉറപ്പാക്കുക, പിന്നീട് 'നിന്നുള്ള നിന്നും സ്ഥാനം അയയ്ക്കുക' തിരഞ്ഞെടുക്കുക.\n📍 ദയവായി താഴെയുള്ള ചെയ്തികളനുസരിച്ച് നിന്ന് നിന്നും തങ്ങളുടെ സ്ഥാനം പങ്കാളിക്കുക:\n1. 📩 ഈ സന്ദേശം തിരഞ്ഞെടുക്കുക.\n2. 💬 'ഉത്തരവിളി' ക്ലിക്കുചെയ്യുക.\n3. 📎 അടക്കമുള്ള അടയാളം അല്ലെങ്കിൽ ക്ലിപ്പ് ഐക്കൺ ക്ലിക്കുചെയ്യുക.\n4. 📍 'സ്ഥാനം' തിരഞ്ഞെടുക്കുക.\n5. ✅ 'നിന്നുള്ള നിന്നും സ്ഥാനം അയയ്ക്കുക' തിരഞ്ഞെടുക്കുക.",
    },
    attendancePic: {
      message: () => "📸 നിനക്ക് സൗഹൃദമായി ഒരു സെൽഫി ഫോട്ടോ അയച്ചു 🤳.",
    },
    startLeaveRequest: {
      message: () =>
        "ഹാജർ ഡെമോ അടയാളപ്പെടുത്തൽ ഞങ്ങൾ വിജയകരമായി പൂർത്തിയാക്കി.\nനിങ്ങളുടെ ജീവനക്കാരന് എങ്ങനെയാണ് *ലീവ് അഭ്യർത്ഥിക്കാൻ* കഴിയുക എന്നതാണ് അടുത്ത ഡെമോ",
      buttons: [{ id: "requestLeave", title: "Start Request Leave" }],
    },
    Report: {
      message: () =>
        "നിനക്ക് നിലവിലുള്ള മാസത്തിന്റെ റിപ്പോർട്ടും മുന്നിര മാസത്തിന്റെ റിപ്പോർട്ടും ഡൗൺലോഡ് ചെയ്യുക.",
      buttons: [
        {
          id: "currentMonth",
          title: "നിലവിലെ മാസം",
        },
        {
          id: "previousMonth",
          title: "പഴയ മാസം",
        },
      ],
    },
    Other: {
      message: () =>
        "ഹലോ! ഞാൻ ഇന്ന് നിങ്ങൾക്ക് എങ്ങനെ സഹായിക്കാനാകും? ദയവായി താഴെയുള്ള ഐച്ഛികങ്ങളിൽ ഒന്ന് തിരഞ്ഞെടുക്കുക.",
      buttons: [
        {
          id: "requestLeave",
          title: "അനുവാദം അഭ്യർ",
        },
        {
          id: "support",
          title: "സഹായം",
        },
        // {
        //   id: 'question',
        //   title: 'ചോദിക്കുക',
        // },
      ],
    },
    requestLeave: {
      message: () =>
        "ഒരു ചെറിയ ഇടവേള എടുക്കാൻ ആലോചിക്കുകയാണോ?\nഎത്ര ദിവസം ഓഫ് അഭ്യർത്ഥിക്കാൻ നിങ്ങൾ ആഗ്രഹിക്കുന്നുവെന്ന് ഞങ്ങളെ അറിയിക്കുക:",
      buttons: [
        { id: "oneDay", title: "ഒരു ദിവസം" },
        { id: "moreThanOneDay", title: "ഒന്നിലധികം ദിവസം" },
      ],
    },
    oneDay: {
      message: () => ({
        body: "ദയവായി താഴെയുള്ള ബട്ടണിൽ ക്ലിക്ക് ചെയ്ത് തീയതിയും കാരണവും നിർദ്ദേശിക്കുക",
        label: {
          title: "അവധി അഭ്യർത്ഥിക്കുക",
          startdatelabel: "ആരംഭിക്കുന്ന തീയതി",
          enddatelabel: "അവസാന ദിവസം",
          reasonlabel: "അവധിക്കുള്ള കാരണം",
        },
      }),
    },
    moreThanOneDay: {
      message: () => ({
        body: "ദയവായി താഴെയുള്ള ബട്ടണിൽ ക്ലിക്ക് ചെയ്ത് തീയതിയും കാരണവും നിർദ്ദേശിക്കുക",
        label: {
          title: "അവധി അഭ്യർത്ഥിക്കുക",
          startdatelabel: "ആരംഭിക്കുന്ന തീയതി",
          enddatelabel: "അവസാന ദിവസം",
          reasonlabel: "അവധിക്കുള്ള കാരണം",
        },
      }),
    },
    leaveSummary: {
      message: (
        employeeName,
        department,
        leaveType,
        startDate,
        endDate,
        reasonForLeave,
        ticketNumber,
        recipientPhone
      ) =>
        `Name: *${employeeName}*\nDepartment: *${
          department ?? "-"
        }*\nFor: *അനുമതി ചോദിക്കുക*\nഅനുമതി തരം: *${leaveType}*\nആരംഭ തീയതി: *${startDate}*\n${
          endDate !== "Invalid Date" ? `അവസാന തീയതി: *${endDate}*\n` : ""
        }കാരണം: *${reasonForLeave}*\nനമ്പർ : *${recipientPhone}*\nടിക്കറ്റ് നമ്പർ : *${ticketNumber}*`,
    },
    startSupport: {
      message: () =>
        "നാം അവധി അപേക്ഷ ഡെമോ വിജയകരമായി പൂർത്തിയാക്കി. \n അടുത്ത ഡെമോ - നിങ്ങളുടെ ജീവനക്കാരൻ എങ്ങനെ ടിക്കറ്റ് ഉയർത്താം",
      buttons: [{ id: "support", title: "പിന്തുണ" }],
    },
    support: {
      message: () =>
        "*ടിക്കറ്റ് ഉയർത്തുക* \n ചുവടെയുള്ള ഇഷ്യൂ തരങ്ങളിൽ ക്ലിക്കുചെയ്ത് നിങ്ങൾക്ക് ടിക്കറ്റ് ഉയർത്താം",
      buttons: [
        { id: "CheckIn", title: "ഇൻ & ഔട്ട്" },
        { id: "Salary_Issue", title: "ശമ്പള പ്രശ്നം" },
        { id: "other_issue", title: "മറ്റുള്ളവ" },
      ],
    },
    checkIn: {
      message: () => "ദയവായി നിങ്ങളുടെ അഭിപ്രായം ടൈപ്പ് ചെയ്യുക.",
    },
    checkOut: {
      message: () => "ദയവായി നിങ്ങളുടെ അഭിപ്രായം ടൈപ്പ് ചെയ്യുക.",
    },
    other_issue: {
      message: () => "ദയവായി നിങ്ങളുടെ അഭിപ്രായം ടൈപ്പ് ചെയ്യുക.",
    },
    Salary_Issue: {
      message: () => "ദയവായി നിങ്ങളുടെ അഭിപ്രായം ടൈപ്പ് ചെയ്യുക.",
    },
    employeeIssue: {
      message: () => "ദയവായി നിങ്ങളുടെ അഭിപ്രായം ടൈപ്പ് ചെയ്യുക.",
    },
    registerComplain: {
      message: (name, department, problem, message, recipientPhone, ticketNumber) =>
        `പേര്: *${name}*\nവകുപ്പ്: *${
          department ?? "-"
        }*\nകാരണം: *സഹായം*\nപ്രശ്നം: *${problem}*\nഅഭിപ്രായം: *${message}*\nനമ്പർ: *${recipientPhone}*\nടിക്കറ്റ് നമ്പർ: *${ticketNumber}*`,
    },
    employeeReportStart: {
      message: () =>
        "ജീവനക്കാർ ഉയർത്തുന്ന പിന്തുണാ ടിക്കറ്റുകൾ ഞങ്ങൾ വിജയകരമായി പൂർത്തിയാക്കി\nഅടുത്തത് - ജീവനക്കാർക്ക് കാണാൻ കഴിയുന്ന അടിസ്ഥാന *റിപ്പോർട്ടുകളാണ്*",
      buttons: [
        {
          title: "ഈ മാസം",
          id: "  employe_report1",
        },
      ],
    },
    employerDemoStart: {
      message: () =>
        "ഞങ്ങൾ ജോലിക്കാരൻ ഡെമോ പൂർത്തിയാക്കിയിരിക്കുന്നു\nഅടുത്തത് - *ഉദ്യോഗദാതാ ഡെമോ*:\na. 📑 റിപ്പോർട്ടുകൾ കാണുക\nb. ജോലിക്കാരൻ പട്ടിക കാണുക\nc. ✍️ അവകാശങ്ങൾ അനുമതിപ്പിക്കുക\nd. ❌ ടിക്കറ്റുകൾ പരിഹരിക്കുക",
      buttons: [{ id: "isEmployer", title: "ജോലിക്കാരൻ ഡെമോ ആരംഭ" }],
    },
    employerReports: {
      message: () =>
        "തൊഴിലുടമയുടെ ആദ്യ ഫീച്ചർ റിപ്പോർട്ടുകളാണ്.\nതൊഴിൽ ദാതാവിനുള്ള ചില അടിസ്ഥാന *റിപ്പോർട്ടുകൾ* ചുവടെയുണ്ട്",
      buttons: [
        {
          id: "liveReport",
          title: "ലൈവ് റിപ്പോർട്ട്",
        },
        {
          id: "emp_master_sheet",
          title: "എല്ലാ സജീവ ജോലികളും",
        },
      ],
    },
    liveReport: {
      message: () =>
        "അംഗീകാരങ്ങൾ തൊഴിലുടമ ഡെമോ ആരംഭിക്കാം\nചുവടെയുള്ള ഏതെങ്കിലും ബട്ടണിൽ ക്ലിക്കുചെയ്യുക",
      buttons: [
        {
          title: "Tickets & Approvals",
          id: "approvals",
        },
      ],
    },
    emp_master_sheet: {
      message: () =>
        "അംഗീകാരങ്ങൾ തൊഴിലുടമ ഡെമോ ആരംഭിക്കാം\nചുവടെയുള്ള ഏതെങ്കിലും ബട്ടണിൽ ക്ലിക്കുചെയ്യുക",
      buttons: [
        {
          title: "Tickets & Approvals",
          id: "approvals",
        },
      ],
    },
    approvals: {
      buttons: [
        { title: "അനുമതി-ഇടുക്കുക", id: "leaveApprove" },
        { title: "സജീവ-സമസ്യ", id: "activeIssues" },
      ],
      message: () =>
        `ഹലോ, ദയവായി ചുവടെയുള്ള ഒരു ഓപ്‌ഷൻ തിരഞ്ഞെടുക്കുക:\n 1️⃣ ലീവുകൾ അംഗീകരിക്കുന്നതിന്.\n 2️⃣ നിങ്ങളുടെ അംഗീകാരത്തിനായി കാത്തിരിക്കുന്ന സജീവ പ്രശ്നങ്ങൾ കാണുന്നതിന്.\nതുടരുന്നതിന് അനുബന്ധ ബട്ടണിൽ ക്ലിക്ക് ചെയ്യുക!`,
    },
    leaveApprove: {
      message: () =>
        `*ജീവനക്കാരുടെ ലീവ് റിപ്പോർട്ട് ചെയ്തു*\nപ്രിയ തൊഴിലുടമ, ഒരു ജീവനക്കാരന്റെ ലീവ് അഭ്യർത്ഥനയുണ്ട്\n *ടിക്കറ്റ് നമ്പർ: RL4545* \n *പേര്*: റാം \n *തീയതി*: 23/12/2023 \n *കാരണം* : കല്യാണം \n *തരം* : ലീവ് അഭ്യർത്ഥിക്കുക`,
      buttons: [
        { title: "അംഗീകരിക്കുക", id: "request_approve" },
        { title: "നിരസിക്കുക", id: "request_reject" },
        { title: "പിടിക്കുക", id: "request_hold" },
      ],
    },
    activeIssues: {
      message: () =>
        `*എംപ്ലോയി ഇഷ്യൂ റിപ്പോർട്ട്*\nപ്രിയ തൊഴിലുടമ, ഒരു ജീവനക്കാരൻ റിപ്പോർട്ട് ചെയ്ത ഒരു പ്രശ്നമുണ്ട്:\n *തൊഴിലാളിയുടെ പേര്* : ഷാം \n *പ്രശ്നം* : ശമ്പളം \n *പ്രശ്നത്തിന്റെ വിവരണം* : ശമ്പളം കുറവ് ക്രെഡിറ്റ് ചെയ്തു\nദയവായി ഉചിതമായ നടപടി സ്വീകരിക്കുക ഈ ആശങ്ക പരിഹരിക്കാൻ.`,
      buttons: [
        { title: "അംഗീകരിക്കുക", id: "issue_approve" },
        { title: "നിരസിക്കുക", id: "issue_reject" },
        { title: "പിടിക്കുക", id: "issue_hold" },
      ],
    },
    issue_approve: {
      message: () =>
        "സ്റ്റാറ്റസ് അപ്‌ഡേറ്റ്: അംഗീകരിച്ചു\nനിങ്ങളുടെ അഭ്യർത്ഥന/അപേക്ഷ അംഗീകരിച്ചുവെന്ന് നിങ്ങളെ അറിയിക്കുന്നതിൽ ഞങ്ങൾക്ക് സന്തോഷമുണ്ട്!\nനിങ്ങളുടെ ക്ഷമയ്ക്കും സഹകരണത്തിനും നന്ദി.",
    },
    issue_reject: {
      message: () =>
        "ಸ್ಥಿತಿ ಅಪ್‌ಡೇಟ್: ತಿರಸ್ಕರಿಸಲಾಗಿದೆ \nನಿಮ್ಮ ವಿನಂತಿ/ಅರ್ಜಿಯನ್ನು ತಿರಸ್ಕರಿಸಲಾಗಿದೆ ಎಂದು ನಿಮಗೆ ತಿಳಿಸಲು ನಾವು ವಿಷಾದಿಸುತ್ತೇವೆ.\nನಿಮ್ಮ ತಿಳುವಳಿಕೆಯನ್ನು ನಾವು ಪ್ರಶಂಸಿಸುತ್ತೇವೆ.",
    },
    isuue_hold: {
      message: () =>
        "സ്റ്റാറ്റസ് അപ്‌ഡേറ്റ്: ഹോൾഡ് ചെയ്യുന്നു \nഞങ്ങൾ സ്ഥിതിഗതികൾ അവലോകനം ചെയ്യുകയും വിലയിരുത്തുകയും ചെയ്യുമ്പോൾ നിങ്ങളുടെ അഭ്യർത്ഥന/അപേക്ഷ നിലവിൽ ഹോൾഡിലാണ്.\nഈ സമയത്ത് നിങ്ങളുടെ ക്ഷമയെ ഞങ്ങൾ അഭിനന്ദിക്കുന്നു.",
    },
    request_: {
      message: () =>
        "*അവധി അഭ്യർത്ഥന പുതുക്കിയിരിക്കുന്നു*\nനിങ്ങളുടെ അവധി അഭ്യർത്ഥന ഇപ്പോൾ പുതുക്കിയിരിക്കുന്നു. ഞങ്ങളുടെ അവധി മാനേജ്മെന്റ് സിസ്റ്റത്തിൽ താങ്കൾ പ്രയോഗി",
    },
    request_approve: {
      message: () => "",
    },
    request_reject: {
      message: () => "",
    },
    request_hold: {
      message: () => "",
    },
    signupStart: {
      message: () =>
        "ഞങ്ങൾ ഇപ്പോൾ രണ്ട് ഡെമോകൾ പൂർത്തിയാക്കി 1 മാസത്തെ സൗജന്യ ട്രയലിനായി സൈൻ അപ്പ് ചെയ്യുക ട്രയലിന് ശേഷം: 20 ജീവനക്കാർക്ക് 399 രൂപ",
      buttons: [{ id: "signup", title: "സൈൻ അപ്പ് ഫ്രീ ട്രയൽ" }],
    },
    signup: {
      message: () => ({
        body: "'സൈൻ അപ്പ്' ബട്ടൺ ക്ലിക്കുചെയ്‌ത് ഫോം പൂരിപ്പിച്ച് സൈൻ അപ്പ് ചെയ്യുക.",
        label: {
          title: "സൈൻ അപ്പ്",
          namelabel: "പൂർണ്ണ പേര്",
          companylabel: "കമ്പനിയുടെ പേര്",
          bufferlabel: "ബഫർ ഇൻ/ഔട്ട് മിനിറ്റ്",
        },
      }),
    },
    uploadEmployee: {
      message: () => "ദയവായി നിങ്ങളുടെ എല്ലാ സജീവ അഭിപ്രായങ്ങളും അപ്‌ലോഡ് ചെയ്യുക.",
    },
    addEmployee: {
      message: (employeeName, employeeNumber, timing, geofen) =>
        `ചേർന്നു:\n*പേര്*: ${employeeName}\n*നമ്പർ*: ${employeeNumber}\n*തരം*: ${timing}\n*ജിയോഫെൻസിംഗ്*: ${geofen}`,
    },
    ticketUpdate: {
      message: (ticketNumber) =>
        `ടിക്കറ്റ് നമ്പർ: ${ticketNumber} യുടെ പരിസ്ഥിതി വിജയകരമായി പുതുക്കപ്പെട്ടു`,
    },
    employeeDemoStart: {
      buttons: [{ id: "MarkAttendance", title: "ഹാജരാക്കുക" }],

      message: () =>
        "1️⃣ *എംപ്ലോയി ഡെമോ സ്റ്റെപ്പുകൾ:\n എ. ✅ മാർക്ക് ഹാജർ\n ബി. 🙋 അഭ്യർത്ഥന ലീവ്\n സി. 🎫 ഒരു ടിക്കറ്റ് ഉയർത്തുക\n ഡി. 📊 റിപ്പോർട്ട് കാണുക\n2️⃣ *എംപ്ലോയർ ഡെമോ സ്റ്റെപ്പുകൾ* (എംപ്ലോയി ഡെമോ സ്റ്റെപ്പുകൾ പൂർത്തിയാക്കിയ ശേഷം)",
    },
    employerStart: {
      message: () =>
        `ഹലോ, ഇനിപ്പറയുന്ന ചോയ്‌സുകളിൽ നിന്ന് ഒരു ഓപ്ഷൻ തിരഞ്ഞെടുക്കുക:\n\n1️⃣. റിപ്പോർട്ട് നേടുക: വിശദമായ റിപ്പോർട്ട് ലഭിക്കാൻ ഈ ബട്ടൺ ക്ലിക്ക് ചെയ്യുക..\n2️⃣. അംഗീകാരങ്ങൾ: ജീവനക്കാരുടെ അവധി അംഗീകാരങ്ങൾ പരിശോധിക്കണോ അല്ലെങ്കിൽ നിയന്ത്രിക്കണോ? നാവിഗേറ്റ് ചെയ്യാൻ ഈ ബട്ടൺ ഉപയോഗിക്കുക.\n3️⃣. പ്രൊഫൈൽ/ക്രമീകരണങ്ങൾ: നിങ്ങളുടെ പ്രൊഫൈലും ക്രമീകരണങ്ങളും ഇവിടെ നിയന്ത്രിക്കുക.`,
      buttons: [
        { id: "employerReports", title: "റിപ്പോർട്ട് ലഭിക്കുക" },
        { id: "approvals", title: "അനുമതി" },
        { id: "profile-settings", title: "പ്രൊഫൈൽ ക്രമീകരണം" },
      ],
    },
  },
  Spanish: {},
  Portuguese: {},
  Russian: {},
  Urdu: {},
  French: {},
  German: {},
};

function getTextMessage(language, messageId, values = [], bot) {
  const languages = bot === "main" ? mainBotLanguage : demoBotLanguage;

  if (!language) {
    language = "English";
  }

  if (language.includes("+")) {
    const [langOne, langTwo] = language.split("+");
    const messageOne = languages[langOne]?.[messageId]?.message(...values);
    const messageTwo = languages[langTwo]?.[messageId]?.message(...values);

    if (messageOne && messageTwo) {
      return `${messageOne}\n-----------------------------\n${messageTwo}`;
    } else if (!messageOne || !messageTwo) {
      return languages["English"]?.[messageId]?.message(...values);
    }
  }

  const message = languages[language]?.[messageId]?.message(...values);

  if (!message) {
    return languages["English"]?.[messageId]?.message(...values);
  }

  return message;
}

function getSimpleButtonsMessage(language, messageId, values = [], bot) {
  const message = getTextMessage(language, messageId, values, bot);
  const languages = bot === "main" ? mainBotLanguage : demoBotLanguage;

  if (!language) {
    language = "English";
  }

  if (language.includes("+")) {
    language = language.split("+")[0];
  }

  const listOfButtons = languages[language]?.[messageId]?.buttons;

  return {
    message,
    listOfButtons,
  };
}

function getRadioButtonsMessage(language, messageId, values = [], bot) {
  const message = getTextMessage(language, messageId, values, bot);
  const languages = bot === "main" ? mainBotLanguage : demoBotLanguage;

  if (!language) {
    language = "English";
  }

  if (language.includes("+")) {
    language = language.split("+")[0];
  }

  const listOfSections = languages[language]?.[messageId]?.buttons;

  return {
    message,
    listOfSections,
  };
}

export { getTextMessage, getSimpleButtonsMessage, getRadioButtonsMessage };

// Object.entries(mainBotLanguage).forEach(([language, languageObj]) =>
//   Object.entries(languageObj).forEach(([obj, pObj]) => {
//     if (pObj.buttons) {
//       // ? check length of radio buttons
//       if (Array.isArray(pObj.buttons) && pObj.buttons.length > 0) {
//         const buttonType = pObj.buttons.every((button) => button.id && button.title);

//         if (buttonType) {
//           // ? check length of simple buttons
//           pObj?.buttons?.forEach((button) => {
//             if (button.title.length > 20) {
//               console.log({ button, language, obj });
//             }
//           });
//         } else {
//           pObj.buttons.forEach((buttons) => {
//             const rows = buttons.rows;

//             rows.forEach((row) => {
//               if (row.title.length > 24) {
//                 console.log({ row, language, obj });
//               }
//             });
//           });
//         }
//       }
//     }
//   })
// );

// Object.entries(demoBotLanguage).forEach(([language, languageObj]) =>
//   Object.entries(languageObj).forEach(([obj, pObj]) => {
//     if (pObj?.buttons) {
//       // ? check length of radio buttons
//       if (pObj?.buttons?.[0]?.rows?.length > 0) {
//         pObj?.buttons?.[0]?.rows?.forEach((button) => {
//           // console.log(button)
//           if (button.title.length > 24) {
//             console.log(button, language, obj);
//             console.log(button.title, 'radio button')
//           }

//           if (button.description.length > 72) {
//             console.log(button, language, obj);
//             console.log(button.description, 'radio button')

//           }
//         });

//         // ? check length of simple buttons
//         pObj?.buttons?.forEach((button) => {
//           // console.log(button)
//           if (button.title.length > 20) {
//             console.log(button, language, obj);
//           }
//         });
//       }

//     }
//   })
// );
