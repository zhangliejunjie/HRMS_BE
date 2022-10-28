const express = require("express");
const auth = require("../middleware/auth.middleware");
const staffController = require("../controller/staff.controller");
const router = express.Router();

router.get("/profile", auth, staffController.profile);
router.patch("/profile", auth, staffController.updateProfile);
router.get("/all", staffController.getAllStaff);
router.patch("/delete/:id", staffController.deleteStaff);

router.get("/all-interviewers", staffController.handleGetAllInterviewers);

//   .get(auth, memberController.profile)
//   .patch(auth, memberController.updateProfile);
// router.get("/all", memberController.getAllMember);
module.exports = router;
