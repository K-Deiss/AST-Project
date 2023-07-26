const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userModel = require("../models/userModel")
const { createAccessToken, createRefreshToken, clearRefreshToken } = require('../utils/authUtils');

class Controller {
    hashPassword = async (password) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            return hashedPassword;
        } catch (error) {
            return res.status(500).json({
                message: `Error ${error}`,
                success: false,
            });
        }
    };

    signup = async (req, res) => {
        try {
            const { email, phoneNumber } = req.body;
            // Check if the email or phone number already exists
            const existingUser = await userModel.findOne({ $or: [{ email }, { phoneNumber }] });
            if (existingUser) {
                return res.status(409).json({
                    message: "User with the same email or phone number already exists.",
                    success: false,
                });
            }
            // Hash the password using bcrypt
            const hashedPassword = await bcrypt.hash(password, 12);

            // Create a new user
            const newUser = await userModel.create({
                ...req.body
            });
            return res.status(200).json({
                message: "User Sign up Successfully",
                success: true,
                data: newUser,
            });
        } catch (error) {
            return res.status(500).json({
                message: `ERROR ${error}`,
                success: false,
            });
        }
    };


    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(404).json({
                    message: "Account not Found",
                    success: false,
                });
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({
                    message: "Incorrect Password",
                    success: false,
                });
            }
            const accessToken = createAccessToken(user._id);
            const refreshToken = createRefreshToken(user._id);
            user.refreshToken = refreshToken;
            await user.save();
            res.cookie("jwt", refreshToken, {
                httpOnly: true,
                sameSite: "None",
                // secure: true, // Activate it in production mode
                maxAge: 3888000000,
            });
            return res.status(200).json({
                message: "User Logged In",
                success: true,
                data: user,
                accessToken,
            });
        } catch (error) {
            return res.status(500).json({
                message: `Error ${error}`,
                success: false,
            });
        }
    };
    logout = async (req, res) => {
        try {
            const refreshToken = req.cookies.jwt;
            if (!refreshToken) {
                return res.status(400).json({
                    message: "JWT Token Not Found",
                    success: false,
                });
            }
            const foundUser = await userModel.findOne({ refreshToken });
            if (foundUser) {
                await clearRefreshToken(foundUser);
                res.clearCookie("jwt", {
                    httpOnly: true,
                    sameSite: "None",
                    // secure: true, // Activate it in production mode
                });
            }
            return res.status(200).json({
                message: "User Logout Successfully",
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