import { getStaffById, update } from "../repository/staffs.repository";
const updateStaffProfile = async (req) => {
  try {
    await update(req.body, { id: req.currentUser.id });
    const staff = await getStaffById(req.currentUser.id);
    return staff;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  updateStaffProfile,
};
