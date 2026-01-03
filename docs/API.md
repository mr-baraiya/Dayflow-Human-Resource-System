# API Documentation

## Overview

Dayflow HRMS API provides comprehensive endpoints for managing human resources operations including authentication, user management, attendance tracking, leave management, and payroll operations.

**Base URL**: `http://localhost:5000/api`

**Production URL**: `https://your-domain.com/api`

## Authentication

All protected endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Common Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": ["Additional error details"]
}
```

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid or missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 500 | Internal Server Error |

---

## Authentication Endpoints

### Register User
Create a new user account.

**Endpoint**: `POST /api/auth/register`

**Access**: Public

**Request Body**:
```json
{
  "EmployeeCode": "EMP001",
  "Email": "john.doe@company.com",
  "Password": "SecurePass123!",
  "Role": "employee"
}
```

**Validation Rules**:
- `EmployeeCode`: Required, alphanumeric, unique
- `Email`: Required, valid email format, unique
- `Password`: Required, minimum 6 characters
- `Role`: Required, one of: "admin", "hr", "employee"

**Response** (201):
```json
{
  "success": true,
  "data": {
    "UserId": 1,
    "EmployeeCode": "EMP001",
    "Email": "john.doe@company.com",
    "Role": "employee",
    "IsActive": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### Login
Authenticate user and receive JWT token.

**Endpoint**: `POST /api/auth/login`

**Access**: Public

**Request Body**:
```json
{
  "Email": "john.doe@company.com",
  "Password": "SecurePass123!"
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "UserId": 1,
    "EmployeeCode": "EMP001",
    "Email": "john.doe@company.com",
    "Role": "employee",
    "IsActive": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "profile": {
      "EmployeeId": 1,
      "FirstName": "John",
      "LastName": "Doe",
      "Department": "Engineering",
      "Designation": "Software Engineer"
    }
  }
}
```

---

### Get Current User Profile
Get authenticated user's profile information.

**Endpoint**: `GET /api/auth/me`

**Access**: Protected (All authenticated users)

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "UserId": 1,
    "EmployeeCode": "EMP001",
    "Email": "john.doe@company.com",
    "Role": "employee",
    "profile": {
      "EmployeeId": 1,
      "FirstName": "John",
      "LastName": "Doe",
      "DateOfBirth": "1990-05-15",
      "Gender": "Male",
      "PhoneNumber": "+1234567890",
      "Address": "123 Main St, City, State 12345",
      "Department": "Engineering",
      "Designation": "Software Engineer",
      "DateOfJoining": "2024-01-01",
      "EmploymentType": "Full-Time"
    }
  }
}
```

---

### Request Password Reset
Request a password reset link via email.

**Endpoint**: `POST /api/auth/forgot-password`

**Access**: Public

**Request Body**:
```json
{
  "Email": "john.doe@company.com"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Password reset link sent to your email"
}
```

---

### Reset Password
Reset password using token from email.

**Endpoint**: `POST /api/auth/reset-password/:token`

**Access**: Public

**Request Body**:
```json
{
  "Password": "NewSecurePass123!"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

---

## User Management Endpoints

### Get All Users
Retrieve all users (Admin only).

**Endpoint**: `GET /api/users`

**Access**: Protected (Admin only)

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `role` (optional): Filter by role
- `search` (optional): Search by name or email

**Example**: `/api/users?page=1&limit=10&role=employee`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "UserId": 1,
        "EmployeeCode": "EMP001",
        "Email": "john.doe@company.com",
        "Role": "employee",
        "IsActive": true,
        "profile": {
          "FirstName": "John",
          "LastName": "Doe",
          "Department": "Engineering",
          "Designation": "Software Engineer"
        }
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalUsers": 50,
      "limit": 10
    }
  }
}
```

---

### Get User by ID
Retrieve specific user details.

**Endpoint**: `GET /api/users/:id`

**Access**: Protected (Admin or own profile)

**Response** (200):
```json
{
  "success": true,
  "data": {
    "UserId": 1,
    "EmployeeCode": "EMP001",
    "Email": "john.doe@company.com",
    "Role": "employee",
    "IsActive": true,
    "CreatedAt": "2024-01-01T00:00:00.000Z",
    "profile": {
      "EmployeeId": 1,
      "FirstName": "John",
      "LastName": "Doe",
      "DateOfBirth": "1990-05-15",
      "Gender": "Male",
      "PhoneNumber": "+1234567890",
      "Department": "Engineering",
      "Designation": "Software Engineer"
    }
  }
}
```

---

### Update User
Update user information.

**Endpoint**: `PUT /api/users/:id`

**Access**: Protected (Admin or own profile)

**Request Body** (all fields optional):
```json
{
  "Email": "newemail@company.com",
  "Role": "hr",
  "IsActive": true,
  "FirstName": "John",
  "LastName": "Doe",
  "PhoneNumber": "+1234567890",
  "Address": "New Address",
  "Department": "Engineering",
  "Designation": "Senior Software Engineer"
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "UserId": 1,
    "Email": "newemail@company.com",
    "Role": "hr",
    "profile": {
      "FirstName": "John",
      "LastName": "Doe",
      "Department": "Engineering",
      "Designation": "Senior Software Engineer"
    }
  }
}
```

---

### Delete User
Delete a user account (Admin only).

**Endpoint**: `DELETE /api/users/:id`

**Access**: Protected (Admin only)

**Response** (200):
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## Attendance Endpoints

### Clock In
Record clock in time for the day.

**Endpoint**: `POST /api/attendance/clock-in`

**Access**: Protected (All authenticated users)

**Request Body**:
```json
{
  "Location": "Office",
  "Notes": "Started work on Project X"
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "AttendanceId": 1,
    "EmployeeId": 1,
    "Date": "2026-01-03",
    "ClockInTime": "2026-01-03T09:00:00.000Z",
    "Status": "Present"
  }
}
```

---

### Clock Out
Record clock out time for the day.

**Endpoint**: `POST /api/attendance/clock-out`

**Access**: Protected (All authenticated users)

**Request Body** (optional):
```json
{
  "Notes": "Completed tasks for the day"
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "AttendanceId": 1,
    "ClockOutTime": "2026-01-03T18:00:00.000Z",
    "WorkingHours": 9.0
  }
}
```

---

### Get My Attendance
Retrieve attendance records for authenticated user.

**Endpoint**: `GET /api/attendance/my-attendance`

**Access**: Protected (All authenticated users)

**Query Parameters**:
- `startDate` (optional): Filter from date (YYYY-MM-DD)
- `endDate` (optional): Filter to date (YYYY-MM-DD)
- `month` (optional): Filter by month (1-12)
- `year` (optional): Filter by year

**Example**: `/api/attendance/my-attendance?month=1&year=2026`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "records": [
      {
        "AttendanceId": 1,
        "Date": "2026-01-03",
        "ClockInTime": "2026-01-03T09:00:00.000Z",
        "ClockOutTime": "2026-01-03T18:00:00.000Z",
        "WorkingHours": 9.0,
        "Status": "Present"
      }
    ],
    "summary": {
      "totalDays": 22,
      "presentDays": 20,
      "absentDays": 2,
      "leaveDays": 0,
      "totalHours": 180.0
    }
  }
}
```

---

### Get All Attendance Records
Retrieve attendance records for all employees (Admin/HR only).

**Endpoint**: `GET /api/attendance`

**Access**: Protected (Admin/HR only)

**Query Parameters**:
- `employeeId` (optional): Filter by employee
- `startDate` (optional): Filter from date
- `endDate` (optional): Filter to date
- `status` (optional): Filter by status

**Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "AttendanceId": 1,
      "EmployeeId": 1,
      "Date": "2026-01-03",
      "ClockInTime": "2026-01-03T09:00:00.000Z",
      "ClockOutTime": "2026-01-03T18:00:00.000Z",
      "WorkingHours": 9.0,
      "Status": "Present",
      "employee": {
        "FirstName": "John",
        "LastName": "Doe",
        "Department": "Engineering"
      }
    }
  ]
}
```

---

### Mark Attendance (Admin/HR)
Manually mark attendance for an employee.

**Endpoint**: `POST /api/attendance/mark`

**Access**: Protected (Admin/HR only)

**Request Body**:
```json
{
  "EmployeeId": 1,
  "Date": "2026-01-03",
  "Status": "Present",
  "ClockInTime": "09:00",
  "ClockOutTime": "18:00",
  "Notes": "Manual entry"
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "AttendanceId": 1,
    "EmployeeId": 1,
    "Date": "2026-01-03",
    "Status": "Present",
    "WorkingHours": 9.0
  }
}
```

---

## Leave Management Endpoints

### Submit Leave Request
Create a new leave request.

**Endpoint**: `POST /api/leave/request`

**Access**: Protected (All authenticated users)

**Request Body**:
```json
{
  "LeaveType": "Sick Leave",
  "StartDate": "2026-01-10",
  "EndDate": "2026-01-12",
  "Reason": "Medical appointment",
  "TotalDays": 3
}
```

**Leave Types**: Sick Leave, Casual Leave, Earned Leave, Maternity Leave, Paternity Leave

**Response** (201):
```json
{
  "success": true,
  "data": {
    "LeaveRequestId": 1,
    "EmployeeId": 1,
    "LeaveType": "Sick Leave",
    "StartDate": "2026-01-10",
    "EndDate": "2026-01-12",
    "TotalDays": 3,
    "Reason": "Medical appointment",
    "Status": "Pending",
    "RequestDate": "2026-01-03"
  }
}
```

---

### Get My Leave Requests
Retrieve leave requests for authenticated user.

**Endpoint**: `GET /api/leave/my-requests`

**Access**: Protected (All authenticated users)

**Query Parameters**:
- `status` (optional): Filter by status (Pending, Approved, Rejected)
- `year` (optional): Filter by year

**Response** (200):
```json
{
  "success": true,
  "data": {
    "requests": [
      {
        "LeaveRequestId": 1,
        "LeaveType": "Sick Leave",
        "StartDate": "2026-01-10",
        "EndDate": "2026-01-12",
        "TotalDays": 3,
        "Status": "Pending",
        "RequestDate": "2026-01-03"
      }
    ],
    "leaveBalance": {
      "sickLeave": 7,
      "casualLeave": 10,
      "earnedLeave": 15
    }
  }
}
```

---

### Get All Leave Requests
Retrieve all leave requests (Admin/HR only).

**Endpoint**: `GET /api/leave/requests`

**Access**: Protected (Admin/HR only)

**Query Parameters**:
- `status` (optional): Filter by status
- `employeeId` (optional): Filter by employee
- `startDate` (optional): Filter from date
- `endDate` (optional): Filter to date

**Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "LeaveRequestId": 1,
      "EmployeeId": 1,
      "LeaveType": "Sick Leave",
      "StartDate": "2026-01-10",
      "EndDate": "2026-01-12",
      "TotalDays": 3,
      "Status": "Pending",
      "employee": {
        "FirstName": "John",
        "LastName": "Doe",
        "Department": "Engineering"
      }
    }
  ]
}
```

---

### Approve/Reject Leave Request
Update leave request status (Admin/HR only).

**Endpoint**: `PUT /api/leave/requests/:id`

**Access**: Protected (Admin/HR only)

**Request Body**:
```json
{
  "Status": "Approved",
  "AdminComments": "Leave approved for medical reasons"
}
```

**Status**: "Approved" or "Rejected"

**Response** (200):
```json
{
  "success": true,
  "data": {
    "LeaveRequestId": 1,
    "Status": "Approved",
    "ApprovedBy": 2,
    "ApprovalDate": "2026-01-03",
    "AdminComments": "Leave approved for medical reasons"
  }
}
```

---

### Cancel Leave Request
Cancel a pending leave request.

**Endpoint**: `DELETE /api/leave/requests/:id`

**Access**: Protected (Request owner or Admin/HR)

**Response** (200):
```json
{
  "success": true,
  "message": "Leave request cancelled successfully"
}
```

---

## Payroll Endpoints

### Get My Payroll
Retrieve payroll records for authenticated user.

**Endpoint**: `GET /api/payroll/my-payroll`

**Access**: Protected (All authenticated users)

**Query Parameters**:
- `month` (optional): Filter by month (1-12)
- `year` (optional): Filter by year

**Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "PayrollId": 1,
      "EmployeeId": 1,
      "PayPeriod": "January 2026",
      "BasicSalary": 50000.00,
      "Allowances": 5000.00,
      "Deductions": 3000.00,
      "NetSalary": 52000.00,
      "PaymentDate": "2026-01-31",
      "Status": "Paid"
    }
  ]
}
```

---

### Get All Payroll Records
Retrieve payroll records for all employees (Admin/HR only).

**Endpoint**: `GET /api/payroll`

**Access**: Protected (Admin/HR only)

**Query Parameters**:
- `employeeId` (optional): Filter by employee
- `month` (optional): Filter by month
- `year` (optional): Filter by year
- `status` (optional): Filter by status

**Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "PayrollId": 1,
      "EmployeeId": 1,
      "PayPeriod": "January 2026",
      "BasicSalary": 50000.00,
      "Allowances": 5000.00,
      "Deductions": 3000.00,
      "NetSalary": 52000.00,
      "Status": "Paid",
      "employee": {
        "FirstName": "John",
        "LastName": "Doe",
        "Department": "Engineering"
      }
    }
  ]
}
```

---

### Create Payroll Record
Create a new payroll record (Admin/HR only).

**Endpoint**: `POST /api/payroll`

**Access**: Protected (Admin/HR only)

**Request Body**:
```json
{
  "EmployeeId": 1,
  "PayPeriod": "January 2026",
  "BasicSalary": 50000.00,
  "Allowances": 5000.00,
  "Deductions": 3000.00,
  "Bonuses": 0.00,
  "PaymentDate": "2026-01-31"
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "PayrollId": 1,
    "EmployeeId": 1,
    "PayPeriod": "January 2026",
    "NetSalary": 52000.00,
    "Status": "Pending"
  }
}
```

---

### Update Payroll Record
Update existing payroll record (Admin/HR only).

**Endpoint**: `PUT /api/payroll/:id`

**Access**: Protected (Admin/HR only)

**Request Body** (all fields optional):
```json
{
  "BasicSalary": 55000.00,
  "Allowances": 5500.00,
  "Bonuses": 2000.00,
  "Status": "Paid"
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "PayrollId": 1,
    "NetSalary": 59500.00,
    "Status": "Paid"
  }
}
```

---

## Error Handling

### Common Error Responses

**Invalid Token (401)**:
```json
{
  "success": false,
  "error": "Invalid or expired token"
}
```

**Insufficient Permissions (403)**:
```json
{
  "success": false,
  "error": "Access denied. Admin privileges required."
}
```

**Validation Error (400)**:
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    "Email is required",
    "Password must be at least 6 characters"
  ]
}
```

**Resource Not Found (404)**:
```json
{
  "success": false,
  "error": "User not found"
}
```

**Server Error (500)**:
```json
{
  "success": false,
  "error": "Internal server error"
}
```

---

## Rate Limiting

**Recommended Rate Limits**:
- Authentication endpoints: 5 requests per minute
- General API endpoints: 100 requests per minute
- Admin endpoints: 200 requests per minute

---

## API Testing

### Using cURL

**Login Example**:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"Email":"john.doe@company.com","Password":"SecurePass123!"}'
```

**Get Profile with Token**:
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman

1. Create a new collection for Dayflow HRMS API
2. Set base URL as environment variable
3. Use collection-level authorization for token
4. Import example requests from API documentation

---

## Changelog

### Version 1.0.0 (January 2026)
- Initial API release
- Authentication endpoints
- User management
- Attendance tracking
- Leave management
- Payroll operations

---

## Support

For API support and questions:
- **Documentation**: See detailed [API_DOCUMENTATION.md](../backend/API_DOCUMENTATION.md)
- **Issues**: Report on GitHub Issues
- **Contact**: Team Dayflow

---

For more detailed API examples and testing guides, refer to the [backend API documentation](../backend/API_DOCUMENTATION.md).
