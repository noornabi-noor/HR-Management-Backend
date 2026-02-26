import { Router } from "express";
import { employeesController } from "./employees.controller";

const router = Router();

router.get("/", employeesController.getAllEmployees);
router.get("/:id", employeesController.getEmployeeById);
router.post("/", employeesController.createEmployee);
router.patch("/:id", employeesController.updateEmployee);
router.delete("/:id", employeesController.deleteEmployee);

export const employeesRoutes = router;