'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  Bell,
  Menu,
  Search,
  TriangleAlert,
  Settings,
  LogOut,
  User as UserIcon,
} from 'lucide-react';
import AppSidebar from './app-sidebar';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useUser, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { UserProfile } from '@/lib/types';
import { getAuth, signOut } from 'firebase/auth';


export default function AppHeader() {
  const pathname = usePathname();
  const { user } = useUser();
  const firestore = useFirestore();
  const auth = getAuth();

  const userProfileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userProfile } = useDoc<UserProfile>(userProfileRef);
  const role = userProfile?.role || 'patient';


  const getBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join('/')}?role=${role}`;
        const label = segment.charAt(0).toUpperCase() + segment.slice(1);
        return { href, label };
    });
    return [{ href: `/dashboard?role=${role}`, label: 'Home' }, ...breadcrumbs];
  };

  const breadcrumbs = getBreadcrumbs();
  
  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 sticky top-0 z-30">
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                    <AppSidebar />
                </SheetContent>
            </Sheet>
        </div>

        <div className="hidden md:flex">
             <Breadcrumb>
                <BreadcrumbList>
                    {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={`${crumb.href}-${index}`}>
                        <BreadcrumbItem>
                        {index === breadcrumbs.length - 1 ? (
                            <BreadcrumbPage className="font-headline">{crumb.label}</BreadcrumbPage>
                        ) : (
                            <BreadcrumbLink asChild>
                                <Link href={crumb.href}>{crumb.label}</Link>
                            </BreadcrumbLink>
                        )}
                        </BreadcrumbItem>
                        {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
      
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <Button variant="destructive" size="sm" className="gap-1">
            <TriangleAlert className="size-4"/>
            <span className="hidden sm:inline">Emergency</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <div className="flex flex-col">
                    <p className="font-semibold">Appointment Reminder</p>
                    <p className="text-xs text-muted-foreground">Your appointment with Dr. Rao is tomorrow.</p>
                </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <div className="flex flex-col">
                    <p className="font-semibold">New Message</p>
                    <p className="text-xs text-muted-foreground">You have a new message from Dr. Singh.</p>
                </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
             <DropdownMenuItem className="justify-center">
                <Link href="#">View all notifications</Link>
             </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar className="size-8">
                    <AvatarImage src={userProfile?.profilePicture || "https://picsum.photos/seed/user-avatar/100/100"} alt={userProfile?.firstName} />
                    <AvatarFallback>{userProfile?.firstName?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
