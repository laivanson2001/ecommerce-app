const express = require("express");
const {
	createProduct,
	getProduct,
	getAllProduct,
} = require("../controller/productController");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

const productRouter = express.Router();

productRouter.get("/", getAllProduct);
productRouter.get("/:id", getProduct);

productRouter.post("/", authMiddleware, isAdmin, createProduct);

module.exports = productRouter;
