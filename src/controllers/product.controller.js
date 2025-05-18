const Product = require('../models/product.model');
const asyncHandler = require('express-async-handler');

// Get all products
exports.getProducts = asyncHandler(async (req, res) => {
  const { category, search } = req.query;
  let query = {};

  if (category) {
    query.category = category;
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  const products = await Product.find(query);
  res.json(products);
});

// Get single product by id
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ id: req.params.id });
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json(product);
});

// Get all categories
exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct('category');
  res.json(categories);
});

// Create new product
exports.createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, stock, rating, discountRate, images } = req.body;

  const lastProduct = await Product.findOne().sort({ id: -1 });
  const newId = lastProduct ? lastProduct.id + 1 : 1;

  const product = new Product({
    id: newId,
    name,
    description,
    price,
    category,
    stock,
    rating: rating || 0,
    discountRate: discountRate || 0,
    images,
  });

  const savedProduct = await product.save();
  res.status(201).json(savedProduct);
});

// Update product
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ id: req.params.id });
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const { name, description, price, category, stock, rating, discountRate, images } = req.body;
  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.category = category || product.category;
  product.stock = stock || product.stock;
  product.rating = rating !== undefined ? rating : product.rating;
  product.discountRate = discountRate !== undefined ? discountRate : product.discountRate;
  product.images = images || product.images;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

// Delete product
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ id: req.params.id });
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  await product.remove();
  res.json({ message: 'Product deleted' });
});