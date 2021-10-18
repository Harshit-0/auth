const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("login");
});

router.get("/home", (req, res) => {
  res.render("home");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/change-password", (req, res) => {
  res.render("change-password");
});

module.exports = router;
