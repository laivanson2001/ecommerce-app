const express = require("express");
const dbConnect = require("./config/dbConnect");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

dbConnect();

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Server is running on port ${port}!`));
