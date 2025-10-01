'use client';
import { useState } from 'react';
import { doctors } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function FindDoctorPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('all');

  const filteredDoctors = doctors.filter((doctor) => {
    const nameMatch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const specialtyMatch = specialty === 'all' || doctor.specialty === specialty;
    return nameMatch && specialtyMatch;
  });

  const specialties = ['all', ...Array.from(new Set(doctors.map(d => d.specialty)))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline font-bold">Find a Doctor</h1>
        <p className="text-muted-foreground">Search for a specialist to book an appointment.</p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search by doctor's name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Select value={specialty} onValueChange={setSpecialty}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="All Specialties" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((spec) => (
                  <SelectItem key={spec} value={spec}>
                    {spec === 'all' ? 'All Specialties' : spec}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="flex flex-col">
              <CardHeader className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={doctor.avatar} alt={doctor.name} />
                  <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl font-headline">{doctor.name}</CardTitle>
                <CardDescription>{doctor.specialty}</CardDescription>
                <div className="flex items-center gap-1 mt-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{doctor.rating}</span>
                    <span className="text-sm text-muted-foreground">({doctor.reviews} reviews)</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">{doctor.bio}</p>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button className="w-full">Book Appointment</Button>
                <Button variant="outline" className="w-full"><MessageCircle className="mr-2"/> Send Message</Button>
              </CardFooter>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
