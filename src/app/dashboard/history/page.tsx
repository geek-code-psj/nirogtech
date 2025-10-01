'use client';
import { medicalRecords } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Share2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function MedicalHistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline font-bold">Medical History</h1>
        <p className="text-muted-foreground">A complete timeline of your health records.</p>
      </div>

      <div className="space-y-8 relative pl-6 before:absolute before:inset-y-0 before:w-0.5 before:bg-border before:left-0">
        {medicalRecords.map((record) => (
          <div key={record.id} className="relative pl-8">
            <div className="absolute left-[-22px] top-1 flex items-center justify-center bg-background">
                <div className="size-5 rounded-full bg-primary ring-4 ring-background" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">{new Date(record.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="font-headline text-xl flex items-center gap-2">
                            <FileText className="text-primary"/>
                            {record.title}
                        </CardTitle>
                        <CardDescription>with {record.doctorName}</CardDescription>
                    </div>
                    <Badge variant="secondary">{record.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{record.summary}</p>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm"><Download className="mr-2" /> Download PDF</Button>
                  <Button variant="outline" size="sm"><Share2 className="mr-2" /> Share</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
