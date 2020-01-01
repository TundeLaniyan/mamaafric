const Product = require("../models/product");
const sharp = require("sharp");
const shortid = require("shortid");
const multer = require("multer");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/asyncFunctions");
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

exports.uploadProducts = upload.array("images", 3);

exports.resizePhotos = catchAsync(async (req, res, next) => {
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

exports.updateProduct = catchAsync(async (req, res, next) => {
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

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    return next(new AppError("Product not found", 404));
  }
});

exports.createProduct = catchAsync(async (req, res, next) => {
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