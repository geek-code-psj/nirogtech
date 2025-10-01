'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import {
  LayoutDashboard,
  Stethoscope,
  Calendar,
  HeartPulse,
  FileText,
  School,
  Briefcase,
  Users,
  ShieldCheck,
  LogOut,
  Bell,
  MessageSquare
} from 'lucide-react';
import { useUser, useDoc, useFirestore, useMemoFirebase, useAuth } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { UserProfile } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { signOut } from 'firebase/auth';

const navLinks = {
  patient: [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/doctors', label: 'Find a Doctor', icon: Stethoscope },
    { href: '/dashboard/appointments', label: 'Appointments', icon: Calendar },
    { href: '/dashboard/history', label: 'Medical History', icon: HeartPulse },
    { href: '/dashboard/medication', label: 'Medication', icon: Bell },
    { href: '/dashboard/support', label: 'Support', icon: MessageSquare },
  ],
  doctor: [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/appointments', label: 'Appointments', icon: Calendar },
    { href: '/dashboard/patients', label: 'My Patients', icon: Users },
    { href: '/dashboard/verification', label: 'Verification', icon: ShieldCheck },
    { href: '/dashboard/support', label: 'Support', icon: MessageSquare },
  ],
  student: [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/learn', label: 'Learning Hub', icon: School },
    { href: '/dashboard/internships', label: 'Internships', icon: Briefcase },
    { href: '/dashboard/doctors', label: 'Find Mentors', icon: Stethoscope },
    { href: '/dashboard/verification', label: 'Verification', icon: ShieldCheck },
  ],
  admin: [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/users', label: 'User Management', icon: Users },
    { href: '/dashboard/doctors', label: 'Doctor Management', icon: Stethoscope },
    { href: '/dashboard/verification-queue', label: 'Verification Queue', icon: ShieldCheck },
  ],
};

export default function AppSidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const firestore = useFirestore();
  const auth = useAuth();


  const userProfileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userProfile } = useDoc<UserProfile>(userProfileRef);

  const role = userProfile?.role || 'patient';
  const currentLinks = navLinks[role] || navLinks.patient;
  
  const isActive = (href: string) => {
    // Special case for dashboard
    if (href === '/dashboard') {
        return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    if(!auth) return;
    signOut(auth);
  };
  
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2">
            <Logo className="size-8 text-primary" />
            <span className="font-headline text-xl font-bold text-foreground">NirogTech</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {currentLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={isActive(link.href)}
                tooltip={{ children: link.label }}
              >
                <Link href={link.href}>
                  <link.icon className="size-4" />
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={{children: 'User Profile'}}>
                    <Link href="/profile">
                        <Avatar className="size-7">
                            <AvatarImage src={userProfile?.profilePicture || "https://picsum.photos/seed/user-avatar/100/100"} alt={userProfile?.firstName} />
                            <AvatarFallback>{userProfile?.firstName?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                        <span>{userProfile?.firstName || 'User'} Profile</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} tooltip={{children: 'Logout'}}>
                  <LogOut className="size-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
