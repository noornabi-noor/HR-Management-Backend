import { Request } from "express";
import { authServices } from "./auth.services";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";

const loginHR = catchAsync(async (req: Request, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendResponse(res, {
      httpStatusCode: 400,
      success: false,
      message: "Email and password are required",
    });
  }

  const result = await authServices.loginHR(email, password);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Login successful",
    data: result,
  });
});

export const authController = {
  loginHR,
};
