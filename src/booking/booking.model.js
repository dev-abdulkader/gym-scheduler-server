import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    bookingDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", BookingSchema);
