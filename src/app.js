import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/connect.js";

const app = express();

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

//routes import
import userRouter from "./user/user.routes.js";
import classRouter from "./class/class.routes.js";
import bookingRouter from "./booking/booking.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/class", classRouter);
app.use("/api/v1/booking", bookingRouter);

// http://localhost:8000/api/v1/users/register

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();

export { app };
