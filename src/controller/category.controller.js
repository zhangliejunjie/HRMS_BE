
const categoryService = require('../service/categoryService.js')



const handleGetAllCategory = async (req, res) => {
    let categories = await categoryService.getAllCategory();
    return res.status(200).json({ categories });
}

const handleCreateNewCategory = async (req, res) => {
    try {
        let message = await categoryService.createNewCategory(req.body);
        return res.status(200).json(message);
    } catch (error) {
        return res.status(404).json({ error });
    }
}

const handleUpdateCategory = async (req, res) => {
    try {
        let data = req.body;
        let message = await categoryService.updateCategory(data);
        return res.status(200).json(message);
    } catch (error) {
        res.status(404).json({ error });
    }
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
