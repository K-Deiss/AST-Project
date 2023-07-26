const router = require("express").Router();

router.use("/auth", require("./authRoutes"))
router.use("/car", require("./carRoutes"))
router.use("/garage", require("./MaitenanceGarageRoutes"))
router.get("/main", (req, res) => {
    res.send("Connected to main route")
})

module.exports = router;