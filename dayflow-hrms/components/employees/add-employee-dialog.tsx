"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Upload } from "lucide-react"
import { addEmployee } from "@/lib/local-storage"

interface AddEmployeeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function AddEmployeeDialog({ open, onOpenChange, onSuccess }: AddEmployeeDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    dateOfJoining: "",
    salary: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const employeeCount = JSON.parse(localStorage.getItem("employees") || "[]").length
    const code = `EMP${String(employeeCount + 1).padStart(3, "0")}`

    addEmployee({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      department: formData.department,
      designation: formData.designation,
      dateOfJoining: formData.dateOfJoining,
      code,
      status: "active",
      salary: Number.parseFloat(formData.salary) || 0,
    })

    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
      designation: "",
      dateOfJoining: "",
      salary: "",
    })
    onSuccess()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
          <DialogDescription>Register a new employee in the system</DialogDescription>
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
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-accent border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
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
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 234 567 8900"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="bg-accent border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfJoining">Date of Joining</Label>
              <Input
                id="dateOfJoining"
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
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                placeholder="Engineering"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                required
                className="bg-accent border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Input
                id="designation"
                placeholder="Senior Developer"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                required
                className="bg-accent border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="salary">Annual Salary ($)</Label>
            <Input
              id="salary"
              type="number"
              placeholder="75000"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              required
              className="bg-accent border-border"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Add Employee
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
