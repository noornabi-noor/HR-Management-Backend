import express, { Request, Response } from "express";
import { employeesRoutes } from "./modules/employees/employees.routes";

const app = express();

//Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/employees", employeesRoutes);

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
