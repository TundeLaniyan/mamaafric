const Product = require("../models/product");
const AppError = require("../utils/appError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require("../models/order");
const Customer = require("../models/customer");
const catchAsync = require("../utils/asyncFunctions");
const factory = require("./crudFactory/factory");

const getCheckoutSession = catchAsync(async (req, res, next) => {
  const { email, products, name, shippingAddress } = req.body;
  if (
    !email ||
    typeof products !== "object" ||
    !products.length ||
    !name ||
    !shippingAddress
  )
    return next(
      new AppError(
        `Please provide ${
          !products.length ? "product list" : "customer details"
        }`,
        400
      )
    );

  let customer = await Customer.findOne({ email, name, shippingAddress });
  if (!customer) {
    customer = await Customer.create({ email, name, shippingAddress });
  }
  console.log("customer", customer);
  console.log("products", products);

  const items = await Product.find({ _id: { $in: products } });
  console.log("items", items.length);
  return next(new AppError());

  if (!items.length) return next(new AppError(`Product are not found`, 400));

  const line_items = items.map((product) => {
    return {
      name: `${product.name} product`,
      description: product.description,
      images: [`${req.protocol}://${req.get("host")}/img/${product.images}`],
      amount: product.price,
      currency: "gbp",
      quantity: 1,
    };
  });

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${req.protocol}://${req.get("host")}/success`,
    cancel_url: `${req.protocol}://${req.get("host")}/fail`,
    customer_email: email,
    client_reference_id: products.join("-"),
    line_items,
  });

  // 3) Create session as response
  res.status(200).json({
    status: "success",
    session,
  });
});

const createBookingCheckout = async (session) => {
  const products = session.client_reference_id.split("-");
  const customer = (await Customer.findOne({ email: session.customer_email }))
    .id;
  const totalPrice = session.display_items.reducer(
    (a, b) => a.amount + b.amount
  );
  await Order.create({ products, customer, totalPrice });
};

exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed")
    createBookingCheckout(event.data.object);

  res.status(200).json({ received: true });
};

const createOrder = factory.createOne(Order);
const getOrder = factory.getOne(Order);
const getAllOrders = factory.getAll(Order);
const updateOrder = factory.updateOne(Order);
const deleteOrder = factory.deleteOne(Order);

module.exports = {
  createOrder,
  getOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  getCheckoutSession,
};
