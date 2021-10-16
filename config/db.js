require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/login-app-db";

function connectDB() {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", () => {
    console.log("Database connected");
  });
}

module.exports = connectDB;
