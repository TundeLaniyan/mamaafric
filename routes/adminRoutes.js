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
// router.use(function (req, res, next) {
//   console.log(3003);
//   next();
// });
router.route("/").post(uploadProducts, renameImage, createProduct);

router
  .route("/:_id")
  .patch(uploadProducts, renameImage, updateProduct)
  .delete(deleteProduct);

module.exports = router;
