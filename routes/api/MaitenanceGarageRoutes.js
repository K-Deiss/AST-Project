const router = require("express").Router();
const controller = require("../../controllers/MaitenanceGarageController")

router.post("/create-garage", controller.createMaitenanceGarage)
router.get("/get-garage-by-id", controller.getMaitenanceGarageById)
router.delete("/delete-garage-by-id", controller.deleteMaintenanceGarageById)
module.exports = router;