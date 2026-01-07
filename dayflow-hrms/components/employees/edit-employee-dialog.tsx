"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Upload } from "lucide-react"
import { updateEmployee, type Employee } from "@/lib/local-storage"

interface EditEmployeeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  employee: Employee | null
  onSuccess: () => void
}

export function EditEmployeeDialog({ open, onOpenChange, employee, onSuccess }: EditEmployeeDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    dateOfJoining: "",
    salary: "",
    status: "active" as "active" | "inactive",
  })

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        designation: employee.designation,
        dateOfJoining: employee.dateOfJoining,
        salary: String(employee.salary),
        status: employee.status,
      })
    }
  }, [employee])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!employee) return

    updateEmployee(employee.id, {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      department: formData.department,
      designation: formData.designation,
      dateOfJoining: formData.dateOfJoining,
      salary: Number.parseFloat(formData.salary) || 0,
      status: formData.status,
    })

    onSuccess()
    onOpenChange(false)
  }

  if (!employee) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
          <DialogDescription>Update employee information</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-2xl">{formData.name ? formData.name.charAt(0) : "?"}</AvatarFallback>
            </Avatar>
            <Button type="button" variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload Photo
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-accent border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                placeholder="john.doe@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-accent border-border"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Phone Number</Label>
              <Input
                id="edit-phone"
                type="tel"
                placeholder="+1 234 567 8900"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="bg-accent border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-dateOfJoining">Date of Joining</Label>
              <Input
                id="edit-dateOfJoining"
                type="date"
                value={formData.dateOfJoining}
                onChange={(e) => setFormData({ ...formData, dateOfJoining: e.target.value })}
                required
                className="bg-accent border-border"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-department">Department</Label>
              <Input
                id="edit-department"
                placeholder="Engineering"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                required
                className="bg-accent border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-designation">Designation</Label>
              <Input
                id="edit-designation"
                placeholder="Senior Developer"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                required
                className="bg-accent border-border"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-salary">Annual Salary ($)</Label>
              <Input
                id="edit-salary"
                type="number"
                placeholder="75000"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                required
                className="bg-accent border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <select
                id="edit-status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "inactive" })}
                className="flex h-10 w-full rounded-md border border-border bg-accent px-3 py-2 text-sm"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Update Employee
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
