const Product = require("../models/product");
const catchAsync = require("../utils/asyncFunctions");
const AppError = require("../utils/appError");
const { manualSearch, shuffle } = require("../others/filter");
const { percentageDiscount } = require("../others/percentage");

const getProducts = catchAsync(async (req, res, next) => {
  const { search, category, type } = req.query;
  let filter;
  if (search) filter = manualSearch(req.query.search);
  else {
    if (category) req.query.category = category.split("and").join("&");
    if (type) req.query.type = req.query.type.split("and").join("&");
    filter = req.query;
  }
  const select = "-description -type";
  const products = await Product.find(filter).select(select);

  res
    .status(200)
    .json({ status: "success", results: products.length, products });
});

const getProductById = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(201).json({ status: "success", product });
  } else {
    return next(new AppError("Product not found", 404));
  }
});

const randomProducts = catchAsync(async (req, res) => {
  const limit = req.query.limit || 3;
  const products = shuffle(
    await Product.find({}).select("-description -category -type")
  );
  products.length = limit;

  res.status(200).json({ status: "success", products });
});

const discount = catchAsync(async (req, res, next) => {
  const {
    perDiscount,
    totalPrice,
    product,
    genericDiscount,
    numberToBuy,
  } = req.body;

  //  need to sort out dicount on stripe
  const products = await Product.findById(req.params.id).select("-owner -__v");

  const result = percentageDiscount(
    {
      perDiscount,
      genericDiscount,
      totalPrice: Number(products.price),
      product,
      numberToBuy,
    },
    req,
    res,
    next
  );

  products.priceDiscount = result;
  products.save({ validateBeforeSave: false });

  if (result) {
    res.status(200).json({
      status: "success",
      data: {
        result: `Price Discount has been updated to £${products.priceDiscount.toFixed(
          2
        )}`,
      },
    });
  }
});

module.exports = {
  getProducts,
  getProductById,
  randomProducts,
  discount,
};
