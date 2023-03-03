const express = require("express");
const { createUser, loginUser } = require("../controller/userController");
const authRouter = express.Router();

authRouter.post("/register", createUser);
authRouter.post("/login", loginUser);

module.exports = authRouter;
