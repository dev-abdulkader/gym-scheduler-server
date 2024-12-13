import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes import
import userRouter from "./user/user.routes.js";
import classRouter from "./class/class.routes.js";
import bookingRouter from "./booking/booking.routes.js";

// Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/class", classRouter);
app.use("/api/v1/booking", bookingRouter);

export { app };
