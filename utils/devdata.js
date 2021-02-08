const Product = require("../models/product");
const { connect } = require("mongoose");
require("colors");
require("dotenv").config();

connect(process.env.DATABASE_LOCAL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then((connect) => {
    console.log(`MongoDB Connected: ${connect.connection.host}`.cyan.underline);
  })
  .then(() => Product.deleteMany())
  .then(() => performCode())
  .then(() => Product.find())
  .then((product) => console.log("length", product.length))
  .catch((error) => {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  });
console.log("dev data running");
const products = [
  {
    name: "Relish Seafood Delight",
    price: 6.99,
    image: "40421.png",
    brand: "Relish",
    category: "groceries",
    type: "Snacks",
    description:
      "Food, Drinks, Spices & Seasoning, Snacks, Meat, Fish & poultry, Rices, Pastra & Flour, Fruit & Veg",
  },
  {
    name: "Aboniki Balm",
    price: 16.99,
    image: "aboniki.png",
    brand: "Aboniki",
    category: "health and beauty",
    type: "Skin care",
    description:
      "Food, Drinks, Spices & Seasoning, Snacks, Meat, Fish & poultry, Rices, Pastra & Flour, Fruit & Veg",
  },
  {
    name: "Amstel Malt",
    price: 1.99,
    image: "amstel.png",
    brand: "Amstel",
    category: "groceries",
    type: "Drink",
    description:
      "Food, Drinks, Spices & Seasoning, Snacks, Meat, Fish & poultry, Rices, Pastra & Flour, Fruit & Veg",
  },
  {
    name: "Ayoola Pounded Yam",
    price: 19.99,
    image: "Ayoola-poundo-yam-flour450g.png",
    brand: "Ayoola",
    category: "groceries",
    type: "Rice pasta flour",
    description:
      "Food, Drinks, Spices & Seasoning, Snacks, Meat, Fish & poultry, Rices, Pastra & Flour, Fruit & Veg",
  },
  {
    name: "Black seed",
    price: 3.99,
    image: "black-seed.png",
    category: "groceries",
    type: "Food",
    description:
      "Food, Drinks, Spices & Seasoning, Snacks, Meat, Fish & poultry, Rices, Pastra & Flour, Fruit & Veg",
  },
  {
    name: "Tiger Blades",
    price: 12.99,
    image: "blades.png",
    brand: "Tiger",
    category: "groceries",
    type: "Snacks",
    description:
      "Food, Drinks, Spices & Seasoning, Snacks, Meat, Fish & poultry, Rices, Pastra & Flour, Fruit & Veg",
  },
  {
    name: "Blue Band Butter",
    price: 36.99,
    image: "blue-band.png",
    brand: "Blue Band",
    category: "groceries",
    type: "Food",
    description:
      "Food, Drinks, Spices & Seasoning, Snacks, Meat, Fish & poultry, Rices, Pastra & Flour, Fruit & Veg",
  },
  {
    name: "Bonvita",
    price: 1.49,
    image: "bon-vita.png",
    brand: "Bournvita",
    category: "groceries",
    type: "Drink",
    description:
      "Food, Drinks, Spices & Seasoning, Snacks, Meat, Fish & poultry, Rices, Pastra & Flour, Fruit & Veg",
  },
  {
    name: "Bournvita",
    price: 1.49,
    image: "bournvita.png",
    brand: "Bournvita",
    category: "groceries",
    type: "Drink",
    description:
      "Food, Drinks, Spices & Seasoning, Snacks, Meat, Fish & poultry, Rices, Pastra & Flour, Fruit & Veg",
  },
  {
    name: "Playing Cards",
    price: 0.99,
    image: "cards.png",
    category: "home",
    description:
      "Food, Drinks, Spices & Seasoning, Snacks, Meat, Fish & poultry, Rices, Pastra & Flour, Fruit & Veg",
  },
  {
    name: "Checkers Custard",
    price: 4.99,
    image: "checker-custard.png",
    brand: "Checkers",
    category: "groceries",
    type: "Food",
    description:
      "Food, Drinks, Spices & Seasoning, Snacks, Meat, Fish & poultry, Rices, Pastra & Flour, Fruit & Veg",
  },
  {
    name: "Flex Peanuts",
    price: 86.99,
    image: "flex-peanuts.png",
    brand: "Flex",
    category: "groceries",
    type: "Food",
    description:
      "Food, Drinks, Spices & Seasoning, Snacks, Meat, Fish & poultry, Rices, Pastra & Flour, Fruit & Veg",
  },
  {
    name: "Funbact-A Cream",
    price: 1.49,
    image: "funbact.png",
    brand: "Funbact",
    category: "health and beauty",
    type: "Skin care",
    description:
      "Food, Drinks, Spices & Seasoning, Snacks, Meat, Fish & poultry, Rices, Pastra & Flour, Fruit & Veg",
  },
  {
    name: "Gino",
    price: 15.49,
    image: "gino.png",
    brand: "Gino",
    category: "groceries",
    type: "Fruit and veg",
    description:
      "Food, Drinks, Spices & Seasoning, Snacks, Meat, Fish & poultry, Rices, Pastra & Flour, Fruit & Veg",
  },
  {
    name: "Golden Basmati",
    price: 16.99,
    image: "golden-basmati.png",
    brand: "Golden",
    category: "groceries",
    type: "Rice pasta flour",
    description:
      "Food, Drinks, Spices & Seasoning, Snacks, Meat, Fish & poultry, Rices, Pastra & Flour, Fruit & Veg",
  },
];

async function performCode() {
  console.log("STARTING");
  await Promise.all(
    products.map(async (cur, i) => {
      console.log(i);
      await Product.create(cur);
    })
  );
  console.log("Data added successfully");
}
