
const categoryService = require('../service/categoryService.js')



const handleGetAllCategory = async (req, res) => {
    let id = req.body.id; //ALL, id

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMsg: "Missing required parameters",
            categories: []
        })
    }
    let categories = await categoryService.getAllCategory(id);

    return res.status(200).json({
        errCode: 0,
        errMsg: "OK",
        categories
    });
}

const handleCreateNewCategory = async (req, res) => {
    let message = await categoryService.createNewCategory(req.body);
    return res.status(200).json(message);
}

const handleUpdateCategory = async (req, res) => {
    let data = req.body;
    let message = await categoryService.updateCategory(data);
    return res.status(200).json(message);
}

const handleDeleteCategory = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMsg: "Missing category id"
        });
    }
    let message = await categoryService.deleteCategory(req.body.id);
    return res.status(200).json(message);
}

module.exports = {
    handleGetAllCategory,
    handleCreateNewCategory,
    handleUpdateCategory,
    handleDeleteCategory,
}
