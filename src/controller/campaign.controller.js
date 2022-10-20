const campaignService = require("../service/campaignService");

const handleGetAllCampaign = async (req, res) => {
  let campaigns = await campaignService.getAllCampaign();
  return res.status(200).json({ campaigns });
};

const handleCreateNewCampaign = async (req, res) => {
  try {
    let message = await campaignService.createNewCampaign(req.body);
    return res.status(200).json(message);
  } catch (error) {
    return res.status(404).json({ error });
  }
};

const handleDeleteCampaign = async (req, res) => {
  if (!req.body.id) {
    return res.status(404).json({
      errCode: 1,
      errMsg: "Missing campaign id",
    });
  }
  let message = await campaignService.deleteCampaign(req.body.id);
  return res.status(200).json(message);
};

const handleUpdateCampaign = async (req, res) => {
  try {
    let data = req.body;
    let message = await campaignService.updateCampaign(data);
    return res.status(200).json(message);
  } catch (error) {
    return res.status(404).json({ error });
  }
};

const handleGetCampaignById = async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(404).json({
        errCode: 1,
        errMsg: "Missing Campaign Id",
      });
    }
    let message = await campaignService.getCampaignById(req.body.id);
    return res.status(200).json(message);
  } catch (error) {
    return res.status(404).json({ error });
  }
};

module.exports = {
  handleGetAllCampaign,
  handleCreateNewCampaign,
  handleDeleteCampaign,
  handleUpdateCampaign,
  handleGetCampaignById,
};
