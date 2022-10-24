const campaignService = require("../service/campaignService");
const campaignRepository = require("../repository/campaign.repository");

const handleGetAllCampaign = async (req, res) => {
  let campaigns = await campaignService.getAllCampaign();
  return res.json({ campaigns });
};

const handleCreateNewCampaign = async (req, res, next) => {
  try {
    let message = await campaignService.createNewCampaign(req.body);
    return res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

const updateCampaign = async (req, res, next) => {
  try {
    await campaignService.updateCampaign(req, res);
  } catch (error) {
    next(error);
  }
};

const deleteCampaignV2 = async (req, res, next) => {
  try {
    await campaignService.updateStatus(req, res);
  } catch (error) {
    next(error);
  }
};

const handleGetCampaignById = async (req, res, next) => {
  try {
    const id = req.params.id;
    let campaign = await campaignRepository.getCampaignById(id);
    return res.json({ campaign });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  handleGetAllCampaign,
  handleCreateNewCampaign,
  updateCampaign,
  deleteCampaignV2,
  handleGetCampaignById,
};
