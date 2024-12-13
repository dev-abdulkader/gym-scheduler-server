import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Booking } from "./booking.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Class } from "../class/class.model.js";

// Create a booking
const createBooking = asyncHandler(async (req, res) => {
  const { classId } = req.body;
  const userId = req.user._id; // assuming user is attached via JWT middleware

  // Check if the class exists
  const classExists = await Class.findById(classId);
  if (!classExists) {
    throw new ApiError(404, "Class not found");
  }

  // Check if the user has already booked the class
  const existingBooking = await Booking.findOne({
    user: userId,
    class: classId,
  });
  if (existingBooking) {
    throw new ApiError(409, "You have already booked this class");
  }

  // Check the number of bookings for the class
  const bookingCount = await Booking.countDocuments({ class: classId });
  if (bookingCount >= 10) {
    throw new ApiError(400, "Class is fully booked");
  }

  // Create a new booking
  const newBooking = await Booking.create({
    user: userId,
    class: classId,
  });

  return res
    .status(201)
    .json(new ApiResponse(200, newBooking, "Booking created successfully"));
});

// Get all bookings for a user
const getUserBookings = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const bookings = await Booking.find({ user: userId })
    .populate("class")
    .populate("user");

  return res
    .status(200)
    .json(new ApiResponse(200, bookings, "User bookings fetched successfully"));
});

// Get all bookings for a class
const getBookedClasses = asyncHandler(async (req, res) => {
  const { classId } = req.params;

  const classBookings = await Booking.find({ class: classId })
    .populate("user")
    .populate("class");

  return res
    .status(200)
    .json(
      new ApiResponse(200, classBookings, "Class bookings fetched successfully")
    );
});

// Get all bookings (admin only)
const getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find().populate("user").populate("class");

  return res
    .status(200)
    .json(new ApiResponse(200, bookings, "All bookings fetched successfully"));
});

// Delete a booking
const deleteBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;

  // Check if booking exists and delete it
  const booking = await Booking.findByIdAndDelete(bookingId);

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Booking deleted successfully"));
});

export {
  createBooking,
  getUserBookings,
  getBookedClasses,
  getAllBookings,
  deleteBooking,
};
