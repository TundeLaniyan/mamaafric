const express = require("express");
const {
  getCheckoutSession,
  cart,
  getOrdersAllAdmin,
  sessionResponse,
  getOrder,
} = require("../controller/orderControl");

const { protect, restrictTo } = require("../controller/authControl");

// const app = express();

const router = express.Router();
router.route("/checkout-session/:orderId").get(getCheckoutSession);

router.route("/checkout-session").post(cart);

router.route("/session/:orderId").get(sessionResponse);

router.route("/").post(protect, restrictTo("admin"), getOrdersAllAdmin);

router.route("/:id").get(getOrder);

module.exports = router;
