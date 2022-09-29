import express from "express";

import { handleGetAllJob } from "../controller/job.controller.js";


const router = express.Router();

router.get('/job', handleGetAllJob);


export default router;