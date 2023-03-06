const express = require("express");
const {
	createBrand,
	updateBrand,
	deleteBrand,
	getAllBrand,
	getBrand,
} = require("../controller/brandController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const brandRouter = express.Router();

brandRouter.get("/", getAllBrand);
brandRouter.get("/:id", getBrand);

brandRouter.post("/", authMiddleware, isAdmin, createBrand);

brandRouter.put("/:id", authMiddleware, isAdmin, updateBrand);

brandRouter.delete("/:id", authMiddleware, isAdmin, deleteBrand);

module.exports = brandRouter;
