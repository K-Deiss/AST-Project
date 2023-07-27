const jwt = require("jsonwebtoken");
require("dotenv").config();

// Define the verifyJWT middleware
const verifyJWT = (req, res, next) => {
  try {
    // Extract the JWT token from the "Authorization" header
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(403).json({
        message: "You are not authorized",
        success: false,
      });
    }
    // Extract the token part from the "Bearer token" format
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        //invalid token
        return res.status(403).json({
          message: "Forbidden",
          success: false,
        });
      }
      req.user = decoded._id;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error ${error}`,
      success: false,
    });
  }
};

module.exports = verifyJWT;
