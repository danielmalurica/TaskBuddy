import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  addedBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true,
  },
  progress: {
    type: Number,
    required: true,
    default: 0,
    max: 100,
  },
  status: {
    type: String,
    enum: ["In Progress", "Completed"],
    default: "In Progress",
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

const Task = mongoose.model("Task", TaskSchema);
export default Task;
