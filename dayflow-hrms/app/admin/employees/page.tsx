"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { initializeAdminUser } from "@/lib/user-utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreVertical, Mail, Phone } from "lucide-react"
import { AddEmployeeDialog } from "@/components/employees/add-employee-dialog"
import { EditEmployeeDialog } from "@/components/employees/edit-employee-dialog"
import { getEmployees, deleteEmployee, updateEmployee, type Employee } from "@/lib/local-storage"

export default function EmployeesPage() {
  // Initialize admin user in localStorage
  useEffect(() => {
    initializeAdminUser()
  }, [])
  
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [employees, setEmployees] = useState<Employee[]>([])

  useEffect(() => {
    setEmployees(getEmployees())
  }, [])

  const refreshEmployees = () => {
    setEmployees(getEmployees())
  }

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      deleteEmployee(id)
      refreshEmployees()
    }
  }

  const handleToggleStatus = (employee: Employee) => {
    updateEmployee(employee.id, {
      status: employee.status === "active" ? "inactive" : "active",
    })
    refreshEmployees()
  }

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.code.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DashboardLayout role="admin" userName="Admin User" userEmail="admin@dayflow.com">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Employees</h1>
            <p className="text-muted-foreground mt-1">Manage your organization's employees</p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)} className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
        </div>

        <div className="flex items-center gap-4">
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

        <div className="grid gap-4">
          {filteredEmployees.map((employee) => (
            <div key={employee.id} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`/.jpg?height=48&width=48&query=${employee.name}`} />
                    <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-foreground">{employee.name}</h3>
                      <Badge
                        variant={employee.status === "active" ? "default" : "secondary"}
                        className={
                          employee.status === "active" ? "bg-success hover:bg-success/90 text-success-foreground" : ""
                        }
                      >
                        {employee.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="font-medium text-primary">{employee.code}</span>
                      <span>{employee.designation}</span>
                      <span>•</span>
                      <span>{employee.department}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5" />
                        {employee.email}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5" />
                        {employee.phone}
                      </div>
                    </div>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(employee)}>Edit Employee</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleToggleStatus(employee)}>
                      {employee.status === "active" ? "Deactivate" : "Activate"}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(employee.id)}>
                      Delete Employee
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddEmployeeDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onSuccess={refreshEmployees} />

      <EditEmployeeDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        employee={selectedEmployee}
        onSuccess={refreshEmployees}
      />
    </DashboardLayout>
  )
}
