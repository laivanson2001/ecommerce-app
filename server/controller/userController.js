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
const { log } = require("console");

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
	const { cart } = req.body;
	const { _id } = req.user;
	validateMongoDbId(_id);
	try {
		let products = [];
		const user = await userModel.findById(_id);
		const alreadyExistCart = await cartModel.findOne({ orderBy: user._id });
		if (alreadyExistCart) {
			alreadyExistCart.remove();
		}
		for (let i = 0; i < cart.length; i++) {
			let object = {};
			object.product = cart[i]._id;
			object.count = cart[i].count;
			object.color = cart[i].color;
			let getPrice = await productModel
				.findById(cart[i]._id)
				.select("price")
				.exec();
			object.price = getPrice.price;
			products.push(object);
		}
		let cartTotal = 0;
		for (let i = 0; i < products.length; i++) {
			cartTotal = cartTotal + products[i].price * products[i].count;
		}
		let newCart = await new cartModel({
			products,
			cartTotal,
			orderBy: user?._id,
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
			.findOne({ orderBy: _id })
			.populate("products.product");
		res.json(cart);
	} catch (error) {
		throw new Error(error);
	}
});

const emptyCart = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	validateMongoDbId(_id);
	try {
		const user = await userModel.findOne({ _id });
		const cart = await cartModel.findOneAndRemove({ orderBy: user._id });
		res.json(cart);
	} catch (error) {
		throw new Error(error);
	}
});

const applyCoupon = asyncHandler(async (req, res) => {
	const { coupon } = req.body;
	const { _id } = req.user;
	validateMongoDbId(_id);
	const validCoupon = await couponModel.findOne({ name: coupon });
	if (validCoupon === null) {
		throw new Error("Invalid Coupon");
	}
	const user = await userModel.findOne({ _id });
	let { cartTotal } = await cartModel
		.findOne({
			orderBy: user._id,
		})
		.populate("products.product");
	let totalAfterDiscount = (
		cartTotal -
		(cartTotal * validCoupon.discount) / 100
	).toFixed(0);
	await cartModel.findOneAndUpdate(
		{ orderBy: user._id },
		{ totalAfterDiscount },
		{ new: true }
	);
	res.json(totalAfterDiscount);
});

const createOrder = asyncHandler(async (req, res) => {
	const { COD, couponApplied } = req.body;
	const { _id } = req.user;
	validateMongoDbId(_id);
	try {
		if (!COD) throw new Error("Create cash order failed");
		const user = await userModel.findById(_id);
		let userCart = await cartModel.findOne({ orderBy: user._id });
		let finalAmout = 0;
		if (couponApplied && userCart.totalAfterDiscount) {
			finalAmout = userCart.totalAfterDiscount;
		} else {
			finalAmout = userCart.cartTotal;
		}

		let newOrder = await new orderModel({
			products: userCart.products,
			paymentIntent: {
				id: uniqid(),
				method: "COD",
				amount: finalAmout,
				status: "Cash on Delivery",
				created: Date.now(),
				currency: "vnd",
			},
			orderBy: user._id,
			orderStatus: "Cash on Delivery",
		}).save();
		let update = userCart.products.map((item) => {
			return {
				updateOne: {
					filter: { _id: item.product._id },
					update: {
						$inc: { quantity: -item.count, sold: +item.count },
					},
				},
			};
		});
		const updated = await productModel.bulkWrite(update, {});
		res.json({ message: "success" });
	} catch (error) {
		throw new Error(error);
	}
});

const getOrders = asyncHandler(async (req, res) => {
	const { _id } = req.user;
	validateMongoDbId(_id);
	try {
		const userorders = await orderModel
			.findOne({ orderBy: _id })
			.populate("products.product")
			.populate("orderBy")
			.exec();
		res.json(userorders);
	} catch (error) {
		throw new Error(error);
	}
});

const getAllOrders = asyncHandler(async (req, res) => {
	try {
		const alluserorders = await orderModel
			.find()
			.populate("products.product")
			.populate("orderBy")
			.exec();
		res.json(alluserorders);
	} catch (error) {
		throw new Error(error);
	}
});

const getOrderByUserId = asyncHandler(async (req, res) => {
	const { id } = req.params;
	validateMongoDbId(id);
	try {
		const userorders = await orderModel
			.findOne({ orderBy: id })
			.populate("products.product")
			.populate("orderBy")
			.exec();
		res.json(userorders);
	} catch (error) {
		throw new Error(error);
	}
});

const updateOrderStatus = asyncHandler(async (req, res) => {
	const { status } = req.body;
	const { id } = req.params;
	validateMongoDbId(id);
	try {
		const updateOrderStatus = await orderModel.findByIdAndUpdate(
			id,
			{
				orderStatus: status,
				paymentIntent: {
					status: status,
				},
			},
			{ new: true }
		);
		res.json(updateOrderStatus);
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
	getUserCart,
	emptyCart,
	applyCoupon,
	createOrder,
	getOrders,
	getAllOrders,
	getOrderByUserId,
	updateOrderStatus,
};
