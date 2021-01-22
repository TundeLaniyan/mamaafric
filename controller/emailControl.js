const Email = require("../models/email");
const catchAsync = require("../utils/asyncFunctions");

exports.createEmail = catchAsync(async (req, res, next) => {
  const email = await Email.create({ email: req.body.email });
  res.status(201).json({
    status: "success",
    data: { email },
  });
});
