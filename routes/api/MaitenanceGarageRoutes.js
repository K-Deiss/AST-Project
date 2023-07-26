const router = require("express").Router();
const controller = require("../../controllers/MaitenanceGarageController");

//Async Handler
const catchAsync = require("express-async-handler");

//Joi validation

const {
  validateMaintenanceGarageSchema,
} = require("../../validation/validateSchema");

//Routes
router
  .route("/create-garage")
  .post(
    validateMaintenanceGarageSchema,
    catchAsync(controller.createMaitenanceGarage),
  );
router.get(
  "/get-garage-by-garageId/:maintenanceGarageId",
  catchAsync(controller.getMaitenanceGarageByGarageId),
);
router.put(
  "/update-garage-by-id/:maintenanceGarageId",
  catchAsync(controller.updateMaitenanceGarageById),
);
router.delete(
  "/delete-garage-by-id/:maintenanceGarageId",
  controller.deleteMaintenanceGarageById,
);
module.exports = router;
