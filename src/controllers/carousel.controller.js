const Carousel = require('../models/carousel.model');
const asyncHandler = require('express-async-handler');

// Get all carousel items
exports.getCarousel = asyncHandler(async (req, res) => {
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

  const carousel = await Carousel.find(query);
  res.status(200).json(
    {
      status: "success",
      
      message:"Carousels retrieved",
      data: carousel
    }
  );
});

// Get single carousel item by productId
exports.getCarouselById = asyncHandler(async (req, res) => {
  const carousel = await Carousel.findOne({ productId: req.params.productId });
  if (!carousel) {
    res.status(404);
    throw new Error('Carousel item not found');
  }
  res.json(carousel);
});

// Create new carousel item
exports.createCarousel = asyncHandler(async (req, res) => {
  const { productId, imageUrl } = req.body;

  const lastCarousel = await Carousel.findOne().sort({ productId: -1 });
  const newProductId = lastCarousel ? lastCarousel.productId + 1 : 1;

  const carousel = new Carousel({
    productId: productId || newProductId,
    imageUrl,
  });

  const savedCarousel = await carousel.save();
  res.status(201).json(savedCarousel);
});

// Update carousel item
exports.updateCarousel = asyncHandler(async (req, res) => {
  const carousel = await Carousel.findOne({ productId: req.params.productId });
  if (!carousel) {
    res.status(404);
    throw new Error('Carousel item not found');
  }

  const { imageUrl } = req.body;
  carousel.imageUrl = imageUrl || carousel.imageUrl;

  const updatedCarousel = await carousel.save();
  res.json(updatedCarousel);
});

// Delete carousel item
exports.deleteCarousel = asyncHandler(async (req, res) => {
  const carousel = await Carousel.findOne({ productId: req.params.productId });
  if (!carousel) {
    res.status(404);
    throw new Error('Carousel item not found');
  }

  await carousel.remove();
  res.json({ message: 'Carousel item deleted' });
});