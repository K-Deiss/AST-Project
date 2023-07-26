const carModel = require("../models/carModel");
const MaintenanceGarageModel = require("../models/MaintenanceGarageModel");
const { v4: uuid } = require("uuid");

class Controller {
  createCar = async (req, res) => {
    try {
      let carToBeCreated = await carModel.create({
        carId: uuid(),
        ...req.body,
      });
      return res.status(200).json({
        message: "Car Created Successfully",
        success: true,
        data: carToBeCreated,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error ${error}`,
        success: false,
      });
    }
  };
  getCarByCarId = async (req, res) => {
    try {
      const { carId } = req.params;
      let carToBeRetrieved = await carModel
        .findOne({ carId })
        .populate("owner")
        .populate("maintenanceGarages");
      if (!carToBeRetrieved) {
        return res.status(404).json({
          message: "Car Not Found",
          success: false,
        });
      }
      return res.status(200).json({
        message: "Car Retrieved Succesfully",
        success: true,
        data: carToBeRetrieved,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error ${error}`,
        success: false,
      });
    }
  };
  getCarsByMake = async (req, res) => {
    try {
      const searchText = req.query.make;
      //make the search text case-insensitive
      const searchRegex = new RegExp(searchText, "i");
      const carsToBeRetrieved = await carModel.find({ make: searchRegex });
      if (!carsToBeRetrieved) {
        return res.status(404).json({
          message: "No Cars Found",
          success: false,
        });
      }
      return res.status(200).json({
        message: "Cars Retrieved Successfully",
        success: true,
        data: carsToBeRetrieved,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error ${error}`,
        success: false,
      });
    }
  };
  updateCar = async (req, res) => {
    try {
      const { carId } = req.params;
      const updatedCarData = req.body;
      // Check if there's a new entry in the request to add to the MaintenanceGarage table
      if (req.body.newMaintenanceEntry) {
        const newEntryData = {
          name: req.body.newMaintenanceEntry.name,
          location: req.body.newMaintenanceEntry.location,
          email: req.body.newMaintenanceEntry.email,
          phoneNumber: req.body.newMaintenanceEntry.phoneNumber,
          carsMaintained: [carId],
          servicesOffered: req.body.newMaintenanceEntry.servicesOffered,
        };
        // Create a new entry in the MaintenanceGarage table
        const newMaintenanceEntry = await MaintenanceGarageModel.create({
          ...newEntryData,
          maintenanceGarageId: uuid(),
        });
        // Add the new MaintenanceGarage entry ID to the car's maintenanceGarage field
        updatedCarData.maintenanceGarages = newMaintenanceEntry._id;
      }
      // Find the car by its ID and update its data
      const updatedCar = await carModel.findByIdAndUpdate(
        carId,
        updatedCarData,
        {
          new: true,
        },
      );
      if (!updatedCar) {
        return res.status(404).json({
          message: "Car Not Found",
          success: false,
        });
      }
      return res.status(200).json({
        message: "Car Updated Successfully",
        success: true,
        data: updatedCar,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error ${error}`,
        success: false,
      });
    }
  };
  deleteCarById = async (req, res) => {
    try {
      const { carId } = req.params;
      let carToBeDeleted = await carModel.findOneAndDelete({ carId });
      if (!carToBeDeleted) {
        return res.status(404).json({
          message: "Car Not Found",
          success: false,
        });
      }
      return res.status(200).json({
        message: "Car Deleted Successfully",
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error ${error}`,
        success: false,
      });
    }
  };
}

const controller = new Controller();
module.exports = controller;
