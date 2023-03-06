const asyncHandler = require("express-async-handler");
const categoryProductModel = require("../models/categoryProductModel");
const validateMongoDbId = require("../utils/validateMongodbId");

const createCategory = asyncHandler(async (req, res) => {
	try {
		const newCategory = await categoryProductModel.create(req.body);
		res.json(newCategory);
	} catch (error) {
		throw new Error(error);
	}
});

const updateCategory = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDbId(id);
	try {
		const updatedCategory = await categoryProductModel.findByIdAndUpdate(
			id,
			req.body,
			{
				new: true,
			}
		);
		res.json(updatedCategory);
	} catch (error) {
		throw new Error(error);
	}
});

const deleteCategory = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDbId(id);
	try {
		const deletedCategory = await categoryProductModel.findByIdAndDelete(
			id
		);
		res.json(deletedCategory);
	} catch (error) {
		throw new Error(error);
	}
});

const getCategory = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDbId(id);
	try {
		const getaCategory = await categoryProductModel.findById(id);
		res.json(getaCategory);
	} catch (error) {
		throw new Error(error);
	}
});

const getAllCategory = asyncHandler(async (req, res) => {
	try {
		const getallCategory = await categoryProductModel.find();
		res.json(getallCategory);
	} catch (error) {
		throw new Error(error);
	}
});

module.exports = {
	createCategory,
	updateCategory,
	deleteCategory,
	getCategory,
	getAllCategory,
};
