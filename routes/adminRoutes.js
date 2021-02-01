const express = require("express");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProducts,
  resizePhotos,
} = require("../controller/adminControl");
const { protect, restrictTo } = require("../controller/authControl");

const router = express.Router();
router.use(function (req, res, next) {
  console.log(2002);
  next();
});
router.use(protect, restrictTo("admin"));
router.use(function (req, res, next) {
  console.log(3003);
  next();
});
router.route("/").post(uploadProducts, resizePhotos, createProduct);

router
  .route("/:id")
  .patch(uploadProducts, resizePhotos, updateProduct)
  .delete(deleteProduct);

module.exports = router;
