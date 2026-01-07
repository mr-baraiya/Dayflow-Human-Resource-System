"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, LogIn, LogOut } from "lucide-react"
import { getAttendance, checkIn, checkOut, type AttendanceRecord } from "@/lib/local-storage"
import { useToast } from "@/hooks/use-toast"

export default function EmployeeAttendancePage() {
  const { toast } = useToast()
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([])
  const [todayRecord, setTodayRecord] = useState<AttendanceRecord | null>(null)
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const userStr = localStorage.getItem("currentUser")
    if (userStr) {
      const user = JSON.parse(userStr)
      setCurrentUser(user)
      loadAttendance(user.employeeId || "EMP001")
    } else {
      loadAttendance("EMP001")
    }
  }, [])

  const loadAttendance = (employeeCode: string) => {
    console.log("[v0] Loading attendance for:", employeeCode)
    const records = getAttendance()
    const employeeRecords = records.filter((r) => r.employeeCode === employeeCode)
    setAttendance(employeeRecords)

    // Check if already checked in today
    const today = new Date().toISOString().split("T")[0]
    const todayRec = employeeRecords.find((r) => r.date === today)
    console.log("[v0] Today's record:", todayRec)
    setTodayRecord(todayRec || null)
    setIsCheckedIn(todayRec ? todayRec.checkOut === "-" : false)
  }

  const handleCheckIn = () => {
    const employeeCode = currentUser?.employeeId || "EMP001"
    const employeeName = currentUser?.name || "John Doe"
    const employeeId = currentUser?.id || 1

    console.log("[v0] Checking in:", { employeeId, employeeName, employeeCode })
    const record = checkIn(employeeId, employeeName, employeeCode)
    console.log("[v0] Check-in successful:", record)
    setTodayRecord(record)
    setIsCheckedIn(true)
    loadAttendance(employeeCode)
    
    toast({
      title: "Checked In Successfully",
      description: `Welcome! Your attendance has been marked at ${record.checkIn}.`,
    })
  }

  const handleCheckOut = () => {
    if (todayRecord) {
      console.log("[v0] Checking out:", todayRecord.id)
      const updated = checkOut(todayRecord.id)
      setIsCheckedIn(false)
      const employeeCode = currentUser?.employeeId || "EMP001"
      loadAttendance(employeeCode)
      
      if (updated) {
        toast({
          title: "Checked Out Successfully",
          description: `You worked ${updated.hours} today. Have a great day!`,
        })
      }
    }
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

  const presentDays = attendance.filter((r) => r.status === "present").length
  const totalHours = attendance.reduce((sum, r) => {
    const hours = Number.parseInt(r.hours) || 0
    return sum + hours
  }, 0)

  return (
    <DashboardLayout
      role="employee"
      userName={currentUser?.name || "John Doe"}
      userEmail={currentUser?.email || "john.doe@dayflow.com"}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Attendance</h1>
          <p className="text-muted-foreground mt-1">Track your attendance and work hours</p>
        </div>

        {/* Check In/Out Card */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Today's Attendance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayRecord ? (
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Check In: {todayRecord.checkIn}</p>
                  <p className="text-sm text-muted-foreground">Check Out: {todayRecord.checkOut}</p>
                  <p className="text-sm text-muted-foreground">Hours: {todayRecord.hours}</p>
                </div>
                <div>
                  {isCheckedIn ? (
                    <Button onClick={handleCheckOut} variant="destructive" className="gap-2">
                      <LogOut className="h-4 w-4" />
                      Check Out
                    </Button>
                  ) : (
                    <Badge variant="default" className="bg-success">
                      Checked Out
                    </Badge>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <Clock className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">You haven't checked in today</p>
                <Button onClick={handleCheckIn} className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Check In
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Present Days (Jan)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{presentDays}</div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Hours (Jan)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalHours}h</div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Hours/Day</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{presentDays > 0 ? (totalHours / presentDays).toFixed(1) : 0}h</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Attendance History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Check In</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Check Out</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Hours</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((record) => (
                    <tr key={record.id} className="border-b border-border hover:bg-accent/50">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{record.date}</span>
                        </div>
                      </td>
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
