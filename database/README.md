# Database - Dayflow HRMS

This directory contains the complete database schema and seed data for the **Dayflow Human Resource Management System (HRMS)** - a comprehensive solution for employee management, attendance tracking, leave management, and payroll processing.

## 📁 Structure

```
database/
├── dayflow_hrms.sql       # Complete database schema with all tables and relationships
├── dayflow_hrms_seed.sql  # Sample seed data for testing and development
└── README.md             # This file
```

## 🗄️ Database Information

- **Database Name**: `dayflow_hrms`
- **Type**: PostgreSQL (Primary) / MySQL (Compatible)
- **Author**: Vishal Baraiya
- **Project**: Dayflow HRMS
- **Version**: 1.0

## 📊 Schema Overview

The database consists of 9 core tables supporting the complete HRMS functionality:

### Core Tables

1. **roles** - System roles and access control
   - Admin, HR, Employee roles

2. **users** - Authentication and authorization
   - Email-based authentication
   - Password hashing
   - Role-based access control

3. **departments** - Department management
   - HR, Engineering, Finance, Marketing, etc.

4. **designations** - Job titles and positions
   - HR Manager, Software Engineer, Accountant, etc.

5. **employees** - Employee master data
   - Personal information
   - Contact details
   - Department and designation assignment
   - Profile pictures
   - Employee codes and status

6. **attendance_logs** - Daily attendance tracking
   - Check-in/Check-out times
   - Attendance status (Present, Absent, Leave, etc.)

7. **leave_types** - Leave categories
   - Paid Leave, Sick Leave, Unpaid Leave

8. **leave_requests** - Employee leave management
   - Leave applications
   - Approval workflow
   - Leave history

9. **payroll** - Salary and compensation management
   - Basic salary
   - Allowances and deductions
   - Net salary calculation
   - Payment tracking

## 🚀 Quick Setup

### For PostgreSQL

1. **Create the database:**
   ```bash
   psql -U postgres
   CREATE DATABASE dayflow_hrms;
   \q
   ```

2. **Run the schema:**
   ```bash
   psql -U postgres -d dayflow_hrms -f dayflow_hrms.sql
   ```

3. **Load seed data (optional):**
   ```bash
   psql -U postgres -d dayflow_hrms -f dayflow_hrms_seed.sql
   ```

### For MySQL

1. **Create the database:**
   ```bash
   mysql -u root -p
   CREATE DATABASE dayflow_hrms;
   exit;
   ```

2. **Run the schema:**
   ```bash
   mysql -u root -p dayflow_hrms < dayflow_hrms.sql
   ```

3. **Load seed data (optional):**
   ```bash
   mysql -u root -p dayflow_hrms < dayflow_hrms_seed.sql
   ```

## 📋 Seed Data

The `dayflow_hrms_seed.sql` file includes sample data for:

- **Roles**: Admin, HR, Employee
- **Departments**: HR, Engineering, Finance, Marketing
- **Designations**: Various job titles
- **Users**: Sample admin, HR, and employee accounts
- **Employees**: 2 sample employee records
- **Leave Types**: Paid, Sick, and Unpaid leave
- **Attendance Logs**: Sample attendance records
- **Leave Requests**: Sample approved leave request

**Note**: Password hashes in seed data are placeholders. Replace with actual hashed passwords before production use.

## 🔑 Key Features

- **Role-Based Access Control**: Separate roles for Admin, HR, and Employees
- **Employee Management**: Complete employee lifecycle tracking
- **Attendance System**: Clock-in/Clock-out with status tracking
- **Leave Management**: Request, approval, and tracking workflow
- **Payroll Processing**: Salary calculation with allowances and deductions
- **Foreign Key Constraints**: Data integrity across related tables
- **Cascading Deletes**: Automatic cleanup of related records

## 🔐 Security Considerations

1. **Password Storage**: Always use secure password hashing (bcrypt, argon2, etc.)
2. **Database Access**: Use environment variables for database credentials
3. **User Permissions**: Grant minimal required privileges to application users
4. **SQL Injection**: Use parameterized queries in application code
5. **Backup Strategy**: Implement regular database backups

## 🛠️ Maintenance

### Backup Database

**PostgreSQL:**
```bash
pg_dump -U postgres dayflow_hrms > backup_$(date +%Y%m%d).sql
```

**MySQL:**
```bash
mysqldump -u root -p dayflow_hrms > backup_$(date +%Y%m%d).sql
```

### Restore Database

**PostgreSQL:**
```bash
psql -U postgres -d dayflow_hrms < backup_20260103.sql
```

**MySQL:**
```bash
mysql -u root -p dayflow_hrms < backup_20260103.sql
```

## 📝 Entity Relationships

```
roles ──< users ──< employees ──< attendance_logs
                         │
                         ├──< leave_requests >── leave_types
                         │
                         └──< payroll
                         
departments ──< employees

designations ──< employees
```

## 🤝 Contributing

When modifying the database schema:

1. Document all changes in comments
2. Update this README with schema changes
3. Create migration scripts for existing databases
4. Test changes thoroughly before committing
5. Update seed data if necessary

## 📞 Support

For database-related issues or questions, please contact the development team or create an issue in the project repository.

---

**Project**: Odoo x GCET Hackathon 2026  
**Last Updated**: January 2026
