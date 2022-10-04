import { raw } from "body-parser";
import db from "../../models/index.js";

const Categories = db.Categories;


const getAllCategory = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let category = await Categories.findAll()
            resolve(category)
        } catch (error) {
            reject(error);
        }
    })
}

const createNewCategory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Categories.create({
                name: data.name,
                description: data.description
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

const updateCategory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMsg: "Missing required parameters"
                })
            }
            let category = await Categories.findOne({
                where: { id: data.id },
                raw: false
            })
            if (category) {
                category.name = data.name;
                category.description = data.description;
                await category.save();
                resolve({
                    errCode: 0,
                    message: "Update category successfully!!",
                })
            } else {
                resolve({
                    errCode: 1,
                    errMsg: "Category is not found",
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const deleteCategory = (categoryID) => {
    return new Promise(async (resolve, reject) => {
        let category = await Categories.findOne({
            where: { id: categoryID }
        })
        if (!category) {
            resolve({
                errCode: 2,
                errMsg: "Category not found",
            })
        }
        await Categories.destroy({
            where: { id: categoryID }
        })
        resolve({
            errCode: 0,
            errMsg: "Category is deleted",
        })
    })
}


module.exports = {
    getAllCategory,
    createNewCategory,
    updateCategory,
    deleteCategory,
}