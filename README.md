# 🏢 HR Management Backend API

A production-ready HR Management RESTful API built using:

- Node.js
- Express.js
- TypeScript (OOP structured)
- PostgreSQL
- Knex.js
- JWT Authentication
- Joi Validation
- Multer (File Upload)
- ESLint & Prettier

---

# 📌 Project Objective

Build a secure HR Management system where:

- HR users can authenticate
- Perform CRUD operations on employees
- Record daily attendance
- Generate monthly attendance reports
- Track late arrivals (after 9:45 AM)

---

# 🚀 Tech Stack

- Node.js
- Express
- TypeScript
- PostgreSQL
- Knex (Query Builder)
- JWT
- Joi
- Multer
- dotenv

---

# 📂 Project Structure
```text
src/
├── app.ts
├── server.ts
├── config/
│ ├── db.ts
│ └── env.ts
├── modules/
│ ├── auth/
│ ├── employees/
│ ├── attendance/
│ └── reports/
├── middlewares/
│ ├── auth.middleware.ts
│ ├── globalErrorHandler.ts
├── shared/
│ ├── catchAsync.ts
│ ├── sendResponse.ts

```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone <repository-url>
cd hr-management-backend
```
## 2️⃣ Install Dependencies
```bash
npm install
```
## 3️⃣ Create .env File

Create a .env file in the root directory:

```text
PORT=PORT_NUMBER
CONNECTION_STR=postgresql://username:password@localhost:5432/db_name

DB_HOST=localhost
DB_USER=user_name
DB_PASSWORD=password
DB_NAME=db_name
DB_PORT=5432

JWT_SECRET=your_secret_key

ADMIN_NAME=admin_name
ADMIN_EMAIL=admin_email
ADMIN_PASSWORD=admin_password

```
### ⚠️ Add .env to .gitignore

Create .env.example without real credentials.

## 4️⃣ Run Database Migrations
```bash
npx knex migrate:latest
```
## 5️⃣ Run Seeds (Create HR Admin)
```bash
npx knex seed:run
```
## 6️⃣ Run Server

Development:
```bash
npm run dev
```

Production:
```bash
npm run build
npm start
```
Server runs at:
```bash
http://localhost:5000
```
## 🗄️ Database Schema

Here is the ER diagram for the HR Management Backend:

![Database Schema](https://i.ibb.co.com/s9D6JnNs/hr-Management.png)

The full ER diagram for the HR Management Backend can be viewed online at DrawSQL:

[View Database Schema on DrawSQL](https://drawsql.app/teams/myself-668/diagrams/hr-management)

## 🔐 Authentication
```text
POST /auth/login

Request:

{
  "email": "email@hr.com",
  "password": "password"
}

Response:

{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "JWT_TOKEN"
  }
}

```
## 🔒 Protected Routes

All routes under:

- /employees
- /attendance
- /reports

- Require:
Authorization: Bearer <token>
---

## 👨‍💼 Employee Endpoints
- GET /employees
Supports pagination & search.

```text
Example:

/employees?search=rahim&page=1&limit=10
GET /employees/:id

Get single employee.

POST /employees

Create employee (supports multipart/form-data for photo upload).

PUT /employees/:id

Update employee (can replace photo).

DELETE /employees/:id

Delete employee.

```

## 🕒 Attendance Endpoints
- GET /attendance
```text
Filter example:

/attendance?employee_id=12&from=2025-08-01&to=2025-08-31
GET /attendance/:id

Get single attendance record.

POST /attendance

Create or Upsert attendance.

Body:

{
  "employee_id": 1,
  "date": "2025-08-20",
  "check_in_time": "09:30:00"
}

If (employee_id, date) exists → updates check_in_time instead of creating duplicate.

PUT /attendance/:id

Update attendance entry.

DELETE /attendance/:id

Delete attendance entry.

```
## 📊 Reports
- GET /reports/attendance

```text
Monthly attendance summary.

Query:

/reports/attendance?month=2025-08

Optional:

/reports/attendance?month=2025-08&employee_id=1

Response:

[
  {
    "employee_id": 1,
    "name": "Rahim Uddin",
    "days_present": 22,
    "times_late": 3
  }
]
```
## ⏰ Late Rule

An employee is considered late if:
check_in_time > 09:45:00

## 🧠 TypeScript Requirements

All request & response handlers are fully typed

Services return typed data

Express Request is augmented with:
req.user

(decoded JWT payload)

## 🛡 Security

- Password hashing with bcrypt
- JWT authentication
- Environment-based configuration
- Input validation using Joi
- Unique constraints at database level

# 👨‍💻 Author
Md. Noornabi