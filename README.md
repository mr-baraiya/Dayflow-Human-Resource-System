<div align="center">

# Odoo x GCET Hackathon '26

### *Official Repository for Odoo x GCET Hackathon 2026 – Virtual Round*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/your-repo/graphs/commit-activity)

---

### Team Members

| Name | Role |
|------|------|
| **Vishal Baraiya** | Team Leader, Database Designer & Backend Developer |
| **Pujan Ajmera** | Frontend UI , Layout making & API Integration|
| **Haresh Zapadiya** | Frontend Components, UX & Accessibility |
| **Dhruvrajsinh Zala** | Testing & Documentation |

**Mentor**: Dishant Mistry (Odoo)

---

</div>

## About the Project

**Dayflow - Human Resource Management System**

*Every workday, perfectly aligned.*

This repository contains **Dayflow HRMS**, a comprehensive Human Resource Management System developed by our team for the **Odoo x GCET Hackathon 2026 Virtual Round**. Dayflow aims to digitize and streamline core HR operations, making employee management, attendance tracking, leave management, and payroll processes seamless and efficient.

### Competition Details

- **Event**: Odoo x GCET Hackathon 2026
- **Round**: Virtual Round
- **Institution**: GCET (Government College of Engineering and Technology)
- **Date**: January 2026
- **Project**: Dayflow HRMS

---

## Problem Statement

**Human Resource Management System (HRMS)**

**Objective**: Design and develop a comprehensive HRMS solution that digitizes and streamlines core HR operations including employee onboarding, profile management, attendance tracking, leave management, payroll visibility, and approval workflows.

**Key Requirements**:
- [x] Secure authentication (Sign Up / Sign In)
- [x] Role-based access control (Admin vs Employee)
- [x] Employee profile management
- [x] Attendance tracking with daily/weekly views
- [x] Leave and time-off management
- [x] Approval workflows for HR/Admin
- [x] Payroll visibility system
---

## Solution Overview

Dayflow HRMS leverages modern web technologies to deliver a robust, scalable, and user-friendly HR management solution. The system provides separate interfaces for employees and administrators, ensuring role-appropriate access and functionality.

### Core Focus Areas

- **User Experience**: Intuitive dashboard design with role-based interfaces
- **Security**: JWT-based authentication with password hashing and role-based authentication 
- **Efficiency**: Streamlined workflows for attendance, leave requests, and approvals
- **Transparency**: Real-time visibility of attendance, leave status, and payroll information
- **Scalability**: Modular architecture supporting multiple departments and designations
- **Data Integrity**: Normalized database schema with foreign key constraints
- **Responsive Design**: Mobile-first approach for on-the-go HR management

### Architecture Highlights

- **Frontend**: Component-based React architecture with state management
- **Backend**: Node.js/Express RESTful API with MVC architecture
- **Database**: PostgreSQL/MySQL with comprehensive HRMS schema
- **Authentication**: JWT token-based authentication with role-based access control
- **Middleware**: Custom middleware for authentication, validation, and error handling
- **Routes & Controllers**: Clean separation of routing and business logic

---

## Key Features

### Core Features

**Authentication & Authorization**
- Secure Sign Up and Sign In with email verification
- Password security with hashing
- Role-based access control (Admin, HR, Employee)
- JWT token-based authentication

**Employee Dashboard**
- Quick-access cards for Profile, Attendance, and Leave Requests
- Recent activity alerts and notifications
- Personalized view based on user role

**Admin/HR Dashboard**
- Complete employee list management
- Attendance records overview
- Leave approval workflow
- Cross-employee data access

**Employee Profile Management**
- View personal details, job information, and salary structure
- Upload and manage profile pictures
- Edit permitted fields (address, phone)
- Document management system

**Attendance Management**
- Daily and weekly attendance views
- Check-in/Check-out functionality
- Multiple status types: Present, Absent, Half-day, Leave
- Role-based attendance visibility

**Leave & Time-Off Management**
- Apply for different leave types (Paid, Sick, Unpaid)
- Date range selection with remarks
- Leave request status tracking (Pending, Approved, Rejected)
- Admin approval workflow with comments

**Payroll Management**
- Read-only salary structure for employees
- Admin control for payroll updates
- Complete payroll visibility and management

### Technical Features

- Modern, responsive UI with React and Tailwind CSS
- Secure JWT authentication and authorization
- RESTful API design with proper HTTP methods
- Entity Framework Core for database operations
- Layered architecture (Controllers, Services, Models, DTOs)
- Comprehensive input validation
- Foreign key constraints for data integrity
- Clean and maintainable codebase
- Swagger/OpenAPI documentation

---

## Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

### Backend
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

### Database
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

### Tools & Others
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![VS Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

</div>

### Detailed Stack

**Frontend Technologies**
- **React** - Component-based UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript** - Programming language
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **State Management** - Zustand

**Backend Technologies**
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **JavaScript** - Programming language
- **Sequelize** / **Prisma** - ORM for database operations
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing
- **express-validator** - Input validation
- **Swagger/OpenAPI** - API documentation
- **CORS** - Cross-origin resource sharing

**Database & Storage**
- **PostgreSQL** / **MySQL** - Relational database
- **Sequelize** / **Prisma** - Object-relational mapping
- **SQL Schema** - Comprehensive HRMS data model
- **node-postgres (pg)** - PostgreSQL client

**Development Tools**
- **Git** - Version control
- **VS Code** - Code editor
- **Postman** - API testing
- **npm/yarn** - Package management
- **nodemon** - Development auto-reload
- **ESLint** - Code linting

---

## Project Structure

```
odoo-x-gcet-hackathon-26/
├── backend/                         # Node.js/Express Backend API
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js        # Authentication endpoints
│   │   │   ├── userController.js        # User management
│   │   │   ├── attendanceController.js  # Attendance tracking
│   │   │   ├── leaveController.js       # Leave management
│   │   │   └── payrollController.js     # Payroll operations
│   │   ├── models/
│   │   │   ├── User.js                  # User model
│   │   │   ├── Employee.js              # Employee model
│   │   │   ├── Attendance.js            # Attendance model
│   │   │   ├── LeaveRequest.js          # Leave model
│   │   │   └── Payroll.js               # Payroll model
│   │   ├── routes/
│   │   │   ├── authRoutes.js            # Auth routes
│   │   │   ├── userRoutes.js            # User routes
│   │   │   ├── attendanceRoutes.js      # Attendance routes
│   │   │   ├── leaveRoutes.js           # Leave routes
│   │   │   └── payrollRoutes.js         # Payroll routes
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js        # JWT authentication
│   │   │   ├── roleMiddleware.js        # Role-based access
│   │   │   └── validationMiddleware.js  # Input validation
│   │   ├── config/
│   │   │   ├── database.js              # Database config
│   │   │   └── jwt.js                   # JWT config
│   │   └── utils/
│   │       ├── errorHandler.js          # Error handling
│   │       └── helpers.js               # Helper functions
│   ├── .env.example                 # Environment template
│   ├── package.json                 # Dependencies
│   ├── server.js                    # Entry point
│   └── README.md
│
├── frontend/                        # React Frontend Application
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   ├── pages/                   # Page components
│   │   │   ├── Dashboard/           # Dashboard views
│   │   │   ├── Profile/             # Profile management
│   │   │   ├── Attendance/          # Attendance views
│   │   │   ├── Leave/               # Leave management
│   │   │   └── Auth/                # Login/Register
│   │   ├── services/                # API integration
│   │   ├── context/                 # State management
│   │   ├── utils/                   # Utility functions
│   │   └── styles/                  # Global styles
│   ├── public/                      # Static assets
│   ├── package.json
│   └── README.md
│
├── database/                        # Database Schema & Seed Data
│   ├── dayflow_hrms.sql             # Complete schema
│   ├── dayflow_hrms_seed.sql        # Sample data
│   └── README.md                    # Database documentation
│
├── docs/                            # Documentation
│   └── README.md                    # Project documentation
│
├── demo/                            # Demo files & screenshots
│   └── README.md
│
├── .gitignore
├── .gitattributes
├── LICENSE
└── README.md                        # You are here!
```

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (v16.x or higher)
  ```bash
  node --version
  ```

- **npm** or **yarn**
  ```bash
  npm --version
  # or
  yarn --version
  ```

- **PostgreSQL 12+** or **MySQL 8.0+**
  ```bash
  psql --version
  # or
  mysql --version
  ```

- **Visual Studio 2022** or **VS Code** with C# extension

- **Git**
  ```bash
  git --version
  ```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/odoo-x-gcet-hackathon-26.git
   cd odoo-x-gcet-hackathon-26
   ```

2. **Database Setup**
   ```bash
   # For PostgreSQL
   psql -U postgres
   CREATE DATABASE dayflow_hrms;
   \q
   
   # Import schema
   cd database
   psql -U postgres -d dayflow_hrms -f dayflow_hrms.sql
   
   # Load seed data (optional)
   psql -U postgres -d dayflow_hrms -f dayflow_hrms_seed.sql
   ```

3. **Backend Setup**
   ```bash
   cd backend
   npm install
   # or
   yarn install
   ```

4. **Configure Backend Environment**
   
   Create `.env` file in backend directory:
   ```env
   PORT=5000
   NODE_ENV=development
   
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=dayflow_hrms
   DB_USER=postgres
   DB_PASSWORD=yourpassword
   
   # JWT Configuration
   JWT_SECRET=your-secret-key-minimum-32-characters
   JWT_EXPIRES_IN=1h
   
   # CORS
   CORS_ORIGIN=http://localhost:3000
   ```

5. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   # or
   yarn install
   ```

6. **Configure Frontend Environment**
   
   Create `.env` file in frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

### Running the Application

#### Development Mode

1. **Start Backend API**
   ```bash
   cd backend
   npm run dev
   # API will run on http://localhost:5000
   ```

2. **Start Frontend Application** (in a new terminal)
   ```bash
   cd frontend
   npm start
   # Application will run on http://localhost:3000
   ```

3. **Access the Application**
   
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

4. **Access API Documentation**
   
   Swagger UI (if configured) is available at:
   ```
   http://localhost:5000/api-docs
   ```

#### Production Mode

```bash
# Build frontend
cd frontend
npm run build

# Start backend in production
cd ../backend
NODE_ENV=production npm start
```

---

## Usage

### Basic Workflow

**For Employees:**

1. **Sign Up / Sign In**
   - Register with Employee ID, email, and password
   - Verify email and login
   - Access employee dashboard

2. **View Profile**
   - View personal details, job information, and salary structure
   - Edit permitted fields (address, phone, profile picture)
   - Upload documents

3. **Mark Attendance**
   - Use check-in/check-out functionality
   - View daily and weekly attendance records
   - Track attendance status

4. **Apply for Leave**
   - Select leave type (Paid, Sick, Unpaid)
   - Choose date range and add remarks
   - Track leave request status (Pending, Approved, Rejected)

5. **View Payroll**
   - Access salary structure (read-only)
   - View allowances and deductions

**For Admin/HR:**

1. **Dashboard Access**
   - View complete employee list
   - Access attendance records of all employees
   - Monitor leave requests

2. **Employee Management**
   - Edit employee profiles
   - Update job details and salary structure
   - Manage employee status

3. **Attendance Management**
   - View attendance of all employees
   - Generate attendance reports

4. **Leave Approval**
   - Review leave requests
   - Approve or reject with comments
   - Track leave history

5. **Payroll Management**
   - Update salary structures
   - Manage allowances and deductions
   - Ensure payroll accuracy

### API Endpoints

For detailed API documentation, visit [API Docs](http://localhost:5000/api-docs) (if Swagger is configured)

**Base URL**: `http://localhost:5000/api`

**Authentication Endpoints**:
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token

**User Management**:
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user (Admin only)

**Attendance Management**:
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance/checkin` - Clock in
- `POST /api/attendance/checkout` - Clock out
- `GET /api/attendance/employee/{id}` - Get employee attendance

**Leave Management**:
- `GET /api/leave` - Get all leave requests
- `GET /api/leave/{id}` - Get leave request by ID
- `POST /api/leave` - Submit leave request
- `PUT /api/leave/{id}/approve` - Approve leave (HR/Admin)
- `PUT /api/leave/{id}/reject` - Reject leave (HR/Admin)
- `GET /api/leave/employee/{id}` - Get employee leave history

**Payroll Management**:
- `GET /api/payroll` - Get all payroll records
- `GET /api/payroll/employee/{id}` - Get employee payroll
- `POST /api/payroll` - Create payroll entry (Admin/HR)
- `PUT /api/payroll/{id}` - Update payroll (Admin/HR)
- `GET /api/payroll/calculate/{employeeId}` - Calculate salary

---

## Demo

### Screenshots

*Screenshots will be added here*

### Video Demonstration

**[Demo Video Link]** (Public/Unlisted, max 5 minutes)

*Video link will be added during the hackathon submission*

### Live Demo

**[Live Application Link]** (if deployed)

---

## Roadmap

**Completed Features:**
- [x] Project setup and initialization
- [x] Database schema design (9 tables with relationships)
- [x] Backend API structure (Controllers, Services, Models, DTOs)
- [x] Authentication system (JWT-based)
- [x] Role-based access control
- [x] Employee profile management
- [x] Attendance tracking system
- [x] Leave management with approval workflow
- [x] Payroll management system
- [x] Documentation (Database, Backend, Frontend)

**In Progress:**
- [ ] Frontend UI components
- [ ] API integration with frontend
- [ ] Testing and debugging

**Future Enhancements:**
- [ ] Email & notification alerts
- [ ] Analytics & reports dashboard
- [ ] Salary slip generation
- [ ] Attendance reports export
- [ ] Mobile responsive improvements
- [ ] Advanced filtering and search
- [ ] Multi-language support
- [ ] Demo video creation
- [ ] Deployment to cloud platform

See the [open issues](https://github.com/your-username/odoo-x-gcet-hackathon-26/issues) for a list of proposed features and known issues.

**Design Reference**: [Excalidraw Diagram](https://link.excalidraw.com/l/65VNwvy7c4X/58RLEJ4oOwh)

---

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed
- Test your changes before submitting

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- **Odoo** - For organizing this amazing hackathon
- **GCET** - For providing the platform and support
- **Our Mentor** - For guidance and support throughout the hackathon
- **Open Source Community** - For the amazing tools and libraries
- **Stack Overflow** - For being there when we needed help

---

## Contact

**Project Link**: [https://github.com/your-username/odoo-x-gcet-hackathon-26](https://github.com/your-username/odoo-x-gcet-hackathon-26)

**Team Leader**: Vishal Baraiya - [baraiyavishalbhai32@gmail.com](mailto:baraiyavishalbhai32@gmail.com)

---

<div align="center">

### Don't forget to star this repository if you found it helpful!

**Made by Team TechTitans**

**Odoo x GCET Hackathon 2026**

</div>
