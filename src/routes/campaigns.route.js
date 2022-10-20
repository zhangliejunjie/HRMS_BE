import express from "express";
import {
  handleGetAllCampaign,
  handleCreateNewCampaign,
  updateCampaign,
  deleteCampaignV2,
  handleGetCampaignById,
} from "../controller/campaign.controller";

const router = express.Router();

router.get("/", handleGetAllCampaign);
router.post("/add", handleCreateNewCampaign);
router.patch("/update", updateCampaign);
//delete nhung ma la update status == 'Finished'
router.patch("/delete/:id", deleteCampaignV2);
router.post("/by-id", handleGetCampaignById);

module.exports = router;
