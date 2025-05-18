// scripts/checkDB.js
const mongoose = require("mongoose");
const connectDB = require("./db");
const Carousel = require("../models/carousel.model");
const Product = require("../models/product.model");

(async () => {
  await connectDB();
  const carousels = await Carousel.find({
    imageUrl: "https://git.new/pathToRegexpError",
  });
  const products = await Product.find({
    images: "https://git.new/pathToRegexpError",
  });
  console.log("Carousels with problematic URL:", carousels);
  console.log("Products with problematic URL:", products);
  mongoose.disconnect();
})();
