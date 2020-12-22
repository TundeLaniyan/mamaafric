const express = require("express");
const {
  logIn,
  forgotPassword,
  protect,
  logOut,
} = require("../controller/authControl");

const router = express.Router();

router.route("/login").post(logIn);
router.route("/logout").get(protect, logOut);
router.route("/forgotpassword").post(forgotPassword);

module.exports = router;
