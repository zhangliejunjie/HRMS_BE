const httpStatus = require("http-status");
import { ApiError } from "../middleware/apiError";
import { getStaffByEmail, showAllStaff } from "../repository/staffs.repository";
import { updateStaffProfile } from "../service/staff.service";
const staffController = {
  // #TODO: xiu nua authen roi chinh parameter o getStaffByEmail()
  async updateProfile(req, res, next) {
    try {
      const updatedStaff = await updateStaffProfile(req);
      res.json(updatedStaff);
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
      res.json(staff);
    } catch (error) {
      next(error);
    }
  },
  async getAllStaff(req, res) {
    try {
      const allStaff = await showAllStaff();
      res.send(allStaff);
      if (!allStaff) {
        throw new ApiError("Staff khong ton tai");
      }
    } catch (error) {}
  },
};

module.exports = staffController;
