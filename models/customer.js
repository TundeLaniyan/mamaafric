const mongoose = require("mongoose");
const validator = require("validator");

const customerSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email address"],
  },
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
