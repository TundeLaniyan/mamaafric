const express = require("express");
const {
  getProducts,
  getProductsAllAdmin,
  getProductsAllAdminCount,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  resetAll,
  uploadProducts,
  resizePhotos,
  get15randomProducts,
  discount,
} = require("../controller/productControl");
const { protect, restrictTo } = require("../controller/authControl");

const app = express();

const router = express.Router();
router
  .route("/")
  .get(getProducts)
  .post(
    protect,
    restrictTo("admin"),
    uploadProducts,
    resizePhotos,
    createProduct
  );
router.route("/getall").get(getProductsAllAdmin);
router.route("/get15randomProducts").get(get15randomProducts);
router.route("/getallcount").get(getProductsAllAdminCount);
router.route("/resetAll").delete(resetAll);

router.route("/discount/:id").post(discount);

router
  .route("/:id")
  .get(protect, getProductById)
  .patch(protect, uploadProducts, resizePhotos, updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;
