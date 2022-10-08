const express = require("express");
const auth = require("../middleware/auth.middleware");
const candidateController = require("../controller/candidate.controller");
const router = express.Router();
router.route("/").post(candidateController.createCandidate);
router.get("/all", candidateController.getAllCandidate);
router.get("/memberID", candidateController.getCandidateByMember);
module.exports = router;
