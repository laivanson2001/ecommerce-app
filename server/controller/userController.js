const userModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshToken");
const validateMongoDbId = require("../utils/validateMongodbId");
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailController");
const crypto = require("crypto");
const cartModel = require("../models/cartModel");
const productModel = require("../models/productModel");
const couponModel = require("../models/couponModel");
const orderModel = require("../models/orderModel");
const uniqid = require("uniqid");

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
		const resetURL = `Xin chào, Vui lòng click liên kết này để đặt lại Mật khẩu của bạn. Liên kết này có giá trị đến 10 phút kể từ bây giờ. <a href='http://localhost:3000/reset-password/${token}'>Click đây</>`;
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

const loginAdmin = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const findAdmin = await userModel.findOne({ email });
	if (findAdmin.role !== "admin") throw new Error("Not Authorised");
	if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
		const refreshToken = await generateRefreshToken(findAdmin?._id);
		const updateuser = await userModel.findByIdAndUpdate(
			findAdmin.id,
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
			_id: findAdmin?._id,
			firstname: findAdmin?.firstname,
			lastname: findAdmin?.lastname,
			email: findAdmin?.email,
			mobile: findAdmin?.mobile,
			token: generateToken(findAdmin?._id),
		});
	} else {
		throw new Error("Invalid Credentials");
	}
});

const getWishlist = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	try {
		const findUser = await userModel.findById(_id).populate("wishlist");
		res.json(findUser);
	} catch (error) {
		throw new Error(error);
	}
});

const saveAddress = asyncHandler(async (req, res, next) => {
	const { _id } = req.user;
	validateMongoDbId(_id);

	try {
		const updatedUser = await userModel.findByIdAndUpdate(
			_id,
			{
				address: req?.body?.address,
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

const userCart = asyncHandler(async (req, res) => {
	const { productId, color, quantity, price } = req.body;
	const { _id } = req.user;
	console.log(req);
	validateMongoDbId(_id);
	try {
		let newCart = await new cartModel({
			userId: _id,
			productId,
			quantity,
			color,
			price,
		}).save();
		res.json(newCart);
	} catch (error) {
		throw new Error(error);
	}
});

const getUserCart = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	validateMongoDbId(_id);
	try {
		const cart = await cartModel
			.find({ userId: _id })
			.populate("productId")
			.populate("color");
		res.json(cart);
	} catch (error) {
		throw new Error(error);
	}
});

const updateQuantityProductCart = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	const { cartItemId, newQuantity } = req.params;
	console.log(req.params);
	validateMongoDbId(_id);
	try {
		const cart = await cartModel.findOne({
			userId: _id,
			_id: cartItemId,
		});
		cart.quantity = newQuantity;
		await cart.save();
		res.json(cart);
	} catch (error) {
		throw new Error(error);
	}
});

const removeProductFromCart = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	const { cartItemId } = req.params;
	validateMongoDbId(_id);
	try {
		const cart = await cartModel.deleteOne({
			userId: _id,
			_id: cartItemId,
		});
		res.json(cart);
	} catch (error) {
		throw new Error(error);
	}
});

const createOrder = asyncHandler(async (req, res) => {
	const {
		shippingInfo,
		orderItems,
		totalPrice,
		totalPriceAfterDiscount,
		paymentInfo,
	} = req.body;
	const { _id } = req.user;
	validateMongoDbId(_id);
	try {
		const order = await orderModel.create({
			user: _id,
			shippingInfo,
			orderItems,
			totalPrice,
			totalPriceAfterDiscount,
			paymentInfo,
		});
		res.json({ order, success: true });
	} catch (error) {
		throw new Error(error);
	}
});

const getMyOrders = asyncHandler(async (req, res) => {
	const { _id } = req.user;

	try {
		const orders = await orderModel
			.find({ user: _id })
			.populate("user")
			.populate("orderItems.product")
			.populate("orderItems.color");
		res.json({ orders, success: true });
	} catch (error) {
		throw new Error(error);
	}
});

const getMonthWiseOrderIncome = asyncHandler(async (req, res) => {
	let month = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	let date = new Date();
	let endDate = "";
	date.setDate(1);
	for (let index = 0; index < 11; index++) {
		date.setMonth(date.getMonth() - 1);
		endDate = month[date.getMonth()] + " " + date.getFullYear();
	}
	console.log(endDate);
	const data = await orderModel.aggregate([
		{
			$match: {
				createdAt: {
					$lte: new Date(),
					$gte: new Date(endDate),
				},
			},
		},
		{
			$group: {
				_id: {
					month: "$month",
				},
				count: {
					$sum: 1,
				},
				amount: {
					$sum: "$totalPriceAfterDiscount",
				},
			},
		},
	]);
	res.json(data);
});

const getYearlyTotalOrders = asyncHandler(async (req, res) => {
	let month = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	let date = new Date();
	let endDate = "";
	date.setDate(1);
	for (let index = 0; index < 11; index++) {
		date.setMonth(date.getMonth() - 1);
		endDate = month[date.getMonth()] + " " + date.getFullYear();
	}
	console.log(endDate);
	const data = await orderModel.aggregate([
		{
			$match: {
				createdAt: {
					$lte: new Date(),
					$gte: new Date(endDate),
				},
			},
		},
		{
			$group: {
				_id: null,
				count: {
					$sum: 1,
				},
				amount: {
					$sum: "$totalPriceAfterDiscount",
				},
			},
		},
	]);
	res.json(data);
});

const getAllOrders = asyncHandler(async (req, res) => {
	try {
		const orders = await orderModel.find().populate("user");
		res.json(orders);
	} catch (error) {
		throw new Error(error);
	}
});

const getOrderById = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDbId(id);
	try {
		const order = await orderModel
			.findOne({ _id: id })
			.populate("user")
			.populate("orderItems.product")
			.populate("orderItems.color");
		res.json(order);
	} catch (error) {
		throw new Error(error);
	}
});

const updateOrderStatus = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDbId(id);
	console.log(req.body.status);
	try {
		const order = await orderModel.findByIdAndUpdate(
			id,
			{
				orderStatus: req.body.status,
			},
			{
				new: true,
			}
		);
		res.json(order);
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
	handleRefreshToken,
	logout,
	updatePassword,
	forgotPasswordToken,
	resetPassword,
	loginAdmin,
	getWishlist,
	saveAddress,
	userCart,
	updateQuantityProductCart,
	removeProductFromCart,
	getUserCart,
	createOrder,
	getMyOrders,
	getMonthWiseOrderIncome,
	getYearlyTotalOrders,
	getAllOrders,
	getOrderById,
	updateOrderStatus,
};
