import { Request, Response } from "express";
import { reportsServices } from "./reports.services";

const getAttendanceReport = async (req: Request, res: Response) => {
  try {
    const { month, employee_id } = req.query;

    if (!month) {
      return res.status(400).json({
        success: false,
        message: "Query parameter 'month' is required (format: YYYY-MM)",
      });
    }

    const report = await reportsServices.getAttendanceReport(
      month as string,
      employee_id as string | undefined,
    );

    res.status(200).json({
      success: true,
      message: "Monthly attendance report retrieved successfully",
      data: report,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const reportsController = {
  getAttendanceReport,
};
