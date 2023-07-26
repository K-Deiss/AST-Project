const router = require("express").Router();
const controller = require("../../controllers/userController");

//Async handler
const catchAsync = require("express-async-handler");

//Joi validation

router.get("/get-user-by-userid/:userId", catchAsync(controller.getUserById));
router.put("/update-user-by-id/:userId", catchAsync(controller.updateUserById));
router.delete(
  "/delete-user-by-id/:userId",
  catchAsync(controller.deleteUserById),
);

module.exports = router;
