const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");

const { ApiError } = require("../middleware/apiError");
const membersRepository = require("../repository/members.repository");

const hashPassword = async (password) => {
  const salt = await bycrypt.genSalt(10);
  const hashedPass = await bycrypt.hash(password, salt);
  return hashedPass;
};

const createNewMember = async (req, res) => {
  try {
    const member = req.body;
    const memberExisted = await membersRepository.getMemberByEmail(
      member.email
    );
    if (memberExisted) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
    }
    const hashPass = await hashPassword(member.password);
    const newMember = await membersRepository.createNewMember({
      email: member.email,
      password: hashPass,
      fullname: member.fullname,
      avatar: member.avatar,
      current_resume_url: member.current_resume_url,
    });
    if (!newMember) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Register fail");
    }
    return newMember;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createNewMember,
};
