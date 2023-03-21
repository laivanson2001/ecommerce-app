const express = require("express");
const {
	createColor,
	updateColor,
	deleteColor,
	getColor,
	getallColor,
} = require("../controller/colorController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const colorRouter = express.Router();

colorRouter.post("/", authMiddleware, isAdmin, createColor);
colorRouter.put("/:id", authMiddleware, isAdmin, updateColor);
colorRouter.delete("/:id", authMiddleware, isAdmin, deleteColor);
colorRouter.get("/:id", getColor);
colorRouter.get("/", getallColor);

module.exports = colorRouter;
