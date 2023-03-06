const express = require("express");
const {
	createBlog,
	updateBlog,
	getBlog,
	getAllBlogs,
	deleteBlog,
	likeBlog,
	dislikeBlog,
} = require("../controller/blogController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getBlog);

blogRouter.post("/", authMiddleware, isAdmin, createBlog);

blogRouter.put("/likes", authMiddleware, likeBlog);
blogRouter.put("/dislikes", authMiddleware, dislikeBlog);
blogRouter.put("/:id", authMiddleware, isAdmin, updateBlog);

blogRouter.delete("/:id", authMiddleware, isAdmin, deleteBlog);

module.exports = blogRouter;
