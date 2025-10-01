
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
import { MoreHorizontal, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

const patients = [
    { id: '1', name: 'Sameer Khan', email: 'sameer@example.com', lastVisit: '2023-10-15', conditions: ['Hypertension'], avatar: 'https://picsum.photos/seed/patient1/100/100' },
    { id: '2', name: 'Aisha Sharma', email: 'aisha@example.com', lastVisit: '2023-09-28', conditions: ['Diabetes'], avatar: 'https://picsum.photos/seed/patient2/100/100' },
    { id: '3', name: 'Priya Mehta', email: 'priya@example.com', lastVisit: '2023-11-01', conditions: ['Asthma', 'Allergies'], avatar: 'https://picsum.photos/seed/patient3/100/100' },
];

export default function PatientsPage() {
    const [filter, setFilter] = useState('');

    const filteredPatients = patients.filter(patient => 
        patient.name.toLowerCase().includes(filter.toLowerCase()) ||
        patient.email.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-headline font-bold">My Patients</h1>
                <p className="text-muted-foreground">Manage your patient roster and access their records.</p>
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
                                <TableHead>Patient</TableHead>
                                <TableHead>Last Visit</TableHead>
                                <TableHead>Chronic Conditions</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredPatients.map(patient => (
                                <TableRow key={patient.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={patient.avatar} alt={patient.name} />
                                                <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p>{patient.name}</p>
                                                <p className="text-sm text-muted-foreground">{patient.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{patient.lastVisit}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-1">
                                            {patient.conditions.map(cond => (
                                                <Badge key={cond} variant="secondary">{cond}</Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">View Profile</Button>
                                            <Button variant="ghost" size="icon"><MessageSquare className="size-4"/></Button>
                                        </div>
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
