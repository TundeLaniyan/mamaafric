const express = require("express");
const orderControl = require("../controller/orderControl");
const { protect, restrictTo } = require("../controller/authControl");

const router = express.Router();
router.post("/checkout-session", orderControl.getCheckoutSession);

router.use(protect, restrictTo("admin"));

router.route("/").get(orderControl.getAllOrders).post(orderControl.createOrder);

router
  .route("/:id")
  .get(orderControl.getOrder)
  .patch(orderControl.updateOrder)
  .delete(orderControl.deleteOrder);

module.exports = router;
