# Dayflow HRMS Backend

## Quick Links
- [Setup Guide](docs/SETUP_GUIDE.md) - Complete installation and configuration
- [API Testing](docs/API_TESTING.md) - Test endpoints with examples
- [Frontend Integration](docs/FRONTEND_INTEGRATION.md) - Connect your frontend

<<<<<<< Updated upstream
Every workday, perfectly aligned. 

##  Features

- User Authentication (Register/Login) with JWT
- Role-based Authorization (Admin/Employee)
- Employee Profile Management
- Attendance Tracking (Check-in/Check-out)
- Leave Management System
- Payroll Management
- RESTful API Design
- Input Validation
- Error Handling

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MS SQL Server
- **ORM**: Sequelize
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Environment**: dotenv

## Project Structure

```
backend/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── userController.js    # User management
│   ├── attendanceController.js
│   ├── leaveController.js
│   └── payrollController.js
├── middleware/
│   ├── auth.js             # JWT authentication
│   ├── validator.js        # Input validation
│   └── error.js            # Error handling
├── models/
│   ├── User.js
│   ├── EmployeeProfile.js
│   ├── Attendance.js
│   ├── LeaveRequest.js
│   ├── Payroll.js
│   └── index.js
├── routes/
│   ├── auth.js
│   ├── users.js
│   ├── attendance.js
│   ├── leave.js
│   └── payroll.js
├── utils/
│   └── auth.js             # Auth utilities
├── .env                    # Environment variables
├── .env.example            # Environment template
├── .gitignore
├── package.json
├── server.js               # Application entry point
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

## API Endpoints

### Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user | Private |

### Users
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/users/profile` | Get current user profile | Private |
| PUT | `/api/users/profile` | Update profile | Private |
| GET | `/api/users` | Get all users | Admin |
| GET | `/api/users/:id` | Get user by ID | Admin |
| PUT | `/api/users/:id` | Update user | Admin |

### Attendance
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/attendance/checkin` | Check-in | Private |
| POST | `/api/attendance/checkout` | Check-out | Private |
| GET | `/api/attendance/my` | Get my attendance | Private |
| GET | `/api/attendance` | Get all attendance | Admin |
| GET | `/api/attendance/user/:userId` | Get user attendance | Admin |
| POST | `/api/attendance/mark/:userId` | Mark attendance | Admin |

### Leave Management
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/leave/apply` | Apply for leave | Private |
| GET | `/api/leave/my` | Get my leave requests | Private |
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

##  Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

### Example Request
=======
## Quick Start
>>>>>>> Stashed changes

```bash
# Install dependencies
npm install

<<<<<<< Updated upstream
##  API Request Examples

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

##  Database Schema

The API uses the following tables:
- **Users** - User authentication & basic info
- **EmployeeProfiles** - Extended employee details
- **Attendance** - Daily attendance records
- **LeaveRequests** - Leave applications & approvals
- **Payroll** - Salary & payroll information

## Testing

You can test the API using:
- **Postman** - Import the collection (if provided)
- **Thunder Client** (VS Code extension)
- **cURL** commands
- **Frontend application**

##  Development

### Available Scripts

```bash
# Start development server with auto-reload
=======
# Configure environment
copy .env.example .env
# Edit .env with your settings

# Start development server
>>>>>>> Stashed changes
npm run dev
```

Visit: http://localhost:5000/api/health

## Features

<<<<<<< Updated upstream
## Security Features
=======
✅ JWT Authentication & Authorization  
✅ Password Reset with Email  
✅ Profile & Dashboard Management  
✅ Attendance Tracking  
✅ Leave Management  
✅ Payroll System  
✅ Admin Controls  
✅ Rate Limiting & Security  
>>>>>>> Stashed changes

## Documentation

<<<<<<< Updated upstream
## Dependencies

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

##  Deployment

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

##  License

MIT License

##  Authors

Dayflow Team

##  Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

##  Support

For issues or questions, please create an issue in the repository.
=======
📖 **[Full README](README_FULL.md)** - Complete documentation
>>>>>>> Stashed changes

---

*Every workday, perfectly aligned.* ✨
