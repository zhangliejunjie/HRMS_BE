import express from "express";
import {
  handleGetAllCampaign,
  handleCreateNewCampaign,
  handleDeleteCampaign,
  handleUpdateCampaign,
  updateCampaignStatus,
  deleteCampaignV2,
} from "../controller/campaign.controller";

const router = express.Router();

router.get("/campaign", handleGetAllCampaign);
router.post("/campaign-add", handleCreateNewCampaign);
// router.delete("/campaign-delete/:id", handleDeleteCampaign);
// router.patch("/campaign-update", handleUpdateCampaign);
router.patch("/campaign/update", updateCampaignStatus);
//delete nhung ma la update status == 'Finished'
router.patch("/campaign/delete/:id", deleteCampaignV2);

module.exports = router;
