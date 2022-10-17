const { QueryTypes, where } = require("sequelize");
const db = require("../models");
import { sequelize } from "../models/index.js";

const findOne = async (where) => {
  return (await db.Members.findOne({ where: where }))?.dataValues;
};
const createNewMember = async (user) => {
  const member = await db.Members.create({
    email: user.email,
    fullname: user.fullname,
    password: user.password,
    verified_code: user.verified_code,
  });
  return member?.dataValues;
};

const getMemberByEmail = async (email) => {
  return (
    await db.Members.findOne({
      where: {
        email: email,
      },
    })
  )?.dataValues;
};
const getCodeByEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [results, metadata] = await sequelize.query(
        `select verified_code from members where email = '${email}'`,
        {
          type: QueryTypes.SELECT
        }
      );
      console.log(results);
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
}
const updateStatus = async (where) => {
  return (

    await db.Members.update({ status: "Active" }, {
      where: where,
    }
    )
  )
};

const getMemberById = async (memberID) => {
  return (
    await db.Members.findOne({
      where: {
        id: memberID,
      },
    })
  )?.dataValues;
};
const update = async (newObj, where) => {
  await db.Members.update(newObj, {
    where: where,
  });
};
const showAllMember = async () => {
  let memberList = [];
  memberList = await db.Members.findAll({ raw: true });
  return memberList;
};
module.exports = {
  findOne,
  createNewMember,
  getMemberByEmail,
  getMemberById,
  update,
  showAllMember,
  updateStatus,
  getCodeByEmail,
};
