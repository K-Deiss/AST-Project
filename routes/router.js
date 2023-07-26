const express = require("express")
const router = require("express").Router()

router.use("/ast-project", require("./api"))

module.exports = router;