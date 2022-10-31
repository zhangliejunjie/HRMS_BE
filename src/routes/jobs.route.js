import express from "express";

import {
  handleGetAllJob,
  handleCreateNewJob,
  handleDeleteJob,
  handleUpdateJob,
  handleGetJobsByCampaignId,
} from "../controller/job.controller.js";

const router = express.Router();

router.get("/", handleGetAllJob);
router.post("/add", handleCreateNewJob);
router.patch("/delete/:id", handleDeleteJob);
router.patch("/update", handleUpdateJob);
router.post("/by-campaign", handleGetJobsByCampaignId);

module.exports = router;
