import db from "../models/index.js";
const Campaigns = db.Campaigns;
const { update } = require('../repository/campaign.repository')


const getAllCampaign = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let campaign = await Campaigns.findAll();

      // if (campaignID === 'ALL') {
      //     campaign = await Campaigns.findAll({

      //     })
      // }
      // if (campaignID && campaignID !== 'ALL') {
      //     campaign = await Campaigns.findOne({
      //         where: { id: campaignID }
      //     })
      // }
      resolve(campaign);
    } catch (error) {
      reject(error);
    }
  });
};

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

      const campaign = await Campaigns.create({
        title: data.title,
        description: data.description,
        start_date: data.start_date,
        end_date: data.end_date,
        status: iStatus,
      });
      resolve(campaign.dataValues);
    } catch (error) {
      reject(error);
    }
  });
};

const deleteCampaign = (campaignID) => {
  return new Promise(async (resolve, reject) => {
    let campaign = await Campaigns.findOne({
      where: { id: campaignID },
    });
    if (!campaign) {
      resolve({
        errCode: 2,
        errMsg: "Campaign not found",
      });
    }
    await Campaigns.destroy({
      where: { id: campaignID },
    });
    resolve({
      errCode: 0,
      errMsg: "Campaign is deleted",
    });
  });
};

// const updateCampaign = (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (!data.id) {
//         resolve({
//           errCode: 2,
//           errMsg: "Missing required parameters",
//         });
//       }
//       let campaign = await Campaigns.findOne({
//         where: { id: data.id },
//         raw: false,
//       });
//       const iStatus = data.status;
//       if (
//         !(
//           iStatus === "Not started" ||
//           iStatus === "Processing" ||
//           iStatus === "Finished"
//         )
//       ) {
//         reject({
//           errMsg: "wrong status",
//         });
//       }
//       if (campaign) {
//         campaign.title = data.title;
//         campaign.description = data.description;
//         campaign.start_date = data.start_date;
//         campaign.end_date = data.end_date;
//         campaign.status = iStatus;
//         await campaign.save();
//         resolve({
//           errCode: 0,
//           message: "Update campaign successfully!!",
//         });
//       } else {
//         resolve({
//           errCode: 1,
//           errMsg: "Campaign is not found",
//         });
//       }
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

const updateCampusCampaign = async (req, res) => {
  try {
    if (!req.body.id) {
      return res.send("Missing required parameters")
    }
    let campaign = await Campaigns.findOne({
      where: { id: req.body.id },
      raw: false,
    });
    // console.log(campaign)


    if (campaign) {
      const updateCampaign = await update(req.body, { id: req.body.id })
      return updateCampaign;
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllCampaign,
  createNewCampaign,
  deleteCampaign,
  // updateCampaign,
  updateCampusCampaign
};
