const AppError = require("./utils/appError");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const mongoSanatize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const globalErrorHandler = require("./controller/errorControl");
const orderRouter = require("./routes/orderRoutes");
const productRouter = require("./routes/productRoutes");
const usersRouter = require("./routes/usersRoutes");
const emailRouter = require("./routes/emailRoutes");

const app = express();

// Compress files to gzip
app.use(compression());

// Need to sort out an api limiter
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

app.use(cors());

app.options("*", cors());

app.use(express.static(path.join(__dirname, "client", "build")));

// Body and Cookie Parser
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// Set security HTTP headers
app.use(helmet());

// Data sanitization against XSS
app.use(xss());

// Data sanitization against NoSQL query injection
app.use(mongoSanatize());

app.use("/api/v1/email", emailRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/order", orderRouter);

// Client handler
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.all("*", (req, res, next) => {
  next(new AppError(`cant find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;