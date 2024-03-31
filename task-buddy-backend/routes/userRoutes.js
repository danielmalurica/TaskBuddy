import express from "express";
import {
  createUser,
  getAllUsers,
  login,
  logout,
} from "../controllers/userController.js";
const router = express.Router();

router.get("/", getAllUsers);
router.post("/login", login);
router.post("/create", createUser);
router.post("/logout", logout);

export default router;
