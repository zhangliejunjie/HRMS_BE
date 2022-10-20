import express from "express";
import {
  handleGetAllCampaign,
  handleCreateNewCampaign,
  handleDeleteCampaign,
  handleUpdateCampaign,
  handleGetCampaignById,
} from "../controller/campaign.controller";

const router = express.Router();

router.get("/campaign", handleGetAllCampaign);
router.post("/campaign-add", handleCreateNewCampaign);
router.delete("/campaign-delete", handleDeleteCampaign);
router.patch("/campaign-update", handleUpdateCampaign);
router.get("/campaign-by-id", handleGetCampaignById);

module.exports = router;
