const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config(); // load values from the .env file
connectDB();     // connect to MongoDB

const app = express();

app.use(cors());          // allow the React app to talk to this server
app.use(express.json());  // read JSON sent from the frontend

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/reservations", require("./routes/reservationRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// Simple test route
app.get("/", (req, res) => res.send("Restaurant Reservation API is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
