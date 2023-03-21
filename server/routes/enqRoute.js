const express = require("express");
const {
	createEnquiry,
	updateEnquiry,
	deleteEnquiry,
	getEnquiry,
	getallEnquiry,
} = require("../controller/enqController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const enqRouter = express.Router();

enqRouter.post("/", createEnquiry);
enqRouter.put("/:id", authMiddleware, isAdmin, updateEnquiry);
enqRouter.delete("/:id", authMiddleware, isAdmin, deleteEnquiry);
enqRouter.get("/:id", getEnquiry);
enqRouter.get("/", getallEnquiry);

module.exports = enqRouter;
