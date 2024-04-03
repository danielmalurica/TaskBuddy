import express from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasksFromUser,
  updateTask,
} from "../controllers/taskController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/:userId", getTasksFromUser);
router.get("/getById", getTaskById);
router.post("/add", createTask);
router.put("/update/:_id", updateTask);
router.delete("/delete/:_id", deleteTask);

export default router;
