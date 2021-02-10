const Product = require("../models/product");
const { connect } = require("mongoose");
require("colors");
require("dotenv").config();

connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then((connect) => {
    console.log(`MongoDB Connected: ${connect.connection.host}`.cyan.underline);
  })
  .then(() => Product.find())
  .then((products) => {
    const list = {};
    const tempList = [];
    products.forEach((cur) => {
      if (!tempList.includes(cur.type) && tempList.push(cur.type))
        list[cur.category] = list[cur.category]
          ? [...list[cur.category], cur.type]
          : [cur.type];
    });
    return list;
  })
  .then((list) => console.log(list))
  .catch((error) => {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  });
