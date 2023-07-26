const router = require("express").Router();

const controller = require("../../controllers/carController")

router.post("/create-car", controller.createCar)
router.get("/get-car", controller.getCarById)

router.delete("/delete-car", controller.deleteCarById)
module.exports = router;