'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { doctors } from "@/lib/data";
import { ArrowRight, Users, Stethoscope, School, ShieldCheck } from "lucide-react";
import Link from "next/link";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"
import { ChartTooltipContent } from "../ui/chart";

const chartData = [
  { date: "Jan", users: Math.floor(Math.random() * 200) + 100 },
  { date: "Feb", users: Math.floor(Math.random() * 200) + 150 },
  { date: "Mar", users: Math.floor(Math.random() * 200) + 200 },
  { date: "Apr", users: Math.floor(Math.random() * 200) + 250 },
  { date: "May", users: Math.floor(Math.random() * 200) + 300 },
  { date: "Jun", users: Math.floor(Math.random() * 200) + 350 },
]

export default function AdminDashboard() {
  const pendingVerifications = doctors.filter(d => !d.verified);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,234</div>
          <p className="text-xs text-muted-foreground">+5.2% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
          <Stethoscope className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">256</div>
          <p className="text-xs text-muted-foreground">+2.1% from last month</p>
        </CardContent>
      </Card>
       <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          <School className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">512</div>
          <p className="text-xs text-muted-foreground">+10.3% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
          <ShieldCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingVerifications.length}</div>
          <p className="text-xs text-muted-foreground">Doctors waiting for approval</p>
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>New User Growth</CardTitle>
           <CardDescription>A chart showing new user sign-ups over the past 6 months.</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={250}>
             <BarChart data={chartData}>
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
               <Tooltip
                cursor={{ fill: 'hsl(var(--muted))' }}
                content={<ChartTooltipContent />}
                />
              <Bar dataKey="users" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Doctor Verification Queue</CardTitle>
          <CardDescription>
            Review and approve new doctor registrations.
          </CardDescription>
        </CardHeader>
        <CardContent>
            {pendingVerifications.length > 0 ? (
                <ul className="space-y-2">
                    {pendingVerifications.map(doctor => (
                        <li key={doctor.id} className="flex items-center justify-between">
                            <span className="font-medium">{doctor.name} - <span className="text-muted-foreground">{doctor.specialty}</span></span>
                            <Button variant="outline" size="sm">Review</Button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-muted-foreground">No pending verifications.</p>
            )}
        </CardContent>
        <CardContent>
            <Button asChild className="w-full">
                <Link href="#">Go to Verification Queue <ArrowRight className="ml-2 size-4" /></Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
