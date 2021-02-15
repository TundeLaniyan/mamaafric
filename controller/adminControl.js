const Product = require("../models/product");
const sharp = require("sharp");
const shortid = require("shortid");
const multer = require("multer");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/asyncFunctions");
const aws = require("aws-sdk");
const multerSharp = require("multer-sharp-s3");
const multerS3 = require("multer-s3-transform");
const { memoryStorage } = require("multer");
const slugify = require("slugify");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const multerFilter = (req, file, cb) => {
  file.mimetype.startsWith("image")
    ? cb(null, true)
    : cb(
        new AppError(
          "File uploaded is not an image. Please upload an image.",
          400
        )
      );
};

const multerStorage = multerS3({
  key: (req, file, cb) => cb(null, `product-${Date.now()}`),
  bucket: `${process.env.AWS_BUCKET}`,
  s3,
  acl: "public-read",
  transform: function (req, file, cb) {
    cb(null, sharp().resize(100, 100).toFormat("jpeg").jpg({ quality: 90 }));
  },
  // resize: { suffix: "0.jpg", width: 200, height: 200, fit: "cover" },
  // toFormat: {
  //   type: "jpg",
  //   options: { progressive: true, quality: 80 },
  // },
});

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadProducts = multer({ storage: multerStorage }).array("image", 1);

exports.renameImage = catchAsync(async (req, res, next) => {
  req.body.image = `${req.body.name.split(" ").join("-").toLowerCase()}.jpg`;
  // return next(new AppError(`${JSON.stringify(req.files)}`, 500));
  // if (!req.files.image) return next();
  // console.log(req.files.image.map((file) => file.key));
  // req.body.image = req.files.image.map((file) => file.key);
  next();
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  // if (req.file) req.body.image = req.file.filename;
  if (req.file) req.body.image = req.file.filename;
  // if (!req.body) {
  //   return next(new AppError("please put in a vaild input", 404));
  // }

  // const doc = await Product.findOne({ _id });

  // if (!doc) {
  //   return next(new AppError("No document found with that ID", 404));
  // }

  const product = await Product.findByIdAndUpdate(req.params._id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) return next(new AppError("Product not found", 404));

  res.status(200).json({ status: "success", product });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params._id);

  if (product) {
    await product.remove();
    res.status(204).json({ message: "Product removed" });
  } else {
    return next(new AppError("Product not found", 404));
  }
});

exports.createProduct = catchAsync(async (req, res, next) => {
  if (req.file) req.body.image = slugify(req.file.filename);
  const product = await Product.create(req.body);

  if (product === undefined || !product) {
    return next(
      new AppError("unable to process this application please try again", 404)
    );
  }

  res.status(201).json({ status: "success", product });
});
