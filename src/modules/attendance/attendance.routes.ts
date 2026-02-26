import { Router } from "express";
import { attendanceController } from "./attendance.controller";

const router = Router();

router.get("/", attendanceController.getAllAttendance);
router.get("/:id", attendanceController.getAttendanceById);
router.post("/", attendanceController.upsertAttendance);
router.patch("/:id", attendanceController.updateAttendance);
router.delete("/:id", attendanceController.deleteAttendance);

export const attendanceRoutes = router;
