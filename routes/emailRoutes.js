const express = require("express");
const { createEmail } = require("../controller/emailControl");

const router = express.Router();

router.route("/").post(createEmail);

module.exports = router;
