const express = require("express");
const {
	createCategory,
	updateCategory,
	deleteCategory,
	getAllCategory,
	getCategory,
} = require("../controller/categoryBlogController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const categoryBlogRouter = express.Router();

categoryBlogRouter.get("/", getAllCategory);
categoryBlogRouter.get("/:id", getCategory);

categoryBlogRouter.post("/", authMiddleware, isAdmin, createCategory);

categoryBlogRouter.put("/:id", authMiddleware, isAdmin, updateCategory);

categoryBlogRouter.delete("/:id", authMiddleware, isAdmin, deleteCategory);

module.exports = categoryBlogRouter;
