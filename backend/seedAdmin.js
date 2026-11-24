// Run once with:  npm run seed
// Creates the first admin account using the values in .env
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./models/User");

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = (process.env.ADMIN_EMAIL || "admin@restaurant.com").toLowerCase();
    const existing = await User.findOne({ email });

    if (existing) {
      existing.role = "admin";
      await existing.save();
      console.log(`User ${email} already existed and is now an admin.`);
    } else {
      await User.create({
        name: process.env.ADMIN_NAME || "Admin",
        email,
        password: process.env.ADMIN_PASSWORD || "admin123",
        role: "admin",
      });
      console.log(`Admin created -> email: ${email}`);
    }
  } catch (error) {
    console.error("Seed failed:", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

run();
