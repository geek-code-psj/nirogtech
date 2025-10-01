'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import type { UserRole } from '@/lib/types';
import { User, Briefcase, GraduationCap, Shield } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (role: UserRole) => {
    router.push(`/dashboard?role=${role}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <Link href="/" className="flex items-center justify-center gap-2 mb-4">
              <Logo className="size-10 text-primary" />
              <span className="font-headline text-3xl font-bold text-foreground">NirogTech</span>
            </Link>
            <CardTitle className="font-headline text-2xl">Welcome Back</CardTitle>
            <CardDescription>Select your role to sign in to your dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full justify-start text-base py-6"
              onClick={() => handleLogin('patient')}
            >
              <User className="mr-4 size-5" /> Sign in as a Patient
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-base py-6"
              onClick={() => handleLogin('doctor')}
            >
              <Briefcase className="mr-4 size-5" /> Sign in as a Doctor
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-base py-6"
              onClick={() => handleLogin('student')}
            >
              <GraduationCap className="mr-4 size-5" /> Sign in as a Student
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-base py-6"
              onClick={() => handleLogin('admin')}
            >
              <Shield className="mr-4 size-5" /> Sign in as an Admin
            </Button>
          </CardContent>
          <CardFooter className="flex-col gap-2">
             <p className="text-xs text-muted-foreground">
                By continuing, you agree to our{' '}
                <Link href="#" className="underline">
                    Terms of Service
                </Link>
                .
            </p>
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link href="#" className="font-semibold text-primary underline-offset-4 hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
