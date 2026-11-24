const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    // Which user made this booking
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    customerName: { type: String, required: [true, "Customer name is required"], trim: true },
    email: { type: String, required: [true, "Email is required"], trim: true, lowercase: true },
    phone: { type: String, required: [true, "Phone number is required"], trim: true },
    bookingDate: { type: String, required: [true, "Booking date is required"] }, // format: YYYY-MM-DD
    bookingTime: { type: String, required: [true, "Booking time is required"] }, // format: HH:MM
    guests: {
      type: Number,
      required: [true, "Number of guests is required"],
      min: [1, "At least 1 guest"],
      max: [20, "Maximum 20 guests"],
    },
    // Admin can change this to confirmed or cancelled
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);
