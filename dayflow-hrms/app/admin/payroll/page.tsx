"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { initializeAdminUser } from "@/lib/user-utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Edit } from "lucide-react"
import { EditSalaryDialog } from "@/components/payroll/edit-salary-dialog"
import { getEmployees, type Employee } from "@/lib/local-storage"

export default function PayrollPage() {
  // Initialize admin user in localStorage
  useEffect(() => {
    initializeAdminUser()
  }, [])
  
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [employees, setEmployees] = useState<Employee[]>([])

  useEffect(() => {
    setEmployees(getEmployees())
  }, [])

  const refreshEmployees = () => {
    setEmployees(getEmployees())
  }

  const filteredPayroll = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.code.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const totalPayroll = employees.reduce((sum, emp) => sum + emp.salary, 0)
  const activeCount = employees.filter((emp) => emp.status === "active").length

  return (
    <DashboardLayout role="admin" userName="Admin User" userEmail="admin@dayflow.com">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Payroll Management</h1>
            <p className="text-muted-foreground mt-1">Manage employee salaries and payroll</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-primary hover:bg-primary/90">Process Payroll</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Annual Payroll</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalPayroll.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeCount}</div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Salary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${employees.length > 0 ? Math.round(totalPayroll / employees.length).toLocaleString() : 0}
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Cost</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${Math.round(totalPayroll / 12).toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-accent border-border"
          />
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Employee Salaries - 2026</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Employee</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Code</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Department</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Designation</th>
                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">Annual Salary</th>
                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">Monthly</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayroll.map((employee) => (
                    <tr key={employee.id} className="border-b border-border hover:bg-accent/50">
                      <td className="p-4 text-sm font-medium">{employee.name}</td>
                      <td className="p-4 text-sm text-muted-foreground">{employee.code}</td>
                      <td className="p-4 text-sm">{employee.department}</td>
                      <td className="p-4 text-sm">{employee.designation}</td>
                      <td className="p-4 text-sm text-right font-semibold">${employee.salary.toLocaleString()}</td>
                      <td className="p-4 text-sm text-right">${Math.round(employee.salary / 12).toLocaleString()}</td>
                      <td className="p-4">
                        <Badge
                          variant={employee.status === "active" ? "default" : "secondary"}
                          className={
                            employee.status === "active" ? "bg-success hover:bg-success/90 text-success-foreground" : ""
                          }
                        >
                          {employee.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedEmployee(employee)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedEmployee && (
        <EditSalaryDialog
          employee={selectedEmployee}
          open={!!selectedEmployee}
          onOpenChange={() => setSelectedEmployee(null)}
          onSuccess={refreshEmployees}
        />
      )}
    </DashboardLayout>
  )
}
