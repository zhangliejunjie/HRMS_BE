const db = require("../models");
const findOne = async (where) => {
  return (await db.Staffs.findOne({ where: where }))?.dataValues;
};
const createNewStaff = async (user) => {
  const staff = await db.Staffs.create({
    email: user.email,
    fullname: user.fullname,
    password: user.password,
  });
  return staff?.dataValues;
};
const getStaffByEmail = async (email) => {
  return (
    await db.Staffs.findOne({
      where: {
        email: email,
      },
    })
  )?.dataValues;
};

const getStaffById = async (staffID) => {
  return (
    await db.Staffs.findOne({
      where: {
        id: staffID,
      },
    })
  )?.dataValues;
};
const update = async (newObj, where) => {
  await db.Staffs.update(newObj, {
    where: where,
  });
};
const showAllStaff = async () => {
  let staffList = [];
  staffList = await db.Staffs.findAll({ raw: true });
  return staffList;
};
module.exports = {
  findOne,
  createNewStaff,
  getStaffByEmail,
  getStaffById,
  update,
  showAllStaff,
};