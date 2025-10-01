'use client';
import { useState } from 'react';
import { internships } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Briefcase, MapPin, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function InternshipsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const filteredInternships = internships.filter((internship) => {
    const titleMatch = internship.title.toLowerCase().includes(searchTerm.toLowerCase());
    const locationMatch = internship.location.toLowerCase().includes(location.toLowerCase());
    return titleMatch && locationMatch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline font-bold">Internship Opportunities</h1>
        <p className="text-muted-foreground">Find your next internship at a top-tier medical institution.</p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search by role or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Input
              placeholder="Filter by location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 md:flex-initial md:w-[250px]"
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredInternships.map((internship) => (
            <Card key={internship.id} className="hover:shadow-md transition-shadow">
                <div className="p-6 flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                        <CardTitle className="font-headline text-xl">{internship.title}</CardTitle>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground mt-2 text-sm">
                            <div className="flex items-center gap-1.5"><Briefcase className="size-4"/> {internship.clinicName}</div>
                            <div className="flex items-center gap-1.5"><MapPin className="size-4"/> {internship.location}</div>
                            <div className="flex items-center gap-1.5"><Clock className="size-4"/> {internship.duration}</div>
                        </div>
                    </div>
                     <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
                        <Badge variant="secondary">{internship.stipend}</Badge>
                        <Button className="mt-2 w-full sm:w-auto">Apply Now</Button>
                    </div>
                </div>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
