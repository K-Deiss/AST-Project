const { carSchema, userSchema, maintenanceGarageSchema } = require("./schema");
const ExpressError = require("./ExpressError");

validateCar = (req, res, next) => {
  const { error } = carSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((e1) => e1.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((e1) => e1.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

validateMaintenanceGarageSchema = (req, res, next) => {
  const { error } = maintenanceGarageSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((e1) => e1.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports = {
  validateCar,
  validateUser,
  validateMaintenanceGarageSchema,
};
