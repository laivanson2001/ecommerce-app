const express = require("express");
const {
	createProduct,
	getProduct,
	getAllProduct,
	updateProduct,
	deleteProduct,
	addToWishlist,
	rating,
} = require("../controller/productController");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

const productRouter = express.Router();

productRouter.get("/", getAllProduct);
productRouter.get("/:id", getProduct);

productRouter.post("/", authMiddleware, isAdmin, createProduct);

productRouter.put("/wishlist", authMiddleware, addToWishlist);
productRouter.put("/rating", authMiddleware, rating);
productRouter.put("/:id", authMiddleware, isAdmin, updateProduct);

productRouter.delete("/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = productRouter;
