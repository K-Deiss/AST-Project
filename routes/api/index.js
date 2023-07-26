const router = require("express").Router();
const verifyJWT = require("../../middleware/verifyJWT");

router.use("/auth", require("./authRoutes"));
router.use("/user", verifyJWT, require("./userRoutes"));
router.use("/car", verifyJWT, require("./carRoutes"));
router.use("/garage", verifyJWT, require("./MaitenanceGarageRoutes"));
router.get("/main", (req, res) => {
  res.send("Connected to main route");
});

module.exports = router;
