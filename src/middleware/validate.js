exports.validateProduct = (req, res, next) => {
    const { name, description, price, category, stock, rating, discountRate, images } = req.body;
  
    if (req.method === 'POST' && (!name || !description || !price || !category || !stock || !images)) {
      return res.status(400).json({ message: 'All fields (name, description, price, category, stock, images) are required for creating a product' });
    }
  
    if (images) {
      if (!Array.isArray(images) || images.length === 0 || images.length > 5) {
        return res.status(400).json({ message: 'Images must be an array with 1 to 5 URLs' });
      }
  
      for (const url of images) {
        if (!/^https?:\/\/.+/.test(url)) {
          return res.status(400).json({ message: 'Invalid image URL format' });
        }
      }
    }
  
    if (rating !== undefined && (typeof rating !== 'number' || rating < 0 || rating > 5)) {
      return res.status(400).json({ message: 'Rating must be a number between 0 and 5' });
    }
  
    if (discountRate !== undefined && (typeof discountRate !== 'number' || discountRate < 0 || discountRate > 100)) {
      return res.status(400).json({ message: 'Discount rate must be a number between 0 and 100' });
    }
  
    next();
  };
  
  exports.validateCarousel = (req, res, next) => {
    const { imageUrl } = req.body;
  
    if (req.method === 'POST' && !imageUrl) {
      return res.status(400).json({ message: 'Image URL is required for creating a carousel item' });
    }
  
    if (imageUrl && !/^https?:\/\/.+/.test(imageUrl)) {
      return res.status(400).json({ message: 'Invalid image URL format' });
    }
  
    next();
  };