const maintenanceGaragesModel = require("../models/MaintenanceGarageModel");
const { v4: uuid } = require("uuid");

class Controller {
  createMaitenanceGarage = async (req, res) => {
    try {
      let newGarage = await maintenanceGaragesModel.create({
        maintenanceGarageId: uuid(),
        ...req.body,
      });
      return res.status(200).json({
        message: "Garage Created Successfully",
        success: true,
        data: newGarage,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error ${error}`,
        success: false,
      });
    }
  };
  getMaitenanceGarageByGarageId = async (req, res) => {
    try {
      const { maintenanceGarageId } = req.params;
      console.log(maintenanceGarageId);
      const garageToBeFetched = await maintenanceGaragesModel
        .findOne({
          maintenanceGarageId,
        })
        .populate("carsMaintained");
      if (!garageToBeFetched) {
        return res.status(404).json({
          message: "Garage Not Found",
          success: false,
        });
      }
      return res.status(200).json({
        message: "Garage Retrieved Successfully",
        success: true,
        data: garageToBeFetched,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error ${error}`,
        success: false,
      });
    }
  };
  updateMaitenanceGarageById = async (req, res) => {
    try {
      const { maintenanceGarageId } = req.params;
      const updatedData = req.body;
      const garageToBeUpdated = await maintenanceGaragesModel.findOneAndUpdate(
        { maintenanceGarageId },
        updatedData,
        {
          new: true,
        },
      );
      if (!garageToBeUpdated) {
        return res.status(404).json({
          message: "Garage Not Found",
          success: false,
        });
      }
      return res.status(200).json({
        message: "Garage Updated Successfully",
        success: true,
        data: garageToBeUpdated,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error ${error}`,
        success: false,
      });
    }
  };
  deleteMaintenanceGarageById = async (req, res) => {
    try {
      const { maintenanceGarageId } = req.params;
      const garageToBeDeletd = await maintenanceGaragesModel.findOneAndDelete(
        maintenanceGarageId,
      );
      if (!garageToBeDeletd) {
        return res.status(404).json({
          message: "Garage Not Found",
          success: false,
        });
      }
      return res.status(200).json({
        message: "Garage Deleted Successfully",
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error ${error}`,
        status: false,
      });
    }
  };
}

const controller = new Controller();
module.exports = controller;
