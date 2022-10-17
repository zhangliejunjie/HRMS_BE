const db = require("../models");
import { sequelize } from "../models/index.js";


const getCampaignById = async (id) => {
    return (
        await db.Campaigns.findOne({
            where: {
                id: id,
            },
        })
    )?.dataValues;
};

const update = async (newObj, where) => {
    await db.Campaigns.update(newObj, {
        where: where,
    });
};
const updateStatus = async (where) => {
    return (

        await db.Campaigns.update({ status: "Finished" }, {
            where: where,
        }
        )
    )
};

module.exports = {
    update,
    updateStatus,
    getCampaignById,
}