import { Sidebar } from "./Sidebar"
import { Header } from "./Header"

interface DashboardLayoutProps {
    children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto">
                    <div className="container mx-auto p-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
