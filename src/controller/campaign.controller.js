const campaignService = require('../service/campaignService')

const handleGetAllCampaign = async (req, res) => {
    let campaigns = await campaignService.getAllCampaign();
    return res.status(200).json({ campaigns });
}

const handleCreateNewCampaign = async (req, res) => {
    try {
        let message = await campaignService.createNewCampaign(req.body);
        return res.status(200).json(message);
    } catch (error) {
        return res.status(404).json({ error });
    }
}

const handleDeleteCampaign = async (req, res) => {
    if (!req.params.id) {
        return res.status(404).json({
            errCode: 1,
            errMsg: "Missing campaign id"
        });
    }
    let message = await campaignService.deleteCampaign(req.params.id);
    return res.status(200).json(message);


}


// const handleUpdateCampaign = async (req, res) => {


//     try {
//         let data = req.body;
//         let message = await campaignService.updateCampaign(data);
//         return res.status(200).json(message);
//     } catch (error) {
//         return res.status(404).json({ error });

//     }

// }

const updateCampaignStatus = async (req, res, next) => {
    try {
        const updateStatus = await campaignService.updateCampusCampaign(req, res);

    } catch (error) {
        next(error)

    }
}

const deleteCampaignV2 = async (req, res) => {
    try {

        await campaignService.updateStatus(req, res);


    } catch (error) {
        return res.status(404).json({ error });
    }
}
module.exports = {
    handleGetAllCampaign,
    handleCreateNewCampaign,
    handleDeleteCampaign,
    // handleUpdateCampaign,
    updateCampaignStatus,
    deleteCampaignV2,
}