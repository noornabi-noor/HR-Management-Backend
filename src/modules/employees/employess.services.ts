import { db } from "../../config/db";

const getAllEmployees = async () => {
  return await db("employees").select("*");
};

const createEmployee = async (payload: any) => {
  const employee = await db("employees").insert(payload).returning("*");

  return employee;
};

export const employeesServices = {
  getAllEmployees,
  createEmployee
};
