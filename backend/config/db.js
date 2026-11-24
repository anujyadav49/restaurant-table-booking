const mongoose = require("mongoose");

// Connect to MongoDB using the address stored in the .env file
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // stop the server if the database is not available
  }
};

module.exports = connectDB;
