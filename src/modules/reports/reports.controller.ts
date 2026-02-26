import { Request } from "express";
import { reportsServices } from "./reports.services";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";

const getAttendanceReport = catchAsync(async (req: Request, res) => {
  const { month, employee_id } = req.query;

  if (!month) {
    return sendResponse(res, {
      httpStatusCode: 400,
      success: false,
      message: "Query parameter 'month' is required (format: YYYY-MM)",
    });
  }

  const report = await reportsServices.getAttendanceReport(
    month as string,
    employee_id as string | undefined,
  );

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Monthly attendance report retrieved successfully",
    data: report,
  });
});

export const reportsController = {
  getAttendanceReport,
};
