import { Request, Response } from "express";
import { db } from "../../config/db";
import { employeesServices } from "./employess.services";

const createEmployee = async (req: Request, res: Response) => {
  try {
    const result = await employeesServices.createEmployee(req.body);

    res.status(201).json({
      success: true,
      message: "Successful to create employee!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await employeesServices.getAllEmployees();

    res.status(200).json({
      success: true,
      message: "Get all employees successfully!",
      data: employees,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const employee = await employeesServices.getEmployeeById(
      req.params.id as string,
    );
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    res.status(200).json({
      success: true,
      message: "Employee retrieved successfully",
      data: employee,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateEmployee = async (req: Request, res: Response) => {
  try {
    const employeeId = req.params.id as string;
    const data = req.body; 

    const updatedEmployee = await employeesServices.updateEmployee(employeeId, data);

    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: updatedEmployee,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await employeesServices.deleteEmployee(
      req.params.id as string,
    );
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    res.status(200).json({
      success: true,
      message: "Employee deleted successfully!",
      data: employee,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const employeesController = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
