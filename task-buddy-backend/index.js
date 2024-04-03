import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
dotenv.config();

app.use(express.json());
const corsOptions = {
  origin: process.env.CORS_ORIGIN_URI_PRODUCTION,
  credentials: true,
};
app.use(cors(corsOptions));

mongoose.set("strictQuery", false);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB database connected");
    console.log("server started on port 3001");
  } catch (err) {
    console.error("MongoDB database connection failed ", err);
  }
};

app.use("/user", userRoutes);
app.use("/task", taskRoutes);

app.listen(3001, () => {
  connect();
});
