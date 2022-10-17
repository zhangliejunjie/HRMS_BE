import express from "express";
import {
  handleGetAllCampaign,
  handleCreateNewCampaign,
  handleDeleteCampaign,
  handleUpdateCampaign,
  updateCampaignStatus,
} from "../controller/campaign.controller";

const router = express.Router();

router.get("/campaign", handleGetAllCampaign);
router.post("/campaign-add", handleCreateNewCampaign);
router.delete("/campaign-delete/:id", handleDeleteCampaign);
// router.patch("/campaign-update", handleUpdateCampaign);
router.patch("/campaign/update", updateCampaignStatus)
module.exports = router;
