import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const {
  TRANSFER_OWNER_FLOW_ID,
  TRANSFER_OWNER_FLOW_TOKEN,
  ADD_COOWNER_FLOW_ID,
  ADD_COOWNER_FLOW_TOKEN,
  LANGUAGES_FLOW_ID,
  LANGUAGES_FLOW_TOKEN,
  ONE_DAY_LEAVE_FLOW_ID,
  ONE_DAY_LEAVE_FLOW_TOKEN,
  MANY_DAY_LEAVE_FLOW_ID,
  MANY_DAY_LEAVE_FLOW_TOKEN,
  EDIT_EMPLOYEE_FLOW_ID,
  EDIT_EMPLOYEE_FLOW_TOKEN,
  SIGN_UP_FLOW_ID,
  SIGN_UP_FLOW_TOKEN,
  LINK_BRANCH_FLOW_ID,
  LINK_BRANCH_FLOW_TOKEN,
  ADD_BRANCH_FLOW_ID,
  ADD_BRANCH_FLOW_TOKEN,
  EDIT_BUSINESS_FLOW_ID,
  EDIT_BUSINESS_FLOW_TOKEN,
  EDIT_TIMING_FLOW_ID,
  EDIT_TIMING_FLOW_TOKEN,
  EDIT_GEO_LOCATION_FLOW_ID,
  EDIT_GEO_LOCATION_FLOW_TOKEN,
  EDIT_NOTIFICATIONS_FLOW_ID,
  EDIT_NOTIFICATIONS_FLOW_TOKEN,
  REMOVE_EMPLOYEES_FLOW_ID,
  REMOVE_EMPLOYEES_FLOW_TOKEN,
  REMOVE_BRANCH_FLOW_ID,
  REMOVE_BRANCH_FLOW_TOKEN,
  DATE_RANGE_FLOW_ID,
  DATE_RANGE_FLOW_TOKEN,
  BROADCAST_FLOW_ID,
  BROADCAST_FLOW_TOKEN,
  ATTENDANCE_FLOW_ID,
  ATTENDANCE_FLOW_TOKEN,
  EMPLOYEE_FLOW_ID,
  EMPLOYEE_FLOW_TOKEN,
  CREATEDAILY_TASKX_FLOW_ID,
  CREATEDAILY_TASKX_TOKEN,
  CREATEWEEKLY_TASKX_FLOW_ID,
  CREATEWEEKLY_TASKX_TOKEN,
  CREATEMONTHLY_TASKX_FLOW_ID,
  CREATEMONTHLY_TASKX_TOKEN,
  ATTENDANCE_CORRECTION_FLOW_ID,
  ATTENDANCE_CORRECTION_FLOW_TOKEN,
  LEAVE_REQUESTS_FLOW_ID,
  LEAVE_REQUESTS_FLOW_TOKEN,
  ATTENDANCE_REQUESTS_FLOW_ID,
  ATTENDANCE_REQUESTS_FLOW_TOKEN,
  VITALS_FLOW_ID,
  VITALS_FLOW_TOKEN,
} = process.env;

// const env = process.env

// const secrets = {
//   oneDay: {
//     id: env.,
//     token: env.
//   },
//   manyDay: {
//     id: env.,
//     token: env.
//   },
//   languages: {
//     id: env.,
//     token: env.
//   },
//   addCoowner: {
//     id: env.,
//     token: env.
//   },
//   editEmployee: {
//     id: env.,
//     token: env.
//   },
//   signUp: {
//     id: env.,
//     token: env.
//   },
//   attManagement: {
//     id: env.,
//     token: env.
//   },
//   empManage: {
//     id: env.,
//     token: env.
//   },
//   broadcast: {
//     id: env.,
//     token: env.
//   },
//   addBranch: {
//     id: env.,
//     token: env.
//   },
//   editBusiness: {
//     id: env.,
//     token: env.
//   },
//   editGeo: {
//     id: env.,
//     token: env.
//   },
//   dateRange: {
//     id: env.,
//     token: env.
//   },
//   removeBranch: {
//     id: env.,
//     token: env.
//   },
//   removeEmployee: {
//     id: env.,
//     token: env.
//   },
//   editNotifs: {
//     id: env.,
//     token: env.
//   },
//   linkBranch: {
//     id: env.,
//     token: env.
//   },
//   editShift: {
//     id: env.,
//     token: env.
//   },
//   attCorrection: {
//     id: env.,
//     token: env.
//   },
//   leaveApproval: {
//     id: env.,
//     token: env.
//   }
// }

const EPOCH = [1970, 0, 1];

export {
  TRANSFER_OWNER_FLOW_ID,
  TRANSFER_OWNER_FLOW_TOKEN,
  LANGUAGES_FLOW_ID,
  LANGUAGES_FLOW_TOKEN,
  VITALS_FLOW_ID,
  VITALS_FLOW_TOKEN,
  ATTENDANCE_FLOW_ID,
  ATTENDANCE_FLOW_TOKEN,
  EMPLOYEE_FLOW_ID,
  EMPLOYEE_FLOW_TOKEN,
  ATTENDANCE_CORRECTION_FLOW_ID,
  ATTENDANCE_CORRECTION_FLOW_TOKEN,
  BROADCAST_FLOW_ID,
  BROADCAST_FLOW_TOKEN,
  LEAVE_REQUESTS_FLOW_ID,
  LEAVE_REQUESTS_FLOW_TOKEN,
  ATTENDANCE_REQUESTS_FLOW_ID,
  ATTENDANCE_REQUESTS_FLOW_TOKEN,
  ONE_DAY_LEAVE_FLOW_ID,
  ONE_DAY_LEAVE_FLOW_TOKEN,
  MANY_DAY_LEAVE_FLOW_ID,
  MANY_DAY_LEAVE_FLOW_TOKEN,
  EDIT_EMPLOYEE_FLOW_ID,
  EDIT_EMPLOYEE_FLOW_TOKEN,
  SIGN_UP_FLOW_ID,
  SIGN_UP_FLOW_TOKEN,
  LINK_BRANCH_FLOW_ID,
  LINK_BRANCH_FLOW_TOKEN,
  ADD_BRANCH_FLOW_ID,
  ADD_BRANCH_FLOW_TOKEN,
  EDIT_BUSINESS_FLOW_ID,
  EDIT_BUSINESS_FLOW_TOKEN,
  EDIT_TIMING_FLOW_ID,
  EDIT_TIMING_FLOW_TOKEN,
  EDIT_GEO_LOCATION_FLOW_ID,
  EDIT_GEO_LOCATION_FLOW_TOKEN,
  EDIT_NOTIFICATIONS_FLOW_ID,
  EDIT_NOTIFICATIONS_FLOW_TOKEN,
  REMOVE_EMPLOYEES_FLOW_ID,
  REMOVE_EMPLOYEES_FLOW_TOKEN,
  REMOVE_BRANCH_FLOW_ID,
  REMOVE_BRANCH_FLOW_TOKEN,
  DATE_RANGE_FLOW_ID,
  DATE_RANGE_FLOW_TOKEN,
  EPOCH,
  CREATEDAILY_TASKX_FLOW_ID,
  CREATEDAILY_TASKX_TOKEN,
  CREATEWEEKLY_TASKX_FLOW_ID,
  CREATEWEEKLY_TASKX_TOKEN,
  CREATEMONTHLY_TASKX_FLOW_ID,
  CREATEMONTHLY_TASKX_TOKEN,
  ADD_COOWNER_FLOW_ID,
  ADD_COOWNER_FLOW_TOKEN,
};
