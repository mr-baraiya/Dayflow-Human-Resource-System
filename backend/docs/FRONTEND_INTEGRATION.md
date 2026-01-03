# Frontend Integration Guide

Guide for integrating Dayflow HRMS APIs with your frontend application (React, Angular, Vue, etc.)

## Table of Contents
- [Setup](#setup)
- [Authentication](#authentication)
- [API Service Examples](#api-service-examples)
- [React Examples](#react-examples)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)

---

## Setup

### Base Configuration

```javascript
// config/api.js
export const API_BASE_URL = 'http://localhost:5000/api';

// Helper to get auth headers
export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};
```

### Axios Setup (Recommended)

```bash
npm install axios
```

```javascript
// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses and errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default api;
```

---

## Authentication

### Auth Service

```javascript
// services/authService.js
import api from './api';

export const authService = {
  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response;
  },

  // Login
  login: async (email, password) => {
    const response = await api.post('/auth/login', { Email: email, Password: password });
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  // Forgot password
  forgotPassword: async (email) => {
    return await api.post('/auth/forgot-password', { Email: email });
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    return await api.put(`/auth/reset-password/${token}`, { Password: newPassword });
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};
```

---

## API Service Examples

### Profile Service

```javascript
// services/profileService.js
import api from './api';

export const profileService = {
  // Get profile
  getProfile: async () => {
    return await api.get('/profile');
  },

  // Update profile
  updateProfile: async (data) => {
    return await api.put('/profile', data);
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    return await api.post('/profile/change-password', {
      currentPassword,
      newPassword
    });
  }
};
```

### Dashboard Service

```javascript
// services/dashboardService.js
import api from './api';

export const dashboardService = {
  // Get user stats
  getStats: async () => {
    return await api.get('/dashboard/stats');
  },

  // Get today's attendance
  getTodayAttendance: async () => {
    return await api.get('/dashboard/attendance/today');
  },

  // Get leave balance
  getLeaveBalance: async () => {
    return await api.get('/dashboard/leave-balance');
  },

  // Get admin stats (Admin/Manager only)
  getAdminStats: async () => {
    return await api.get('/dashboard/admin/stats');
  }
};
```

### Attendance Service

```javascript
// services/attendanceService.js
import api from './api';

export const attendanceService = {
  // Mark attendance (check-in)
  checkIn: async (date = new Date().toISOString().split('T')[0]) => {
    return await api.post('/attendance', {
      Date: date,
      CheckInTime: new Date().toTimeString().split(' ')[0],
      Status: 'PRESENT'
    });
  },

  // Update attendance (check-out)
  checkOut: async (attendanceId) => {
    return await api.put(`/attendance/${attendanceId}`, {
      CheckOutTime: new Date().toTimeString().split(' ')[0]
    });
  },

  // Get my attendance records
  getMyAttendance: async () => {
    return await api.get('/attendance/my');
  },

  // Get all attendance (Admin only)
  getAllAttendance: async () => {
    return await api.get('/attendance');
  }
};
```

### Leave Service

```javascript
// services/leaveService.js
import api from './api';

export const leaveService = {
  // Apply for leave
  applyLeave: async (leaveData) => {
    return await api.post('/leave/apply', leaveData);
  },

  // Get my leave requests
  getMyLeaves: async () => {
    return await api.get('/leave/my');
  },

  // Get pending leaves (Admin/Manager)
  getPendingLeaves: async () => {
    return await api.get('/leave/pending');
  },

  // Approve/reject leave (Admin)
  updateLeaveStatus: async (leaveId, status) => {
    return await api.put(`/leave/${leaveId}/approve`, { Status: status });
  }
};
```

### User Service

```javascript
// services/userService.js
import api from './api';

export const userService = {
  // Get all users (Admin only)
  getAllUsers: async () => {
    return await api.get('/users');
  },

  // Get user by ID (Admin only)
  getUserById: async (userId) => {
    return await api.get(`/users/${userId}`);
  },

  // Update user status (Admin only)
  updateUserStatus: async (userId, isActive) => {
    return await api.put(`/users/${userId}/status`, { isActive });
  },

  // Update user (Admin only)
  updateUser: async (userId, userData) => {
    return await api.put(`/users/${userId}`, userData);
  }
};
```

---

## React Examples

### Login Component

```jsx
// components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default Login;
```

### Dashboard Component

```jsx
// components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { dashboardService } from '../services/dashboardService';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await dashboardService.getStats();
      setStats(response.data);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <div className="stats-grid">
        {/* Attendance Stats */}
        <div className="stat-card">
          <h3>Attendance This Month</h3>
          <p>{stats?.attendance?.thisMonth || 0} days</p>
          {stats?.attendance?.today && (
            <div>
              <p>Today: Checked in at {new Date(stats.attendance.today.checkIn).toLocaleTimeString()}</p>
            </div>
          )}
        </div>

        {/* Leave Stats */}
        <div className="stat-card">
          <h3>Leaves</h3>
          <p>Pending: {stats?.leaves?.pending || 0}</p>
          <p>Approved This Month: {stats?.leaves?.approvedThisMonth || 0}</p>
        </div>

        {/* Payroll Stats */}
        {stats?.payroll && (
          <div className="stat-card">
            <h3>Latest Payroll</h3>
            <p>Month: {stats.payroll.month}</p>
            <p>Net Salary: ₹{stats.payroll.netSalary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
```

### Attendance Component

```jsx
// components/Attendance.jsx
import React, { useState, useEffect } from 'react';
import { attendanceService } from '../services/attendanceService';

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [todayAttendance, setTodayAttendance] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await attendanceService.getMyAttendance();
      setAttendance(response.data);
    } catch (error) {
      console.error('Failed to fetch attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    try {
      const response = await attendanceService.checkIn();
      setTodayAttendance(response.data);
      fetchAttendance();
      alert('Checked in successfully!');
    } catch (error) {
      alert(error.message || 'Failed to check in');
    }
  };

  const handleCheckOut = async (attendanceId) => {
    try {
      await attendanceService.checkOut(attendanceId);
      fetchAttendance();
      alert('Checked out successfully!');
    } catch (error) {
      alert(error.message || 'Failed to check out');
    }
  };

  return (
    <div className="attendance">
      <h1>My Attendance</h1>
      
      <div className="actions">
        <button onClick={handleCheckIn}>Check In</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((record) => (
              <tr key={record.AttendanceId}>
                <td>{new Date(record.Date).toLocaleDateString()}</td>
                <td>{record.CheckInTime || '-'}</td>
                <td>{record.CheckOutTime || '-'}</td>
                <td>{record.Status}</td>
                <td>
                  {!record.CheckOutTime && (
                    <button onClick={() => handleCheckOut(record.AttendanceId)}>
                      Check Out
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Attendance;
```

### Leave Request Component

```jsx
// components/LeaveRequest.jsx
import React, { useState } from 'react';
import { leaveService } from '../services/leaveService';

const LeaveRequest = () => {
  const [formData, setFormData] = useState({
    LeaveType: 'PAID',
    StartDate: '',
    EndDate: '',
    Reason: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await leaveService.applyLeave(formData);
      alert('Leave request submitted successfully!');
      setFormData({ LeaveType: 'PAID', StartDate: '', EndDate: '', Reason: '' });
    } catch (error) {
      alert(error.message || 'Failed to submit leave request');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="leave-request-form">
      <h2>Apply for Leave</h2>

      <select name="LeaveType" value={formData.LeaveType} onChange={handleChange} required>
        <option value="PAID">Paid Leave</option>
        <option value="SICK">Sick Leave</option>
        <option value="UNPAID">Unpaid Leave</option>
      </select>

      <input
        type="date"
        name="StartDate"
        value={formData.StartDate}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="EndDate"
        value={formData.EndDate}
        onChange={handleChange}
        required
      />

      <textarea
        name="Reason"
        placeholder="Reason for leave"
        value={formData.Reason}
        onChange={handleChange}
        rows="4"
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
  );
};

export default LeaveRequest;
```

### Protected Route Component

```jsx
// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../services/authService';

const ProtectedRoute = ({ children, requiredRole }) => {
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getCurrentUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user?.Role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
```

---

## Error Handling

### Global Error Handler

```javascript
// utils/errorHandler.js
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        return data.message || 'Invalid request';
      case 401:
        localStorage.removeItem('token');
        window.location.href = '/login';
        return 'Session expired. Please login again.';
      case 403:
        return 'You do not have permission to perform this action';
      case 404:
        return 'Resource not found';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return data.message || 'An error occurred';
    }
  } else if (error.request) {
    // Request made but no response
    return 'Network error. Please check your connection.';
  } else {
    // Something else happened
    return error.message || 'An unexpected error occurred';
  }
};
```

---

## Best Practices

### 1. Token Management
```javascript
// Store token securely
localStorage.setItem('token', token);

// Clear token on logout
localStorage.removeItem('token');

// Check token expiry (if using JWT)
const isTokenExpired = (token) => {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    return decoded.exp < Date.now() / 1000;
  } catch {
    return true;
  }
};
```

### 2. Loading States
```jsx
const [loading, setLoading] = useState(false);

const fetchData = async () => {
  setLoading(true);
  try {
    // API call
  } finally {
    setLoading(false);
  }
};
```

### 3. Error Boundaries
```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

### 4. Request Cancellation (with Axios)
```javascript
const source = axios.CancelToken.source();

api.get('/endpoint', {
  cancelToken: source.token
});

// Cancel request
source.cancel('Request cancelled');
```

### 5. Caching & Optimization
```javascript
// Use React Query for data fetching and caching
import { useQuery } from 'react-query';

const { data, isLoading, error } = useQuery('dashboard', 
  () => dashboardService.getStats(),
  { staleTime: 5000 } // Cache for 5 seconds
);
```

---

## Environment Variables

Create `.env` file in your frontend:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_JWT_SECRET=your-secret-key
```

Access in code:
```javascript
const API_URL = process.env.REACT_APP_API_URL;
```

---

## CORS Configuration

If facing CORS issues, backend is already configured. If not:

```javascript
// backend/server.js already has:
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

---

## TypeScript Types (Optional)

```typescript
// types/api.ts
export interface User {
  UserId: number;
  EmployeeCode: string;
  Email: string;
  Role: 'EMPLOYEE' | 'MANAGER' | 'ADMIN';
  IsActive: boolean;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  data: User;
}

export interface DashboardStats {
  attendance: {
    today: {
      checkIn: string;
      checkOut: string | null;
      status: string;
    } | null;
    thisMonth: number;
  };
  leaves: {
    pending: number;
    approvedThisMonth: number;
  };
  payroll: {
    month: string;
    netSalary: number;
  } | null;
}
```
