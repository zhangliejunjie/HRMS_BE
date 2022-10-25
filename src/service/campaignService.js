import httpStatus from "http-status";
const campaignRepository = require("../repository/campaign.repository");
const { ApiError } = require("../middleware/apiError");


// lấy tất cả campaign ngoại trừ Hidden campaign(DONE)
const getAllCampaign = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const where = { status: ['Not started', 'Processing', 'Finished'] }
      let campaign = await campaignRepository.findAll(where);
      resolve(campaign);
    } catch (error) {
      reject(error);
    }
  });
};

//===============================================================================

const createNewCampaign = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const iStatus = data.status;
      if (
        !(
          iStatus === "Not started" ||
          iStatus === "Processing" ||
          iStatus === "Finished"
        )
      ) {
        reject({
          errMsg: "wrong status",
        });
      }
      const campaign = await campaignRepository.createNewCampaign(data, iStatus);
      resolve(campaign);
    } catch (error) {
      reject(error);
    }
  });
};

//===============================================================================

const updateCampaign = async (req, res) => {
  try {
    const data = req.body
    if (!data.id) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Missing id");
    }
    const campaign = await campaignRepository.getCampaignById(data.id);

    if (campaign) {
      await campaignRepository.update(data, { id: data.id })
      return res.send("Updated campaign successfully");
    }
  } catch (error) {
    throw error;
  }
}

//===============================================================================

//update campaign status to Finished = delete it
//Delete campaign
const updateStatus = async (req, res) => {

  try {
    const id = req.params.id;

    let campaign = await campaignRepository.getCampaignById(id);
    if (!campaign) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Campaign not found...");
    }
    await campaignRepository.updateStatus({ id: id });
    return res.send("delete successfully");

  } catch (error) {
    throw error;
  }

}

const getCampaignById = (campaignId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let campaign = await Campaigns.findOne({
        where: { id: campaignId },
      });
      if (!campaign) {
        resolve({
          errCode: 2,
          errMsg: "Campaign not found",
        });
      }
      resolve(campaign);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllCampaign,
  createNewCampaign,
  updateCampaign,
  getCampaignById,
  updateStatus,
};
