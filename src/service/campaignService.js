import db from "../../models/index.js";
const Campaigns = db.Campaigns;

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
            resolve(campaign)
        } catch (error) {
            reject(error);
        }
    })

}

const createNewCampaign = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const iStatus = data.status;
            if (!(iStatus === 'Not started' || iStatus === 'Processing' || iStatus === 'Finished')) {
                reject({
                    errMsg: 'wrong status'
                });
            }

            await Campaigns.create({
                title: data.title,
                description: data.description,
                start_date: data.start_date,
                end_date: data.end_date,
                status: iStatus
            })
            resolve({
                errCode: 0,
                message: "OK"
            })
        } catch (error) {
            reject(error);
        }
    })
}

const deleteCampaign = (campaignID) => {
    return new Promise(async (resolve, reject) => {
        let campaign = await Campaigns.findOne({
            where: { id: campaignID }
        })
        if (!campaign) {
            resolve({
                errCode: 2,
                errMsg: "Campaign not found",
            })
        }
        await Campaigns.destroy({
            where: { id: campaignID }
        })
        resolve({
            errCode: 0,
            errMsg: "Campaign is deleted",
        })
    })
}

const updateCampaign = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMsg: "Missing required parameters"
                })
            }
            let campaign = await Campaigns.findOne({
                where: { id: data.id },
                raw: false
            })
            const iStatus = data.status;
            if (!(iStatus === 'Not started' || iStatus === 'Processing' || iStatus === 'Finished')) {
                reject({
                    errMsg: 'wrong status'
                });
            }
            if (campaign) {
                campaign.title = data.title;
                campaign.description = data.description;
                campaign.start_date = data.start_date;
                campaign.end_date = data.end_date;
                campaign.status = iStatus;
                await campaign.save();
                resolve({
                    errCode: 0,
                    message: "Update campaign successfully!!",
                })
            } else {
                resolve({
                    errCode: 1,
                    errMsg: "Campaign is not found",
                })
            }
        } catch (error) {
            reject(error)
        }
    })

}

module.exports = {
    getAllCampaign,
    createNewCampaign,
    deleteCampaign,
    updateCampaign,
}