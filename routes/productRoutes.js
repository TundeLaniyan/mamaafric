const express = require("express");
const {
  getProducts,
  getProductById,
  randomProducts,
} = require("../controller/productControl");

const router = express.Router();
router.route("/").get(getProducts);
router.route("/random-products").get(randomProducts);
router.route("/:_id").get(getProductById);

module.exports = router;
