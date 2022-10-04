import { getStaffById, update } from "../repository/staffs.repository";
const updateStaffProfile = async (req) => {
  try {
    await update(req.body, { id: req.body.id });
    const staff = await getStaffById(req.body.id);
    return staff;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  updateStaffProfile,
};
