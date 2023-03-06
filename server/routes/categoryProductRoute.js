const express = require("express");
const {
	createCategory,
	updateCategory,
	deleteCategory,
	getAllCategory,
	getCategory,
} = require("../controller/categoryProductController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const categoryProductRouter = express.Router();

categoryProductRouter.get("/", getAllCategory);
categoryProductRouter.get("/:id", getCategory);

categoryProductRouter.post("/", authMiddleware, isAdmin, createCategory);

categoryProductRouter.put("/:id", authMiddleware, isAdmin, updateCategory);

categoryProductRouter.delete("/:id", authMiddleware, isAdmin, deleteCategory);

module.exports = categoryProductRouter;
