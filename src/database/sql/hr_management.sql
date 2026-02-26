-- ===========================================
-- HR Management Database SQL
-- ===========================================

-- Table: hr_users
CREATE TABLE IF NOT EXISTS hr_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(200) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Table: employees
CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    age INT NOT NULL,
    designation VARCHAR(100) NOT NULL,
    hiring_date DATE NOT NULL,
    date_of_birth DATE NOT NULL,
    salary DECIMAL(12,2) NOT NULL,
    photo_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Table: attendance
CREATE TABLE IF NOT EXISTS attendance (
    id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    check_in_time TIME NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(employee_id, date)
);

-- Seed HR user
-- Replace password_hash with your bcrypt hash
INSERT INTO hr_users (name, email, password_hash)
VALUES ('HR Admin', 'admin@hr.com', '$2b$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
ON CONFLICT (email) DO NOTHING;

--  Sample employees
INSERT INTO employees (name, age, designation, hiring_date, date_of_birth, salary)
VALUES 
('Rahim Uddin', 30, 'Software Engineer', '2022-05-01', '1992-07-15', 50000),
('Karim Ali', 28, 'HR Manager', '2023-01-10', '1995-02-20', 45000)
ON CONFLICT DO NOTHING;

--  Sample attendance
INSERT INTO attendance (employee_id, date, check_in_time)
VALUES
(1, '2025-08-01', '09:30:00'),
(1, '2025-08-02', '09:50:00'),
(2, '2025-08-01', '09:40:00')
ON CONFLICT DO NOTHING;