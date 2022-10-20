const db = require("../models");
import { where } from "sequelize";
import { sequelize } from "../models/index.js";

const findAll = async (where) => {

    return (
        await db.Campaigns.findAll({
            where: where
        })
    )
}
const createNewCampaign = async (data, iStatus) => {
    return (
        await db.Campaigns.create({
            title: data.title,
            description: data.description,
            start_date: data.start_date,
            end_date: data.end_date,
            status: iStatus,
        })
    )

}
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

        await db.Campaigns.update({ status: "Hidden" }, {
            where: where,
        }
        )
    )
};

module.exports = {
    findAll,
    createNewCampaign,
    update,
    updateStatus,
    getCampaignById,
}