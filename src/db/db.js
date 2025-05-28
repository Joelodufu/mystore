const mongoose = require("mongoose");

const DATABASE_URI = process.env.MONGO_URI;
const RECONNECT_INTERVAL = 5000; // Refresh connection every 5 seconds (adjust as needed)

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URI);
    console.log("⚡️:: Connected to MongoDB!");
  } catch (err) {
    console.error(`Can't connect to MongoDB ${err}`);
    // Retry connection at intervals
    setTimeout(connectDB, RECONNECT_INTERVAL);
  }
};

module.exports = connectDB;
