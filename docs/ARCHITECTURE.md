# Architecture Documentation

## System Architecture

Dayflow HRMS follows a modern three-tier architecture with clear separation of concerns between the presentation layer, business logic layer, and data access layer.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Layer                           │
│  (React + TypeScript + Vite + Tailwind CSS + shadcn/ui)   │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/HTTPS (REST API)
                     │ JSON Data Exchange
┌────────────────────▼────────────────────────────────────────┐
│                   Backend Layer                             │
│           (Node.js + Express + JWT)                        │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Routes Layer                                         │  │
│  │  /api/auth, /api/users, /api/attendance, etc.       │  │
│  └──────────────────┬────────────────────────────────────┘  │
│                     │                                        │
│  ┌──────────────────▼────────────────────────────────────┐  │
│  │  Middleware Layer                                     │  │
│  │  - Authentication (JWT Verification)                 │  │
│  │  - Authorization (Role-based Access)                 │  │
│  │  - Validation (Request Data Validation)             │  │
│  │  - Error Handling                                    │  │
│  └──────────────────┬────────────────────────────────────┘  │
│                     │                                        │
│  ┌──────────────────▼────────────────────────────────────┐  │
│  │  Controller Layer                                     │  │
│  │  - Business Logic                                     │  │
│  │  - Request Processing                                 │  │
│  │  - Response Formatting                                │  │
│  └──────────────────┬────────────────────────────────────┘  │
│                     │                                        │
│  ┌──────────────────▼────────────────────────────────────┐  │
│  │  Model Layer (Sequelize ORM)                        │  │
│  │  - Data Models & Schema                              │  │
│  │  - Database Operations                               │  │
│  │  - Relationships & Associations                      │  │
│  └──────────────────┬────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────────┘
                     │ SQL Queries
                     │ Database Connections
┌────────────────────▼────────────────────────────────────────┐
│                   Data Layer                                │
│          (PostgreSQL/MySQL/MSSQL)                          │
│                                                             │
│  Tables: Users, EmployeeProfiles, Attendance,             │
│          LeaveRequests, Payroll, Departments, etc.        │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: Zustand 5.0.9
- **Routing**: React Router DOM 7.11.0
- **Form Management**: React Hook Form 7.69.0
- **Validation**: Zod 4.3.4
- **HTTP Client**: Axios 1.13.2
- **Icons**: Lucide React 0.562.0
- **Date Utilities**: date-fns 4.1.0

### Backend
- **Runtime**: Node.js
- **Framework**: Express 4.18.2
- **Language**: JavaScript (ES6+)
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Password Hashing**: bcryptjs 2.4.3
- **ORM**: Sequelize 6.35.2
- **Database Driver**: tedious 16.6.1 (MSSQL)
- **Validation**: express-validator 7.0.1
- **Email Service**: Nodemailer 7.0.12
- **CORS**: cors 2.8.5
- **Environment Variables**: dotenv 16.3.1

### Database
- **Primary Support**: PostgreSQL / MySQL / MSSQL
- **ORM**: Sequelize (Multi-database support)
- **Schema**: Normalized relational database

## Frontend Architecture

### Directory Structure

```
frontend/src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (shadcn/ui)
│   ├── DashboardLayout.tsx
│   ├── Header.tsx
│   └── Sidebar.tsx
├── pages/              # Page components (Routes)
│   ├── auth/           # Authentication pages
│   ├── Dashboard.tsx
│   ├── AdminDashboard.tsx
│   ├── AttendancePage.tsx
│   ├── LeavePage.tsx
│   ├── ProfilePage.tsx
│   ├── EmployeeDirectoryPage.tsx
│   └── UserManagementPage.tsx
├── store/              # State management (Zustand)
│   └── authStore.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── lib/                # Utility functions
│   └── utils.ts
├── assets/             # Static assets (images, icons)
├── App.tsx             # Root component
└── main.tsx            # Application entry point
```

### Component Architecture

**Atomic Design Principles:**
1. **Atoms**: Basic UI components (Button, Input, Label, etc.)
2. **Molecules**: Combinations of atoms (Form fields, Cards)
3. **Organisms**: Complex components (Header, Sidebar, Forms)
4. **Templates**: Page layouts (DashboardLayout)
5. **Pages**: Complete views with data and logic

### State Management

**Zustand Store Structure:**
```typescript
authStore:
- user: User | null
- token: string | null
- isAuthenticated: boolean
- login(user, token)
- logout()
- updateUser(user)
```

### Routing Structure

```
/ → LoginPage
/register → RegisterPage
/dashboard → Dashboard (Protected)
/admin-dashboard → AdminDashboard (Admin Only)
/attendance → AttendancePage (Protected)
/leave → LeavePage (Protected)
/profile → ProfilePage (Protected)
/employees → EmployeeDirectoryPage (Protected)
/users → UserManagementPage (Admin Only)
```

## Backend Architecture

### MVC Pattern

**Model-View-Controller Architecture:**

1. **Models** (`models/`):
   - Define database schema and relationships
   - Handle data validation
   - Provide query methods
   - Sequelize ORM models

2. **Controllers** (`controllers/`):
   - Process business logic
   - Handle request validation
   - Interact with models
   - Format responses

3. **Routes** (`routes/`):
   - Define API endpoints
   - Apply middleware
   - Map URLs to controllers

### Directory Structure

```
backend/
├── config/              # Configuration files
│   └── database.js      # Database connection config
├── controllers/         # Business logic layer
│   ├── authController.js
│   ├── userController.js
│   ├── attendanceController.js
│   ├── leaveController.js
│   └── payrollController.js
├── middleware/          # Middleware functions
│   ├── auth.js          # JWT verification & authorization
│   ├── validator.js     # Request validation
│   └── error.js         # Error handling
├── models/              # Data models (Sequelize)
│   ├── User.js
│   ├── EmployeeProfile.js
│   ├── Attendance.js
│   ├── LeaveRequest.js
│   ├── Payroll.js
│   └── index.js         # Model associations
├── routes/              # API routes
│   ├── auth.js
│   ├── users.js
│   ├── attendance.js
│   ├── leave.js
│   └── payroll.js
├── utils/               # Utility functions
│   ├── auth.js          # Token generation & hashing
│   └── sendEmail.js     # Email service
└── server.js            # Application entry point
```

### Middleware Pipeline

**Request Flow:**
```
Incoming Request
    ↓
CORS Middleware
    ↓
Body Parser
    ↓
Route Matching
    ↓
Authentication Middleware (if protected route)
    ↓
Authorization Middleware (role-based)
    ↓
Validation Middleware
    ↓
Controller
    ↓
Model/Database
    ↓
Response Formatting
    ↓
Error Handling Middleware (if error)
    ↓
Client Response
```

### Authentication & Authorization

**JWT-based Authentication Flow:**

1. User provides credentials (email/password)
2. Server validates credentials
3. Server generates JWT token with user payload
4. Client stores token (localStorage/sessionStorage)
5. Client sends token in Authorization header
6. Server validates token on protected routes
7. Server checks user role for authorization

**JWT Payload Structure:**
```javascript
{
  userId: number,
  email: string,
  role: 'admin' | 'hr' | 'employee',
  iat: timestamp,
  exp: timestamp
}
```

### API Design Principles

**RESTful API Standards:**
- Use HTTP methods correctly (GET, POST, PUT, DELETE)
- Resource-based URLs (`/api/users/:id`)
- Use plural nouns for collections (`/api/users`)
- Use HTTP status codes appropriately
- Return consistent response format
- Version API if needed (`/api/v1/`)

**Response Format:**
```javascript
// Success Response
{
  success: true,
  data: {...}
}

// Error Response
{
  success: false,
  error: "Error message",
  details: [...]
}
```

## Database Architecture

### Schema Design

**Normalized Relational Database:**

**Core Tables:**
1. **Users**: Authentication and role management
2. **EmployeeProfiles**: Personal and professional details
3. **Departments**: Organizational structure
4. **Attendance**: Daily attendance records
5. **LeaveRequests**: Leave applications and approvals
6. **Payroll**: Salary and payment information

**Relationships:**
```
Users (1) ──── (1) EmployeeProfiles
EmployeeProfiles (N) ──── (1) Departments
EmployeeProfiles (1) ──── (N) Attendance
EmployeeProfiles (1) ──── (N) LeaveRequests
EmployeeProfiles (1) ──── (N) Payroll
```

### Key Design Decisions

**Foreign Key Constraints:**
- Maintain referential integrity
- CASCADE on delete for dependent records
- Prevent orphaned records

**Indexes:**
- Primary keys (UserId, EmployeeId, etc.)
- Foreign keys (EmployeeId in related tables)
- Unique constraints (Email, EmployeeCode)
- Search fields (Name, Department)

**Data Types:**
- DATETIME for timestamps (CreatedAt, UpdatedAt)
- DECIMAL for monetary values (Salary, Deductions)
- VARCHAR with appropriate lengths
- ENUM for status fields (Active/Inactive, Approved/Pending/Rejected)

## Security Architecture

### Authentication Security
- Password hashing with bcryptjs (salt rounds: 10)
- JWT tokens with expiration (24 hours)
- Secure token storage (httpOnly cookies recommended)
- Password reset with time-limited tokens

### Authorization
- Role-based access control (RBAC)
- Three roles: Admin, HR, Employee
- Route-level protection
- Resource-level permission checks

### Data Security
- SQL injection prevention (Sequelize ORM parameterization)
- XSS protection (Input sanitization)
- CORS configuration (Allowed origins)
- Environment variable protection (.env)

### API Security
- Rate limiting (recommended)
- Request validation (express-validator)
- Error message sanitization (no sensitive data)
- HTTPS in production (recommended)

## Scalability Considerations

### Horizontal Scalability
- Stateless API design (JWT tokens)
- No server-side session storage
- Load balancer ready

### Database Scalability
- Connection pooling (Sequelize)
- Indexed queries
- Pagination support
- Query optimization

### Performance Optimization
- Lazy loading of components (React.lazy)
- Code splitting (Vite)
- API response caching (recommended)
- Database query optimization
- CDN for static assets (production)

## Development Workflow

### Local Development
1. Backend runs on `http://localhost:5000`
2. Frontend runs on `http://localhost:5173`
3. CORS enabled for local development
4. Hot module replacement (HMR) for frontend
5. Nodemon for backend auto-restart

### Environment Configuration
```
Development: .env.development
Production: .env.production
Testing: .env.test
```

## Deployment Architecture

### Recommended Production Setup

**Frontend:**
- Build with Vite (`npm run build`)
- Deploy to CDN or static hosting (Vercel, Netlify, AWS S3)
- Environment variables in build config

**Backend:**
- Deploy to Node.js hosting (AWS EC2, DigitalOcean, Heroku)
- Use process manager (PM2)
- Environment variables in production config
- HTTPS with SSL certificate

**Database:**
- Managed database service (AWS RDS, Azure SQL)
- Regular backups
- Monitoring and logging

## Monitoring & Logging

### Recommended Tools
- **Application Monitoring**: New Relic, DataDog
- **Error Tracking**: Sentry
- **Logging**: Winston, Morgan
- **Database Monitoring**: Database-specific tools
- **Uptime Monitoring**: Pingdom, UptimeRobot

## Future Enhancements

### Technical Improvements
- GraphQL API option
- WebSocket for real-time updates
- Redis for caching
- Message queue for async operations
- Microservices architecture
- Docker containerization
- Kubernetes orchestration

### Feature Additions
- Mobile app (React Native)
- Advanced analytics dashboard
- AI-powered insights
- Integration with third-party services
- Automated workflows
- Document management
- Performance review system

## References

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Sequelize Documentation](https://sequelize.org/)
- [JWT Introduction](https://jwt.io/introduction)
- [REST API Best Practices](https://restfulapi.net/)
