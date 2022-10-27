const httpStatus = require("http-status");
import { ApiError } from "../middleware/apiError";
import { getStaffByEmail, showAllStaff } from "../repository/staffs.repository";
import { updateStaffProfile, updateStaffStatusToHidden } from "../service/staff.service";
const staffController = {
  // #TODO: xiu nua authen roi chinh parameter o getStaffByEmail()
  async updateProfile(req, res, next) {
    try {
      const updatedStaff = await updateStaffProfile(req);
      return res.json(updatedStaff);
    } catch (error) {
      next(error);
    }
  },
  async profile(req, res, next) {
    try {
      const staff = await getStaffByEmail(req.currentUser.email);
      if (!staff) {
        throw new ApiError(httpStatus.NOT_FOUND, "Staff Not Found");
      }
      return res.json(staff);
    } catch (error) {
      next(error);
    }
  },
  async getAllStaff(req, res) {
    try {
      const allStaff = await showAllStaff();
      if (!allStaff) {
        throw new ApiError("Staff khong ton tai");
      }
      return res.send(allStaff);

    } catch (error) { }
  },
  async deleteStaff(req, res, next) {
    try {
      const updateStatusStaffToHidden = await updateStaffStatusToHidden(req);
      return res.json({ message: "Delete successfully" });
    } catch (error) {
      next(error);
    }
  }

};


module.exports = staffController;
