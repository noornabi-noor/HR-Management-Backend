import { Router } from "express";
import { attendanceController } from "./attendance.controller";
import { verifyToken } from "../../middleware/auth.middleware";

const router = Router();

router.use(verifyToken);

router.get("/", attendanceController.getAllAttendance);
router.get("/:id", attendanceController.getAttendanceById);
router.post("/", attendanceController.upsertAttendance);
router.patch("/:id", attendanceController.updateAttendance);
router.delete("/:id", attendanceController.deleteAttendance);

export const attendanceRoutes = router;
