"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { initializeAdminUser } from "@/lib/user-utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Download, Clock } from "lucide-react"
import { getAttendance, addAttendance, getEmployees } from "@/lib/local-storage"
import { useToast } from "@/hooks/use-toast"

export default function AttendancePage() {
  const { toast } = useToast()
  
  // Initialize admin user in localStorage
  useEffect(() => {
    initializeAdminUser()
  }, [])
  
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [attendance, setAttendance] = useState<ReturnType<typeof getAttendance>>([])

  useEffect(() => {
    setAttendance(getAttendance())
    
    // Auto-refresh every 3 seconds to catch employee check-ins/outs
    const interval = setInterval(() => {
      setAttendance(getAttendance())
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const refreshAttendance = () => {
    setAttendance(getAttendance())
  }

  const handleMarkAttendance = () => {
    const employees = getEmployees()
    const currentTime = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    let marked = 0

    employees.forEach((emp) => {
      // Check if already marked for today
      const existing = attendance.find((a) => a.employeeId === emp.id && a.date === selectedDate)

      if (!existing) {
        addAttendance({
          employeeId: emp.id,
          employeeName: emp.name,
          employeeCode: emp.code,
          date: selectedDate,
          checkIn: currentTime,
          checkOut: "-",
          status: "present",
          hours: "0h",
        })
        marked++
      }
    })

    refreshAttendance()
    toast({
      title: "Attendance Marked",
      description: `Marked attendance for ${marked} employee${marked !== 1 ? 's' : ''}.`,
    })
  }

  const handleExport = () => {
    const csvContent = [
      ['Employee', 'Code', 'Date', 'Check In', 'Check Out', 'Hours', 'Status'],
      ...filteredAttendance.map(record => [
        record.employeeName,
        record.employeeCode,
        record.date,
        record.checkIn,
        record.checkOut,
        record.hours,
        record.status
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `attendance-${selectedDate}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    toast({
      title: "Export Successful",
      description: `Downloaded attendance records for ${selectedDate}.`,
    })
  }

  const filteredAttendance = attendance.filter(
    (record) =>
      record.date === selectedDate &&
      (record.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.employeeCode.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const stats = {
    present: filteredAttendance.filter((r) => r.status === "present").length,
    absent: filteredAttendance.filter((r) => r.status === "absent").length,
    halfDay: filteredAttendance.filter((r) => r.status === "half-day").length,
    leave: filteredAttendance.filter((r) => r.status === "leave").length,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-success hover:bg-success/90 text-success-foreground"
      case "absent":
        return "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
      case "half-day":
        return "bg-warning hover:bg-warning/90 text-warning-foreground"
      case "leave":
        return "bg-primary hover:bg-primary/90"
      default:
        return ""
    }
  }

  return (
    <DashboardLayout role="admin" userName="Admin User" userEmail="admin@dayflow.com">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Attendance Management</h1>
            <p className="text-muted-foreground mt-1">Track and manage employee attendance</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleMarkAttendance} className="bg-primary hover:bg-primary/90">
              <Clock className="h-4 w-4 mr-2" />
              Mark Attendance
            </Button>
            <Button onClick={handleExport} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Present</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.present}</div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Absent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.absent}</div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Half Day</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.halfDay}</div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">On Leave</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.leave}</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center gap-4">
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-auto bg-accent border-border"
          />
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-accent border-border"
            />
          </div>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Attendance Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Employee</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Employee Code</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Check In</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Check Out</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Hours</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendance.map((record) => (
                    <tr key={record.id} className="border-b border-border hover:bg-accent/50">
                      <td className="p-4 text-sm font-medium">{record.employeeName}</td>
                      <td className="p-4 text-sm text-muted-foreground">{record.employeeCode}</td>
                      <td className="p-4 text-sm text-muted-foreground">{record.date}</td>
                      <td className="p-4 text-sm">{record.checkIn}</td>
                      <td className="p-4 text-sm">{record.checkOut}</td>
                      <td className="p-4 text-sm">{record.hours}</td>
                      <td className="p-4">
                        <Badge variant="default" className={getStatusColor(record.status)}>
                          {record.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
