# Leave Request System - Test Guide

## Overview
The leave request system now has full real-time synchronization between employees and admins. When an employee submits a leave request, it appears instantly on the admin side. When an admin approves or rejects it, the status updates automatically on the employee side.

## Features Implemented

### Employee Side (app/employee/leave)
✅ **Authentication-based**: Uses currently logged-in user
✅ **Employee record linking**: Automatically links to employee profile by email
✅ **Real-time updates**: Refreshes every 3 seconds to catch admin approvals
✅ **Toast notifications**: Shows success message when submitting leave request
✅ **Status tracking**: Shows pending, approved, and rejected statuses with color coding

### Admin Side (app/admin/leave)
✅ **Authentication-based**: Requires admin role to access
✅ **Real-time updates**: Refreshes every 3 seconds to catch new employee requests
✅ **Toast notifications**: Shows success message when approving/rejecting
✅ **Approve/Reject actions**: One-click approval or rejection with confirmation dialog
✅ **Search functionality**: Search by employee name or code

## Testing Steps

### Step 1: Login as Employee
1. Go to http://localhost:3000/login
2. Login with any employee account (or create one via signup)
   - If you don't have an employee account, you can use the signup page
   - New signups default to "employee" role

### Step 2: Submit a Leave Request
1. Navigate to Leave section from sidebar
2. Click "Apply Leave" button
3. Fill in the form:
   - Select leave type (Annual, Sick, or Unpaid)
   - Choose start and end dates
   - Provide a reason
4. Click "Submit Request"
5. You should see:
   - Toast notification confirming submission
   - New request appears in Leave History with "pending" status (yellow badge)

### Step 3: Login as Admin
1. Open a new browser tab or incognito window
2. Go to http://localhost:3000/login
3. Login with admin credentials:
   - **Email**: baraiyanayanbhai32@gmail.com
   - **Password**: Nayan@1878

### Step 4: View and Approve/Reject
1. Navigate to Leave Approvals from admin sidebar
2. You should see the employee's leave request in the list
3. The request will show:
   - Employee name and code
   - Leave type and duration
   - Date range and reason
   - "Approve" and "Reject" buttons (green and red)
4. Click "Approve" or "Reject"
5. Optionally add a comment in the dialog
6. Confirm the action
7. You should see:
   - Toast notification confirming the action
   - Request status changes immediately

### Step 5: Check Employee Side
1. Go back to the employee browser tab/window
2. Within 3 seconds, you should see:
   - The leave request status automatically updates
   - Badge color changes:
     - Yellow = Pending
     - Green = Approved
     - Red = Rejected

## Real-Time Features

### Auto-Refresh Mechanism
Both pages refresh data every 3 seconds:
- **Employee page**: Checks for status changes from admin
- **Admin page**: Checks for new leave requests from employees

### Visual Feedback
- **Toast notifications**: Pop-up messages for all actions
- **Color-coded badges**: Easy visual identification of status
- **Stats cards**: Real-time statistics at the top of each page

## Statistics Tracked

### Employee Dashboard
- Total Leave Balance (20 days default)
- Leave Taken (only approved leaves count)
- Pending Requests (number of pending requests)

### Admin Dashboard
- Pending Requests (requires admin action)
- Approved This Month (approved leaves count)
- Total Employees on Leave (currently on leave today)

## Data Storage
All data is stored in browser localStorage with these keys:
- `leaves`: Array of all leave requests
- `currentUser`: Currently logged-in user
- `users`: All registered users
- `employees`: All employee records

## Troubleshooting

### If employee requests don't show on admin side:
1. Check browser console for errors
2. Verify localStorage has the data: `localStorage.getItem('leaves')`
3. Wait up to 3 seconds for auto-refresh

### If status changes don't reflect on employee side:
1. Wait up to 3 seconds for auto-refresh
2. Check if both tabs are using the same localStorage (same browser)
3. Verify the currentUser matches the employee who submitted the request

### If authentication fails:
1. Make sure you're using the correct admin credentials
2. Try logging out and logging back in
3. Check localStorage: `localStorage.getItem('currentUser')`

## Default Admin Account
- **Email**: baraiyanayanbhai32@gmail.com
- **Password**: Nayan@1878
- This account is automatically created on first load of the login page

## Next Steps for Production
To make this production-ready, consider:
1. Replace localStorage with a real database
2. Replace 3-second polling with WebSocket/Server-Sent Events
3. Add email notifications when status changes
4. Add leave balance validation before approval
5. Add leave history reports
6. Add calendar view for approved leaves
