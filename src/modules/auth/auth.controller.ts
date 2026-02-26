import { Request, Response } from "express";
import { authServices } from "./auth.services";

const loginHR = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const result = await authServices.loginHR(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export const authController = {
  loginHR,
};
