const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const { validateProduct } = require("../middleware/validate");

router.get("/", getProducts);
router.get("/categories", getCategories);
router.get("/:id", getProductById);
router.post("/", validateProduct, createProduct);
router.put("/:id", validateProduct, updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
