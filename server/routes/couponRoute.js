const express = require("express");
const {
	getAllCoupons,
	getCoupon,
	createCoupon,
	updateCoupon,
	deleteCoupon,
} = require("../controller/couponController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const couponRouter = express.Router();

couponRouter.get("/", authMiddleware, isAdmin, getAllCoupons);
couponRouter.get("/:id", authMiddleware, isAdmin, getCoupon);

couponRouter.post("/", authMiddleware, isAdmin, createCoupon);

couponRouter.put("/:id", authMiddleware, isAdmin, updateCoupon);

couponRouter.delete("/:id", authMiddleware, isAdmin, deleteCoupon);

module.exports = couponRouter;
