import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: string
    isPositive: boolean
  }
  iconColor?: string
}

export function StatsCard({ title, value, icon: Icon, trend, iconColor }: StatsCardProps) {
  return (
    <Card className="border-border transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div
          className={cn(
            "p-2.5 rounded-xl transition-all duration-200",
            iconColor || "bg-primary/10 group-hover:bg-primary/15",
          )}
        >
          <Icon className={cn("h-5 w-5", iconColor ? "text-current" : "text-primary")} />
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="text-3xl font-bold tracking-tight">{value}</div>
        {trend && (
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <span className={cn("font-medium", trend.isPositive ? "text-success" : "text-destructive")}>
              {trend.value}
            </span>
            <span>from last month</span>
          </p>
        )}
      </CardContent>
    </Card>
  )
}
