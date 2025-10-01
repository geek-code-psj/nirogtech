import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { appointments, medicalRecords, doctors } from "@/lib/data";
import { ArrowRight, Bell, Calendar, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";

export default function PatientDashboard() {
  const upcomingAppointments = appointments.filter(a => a.status === 'upcoming').slice(0, 2);
  const recentRecords = medicalRecords.slice(0, 3);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>You have {upcomingAppointments.length} upcoming appointments.</CardDescription>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="#">View All <ArrowRight className="ml-2 size-4" /></Link>
          </Button>
        </CardHeader>
        <CardContent>
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.map((apt) => {
                const doctor = doctors.find(d => d.name === apt.doctorName);
                return (
                  <div key={apt.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={doctor?.avatar} alt={doctor?.name} />
                        <AvatarFallback>{doctor?.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{apt.doctorName}</p>
                        <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{new Date(apt.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
                       <p className="text-sm text-muted-foreground">{apt.time}</p>
                    </div>
                     <Badge variant={apt.type === 'video' ? 'default' : 'secondary'} className="capitalize hidden sm:block">{apt.type} call</Badge>
                     <Button size="sm">Join Call</Button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="mx-auto size-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No Upcoming Appointments</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Book a new appointment to see it here.
              </p>
              <Button className="mt-4" asChild>
                <Link href="#">
                  <PlusCircle className="mr-2 size-4" />
                  Book Appointment
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Medication Reminders</CardTitle>
          <CardDescription>Your daily medication schedule.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Bell className="size-5 text-primary"/>
                    <div>
                        <p className="font-semibold">Metformin</p>
                        <p className="text-sm text-muted-foreground">1 tablet, After Breakfast</p>
                    </div>
                </div>
                <p className="font-medium text-sm">8:00 AM</p>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Bell className="size-5 text-primary"/>
                    <div>
                        <p className="font-semibold">Atorvastatin</p>
                        <p className="text-sm text-muted-foreground">1 tablet, After Dinner</p>
                    </div>
                </div>
                <p className="font-medium text-sm">9:00 PM</p>
            </div>
        </CardContent>
         <CardFooter>
            <Button className="w-full" variant="outline">Manage Medications</Button>
        </CardFooter>
      </Card>
      
      <Card className="lg:col-span-3">
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Recent Medical History</CardTitle>
                <CardDescription>A quick look at your recent health activities.</CardDescription>
            </div>
            <Button asChild variant="outline" size="sm">
                <Link href="#">View Full History <ArrowRight className="ml-2 size-4" /></Link>
            </Button>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {recentRecords.map(record => (
                     <div key={record.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-lg border">
                        <div className="flex-1 mb-2 sm:mb-0">
                            <p className="font-semibold">{record.title}</p>
                            <p className="text-sm text-muted-foreground">with {record.doctorName}</p>
                        </div>
                        <p className="text-sm font-medium text-muted-foreground sm:text-right w-36">{new Date(record.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <Badge variant="secondary" className="w-fit mt-2 sm:mt-0 sm:w-auto">{record.type}</Badge>
                    </div>
                ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
