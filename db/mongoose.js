const { connect } = require("mongoose");

const dataBaseConnection = async () => {
  const DB =
    process.env.NODE_ENV === "production"
      ? process.env.DATABASE
      : process.env.DATABASE_LOCAL;
  try {
    const conn = await connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

module.exports = dataBaseConnection;
