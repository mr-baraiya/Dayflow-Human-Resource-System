# Leave Request System Architecture

## System Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    EMPLOYEE LEAVE REQUEST FLOW                   │
└─────────────────────────────────────────────────────────────────┘

EMPLOYEE SIDE                        ADMIN SIDE
┌──────────────┐                    ┌──────────────┐
│   Employee   │                    │    Admin     │
│    Logs In   │                    │   Logs In    │
└──────┬───────┘                    └──────┬───────┘
       │                                    │
       ▼                                    ▼
┌──────────────────┐              ┌─────────────────┐
│ getCurrentUser() │              │ getCurrentUser()│
│  - Get email     │              │  - Verify admin │
│  - Find employee │              │  - Load profile │
└──────┬───────────┘              └────────┬────────┘
       │                                    │
       ▼                                    ▼
┌──────────────────┐              ┌─────────────────┐
│ Leave Dashboard  │              │ Leave Approvals │
│  - Show balance  │◄─────────────┤  - Pending list │
│  - Show history  │  Auto-refresh│  - Statistics   │
│  - Apply button  │  (3 seconds) │  - Search bar   │
└──────┬───────────┘              └────────┬────────┘
       │                                    │
       │ Click "Apply Leave"                │
       ▼                                    │
┌──────────────────┐                       │
│   Submit Form    │                       │
│  - Type          │                       │
│  - Start/End     │                       │
│  - Reason        │                       │
└──────┬───────────┘                       │
       │                                    │
       │ addLeave()                         │
       ▼                                    │
┌──────────────────┐                       │
│   localStorage   │◄──────────────────────┤
│  'leaves' array  │      getLeaves()      │
│   + New request  │      (polling)        │
│  status: pending │                       │
└──────┬───────────┘                       │
       │                                    │
       │ Toast: "Request                   │
       │  Submitted"                        │
       │                                    │
       │                          ┌─────────▼────────┐
       │                          │ New Request      │
       │                          │  Appears!        │
       │                          │ (auto-refresh)   │
       │                          └─────────┬────────┘
       │                                    │
       │                          Admin clicks       │
       │                          "Approve/Reject"   │
       │                                    ▼
       │                          ┌─────────────────┐
       │                          │ Confirmation    │
       │                          │  Dialog         │
       │                          │ + Comment field │
       │                          └────────┬────────┘
       │                                    │
       │                          updateLeave()      │
       │                          status: approved/  │
       │                                   rejected  │
       │                                    │
       │                          Toast: "Leave      │
       │                                 Approved"   │
       │                                    │
       ▼                                    ▼
┌──────────────────┐              ┌─────────────────┐
│   localStorage   │              │  localStorage   │
│ Status: approved │◄────────────►│ Status: approved│
└──────┬───────────┘              └─────────────────┘
       │                                    
       │ Auto-refresh (3 sec)
       ▼
┌──────────────────┐
│ Badge Updates!   │
│  🟡 → 🟢 (Approved)│
│  🟡 → 🔴 (Rejected)│
└──────────────────┘


═══════════════════════════════════════════════════════════════════
                      KEY COMPONENTS
═══════════════════════════════════════════════════════════════════

📁 FILES MODIFIED:
  ├── app/employee/leave/page.tsx
  │   └── Real-time refresh every 3 seconds
  │   └── getCurrentUser() authentication
  │   └── Toast notifications on submit
  │
  ├── app/admin/leave/page.tsx
  │   └── Real-time refresh every 3 seconds
  │   └── getCurrentUser() with admin check
  │   └── Toast notifications on approve/reject
  │
  └── app/layout.tsx
      └── Added <Toaster /> component

🔄 AUTO-REFRESH MECHANISM:
  setInterval(() => {
    setLeaves(getLeaves())
  }, 3000)

🔐 AUTHENTICATION:
  const currentUser = getCurrentUser()
  if (!currentUser) window.location.href = "/login"

💾 DATA STORAGE (localStorage):
  ┌─────────────────────────────────────┐
  │ Key: 'leaves'                       │
  │ Value: Array<LeaveRequest>          │
  │   - id, employeeId, employeeName    │
  │   - type, startDate, endDate, days  │
  │   - reason, status, appliedDate     │
  └─────────────────────────────────────┘

🎨 STATUS BADGES:
  🟡 pending   (warning color)
  🟢 approved  (success color)
  🔴 rejected  (destructive color)

🔔 TOAST NOTIFICATIONS:
  Employee: "Leave Request Submitted"
  Admin:    "Leave Approved" / "Leave Rejected"

═══════════════════════════════════════════════════════════════════
                    USER INTERACTION FLOW
═══════════════════════════════════════════════════════════════════

1️⃣ EMPLOYEE SUBMITS REQUEST
   ┌─────────────────────────────────────┐
   │ 1. Fill leave form                  │
   │ 2. Click "Submit Request"           │
   │ 3. See toast notification           │
   │ 4. Request appears with 🟡 badge    │
   └─────────────────────────────────────┘

2️⃣ ADMIN SEES REQUEST (within 3 seconds)
   ┌─────────────────────────────────────┐
   │ 1. Request auto-appears in list     │
   │ 2. Shows employee details           │
   │ 3. Green/Red buttons visible        │
   └─────────────────────────────────────┘

3️⃣ ADMIN TAKES ACTION
   ┌─────────────────────────────────────┐
   │ 1. Click Approve/Reject             │
   │ 2. Optional: Add comment            │
   │ 3. Confirm action                   │
   │ 4. See toast notification           │
   │ 5. Badge updates immediately        │
   └─────────────────────────────────────┘

4️⃣ EMPLOYEE SEES UPDATE (within 3 seconds)
   ┌─────────────────────────────────────┐
   │ 1. Badge auto-updates color         │
   │ 2. Status text changes              │
   │ 3. Statistics update                │
   └─────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════
```

## Technical Details

### Polling Interval
- **3 seconds**: Balances responsiveness with performance
- Uses `setInterval` in `useEffect` with cleanup
- Automatically cleared when component unmounts

### Authentication Flow
1. Check `getCurrentUser()` from localStorage
2. Validate user exists and has correct role
3. Redirect to `/login` if not authenticated
4. Link employee by email to employee record

### Data Synchronization
- **Source of truth**: localStorage `'leaves'` key
- **Update method**: Direct localStorage manipulation
- **Refresh method**: Periodic `getLeaves()` call
- **No conflicts**: Single browser instance (localStorage is per-browser)

### User Experience Enhancements
- Loading states while fetching user data
- Toast notifications for all actions
- Color-coded status badges
- Real-time statistics
- Search functionality (admin)
- Responsive design

## Future Improvements
1. **WebSocket/SSE**: Replace polling with real-time push
2. **Database**: Replace localStorage with PostgreSQL/MongoDB
3. **Email notifications**: Send emails on status change
4. **Mobile app**: React Native app with push notifications
5. **Leave balance tracking**: Deduct from balance on approval
6. **Calendar integration**: Show approved leaves in calendar
7. **Reporting**: Generate leave reports and analytics
