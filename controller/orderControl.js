const Product = require("../models/product");
// const emailList = require("../models/email");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { Email, sendEmail } = require("../utils/email");
const Order = require("../models/order");
const catchAsync = require("../utils/asyncFunctions");

const {
  deleteOne,
  creator,
  updator,
  findAllWithQuery,
  getOne,
} = require("./crudFactory/factory");

const getCheckoutSession = catchAsync(async (req, res, next) => {
  const personal_userID = req.params.orderId;
  // 1) Get the currently ordered product
  // const {products, paymentMethod, customer_email} = await Order.findOne({personal_userID});

  const order = await Order.findOne({ personal_userID });

  if (!order) {
    return next(new AppError(`${req.params.orderId} not found`, 404));
  }

  // const totalPrice = orderItems.map((el) => el.price).reduce((a, b) => a + b, 0)
  const line_items = await Promise.all(
    order.products.map(async (_id) => {
      const product = await Product.findOne({ _id });

      return {
        name: `${product.name} product`,
        description: product.description,
        images: product.images,
        amount: product.price * 100,
        currency: "gbp",
        quantity: 1,
      };
    })
  );

  if (!line_items) {
    return next(new AppError(`${req.params.orderId} not found`, 404));
  }

  // const emailSchema = await emailList.create({
  //   email: order.customer_email
  // })

  // console.log(emailSchema)

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: [order.paymentMethod],
    success_url: `${req.protocol}://${req.get(
      "host"
    )}/api/v1/order/session/${personal_userID}`,
    cancel_url: `${req.protocol}://${req.get(
      "host"
    )}/api/v1/order/session/${personal_userID}`,
    customer_email: order.customer_email,
    client_reference_id: req.params.orderId,
    line_items,
  });

  order.session_id = session.id;
  order.save();

  // 3) Create session as response
  res.status(200).json({
    status: "success",
    session,
  });
});

// https://www.fullstackacademy.com/blog/nine-best-programming-languages-to-learn

const sessionResponse = catchAsync(async (req, res, next) => {
  const order = await Order.findOne({ personal_userID: req.params.orderId });

  const session = await stripe.checkout.sessions.retrieve(order.session_id);

  if (session.payment_status === "paid" && order.isPaid === true) {
    return res.status(200).json({
      status: "success",
      message: "we will be in contact will you soon",
    });
  }

  if (session.payment_status === "paid") {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.totalPrice = session.amount_total / 100;
    order.save();
    order.products.map((product) => {
      console.log(product._id);
    });

    await Promise.all(
      order.products.map(async (product) => {
        const prod = await Product.findOne({ _id: product._id });
        prod.quantity = prod.quantity - 1;

        prod.save();
        // console.log(prod.quantity)

        return prod.name;
      })
    );

    const message = `Your Product has been paid for we will be in contact will you soon`;

    await sendEmail({
      email: order.customer_email,
      subject: "Purchase accepted",
      message,
    });

    // NO email confirmation
    return res.status(200).json({
      status: "success",
      message,
    });
  }

  const message = `payment did not go through`;

  await sendEmail({
    email: order.customer_email,
    subject: "Product accepted",
    message,
  });

  res.status(200).json({
    status: "success",
    message,
  });
});

const createOrder = creator(Order);
const getOrder = getOne(Order);
const updateOrder = updator(Order);
const deleteOrder = deleteOne(Order);

const cart = catchAsync(async (req, res) => {
  const shippingAddress = {};

  const {
    name,
    qty,
    price,
    customer_email,
    products,
    address,
    city,
    postalCode,
    country,
    itemsPrice,
    shippingPrice,
  } = req.body;

  shippingAddress.address = address;
  shippingAddress.city = city;
  shippingAddress.postalCode = postalCode;
  shippingAddress.country = country;

  const order = new Order({
    products,
    customer_email,
    paymentMethod: "card",
    shippingAddress,
  });

  const createdOrder = await order.save();

  res.status(201).json({
    status: "success",
    order: createdOrder,
  });
});

const getOrdersAllAdmin = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Order.find({}), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();

  const { limit } = req.query;

  limit = 10;

  const count = await Order.countDocuments({});
  const orders = await features.query.select("-createdAt -updatedAt");

  if (!orders) {
    return next(new AppError("those credentials were not found sorry :(", 404));
  }

  res.status(200).json({
    status: "success",
    pages: Math.ceil(count / limit),
    results: count,
    data: {
      orders,
    },
  });
});

// 15 random products
module.exports = {
  updateOrder,
  deleteOrder,
  getCheckoutSession,
  cart,
  getOrdersAllAdmin,
  getOrder,
  sessionResponse,
};
