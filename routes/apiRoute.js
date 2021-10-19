const router = require("express").Router();

router.post("/auth", require("../services/auth"));
router.post("/register", require("../services/register"));
router.post("/login", require("../services/login"));
router.post("/change-password", require("../services/changePassword"));

module.exports = router;
