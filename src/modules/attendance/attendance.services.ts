import { db } from "../../config/db";

const upsertAttendance = async (
  employee_id: string,
  date: string,
  check_in_time: string,
) => {
  const existing = await db("attendance").where({ employee_id, date }).first();

  if (existing) {
    await db("attendance")
      .where({ id: existing.id })
      .update({ check_in_time, updated_at: db.fn.now() });

    const updated = await db("attendance").where({ id: existing.id }).first();

    return { attendance: updated, isUpdate: true };
  } else {
    const [newAttendance] = await db("attendance")
      .insert({ employee_id, date, check_in_time })
      .returning("*");

    return { attendance: newAttendance, isUpdate: false };
  }
};

const getAllAttendance = async (filters?: {
  employee_id?: string;
  date?: string;
  start_date?: string;
  end_date?: string;
}) => {
  const query = db("attendance").select("*");

  if (filters?.employee_id) {
    query.where("employee_id", filters.employee_id);
  }

  if (filters?.date) {
    query.where("date", filters.date);
  }

  if (filters?.start_date && filters?.end_date) {
    query.whereBetween("date", [filters.start_date, filters.end_date]);
  }

  return await query;
};

const getAttendanceById = async (id: string) => {
  const employee = await db("attendance").where({ id }).first();

  return employee;
};

const updateAttendance = async (
  id: string,
  data: { employee_id?: string; date?: string; check_in_time?: string },
) => {
  const existing = await db("attendance").where({ id }).first();
  if (!existing) return null;

  await db("attendance")
    .where({ id })
    .update({ ...data, updated_at: db.fn.now() });

  return await db("attendance").where({ id }).first();
};

const deleteAttendance = async (id: string) => {
  const existing = await db("attendance").where({ id }).first();
  if (!existing) return null;

  await db("attendance").where({ id }).delete();
  return existing;
};

export const attendanceServices = {
  upsertAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
};
