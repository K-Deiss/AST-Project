const router = require("express").Router();
const controller = require("../../controllers/authController");

//Async Handler
const catchAsync = require("express-async-handler");

//Joi Validation

const { validateUser } = require("../../validation/validateSchema");

//Routes
router.route("/signup").post(validateUser, catchAsync(controller.signup));
router.post("/login", catchAsync(controller.login));
router.post("/logout", catchAsync(controller.logout));
router.post("/refresh-token", catchAsync(controller.handleRefeshToken));

module.exports = router;
