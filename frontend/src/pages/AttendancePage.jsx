import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default function AttendancePage() {
    const { token } = useAuthStore();
    const [attendance, setAttendance] = useState([]);
    const [todayRecord, setTodayRecord] = useState(null);

    useEffect(() => {
        fetchAttendance();
    }, []);

    const fetchAttendance = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/attendance', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAttendance(response.data);

            // Check for today's record
            const todayStr = new Date().toDateString();
            const today = response.data.find((r) => new Date(r.date).toDateString() === todayStr);
            setTodayRecord(today || null);
        } catch (error) {
            console.error('Error fetching attendance:', error);
        }
    };

    const handleCheckIn = async () => {
        try {
            await axios.post('http://localhost:3000/api/attendance/check-in', {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchAttendance();
        } catch (error) {
            alert(error.response?.data?.message || 'Check-in failed');
        }
    };

    const handleCheckOut = async () => {
        try {
            await axios.post('http://localhost:3000/api/attendance/check-out', {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchAttendance();
        } catch (error) {
            alert(error.response?.data?.message || 'Check-out failed');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
                <div className="flex gap-4">
                    {!todayRecord && (
                        <Button onClick={handleCheckIn} className="bg-green-600 hover:bg-green-700">Check In</Button>
                    )}
                    {todayRecord && !todayRecord.checkOut && (
                        <Button onClick={handleCheckOut} variant="destructive">Check Out</Button>
                    )}
                    {todayRecord && todayRecord.checkOut && (
                        <Badge variant="outline" className="text-lg py-1 px-4">Completed for Today</Badge>
                    )}
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Today's Status</CardTitle>
                        <CardDescription>
                            {format(new Date(), 'EEEE, MMMM do, yyyy')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-sm text-muted-foreground">Check In</div>
                                <div className="text-2xl font-bold">
                                    {todayRecord?.checkIn ? format(new Date(todayRecord.checkIn), 'hh:mm a') : '--:--'}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">Check Out</div>
                                <div className="text-2xl font-bold">
                                    {todayRecord?.checkOut ? format(new Date(todayRecord.checkOut), 'hh:mm a') : '--:--'}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">Status</div>
                                <Badge>{todayRecord?.status || 'Not Checked In'}</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Attendance History</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Check In</TableHead>
                                <TableHead>Check Out</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {attendance.map((record) => (
                                <TableRow key={record.id}>
                                    <TableCell>{format(new Date(record.date), 'MMM dd, yyyy')}</TableCell>
                                    <TableCell>{record.checkIn ? format(new Date(record.checkIn), 'hh:mm a') : '-'}</TableCell>
                                    <TableCell>{record.checkOut ? format(new Date(record.checkOut), 'hh:mm a') : '-'}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">{record.status}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {attendance.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">No attendance records found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
