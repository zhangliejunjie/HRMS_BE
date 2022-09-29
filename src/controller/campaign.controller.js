const campaignService = require('../service/campaignService')

const handleGetAllCampaign = async (req, res) => {
    // let id = req.body.id; //ALL, id

    // if (!id) {
    //     return res.status(200).json({
    //         errCode: 1,
    //         errMsg: "Missing required parameters",
    //         campaigns: []
    //     })
    // }
    let campaigns = await campaignService.getAllCampaign();

    return res.status(200).json({
        errCode: 0,
        errMsg: "OK",
        campaigns
    });
}

const handleCreateNewCampaign = async (req, res) => {
    let message = await campaignService.createNewCampaign(req.body);
    return res.status(200).json(message);
}

const handleDeleteCampaign = async (req, res) => {
    if (!req.body.id) {
        return res.status(400).json({
            errCode: 1,
            errMsg: "Missing campaign id"
        });
    }
    let message = await campaignService.deleteCampaign(req.body.id);
    return res.status(200).json(message);
}


const handleUpdateCampaign = async (req, res) => {
    let data = req.body;
    let message = await campaignService.updateCampaign(data);
    return res.status(200).json(message);
}
module.exports = {
    handleGetAllCampaign,
    handleCreateNewCampaign,
    handleDeleteCampaign,
    handleUpdateCampaign
}