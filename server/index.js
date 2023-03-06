const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const authRouter = require("./routes/authRoute");
const blogRouter = require("./routes/blogRoute");
const productRouter = require("./routes/productRoute");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

dbConnect();
app.get("/", (req, res) => res.send("Hello World!"));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}!`));
