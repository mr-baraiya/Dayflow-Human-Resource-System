"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StatsCard } from "@/components/ui/stats-card"
import { Users, FileCheck, Calendar, DollarSign, TrendingUp, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getEmployees, getAttendance, getLeaves } from "@/lib/local-storage"
import { initializeAdminUser } from "@/lib/user-utils"

export default function AdminDashboard() {
  // Initialize admin user in localStorage
  useEffect(() => {
    initializeAdminUser()
  }, [])
  const [stats, setStats] = useState({
    totalEmployees: 0,
    pendingLeaves: 0,
    todayAttendance: 0,
    monthlyPayroll: 0,
  })
  const [recentLeaveRequests, setRecentLeaveRequests] = useState<any[]>([])

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = () => {
    const employees = getEmployees()
    const attendance = getAttendance()
    const leaves = getLeaves()

    const activeEmployees = employees.filter((e) => e.status === "active")
    const pendingLeaves = leaves.filter((l) => l.status === "pending")
    const today = new Date().toISOString().split("T")[0]
    const todayAttendance = attendance.filter((a) => a.date === today && a.status === "present")
    const attendancePercentage =
      activeEmployees.length > 0 ? Math.round((todayAttendance.length / activeEmployees.length) * 100) : 0
    const totalPayroll = employees.reduce((sum, e) => sum + e.salary, 0)

    setStats({
      totalEmployees: activeEmployees.length,
      pendingLeaves: pendingLeaves.length,
      todayAttendance: attendancePercentage,
      monthlyPayroll: totalPayroll,
    })

    const recentLeaves = leaves
      .slice(-3)
      .reverse()
      .map((leave) => ({
        id: leave.id,
        employee: leave.employeeName,
        type: leave.type,
        dates: `${leave.startDate} to ${leave.endDate}`,
        status: leave.status,
      }))

    setRecentLeaveRequests(recentLeaves)
  }

  return (
    <DashboardLayout role="admin" userName="Admin User" userEmail="admin@dayflow.com">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-lg">Welcome back! Here's what's happening today</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Employees"
            value={stats.totalEmployees}
            icon={Users}
            trend={{ value: "+12%", isPositive: true }}
          />
          <StatsCard
            title="Pending Leave Requests"
            value={stats.pendingLeaves}
            icon={FileCheck}
            iconColor="bg-warning/10 text-warning"
          />
          <StatsCard
            title="Today's Attendance"
            value={`${stats.todayAttendance}%`}
            icon={Calendar}
            trend={{ value: "+2%", isPositive: true }}
            iconColor="bg-success/10 text-success"
          />
          <StatsCard
            title="Monthly Payroll"
            value={`$${(stats.monthlyPayroll / 1000).toFixed(0)}K`}
            icon={DollarSign}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-border transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Recent Leave Requests</CardTitle>
                  <CardDescription className="mt-1.5">Latest requests requiring your attention</CardDescription>
                </div>
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              {recentLeaveRequests.length === 0 ? (
                <div className="text-center py-12">
                  <FileCheck className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">No recent leave requests</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentLeaveRequests.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-accent/50 border border-border hover:border-primary/20 transition-all duration-200"
                    >
                      <div className="space-y-1.5">
                        <p className="text-sm font-semibold">{request.employee}</p>
                        <p className="text-xs text-muted-foreground">
                          {request.type} • {request.dates}
                        </p>
                      </div>
                      <Badge
                        variant={request.status === "approved" ? "default" : "secondary"}
                        className={
                          request.status === "approved"
                            ? "bg-success hover:bg-success/90 text-success-foreground"
                            : request.status === "rejected"
                              ? "bg-destructive hover:bg-destructive/90"
                              : "bg-warning/10 text-warning border-warning/20"
                        }
                      >
                        {request.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Quick Actions</CardTitle>
                  <CardDescription className="mt-1.5">Frequently used actions</CardDescription>
                </div>
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <button
                className="w-full p-4 text-left rounded-xl bg-accent/50 hover:bg-primary/10 border border-border hover:border-primary/30 transition-all duration-200 group"
                onClick={() => (window.location.href = "/admin/employees")}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold group-hover:text-primary transition-colors">Add New Employee</p>
                    <p className="text-xs text-muted-foreground mt-1">Register a new employee in the system</p>
                  </div>
                  <Users className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </button>
              <button
                className="w-full p-4 text-left rounded-xl bg-accent/50 hover:bg-primary/10 border border-border hover:border-primary/30 transition-all duration-200 group"
                onClick={() => (window.location.href = "/admin/payroll")}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold group-hover:text-primary transition-colors">Process Payroll</p>
                    <p className="text-xs text-muted-foreground mt-1">Generate monthly payroll for all employees</p>
                  </div>
                  <DollarSign className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </button>
              <button
                className="w-full p-4 text-left rounded-xl bg-accent/50 hover:bg-primary/10 border border-border hover:border-primary/30 transition-all duration-200 group"
                onClick={() => (window.location.href = "/admin/reports")}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold group-hover:text-primary transition-colors">Generate Reports</p>
                    <p className="text-xs text-muted-foreground mt-1">View attendance and payroll analytics</p>
                  </div>
                  <TrendingUp className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
