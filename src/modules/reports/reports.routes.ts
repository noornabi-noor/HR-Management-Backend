import { Router } from "express";
import { reportsController } from "./reports.controller";

const router = Router();

router.get("/attendance", reportsController.getAttendanceReport);

export const reportsRoutes = router;
