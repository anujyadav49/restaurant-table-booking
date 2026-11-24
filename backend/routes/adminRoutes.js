const express = require("express");
const Reservation = require("../models/Reservation");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

// Every route in this file needs a logged-in ADMIN
router.use(protect, adminOnly);

// GET /api/admin/reservations  -> all bookings from all customers
router.get("/reservations", async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({
      bookingDate: 1,
      bookingTime: 1,
    });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/admin/reservations/:id/status  -> confirm or cancel
router.put("/reservations/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: "Reservation not found" });

    reservation.status = status;
    const updated = await reservation.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/admin/reservations/:id  -> edit any booking's details
router.put("/reservations/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: "Reservation not found" });

    const { customerName, email, phone, bookingDate, bookingTime, guests } = req.body;
    reservation.customerName = customerName ?? reservation.customerName;
    reservation.email = email ?? reservation.email;
    reservation.phone = phone ?? reservation.phone;
    reservation.bookingDate = bookingDate ?? reservation.bookingDate;
    reservation.bookingTime = bookingTime ?? reservation.bookingTime;
    reservation.guests = guests ?? reservation.guests;

    const updated = await reservation.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/admin/reservations/:id  -> delete any booking
router.delete("/reservations/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: "Reservation not found" });

    await reservation.deleteOne();
    res.json({ message: "Reservation deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
