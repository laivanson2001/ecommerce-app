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
} = require("../controller/userController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const authRouter = express.Router();

authRouter.get("/all-users", getAllUser);
authRouter.get("/refresh", handleRefreshToken);
authRouter.get("/logout", logout);
authRouter.get("/wishlist", authMiddleware, getWishlist);
authRouter.get("/:id", authMiddleware, isAdmin, getUserById);

authRouter.post("/register", createUser);
authRouter.post("/login", loginUser);
authRouter.post("/forgot-password-token", forgotPasswordToken);
authRouter.post("/admin-login", loginAdmin);

authRouter.put("/edit-user", authMiddleware, updatedUser);
authRouter.put("/password", authMiddleware, updatePassword);
authRouter.put("/save-address", authMiddleware, saveAddress);
authRouter.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
authRouter.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
authRouter.put("/reset-password/:token", resetPassword);

authRouter.delete("/:id", deleteUser);

module.exports = authRouter;
