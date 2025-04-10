import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js"; // User Routes Import
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import "./OAuth20.js";
const app = express();

// Middleware Setup
app.use(cors({ origin: "https://real-time-chat-app-eight-delta.vercel.app", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/users", userRouter);
app.use("/auth", authRoutes);
app.use("/api", profileRoutes);
export { app };
