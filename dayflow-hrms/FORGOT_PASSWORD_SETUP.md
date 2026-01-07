# Forgot Password Email Setup

## Overview
The forgot password feature now sends real password reset emails using Gmail SMTP.

## Setup Instructions

### 1. Install Dependencies
Run the following command to install the required packages:
```bash
pnpm install
```

This will install `nodemailer` and its TypeScript types.

### 2. Environment Variables
The `.env.local` file has been created with your SMTP configuration:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=vvbaraiya32@gmail.com
SMTP_PASSWORD=pvjz zcsd tvsg kqdx
SMTP_FROM=vvbaraiya32@gmail.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important Security Notes:**
- Never commit `.env.local` to version control
- The password shown is an App Password (not your Gmail password)
- For production, use environment variables in your hosting platform

### 3. Gmail App Password Setup (Already Done)
Your Gmail account is already configured with an App Password. If you need to generate a new one:

1. Go to Google Account Settings
2. Security → 2-Step Verification
3. App Passwords → Generate new app password
4. Select "Mail" and your device
5. Copy the 16-character password and update `.env.local`

## How It Works

### User Flow
1. User goes to `/forgot-password`
2. Enters their email address
3. System checks if email exists in localStorage
4. API sends password reset email via Gmail SMTP
5. Email contains a secure reset link
6. User clicks link → redirected to `/reset-password?token=xxx&email=xxx`
7. User enters new password
8. Password is updated

### Email Template
The email includes:
- Professional HTML design with Dayflow HRMS branding
- Prominent "Reset Password" button
- Copy-paste link as fallback
- Security note about link expiration (1 hour)
- Warning if user didn't request reset

### API Endpoints

**POST /api/forgot-password**
- Validates email exists
- Generates secure reset token
- Sends email via nodemailer
- Returns success/error response

**POST /api/reset-password**
- Validates token and email
- Updates user password
- Returns success/error response

## Testing

### Local Testing
1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Navigate to `http://localhost:3000/forgot-password`

3. Enter a registered email address

4. Check the email inbox for the reset link

5. Click the link and set a new password

### Test Email Addresses
Use any email that's registered in your localStorage users.

## File Structure

```
dayflow-hrms/
├── .env.local                          # SMTP configuration
├── lib/
│   └── email.ts                        # Email utility functions
├── app/
│   ├── api/
│   │   ├── forgot-password/
│   │   │   └── route.ts               # Forgot password API
│   │   └── reset-password/
│   │       └── route.ts               # Reset password API
│   ├── forgot-password/
│   │   └── page.tsx                   # Forgot password form
│   └── reset-password/
│       └── page.tsx                   # Reset password form
```

## Troubleshooting

### Email Not Sending
1. Check SMTP credentials in `.env.local`
2. Verify App Password is correct
3. Check server logs for error messages
4. Ensure Gmail account has 2FA enabled

### Link Not Working
1. Verify `NEXT_PUBLIC_APP_URL` is correct
2. Check browser console for errors
3. Ensure token is in URL parameters

### Server Errors
1. Restart development server after `.env.local` changes
2. Check that nodemailer is installed
3. Verify all API routes are created

## Production Deployment

### Environment Variables
Set these in your hosting platform (Vercel, Netlify, etc.):
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `SMTP_FROM`
- `NEXT_PUBLIC_APP_URL` (your production URL)

### Security Recommendations
1. Use a dedicated email service (SendGrid, Mailgun, etc.) for production
2. Implement rate limiting on API routes
3. Store reset tokens in a database with expiration
4. Add CAPTCHA to prevent abuse
5. Log all password reset attempts

## Features

✅ Professional HTML email template
✅ Secure token generation
✅ 1-hour link expiration
✅ Email validation
✅ Error handling
✅ Success notifications
✅ Mobile-responsive design
✅ Branded email layout

## Support

If you encounter any issues:
1. Check the browser console
2. Check the server terminal logs
3. Verify SMTP settings
4. Test with a different email address
