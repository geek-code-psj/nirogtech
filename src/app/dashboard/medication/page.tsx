'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, PlusCircle, Trash, Edit } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

const medications = [
    { id: 1, name: 'Metformin', dosage: '1 tablet', time: '8:00 AM', instruction: 'After Breakfast', active: true },
    { id: 2, name: 'Atorvastatin', dosage: '1 tablet', time: '9:00 PM', instruction: 'After Dinner', active: true },
    { id: 3, name: 'Lisinopril', dosage: '1 tablet', time: '8:00 AM', instruction: 'Before Breakfast', active: false },
];

export default function MedicationPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-headline font-bold">Medication Reminders</h1>
                    <p className="text-muted-foreground">Manage your medication schedule and reminders.</p>
                </div>
                <Button><PlusCircle className="mr-2" />Add Medication</Button>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Your Medications</CardTitle>
                    <CardDescription>All your prescribed medications are listed here. Toggle the switch to activate or deactivate reminders.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {medications.map(med => (
                        <div key={med.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-lg border">
                           <div className="flex items-center gap-4 flex-1">
                                <Bell className={`size-6 ${med.active ? 'text-primary' : 'text-muted-foreground'}`}/>
                                <div>
                                    <p className="font-semibold text-lg">{med.name} <span className="text-sm font-normal text-muted-foreground">{med.dosage}</span></p>
                                    <p className="text-muted-foreground">{med.instruction}</p>
                                </div>
                           </div>
                            <div className="flex items-center gap-6 mt-4 sm:mt-0">
                                <p className="font-bold text-lg">{med.time}</p>
                                <Switch defaultChecked={med.active} />
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon"><Edit className="size-4"/></Button>
                                    <Button variant="ghost" size="icon" className="text-destructive"><Trash className="size-4"/></Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
