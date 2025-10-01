'use client';
import type { UserProfile } from '@/lib/types';
import PatientDashboard from '@/components/dashboard/patient-dashboard';
import DoctorDashboard from '@/components/dashboard/doctor-dashboard';
import StudentDashboard from '@/components/dashboard/student-dashboard';
import AdminDashboard from '@/components/dashboard/admin-dashboard';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser, useDoc, useMemoFirebase, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';


function DashboardContent({ role }: { role: UserProfile['role'] }) {
  switch (role) {
    case 'patient':
      return <PatientDashboard />;
    case 'doctor':
      return <DoctorDashboard />;
    case 'student':
      return <StudentDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <PatientDashboard />;
  }
}

export default function DashboardPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const userProfileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);
  
  const { data: userProfile, isLoading } = useDoc<UserProfile>(userProfileRef);

  if (isLoading || !userProfile) {
    return <DashboardSkeleton />;
  }
  
  const role = userProfile.role || 'patient';
  const userName = userProfile.firstName || "User";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline font-bold">Welcome back, {userName}!</h1>
        <p className="text-muted-foreground">Here's a quick overview of your account today.</p>
      </div>
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent role={role} />
      </Suspense>
    </div>
  );
}

function DashboardSkeleton() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
            <Skeleton className="h-96 lg:col-span-2" />
            <Skeleton className="h-96" />
        </div>
    )
}
