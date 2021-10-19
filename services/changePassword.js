require("dotenv").config();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const { verify } = require("jsonwebtoken");
module.exports = async (req, res) => {
  const { token, newPassword: plainTextPassword } = req.body;
  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  if (plainTextPassword.length < 6) {
    return res.json({
      status: "error",
      error: "Password too small. Should be atleast 6 characters",
    });
  }

  try {
    const user = verify(token, process.env.JWT_SECRET);
    console.log("JWT decoded", user);
    const _id = user.id;
    const password = await bcrypt.hash(plainTextPassword, 10);
    await User.updateOne({ _id }, { $set: { password } });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: ";))" });
  }
};
