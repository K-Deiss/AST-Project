const userModel = require("../models/userModel");
const mongoose = require("mongoose");
class Controller {
  getUserById = async (req, res) => {
    try {
      const { userId } = req.params;
      const userToBeFetched = await userModel
        .findOne({ userId })
        .populate("cars");
      if (!userToBeFetched) {
        return res.status(404).json({
          message: "User Not Found",
          success: false,
        });
      }
      return res.status(200).json({
        message: "User Retrieved Successfully",
        success: true,
        data: userToBeFetched,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error ${error}`,
        success: false,
      });
    }
  };
  deleteUserById = async (req, res) => {
    try {
      const { userId } = req.params;
      const userToBeDeleted = await userModel.findOneAndDelete(userId);
      if (!userToBeDeleted) {
        return res.status(404).json({
          message: "User Not Found",
          success: false,
        });
      }
      return res.status(200).json({
        message: "User Deleted Succcessfully",
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error ${error}`,
        success: false,
      });
    }
  };
  updateUserById = async (req, res) => {
    try {
      const { userId } = req.params;
      const updatedData = req.body;
      const userToBeUpdated = await userModel.findOneAndUpdate(
        { userId },
        updatedData,
        {
          new: true,
        },
      );
      if (!userToBeUpdated) {
        return res.status(404).json({
          message: "User Not Found",
          success: false,
        });
      }
      return res.status(200).json({
        message: "User Updated Successfully",
        success: true,
        data: userToBeUpdated,
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
