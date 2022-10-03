const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError");
const {
  getMemberByEmail,
  showAllMember,
} = require("../repository/members.repository");
const { updateMemberProfile } = require("../service/member.service");
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
  async updateProfile(req, res, next) {
    try {
      const updatedMember = await updateMemberProfile(req);
      res.json(updatedMember);
    } catch (error) {
      next(error);
    }
  },
  async getAllMember(req, res) {
    try {
      const allMember = await showAllMember();
      res.send(allMember);
      if (!allMember) {
        throw new ApiError("Member khong ton tai");
      }
    } catch (error) {}
  },
};

module.exports = memberController;
