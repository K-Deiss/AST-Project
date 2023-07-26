const router = require("express").Router();

const controller = require("../../controllers/carController")

router.post("/create-car", controller.createCar)
router.get("/get-car-by-id", controller.getCarById)
router.delete("/delete-car-by-id", controller.deleteCarById)
module.exports = router;