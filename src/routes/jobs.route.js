import express from "express";

import { handleGetAllJob, handleCreateNewJob } from "../controller/job.controller.js";


const router = express.Router();

router.get('/job', handleGetAllJob);
// router.post('/job-add', handleCreateNewJob);



export default router;