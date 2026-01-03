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
import type { User } from '@/types';

const profileSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    phone: z.string().optional(),
    address: z.string().optional(),
});

export default function ProfilePage() {
    const { token } = useAuthStore();
    const [user, setUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: '',
            phone: '',
            address: '',
        },
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/profile', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data);
            form.reset({
                name: response.data.name || '',
                phone: response.data.employeeProfile?.phone || '',
                address: response.data.employeeProfile?.address || '',
            });
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const onSubmit = async (values: z.infer<typeof profileSchema>) => {
        try {
            await axios.put('http://localhost:3000/api/profile', values, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setIsEditing(false);
            fetchProfile();
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
                <Button onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Manage your personal details here.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isEditing ? (
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Address</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit">Save Changes</Button>
                                </form>
                            </Form>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-medium text-sm text-muted-foreground">Name</h3>
                                    <p>{user.name}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-sm text-muted-foreground">Email</h3>
                                    <p>{user.email}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-sm text-muted-foreground">Phone</h3>
                                    <p>{user.employeeProfile?.phone || '-'}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-sm text-muted-foreground">Address</h3>
                                    <p>{user.employeeProfile?.address || '-'}</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Job Details</CardTitle>
                        <CardDescription>Your employment information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-medium text-sm text-muted-foreground">Role</h3>
                            <p className="capitalize">{user.role.toLowerCase()}</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-sm text-muted-foreground">Department</h3>
                            <p>{user.employeeProfile?.department || '-'}</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-sm text-muted-foreground">Job Title</h3>
                            <p>{user.employeeProfile?.jobTitle || '-'}</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-sm text-muted-foreground">Joining Date</h3>
                            <p>{user.employeeProfile?.joiningDate ? new Date(user.employeeProfile.joiningDate).toLocaleDateString() : '-'}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
