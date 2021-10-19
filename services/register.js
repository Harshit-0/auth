const bcrypt = require("bcryptjs");
const User = require("../model/User");

module.exports = async (req, res) => {
  const { email, password: plainTextPassword } = req.body;
  if (!email || typeof email !== "string") {
    return res.json({ status: "error", error: "Invalid email" });
  }
  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }
  if (plainTextPassword.length < 6) {
    return res.json({
      status: "error",
      error: "Password too small. Should be atleast 6 characters",
    });
  }
  const password = await bcrypt.hash(plainTextPassword, 10);
  try {
    const user = new User({
      email,
      password,
    });
    const response = await user.save();
    res.json({ status: "ok" });
  } catch (error) {
    if(error.errors.email.kind){
      return res.json({status:"error",error:"User already exists"})
    }
    if (error.code === 11000) {
      return res.json({ status: "error", error: "User already exists" });
    }
    throw error;
  }
};
