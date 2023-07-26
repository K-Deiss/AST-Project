const jwt = require("jsonwebtoken");

const createAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

const createRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

const clearRefreshToken = async (user) => {
  user.refreshToken = "";
  await user.save();
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  clearRefreshToken,
};
