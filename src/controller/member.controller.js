const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError");
const { getMemberByEmail } = require("../repository/members.repository");
const memberController = {
  async profile(req, res, next) {
    try {
      const member = await getMemberByEmail(req.currentUser.email);

      if (!member) {
        throw new ApiError(httpStatus.NOT_FOUND, "Member Not Found");
      }
      res.json(member);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = memberController;
