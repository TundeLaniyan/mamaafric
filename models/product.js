const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    name: {
      type: String,
      required: true,
      unique: true,
    },

    slug: {
      type: String,
    },

    images: {
      type: [String],
      required: true,
    },

    brand: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: {
        values: ["groceries", "home", "household", "health & beauty"],
        message: `difficulty is either: groceries, home, household, health & beauty`,
      },
    },

    type: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    // reviews: [reviewSchema],

    rating: {
      type: Number,
      default: 0,
    },

    numReviews: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: "Discount price ({VALUE}) should be below regular price",
      },
    },

    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ price: 1 });
productSchema.index({ slug: 1 });

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
productSchema.pre("save", function (next) {
  next();
});

productSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: 'owner',
  //   select: 'name role'
  // });

  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
