import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const task = req.body;
  try {
    const newTask = new Task(task);
    await newTask.save();

    res.status(200).json({ success: true, message: "Success", data: newTask });
  } catch (error) {}
};

export const getTasksFromUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const tasks = await Task.find({ addedBy: userId });
    res.status(200).json({ success: true, message: "Success", data: tasks });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

export const getTaskById = async (req, res) => {
  const { taskId } = req.body;
  try {
    const task = await Task.findById({ _id: taskId });
    res.status(200).json({ success: true, message: "Success", data: task });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

export const updateTask = async (req, res) => {
  const {
    _id,
    title,
    description,
    addedBy,
    priority,
    progress,
    status,
    timestamp,
  } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      { _id },
      {
        _id,
        title,
        description,
        addedBy,
        priority,
        progress,
        status,
        timestamp,
      }
    );
    res
      .status(200)
      .json({ success: true, message: "Success", data: updatedTask });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

export const deleteTask = async (req, res) => {
  const { _id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete({ _id });
    res
      .status(200)
      .json({ success: true, message: "Success", data: deletedTask });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};
