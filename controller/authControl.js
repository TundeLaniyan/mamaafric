const { promisify } = require("util");
const catchAsync = require("../utils/asyncFunctions");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const { Email, sendEmail } = require("../utils/email");

const user = {
  _id: 1611766224330,
  name: "Issac Fayose",
  role: "admin",
  email: "mamaafric2020@gmail.com",
  password: "PleaseCreateANewPassword",
};
const signAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendAccessToken = (user, statusCode, req, res) => {
  const token = signAccessToken(user._id);

  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    httpOnly: true,
  };
  // if (req.secure || req.headers["x-forwarded-proto"] === "https")
  //   cookieOption.secure = true;
  if (process.env.NODE_ENV === "production") cookieOption.secure = true;

  res.cookie("jwt", token, cookieOption);

  res.status(statusCode).json({ status: "success", token, user });
};

const logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError("Please provide email and password", 401));

  if (email !== user.email || password !== user.password)
    return next(new AppError("Invalid email or password", 401));

  createSendAccessToken(user, 200, req, res);
});

const logOut = async (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: "success" });
};

const protect = catchAsync(async (req, res, next) => {
  console.log(0);
  console.log(req.headers.authorization);
  console.log(req.cookies.jwt);
  console.log(req.headers);
  console.log({ list: req.cookies });
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  console.log(1);
  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(2);
  // 3) Check if user exists
  if (!decoded || decoded.id !== user._id)
    return next(
      new AppError("The user belonging to this token does not exist.", 401)
    );
  console.log(3);
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = user;
  res.locals.user = user;
  next();
});

const isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    // 2) Verification token
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );

    // 3) Check if user exists
    if (!decoded || decoded.id !== user._id)
      return next(
        new AppError("You are not logged in! Please log in to get access.", 401)
      );
    console.log("success");
    return res.status(200).json({ status: "success" });
  }

  return next(
    new AppError("You are not logged in! Please log in to get access.", 401)
  );
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};

const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (email !== user.email)
    return next(new AppError("there is no user with this email address", 404));

  try {
    await sendEmail({
      email: user.email,
      subject: "Forgot your password",
      message: `Forgot your password?\n Your password is: ${user.password}.`,
    });

    res.status(200).json({
      status: "success",
      message: "Token has been send to email",
    });
  } catch (error) {
    return next(
      new AppError(
        "There was an error sending this email. Try again later!",
        500
      )
    );
  }
});

module.exports = {
  logIn,
  protect,
  restrictTo,
  forgotPassword,
  isLoggedIn,
  logOut,
};
