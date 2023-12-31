const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    carId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    make: {
      //Brand name
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    model: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    year: {
      type: Number,
      required: true,
      min: 1900, // Assuming cars were manufactured after 1900
      max: new Date().getFullYear(), // Current year
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    maintenanceGarages: [
      {
        type: mongoose.Types.ObjectId,
        ref: "MaintenanceGarage",
      },
    ],
    mileage: {
      type: Number,
      default: 0,
      min: 0,
    },
    isAutomatic: {
      type: Boolean,
      default: true,
    },
    fuelType: {
      type: String,
      enum: ["Gasoline", "Diesel", "Electric", "Hybrid", "Other"],
      default: "Gasoline",
    },
    registrationNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true, collection: "Car" },
);

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
