const router = require("express").Router();
const controller = require("../../controllers/carController");

//Async Handler
const catchAsync = require("express-async-handler");

//Joi Validation

const { validateCar } = require("../../validation/validateSchema");

//Routes
router.route("/create-car").post(validateCar, catchAsync(controller.createCar));
router.get("/get-car-by-carid/:carId", catchAsync(controller.getCarByCarId));
router.get("/get-cars-by-make", catchAsync(controller.getCarsByMake));
router.put("/update-car/:carId", catchAsync(controller.updateCar));
router.delete("/delete-car-by-id/:carId", catchAsync(controller.deleteCarById));
module.exports = router;
