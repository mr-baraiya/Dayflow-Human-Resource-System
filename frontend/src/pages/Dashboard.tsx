import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Clock, CalendarDays, TrendingUp } from "lucide-react"

export default function Dashboard() {
    const stats = [
        {
            title: "Total Employees",
            value: "1",
            icon: Users,
            description: "Active employees",
            color: "text-blue-500",
        },
        {
            title: "Today's Attendance",
            value: "0",
            icon: Clock,
            description: "Employees present",
            color: "text-green-500",
        },
        {
            title: "Pending Requests",
            value: "0",
            icon: CalendarDays,
            description: "Leave approvals",
            color: "text-orange-500",
        },
        {
            title: "Growth",
            value: "+0%",
            icon: TrendingUp,
            description: "Since last month",
            color: "text-purple-500",
        },
    ]

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 shadow-sm">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-muted-foreground">
                            No recent activity to show.
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3 shadow-sm">
                    <CardHeader>
                        <CardTitle>Upcoming Leaves</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-muted-foreground">
                            No upcoming leaves.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
