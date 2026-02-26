import express, { Request, Response } from "express";
import { employeesRoutes } from "./modules/employees/employees.routes";
import { attendanceRoutes } from "./modules/attendance/attendance.routes";
import { reportsRoutes } from "./modules/reports/reports.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();

//Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/employees", employeesRoutes);
app.use("/attendances", attendanceRoutes);
app.use("/reports", reportsRoutes);
app.use("/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

export default app;
