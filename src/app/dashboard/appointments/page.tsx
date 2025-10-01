'use client'

import { appointments, doctors } from "@/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Video, PlusCircle } from "lucide-react"
import Link from "next/link"

export default function AppointmentsPage() {
  const upcomingAppointments = appointments.filter(a => a.status === 'upcoming');
  const pastAppointments = appointments.filter(a => a.status !== 'upcoming');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-headline font-bold">Appointments</h1>
          <p className="text-muted-foreground">Manage your upcoming and past appointments.</p>
        </div>
        <Button asChild>
            <Link href="/dashboard/doctors"><PlusCircle className="mr-2"/>Book New Appointment</Link>
        </Button>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <AppointmentList appointments={upcomingAppointments} isUpcoming={true} />
        </TabsContent>
        <TabsContent value="past">
          <AppointmentList appointments={pastAppointments} isUpcoming={false} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AppointmentList({ appointments, isUpcoming }: { appointments: typeof import('@/lib/data').appointments, isUpcoming: boolean }) {
  if (appointments.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Calendar className="mx-auto size-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No {isUpcoming ? 'Upcoming' : 'Past'} Appointments</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {isUpcoming ? "You have no scheduled appointments." : "You haven't had any appointments yet."}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {appointments.map(apt => {
        const doctor = doctors.find(d => d.name === apt.doctorName);
        return (
          <Card key={apt.id}>
            <CardContent className="p-4 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={doctor?.avatar} alt={doctor?.name} />
                  <AvatarFallback>{doctor?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-lg">{apt.doctorName}</p>
                  <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                   <Badge variant={apt.type === 'video' ? 'outline' : 'secondary'} className="capitalize mt-1">{apt.type} call</Badge>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <p className="font-medium text-lg">{new Date(apt.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                <p className="text-muted-foreground">{apt.time}</p>
              </div>
              <div className="flex gap-2">
                {isUpcoming ? (
                    <Button className="w-full sm:w-auto"><Video className="mr-2"/>Join Call</Button>
                ) : (
                    <Button variant="outline" className="w-full sm:w-auto">View Details</Button>
                )}
                <Button variant="secondary" className="w-full sm:w-auto">Reschedule</Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  );
}
