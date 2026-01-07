"use client"

import type React from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getLeaves, addLeave, getEmployees, addEmployee } from "@/lib/local-storage"
import { getCurrentUser } from "@/lib/user-utils"
import { useToast } from "@/hooks/use-toast"

export default function EmployeeLeavePage() {
  const { toast } = useToast()
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false)
  const [leaveForm, setLeaveForm] = useState({
    type: "",
    startDate: "",
    endDate: "",
    reason: "",
  })
  const [leaves, setLeaves] = useState<ReturnType<typeof getLeaves>>([])
  const [currentEmployee, setCurrentEmployee] = useState<{ id: number; name: string; code: string; email: string } | null>(null)

  useEffect(() => {
    // Get current logged-in user
    const currentUser = getCurrentUser()
    
    if (!currentUser) {
      window.location.href = "/login"
      return
    }

    // Find corresponding employee record
    let employees = getEmployees()
    let employee = employees.find(emp => emp.email === currentUser.email)
    
    if (employee) {
      setCurrentEmployee({
        id: employee.id,
        name: employee.name,
        code: employee.code,
        email: employee.email
      })
    } else {
      // Create a new employee record if not found
      const newEmployee = addEmployee({
        name: currentUser.name || "Employee",
        email: currentUser.email,
        phone: "+1 000 000 0000",
        code: currentUser.employeeId || `EMP${Date.now()}`,
        department: "General",
        designation: currentUser.role === 'admin' ? "Administrator" : "Employee",
        status: "active" as const,
        dateOfJoining: new Date().toISOString().split('T')[0],
        salary: 50000
      })
      setCurrentEmployee({
        id: newEmployee.id,
        name: newEmployee.name,
        code: newEmployee.code,
        email: newEmployee.email
      })
    }
    
    setLeaves(getLeaves())

    // Refresh leaves periodically to catch admin approvals
    const interval = setInterval(() => {
      setLeaves(getLeaves())
    }, 3000) // Refresh every 3 seconds

    return () => clearInterval(interval)
  }, [])

  const refreshLeaves = () => {
    setLeaves(getLeaves())
  }

  // Filter leaves for current employee
  const employeeLeaves = currentEmployee ? leaves.filter((l) => l.employeeId === currentEmployee.id) : []

  const stats = {
    totalBalance: 20,
    taken: employeeLeaves.filter((l) => l.status === "approved").reduce((sum, l) => sum + l.days, 0),
    pending: employeeLeaves.filter((l) => l.status === "pending").length,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-success hover:bg-success/90 text-success-foreground"
      case "rejected":
        return "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
      case "pending":
        return "bg-warning hover:bg-warning/90 text-warning-foreground"
      default:
        return ""
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentEmployee) return

    const startDate = new Date(leaveForm.startDate)
    const endDate = new Date(leaveForm.endDate)
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1

    const newLeave = {
      employeeId: currentEmployee.id,
      employeeName: currentEmployee.name,
      employeeCode: currentEmployee.code,
      type: leaveForm.type === "paid" ? "Annual Leave" : leaveForm.type === "sick" ? "Sick Leave" : "Unpaid Leave",
      startDate: leaveForm.startDate,
      endDate: leaveForm.endDate,
      days,
      reason: leaveForm.reason,
      status: "pending" as const,
      appliedDate: new Date().toISOString().split("T")[0],
    }

    addLeave(newLeave)

    toast({
      title: "Leave Request Submitted",
      description: `Your leave request for ${days} day${days > 1 ? 's' : ''} has been submitted for approval.`,
    })

    refreshLeaves()
    setLeaveForm({ type: "", startDate: "", endDate: "", reason: "" })
    setIsApplyDialogOpen(false)
  }

  if (!currentEmployee) {
    return (
      <DashboardLayout role="employee" userName="Loading..." userEmail="">
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout role="employee" userName={currentEmployee.name} userEmail={currentEmployee.email}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Leave Requests</h1>
            <p className="text-muted-foreground mt-1">Apply and track your leave requests</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                if (confirm('Clear ALL your leave requests? This cannot be undone!')) {
                  localStorage.removeItem('leaves')
                  refreshLeaves()
                  toast({
                    title: "Cleared",
                    description: "All your leave requests have been cleared",
                  })
                }
              }}
              variant="destructive"
              size="sm"
            >
              Clear All
            </Button>
            <Button onClick={() => setIsApplyDialogOpen(true)} className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Apply Leave
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Leave Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBalance - stats.taken} days</div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Leave Taken</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.taken} days</div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Leave History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employeeLeaves.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No leave requests yet</p>
              ) : (
                employeeLeaves.map((leave) => (
                  <div key={leave.id} className="p-4 rounded-lg border border-border hover:bg-accent/50">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{leave.type}</h3>
                          <Badge variant="default" className={getStatusColor(leave.status)}>
                            {leave.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>
                            {leave.startDate} to {leave.endDate} ({leave.days} days)
                          </p>
                          <p className="mt-1">Reason: {leave.reason}</p>
                          <p className="mt-1">Applied: {leave.appliedDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply for Leave</DialogTitle>
            <DialogDescription>Fill in the details to submit your leave request</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="type">Leave Type</Label>
              <Select value={leaveForm.type} onValueChange={(value) => setLeaveForm({ ...leaveForm, type: value })}>
                <SelectTrigger className="bg-accent border-border">
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Annual Leave</SelectItem>
                  <SelectItem value="sick">Sick Leave</SelectItem>
                  <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={leaveForm.startDate}
                  onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                  required
                  className="bg-accent border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={leaveForm.endDate}
                  onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                  required
                  className="bg-accent border-border"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason</Label>
              <Textarea
                id="reason"
                placeholder="Provide a reason for your leave..."
                value={leaveForm.reason}
                onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                required
                className="bg-accent border-border"
                rows={4}
              />
            </div>
            <div className="flex gap-3 justify-end pt-4">
              <Button type="button" variant="outline" onClick={() => setIsApplyDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Submit Request
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
