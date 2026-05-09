const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    const DB_URI =
      process.env.NODE_ENV === "development"
        ? process.env.LOCAL_MONGO_URI   // works on any network
        : process.env.MONGO_URI;        // for Render

    const con = await mongoose.connect(DB_URI);

    console.log(`MongoDB connected: ${con.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);

    // Optional but recommended: stop app if DB fails
    process.exit(1);
  }
};

module.exports = connectDatabase;