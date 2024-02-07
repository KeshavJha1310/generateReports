
import mongoose from "mongoose";

const { Schema } = mongoose;


const TaskSchema = new Schema(
    {    phonenumber: {
        type: String,
       
      },
      noofprooftext: {
        type: String,
        default: 'As per user',
      },
      nooftimesperday: {
        type: String,
        default: 'asperuser',
      },
      flow_token: {
        type: String,
        default: 'flows-builder-4db096e1',
      },
      taskactivityinstruction: {
        type: String,
        default: 'Need to first sweep, then using water clean, empty dustbin, etc',
      },
      assignstrict1: {
        type: String,
        default: 'assigntoall',
      },
      noofproofphoto: {
        type: String,
        default: 'As per user',
      },
      taskduration: {
        type: String,
        default: 'asperuser',
      },
      taskactivitydescription: {
        type: String,
        default: 'This is the most important task, Cleanliness is Next to Godliness',
      },
      noofprooffile: {
        type: String,
        default: 'As per user',
      },
      prooftypephoto1: {
        type: [String],
        default: ['1'],
      },
      flowName: {
        type: String,
        default: 'createdailytask',
      },
      StartTime: {
        type: String,
        default: 'Asperuser',
      },
      taskactivityname: {
        type: String,
        default: 'Click Dustbin Pic',
      },
      prooftypevideo1: {
        type: [String],
        default: ['3'],
      },
      noofproofvideo: {
        type: String,
        default: 'As per user',
      },
      notifications: {
        type: [String],
        default: ['Self'],
      },
      noofproofaudio: {
        type: String,
        default: 'As per user',
      },
      priorityselected1: {
        type: String,
        default: 'medium',
      },
      proofoflocationlabel: {
        type: String,
        default: 'nolocation',
      },
      proofstrict1: {
        type: String,
        default: 'allproof',
      },
      prooftypeaudio1: {
        type: [String],
        default: ['6'],
      },
      prooftypetext1: {
        type: [String],
        default: ['2'],
      },
      prooftypefile1: {
        type: [String],
        default: ['5'],
      },
      assignto1: {
        type: [String],
        default: ['Self'],
      },
    },
    // Add more options or configurations if needed
  );
  
  // Create the Task model
  const TaskModel = mongoose.model('DailyTask', TaskSchema);
  export default TaskModel;
 
