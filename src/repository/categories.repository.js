const db = require("../models");
import { Op, where } from "sequelize";
// import { where } from "sequelize";
import { sequelize } from "../models/index.js";
const Categories = db.Categories;

const findOne = async (id) => {
    return (
        await Categories.findOne({
            where: {
                id: id,
            }
        })
    )
}

const findAllCate = async (where) => {
    // console.log()
    return (
        await Categories.findAll({
            where: where
        })
    )

}

const update = async (newObj, where) => {
    await Categories.update(newObj, {
        where: where,
    });
};

const updateStatus = async (where) => {
    return (
        await Categories.update({ status: "Hidden" }, {
            where: where,
        }
        )
    )
};

const createCategory = async (data) => {
    return (
        await Categories.create({
            name: data.name,
            description: data.description,
        })
    )
}
module.exports = { update, updateStatus, findAllCate, findOne, createCategory };