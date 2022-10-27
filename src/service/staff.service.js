import httpStatus from "http-status";
import { getStaffById, update, updateStatus } from "../repository/staffs.repository";
const updateStaffProfile = async (req) => {
  try {
    await update(req.body, { id: req.currentUser.id });
    const staff = await getStaffById(req.currentUser.id);
    return staff;
  } catch (error) {
    throw error;
  }
};

const updateStaffStatusToHidden = async (req, res) => {
  try {
    const id = req.params.id;
    const staff = await getStaffById(id);
    if (!staff) {
      throw new ApiError(httpStatus.NOT_FOUND, "Staff not found");
    }
    await updateStatus({ id: id });

  } catch (error) {
    throw error;
  }
}
module.exports = {
  updateStaffProfile,
  updateStaffStatusToHidden
};
