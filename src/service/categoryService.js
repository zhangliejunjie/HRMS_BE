const categoriesRepository = require("../repository/categories.repository");


// lấy tất cả category ngoại trừ Hidden category(DONE)
const getAllCategory = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const where = { status: ['Active', 'Inactive'] }
      const category = await categoriesRepository.findAllCate(where);
      console.log(category)
      resolve(category);
    } catch (error) {
      reject(error);
    }
  });
};

//===============================================================================

const createNewCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const category = await categoriesRepository.createCategory(data);
      resolve(category?.dataValues);
    } catch (error) {
      reject(error);
    }
  });
};

//===============================================================================

const updateCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMsg: "Missing required parameters",
        });
      }
      let category = await categoriesRepository.findOne(data.id);
      if (category) {
        await categoriesRepository.update(data, { id: data.id })
        resolve({
          errCode: 0,
          message: "Update category successfully!!",
        });
      } else {
        resolve({
          errCode: 1,
          errMsg: "Category is not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

//===============================================================================

const deleteCategory = (categoryID) => {
  return new Promise(async (resolve, reject) => {
    let category = await categoriesRepository.findOne(categoryID);
    if (!category) {
      resolve({
        errCode: 2,
        errMsg: "Category not found",
      });
    }
    await categoriesRepository.updateStatus({ id: categoryID });
    resolve({
      errCode: 0,
      errMsg: "Category is deleted",
    });
  });
};

module.exports = {
  getAllCategory,
  createNewCategory,
  updateCategory,
  deleteCategory,
};
