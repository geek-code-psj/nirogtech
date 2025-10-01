import type { Metadata } from 'next';
import AppSidebar from '@/components/layout/app-sidebar';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import AppHeader from '@/components/layout/app-header';

export const metadata: Metadata = {
  title: 'NirogTech Dashboard',
  description: 'Manage your healthcare journey with NirogTech.',
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar collapsible="icon">
            <AppSidebar />
        </Sidebar>
        <div className="flex-1">
          <AppHeader />
          <main className="p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
