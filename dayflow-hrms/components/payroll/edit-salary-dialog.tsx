"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateEmployee, type Employee } from "@/lib/local-storage"

interface EditSalaryDialogProps {
  employee: Employee
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function EditSalaryDialog({ employee, open, onOpenChange, onSuccess }: EditSalaryDialogProps) {
  const [salary, setSalary] = useState(employee.salary.toString())

  useEffect(() => {
    setSalary(employee.salary.toString())
  }, [employee])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    updateEmployee(employee.id, {
      salary: Number.parseFloat(salary) || 0,
    })

    onSuccess()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Salary</DialogTitle>
          <DialogDescription>
            Update annual salary for {employee.name} ({employee.code})
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="salary">Annual Salary ($)</Label>
            <Input
              id="salary"
              type="number"
              placeholder="75000"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
              className="bg-accent border-border"
            />
          </div>

          <div className="p-4 rounded-lg bg-accent border border-border space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">Annual:</span>
              <span className="text-xl font-bold text-primary">
                ${Number.parseFloat(salary || "0").toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">Monthly:</span>
              <span className="text-lg font-semibold">
                ${Math.round(Number.parseFloat(salary || "0") / 12).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
