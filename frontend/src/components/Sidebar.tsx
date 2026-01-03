import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, Users, Calendar, Clock, LogOut, User as UserIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/authStore"

type SidebarItem = {
    icon: React.ElementType;
    label: string;
    href: string;
    adminOnly?: boolean;
}

const sidebarItems: SidebarItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Users, label: "My Profile", href: "/profile" },
    { icon: Clock, label: "Attendance", href: "/attendance" },
    { icon: Calendar, label: "Leave", href: "/leave" },
    { icon: Users, label: "Team Directory", href: "/directory" },
    { icon: Users, label: "Admin Panel", href: "/admin", adminOnly: true },
    { icon: UserIcon, label: "Manage Users", href: "/users", adminOnly: true },
]

export function Sidebar() {
    const location = useLocation()
    const { user, logout } = useAuthStore()

    return (
        <div className="flex h-screen w-64 flex-col border-r bg-card">
            <div className="flex h-14 items-center border-b px-6">
                <Link to="/" className="flex items-center gap-2 font-bold text-lg text-primary">
                    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                        D
                    </div>
                    Dayflow
                </Link>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
                <nav className="grid gap-1 px-2">
                    {sidebarItems.map((item, index) => {
                        if (item.adminOnly && user?.role !== "ADMIN") return null
                        const isActive = location.pathname === item.href
                        return (
                            <Link
                                key={index}
                                to={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>
            </div>
            <div className="border-t p-4">
                <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
                        {user?.name?.charAt(0) || "U"}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">{user?.name}</span>
                        <span className="text-xs text-muted-foreground capitalize">{user?.role?.toLowerCase()}</span>
                    </div>
                </div>
                <Button variant="outline" className="w-full justify-start gap-2" onClick={logout}>
                    <LogOut className="h-4 w-4" />
                    Logout
                </Button>
            </div>
        </div>
    )
}
