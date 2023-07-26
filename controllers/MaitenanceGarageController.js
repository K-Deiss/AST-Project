const maintenanceGaragesModel = require("../models/MaintenanceGarageModel")

class Controller {
    createMaitenanceGarage = async (req, res) => {
        try {
            let newGarage = await maintenanceGaragesModel.create({ ...req.body })
            return res.status(200).json({
                message: "Garage Created Successfully",
                success: true,
                data: newGarage
            })
        } catch (error) {
            return res.status(500).json({
                message: `Error ${error}`,
                success: false
            })
        }
    }
    getMaitenanceGarageById = async (req, res) => {
        try {
            const { _id } = req.body
            const garageToBeFetched = await maintenanceGaragesModel.findById({ _id }).populate("carsMaintained")
            if (!garageToBeFetched) {
                return res.status(404).json({
                    message: "Garage Not Found",
                    success: false
                })
            }
            return res.status(200).json({
                message: "Garage Retrieved Successfully",
                success: true,
                data: garageToBeFetched
            })
        } catch (error) {
            return res.status(500).json({
                message: `Error ${error}`,
                success: false
            })
        }
    }
    deleteMaintenanceGarageById = async (req, res) => {
        try {
            const { _id } = req.body
            const garageToBeDeletd = await maintenanceGaragesModel.findByIdAndDelete({ _id })
            if (!garageToBeDeletd) {
                return res.status(404).json({
                    message: "Garage Deleted Successfully",
                    success: false
                })
            }
            return res.status(200).json({
                message: "Garage Deleted Successfully",
                success: true
            })
        } catch (error) {
            return res.status(500).json({
                message: `Error ${error}`,
                status: false
            })
        }
    }
}

const controller = new Controller();
module.exports = controller;