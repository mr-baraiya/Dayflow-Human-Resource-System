/* ===============================
   SEED: roles
   =============================== */
INSERT INTO roles (role_name) VALUES
('Admin'),
('HR'),
('Employee');


/* ===============================
   SEED: departments
   =============================== */
INSERT INTO departments (department_name) VALUES
('Human Resources'),
('Engineering'),
('Finance'),
('Marketing');


/* ===============================
   SEED: designations
   =============================== */
INSERT INTO designations (designation_name) VALUES
('HR Manager'),
('Software Engineer'),
('Accountant'),
('Marketing Executive');


/* ===============================
   SEED: users
   NOTE: password_hash is dummy text
   =============================== */
INSERT INTO users (email, password_hash, role_id) VALUES
('admin@dayflow.com', 'hashed_admin_password', 1),
('hr@dayflow.com', 'hashed_hr_password', 2),
('employee1@dayflow.com', 'hashed_emp1_password', 3),
('employee2@dayflow.com', 'hashed_emp2_password', 3);


/* ===============================
   SEED: employees
   =============================== */
INSERT INTO employees (
    user_id,
    employee_code,
    full_name,
    phone,
    address,
    department_id,
    designation_id,
    profile_picture_url,
    date_of_joining
) VALUES
(3, 'EMP001', 'Amit Sharma', '9876543210', 'Ahmedabad, Gujarat', 2, 2,
 'https://cdn.dayflow.com/profile/emp001.jpg', '2024-01-10'),

(4, 'EMP002', 'Neha Patel', '9123456780', 'Rajkot, Gujarat', 1, 1,
 'https://cdn.dayflow.com/profile/emp002.jpg', '2024-02-15');


/* ===============================
   SEED: leave_types
   =============================== */
INSERT INTO leave_types (leave_name) VALUES
('Paid Leave'),
('Sick Leave'),
('Unpaid Leave');


/* ===============================
   SEED: attendance_logs
   =============================== */
INSERT INTO attendance_logs (
    employee_id,
    attendance_date,
    check_in,
    check_out,
    status
) VALUES
(1, '2025-01-02', '09:30', '18:00', 'Present'),
(1, '2025-01-03', '09:40', '18:05', 'Present'),
(2, '2025-01-02', NULL, NULL, 'Leave');


/* ===============================
   SEED: leave_requests
   =============================== */
INSERT INTO leave_requests (
    employee_id,
    leave_type_id,
    start_date,
    end_date,
    reason,
    status,
    approved_by
) VALUES
(2, 2, '2025-01-02', '2025-01-02', 'Medical leave', 'Approved', 2);


/* ===============================
   SEED: payroll
   =============================== */
INSERT INTO payroll (
    employee_id,
    month,
    year,
    base_salary,
    allowances,
    deductions,
    net_salary
) VALUES
(1, 1, 2025, 40000, 5000, 2000, 43000),
(2, 1, 2025, 50000, 6000, 3000, 53000);

