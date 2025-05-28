  const mongoose = require('mongoose');

  const productSchema = new mongoose.Schema({
    id: {
      type: Number,
      required: [true, 'Product ID is required'],
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },   comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    stock: {
      type: Number,
      required: [true, 'Stock is required'],
      min: [0, 'Stock cannot be negative'],
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot be more than 5'],
    },
    discountRate: {
      type: Number,
      default: 0,
      min: [0, 'Discount rate cannot be less than 0'],
      max: [100, 'Discount rate cannot be more than 100'],
    },
    images: [{
      type: String,
      required: [true, 'Image URL is required'],
      trim: true,
      validate: {
        validator: (value) => /^https?:\/\/.+/.test(value),
        message: 'Invalid URL format',
      },
    }],
  }, {
    timestamps: true,
  });

  module.exports = mongoose.model('Product', productSchema);