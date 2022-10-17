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

const updateCampaignStatus = async (req, res) => {
    try {
        const updateStatus = await campaignService.updateCampusCampaign(req, res);
        // console.log(updateStatus);
        res.json("Update successfully");
    } catch (error) {
        return res.status(404).json({ error });

    }
}

const deleteCampaignV2 = async (req, res) => {
    try {
        const updateStatus = await campaignService.updateStatus(req, res);
        // console.log(updateStatus);
        if (updateStatus == 1) {
            return res.send("Delete successfully")
        }
        return res.send("Delete failed");

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