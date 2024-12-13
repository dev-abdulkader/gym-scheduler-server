import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Class } from "./class.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Create a new class schedule
const createClassSchedule = asyncHandler(async (req, res) => {
  const { className, trainerId, duration, schedule } = req.body;

  // Validate required fields
  if ([className, trainerId, duration, schedule].some((field) => !field)) {
    throw new ApiError(400, "All fields are required");
  }

  // Extract the date part of the schedule (ignore time)
  const classDate = new Date(schedule);
  classDate.setHours(0, 0, 0, 0); // Set time to 00:00:00 for comparison

  // Check how many classes are scheduled for this date
  const existingClassCount = await Class.countDocuments({
    schedule: {
      $gte: classDate,
      $lt: new Date(classDate).setDate(classDate.getDate() + 1),
    },
  });

  // If there are already 5 classes, throw an error
  if (existingClassCount >= 5) {
    throw new ApiError(
      409,
      "Cannot create more than 5 classes on the same day"
    );
  }

  // Check if the class already exists with the same trainer and schedule time
  const existingClassSchedule = await Class.findOne({
    className,
    trainerId,
    schedule,
  });

  if (existingClassSchedule) {
    throw new ApiError(409, "Class schedule already exists");
  }

  // Create a new class schedule
  const newClass = await Class.create({
    className,
    trainerId,
    duration, // Duration in minutes
    schedule,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(200, newClass, "Class schedule created successfully")
    );
});

// Get all class schedules
const getClassSchedules = asyncHandler(async (req, res) => {
  const classes = await Class.find();

  return res
    .status(200)
    .json(
      new ApiResponse(200, classes, "Class schedules retrieved successfully")
    );
});

// Get a specific class schedule by ID
const getClassScheduleById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const classSchedule = await Class.findById(id);

  if (!classSchedule) {
    throw new ApiError(404, "Class schedule not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        classSchedule,
        "Class schedule retrieved successfully"
      )
    );
});

// Update a specific class schedule by ID
const updateClassSchedule = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { className, trainerId, duration, schedule } = req.body;

  const updatedClass = await Class.findByIdAndUpdate(
    id,
    { className, trainerId, duration, schedule },
    { new: true }
  );

  if (!updatedClass) {
    throw new ApiError(404, "Class schedule not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedClass, "Class schedule updated successfully")
    );
});

// Delete a specific class schedule by ID
const deleteClassSchedule = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedClass = await Class.findByIdAndDelete(id);

  if (!deletedClass) {
    throw new ApiError(404, "Class schedule not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Class schedule deleted successfully"));
});

export {
  createClassSchedule,
  getClassSchedules,
  getClassScheduleById,
  updateClassSchedule,
  deleteClassSchedule,
};
