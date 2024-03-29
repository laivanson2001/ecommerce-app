const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const authRouter = require("./routes/authRoute");
const blogRouter = require("./routes/blogRoute");
const brandRouter = require("./routes/brandRoute");
const categoryBlogRouter = require("./routes/categoryBlogRoute");
const categoryProductRouter = require("./routes/categoryProductRoute");
const couponRouter = require("./routes/couponRoute");
const productRouter = require("./routes/productRoute");
const uploadRouter = require("./routes/uploadRoute");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const cors = require("cors");
const colorRouter = require("./routes/colorRoute");
const enqRouter = require("./routes/enqRoute");

dbConnect();
app.get("/", (req, res) => res.send("Hello World!"));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category-product", categoryProductRouter);
app.use("/api/category-blog", categoryBlogRouter);
app.use("/api/brand", brandRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/color", colorRouter);
app.use("/api/enquiry", enqRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}!`));
