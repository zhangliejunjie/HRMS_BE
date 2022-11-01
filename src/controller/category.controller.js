const categoryService = require("../service/categoryService.js");

const handleGetAllCategory = async (req, res) => {
  let categories = await categoryService.getAllCategory();
  return res.json({ categories });
};

const handleCreateNewCategory = async (req, res, next) => {
  try {
    let message = await categoryService.createNewCategory(req.body);
    return res.json(message);
  } catch (error) {
    next(error);
  }
};

const handleUpdateCategory = async (req, res, next) => {
  try {
    let data = req.body;
    let category = await categoryService.updateCategory(data);
    return res.json(category);
  } catch (error) {
    next(error);
  }
};

const handleDeleteCategory = async (req, res) => {
  if (!req.params.id) {
    return res.json({
      errCode: 1,
      errMsg: "Missing category id",
    });
  }
  let message = await categoryService.deleteCategory(req.params.id);
  return res.json(message);
};

module.exports = {
  handleGetAllCategory,
  handleCreateNewCategory,
  handleUpdateCategory,
  handleDeleteCategory,
};
