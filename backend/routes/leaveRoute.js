const express = require("express");
const {
  deleteLeaveRequestById,
  updateLeaveRequestById,
  getLeaveRequestById,
  getAllLeaveRequests,
  getLeaveRequestStaffId,
  createLeaveRequest,
  upload,
} = require("../controllers/leaveController");
const leaveRouter = express.Router();
leaveRouter.post("/",upload.single('cv'), createLeaveRequest);
leaveRouter.get("/", getAllLeaveRequests);
leaveRouter.get("/staff/:id", getLeaveRequestStaffId);
leaveRouter.get("/:id", getLeaveRequestById);
leaveRouter.get("/leave/:id", getLeaveRequestStaffId);

leaveRouter.put("/:id", updateLeaveRequestById);
leaveRouter.delete("/delete/:id", deleteLeaveRequestById);
module.exports = leaveRouter;
