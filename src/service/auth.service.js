
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError");
const membersRepository = require("../repository/members.repository");
var nodemailer = require("nodemailer");
const { response } = require("express");
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
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
      fullname: member.fullname,
      password: hashPass,
      avatar: null,
      verified_code: Math.floor(1000 + Math.random() * 9000),
    });

    console.log(newMember);
    if (!newMember) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Register fail");
    }
    //send email verify cho nguoi dung
    //Phai bat less secure app
    await membersRepository.sendMail(newMember.email, 'Code to verify account', 'your verify code is: ' + newMember.verified_code)
    return newMember;


  } catch (error) {
    throw error;
  }
};
const veriCode = async (req, res) => {
  try {
    const memberEmail = req.body.email
    console.log(memberEmail);
    let getCode = await membersRepository.getCodeByEmail(memberEmail);
    console.log(getCode.verified_code);
    if (!(getCode.verified_code == req.body.verified_code)) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid code");
    }
    const icode = await membersRepository.updateStatus({ email: memberEmail });

    return icode;
  } catch (error) {
    throw error;
  }
}

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
    const member = await membersRepository.getMemberByEmail(email);
    if (!member) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Sorry Bad Email");
    }
    if (!(await comparePassword(password, member.password))) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Tài khoản hoặc mật khẩu không chính xác"
      );
    }
    return member;
  } catch (error) {
    throw error;
  }
};


//-----reset password------------------------


const forgotPass = async (data, res) => {
  const email = data.email;
  try {
    if (!email) {
      throw new ApiError(httpStatus.NOT_FOUND, "Please enter your email")

    }
    const oldUser = await membersRepository.getMemberByEmail(
      email
    );

    if (!oldUser) {
      throw new ApiError(httpStatus.NOT_FOUND, "Người dùng không tồn tại");
    }
    // const secret = process.env.ACCESS_TOKEN_SECRET + oldUser.password;
    // const token = jwt.sign({ email: oldUser.email, id: oldUser.id }, secret, {
    //   expiresIn: "5m",
    // });
    const start = Date.now();
    console.log(start);
    const link = `127.0.0.1:5173/reset-password/${oldUser.id}/${start}`;

    await membersRepository.sendMail(oldUser.email, "Password reset", "Reset Link expired in 5 minutes: " + link);
    console.log("Link expired in 5 minutes: " + link);

    // res.json("pasword reset link send to your account");


  } catch (error) {
    console.log(error)
    throw error
  }

};

const resetPass = async (req, res) => {
  const { id, start } = req.params;
  console.log(req.params);
  const oldUser = await membersRepository.getMemberById(id);
  if (!oldUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "Người dùng không tồn tại");
  }
  try {
    const millis = Date.now() - start;
    if (Math.floor(millis / 1000) > 300) {
      return res.status(400).json({ message: "Link hết hạn" });

    } else {
      return res.json({ message: "xác thực" });

    }
  } catch (error) {
    console.log(error);
    throw new ApiError(httpStatus.UNAUTHORIZED, "Link hết hạn");
  }
}

const setNewPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  console.log(password)
  const oldUser = await membersRepository.getMemberById(id);
  if (!oldUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "Người dùng không tồn tại");
  }
  try {
    const newHashPassword = await hashPassword(password);
    console.log(newHashPassword)
    //==============================update password=======================

    const updatePassword = await membersRepository.update({ password: newHashPassword }, { id: oldUser.id })
    return res.json({ message: "Thay đổi password thành công" })

  } catch (error) {
    // console.log(error);
    throw error;
  }
}

module.exports = {
  createNewMember,
  genAuthToken,
  signInWithEmailPassword,
  veriCode,
  forgotPass,
  resetPass,
  setNewPassword
};
