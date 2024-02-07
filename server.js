import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { appendFileSync } from "fs";

dotenv.config({ path: ".env" });

import app from "./app.js";

// import Attendance from "./models/attendanceModel.js";
// import Employer from "./models/employerModel.js";
// import Employee from "./models/employeeModel.js";

(async () => {
  addRootPathInEnv();
  const mongoUser = process.env.MONGO_USER;
  const mongoKey = process.env.MONGO_PASS;
  const mongoUrl = `mongodb+srv://${mongoUser}:${mongoKey}@apml.6w5pyjg.mongodb.net`;

  mongoose
    .connect(`${mongoUrl}/attendance_prod`, {})
    .then(async () => {
      console.log("Connected to MongoDB");

      // const emplyr = await Employer.find({ _id: "657d6dc1c1ff796925ef089b" });
      // const emplys = await Employee.find({ companyId: "657d6dc1c1ff796925ef089b" });

      // const attendances = await Attendance.find({ companyId: "657d6dc1c1ff796925ef089b" });
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
})();

const port = 8000;

app.listen(port, () => console.log(`App now running and listening on port ${port}`));

function addRootPathInEnv() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  if (!process.env.ROOT_PATH) {
    appendFileSync(
      "./.env",
      `\nROOT_PATH=${path.join(path.dirname(__dirname), path.basename(__dirname))}\n`
    );
    process.exit(1);
  }
}

/*
  timeout - on demo drop
  payments options after trial
  check in, check out - button logic after day change
  remove employee - not working
  feedback - 

  ? Present, Half Day, Absent, Leave, 
*/

// const url = "https://graph.facebook.com/v18.0/156852527519656/whatsapp_business_encryption";

// const data = new URLSearchParams();
// data.append(
//   "business_public_key",
//   `-----BEGIN PUBLIC KEY-----
// MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0zEV2u/PovbsWn4noi9p
// rcsww8zXXG4OiERW3reIPVt753XWZMb2NYDNvTRp2fxCNN3caZmBpoJe5erUehIw
// hJJMd04yey0yzvIrVHe+iluNWJ136G8JDl80ivtDgoxxE4x8HVXLyC2sWhPzurL1
// Xk1je74C1k46H9j9LZi0NRkHy3cAABIcXI8GzFTLdkWD2MOkv8OTNB49WqUUCm1J
// PC3lLgrXAxFyUuCZQfkFEg9bWxypnQ8RuG+f00iUXR/w7JBBQ1+4EKBN1tQSpYeK
// M8QhgKwc8IGF7QyNEjiw/scYGO1A1Djv8pMBasvYsVD+oWX9rnb1fbMhlEjYIfU7
// 4wIDAQAB
// -----END PUBLIC KEY-----
// `
// );

// const config = {
//   headers: {
//     Authorization:
//       "Bearer EAAWiZA056phcBOxjTEILf0q3RnaQvZByLwtUBND2edZBFZA9JrQxxbcgyJPmG6Ona5EoFiyg9CaSWawRqNfQCgqWSH2HNoNM1mpTBd0JA6CwHxNOZApGVxWkA1mlwrNF4R5pOQFZBwr48Gs684wdmolNZC2Jgnz4Wg9hCfWtfSXmaDZCF5NFWASZALfNaUwgPJTIqZAMYNzVfXCT6rHk5OC8DTsQKVx6mjFbUZAxekZD",
//     "Content-Type": "application/x-www-form-urlencoded",
//   },
// };

// axios
//   .post(url, data, config)
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error("There was an error!", error.response);
//   });

// signup
// mark attendance
// employee demo
// leave requests
// issues
// reports
// employer
// ? requests
// ? 
// ? 
// employee
// ? 
// add coowner
// transfer ownership
// delete business