import { Router } from "express";
import {
  createClassSchedule,
  getClassSchedules,
  getClassScheduleById,
  updateClassSchedule,
  deleteClassSchedule,
} from "./class.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

// Route to create a new class schedule
router.post("/create-class", verifyJWT, verifyAdmin, createClassSchedule);

// Route to get all class schedules
router.get("/get-all-classes", verifyJWT, verifyAdmin, getClassSchedules);

// Route to get a specific class schedule by ID
router.get(
  "/get-single-class/:id",
  verifyJWT,
  verifyAdmin,
  getClassScheduleById
);

// Route to update a specific class schedule by ID
router.put("/update-class/:id", verifyJWT, verifyAdmin, updateClassSchedule);

// Route to delete a specific class schedule by ID
router.delete("/delete-class/:id", verifyJWT, verifyAdmin, deleteClassSchedule);

export default router;
