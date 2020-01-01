const Product = require("../models/product");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/asyncFunctions");
const AppError = require("../utils/appError");
const { manualSearch, shuffle } = require("../others/filter");
const { percentageDiscount } = require("../others/percentage");

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = catchAsync(async (req, res, next) => {
  const { search } = req.query;
  let filter = search ? manualSearch(req.query.search) : req.query;
  const select = "-description -type";
  const products = await Product.find(filter).select(select);

  res.status(200).json({
    status: "success",
    results: products.length,
    data: { products },
  });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(201).json({
      status: "success",
      data: {
        product,
      },
    });
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

  res.status(200).json({
    status: "success",
    data: { products },
  });
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
