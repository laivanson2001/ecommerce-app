const mongoose = require("mongoose");

var cartSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
		},
		color: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Color",
		},
		quantity: {
			type: Number,
			require: true,
		},
		price: {
			type: Number,
			require: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Cart", cartSchema);
