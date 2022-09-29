import { raw } from "body-parser";
import db from "../../models/index.js";

const Categories = db.Categories;


const getAllCategory = (categoryID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let category = '';
            if (categoryID === 'ALL') {
                category = await Categories.findAll({

                })
            }
            if (categoryID && categoryID !== 'ALL') {
                category = await Categories.findOne({
                    where: { id: categoryID }
                })
            }
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
                id: data.id,
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
        // if (category) {
        //     await category.destroy();

        // }
        await Categories.destroy({
            where: { id: categoryID }
        })
        resolve({
            errCode: 0,
            errMsg: "Category is deleted",
        })
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


                // await Categories.save({
                //     id: data.id,
                //     name: data.name,
                //     description: data.description
                // })
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
module.exports = {
    getAllCategory,
    createNewCategory,
    deleteCategory,
    updateCategory,
}