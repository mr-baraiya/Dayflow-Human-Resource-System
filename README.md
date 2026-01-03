<div align="center">

# Dayflow HRMS
### *Human Resource Management System*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

**Odoo x GCET Hackathon 2026 – Virtual Round**

| Team Member | Role |
|-------------|------|
| Vishal Baraiya | Team Leader, Backend & Database |
| Pujan Ajmera | Frontend & API Integration |
| Haresh Zapadiya | Frontend & UX |
| Dhruvrajsinh Zala | Testing & Documentation |

**Mentor**: Dishant Mistry (Odoo)

</div>

## About

Dayflow HRMS is a comprehensive Human Resource Management System that digitizes and streamlines core HR operations. Developed for the Odoo x GCET Hackathon 2026, it provides separate interfaces for employees and administrators with role-appropriate access and functionality.

## Features

### For Employees
- **Secure Authentication** - JWT-based login with password hashing
- **Profile Management** - View and update personal details, job info, and documents
- **Attendance Tracking** - Check-in/Check-out with daily and weekly views
- **Leave Management** - Apply for leaves (Paid/Sick/Unpaid) and track status
- **Payroll Visibility** - View salary structure, allowances, and deductions

### For Admin/HR
- **Employee Management** - Complete employee directory and profile control
- **Dashboard Overview** - Real-time attendance and leave statistics
- **Approval Workflows** - Review and approve/reject leave requests with comments
- **Payroll Management** - Update salary structures and manage compensation
- **Reports & Analytics** - Generate attendance and leave reports

## Tech Stack

![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat-square&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat-square&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=flat-square&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=flat-square&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=flat-square&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=flat-square&logo=JSON%20web%20tokens)


## Quick Start

### Prerequisites
- Node.js 16+
- PostgreSQL 12+ or MySQL 8.0+
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/mr-baraiya/Dayflow-Human-Resource-System.git
cd odoo-x-gcet-hackathon-26

# Database setup
createdb dayflow_hrms
psql dayflow_hrms < database/dayflow_hrms.sql
psql dayflow_hrms < database/dayflow_hrms_seed.sql

# Backend setup
cd backend
npm install
cp .env.example .env  # Configure your environment variables
npm run dev  # Runs on http://localhost:5000

# Frontend setup (new terminal)
cd frontend
npm install
npm start  # Runs on http://localhost:3000
```

### Environment Variables

**Backend (.env)**:
```env
PORT=5000
DB_HOST=localhost
DB_NAME=dayflow_hrms
DB_USER=postgres
DB_PASSWORD=yourpassword
JWT_SECRET=your-secret-key-min-32-chars
CORS_ORIGIN=http://localhost:3000
```

**Frontend (.env)**:
```env
REACT_APP_API_URL=http://localhost:5000/api
```


## API Endpoints

**Base URL**: `http://localhost:5000/api`

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/register` | POST | Register new user |
| `/auth/login` | POST | User login |
| `/users` | GET | Get all users (Admin) |
| `/users/:id` | GET/PUT/DELETE | User operations |
| `/attendance` | GET/POST | Attendance records |
| `/attendance/checkin` | POST | Clock in |
| `/attendance/checkout` | POST | Clock out |
| `/leave` | GET/POST | Leave requests |
| `/leave/:id/approve` | PUT | Approve leave (HR/Admin) |
| `/leave/:id/reject` | PUT | Reject leave (HR/Admin) |
| `/payroll` | GET/POST | Payroll management |
| `/payroll/:id` | PUT | Update payroll |

Full API documentation: See [backend/docs](backend/docs/API_TESTING.md)

## Screenshots

<div align="center">

*Screenshots will be added here showcasing:*
- Login/Register pages
- Employee & Admin dashboards
- Attendance tracking interface
- Leave management system
- Profile management

</div>

## Demo

- **Demo Video**: [Coming soon]
- **Live Demo**: [Coming soon]

## Project Structure

```
odoo-x-gcet-hackathon-26/
├── backend/           # Node.js/Express API
│   ├── controllers/   # Request handlers
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── middleware/    # Auth, validation, error handling
│   └── config/        # Configuration files
├── frontend/          # React application
│   └── src/
│       ├── components/  # Reusable UI components
│       ├── pages/       # Page components
│       └── store/       # State management
├── database/          # SQL schemas and seed data
└── docs/             # Documentation
```

## Roadmap

- [x] Database schema design with relationships
- [x] Backend API with MVC architecture
- [x] JWT authentication & authorization
- [x] Role-based access control
- [x] Attendance management system
- [x] Leave management with approvals
- [x] Payroll management
- [x] Frontend UI with React & Tailwind
- [ ] Email notifications
- [ ] Advanced reporting & analytics
- [ ] Mobile app version

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/Feature`)
3. Commit changes (`git commit -m 'Add Feature'`)
4. Push to branch (`git push origin feature/Feature`)
5. Open a Pull Request

## Acknowledgments

- **Odoo** - For organizing the hackathon
- **GCET** - For platform and support
- **Dishant Mistry** - Our mentor for guidance

## License

MIT License - see [LICENSE](LICENSE) file

## Contact

**Repository**: [github.com/mr-baraiya/Dayflow-Human-Resource-System](https://github.com/mr-baraiya/Dayflow-Human-Resource-System)

**Team Leader**: Vishal Baraiya - baraiyavishalbhai32@gmail.com

---

<div align="center">

**Made for Odoo x GCET Hackathon 2026**

[Design Reference](https://link.excalidraw.com/l/65VNwvy7c4X/58RLEJ4oOwh)

</div>
