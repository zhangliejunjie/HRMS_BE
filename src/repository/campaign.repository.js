const db = require("../models");
import { sequelize } from "../models/index.js";

const update = async (newObj, where) => {
    await db.Campaigns.update(newObj, {
        where: where,
    });
};


module.exports = {
    update,
}