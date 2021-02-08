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
            "frozen vegetables",
            "drinks & beverages",
            "accessories & antiques",
          ].includes(value),
        message:
          "Category must be one of these option: vegetables & ethnic foods, frozen vegetables, drinks & beverages or offers",
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
  this.name = slugify(this.name || "", { lower: true });
  this.brand = slugify(this.brand || "", { lower: true });
  this.category = slugify(this.category || "", { lower: true });
  this.type = slugify(this.type || "", { lower: true });
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
