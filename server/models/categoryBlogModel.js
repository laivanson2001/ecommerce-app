const mongoose = require("mongoose");

var categoryBlogSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
			index: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("CategoryBlog", categoryBlogSchema);
