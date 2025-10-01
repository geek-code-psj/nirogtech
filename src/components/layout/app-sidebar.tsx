'use client';

import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import {
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
import type { UserRole } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const navLinks = {
  patient: [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/doctors', label: 'Find a Doctor', icon: Stethoscope },
    { href: '/appointments', label: 'Appointments', icon: Calendar },
    { href: '/history', label: 'Medical History', icon: HeartPulse },
    { href: '/medication', label: 'Medication', icon: Bell },
    { href: '/support', label: 'Support', icon: MessageSquare },
  ],
  doctor: [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/appointments', label: 'Appointments', icon: Calendar },
    { href: '/patients', label: 'My Patients', icon: Users },
    { href: '/verification', label: 'Verification', icon: ShieldCheck },
    { href: '/support', label: 'Support', icon: MessageSquare },
  ],
  student: [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/learn', label: 'Learning Hub', icon: School },
    { href: '/internships', label: 'Internships', icon: Briefcase },
    { href: '/doctors', label: 'Find Mentors', icon: Stethoscope },
    { href: '/verification', label: 'Verification', icon: ShieldCheck },
  ],
  admin: [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/users', label: 'User Management', icon: Users },
    { href: '/doctors', label: 'Doctor Management', icon: Stethoscope },
    { href: '/verification-queue', label: 'Verification Queue', icon: ShieldCheck },
  ],
};

export default function AppSidebar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const role = (searchParams.get('role') as UserRole) || 'patient';
  const currentLinks = navLinks[role] || navLinks.patient;

  const isActive = (href: string) => {
    // Special case for dashboard
    if (href === '/dashboard') {
        return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };
  
  return (
    <>
      <SidebarHeader>
        <Link href={`/dashboard?role=${role}`} className="flex items-center gap-2">
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
                <Link href={`${link.href}?role=${role}`}>
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
                    <Link href={`/profile?role=${role}`}>
                        <Avatar className="size-7">
                            <AvatarImage src="https://picsum.photos/seed/user-avatar/100/100" alt="User" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <span>User Profile</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={{children: 'Logout'}}>
                    <Link href="/login">
                        <LogOut className="size-4" />
                        <span>Logout</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
