const mongoose = require("mongoose")
const carModel = require("../models/carModel")

class Controller {
    createCar = async (req, res) => {
        try {
            const carInformations = req.body
            let carToBeCreated = new carModel(carInformations)
            await carToBeCreated.save();
            console.log(carToBeCreated)
            return res.status(200).json({
                message: "Car Created Successfully",
                success: true,
                data: carToBeCreated
            })
        } catch (error) {
            return res.status(500).json({
                message: `Error ${error}`,
                success: false
            })
        }
    }
    getCarById = async (req, res) => {
        try {
            const { _id } = req.body
            console.log("here")
            let carToBeRetrieved = await carModel.findById({ _id })
            if (!carToBeRetrieved) {
                return res.status(404).json({
                    message: "Car Not Found",
                    success: false
                })
            }
            return res.status(200).json({
                message: "Car Retrieved Succesfully",
                success: true,
                data: carToBeRetrieved
            })
        } catch (error) {
            return res.status(500).json({
                message: `Error ${error}`,
                success: false
            })
        }
    }
    deleteCarById = async (req, res) => {
        try {
            const { _id } = req.body
            let carToBeDeleted = await carModel.findByIdAndDelete({ _id })
            if (!carToBeDeleted) {
                return res.status(404).json({
                    message: "Car Not Found",
                    success: false
                })
            }
            return res.status(200).json({
                message: "Car Deleted Successfully",
                success: true
            })
        } catch (error) {
            return res.status(500).json({
                message: `Error ${error}`,
                success: false
            })
        }
    }
}

const controller = new Controller();
module.exports = controller;