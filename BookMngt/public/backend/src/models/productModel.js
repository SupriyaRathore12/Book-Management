const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productImage: {
      type: String,
      required: true,
      trim: true,
    },
    productName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      enum: ["electronics", "clothing", "food", "books", "furniture"],
      required: true,
      trim: true,
      lowercase:true
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    ratings: {
      type: Number,
      required: true,
    },
    isFreeDelivery: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("product", productSchema);
