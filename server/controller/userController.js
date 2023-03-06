const userModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshToken");
const validateMongoDbId = require("../utils/validateMongodbId");
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailController");
const crypto = require("crypto");

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

const handleRefreshToken = asyncHandler(async (req, res) => {
	const cookie = req.cookies;
	if (!cookie?.refreshToken) {
		throw new Error("No Refresh Token in Cookies");
	}
	const refreshToken = cookie.refreshToken;
	const user = await userModel.findOne({ refreshToken });
	if (!user) {
		throw new Error(" No Refresh token present in db or not matched");
	}
	jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
		if (err || user.id !== decoded.id) {
			throw new Error("There is something wrong with refresh token");
		}
		const accessToken = generateToken(user?._id);
		res.json({ accessToken });
	});
});

const logout = asyncHandler(async (req, res) => {
	const cookie = req.cookies;
	if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
	const refreshToken = cookie.refreshToken;
	const user = await userModel.findOne({ refreshToken });
	if (!user) {
		res.clearCookie("refreshToken", {
			httpOnly: true,
			secure: true,
		});
		return res.sendStatus(204); // forbidden
	}
	await userModel.findOneAndUpdate(refreshToken, {
		refreshToken: "",
	});
	res.clearCookie("refreshToken", {
		httpOnly: true,
		secure: true,
	});
	res.sendStatus(204); // forbidden
});

const updatePassword = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	const { password } = req.body;
	validateMongoDbId(_id);
	const user = await userModel.findById(_id);
	if (password) {
		user.password = password;
		const updatedPassword = await user.save();
		res.json(updatedPassword);
	} else {
		res.json(user);
	}
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
	const { email } = req.body;
	const user = await userModel.findOne({ email });
	if (!user) throw new Error("User not found with this email");
	try {
		const token = await user.createPasswordResetToken();
		await user.save();
		const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:8000/api/user/reset-password/${token}'>Click Here</>`;
		const data = {
			to: email,
			text: "Hey User",
			subject: "Forgot Password Link",
			html: resetURL,
		};
		sendEmail(data);
		res.json(token);
	} catch (error) {
		throw new Error(error);
	}
});

const resetPassword = asyncHandler(async (req, res) => {
	const { password } = req.body;
	const { token } = req.params;
	const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
	const user = await userModel.findOne({
		passwordResetToken: hashedToken,
		passwordResetExpires: { $gt: Date.now() },
	});
	if (!user) throw new Error(" Token Expired, Please try again later");
	user.password = password;
	user.passwordResetToken = undefined;
	user.passwordResetExpires = undefined;
	await user.save();
	res.json(user);
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
	handleRefreshToken,
	logout,
	updatePassword,
	forgotPasswordToken,
	resetPassword,
};
