"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, TrendingUp, TrendingDown, Calendar } from "lucide-react"

const payrollData = {
  currentMonth: {
    month: "January 2026",
    basicSalary: 4500,
    allowances: 800,
    deductions: 300,
    netSalary: 5000,
    status: "processed",
  },
  previousMonths: [
    {
      id: 1,
      month: "December 2025",
      netSalary: 5000,
      status: "processed",
    },
    {
      id: 2,
      month: "November 2025",
      netSalary: 4950,
      status: "processed",
    },
    {
      id: 3,
      month: "October 2025",
      netSalary: 4900,
      status: "processed",
    },
  ],
  ytdTotal: 60000,
}

export default function EmployeePayrollPage() {
  return (
    <DashboardLayout role="employee" userName="John Doe" userEmail="john.doe@dayflow.com">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Payroll</h1>
          <p className="text-muted-foreground mt-1">View your salary details and payment history</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-border col-span-2 lg:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Current Month - {payrollData.currentMonth.month}</CardTitle>
                <Badge className="bg-success hover:bg-success/90 text-success-foreground">
                  {payrollData.currentMonth.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-accent">
                  <span className="text-sm text-muted-foreground">Basic Salary</span>
                  <span className="text-lg font-semibold">
                    ${payrollData.currentMonth.basicSalary.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-accent">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-sm text-muted-foreground">Allowances</span>
                  </div>
                  <span className="text-lg font-semibold text-success">
                    +${payrollData.currentMonth.allowances.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-accent">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-destructive" />
                    <span className="text-sm text-muted-foreground">Deductions</span>
                  </div>
                  <span className="text-lg font-semibold text-destructive">
                    -${payrollData.currentMonth.deductions.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-base font-medium text-muted-foreground">Net Salary</span>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-6 w-6 text-primary" />
                    <span className="text-3xl font-bold text-primary">
                      {payrollData.currentMonth.netSalary.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Salary Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-accent">
                <p className="text-sm text-muted-foreground mb-2">Year to Date (2026)</p>
                <p className="text-2xl font-bold">${payrollData.ytdTotal.toLocaleString()}</p>
              </div>
              <div className="p-4 rounded-lg bg-accent">
                <p className="text-sm text-muted-foreground mb-2">Average Monthly Salary</p>
                <p className="text-2xl font-bold">${Math.round(payrollData.ytdTotal / 12).toLocaleString()}</p>
              </div>
              <div className="p-4 rounded-lg bg-accent">
                <p className="text-sm text-muted-foreground mb-2">Payment Method</p>
                <p className="text-sm font-medium">Direct Bank Transfer</p>
                <p className="text-xs text-muted-foreground mt-1">Account ending in ****4567</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {payrollData.previousMonths.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 rounded-lg bg-accent">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{payment.month}</p>
                      <p className="text-xs text-muted-foreground">Direct Transfer</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">${payment.netSalary.toLocaleString()}</p>
                    <Badge className="bg-success hover:bg-success/90 text-success-foreground text-xs">
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
