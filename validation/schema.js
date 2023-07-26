const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");
const mongoose = require("mongoose");
//Protect from xss injection
const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});
const Joi = BaseJoi.extend(extension);
const stringValidation = Joi.string().required().escapeHTML();
const stringValidationNotRequired = Joi.string().escapeHTML();
const numberValidation = Joi.number().required();
const numberValidationNotRequired = Joi.number();
const booleanValidation = Joi.boolean();
const objectIdValidation = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};

const fuelTypeOptions = ["Gasoline", "Diesel", "Electric", "Hybrid", "Other"];
const servicesOfferedOptions = [
  "Oil Change",
  "Tire Rotation",
  "Brake Inspection",
  "Engine Tune-Up",
  "Other",
];
carSchema = Joi.object({
  carId: stringValidationNotRequired,
  make: stringValidation,
  model: stringValidation,
  year: numberValidation,
  owner: stringValidationNotRequired,
  maintenanceGarages: Joi.array().items(objectIdValidation),
  mileage: numberValidationNotRequired,
  isAutomatic: booleanValidation,
  fuelType: Joi.string()
    .valid(...fuelTypeOptions)
    .default("Gasoline"),
  registrationNumber: stringValidationNotRequired,
});
userSchema = Joi.object({
  _id: Joi.string(),
  __v: Joi.number(),
  userId: stringValidationNotRequired,
  first_name: stringValidation,
  last_name: stringValidation,
  email: stringValidation,
  password: stringValidation,
  age: numberValidation,
  phoneNumber: numberValidation,
  refreshToken: stringValidationNotRequired,
  location: stringValidation,
  cars: Joi.array().items(objectIdValidation),
});
maintenanceGarageSchema = Joi.object({
  maintenanceGarageId: stringValidationNotRequired,
  name: stringValidation,
  location: stringValidation,
  email: stringValidation,
  phoneNumber: numberValidation,
  carsMaintained: Joi.array().items(objectIdValidation),
  servicesOffered: Joi.array()
    .items(Joi.string().valid(...servicesOfferedOptions))
    .default(["Other"]),
});

module.exports = {
  carSchema,
  userSchema,
  maintenanceGarageSchema,
};
