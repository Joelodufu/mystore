const mongoose = require("mongoose");

const carouselSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      required: [true, "Product ID is required"],
      unique: true,
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
      validate: {
        validator: (value) => /^https?:\/\/.+/.test(value),
        message: "Invalid URL format",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Carousel", carouselSchema);
