# Dayflow HRMS - Backend API

**Human Resource Management System Backend**  
Built with Node.js, Express, Sequelize, and JWT Authentication

Every workday, perfectly aligned. ✨

## Documentation

- **[API Testing Guide](docs/API_TESTING.md)** - Complete guide for testing all API endpoints with PowerShell, cURL, and Postman
- **[Frontend Integration Guide](docs/FRONTEND_INTEGRATION.md)** - React/Vue/Angular integration examples and best practices

## Features

### Core Features
- ✅ User Authentication (Register/Login) with JWT
- ✅ Password Reset with Email Notifications
- ✅ Role-based Authorization (Admin/Manager/Employee)

### Employee Features
- ✅ Profile Management
- ✅ Attendance Tracking (Check-in/Check-out)
- ✅ Leave Request System
- ✅ Payroll Viewing
- ✅ Personal Dashboard with Statistics

### Admin Features
- ✅ User Management (Activate/Deactivate)
- ✅ Attendance Management
- ✅ Leave Approval System
- ✅ Payroll Processing
- ✅ Admin Dashboard with Analytics

### Additional Features
- ✅ Email Notifications (Password Reset)
- ✅ RESTful API Design
- ✅ Input Validation & Sanitization
- ✅ Comprehensive Error Handling
- ✅ Secure Password Hashing

## 🛠️ Technology Stack

- **Runtime**: Node.js v22.17.0
- **Framework**: Express.js 4.18.2
- **Database**: MS SQL Server Express
- **ORM**: Sequelize 6.35.2
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Password Hashing**: bcryptjs 2.4.3
- **Email**: nodemailer with Gmail SMTP
- **Validation**: express-validator 7.0.1
- **Environment**: dotenv 16.3.1

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js             # Database configuration
├── controllers/
│   ├── authController.js       # Authentication (register, login, password reset)
│   ├── userController.js       # User management (CRUD, status update)
│   ├── profileController.js    # Profile management & password change
│   ├── dashboardController.js  # Dashboard statistics & analytics
│   ├── attendanceController.js # Attendance tracking
│   ├── leaveController.js      # Leave management
│   └── payrollController.js    # Payroll processing
├── middleware/
│   ├── auth.js                 # JWT authentication & authorization
│   ├── validator.js            # Input validation
│   └── error.js                # Error handling
├── models/
│   ├── User.js                 # User model with password reset tokens
│   ├── EmployeeProfile.js      # Employee details
│   ├── Attendance.js           # Attendance records
│   ├── LeaveRequest.js         # Leave requests
│   ├── Payroll.js              # Payroll records
│   └── index.js                # Model associations
├── routes/
│   ├── auth.js                 # Auth routes (register, login, forgot/reset password)
│   ├── users.js                # User management routes
│   ├── profile.js              # Profile & change password routes
│   ├── dashboard.js            # Dashboard & statistics routes
│   ├── attendance.js           # Attendance routes
│   ├── leave.js                # Leave management routes
│   └── payroll.js              # Payroll routes
├── utils/
│   ├── auth.js                 # JWT utilities
│   └── sendEmail.js            # Email service (password reset, notifications)
├── docs/
│   ├── API_TESTING.md          # Complete API testing guide
│   └── FRONTEND_INTEGRATION.md # Frontend integration examples
├── .env                        # Environment variables (not in repo)
├── .env.example                # Environment template
├── .gitignore
├── package.json
├── server.js                   # Application entry point
└── README.md
```

## ⚙️ Installation

### Prerequisites

- Node.js (v16 or higher)
- MS SQL Server
- npm or yarn
### Steps

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Copy `.env.example` to `.env` and update the values:
   ```bash
   cp .env.example .env
   ```

   Edit `.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   
   DB_HOST=localhost
   DB_USER=sa
   DB_PASSWORD=YourPassword123
   DB_NAME=DayflowHRMS
   DB_PORT=1433
   
   JWT_SECRET=YourSuperSecretKeyForJWTTokenGeneration12345
   JWT_EXPIRE=7d
   
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Create the database**
   
   Run the SQL script from the project root to create the database and tables:
   ```sql
   CREATE DATABASE DayflowHRMS;
   ```

5. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Test the API**
   
   Visit: `http://localhost:5000/api/health`

## 📚 API Endpoints

> **For detailed testing examples and integration guides, see:**
> - [API Testing Guide](docs/API_TESTING.md) - PowerShell, cURL, and Postman examples
> - [Frontend Integration Guide](docs/FRONTEND_INTEGRATION.md) - React/Vue/Angular code examples

### Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| POST | `/api/auth/forgot-password` | Request password reset | Public |
| PUT | `/api/auth/reset-password/:token` | Reset password with token | Public |

### Profile Management
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/profile` | Get your profile | Private |
| PUT | `/api/profile` | Update your profile | Private |
| POST | `/api/profile/change-password` | Change password | Private |

### Dashboard
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/dashboard/stats` | Get your statistics | Private |
| GET | `/api/dashboard/attendance/today` | Today's attendance | Private |
| GET | `/api/dashboard/leave-balance` | Your leave balance | Private |
| GET | `/api/dashboard/admin/stats` | Admin statistics | Admin/Manager |

### Users (Admin)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/users` | Get all users | Admin |
| GET | `/api/users/:id` | Get user by ID | Admin |
| PUT | `/api/users/:id` | Update user | Admin |
| PUT | `/api/users/:id/status` | Activate/Deactivate user | Admin |

### Attendance
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/attendance` | Mark attendance (check-in) | Private |
| PUT | `/api/attendance/:id` | Update attendance (check-out) | Private |
| GET | `/api/attendance/my` | Get my attendance records | Private |
| GET | `/api/attendance` | Get all attendance | Admin |

### Leave Management
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/leave/apply` | Apply for leave | Private |
| GET | `/api/leave/my` | Get my leave requests | Private |
| GET | `/api/leave/pending` | Get pending requests | Admin/Manager |
| GET | `/api/leave/:leaveId` | Get leave by ID | Private |
| GET | `/api/leave` | Get all leave requests | Admin |
| PUT | `/api/leave/:leaveId/approve` | Approve/Reject leave | Admin |

### Payroll
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/payroll/my` | Get my payroll | Private |
| GET | `/api/payroll` | Get all payrolls | Admin |
| GET | `/api/payroll/user/:userId` | Get user payroll | Admin |
| POST | `/api/payroll/user/:userId` | Create/Update payroll | Admin |
| DELETE | `/api/payroll/:payrollId` | Delete payroll | Admin |

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

### Example Request

```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer your_jwt_token_here"
```

## 📝 API Request Examples

### Register
```json
POST /api/auth/register
{
  "EmployeeCode": "EMP001",
  "FullName": "John Doe",
  "Email": "john@example.com",
  "Password": "password123",
  "Role": "EMPLOYEE"
}
```

### Login
```json
POST /api/auth/login
{
  "Email": "john@example.com",
  "Password": "password123"
}
```

### Apply Leave
```json
POST /api/leave/apply
Authorization: Bearer <token>
{
  "LeaveType": "PAID",
  "StartDate": "2026-01-10",
  "EndDate": "2026-01-12",
  "Reason": "Personal work"
}
```

### Mark Attendance
```json
POST /api/attendance/mark/1
Authorization: Bearer <admin_token>
{
  "AttendanceDate": "2026-01-03",
  "CheckIn": "09:00:00",
  "CheckOut": "18:00:00",
  "Status": "PRESENT"
}
```

## 🗄️ Database Schema

The API uses the following tables:
- **Users** - User authentication & basic info
- **EmployeeProfiles** - Extended employee details
- **Attendance** - Daily attendance records
- **LeaveRequests** - Leave applications & approvals
- **Payroll** - Salary & payroll information

## 🧪 Testing

You can test the API using:
- **Postman** - Import the collection (if provided)
- **Thunder Client** (VS Code extension)
- **cURL** commands
- **Frontend application**

## 🔧 Development

### Available Scripts

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Run tests (when implemented)
npm test
```

### Environment Modes

- **Development**: Detailed error messages and logging
- **Production**: Minimal error exposure

## 🛡️ Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Role-based access control
- Input validation and sanitization
- SQL injection protection (Sequelize ORM)
- CORS configuration

## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "sequelize": "^6.35.2",
  "tedious": "^16.6.1",
  "dotenv": "^16.3.1",
  "cors": "^2.8.5",
  "express-validator": "^7.0.1"
}
```

## 🚀 Deployment

### Prerequisites
- Node.js hosting (Heroku, AWS, Azure, etc.)
- MS SQL Server instance

### Steps
1. Set environment variables on hosting platform
2. Update `DB_HOST` to your production database
3. Set `NODE_ENV=production`
4. Deploy code
5. Run database migrations if needed

## 🐛 Troubleshooting

### Database Connection Issues
- Verify SQL Server is running
- Check connection string in `.env`
- Ensure firewall allows connections
- Verify SQL Server authentication mode

### JWT Token Errors
- Check `JWT_SECRET` is set correctly
- Verify token is sent in Authorization header

## 📄 License

MIT License

## 👥 Authors

Dayflow Team

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ by Dayflow Team**

