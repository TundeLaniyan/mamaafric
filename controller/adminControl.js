const Product = require("../models/product");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/asyncFunctions");
const AppError = require("../utils/appError");
const { keyword } = require("../others/filter");

export const getProductsAllAdmin = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Product.find({ ...keyword(req.query.keyword) }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .pagination();

  req.query.limit = 10;

  const count = await Product.countDocuments({ ...keyword(req.query.keyword) });

  const product = await features.query.select("-createdAt -updatedAt");

  if (!product) {
    return next(new AppError("those credentials were not found sorry :(", 404));
  }

  res.status(200).json({
    status: "success",
    pages: Math.ceil(count / req.query.limit),
    // pageNumber: Number(req.query.page),
    results: count,
    data: {
      product,
    },
  });
});

export const getProductsAllAdminCount = catchAsync(async (req, res, next) => {
  const product = await Product.countDocuments({
    ...keyword(req.query.keyword),
  });

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = catchAsync(async (req, res, next) => {
  req.query.limit = 10;

  let filter = { ...keyword(req.query.keyword) };

  const features = new APIFeatures(Product.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();

  const count = await Product.countDocuments({ ...keyword(req.query.keyword) });

  const product = await features.query.select("-owner");

  if (!features.queryString.keyword)
    return next(new AppError("Please put in a search term !!!!!", 400));

  if (product.length === 0) {
    return next(new AppError("those credentials were not found sorry :(", 404));
  }

  res.status(200).json({
    status: "success",
    pages: Math.ceil(count / req.query.limit),
    // pageNumber: Number(req.query.page),
    results: count,
    data: {
      product,
    },
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

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    return next(new AppError("Product not found", 404));
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = catchAsync(async (req, res, next) => {
  const arr = ({
    name,
    price,
    images,
    brand,
    quantity,
    numReviews,
    category,
    description,
    type,
  } = req.body);

  if (req.file) arr.images = req.file.filename;

  const product = await Product.create({ ...arr, owner: req.user.id });

  if (product === undefined || !product) {
    return next(
      new AppError("unable to process this application please try again", 404)
    );
  }

  res.status(201).json({
    status: "success",
    data: {
      product,
    },
  });
});
