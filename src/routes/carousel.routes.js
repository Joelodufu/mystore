const express = require("express");
const router = express.Router();
const {
  getCarousel,
  getCarouselById,
  createCarousel,
  updateCarousel,
  deleteCarousel,
} = require("../controllers/carousel.controller");
const { validateCarousel } = require("../middleware/validate");

router.get("/", getCarousel);
router.get("/:productId", getCarouselById);
router.post("/", validateCarousel, createCarousel);
router.put("/:productId", validateCarousel, updateCarousel);
router.delete("/:productId", deleteCarousel);

module.exports = router;
