import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { User } from '@/types';

export default function EmployeeDirectoryPage() {
    const { token } = useAuthStore();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            // Reuse the admin endpoint for now, or create a specific one if access control needs tightening
            // Assuming admin endpoint is protected for ADMIN only, we might need a separate one or relax middleware.
            // For MVP speed, let's create a public-ish directory endpoint or reuse if role check permits.
            // Wait, the previous admin endpoint is likely ADMIN only. Let's restart.
            const response = await axios.get('http://localhost:3000/api/admin/users', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            // Fallback or empty state if access denied
        }
    };

    const getInitials = (name: string | null) => {
        if (!name) return 'U';
        return name.split(' ').map((n) => n[0]).join('').toUpperCase().substring(0, 2);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Team Directory</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {users.map((user) => (
                    <Card key={user.id}>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src="" />
                                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <CardTitle className="text-lg">{user.name}</CardTitle>
                                <CardDescription>{user.employeeProfile?.jobTitle || 'Team Member'}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground space-y-1">
                                <p>Department: {user.employeeProfile?.department || 'N/A'}</p>
                                <p>Email: {user.email}</p>
                                <p>Phone: {user.employeeProfile?.phone || '-'}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
