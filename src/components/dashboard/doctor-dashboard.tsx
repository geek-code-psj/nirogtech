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
import { appointments, doctors } from "@/lib/data";
import { ArrowRight, ShieldCheck, Users, Video } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";

export default function DoctorDashboard() {
  const todaysAppointments = appointments.filter(a => new Date(a.date).toDateString() === new Date().toDateString() || a.status === 'upcoming').slice(0, 3);
  const doctor = doctors[1]; // Mock: current logged in doctor

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Today's Appointments</CardTitle>
            <CardDescription>You have {todaysAppointments.length} appointments today.</CardDescription>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="#">View Calendar <ArrowRight className="ml-2 size-4" /></Link>
          </Button>
        </CardHeader>
        <CardContent>
          {todaysAppointments.length > 0 ? (
            <div className="space-y-4">
              {todaysAppointments.map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-4">
                       <Avatar>
                        <AvatarFallback>{apt.patientName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{apt.patientName}</p>
                        <p className="text-sm text-muted-foreground">Reason: Follow-up</p>
                      </div>
                    </div>
                    <div className="text-right">
                       <p className="font-medium">{apt.time}</p>
                       <Badge variant={apt.status === 'upcoming' ? 'default' : 'secondary'} className="capitalize">{apt.status}</Badge>
                    </div>
                     <Button size="sm" variant="secondary"><Video className="mr-2 size-4"/> Start Call</Button>
                  </div>
                ))}
            </div>
          ) : (
             <div className="text-center py-8">
              <Users className="mx-auto size-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No Appointments Today</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Your schedule for today is clear.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Profile Verification</CardTitle>
          <CardDescription>Your document verification status.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center space-y-3 pt-6">
             {doctor.verified ? (
                <>
                    <ShieldCheck className="size-16 text-green-500"/>
                    <p className="font-bold text-lg text-green-600">Profile Verified</p>
                    <p className="text-sm text-muted-foreground">Your documents have been successfully reviewed and approved.</p>
                </>
             ) : (
                <>
                    <ShieldCheck className="size-16 text-yellow-500"/>
                    <p className="font-bold text-lg text-yellow-600">Verification Pending</p>
                    <p className="text-sm text-muted-foreground">Your documents are under review. This may take 2-3 business days.</p>
                </>
             )}
        </CardContent>
         <CardFooter>
            <Button className="w-full" variant={doctor.verified ? "outline" : "default"}>
                {doctor.verified ? "View Documents" : "Upload Documents"}
            </Button>
        </CardFooter>
      </Card>
      
      <Card className="lg:col-span-3">
        <CardHeader>
            <CardTitle>Patient Awaiting Queue</CardTitle>
            <CardDescription>Patients waiting for their scheduled consultation.</CardDescription>
        </CardHeader>
        <CardContent>
             <p className="text-sm text-muted-foreground">No patients are currently in the waiting room.</p>
        </CardContent>
      </Card>
    </div>
  );
}
