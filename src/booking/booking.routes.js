import { Router } from "express";
import {
  createBooking,
  getUserBookings,
  getClassBookings,
  getAllBookings,
  deleteBooking,
} from "./booking.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

// Route to create a booking
router.post("/create-booking", verifyJWT, createBooking);

// Route to get all bookings for the logged-in user
router.get("/get-user-bookings", verifyJWT, getUserBookings);

// Route to get all bookings for a class
router.get("/get-class-bookings/:classId", verifyJWT, getClassBookings);

// Route to get all bookings (admin only)
router.get("/get-all-bookings", verifyJWT, verifyAdmin, getAllBookings);

// Route to delete a booking
router.delete("/delete-booking/:bookingId", verifyJWT, deleteBooking);

export default router;
