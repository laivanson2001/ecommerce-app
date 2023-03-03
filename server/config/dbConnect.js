const mongoose = require("mongoose");

const dbConnect = async () => {
	try {
		mongoose.set("strictQuery", false);
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("MongoDB Connected!");
	} catch (err) {
		console.error(err.message);
		process.exit();
	}
};
module.exports = dbConnect;
