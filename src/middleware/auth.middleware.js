const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { ApiError } = require("./apiError");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "INVALID TOKEN");
    }
    const currentUser = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, payload) => {
        if (!err) {
          return payload;
        }
        throw new ApiError(httpStatus.UNAUTHORIZED, "BAD REQUEST");
      }
    );
    req.currentUser = currentUser;

    next();
  } catch (error) {
    next(error);
  } finally {
  }
};
module.exports = auth;
