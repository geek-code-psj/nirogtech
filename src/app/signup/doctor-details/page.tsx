
'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth, useFirestore, useUser } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import type { UserProfile } from '@/lib/types';
import { useEffect } from 'react';

const doctorDetailsSchema = z.object({
  specialization: z.string().min(2, { message: 'Specialization is required.' }),
  medicalLicenseNumber: z.string().min(5, { message: 'A valid medical license number is required.' }),
  yearsOfExperience: z.coerce.number().min(0, { message: 'Years of experience must be a positive number.' }),
});

type DoctorDetailsFormValues = z.infer<typeof doctorDetailsSchema>;

export default function DoctorDetailsPage() {
  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();

  const form = useForm<DoctorDetailsFormValues>({
    resolver: zodResolver(doctorDetailsSchema),
    defaultValues: {
      specialization: '',
      medicalLicenseNumber: '',
      yearsOfExperience: 0,
    },
  });

  useEffect(() => {
    if (!isUserLoading && !user) {
      // Redirect to login if not authenticated
      router.replace('/login');
    }
  }, [user, isUserLoading, router]);

  const onSubmit = async (data: DoctorDetailsFormValues) => {
    if (!auth || !firestore || !user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: 'You must be logged in to complete this step.',
      });
      return;
    }

    try {
      const userDocRef = doc(firestore, 'users', user.uid);
      
      const doctorProfileData: Partial<UserProfile> = {
        specialization: data.specialization,
        medicalLicenseNumber: data.medicalLicenseNumber,
        yearsOfExperience: data.yearsOfExperience,
      };

      await setDoc(userDocRef, doctorProfileData, { merge: true });

      toast({
        title: 'Details Saved!',
        description: "Your professional details have been saved. Next, you'll be asked to upload your documents for verification.",
      });

      // In a real app, you would redirect to the document upload page.
      // For now, we'll go to the dashboard.
      router.push('/dashboard');

    } catch (error: any) {
      console.error('Doctor Details Error:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message || 'Could not save your details.',
      });
    }
  };
  
  if (isUserLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-lg">
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Complete Your Professional Profile</CardTitle>
            <CardDescription>Please provide your professional details for verification.</CardDescription>
          </CardHeader>
           <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="specialization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specialization</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Cardiology" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="medicalLicenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medical License Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Your license number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="yearsOfExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardContent>
                 <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  Save and Continue
                </Button>
              </CardContent>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
