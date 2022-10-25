require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError");
const membersRepository = require("../repository/members.repository");

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
    await membersRepository.sendMail(newMember);
    return newMember;
  } catch (error) {
    throw error;
  }
};
const veriCode = async (req, res) => {
  try {
    const memberEmail = req.body.email;
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

module.exports = {
  createNewMember,
  genAuthToken,
  signInWithEmailPassword,
  veriCode,
};
