import { Request } from "express";
import { attendanceServices } from "./attendance.services";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";

const upsertAttendance = catchAsync(async (req: Request, res) => {
  const { employee_id, date, check_in_time } = req.body;

  if (!employee_id || !date || !check_in_time) {
    return sendResponse(res, {
      httpStatusCode: 400,
      success: false,
      message: "employee_id, date, and check_in_time are required",
    });
  }

  const { attendance, isUpdate } = await attendanceServices.upsertAttendance(
    employee_id,
    date,
    check_in_time,
  );

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: isUpdate
      ? "Attendance updated successfully"
      : "Attendance created successfully",
    data: attendance,
  });
});

const getAllAttendance = catchAsync(async (req: Request, res) => {
  const { employee_id, date, start_date, end_date } = req.query;

  const attendance = await attendanceServices.getAllAttendance({
    employee_id: employee_id as string | undefined,
    date: date as string | undefined,
    start_date: start_date as string | undefined,
    end_date: end_date as string | undefined,
  });

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Attendance records retrieved successfully!",
    data: attendance,
  });
});

const getAttendanceById = catchAsync(async (req: Request, res) => {
  const attendance = await attendanceServices.getAttendanceById(
    req.params.id as string,
  );

  if (!attendance) {
    return sendResponse(res, {
      httpStatusCode: 404,
      success: false,
      message: "Attendance not found",
    });
  }

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Attendance retrieved successfully",
    data: attendance,
  });
});

const updateAttendance = catchAsync(async (req: Request, res) => {
  const { id } = req.params;
  const data = req.body;

  if (!data.employee_id && !data.date && !data.check_in_time) {
    return sendResponse(res, {
      httpStatusCode: 400,
      success: false,
      message:
        "At least one field (employee_id, date, check_in_time) is required to update",
    });
  }

  const updated = await attendanceServices.updateAttendance(id as string, data);

  if (!updated) {
    return sendResponse(res, {
      httpStatusCode: 404,
      success: false,
      message: "Attendance not found",
    });
  }

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Attendance updated successfully",
    data: updated,
  });
});

const deleteAttendance = catchAsync(async (req: Request, res) => {
  const { id } = req.params;

  const deleted = await attendanceServices.deleteAttendance(id as string);

  if (!deleted) {
    return sendResponse(res, {
      httpStatusCode: 404,
      success: false,
      message: "Attendance not found",
    });
  }

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Attendance deleted successfully",
    data: deleted,
  });
});

export const attendanceController = {
  upsertAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
};
