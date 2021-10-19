require("dotenv").config();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).lean();
  if (!user) {
    return res.json({ status: "error", error: "Invalid email/password" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET
    );
    return res.json({ status: "ok", data: token });
  }
  res.json({ status: "error", error: "Invalid email/password" });
};
