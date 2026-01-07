"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Calendar, Users, DollarSign } from "lucide-react"
import { getEmployees, getAttendance, getLeaves } from "@/lib/local-storage"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { initializeAdminUser } from "@/lib/user-utils"

export default function ReportsPage() {
  // Initialize admin user in localStorage
  useEffect(() => {
    initializeAdminUser()
  }, [])
  const [stats, setStats] = useState({
    totalEmployees: 0,
    avgAttendance: 0,
    totalPayroll: 0,
    leaveRequests: 0,
  })
  const [previewData, setPreviewData] = useState<any>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  useEffect(() => {
    calculateStats()
  }, [])

  const calculateStats = () => {
    const employees = getEmployees()
    const attendance = getAttendance()
    const leaves = getLeaves()

    const activeEmployees = employees.filter((e) => e.status === "active")
    const totalPayroll = employees.reduce((sum, e) => sum + e.salary, 0)
    const presentRecords = attendance.filter((a) => a.status === "present").length
    const avgAttendance = attendance.length > 0 ? (presentRecords / attendance.length) * 100 : 0

    setStats({
      totalEmployees: activeEmployees.length,
      avgAttendance: Math.round(avgAttendance),
      totalPayroll: totalPayroll,
      leaveRequests: leaves.filter((l) => l.status === "pending").length,
    })
  }

  const generateAttendanceReport = () => {
    const attendance = getAttendance()
    const csv = [
      ["Employee Name", "Employee Code", "Date", "Check In", "Check Out", "Hours", "Status"],
      ...attendance.map((a) => [a.employeeName, a.employeeCode, a.date, a.checkIn, a.checkOut, a.hours, a.status]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    return csv
  }

  const generatePayrollReport = () => {
    const employees = getEmployees()
    const csv = [
      ["Employee Name", "Employee Code", "Department", "Designation", "Salary", "Status"],
      ...employees.map((e) => [e.name, e.code, e.department, e.designation, e.salary.toString(), e.status]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    return csv
  }

  const generateEmployeeReport = () => {
    const employees = getEmployees()
    const csv = [
      ["Name", "Code", "Email", "Phone", "Department", "Designation", "Date of Joining", "Status"],
      ...employees.map((e) => [
        e.name,
        e.code,
        e.email,
        e.phone,
        e.department,
        e.designation,
        e.dateOfJoining,
        e.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    return csv
  }

  const generateLeaveReport = () => {
    const leaves = getLeaves()
    const csv = [
      ["Employee Name", "Employee Code", "Type", "Start Date", "End Date", "Days", "Reason", "Status", "Applied Date"],
      ...leaves.map((l) => [
        l.employeeName,
        l.employeeCode,
        l.type,
        l.startDate,
        l.endDate,
        l.days.toString(),
        l.reason,
        l.status,
        l.appliedDate,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    return csv
  }

  const downloadReport = (type: string) => {
    let csv = ""
    let filename = ""

    console.log("[v0] Generating report:", type)

    switch (type) {
      case "attendance":
        csv = generateAttendanceReport()
        filename = "attendance_report.csv"
        break
      case "payroll":
        csv = generatePayrollReport()
        filename = "payroll_report.csv"
        break
      case "employee":
        csv = generateEmployeeReport()
        filename = "employee_report.csv"
        break
      case "leave":
        csv = generateLeaveReport()
        filename = "leave_report.csv"
        break
    }

    console.log("[v0] CSV generated, length:", csv.length)

    try {
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute("download", filename)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      console.log("[v0] Download initiated:", filename)
    } catch (error) {
      console.error("[v0] Download error:", error)
    }
  }

  const previewReport = (type: string) => {
    let data: any = null

    switch (type) {
      case "attendance":
        data = {
          title: "Attendance Report",
          headers: ["Employee Name", "Employee Code", "Date", "Check In", "Check Out", "Hours", "Status"],
          rows: getAttendance().map((a) => [
            a.employeeName,
            a.employeeCode,
            a.date,
            a.checkIn,
            a.checkOut,
            a.hours,
            a.status,
          ]),
        }
        break
      case "payroll":
        data = {
          title: "Payroll Report",
          headers: ["Employee Name", "Employee Code", "Department", "Designation", "Salary", "Status"],
          rows: getEmployees().map((e) => [
            e.name,
            e.code,
            e.department,
            e.designation,
            `$${e.salary.toLocaleString()}`,
            e.status,
          ]),
        }
        break
      case "employee":
        data = {
          title: "Employee Report",
          headers: ["Name", "Code", "Email", "Department", "Designation", "Status"],
          rows: getEmployees().map((e) => [e.name, e.code, e.email, e.department, e.designation, e.status]),
        }
        break
      case "leave":
        data = {
          title: "Leave Report",
          headers: ["Employee Name", "Type", "Start Date", "End Date", "Days", "Status"],
          rows: getLeaves().map((l) => [l.employeeName, l.type, l.startDate, l.endDate, l.days.toString(), l.status]),
        }
        break
    }

    setPreviewData(data)
    setIsPreviewOpen(true)
  }

  const reportTypes = [
    {
      id: 1,
      type: "attendance",
      title: "Attendance Report",
      description: "Monthly attendance summary for all employees",
      icon: Calendar,
      period: "January 2026",
    },
    {
      id: 2,
      type: "payroll",
      title: "Payroll Report",
      description: "Salary breakdown and payment records",
      icon: DollarSign,
      period: "January 2026",
    },
    {
      id: 3,
      type: "employee",
      title: "Employee Report",
      description: "Complete employee database with departments",
      icon: Users,
      period: "As of Jan 3, 2026",
    },
    {
      id: 4,
      type: "leave",
      title: "Leave Report",
      description: "Leave requests and balance summary",
      icon: FileText,
      period: "January 2026",
    },
  ]

  return (
    <DashboardLayout role="admin" userName="Admin User" userEmail="admin@dayflow.com">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground mt-1">Generate and download various HRMS reports</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {reportTypes.map((report) => {
            const Icon = report.icon
            return (
              <Card key={report.id} className="border-border">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                        <CardDescription className="mt-1">{report.description}</CardDescription>
                        <p className="text-xs text-muted-foreground mt-2">Period: {report.period}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => previewReport(report.type)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button
                      className="flex-1 bg-primary hover:bg-primary/90"
                      onClick={() => downloadReport(report.type)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Overview of current month metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="p-4 rounded-lg bg-accent">
                <p className="text-sm text-muted-foreground mb-2">Total Employees</p>
                <p className="text-2xl font-bold">{stats.totalEmployees}</p>
              </div>
              <div className="p-4 rounded-lg bg-accent">
                <p className="text-sm text-muted-foreground mb-2">Avg. Attendance</p>
                <p className="text-2xl font-bold">{stats.avgAttendance}%</p>
              </div>
              <div className="p-4 rounded-lg bg-accent">
                <p className="text-sm text-muted-foreground mb-2">Total Payroll</p>
                <p className="text-2xl font-bold">${(stats.totalPayroll / 1000).toFixed(0)}K</p>
              </div>
              <div className="p-4 rounded-lg bg-accent">
                <p className="text-sm text-muted-foreground mb-2">Leave Requests</p>
                <p className="text-2xl font-bold">{stats.leaveRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{previewData?.title}</DialogTitle>
            <DialogDescription>Preview of report data</DialogDescription>
          </DialogHeader>
          {previewData && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {previewData.headers.map((header: string, idx: number) => (
                      <th key={idx} className="text-left p-2 font-medium text-muted-foreground">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.rows.map((row: string[], idx: number) => (
                    <tr key={idx} className="border-b border-border hover:bg-accent/50">
                      {row.map((cell: string, cellIdx: number) => (
                        <td key={cellIdx} className="p-2">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
