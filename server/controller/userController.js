const userModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshToken");
const validateMongoDbId = require("../utils/validateMongodbId");

const createUser = asyncHandler(async (req, res) => {
	const email = req.body.email;
	const findUser = await userModel.findOne({ email: email });
	if (!findUser) {
		const newUser = await userModel.create(req.body);
		res.json(newUser);
	} else {
		throw new Error("User Already Exists");
	}
});

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const findUser = await userModel.findOne({ email });
	if (findUser && (await findUser.isPasswordMatched(password))) {
		const refreshToken = await generateRefreshToken(findUser?._id);
		const updateUser = await userModel.findByIdAndUpdate(
			findUser._id,
			{
				refreshToken: refreshToken,
			},
			{ new: true }
		);
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			maxAge: 72 * 60 * 60 * 1000,
		});
		res.json({
			_id: findUser?._id,
			name: findUser?.name,
			email: findUser?.email,
			mobile: findUser?.mobile,
			token: generateToken(findUser?._id),
		});
	} else {
		throw new Error("Invalid Credentials");
	}
});

const getAllUser = asyncHandler(async (req, res) => {
	try {
		const getUsers = await userModel.find();
		res.json(getUsers);
	} catch (error) {
		throw new Error(error);
	}
});

const getUserById = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDbId(id);
	try {
		const getUserById = await userModel.findById(id);
		res.json({
			getUserById,
		});
	} catch (error) {
		throw new Error(error);
	}
});

const deleteUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDbId(id);
	try {
		const deleteUser = await userModel.findByIdAndDelete(id);
		res.json({
			deleteUser,
		});
	} catch (error) {
		throw new Error(error);
	}
});

const updatedUser = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	validateMongoDbId(_id);
	try {
		const updatedUser = await userModel.findByIdAndUpdate(
			_id,
			{
				name: req?.body?.name,
				email: req?.body?.email,
				mobile: req?.body?.mobile,
			},
			{
				new: true,
			}
		);
		res.json(updatedUser);
	} catch (error) {
		throw new Error(error);
	}
});

const blockUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDbId(id);
	try {
		const blockusr = await userModel.findByIdAndUpdate(
			id,
			{
				isBlocked: true,
			},
			{
				new: true,
			}
		);
		res.json(blockusr);
	} catch (error) {
		throw new Error(error);
	}
});

const unblockUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDbId(id);
	try {
		const unblock = await userModel.findByIdAndUpdate(
			id,
			{
				isBlocked: false,
			},
			{
				new: true,
			}
		);
		res.json({
			message: "User UnBlocked",
		});
	} catch (error) {
		throw new Error(error);
	}
});

module.exports = {
	createUser,
	loginUser,
	getAllUser,
	getUserById,
	deleteUser,
	updatedUser,
	blockUser,
	unblockUser,
};
