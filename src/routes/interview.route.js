const express = require("express");

const router = express.Router();
const { handleGetAllInterview } = require("../controller/interview.controller")


router.get("/", handleGetAllInterview)


module.exports = router