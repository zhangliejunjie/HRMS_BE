const userServices = require("../service/members.service");
const authController = {
  async register(req, res, next) {
    try {
      const memberRes = await userServices.createNewMember(req, res);
      return memberRes;
    } catch (error) {
      next(error);
    }
  },
  async login(req, res, next) {},
  async isauth(req, res, next) {},
};

export default authController;
