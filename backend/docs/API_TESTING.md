# API Testing Guide

Complete guide for testing all Dayflow HRMS API endpoints.

## Base URL
```
http://localhost:5000/api
```

## Table of Contents
- [Health Check](#health-check)
- [Authentication](#authentication)
- [Profile Management](#profile-management)
- [Dashboard](#dashboard)
- [User Management](#user-management)
- [Attendance](#attendance)
- [Leave Requests](#leave-requests)
- [Payroll](#payroll)

---

## Health Check

### Check API Status
```bash
# PowerShell
Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method Get

# cURL
curl http://localhost:5000/api/health
```

**Response:**
```json
{
  "success": true,
  "message": "Dayflow HRMS API is running",
  "timestamp": "2026-01-03T10:00:00.000Z"
}
```

---

## Authentication

### 1. Register New User
```bash
# PowerShell
$body = @{
    EmployeeCode = "EMP001"
    Email = "john.doe@dayflow.com"
    Password = "SecurePass123!"
    Role = "employee"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" `
  -Method Post `
  -Body $body `
  -ContentType "application/json"

# cURL
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "EmployeeCode": "EMP001",
    "Email": "john.doe@dayflow.com",
    "Password": "SecurePass123!",
    "Role": "employee"
  }'
```

### 2. Login
```bash
# PowerShell
$body = @{
    Email = "john.doe@dayflow.com"
    Password = "SecurePass123!"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" `
  -Method Post `
  -Body $body `
  -ContentType "application/json"

$token = $response.token
Write-Host "Token: $token"

# cURL
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "Email": "john.doe@dayflow.com",
    "Password": "SecurePass123!"
  }'
```

### 3. Forgot Password
```bash
# PowerShell
$body = @{
    Email = "john.doe@dayflow.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/forgot-password" `
  -Method Post `
  -Body $body `
  -ContentType "application/json"
```

### 4. Reset Password
```bash
# PowerShell
$resetToken = "your-reset-token-from-email"
$body = @{
    Password = "NewSecurePass123!"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/reset-password/$resetToken" `
  -Method Put `
  -Body $body `
  -ContentType "application/json"
```

---

## Profile Management

### Get Your Profile
```bash
# PowerShell
$headers = @{
    "Authorization" = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:5000/api/profile" `
  -Method Get `
  -Headers $headers

# cURL
curl http://localhost:5000/api/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Update Profile
```bash
# PowerShell
$headers = @{
    "Authorization" = "Bearer $token"
}

$body = @{
    Email = "john.updated@dayflow.com"
    EmployeeCode = "EMP001"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/profile" `
  -Method Put `
  -Headers $headers `
  -Body $body `
  -ContentType "application/json"
```

### Change Password
```bash
# PowerShell
$headers = @{
    "Authorization" = "Bearer $token"
}

$body = @{
    currentPassword = "SecurePass123!"
    newPassword = "NewSecurePass456!"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/profile/change-password" `
  -Method Post `
  -Headers $headers `
  -Body $body `
  -ContentType "application/json"
```

---

## Dashboard

### Get Dashboard Statistics
```bash
# PowerShell
$headers = @{
    "Authorization" = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:5000/api/dashboard/stats" `
  -Method Get `
  -Headers $headers
```

**Response:**
```json
{
  "success": true,
  "data": {
    "attendance": {
      "today": {
        "checkIn": "2026-01-03T09:00:00.000Z",
        "checkOut": null,
        "status": "PRESENT"
      },
      "thisMonth": 15
    },
    "leaves": {
      "pending": 1,
      "approvedThisMonth": 2
    },
    "payroll": {
      "month": "2025-12",
      "netSalary": 50000
    }
  }
}
```

### Get Today's Attendance
```bash
Invoke-RestMethod -Uri "http://localhost:5000/api/dashboard/attendance/today" `
  -Method Get `
  -Headers $headers
```

### Get Leave Balance
```bash
Invoke-RestMethod -Uri "http://localhost:5000/api/dashboard/leave-balance" `
  -Method Get `
  -Headers $headers
```

### Get Admin Statistics (Admin/Manager only)
```bash
Invoke-RestMethod -Uri "http://localhost:5000/api/dashboard/admin/stats" `
  -Method Get `
  -Headers $headers
```

---

## User Management

### Get All Users (Admin only)
```bash
Invoke-RestMethod -Uri "http://localhost:5000/api/users" `
  -Method Get `
  -Headers $headers
```

### Get User by ID (Admin only)
```bash
Invoke-RestMethod -Uri "http://localhost:5000/api/users/1" `
  -Method Get `
  -Headers $headers
```

### Update User Status (Admin only)
```bash
$body = @{
    isActive = $false
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/users/1/status" `
  -Method Put `
  -Headers $headers `
  -Body $body `
  -ContentType "application/json"
```

---

## Attendance

### Mark Attendance
```bash
$body = @{
    Date = "2026-01-03"
    CheckInTime = "09:00:00"
    Status = "PRESENT"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/attendance" `
  -Method Post `
  -Headers $headers `
  -Body $body `
  -ContentType "application/json"
```

### Get My Attendance
```bash
Invoke-RestMethod -Uri "http://localhost:5000/api/attendance/my" `
  -Method Get `
  -Headers $headers
```

### Update Attendance (Check Out)
```bash
$body = @{
    CheckOutTime = "18:00:00"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/attendance/1" `
  -Method Put `
  -Headers $headers `
  -Body $body `
  -ContentType "application/json"
```

---

## Leave Requests

### Apply for Leave
```bash
$body = @{
    LeaveType = "PAID"
    StartDate = "2026-01-10"
    EndDate = "2026-01-12"
    Reason = "Family vacation"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/leave/apply" `
  -Method Post `
  -Headers $headers `
  -Body $body `
  -ContentType "application/json"
```

### Get My Leave Requests
```bash
Invoke-RestMethod -Uri "http://localhost:5000/api/leave/my" `
  -Method Get `
  -Headers $headers
```

### Get Pending Leave Requests (Admin/Manager)
```bash
Invoke-RestMethod -Uri "http://localhost:5000/api/leave/pending" `
  -Method Get `
  -Headers $headers
```

### Approve/Reject Leave (Admin only)
```bash
$body = @{
    Status = "APPROVED"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/leave/1/approve" `
  -Method Put `
  -Headers $headers `
  -Body $body `
  -ContentType "application/json"
```

---

## Payroll

### Create Payroll (Admin only)
```bash
$body = @{
    UserId = 1
    PayrollMonth = "2026-01"
    BasicSalary = 50000
    Allowances = 5000
    Deductions = 3000
    NetSalary = 52000
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/payroll" `
  -Method Post `
  -Headers $headers `
  -Body $body `
  -ContentType "application/json"
```

### Get My Payroll
```bash
Invoke-RestMethod -Uri "http://localhost:5000/api/payroll/my" `
  -Method Get `
  -Headers $headers
```

### Get All Payroll Records (Admin only)
```bash
Invoke-RestMethod -Uri "http://localhost:5000/api/payroll" `
  -Method Get `
  -Headers $headers
```

---

## Testing with Postman

1. **Import Collection:**
   - Create new collection "Dayflow HRMS"
   - Add base URL as variable: `{{baseUrl}}` = `http://localhost:5000/api`

2. **Set Up Authentication:**
   - Create environment variable: `{{token}}`
   - After login, save token: `pm.environment.set("token", pm.response.json().token)`

3. **Add Authorization Header:**
   - Type: Bearer Token
   - Token: `{{token}}`

4. **Test Flow:**
   - Register → Login (save token) → Test protected endpoints

---

## Common Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "User role 'employee' is not authorized"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Server error"
}
```
