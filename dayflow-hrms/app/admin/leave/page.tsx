"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { initializeAdminUser, getCurrentUser } from "@/lib/user-utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Search, Check, X, RefreshCw } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { getLeaves, updateLeave, addLeave, getEmployees } from "@/lib/local-storage"
import { useToast } from "@/hooks/use-toast"

export default function LeaveApprovalsPage() {
  const { toast } = useToast()
  const [currentUser, setCurrentUser] = useState<ReturnType<typeof getCurrentUser>>(null)
  
  // Initialize admin user in localStorage
  useEffect(() => {
    initializeAdminUser()
    const user = getCurrentUser()
    
    if (!user || user.role !== 'admin') {
      window.location.href = "/login"
      return
    }
    
    setCurrentUser(user)
  }, [])
  
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRequest, setSelectedRequest] = useState<ReturnType<typeof getLeaves>[0] | null>(null)
  const [comment, setComment] = useState("")
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null)
  const [leaves, setLeaves] = useState<ReturnType<typeof getLeaves>>([])
  const [lastUpdated, setLastUpdated] = useState(new Date())

  useEffect(() => {
    const loadLeaves = () => {
      const allLeaves = getLeaves()
      setLeaves(allLeaves)
      setLastUpdated(new Date())
    }
    
    loadLeaves()
    
    // Refresh leaves periodically to catch new employee requests
    const interval = setInterval(() => {
      loadLeaves()
    }, 3000) // Refresh every 3 seconds

    return () => clearInterval(interval)
  }, [])

  const refreshLeaves = () => {
    const allLeaves = getLeaves()
    setLeaves(allLeaves)
    setLastUpdated(new Date())
  }

  const filteredRequests = leaves.filter(
    (req) =>
      (req.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.employeeCode.toLowerCase().includes(searchQuery.toLowerCase())) &&
      req.status === "pending" // Only show pending requests
  )

  const stats = {
    pending: leaves.filter((l) => l.status === "pending").length,
    approvedThisMonth: leaves.filter((l) => l.status === "approved").length,
    onLeave: leaves.filter((l) => {
      const today = new Date().toISOString().split("T")[0]
      return l.status === "approved" && l.startDate <= today && l.endDate >= today
    }).length,
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

  const handleAction = async (action: "approve" | "reject") => {
    if (!selectedRequest) return

    // Update leave status
    updateLeave(selectedRequest.id, {
      status: action === "approve" ? "approved" : "rejected",
    })

    // Send email notification
    try {
      // Get employee email from employees list
      const employees = getEmployees()
      const employee = employees.find(emp => emp.id === selectedRequest.employeeId)
      
      if (employee?.email) {
        const response = await fetch('/api/leave-notification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            employeeEmail: employee.email,
            employeeName: selectedRequest.employeeName,
            action: action === "approve" ? "approved" : "rejected",
            leaveType: selectedRequest.type,
            startDate: selectedRequest.startDate,
            endDate: selectedRequest.endDate,
            days: selectedRequest.days,
          }),
        })

        const result = await response.json()
        
        if (result.success) {
          toast({
            title: action === "approve" ? "Leave Approved" : "Leave Rejected",
            description: `${selectedRequest.employeeName}'s leave request has been ${action === "approve" ? "approved" : "rejected"}. Email notification sent.`,
            variant: action === "approve" ? "default" : "destructive",
          })
        } else {
          toast({
            title: action === "approve" ? "Leave Approved" : "Leave Rejected",
            description: `${selectedRequest.employeeName}'s leave request has been ${action === "approve" ? "approved" : "rejected"}. (Email failed: ${result.error})`,
            variant: action === "approve" ? "default" : "destructive",
          })
        }
      } else {
        toast({
          title: action === "approve" ? "Leave Approved" : "Leave Rejected",
          description: `${selectedRequest.employeeName}'s leave request has been ${action === "approve" ? "approved" : "rejected"}. (No email address found)`,
          variant: action === "approve" ? "default" : "destructive",
        })
      }
    } catch (error) {
      toast({
        title: action === "approve" ? "Leave Approved" : "Leave Rejected",
        description: `${selectedRequest.employeeName}'s leave request has been ${action === "approve" ? "approved" : "rejected"}. (Email sending failed)`,
        variant: action === "approve" ? "default" : "destructive",
      })
    }

    refreshLeaves()
    setSelectedRequest(null)
    setComment("")
    setActionType(null)
  }

  const openActionDialog = (request: ReturnType<typeof getLeaves>[0], action: "approve" | "reject") => {
    setSelectedRequest(request)
    setActionType(action)
  }

  if (!currentUser) {
    return (
      <DashboardLayout role="admin" userName="Loading..." userEmail="">
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout role="admin" userName={currentUser.name} userEmail={currentUser.email}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Leave Approvals</h1>
            <p className="text-muted-foreground mt-1">Review and manage leave requests</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                if (confirm('Clear ALL leave requests? This cannot be undone!')) {
                  localStorage.removeItem('leaves')
                  refreshLeaves()
                  toast({
                    title: "Cleared",
                    description: "All leave requests have been cleared",
                  })
                }
              }}
              variant="destructive"
              size="sm"
            >
              Clear All
            </Button>
            <Button
              onClick={refreshLeaves}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Approved This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.approvedThisMonth}</div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Employees on Leave</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.onLeave}</div>
            </CardContent>
          </Card>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search leave requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-accent border-border"
          />
        </div>

        <div className="grid gap-4">
          {filteredRequests.length === 0 ? (
            <Card className="border-border">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  {searchQuery ? `No leave requests found matching "${searchQuery}"` : "No leave requests yet"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredRequests.map((request) => (
            <Card key={request.id} className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{request.employeeName}</h3>
                      <Badge variant="secondary" className="font-mono text-xs">
                        {request.employeeCode}
                      </Badge>
                      <Badge variant="default" className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Leave Type</p>
                        <p className="font-medium">{request.type}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Duration</p>
                        <p className="font-medium">{request.days} days</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Period</p>
                        <p className="font-medium">
                          {request.startDate} to {request.endDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Applied On</p>
                        <p className="font-medium">{request.appliedDate}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Reason</p>
                      <p className="text-sm mt-1">{request.reason}</p>
                    </div>
                  </div>
                  {request.status === "pending" && (
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-success border-success hover:bg-success hover:text-success-foreground bg-transparent"
                        onClick={() => openActionDialog(request, "approve")}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                        onClick={() => openActionDialog(request, "reject")}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )))}
        </div>
      </div>

      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Leave Request</DialogTitle>
            <DialogDescription>
              {selectedRequest?.employeeName}'s leave request for {selectedRequest?.days} days
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="comment">Comment (Optional)</Label>
              <Textarea
                id="comment"
                placeholder="Add a comment for the employee..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="bg-accent border-border"
                rows={4}
              />
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setSelectedRequest(null)}>
                Cancel
              </Button>
              {actionType === "approve" && (
                <Button
                  className="bg-success hover:bg-success/90 text-success-foreground"
                  onClick={() => handleAction("approve")}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Approve
                </Button>
              )}
              {actionType === "reject" && (
                <Button className="bg-destructive hover:bg-destructive/90" onClick={() => handleAction("reject")}>
                  <X className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
