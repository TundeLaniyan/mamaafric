const mongoose = require("mongoose");
const validator = require("validator");
const shortid = require("shortid");

const orderSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Order needs products"],
    },
  ],
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: "Customer",
    required: [true, "Order needs customer detail"],
  },
  totalPrice: {
    type: Number,
    required: [true, "Order needs total price"],
  },
  isPaid: {
    type: Boolean,
    default: true,
  },
  paidAt: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
