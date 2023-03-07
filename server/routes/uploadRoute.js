const express = require("express");
const {
	uploadImages,
	deleteImages,
} = require("../controller/uploadController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImage");

const uploadRouter = express.Router();

uploadRouter.post(
	"/",
	authMiddleware,
	isAdmin,
	uploadPhoto.array("images", 10),
	productImgResize,
	uploadImages
);

uploadRouter.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);

module.exports = uploadRouter;
