const express = require("express");
const {
  getProductsAllAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProducts,
  resizePhotos,
  discount,
} = require("../controller/productControl");
const { protect, restrictTo } = require("../controller/authControl");

const router = express.Router();
router.use(protect, restrictTo("admin"));
router.route("/").post(uploadProducts, resizePhotos, createProduct);
router.route("/getall").get(getProductsAllAdmin);
// router.route("/discount/:id").post(discount);

router
  .route("/:id")
  .patch(uploadProducts, resizePhotos, updateProduct)
  .delete(deleteProduct);

module.exports = router;
