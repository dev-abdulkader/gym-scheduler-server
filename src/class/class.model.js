import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema(
  {
    className: { type: String, required: true },
    trainerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference the User model
      required: true,
    },
    duration: { type: Number, required: true }, // Duration in minutes
    schedule: { type: Date, required: true }, // Class date and time
  },
  { timestamps: true }
);

export const Class = mongoose.model("Class", ClassSchema);
