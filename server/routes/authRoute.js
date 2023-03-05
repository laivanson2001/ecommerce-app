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
} = require("../controller/userController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const authRouter = express.Router();

authRouter.post("/register", createUser);
authRouter.post("/login", loginUser);
authRouter.get("/all-users", getAllUser);
authRouter.get("/:id", authMiddleware, isAdmin, getUserById);
authRouter.delete("/:id", deleteUser);
authRouter.put("/edit-user", authMiddleware, updatedUser);
authRouter.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
authRouter.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

module.exports = authRouter;
