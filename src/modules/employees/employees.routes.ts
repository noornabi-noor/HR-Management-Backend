import { Router } from "express";
import { employeesController } from "./employees.controller";
import { verifyToken } from "../../middleware/auth.middleware";

const router = Router();

router.use(verifyToken);

router.get("/", employeesController.getAllEmployees);
router.get("/:id", employeesController.getEmployeeById);
router.post("/", employeesController.createEmployee);
router.patch("/:id", employeesController.updateEmployee);
router.delete("/:id", employeesController.deleteEmployee);

export const employeesRoutes = router;