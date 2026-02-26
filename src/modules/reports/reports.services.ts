import { db } from "../../config/db";

const getAttendanceReport = async (month: string, employee_id?: string) => {
  const [year, mon] = month.split("-");
  if (!year || !mon) throw new Error("Invalid month format, expected YYYY-MM");

  const query = db("attendance")
    .join("employees", "attendance.employee_id", "employees.id")
    .select(
      "attendance.employee_id",
      "employees.name",
      db.raw("COUNT(DISTINCT attendance.date) as days_present"),
      db.raw(
        `COUNT(CASE WHEN attendance.check_in_time > '09:45:00' THEN 1 END) as times_late`,
      ),
    )
    .whereRaw("EXTRACT(YEAR FROM attendance.date) = ?", [year])
    .andWhereRaw("EXTRACT(MONTH FROM attendance.date) = ?", [mon])
    .groupBy("attendance.employee_id", "employees.name");

  if (employee_id) {
    query.andWhere("attendance.employee_id", employee_id);
  }

  const report = await query;

  return report;
};

export const reportsServices = {
  getAttendanceReport,
};
