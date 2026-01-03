# Dayflow HRMS Backend - Setup Guide

Complete setup instructions for the Dayflow HRMS backend API.

## Prerequisites

Before you begin, ensure you have:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MS SQL Server Express** - [Download](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- **SQL Server Management Studio (SSMS)** - Optional but recommended
- **Git** (for cloning the repository)
- **Gmail account** (for email functionality)

---

## Step 1: Database Setup

### Install SQL Server Express

1. Download and install SQL Server Express
2. During installation, note the instance name (usually `SQLEXPRESS`)
3. Remember the server name (usually `YOUR_COMPUTER_NAME\SQLEXPRESS`)

### Create Database

Open SQL Server Management Studio (or Azure Data Studio) and run:

```sql
CREATE DATABASE DayflowHRMS;
GO

USE DayflowHRMS;
GO
```

### Enable TCP/IP Protocol

1. Open **SQL Server Configuration Manager**
2. Navigate to: **SQL Server Network Configuration** → **Protocols for SQLEXPRESS**
3. Right-click **TCP/IP** → **Enable**
4. Right-click **TCP/IP** → **Properties**
5. Go to **IP Addresses** tab
6. Scroll to **IPAll** section
7. Set **TCP Port** to `1433`
8. Click **OK** and **Apply**
9. Restart SQL Server:
   - Go to **SQL Server Services**
   - Right-click **SQL Server (SQLEXPRESS)**
   - Click **Restart**

---

## Step 2: Gmail SMTP Setup (for Password Reset Emails)

### Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**

### Create App Password

1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select **Mail** and **Windows Computer**
3. Click **Generate**
4. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)
5. Save it for the `.env` file

---

## Step 3: Project Setup

### Clone Repository

```bash
cd your-workspace-folder
git clone <repository-url>
cd backend
```

### Install Dependencies

```bash
npm install
```

This will install all required packages (~268 packages).

### Configure Environment Variables

1. Copy the example file:
   ```bash
   copy .env.example .env
   ```

2. Edit `.env` and update these values:

```env
PORT=5000

# Replace with your SQL Server instance name
DB_SERVER=YOUR_COMPUTER_NAME\\SQLEXPRESS
DB_NAME=DayflowHRMS

# Generate a secure random string (at least 32 characters)
JWT_SECRET=your_very_long_and_secure_random_string_here

# Your Gmail credentials
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your.email@gmail.com
SMTP_PASSWORD=your_app_password_here  # 16-char app password
SMTP_FROM=your.email@gmail.com
FRONTEND_URL=http://localhost:3000
```

---

## Step 4: Start the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

### Verify Server is Running

1. You should see:
   ```
   ✅ Database connected successfully
   ✅ Database models synced
   🚀 Server running in development mode on port 5000
   ```

2. Test the health endpoint:
   ```bash
   # PowerShell
   Invoke-RestMethod http://localhost:5000/api/health

   # Browser
   Open: http://localhost:5000/api/health
   ```

Expected response:
```json
{
  "success": true,
  "message": "Dayflow HRMS API is running",
  "timestamp": "2026-01-03T10:00:00.000Z",
  "database": "connected",
  "version": "1.0.0"
}
```

---

## Step 5: Test the API

### Option 1: PowerShell

```powershell
# Register a new user
$body = @{
    EmployeeCode = "EMP001"
    Email = "test@dayflow.com"
    Password = "Test123!"
    Role = "employee"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" `
  -Method Post `
  -Body $body `
  -ContentType "application/json"
```

### Option 2: Postman

1. Import the API endpoints from [API_TESTING.md](API_TESTING.md)
2. Create a new environment with `baseUrl = http://localhost:5000/api`
3. Test the endpoints

### Option 3: cURL

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"EmployeeCode":"EMP001","Email":"test@dayflow.com","Password":"Test123!","Role":"employee"}'
```

---

## Troubleshooting

### Database Connection Failed

**Error:** `Failed to connect to SERVER\SQLEXPRESS`

**Solutions:**
1. Verify SQL Server is running:
   ```powershell
   Get-Service -Name "MSSQL$SQLEXPRESS"
   ```
2. Check TCP/IP is enabled (see Step 1)
3. Verify server name in `.env` matches your SQL Server instance
4. Test connection in SSMS first

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
```powershell
# Kill process using port 5000
Get-NetTCPConnection -LocalPort 5000 | ForEach-Object { 
  Stop-Process -Id $_.OwningProcess -Force 
}
```

### Email Not Sending

**Error:** `Invalid login` or `Authentication failed`

**Solutions:**
1. Verify 2-Factor Authentication is enabled on Gmail
2. Use App Password, not your regular Gmail password
3. Check SMTP credentials in `.env`
4. Ensure port 587 is not blocked by firewall

### Models Not Syncing

**Error:** Database tables not created

**Solution:**
In `server.js`, temporarily change:
```javascript
await sequelize.sync({ alter: true });
```

**Warning:** This will modify existing tables. In production, use migrations.

---

## Project Structure

```
backend/
├── config/          # Database configuration
├── controllers/     # Business logic
├── middleware/      # Auth, validation, error handling
├── models/          # Database models
├── routes/          # API routes
├── utils/           # Helper functions
├── docs/            # Documentation
├── .env             # Environment variables (not in repo)
├── .env.example     # Environment template
├── server.js        # Entry point
└── package.json     # Dependencies
```

---

## Next Steps

1. **Test all endpoints** - See [API_TESTING.md](API_TESTING.md)
2. **Integrate with frontend** - See [FRONTEND_INTEGRATION.md](FRONTEND_INTEGRATION.md)
3. **Create admin user** - Register with `Role: "admin"`
4. **Configure CORS** - Update frontend URL in `.env`
5. **Deploy** - Consider environment-specific configurations

---

## Database Models

The following tables will be automatically created:

- **Users** - User accounts with authentication
- **EmployeeProfiles** - Employee details
- **Attendances** - Daily attendance records
- **LeaveRequests** - Leave applications
- **Payrolls** - Salary records

---

## Security Notes

1. **Never commit `.env`** - It contains sensitive credentials
2. **Use strong JWT_SECRET** - At least 32 random characters
3. **Keep dependencies updated** - Run `npm audit` regularly
4. **Use HTTPS in production** - Never send tokens over HTTP
5. **Implement rate limiting** - Prevent brute force attacks
6. **Validate all inputs** - Already implemented with express-validator

---

## Support

For issues or questions:
- Check [API_TESTING.md](API_TESTING.md) for endpoint examples
- Check [FRONTEND_INTEGRATION.md](FRONTEND_INTEGRATION.md) for integration help
- Review error messages in terminal
- Check SQL Server logs for database issues

---

## Development Tips

### Watch for file changes
```bash
npm run dev  # Uses nodemon for auto-reload
```

### Check database connection
```bash
# PowerShell
Invoke-RestMethod http://localhost:5000/api/health
```

### View all routes
The server logs all registered routes on startup.

### Debug mode
Set `logging: console.log` in `config/database.js` to see SQL queries.

---

## Production Deployment

Before deploying to production:

1. Set `NODE_ENV=production` in `.env`
2. Use a strong `JWT_SECRET` (32+ characters)
3. Configure production database
4. Set up proper CORS origins
5. Use environment-specific `.env` files
6. Enable HTTPS
7. Set up monitoring and logging
8. Configure backups for database
9. Use process manager (PM2 recommended)
10. Set up reverse proxy (nginx recommended)

---

**You're all set!** 🚀

The Dayflow HRMS backend is now ready for development and testing.
