# DayFlow HRMS - Frontend

Modern HR Management System frontend built with React and Vite.

## Tech Stack

- **React 19** - UI library
- **JavaScript** - Programming language
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible components
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Axios** - HTTP client

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── store/          # Zustand state stores
├── lib/            # Utility functions
└── assets/         # Static assets
```

## Features

- 🔐 Authentication (Login/Register)
- 👤 User Profile Management
- ⏰ Attendance Tracking
- 📝 Leave Management
- 👥 Employee Directory
- 🔧 Admin Dashboard
- 👨‍💼 User Management (Admin)

## Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:3000/api
```

## Available Routes

- `/login` - Login page
- `/register` - Registration page
- `/` - Dashboard (protected)
- `/profile` - User profile (protected)
- `/attendance` - Attendance tracking (protected)
- `/leave` - Leave requests (protected)
- `/admin` - Admin dashboard (protected)
- `/users` - User management (protected, admin only)
- `/directory` - Employee directory (protected)
