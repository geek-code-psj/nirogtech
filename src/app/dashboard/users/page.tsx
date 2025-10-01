'use client';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

const users = [
    { id: '1', name: 'Sameer Khan', email: 'sameer@example.com', role: 'patient', status: 'Active', joined: '2023-01-15', avatar: 'https://picsum.photos/seed/user1/100/100' },
    { id: '2', name: 'Dr. Anjali Rao', email: 'anjali@example.com', role: 'doctor', status: 'Active', joined: '2022-11-20', avatar: 'https://picsum.photos/seed/doc1/100/100' },
    { id: '3', name: 'Rohan Verma', email: 'rohan@example.com', role: 'student', status: 'Active', joined: '2023-05-10', avatar: 'https://picsum.photos/seed/user3/100/100' },
    { id: '4', name: 'Admin User', email: 'admin@nirogtech.com', role: 'admin', status: 'Active', joined: '2022-01-01', avatar: 'https://picsum.photos/seed/admin/100/100' },
    { id: '5', name: 'Aisha Sharma', email: 'aisha@example.com', role: 'patient', status: 'Inactive', joined: '2023-02-28', avatar: 'https://picsum.photos/seed/user2/100/100' },
];

const roleColors: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
    patient: 'secondary',
    doctor: 'default',
    student: 'outline',
    admin: 'destructive'
};

export default function UserManagementPage() {
    const [filter, setFilter] = useState('');

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(filter.toLowerCase()) ||
        user.email.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-headline font-bold">User Management</h1>
                    <p className="text-muted-foreground">View, manage, and edit user accounts.</p>
                </div>
                <Button><PlusCircle className="mr-2" />Add User</Button>
            </div>
            
            <Card>
                 <CardHeader>
                    <Input 
                        placeholder="Filter by name or email..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date Joined</TableHead>
                                <TableHead>
                                <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={user.avatar} alt={user.name} />
                                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p>{user.name}</p>
                                                <p className="text-sm text-muted-foreground">{user.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={roleColors[user.role]} className="capitalize">{user.role}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={user.status === 'Active' ? 'default' : 'destructive'} className="bg-green-500/20 text-green-700 dark:bg-green-500/10 dark:text-green-400 border-green-500/30">{user.status}</Badge>
                                    </TableCell>
                                    <TableCell>{user.joined}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
