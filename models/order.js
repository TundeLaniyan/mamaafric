const mongoose = require("mongoose");
const validator = require("validator");
const shortid = require("shortid");

const orderSchema = new mongoose.Schema(
  {
    customer_email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
    },

    name: String,

    session_id: String,

    products: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    ],

    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },

    paymentMethod: {
      type: String,
      required: true,
    },

    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },

    shippingPrice: Number,

    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: {
      type: Date,
    },

    personal_userID: {
      type: String,
      default: shortid(),
    },

    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },

    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "products",
    select: "name price description images quantity",
  });
  next();
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
