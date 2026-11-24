const express = require("express");
const Reservation = require("../models/Reservation");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Every route in this file needs the user to be logged in
router.use(protect);

// CREATE  POST /api/reservations
router.post("/", async (req, res) => {
  try {
    const { customerName, email, phone, bookingDate, bookingTime, guests } = req.body;

    const reservation = await Reservation.create({
      user: req.user._id,
      customerName,
      email,
      phone,
      bookingDate,
      bookingTime,
      guests,
    });

    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ  GET /api/reservations/my  -> only the logged-in user's bookings
router.get("/my", async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user._id }).sort({
      bookingDate: 1,
      bookingTime: 1,
    });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE  PUT /api/reservations/:id  -> edit own booking
router.put("/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) return res.status(404).json({ message: "Reservation not found" });
    if (reservation.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only edit your own bookings" });
    }
    if (reservation.status === "cancelled") {
      return res.status(400).json({ message: "Cancelled bookings cannot be edited" });
    }

    const { customerName, email, phone, bookingDate, bookingTime, guests } = req.body;
    reservation.customerName = customerName ?? reservation.customerName;
    reservation.email = email ?? reservation.email;
    reservation.phone = phone ?? reservation.phone;
    reservation.bookingDate = bookingDate ?? reservation.bookingDate;
    reservation.bookingTime = bookingTime ?? reservation.bookingTime;
    reservation.guests = guests ?? reservation.guests;
    // After an edit, the restaurant needs to confirm again
    reservation.status = "pending";

    const updated = await reservation.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE  DELETE /api/reservations/:id  -> delete own booking
router.delete("/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) return res.status(404).json({ message: "Reservation not found" });
    if (reservation.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own bookings" });
    }

    await reservation.deleteOne();
    res.json({ message: "Reservation deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
