const productModel = require("../models/productModel");
const userModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { default: slugify } = require("slugify");
const validateMongoDbId = require("../utils/validateMongodbId");

const createProduct = asyncHandler(async (req, res) => {
	try {
		if (req.body.title) {
			req.body.slug = slugify(req.body.title);
		}
		const newProduct = await productModel.create(req.body);
		res.json(newProduct);
	} catch (error) {
		throw new Error(error);
	}
});

const getProduct = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDbId(id);
	try {
		const findProduct = await productModel.findById(id).populate("color");
		res.json(findProduct);
	} catch (error) {
		throw new Error(error);
	}
});

const getAllProduct = asyncHandler(async (req, res) => {
	try {
		// Filtering
		const queryObj = { ...req.query };
		const excludeFields = ["page", "sort", "limit", "fields"];
		excludeFields.forEach((el) => delete queryObj[el]);
		let queryStr = JSON.stringify(queryObj);
		queryStr = queryStr.replace(
			/\b(gte|gt|lte|lt)\b/g,
			(match) => `$${match}`
		);

		let query = productModel.find(JSON.parse(queryStr));

		// Sorting
		if (req.query.sort) {
			const sortBy = req.query.sort.split(",").join(" ");
			query = query.sort(sortBy);
		} else {
			query = query.sort("-createdAt");
		}

		// limiting the fields
		if (req.query.fields) {
			const fields = req.query.fields.split(",").join(" ");
			query = query.select(fields);
		} else {
			query = query.select("-__v");
		}

		// pagination
		const page = req.query.page;
		const limit = req.query.limit;
		const skip = (page - 1) * limit;
		query = query.skip(skip).limit(limit);
		if (req.query.page) {
			const productCount = await productModel.countDocuments();
			if (skip >= productCount)
				throw new Error("This Page does not exists");
		}
		const product = await query;
		res.json(product);
	} catch (error) {
		throw new Error(error);
	}
});

const updateProduct = asyncHandler(async (req, res) => {
	const { id } = req.params;
	console.log(id);
	validateMongoDbId(id);
	try {
		if (req.body.title) {
			req.body.slug = slugify(req.body.title);
		}
		const updateProduct = await productModel.findOneAndUpdate(
			id,
			req.body,
			{
				new: true,
			}
		);
		res.json(updateProduct);
	} catch (error) {
		throw new Error(error);
	}
});

const deleteProduct = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDbId(id);
	try {
		const deleteProduct = await productModel.findOneAndDelete(id);
		res.json(deleteProduct);
	} catch (error) {
		throw new Error(error);
	}
});

const addToWishlist = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	const { prodId } = req.body;
	try {
		const user = await userModel.findById(_id);
		const alreadyAdded = user.wishlist.find(
			(id) => id.toString() === prodId
		);
		if (alreadyAdded) {
			let user = await userModel.findByIdAndUpdate(
				_id,
				{
					$pull: { wishlist: prodId },
				},
				{
					new: true,
				}
			);
			res.json(user);
		} else {
			let user = await userModel.findByIdAndUpdate(
				_id,
				{
					$push: { wishlist: prodId },
				},
				{
					new: true,
				}
			);
			res.json(user);
		}
	} catch (error) {
		throw new Error(error);
	}
});

const rating = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	const { star, prodId, comment } = req.body;
	try {
		const product = await productModel.findById(prodId);
		let alreadyRated = product.ratings.find(
			(userId) => userId.postedby.toString() === _id.toString()
		);
		if (alreadyRated) {
			const updateRating = await productModel.updateOne(
				{
					ratings: { $elemMatch: alreadyRated },
				},
				{
					$set: {
						"ratings.$.star": star,
						"ratings.$.comment": comment,
					},
				},
				{
					new: true,
				}
			);
		} else {
			const rateProduct = await productModel.findByIdAndUpdate(
				prodId,
				{
					$push: {
						ratings: {
							star: star,
							comment: comment,
							postedBy: _id,
						},
					},
				},
				{
					new: true,
				}
			);
		}
		const getAllRatings = await productModel.findById(prodId);
		let totalRating = getAllRatings.ratings.length;
		let ratingsum = getAllRatings.ratings
			.map((item) => item.star)
			.reduce((prev, curr) => prev + curr, 0);
		let actualRating = Math.round(ratingsum / totalRating);
		let finalProduct = await productModel.findByIdAndUpdate(
			prodId,
			{
				totalRating: actualRating,
			},
			{ new: true }
		);
		res.json(finalProduct);
	} catch (error) {
		throw new Error(error);
	}
});

module.exports = {
	createProduct,
	getProduct,
	getAllProduct,
	updateProduct,
	deleteProduct,
	addToWishlist,
	rating,
};
