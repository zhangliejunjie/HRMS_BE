import { QueryTypes } from "sequelize";
import db, { sequelize } from "../models/index";
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
  const query = "SELECT * FROM hrms.staffs";
  // staffList = await db.Staffs.findAll({ raw: true });
  const staffList = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
  console.log("bbbb");
  return staffList;
};

const updateStatus = async (where) => {
  return (

    await db.Staffs.update({ status: "Inactive" }, {
      where: where,
    }
    )
  )
}
const getAllInterviewers = async () => {
  const query = "SELECT * FROM hrms.staffs WHERE role = 'Interviewer' ";
  return await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
};
module.exports = {
  findOne,
  createNewStaff,
  getStaffByEmail,
  getStaffById,
  update,
  showAllStaff,
  updateStatus,
  getAllInterviewers,
};
