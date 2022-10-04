import express from "express";

import {
  handleGetAllJob,
  handleCreateNewJob,
  handleDeleteJob,
} from "../controller/job.controller.js";

const router = express.Router();

router.get("/job", handleGetAllJob);
router.post("/job-add", handleCreateNewJob);
router.delete("/job-delete", handleDeleteJob);

module.exports = router;
