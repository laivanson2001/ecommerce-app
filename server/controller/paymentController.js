const dotenv = require("dotenv").config();
const Razorpay = require("razorpay");
const instance = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const checkout = async (req, res) => {
	const { amount } = req.body;
	console.log(amount);
	const option = {
		amount: amount,
		currency: "INR",
	};
	console.log(option);
	const order = await instance.orders.create(option);
	res.json({
		status: "success",
		order,
	});
};

const paymentVerification = async (req, res) => {
	const { razorpayOrderId, razorpayPaymentId } = req.body;
	console.log(req.body);
	res.json({
		razorpayOrderId,
		razorpayPaymentId,
	});
};

module.exports = {
	checkout,
	paymentVerification,
};
