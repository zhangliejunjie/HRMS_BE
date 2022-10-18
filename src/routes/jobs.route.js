import express from "express";

import {
  handleGetAllJob,
  handleCreateNewJob,
  handleDeleteJob,
  handleUpdateJob,
} from "../controller/job.controller.js";

const router = express.Router();

router.get("/", handleGetAllJob);
router.post("/add", handleCreateNewJob);
router.patch("/delete/:id", handleDeleteJob);
router.patch("/update", handleUpdateJob);

module.exports = router;
