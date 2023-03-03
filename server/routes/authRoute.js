const express = require("express");
const {
	createUser,
	loginUser,
	getAllUser,
	getUserById,
	deleteUser,
	updatedUser,
} = require("../controller/userController");
const authRouter = express.Router();

authRouter.post("/register", createUser);
authRouter.post("/login", loginUser);
authRouter.get("/all-users", getAllUser);
authRouter.get("/:id", getUserById);
authRouter.delete("/:id", deleteUser);
authRouter.put("/edit-user", updatedUser);

module.exports = authRouter;
