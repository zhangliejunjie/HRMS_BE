require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");

const { ApiError } = require("../middleware/apiError");
import {
  getStaffByEmail,
  createNewStaff,
} from "../repository/staffs.repository";

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  return hashedPass;
};

const createStaff = async (req, res) => {
  try {
    const staff = req.body;
    const staffExisted = await getStaffByEmail(staff.email);
    if (staffExisted) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
    }
    const hashPass = await hashPassword(staff.password);
    const newStaff = await createNewStaff({
      email: staff.email,
      fullname: staff.fullname,
      password: hashPass,
      avatar: null,
    });
    console.log(newStaff);
    if (!newStaff) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Register fail");
    }
    return newStaff;
  } catch (error) {
    throw error;
  }
};
const genAuthToken = async (user) => {
  const userObj = {
    sub: user.id,
    email: user.email,
    id: user.id,
  };
  const token = jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  return token;
};
const comparePassword = async (candidatePassword, hashPassword) => {
  // candidate password = hash password

  const match = await bcrypt.compare(candidatePassword, hashPassword);
  return match;
};
const signInWithEmailPassword = async (email, password) => {
  try {
    // check email
    const staff = await getStaffByEmail(email);
    if (!staff) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Sorry Bad Email");
    }
    if (!(await comparePassword(password, staff.password))) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Tài khoản hoặc mật khẩu không chính xác"
      );
    }
    return staff;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createStaff,
  genAuthToken,
  signInWithEmailPassword,
};
