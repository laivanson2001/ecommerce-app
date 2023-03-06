const blogModel = require("../models/blogModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createBlog = asyncHandler(async (req, res) => {
	try {
		const newBlog = await blogModel.create(req.body);
		res.json(newBlog);
	} catch (error) {
		throw new Error(error);
	}
});

const updateBlog = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDbId(id);
	try {
		const updateBlog = await blogModel.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		res.json(updateBlog);
	} catch (error) {
		throw new Error(error);
	}
});

const getBlog = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDbId(id);
	try {
		const getBlog = await blogModel
			.findById(id)
			.populate("likes")
			.populate("dislikes");
		const updateViews = await blogModel.findByIdAndUpdate(
			id,
			{
				$inc: { numViews: 1 },
			},
			{ new: true }
		);
		res.json(getBlog);
	} catch (error) {
		throw new Error(error);
	}
});

const getAllBlogs = asyncHandler(async (req, res) => {
	try {
		const getBlogs = await blogModel.find();
		res.json(getBlogs);
	} catch (error) {
		throw new Error(error);
	}
});

const deleteBlog = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDbId(id);
	try {
		const deletedBlog = await blogModel.findByIdAndDelete(id);
		res.json(deletedBlog);
	} catch (error) {
		throw new Error(error);
	}
});

const likeBlog = asyncHandler(async (req, res) => {
	const { blogId } = req.body;
	validateMongoDbId(blogId);
	const blog = await blogModel.findById(blogId);
	const loginUserId = req?.user?._id;
	const isLiked = blog?.isLiked;
	const alreadyDisliked = blog?.dislikes?.find(
		(userId) => userId?.toString() === loginUserId?.toString()
	);
	if (alreadyDisliked) {
		const blog = await blogModel.findByIdAndUpdate(
			blogId,
			{
				$pull: { dislikes: loginUserId },
				isDisliked: false,
			},
			{ new: true }
		);
		res.json(blog);
	}
	if (isLiked) {
		const blog = await blogModel.findByIdAndUpdate(
			blogId,
			{
				$pull: { likes: loginUserId },
				isLiked: false,
			},
			{ new: true }
		);
		res.json(blog);
	} else {
		const blog = await blogModel.findByIdAndUpdate(
			blogId,
			{
				$push: { likes: loginUserId },
				isLiked: true,
			},
			{ new: true }
		);
		res.json(blog);
	}
});

const dislikeBlog = asyncHandler(async (req, res) => {
	const { blogId } = req.body;
	validateMongoDbId(blogId);
	const blog = await blogModel.findById(blogId);
	const loginUserId = req?.user?._id;
	const isDisLiked = blog?.isDisliked;
	const alreadyLiked = blog?.likes?.find(
		(userId) => userId?.toString() === loginUserId?.toString()
	);
	if (alreadyLiked) {
		const blog = await blogModel.findByIdAndUpdate(
			blogId,
			{
				$pull: { likes: loginUserId },
				isLiked: false,
			},
			{ new: true }
		);
		res.json(blog);
	}
	if (isDisLiked) {
		const blog = await blogModel.findByIdAndUpdate(
			blogId,
			{
				$pull: { dislikes: loginUserId },
				isDisliked: false,
			},
			{ new: true }
		);
		res.json(blog);
	} else {
		const blog = await blogModel.findByIdAndUpdate(
			blogId,
			{
				$push: { dislikes: loginUserId },
				isDisliked: true,
			},
			{ new: true }
		);
		res.json(blog);
	}
});

module.exports = {
	createBlog,
	updateBlog,
	getBlog,
	getAllBlogs,
	deleteBlog,
	likeBlog,
	dislikeBlog,
};
