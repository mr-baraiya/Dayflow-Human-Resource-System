# Deployment Guide

## Overview

This guide provides detailed instructions for deploying the Dayflow HRMS application to production environments.

## Prerequisites

### System Requirements

**Backend:**
- Node.js 16.x or higher
- npm 8.x or higher
- Database (PostgreSQL 13+, MySQL 8+, or MSSQL 2019+)
- 2GB RAM minimum
- 10GB disk space

**Frontend:**
- Node.js 16.x or higher
- npm 8.x or higher
- Modern web server (Nginx, Apache)

### Required Accounts
- Domain name and DNS access
- SSL certificate provider
- Hosting provider account
- Database hosting service
- Email service (for notifications)

---

## Environment Configuration

### Backend Environment Variables

Create `.env` file in the `backend/` directory:

```env
# Server Configuration
NODE_ENV=production
PORT=5000
API_VERSION=v1

# Database Configuration
DB_HOST=your-database-host.com
DB_PORT=5432
DB_NAME=dayflow_hrms
DB_USERNAME=your_db_user
DB_PASSWORD=your_secure_db_password
DB_DIALECT=postgres

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=24h

# Password Reset
RESET_PASSWORD_EXPIRE=10m

# Email Configuration (SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@company.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_FROM=noreply@dayflow.com

# CORS Configuration
CORS_ORIGIN=https://your-frontend-domain.com

# App Configuration
APP_NAME=Dayflow HRMS
APP_URL=https://your-app-domain.com
FRONTEND_URL=https://your-frontend-domain.com

# Logging
LOG_LEVEL=info
```

### Frontend Environment Variables

Create `.env.production` file in the `frontend/` directory:

```env
VITE_API_URL=https://your-api-domain.com/api
VITE_APP_NAME=Dayflow HRMS
VITE_APP_VERSION=1.0.0
```

---

## Database Setup

### 1. Create Database

**PostgreSQL:**
```sql
CREATE DATABASE dayflow_hrms;
CREATE USER dayflow_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE dayflow_hrms TO dayflow_user;
```

**MySQL:**
```sql
CREATE DATABASE dayflow_hrms CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'dayflow_user'@'%' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON dayflow_hrms.* TO 'dayflow_user'@'%';
FLUSH PRIVILEGES;
```

### 2. Import Database Schema

Navigate to the `database/` directory:

```bash
# PostgreSQL
psql -U dayflow_user -d dayflow_hrms -f dayflow_hrms.sql

# MySQL
mysql -u dayflow_user -p dayflow_hrms < dayflow_hrms.sql
```

### 3. Import Seed Data (Optional)

```bash
# PostgreSQL
psql -U dayflow_user -d dayflow_hrms -f dayflow_hrms_seed.sql

# MySQL
mysql -u dayflow_user -p dayflow_hrms < dayflow_hrms_seed.sql
```

### 4. Verify Database Connection

Test database connectivity:

```bash
cd backend
node -e "require('./config/database').authenticate().then(() => console.log('Connected')).catch(err => console.error(err))"
```

---

## Backend Deployment

### Option 1: Traditional VPS (Ubuntu/Debian)

#### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install SSL (Let's Encrypt)
sudo apt install -y certbot python3-certbot-nginx
```

#### 2. Deploy Application

```bash
# Create application directory
sudo mkdir -p /var/www/dayflow-hrms
sudo chown $USER:$USER /var/www/dayflow-hrms

# Clone repository
cd /var/www/dayflow-hrms
git clone <your-repo-url> .

# Install dependencies
cd backend
npm install --production

# Create .env file
nano .env
# (Add production environment variables)

# Test application
npm start
```

#### 3. Configure PM2

```bash
# Start application with PM2
pm2 start server.js --name dayflow-api

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup

# Monitor application
pm2 monit
```

**PM2 Configuration File** (`ecosystem.config.js`):
```javascript
module.exports = {
  apps: [{
    name: 'dayflow-api',
    script: './server.js',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true
  }]
};
```

Start with config:
```bash
pm2 start ecosystem.config.js
```

#### 4. Configure Nginx

Create Nginx configuration (`/etc/nginx/sites-available/dayflow-api`):

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

Enable site and reload Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/dayflow-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 5. Setup SSL Certificate

```bash
sudo certbot --nginx -d api.yourdomain.com
```

### Option 2: Heroku Deployment

#### 1. Prepare Application

Create `Procfile` in backend directory:
```
web: node server.js
```

#### 2. Deploy to Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create dayflow-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret
heroku config:set DB_HOST=your-db-host
# (Set all other environment variables)

# Deploy
git push heroku main

# Check logs
heroku logs --tail
```

### Option 3: Docker Deployment

**Dockerfile** (backend):
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
```

**docker-compose.yml**:
```yaml
version: '3.8'

services:
  api:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=dayflow_hrms
      - POSTGRES_USER=dayflow_user
      - POSTGRES_PASSWORD=secure_password
    volumes:
      - db_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  db_data:
```

Deploy with Docker:
```bash
docker-compose up -d
```

---

## Frontend Deployment

### 1. Build Application

```bash
cd frontend
npm install
npm run build
```

This creates a `dist/` directory with optimized production files.

### 2. Deployment Options

#### Option A: Static Hosting (Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel --prod
```

Configure `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/[^.]+",
      "dest": "/",
      "status": 200
    }
  ]
}
```

#### Option B: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd frontend
netlify deploy --prod --dir=dist
```

Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Option C: Nginx (VPS)

```bash
# Copy build files
sudo cp -r dist/* /var/www/html/dayflow/

# Set permissions
sudo chown -R www-data:www-data /var/www/html/dayflow
```

**Nginx Configuration** (`/etc/nginx/sites-available/dayflow`):
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/html/dayflow;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 10240;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss;
}
```

Enable and reload:
```bash
sudo ln -s /etc/nginx/sites-available/dayflow /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Setup SSL
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## Post-Deployment

### 1. Health Checks

Create health check endpoint in backend (`routes/health.js`):
```javascript
router.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString() 
  });
});
```

### 2. Monitoring Setup

**PM2 Monitoring:**
```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

**Setup Monitoring Service** (e.g., UptimeRobot):
- Monitor: `https://api.yourdomain.com/api/health`
- Interval: 5 minutes
- Alert via: Email/SMS

### 3. Backup Strategy

**Database Backups:**
```bash
# PostgreSQL backup script
#!/bin/bash
BACKUP_DIR="/var/backups/dayflow"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR
pg_dump -U dayflow_user dayflow_hrms | gzip > $BACKUP_DIR/backup_$DATE.sql.gz

# Keep only last 30 days
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +30 -delete
```

Add to crontab:
```bash
# Daily backup at 2 AM
0 2 * * * /path/to/backup-script.sh
```

### 4. Security Hardening

**Firewall Configuration:**
```bash
# UFW (Ubuntu)
sudo ufw allow 22/tcp     # SSH
sudo ufw allow 80/tcp     # HTTP
sudo ufw allow 443/tcp    # HTTPS
sudo ufw enable
```

**Fail2Ban Setup:**
```bash
sudo apt install fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

**Environment Security:**
```bash
# Secure .env files
chmod 600 backend/.env
chown $USER:$USER backend/.env
```

---

## Maintenance

### Regular Updates

```bash
# Update dependencies
cd backend
npm update
npm audit fix

cd ../frontend
npm update
npm audit fix
```

### Log Management

```bash
# View PM2 logs
pm2 logs dayflow-api

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Clear old logs
pm2 flush
```

### Application Updates

```bash
# Pull latest code
cd /var/www/dayflow-hrms
git pull origin main

# Backend update
cd backend
npm install --production
pm2 restart dayflow-api

# Frontend update
cd ../frontend
npm install
npm run build
sudo cp -r dist/* /var/www/html/dayflow/
```

---

## Rollback Procedure

```bash
# List PM2 processes
pm2 list

# Stop current version
pm2 stop dayflow-api

# Checkout previous version
git checkout <previous-commit-hash>

# Reinstall dependencies
cd backend
npm install --production

# Restart application
pm2 restart dayflow-api

# Verify health
curl https://api.yourdomain.com/api/health
```

---

## Troubleshooting

### Common Issues

**1. Database Connection Failed**
```bash
# Check database status
sudo systemctl status postgresql

# Test connection
psql -U dayflow_user -d dayflow_hrms -h localhost
```

**2. Application Not Starting**
```bash
# Check PM2 logs
pm2 logs dayflow-api --err

# Check environment variables
pm2 env 0
```

**3. Nginx 502 Bad Gateway**
```bash
# Check if backend is running
pm2 status

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Restart services
pm2 restart dayflow-api
sudo systemctl restart nginx
```

**4. SSL Certificate Issues**
```bash
# Renew certificate
sudo certbot renew

# Test certificate
sudo certbot certificates
```

---

## Performance Optimization

### Database Optimization

```sql
-- Add indexes for frequently queried columns
CREATE INDEX idx_attendance_employee_date ON Attendance(EmployeeId, Date);
CREATE INDEX idx_leave_employee_status ON LeaveRequests(EmployeeId, Status);
CREATE INDEX idx_user_email ON Users(Email);
```

### Nginx Caching

```nginx
# Add to nginx config
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=api_cache:10m max_size=100m inactive=60m;

location /api/ {
    proxy_cache api_cache;
    proxy_cache_valid 200 5m;
    proxy_cache_methods GET HEAD;
    proxy_cache_key "$scheme$request_method$host$request_uri";
    add_header X-Cache-Status $upstream_cache_status;
    # ... other proxy settings
}
```

### CDN Setup (Optional)

Use CloudFlare or similar CDN for:
- Static assets caching
- DDoS protection
- SSL/TLS optimization
- Global content delivery

---

## Scaling Considerations

### Horizontal Scaling

**Load Balancer Configuration** (Nginx):
```nginx
upstream dayflow_backend {
    least_conn;
    server 10.0.0.1:5000;
    server 10.0.0.2:5000;
    server 10.0.0.3:5000;
}

server {
    location / {
        proxy_pass http://dayflow_backend;
    }
}
```

### Database Scaling

- Read replicas for read-heavy operations
- Connection pooling optimization
- Query optimization and indexing
- Consider database sharding for large scale

### Caching Strategy

- Redis for session storage
- Application-level caching
- Database query caching
- CDN for static assets

---

## Disaster Recovery

### Backup Restoration

```bash
# PostgreSQL restore
gunzip < backup_20260103.sql.gz | psql -U dayflow_user dayflow_hrms

# MySQL restore
gunzip < backup_20260103.sql.gz | mysql -u dayflow_user -p dayflow_hrms
```

### Emergency Contacts

Document:
- Database administrator contact
- Hosting provider support
- Domain registrar support
- SSL certificate provider
- Team lead contact

---

## Checklist

### Pre-Deployment
- [ ] Environment variables configured
- [ ] Database created and migrated
- [ ] SSL certificate obtained
- [ ] Domain DNS configured
- [ ] Email service configured
- [ ] Backup strategy implemented

### Post-Deployment
- [ ] Health check endpoint working
- [ ] Monitoring setup complete
- [ ] Backup automation configured
- [ ] Security headers configured
- [ ] SSL certificate auto-renewal setup
- [ ] Documentation updated
- [ ] Team notification sent

---

## Support

For deployment issues:
- Check [Troubleshooting](#troubleshooting) section
- Review application logs
- Contact DevOps team
- Open GitHub issue

---

**Last Updated**: January 2026
**Version**: 1.0.0
