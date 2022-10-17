const db = require("../models");
import { sequelize } from "../models/index.js";

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
}