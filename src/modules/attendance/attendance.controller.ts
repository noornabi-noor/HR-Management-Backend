import { Request, Response } from "express";
import { attendanceServices } from "./attendance.services";

// const upsertAttendance = async (req: Request, res: Response) => {
//   try {
//     const { employee_id, date, check_in_time } = req.body;

//     if (!employee_id || !date || !check_in_time) {
//       return res.status(400).json({
//         success: false,
//         message: "employee_id, date, and check_in_time are required",
//       });
//     }

//     const { attendance, existing } = await attendanceServices.upsertAttendance(
//       employee_id,
//       date,
//       check_in_time,
//     );

//     res.status(200).json({
//       success: true,
//       message: existing
//         ? "Attendance updated successfully"
//         : "Attendance created successfully",
//       data: attendance,
//     });
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

const upsertAttendance = async (req: Request, res: Response) => {
  try {
    const { employee_id, date, check_in_time } = req.body;

    if (!employee_id || !date || !check_in_time) {
      return res.status(400).json({
        success: false,
        message: "employee_id, date, and check_in_time are required",
      });
    }

    const { attendance, isUpdate } = await attendanceServices.upsertAttendance(
      employee_id,
      date,
      check_in_time,
    );

    res.status(200).json({
      success: true,
      message: isUpdate
        ? "Attendance updated successfully"
        : "Attendance created successfully",
      data: attendance,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllAttendance = async (req: Request, res: Response) => {
  try {
    const { employee_id, date, start_date, end_date } = req.query;

    const attendance = await attendanceServices.getAllAttendance({
      employee_id: employee_id as string | undefined,
      date: date as string | undefined,
      start_date: start_date as string | undefined,
      end_date: end_date as string | undefined,
    });

    res.status(200).json({
      success: true,
      message: "Attendance records retrieved successfully!",
      data: attendance,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAttendanceById = async (req: Request, res: Response) => {
  try {
    const attendance = await attendanceServices.getAttendanceById(
      req.params.id as string,
    );
    if (!attendance) {
      return res
        .status(404)
        .json({ success: false, message: "Attendance not found" });
    }
    res.status(200).json({
      success: true,
      message: "Attendance retrieved successfully",
      data: attendance,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateAttendance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!data.employee_id && !data.date && !data.check_in_time) {
      return res.status(400).json({
        success: false,
        message:
          "At least one field (employee_id, date, check_in_time) is required to update",
      });
    }

    const updated = await attendanceServices.updateAttendance(
      id as string,
      data,
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Attendance not found" });
    }

    res.status(200).json({
      success: true,
      message: "Attendance updated successfully",
      data: updated,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteAttendance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await attendanceServices.deleteAttendance(id as string);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Attendance not found" });
    }

    res.status(200).json({
      success: true,
      message: "Attendance deleted successfully",
      data: deleted,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const attendanceController = {
  upsertAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
};
