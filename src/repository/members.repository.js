const { QueryTypes, where } = require("sequelize");
const db = require("../models");
import { sequelize } from "../models/index.js";
require("dotenv").config();

const Members = db.Members;
const findOne = async (where) => {
  return (await Members.findOne({ where: where }))?.dataValues;
};
const createNewMember = async (user) => {
  const member = await Members.create({
    email: user.email,
    fullname: user.fullname,
    password: user.password,
    verified_code: user.verified_code,
  });
  return member?.dataValues;
};

const getMemberByEmail = async (email) => {
  return (
    await Members.findOne({
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
          type: QueryTypes.SELECT,
        }
      );
      console.log(results);
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
};
const updateStatus = async (where) => {
  return await Members.update(
    { status: "Active" },
    {
      where: where,
    }
  );
};

const getMemberById = async (memberID) => {
  return (
    await Members.findOne({
      where: {
        id: memberID,
      },
    })
  )?.dataValues;
};
const update = async (newObj, where) => {
  await Members.update(newObj, {
    where: where,
  });
};
const showAllMember = async () => {
  let memberList = [];
  memberList = await Members.findAll({ raw: true });
  console.log(memberList);
  return memberList;
};

const sendMail = async (email, subject, text) => {
  var nodemailer = require("nodemailer");

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });
  // process.env.MY_EMAIL
  // process.env.MY_PASSWORD
  var mailOptions = {
    from: process.env.MY_EMAIL,
    to: email,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const updatePass = async (pass, where) => {
  await Members.update(pass, {
    where: where,
  });
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
  sendMail,
  updatePass,
};
