const express = require("express");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const authRouter = require("./routes/authRoute");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

dbConnect();
app.get("/", (req, res) => res.send("Hello World!"));
app.use(express.json());
app.use("/api/user", authRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}!`));
