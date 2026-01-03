# Frequently Asked Questions (FAQ)

## General Questions

### What is Dayflow HRMS?

Dayflow HRMS is a comprehensive Human Resource Management System designed to streamline HR operations including employee management, attendance tracking, leave management, and payroll operations.

### Who developed Dayflow HRMS?

Dayflow HRMS was developed by Team Dayflow for the Odoo x GCET Hackathon 2026:
- Vishal Baraiya (Team Leader, Database & Backend)
- Pujan Ajmera (Frontend UI & API Integration)
- Haresh Zapadiya (Frontend Components & UX)
- Dhruvrajsinh Zala (Testing & Documentation)

### Is Dayflow HRMS open source?

Yes, Dayflow HRMS is released under the MIT License and is available on GitHub.

### What technologies does Dayflow use?

**Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui  
**Backend**: Node.js, Express, JWT  
**Database**: PostgreSQL/MySQL/MSSQL (multi-database support)  
**ORM**: Sequelize

---

## Account & Authentication

### How do I create an account?

New employees are registered by the Admin/HR department. You will receive an email with your Employee Code and initial credentials.

### I forgot my password. How do I reset it?

1. Go to the login page
2. Click "Forgot Password?"
3. Enter your registered email
4. Check your email for the reset link
5. Follow the instructions to set a new password

### How often should I change my password?

For security, we recommend changing your password every 3 months. The system may prompt you to change it periodically.

### Can I use the same password as before?

For security reasons, avoid reusing old passwords. Use a unique, strong password each time.

### What makes a strong password?

A strong password should:
- Be at least 8 characters long
- Include uppercase and lowercase letters
- Include numbers
- Include special characters (@, #, $, etc.)
- Not be a common word or phrase

### My account is locked. What should I do?

Accounts are locked after multiple failed login attempts for security. Contact IT support or HR to unlock your account.

---

## Attendance Management

### How do I mark my attendance?

1. Log in to Dayflow HRMS
2. Navigate to the Attendance page
3. Click "Clock In" when you start work
4. Click "Clock Out" when you finish work

### What if I forget to clock in or clock out?

Contact your supervisor immediately. You may need to submit an attendance regularization request with proper justification.

### Can I clock in from home for remote work?

Yes, you can clock in from any location. It's helpful to add a note mentioning "Working from home" when you clock in.

### What are the standard working hours?

Standard working hours are typically 9:00 AM to 6:00 PM (9 hours including 1-hour lunch break). Actual working hours may vary by department.

### Is there a grace period for late arrival?

Yes, there's usually a 15-minute grace period (until 9:15 AM). However, policies may vary by department. Check with your supervisor.

### How is overtime calculated?

Overtime is calculated as hours worked beyond standard working hours. Contact HR for overtime policy and compensation details.

### Can I view my past attendance records?

Yes, go to the Attendance page and select the date range. You can view all your past attendance records, including clock in/out times and working hours.

### Can I export my attendance data?

Yes, you can download your attendance report in PDF or Excel format from the Attendance page.

### What does "Half Day" mean?

Half Day status is typically assigned when you work less than 4.5 hours in a day. This may vary based on company policy.

---

## Leave Management

### What types of leave are available?

Common leave types include:
- **Sick Leave**: For illness or medical appointments
- **Casual Leave**: For personal reasons
- **Earned Leave**: Vacation/holiday leave
- **Maternity Leave**: For expectant mothers
- **Paternity Leave**: For new fathers
- **Unpaid Leave**: Leave without pay

### How many leave days do I have?

Leave entitlement varies by company policy. Typically:
- Sick Leave: 10 days/year
- Casual Leave: 12 days/year
- Earned Leave: 18 days/year

Check the Leave page to see your current leave balance.

### How do I apply for leave?

1. Go to the Leave page
2. Click "New Leave Request"
3. Select leave type
4. Choose start and end dates
5. Enter reason
6. Attach documents if required (e.g., medical certificate)
7. Submit request

### How long does leave approval take?

- Casual Leave: 24-48 hours
- Earned Leave: 3-5 days
- Emergency Leave: Same day (contact supervisor directly)
- Medical Leave: 24 hours with supporting documents

### Can I cancel a leave request?

Yes, you can cancel a pending leave request from the Leave page. Once approved, contact your supervisor to cancel it.

### What if my leave request is rejected?

Check the rejection reason provided. If unclear, contact your supervisor to discuss and resubmit if appropriate.

### Do I need to attach a medical certificate for sick leave?

Medical certificates are typically required for sick leave of 3 or more consecutive days. Check your company's policy.

### Can I apply for half-day leave?

Yes, select the same date for both start and end date, and mention "Half Day" in the notes/reason field.

### What happens to unused leave at year-end?

Policies vary:
- Some companies allow carrying forward a limited number of days (e.g., 10 days)
- Earned leave may be eligible for encashment
- Contact HR for your company's specific policy

### Can I apply for leave during probation period?

This depends on company policy. Some allow limited leave during probation. Check with HR.

---

## Payroll

### When is salary paid?

Salary is typically paid on the last working day of each month. The exact date may vary by company.

### How do I access my payslip?

1. Log in to Dayflow HRMS
2. Go to the Payroll page
3. Select the month and year
4. View or download your payslip

### What is included in my salary?

**Earnings:**
- Basic Salary
- House Rent Allowance (HRA)
- Travel Allowance (TA)
- Other allowances
- Bonuses (if applicable)

**Deductions:**
- Provident Fund (PF)
- Professional Tax
- Income Tax (TDS)
- Insurance premiums
- Other deductions

### What is the difference between Gross and Net Salary?

- **Gross Salary**: Total earnings before any deductions
- **Net Salary**: Take-home amount after all deductions (Gross - Deductions)

### How is my tax calculated?

Tax is calculated based on:
- Your annual income slab
- Tax-saving investments declared
- Standard deduction limits
- Current tax regulations

### Can I update my bank details?

Yes, update your bank details in the Profile section. Some companies may require you to submit physical documents to HR.

### When will I receive Form 16?

Form 16 (TDS certificate) is typically issued by July 31st each year for the previous financial year.

### Can I see my previous years' payslips?

Yes, you can access historical payslips by selecting different months and years in the Payroll section.

### What if there's an error in my payslip?

Contact HR or Accounts department immediately with details of the discrepancy.

---

## Profile Management

### How do I update my profile information?

1. Go to the Profile page
2. Click "Edit Profile"
3. Update the fields you want to change
4. Click "Save Changes"

### What information can I update myself?

You can typically update:
- Phone number
- Current address
- Emergency contact details
- Bank account information

### What information requires HR approval to change?

Changes to the following typically require HR intervention:
- Name
- Date of birth
- Employee code
- Department
- Designation
- Date of joining

### How do I upload documents?

Navigate to Profile → Documents section and upload required documents like ID proof, address proof, educational certificates, etc.

### Is my personal information secure?

Yes, Dayflow HRMS uses industry-standard encryption and security measures. Your data is protected and only accessible to authorized personnel.

---

## Technical Issues

### The website is not loading. What should I do?

1. Check your internet connection
2. Try refreshing the page (Ctrl+F5)
3. Clear your browser cache
4. Try a different browser
5. If the issue persists, contact IT support

### Which browsers are supported?

Dayflow HRMS works best on:
- Google Chrome (recommended)
- Mozilla Firefox
- Microsoft Edge
- Safari

### Can I use Dayflow on my mobile phone?

Yes, Dayflow HRMS has a responsive design that works on mobile devices through your web browser.

### Is there a mobile app?

Currently, Dayflow is a web-based application. Access it through your mobile browser. A native mobile app may be developed in the future.

### I'm getting an error message. What should I do?

1. Note the exact error message
2. Try refreshing the page
3. Log out and log back in
4. If the error persists, contact IT support with:
   - Screenshot of the error
   - What you were trying to do
   - Date and time of the error

### The page is loading slowly. How can I fix this?

1. Check your internet speed
2. Close unnecessary browser tabs
3. Clear browser cache and cookies
4. Try a different browser
5. Contact IT support if the issue persists

### Can I access Dayflow from multiple devices?

Yes, you can access your account from any device with internet access. Only one active session is allowed at a time for security.

---

## Admin & HR Specific

### How do I add a new employee to the system?

1. Go to User Management
2. Click "Add New User"
3. Fill in employee details
4. Assign role and department
5. Submit to create account
6. System sends welcome email to the new employee

### How do I approve or reject leave requests?

1. Navigate to Leave Management
2. View pending requests
3. Click on a request to see details
4. Click "Approve" or "Reject"
5. Add comments (mandatory for rejection)
6. Submit your decision

### How do I generate payroll?

1. Go to Payroll Management
2. Click "Generate Payroll"
3. Select month, year, and employees/department
4. Review auto-calculated amounts
5. Make adjustments if needed
6. Generate payroll

### Can I bulk upload employee data?

This feature may be available depending on system configuration. Contact the development team for bulk upload templates and procedures.

### How do I deactivate a user account?

1. Go to User Management
2. Select the user
3. Click "Deactivate"
4. Confirm the action
5. User will no longer be able to log in

### How do I generate reports?

1. Navigate to Reports section
2. Select report type (Attendance, Leave, Payroll)
3. Choose filters (date range, department, etc.)
4. Click "Generate Report"
5. Download or print as needed

---

## Security & Privacy

### How is my password stored?

Passwords are hashed using bcrypt encryption. Even system administrators cannot see your actual password.

### Who can see my personal information?

Only authorized personnel (HR, Admin) can access your complete profile. Colleagues can see basic information like name and department.

### Can I see who accessed my data?

This feature may be available in advanced versions. Contact your system administrator for audit log access.

### What should I do if I suspect unauthorized access?

1. Change your password immediately
2. Log out from all devices
3. Contact IT security team
4. Report the incident to HR

### Is my payroll information private?

Yes, payroll information is confidential and only accessible to you, HR, and authorized accounts personnel.

---

## Company Policy

### Where can I find the employee handbook?

Check with HR for the employee handbook. It contains detailed company policies and procedures.

### What is the work from home policy?

Work from home policies vary by company. Check with your supervisor or HR department for specific guidelines.

### How do I request accommodation or special needs?

Contact HR directly to discuss any accommodation requirements. They will work with you to address your needs.

### What holidays are recognized?

Check the company calendar or contact HR for the list of recognized holidays for the current year.

### What is the dress code?

Dress code policies vary by company and department. Refer to the employee handbook or check with HR.

---

## Support & Contact

### How do I contact HR?

- **Email**: hr@company.com
- **Phone**: [Company HR phone number]
- **Office Hours**: Monday-Friday, 9:00 AM - 5:00 PM

### How do I contact IT Support?

- **Email**: it-support@company.com
- **Phone**: [Company IT support number]
- **Office Hours**: Monday-Friday, 9:00 AM - 6:00 PM

### Where can I report a bug or suggest a feature?

Contact IT support or use the feedback form in the application. Your suggestions help improve Dayflow HRMS.

### Is there training available for new users?

Yes, HR typically conducts orientation sessions for new employees. Additionally, refer to the User Guide for detailed instructions.

### Where can I find more documentation?

Check the Documentation section in the application or contact HR for additional resources:
- User Guide
- API Documentation (for developers)
- Architecture Documentation
- Deployment Guide

---

## Troubleshooting Quick Reference

| Issue | Quick Fix |
|-------|-----------|
| Can't log in | Reset password or contact IT |
| Clock in not working | Refresh page, clear cache |
| Leave request error | Check leave balance, verify dates |
| Payslip not visible | Check date, wait until payment date |
| Profile update failed | Check internet, verify required fields |
| Page loading slowly | Clear cache, check internet speed |
| Error message | Screenshot and contact IT support |

---

## Still Have Questions?

If your question isn't answered here:

1. **Check the User Guide**: Comprehensive documentation available
2. **Contact your Supervisor**: For policy-related questions
3. **Contact HR**: For employee-related queries (hr@company.com)
4. **Contact IT Support**: For technical issues (it-support@company.com)

---

**Version**: 1.0.0  
**Last Updated**: January 2026

**Feedback**: Help us improve this FAQ by sending your suggestions to hr@company.com
