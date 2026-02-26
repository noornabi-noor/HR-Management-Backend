import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/login", authController.loginHR);
router.post("/register", authController.registerHR); 

export const authRoutes = router;