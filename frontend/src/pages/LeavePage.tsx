import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import type { LeaveRequest } from '@/types';

const leaveSchema = z.object({
    type: z.enum(['SICK', 'CASUAL', 'EARNED']),
    startDate: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date'),
    endDate: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date'),
    reason: z.string().min(5, 'Reason must be at least 5 characters'),
});

export default function LeavePage() {
    const { token } = useAuthStore();
    const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
    const [isApplying, setIsApplying] = useState(false);

    const form = useForm<z.infer<typeof leaveSchema>>({
        resolver: zodResolver(leaveSchema),
        defaultValues: {
            type: 'CASUAL',
            reason: '',
        },
    });

    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/leave', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setLeaves(response.data);
        } catch (error) {
            console.error('Error fetching leaves:', error);
        }
    };

    const onSubmit = async (values: z.infer<typeof leaveSchema>) => {
        try {
            await axios.post('http://localhost:3000/api/leave', values, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setIsApplying(false);
            form.reset();
            fetchLeaves();
            alert('Leave application submitted successfully');
        } catch (error) {
            console.error('Error applying for leave:', error);
            alert('Failed to apply for leave');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
                <Button onClick={() => setIsApplying(!isApplying)}>
                    {isApplying ? 'Cancel' : 'Apply for Leave'}
                </Button>
            </div>

            {isApplying && (
                <Card>
                    <CardHeader>
                        <CardTitle>Apply for Leave</CardTitle>
                        <CardDescription>Submit a new leave request.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Type</FormLabel>
                                            <FormControl>
                                                <select
                                                    {...field}
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    <option value="CASUAL">Casual Leave</option>
                                                    <option value="SICK">Sick Leave</option>
                                                    <option value="EARNED">Earned Leave</option>
                                                </select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="startDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Start Date</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="endDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>End Date</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="reason"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Reason</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Reason for leave..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Submit Request</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>My Leave History</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>From</TableHead>
                                <TableHead>To</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leaves.map((leave) => (
                                <TableRow key={leave.id}>
                                    <TableCell>{leave.type}</TableCell>
                                    <TableCell>{format(new Date(leave.startDate), 'MMM dd, yyyy')}</TableCell>
                                    <TableCell>{format(new Date(leave.endDate), 'MMM dd, yyyy')}</TableCell>
                                    <TableCell>{leave.reason}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            leave.status === 'APPROVED' ? 'default' :
                                                leave.status === 'REJECTED' ? 'destructive' : 'secondary'
                                        }>
                                            {leave.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {leaves.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">No leave requests found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
