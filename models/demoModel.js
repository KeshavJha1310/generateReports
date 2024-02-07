import mongoose from "mongoose";

const { Schema } = mongoose;

const schema = {
  hasClicked: {
    type: Boolean,
  },
  time: {
    type: String,
  },
};

const DemoSchema = new Schema(
  {
    phoneNumber: {
      type: Number,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    date: {
      day: Number,
      month: Number,
      year: Number,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    countryName: {
      type: String,
    },
    countryCode: {
      type: String,
    },
    timeZone: {
      type: String,
    },
    regionName: {
      type: String,
    },
    languageSelected: {
      type: String,
    },
    markAttendanceFlow: schema,
    attendanceType: {
      type: {
        type: String,
      },
      time: String,
    },
    location: {
      lat: Number,
      long: Number,
      hasClicked: {
        type: Boolean,
      },
      time: {
        type: String,
      },
    },
    pic: {
      hasClicked: {
        type: Boolean,
      },
      time: {
        type: String,
      },
    },
    leaveRequestFlow: schema,
    leaveType: {
      type: {
        type: String,
      },
      time: String,
    },
    SupportFlow: schema,
    supportType: {
      type: {
        type: String,
      },
      time: String,
    },
    reportsFlow: schema,
    reportType: {
      type: {
        type: String,
      },
      time: String,
    },
    employerFlow: schema,
    approvalFlow: schema,
    approvalType: {
      type: {
        type: String,
      },
      time: String,
    },
    signupFlow: schema,
  },
  {
    statics: {
      async update(recipientPhone, time, key, value) {
        await this.updateOne(
          {
            phoneNumber: Number(recipientPhone),
            "date.day": time.day,
            "date.month": time.month,
            "date.year": time.year,
          },
          { [key]: value }
        );
      },
    },
  }
);

const Demo = mongoose.model("demo", DemoSchema);

export default Demo;
