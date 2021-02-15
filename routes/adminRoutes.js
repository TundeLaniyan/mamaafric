const express = require("express");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProducts,
  renameImage,
} = require("../controller/adminControl");
const { protect, restrictTo } = require("../controller/authControl");

const router = express.Router();

router.use(protect, restrictTo("admin"));

router.route("/").post(uploadProducts, renameImage, createProduct);

router
  .route("/:_id")
  .patch(uploadProducts, renameImage, updateProduct)
  .delete(deleteProduct);

module.exports = router;
