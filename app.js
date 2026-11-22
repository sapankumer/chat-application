//external import
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

//internal imports
const { notFoundHandler, errorHandler } = require("./middlewares/common/errorHandler");
const loginRouter = require("./router/loginRouter");
const userRouter = require("./router/userRouter");
const inboxRouter = require("./router/inboxRouter");

const app = express();
dotenv.config();

//Database connection

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database connected"))
    .catch((error) => console.log(error))


// Request parser 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set ejs
app.set("view engine", "ejs");

// set static files
app.use(express.static(path.join(__dirname, "public")));

// parsed cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// routes setup
app.use("/", loginRouter);
app.use("/users", userRouter);
app.use("/inbox", inboxRouter);

// 404 error handler
app.use(notFoundHandler);
// common error handler
app.use(errorHandler);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});