import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, CalendarDays, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminDashboard() {
    const { token } = useAuthStore();
    const [stats, setStats] = useState(null);
    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [statsRes, leavesRes] = await Promise.all([
                axios.get('http://localhost:3000/api/admin/stats', { headers: { Authorization: `Bearer ${token}` } }),
                axios.get('http://localhost:3000/api/admin/leaves', { headers: { Authorization: `Bearer ${token}` } })
            ]);
            setStats(statsRes.data);
            setLeaves(leavesRes.data);
        } catch (error) {
            console.error('Error fetching admin data:', error);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await axios.put(`http://localhost:3000/api/admin/leaves/${id}`, { status }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchData(); // Refresh data
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.totalEmployees || 0}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Present Today</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.presentToday || 0}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Leaves</CardTitle>
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.pendingLeaves || 0}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Leave Management Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Leave Requests Management</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Dates</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leaves.map((leave) => (
                                <TableRow key={leave.id}>
                                    <TableCell>
                                        <div className="font-medium">{leave.user.name}</div>
                                        <div className="text-xs text-muted-foreground">{leave.user.email}</div>
                                    </TableCell>
                                    <TableCell>{leave.type}</TableCell>
                                    <TableCell>
                                        {format(new Date(leave.startDate), 'MMM dd')} - {format(new Date(leave.endDate), 'MMM dd, yyyy')}
                                    </TableCell>
                                    <TableCell>{leave.reason}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            leave.status === 'APPROVED' ? 'default' :
                                                leave.status === 'REJECTED' ? 'destructive' : 'secondary'
                                        }>
                                            {leave.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {leave.status === 'PENDING' && (
                                            <div className="flex gap-2">
                                                <Button size="sm" onClick={() => handleStatusUpdate(leave.id, 'APPROVED')} className="bg-green-600 hover:bg-green-700 h-8">Approve</Button>
                                                <Button size="sm" variant="destructive" onClick={() => handleStatusUpdate(leave.id, 'REJECTED')} className="h-8">Reject</Button>
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {leaves.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center">No leave requests found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
