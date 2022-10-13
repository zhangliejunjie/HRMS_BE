const express = require("express");
const auth = require("../middleware/auth.middleware");
const candidateController = require("../controller/candidate.controller");
const router = express.Router();
router
  .route("/")
  .post(candidateController.createCandidate)
  .patch(candidateController.changeCandidateStatus);
router.get("/all", candidateController.getAllCandidate);
router.post("/memberID", candidateController.getCandidateByMember);
module.exports = router;
