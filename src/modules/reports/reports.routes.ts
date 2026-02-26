import { Router } from "express";
import { reportsController } from "./reports.controller";
import { verifyToken } from "../../middleware/auth.middleware";

const router = Router();

router.use(verifyToken);

router.get("/attendance", reportsController.getAttendanceReport);

export const reportsRoutes = router;
