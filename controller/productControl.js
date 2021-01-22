const Product = require("../models/product");
const APIFeatures = require("../utils/apiFeatures");
const sharp = require("sharp");
const catchAsync = require("../utils/asyncFunctions");
const AppError = require("../utils/appError");
const shortid = require("shortid");
const { manualSearch, shuffle } = require("../others/filter");
const { percentageDiscount } = require("../others/percentage");

const multer = require("multer");
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadProducts = upload.array("images", 3);

const resizePhotos = catchAsync(async (req, res, next) => {
  if (!req.files) return next();

  req.body.images = [];
  await Promise.all(
    req.files.map(async (file, i) => {
      const filename = `products-${shortid()}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(500, 500)
        .toFormat("jpeg")
        .jpeg({ quality: 90 });
      // .toFile(`./public/img/products/${filename}`);
      // await sharp(req.file.buffer).resize(500, 500).toFormat('jpeg').jpeg({ quality: 90 }).toFile(`./app/public/img/users/${req.file.filename}`)
      req.body.images.push(filename.toString());
    })
  );
  next();
});

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

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = catchAsync(async (req, res, next) => {
  const arr = ({
    name,
    price,
    description,
    image,
    brand,
    category,
    quantity,
  } = req.body);

  const _id = req.params.id;

  // if (req.file) req.body.images = req.file.filename;
  if (req.file) arr.images = req.file.filename;

  if (!req.body) {
    return next(new AppError("please put in a vaild input", 404));
  }

  const doc = await Product.findOne({ _id });

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  const info = await Product.findByIdAndUpdate(_id, arr, {
    new: true,
    validateBeforeSave: false,
  });

  res.status(200).json({
    status: "success",
    data: {
      product: info,
    },
  });
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
  deleteProduct,
  createProduct,
  updateProduct,
  randomProducts,
  uploadProducts,
  resizePhotos,
  discount,
};
