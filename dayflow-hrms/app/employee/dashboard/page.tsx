"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StatsCard } from "@/components/ui/stats-card"
import { Calendar, FileCheck, DollarSign, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getEmployees, getAttendance, getLeaves } from "@/lib/local-storage"

export default function EmployeeDashboard() {
  const [stats, setStats] = useState({
    todayStatus: "Not Checked In",
    leaveBalance: 0,
    salary: 0,
    hoursThisMonth: 0,
    presentDays: 0,
    absentDays: 0,
    leaveTaken: 0,
  })

  useEffect(() => {
    loadEmployeeData()
  }, [])

  const loadEmployeeData = () => {
    const employees = getEmployees()
    const attendance = getAttendance()
    const leaves = getLeaves()

    // Get current employee (EMP001 - John Doe)
    const currentEmployee = employees.find((e) => e.code === "EMP001")
    const employeeAttendance = attendance.filter((a) => a.employeeCode === "EMP001")
    const employeeLeaves = leaves.filter((l) => l.employeeCode === "EMP001")

    // Calculate stats
    const today = new Date().toISOString().split("T")[0]
    const todayAttendance = employeeAttendance.find((a) => a.date === today)
    const todayStatus = todayAttendance
      ? todayAttendance.checkOut === "-"
        ? "Checked In"
        : "Checked Out"
      : "Not Checked In"

    const presentDays = employeeAttendance.filter((a) => a.status === "present").length
    const absentDays = employeeAttendance.filter((a) => a.status === "absent").length
    const leaveTaken = employeeLeaves.filter((l) => l.status === "approved").reduce((sum, l) => sum + l.days, 0)
    const totalHours = employeeAttendance.reduce((sum, a) => sum + (Number.parseInt(a.hours) || 0), 0)

    setStats({
      todayStatus,
      leaveBalance: 15 - leaveTaken, // Assuming 15 days annual leave
      salary: currentEmployee?.salary || 0,
      hoursThisMonth: totalHours,
      presentDays,
      absentDays,
      leaveTaken,
    })
  }

  return (
    <DashboardLayout role="employee" userName="John Doe" userEmail="john.doe@dayflow.com">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, John! Here's your overview</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Today's Status"
            value={stats.todayStatus}
            icon={Calendar}
            iconColor={stats.todayStatus === "Checked In" ? "bg-success/10 text-success" : ""}
          />
          <StatsCard title="Leave Balance" value={stats.leaveBalance} icon={FileCheck} />
          <StatsCard title="Current Salary" value={`$${stats.salary.toLocaleString()}`} icon={DollarSign} />
          <StatsCard
            title="Hours This Month"
            value={stats.hoursThisMonth}
            icon={Clock}
            iconColor="bg-chart-2/10 text-chart-2"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Attendance Summary</CardTitle>
              <CardDescription>Your attendance for January 2026</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-accent">
                  <span className="text-sm font-medium">Present Days</span>
                  <Badge className="bg-success hover:bg-success/90 text-success-foreground">
                    {stats.presentDays} days
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-accent">
                  <span className="text-sm font-medium">Absent Days</span>
                  <Badge variant="secondary">{stats.absentDays} day</Badge>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-accent">
                  <span className="text-sm font-medium">Leave Taken</span>
                  <Badge variant="secondary">{stats.leaveTaken} days</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Access your most used features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <button
                className="w-full p-3 text-left rounded-lg bg-accent hover:bg-accent/80 transition-colors"
                onClick={() => (window.location.href = "/employee/attendance")}
              >
                <p className="text-sm font-medium">Mark Attendance</p>
                <p className="text-xs text-muted-foreground">Check in or check out for today</p>
              </button>
              <button
                className="w-full p-3 text-left rounded-lg bg-accent hover:bg-accent/80 transition-colors"
                onClick={() => (window.location.href = "/employee/leave")}
              >
                <p className="text-sm font-medium">Apply for Leave</p>
                <p className="text-xs text-muted-foreground">Submit a new leave request</p>
              </button>
              <button
                className="w-full p-3 text-left rounded-lg bg-accent hover:bg-accent/80 transition-colors"
                onClick={() => (window.location.href = "/employee/profile")}
              >
                <p className="text-sm font-medium">View Profile</p>
                <p className="text-xs text-muted-foreground">Update your personal information</p>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
