const { Router } = require("express");
const express = require("express");
const {
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
	getOrders,
	getAllOrders,
	getOrderByUserId,
	createOrder,
	updateOrderStatus,
} = require("../controller/userController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const authRouter = express.Router();

authRouter.get("/all-users", getAllUser);
authRouter.get("/refresh", handleRefreshToken);
authRouter.get("/logout", logout);
authRouter.get("/wishlist", authMiddleware, getWishlist);
authRouter.get("/cart", authMiddleware, getUserCart);
authRouter.get("/get-orders", authMiddleware, getOrders);
authRouter.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
authRouter.post(
	"/getorderbyuser/:id",
	authMiddleware,
	isAdmin,
	getOrderByUserId
);
authRouter.get("/:id", authMiddleware, isAdmin, getUserById);

authRouter.post("/register", createUser);
authRouter.post("/login", loginUser);
authRouter.post("/forgot-password-token", forgotPasswordToken);
authRouter.post("/admin-login", loginAdmin);
authRouter.post("/cart", authMiddleware, userCart);
authRouter.post("/cart/applycoupon", authMiddleware, applyCoupon);
authRouter.post("/cart/cash-order", authMiddleware, createOrder);

authRouter.put("/edit-user", authMiddleware, updatedUser);
authRouter.put("/password", authMiddleware, updatePassword);
authRouter.put("/save-address", authMiddleware, saveAddress);
authRouter.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
authRouter.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
authRouter.put("/reset-password/:token", resetPassword);
authRouter.put(
	"/order/update-order/:id",
	authMiddleware,
	isAdmin,
	updateOrderStatus
);

authRouter.delete("/empty-cart", authMiddleware, emptyCart);
authRouter.delete("/:id", deleteUser);

module.exports = authRouter;
