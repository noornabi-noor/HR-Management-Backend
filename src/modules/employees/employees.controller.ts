import { Request, Response } from "express";
import { db } from "../../config/db";
import { employeesServices } from "./employess.services";

const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await employeesServices.getAllEmployees();

    res.status(200).json({
      success: true,
      message: "Get all employees successfully!",
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch employees",
    });
  }
};

const createEmployee = async (req: Request, res: Response) => {
  try {
    const result = await employeesServices.createEmployee(req.body);

    res.status(201).json({
      success: true,
      message: "Successful to create employee!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create employee",
    });
  }
};

export const employeesController = {
  getAllEmployees,
  createEmployee,
};
