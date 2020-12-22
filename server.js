require("dotenv").config();
const database = require("./db/mongoose");
const colors = require("colors");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err);
  // console.log(err.name, err.message);
  process.exit(1);
});

const app = require("./app");
database();
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold
  );
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM RECEIVED! 💥 Shutting down...");
  server.close(() => {
    console.log("PROCESS TERMINATED");
  });
});
