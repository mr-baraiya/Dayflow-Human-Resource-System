/* =========================================================
   Dayflow - Human Resource Management System (HRMS)
   Database Schema File
   ---------------------------------------------------------
   Author      : Vishal Baraiya
   Project     : Dayflow HRMS
   Description : This SQL file creates the complete database
                 schema for Dayflow HRMS including users,
                 employees, attendance, leave, and payroll.
   ========================================================= */


/* ===============================
   DATABASE CREATION
   =============================== */

CREATE DATABASE dayflow_hrms;

/* Use database (MySQL) */
USE dayflow_hrms;
/* For PostgreSQL use:
   \c dayflow_hrms;
*/


/* ===============================
   TABLE: roles
   Purpose: Store system roles
   =============================== */
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);


/* ===============================
   TABLE: users
   Purpose: Authentication & authorization
   =============================== */
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_user_role
        FOREIGN KEY (role_id)
        REFERENCES roles(role_id)
);


/* ===============================
   TABLE: departments
   Purpose: Store department details
   =============================== */
CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL UNIQUE
);


/* ===============================
   TABLE: designations
   Purpose: Store employee job titles
   =============================== */
CREATE TABLE designations (
    designation_id SERIAL PRIMARY KEY,
    designation_name VARCHAR(100) NOT NULL UNIQUE
);


/* ===============================
   TABLE: employees
   Purpose: Store employee master data
   =============================== */
CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    employee_code VARCHAR(20) NOT NULL UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(15),
    address TEXT,
    department_id INT NOT NULL,
    designation_id INT NOT NULL,
    profile_picture_url TEXT,
    date_of_joining DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Active',

    -- Foreign Key Constraints
    CONSTRAINT fk_employee_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_employee_department
        FOREIGN KEY (department_id)
        REFERENCES departments(department_id),

    CONSTRAINT fk_employee_designation
        FOREIGN KEY (designation_id)
        REFERENCES designations(designation_id),

    -- Check Constraint
    CONSTRAINT chk_employee_status
        CHECK (status IN ('Active', 'Inactive', 'Resigned'))
);


/* ===============================
   TABLE: attendance_logs
   Purpose: Track daily attendance
   =============================== */
CREATE TABLE attendance_logs (
    attendance_id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL,
    attendance_date DATE NOT NULL,
    check_in TIME,
    check_out TIME,
    status VARCHAR(20) NOT NULL,

    -- Foreign Key
    CONSTRAINT fk_attendance_employee
        FOREIGN KEY (employee_id)
        REFERENCES employees(employee_id)
        ON DELETE CASCADE,

    -- Ensure one attendance per day per employee
    CONSTRAINT uq_attendance
        UNIQUE (employee_id, attendance_date),

    -- Valid attendance status
    CONSTRAINT chk_attendance_status
        CHECK (status IN ('Present', 'Absent', 'Half-day', 'Leave'))
);


/* ===============================
   TABLE: leave_types
   Purpose: Define types of leave
   =============================== */
CREATE TABLE leave_types (
    leave_type_id SERIAL PRIMARY KEY,
    leave_name VARCHAR(50) NOT NULL UNIQUE
);


/* ===============================
   TABLE: leave_requests
   Purpose: Manage employee leave requests
   =============================== */
CREATE TABLE leave_requests (
    leave_request_id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL,
    leave_type_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    approved_by INT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Foreign Keys
    CONSTRAINT fk_leave_employee
        FOREIGN KEY (employee_id)
        REFERENCES employees(employee_id),

    CONSTRAINT fk_leave_type
        FOREIGN KEY (leave_type_id)
        REFERENCES leave_types(leave_type_id),

    CONSTRAINT fk_leave_approved_by
        FOREIGN KEY (approved_by)
        REFERENCES users(user_id),

    -- Valid leave status
    CONSTRAINT chk_leave_status
        CHECK (status IN ('Pending', 'Approved', 'Rejected')),

    -- Date validation
    CONSTRAINT chk_leave_dates
        CHECK (end_date >= start_date)
);


/* ===============================
   TABLE: payroll
   Purpose: Store employee salary details
   =============================== */
CREATE TABLE payroll (
    payroll_id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL,
    month INT NOT NULL,
    year INT NOT NULL,
    base_salary DECIMAL(10,2) NOT NULL,
    allowances DECIMAL(10,2) DEFAULT 0,
    deductions DECIMAL(10,2) DEFAULT 0,
    net_salary DECIMAL(10,2) NOT NULL,

    -- Foreign Key
    CONSTRAINT fk_payroll_employee
        FOREIGN KEY (employee_id)
        REFERENCES employees(employee_id),

    -- One payroll per employee per month
    CONSTRAINT uq_employee_payroll
        UNIQUE (employee_id, month, year),

    -- Month validation
    CONSTRAINT chk_payroll_month
        CHECK (month BETWEEN 1 AND 12)
);


/* =========================================================
   END OF DATABASE SCHEMA
   ========================================================= */
