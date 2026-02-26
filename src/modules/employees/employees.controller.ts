import { Request } from "express";
import { employeesServices } from "./employess.services";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";

const createEmployee = catchAsync(async (req: Request, res) => {
  const result = await employeesServices.createEmployee(req.body);

  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Successfully created employee!",
    data: result,
  });
});

const getAllEmployees = catchAsync(async (req: Request, res) => {
  const employees = await employeesServices.getAllEmployees();

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Employees retrieved successfully!",
    data: employees,
  });
});

const getEmployeeById = catchAsync(async (req: Request, res) => {
  const employee = await employeesServices.getEmployeeById(
    req.params.id as string,
  );

  if (!employee) {
    return sendResponse(res, {
      httpStatusCode: 404,
      success: false,
      message: "Employee not found",
    });
  }

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Employee retrieved successfully",
    data: employee,
  });
});

const updateEmployee = catchAsync(async (req: Request, res) => {
  const employeeId = req.params.id;
  const data = req.body;

  const updatedEmployee = await employeesServices.updateEmployee(
    employeeId as string,
    data,
  );

  if (!updatedEmployee) {
    return sendResponse(res, {
      httpStatusCode: 404,
      success: false,
      message: "Employee not found",
    });
  }

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Employee updated successfully",
    data: updatedEmployee,
  });
});

const deleteEmployee = catchAsync(async (req: Request, res) => {
  const employee = await employeesServices.deleteEmployee(
    req.params.id as string,
  );

  if (!employee) {
    return sendResponse(res, {
      httpStatusCode: 404,
      success: false,
      message: "Employee not found",
    });
  }

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Employee deleted successfully!",
    data: employee,
  });
});

export const employeesController = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
