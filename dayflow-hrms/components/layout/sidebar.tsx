"use client"

import { Suspense } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileCheck,
  DollarSign,
  BarChart3,
  User,
  LogOut,
} from "lucide-react"
import { Logo } from "@/components/ui/logo"

interface SidebarProps {
  role: "admin" | "employee"
}

function SidebarContent({ role }: SidebarProps) {
  const pathname = usePathname()

  const adminMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
    { icon: Users, label: "Employees", href: "/admin/employees" },
    { icon: Calendar, label: "Attendance", href: "/admin/attendance" },
    { icon: FileCheck, label: "Leave Approvals", href: "/admin/leave" },
    { icon: DollarSign, label: "Payroll", href: "/admin/payroll" },
    { icon: BarChart3, label: "Reports", href: "/admin/reports" },
    { icon: User, label: "My Profile", href: "/admin/profile" },
  ]

  const employeeMenuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/employee/dashboard" },
    { icon: User, label: "My Profile", href: "/employee/profile" },
    { icon: Calendar, label: "Attendance", href: "/employee/attendance" },
    { icon: FileCheck, label: "Leave Requests", href: "/employee/leave" },
    { icon: DollarSign, label: "Payroll", href: "/employee/payroll" },
  ]

  const menuItems = role === "admin" ? adminMenuItems : employeeMenuItems

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <Link href={`/${role}/dashboard`} className="flex items-center gap-3 group">
          <Logo size={40} />
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative group",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-lg shadow-primary/5"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
              )}
              <Icon className={cn("h-5 w-5 transition-transform duration-200", isActive && "scale-110")} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={() => (window.location.href = "/")}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 w-full transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  )
}

export function Sidebar({ role }: SidebarProps) {
  return (
    <Suspense fallback={null}>
      <SidebarContent role={role} />
    </Suspense>
  )
}
