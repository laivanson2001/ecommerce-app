const mongoose = require("mongoose");

var orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		shippingInfo: {
			name: {
				type: String,
				required: true,
			},
			mobile: {
				type: String,
				required: true,
			},
			address: {
				type: String,
				required: true,
			},
			note: {
				type: String,
			},
		},
		paymentInfo: {
			razorpayOrderId: {
				type: String,
				required: true,
			},
			razorpayPaymentId: {
				type: String,
				required: true,
			},
		},
		orderItems: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				color: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Color",
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
				},
				price: {
					type: Number,
					required: true,
				},
			},
		],
		payAt: {
			type: Date,
			default: Date.now(),
		},
		totalPrice: {
			type: Number,
			required: true,
		},
		totalPriceAfterDiscount: {
			type: Number,
			required: true,
		},
		orderStatus: {
			type: String,
			default: "Ordered",
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Order", orderSchema);
