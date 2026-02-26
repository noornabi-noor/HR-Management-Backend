import { Router } from "express";
import { employeesController } from "./employees.controller";

const router = Router();

router.get("/", employeesController.getAllEmployees);
router.post("/", employeesController.createEmployee);

export const employeesRoutes = router;