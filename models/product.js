const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    category: {
      type: String,
      required: true,
      validate: {
        validator: (value) =>
          [
            "vegetables & ethnic foods",
            "health & beauty",
            "drinks & beverages",
            "accessories & antiques",
          ].includes(value),
        message:
          "Category must be one of these option: vegetables & ethnic foods, health & beauty, drinks & beverages or accessories & antiques",
      },
    },
    type: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    // priceDiscount: {
    //   type: Number,
    //   validate: {
    //     validator: function (val) {
    //       // this only points to current doc on NEW document creation
    //       return val < this.price;
    //     },
    //     message: "Discount price ({VALUE}) should be below regular price",
    //   },
    // },
    // quantity: {
    //   type: Number,
    //   required: true,
    //   default: 0,
    // },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true }
);

productSchema.index({ price: 1 });

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
productSchema.pre("save", function (next) {
  this.name = this.name.toLowerCase().trim();
  this.type = this.type.toLowerCase().trim();
  this.brand = this.brand.toLowerCase().trim();
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
