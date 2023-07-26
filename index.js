const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./routes/router");
const cors = require("cors");

const app = express();

//MongoDB connection
mongoose
    .connect(process.env.MONGOCONNECTION + "")
    .then(() => console.log("Connected to MongoDB!"))
    .catch((err) => console.error("Error connecting to MongoDB!", err));

//Midleware Section
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "POST, PUT, PATCH, GET, DELETE, OPTIONS"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Api-Key, X-Requested-With, Content-Type, cookies, Accept, Authorization"
    );
    next();
});
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: [process.env.CORS_ORIGIN, `http://localhost:${process.env.PORT}`],
        credentials: true,
        allowedHeaders: [
            "Origin",
            "X-Api-Key",
            "X-Requested-With",
            "Content-Type",
            "cookies",
            "Accept",
            "Authorization",
        ],
        exposedHeaders: ["cookies"],
    })
);

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(router);

// app.use(require("./Routes/router"));

const startApp = async () => {
    app
        .listen(process.env.PORT, () => {
            console.log(`Server listening on port ${process.env.PORT}`);
        })
        .on("error", (err) => {
            console.log(`Error while starting application: ${err} ...`);
        });
};

startApp();
