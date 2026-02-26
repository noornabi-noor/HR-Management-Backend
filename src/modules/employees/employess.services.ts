import { db } from "../../config/db";

const createEmployee = async (payload: any) => {
  const employee = await db("employees").insert(payload).returning("*");

  return employee;
};

const getAllEmployees = async () => {
  return await db("employees").select("*");
};

const getEmployeeById = async (id: string) => {
  const employee = await db("employees").where({ id }).first();

  return employee;
};

const updateEmployee = async (id: string, data: any) => {
  const employee = await db("employees").where({ id }).first();
  if (!employee) return null;

  await db("employees").where({ id }).update(data);

  const updatedEmployee = await db("employees").where({ id }).first();
  return updatedEmployee;
};

const deleteEmployee = async (id: string) => {
  const employee = await db("employees").where({ id }).first();
  if (!employee) return null;
  await db("employees").where({ id }).delete();
  return employee;
};

export const employeesServices = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
