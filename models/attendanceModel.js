import mongoose from "mongoose";

const { Schema } = mongoose;

const logsSchema = new Schema(
  {
    time: {
      type: Date,
    },
    logType: {
      type: String,
      enum: ["text", "image", "document", "video", "vitals"],
    },
    log: {
      type: String,
    },
  },
  { _id: false }
);

const creationTypeSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["normal", "correction"],
      default: "normal",
    },
    status: {
      type: String,
      enum: ["pending", "approve", "reject"],
    },
  },
  { _id: false }
);

const AttendanceSchema = new Schema(
  {
    employeeId: {
      type: String,
      required: true,
    },
    companyId: {
      type: String,
      required: true,
    },
    // employeeNumber: {
    //   type: Number,
    // },
    // employerNumber: {
    //   type: Number,
    // },
    date: {
      type: Date,
    },
    // date: {
    //   day: Number,
    //   month: Number,
    //   year: Number,
    // },
    checkInTime: {
      type: Date,
    },
    // checkInTime: {
    //   type: Number,
    // },
    checkInCoords: [Number, Number],
    // checkInCoords: {
    //   lat: String,
    //   long: String
    // },
    checkInPic: {
      type: String,
    },
    // checkOutTime: {
    //   type: Number,
    // },
    checkOutTime: {
      type: Date,
    },
    checkOutCoords: [Number, Number],
    // checkOutCoords: {
    //   lat: String,
    //   long: String
    // },
    checkOutPic: {
      type: String,
    },
    timeSpent: {
      type: String,
    },
    status: {
      enum: ["full-day", "half-day", "late", "onTime"],
      type: String,
    },
    creationType: creationTypeSchema,
    logs: [logsSchema],
  },
  {
    statics: {
      async findAttendance(employeeId, companyId) {
        const date = new Date();
        const attendance = await this.find({
          employeeId,
          companyId,
          date: { $eq: new Date(date.getFullYear(), date.getMonth(), date.getDate()) },
        });

        if (attendance.length > 0) {
          return attendance[attendance.length - 1];
        }

        return attendance;
      },

      async findAllByDate(startDate, endDate, companyId) {
        return await this.find({
          companyId,
          $and: [{ date: { $gte: startDate } }, { date: { $lte: endDate } }],
        });
      },

      async findByDate(startDate, endDate, employeeId) {
        return await this.find({
          employeeId,
          $and: [{ date: { $gte: startDate } }, { date: { $lte: endDate } }],
        });
      },
    },
  }
);

const Attendance = mongoose.model("attendance", AttendanceSchema);

export default Attendance;
