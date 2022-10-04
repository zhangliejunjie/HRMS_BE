const { update, getMemberById } = require("../repository/members.repository");
require("dotenv").config();

const updateMemberProfile = async (req) => {
  try {
    await update(req.body, { id: req.currentUser.id });
    const member = await getMemberById(req.currentUser.id);
    return member;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  updateMemberProfile,
};
