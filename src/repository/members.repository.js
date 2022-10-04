const db = require("../models");

const findOne = async (where) => {
  return (await db.Members.findOne({ where: where }))?.dataValues;
};
const createNewMember = async (user) => {
  const member = await db.Members.create({
    email: user.email,
    fullname: user.fullname,
    password: user.password,
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
};
