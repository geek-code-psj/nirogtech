import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { learningContent, internships } from "@/lib/data";
import { ArrowRight, Briefcase, GraduationCap, PlayCircle } from "lucide-react";
import Link from "next/link";
import { Progress } from "../ui/progress";
import Image from "next/image";

export default function StudentDashboard() {
  const totalProgress = learningContent.reduce((acc, curr) => acc + curr.progress, 0) / learningContent.length;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Learning Progress</CardTitle>
          <CardDescription>Your overall progress on assigned courses.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4">
            <div className="relative size-32">
                 <svg className="size-full" width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-gray-700" strokeWidth="2"></circle>
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-primary" strokeWidth="2" strokeDasharray={`${totalProgress}, 100`} strokeLinecap="round" transform="rotate(-90 18 18)"></circle>
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">{Math.round(totalProgress)}%</span>
                 </div>
            </div>
            <p className="text-center text-muted-foreground">You are doing great! Keep up the good work.</p>
        </CardContent>
        <CardFooter>
            <Button asChild className="w-full">
                <Link href="#">Go to Learning Hub <ArrowRight className="ml-2 size-4"/></Link>
            </Button>
        </CardFooter>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Continue Learning</CardTitle>
                <CardDescription>Pick up where you left off.</CardDescription>
            </div>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {learningContent.filter(c => c.progress > 0 && c.progress < 100).slice(0, 2).map((content) => (
             <div key={content.id} className="border rounded-lg overflow-hidden">
                <Image src={content.thumbnail} alt={content.title} width={300} height={150} className="w-full h-32 object-cover" />
                <div className="p-4">
                    <h3 className="font-semibold truncate">{content.title}</h3>
                    <p className="text-sm text-muted-foreground">{content.category}</p>
                    <Progress value={content.progress} className="mt-2 h-2" />
                    <Button variant="outline" size="sm" className="w-full mt-4">
                        <PlayCircle className="mr-2 size-4" /> Continue
                    </Button>
                </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Internship Opportunities</CardTitle>
                <CardDescription>Find internships at top clinics and hospitals.</CardDescription>
            </div>
            <Button asChild variant="outline" size="sm">
                <Link href="#">View All <ArrowRight className="ml-2 size-4" /></Link>
            </Button>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {internships.slice(0, 2).map(internship => (
                     <div key={internship.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-lg border">
                        <div>
                            <p className="font-semibold">{internship.title}</p>
                            <p className="text-sm text-muted-foreground">{internship.clinicName} - {internship.location}</p>
                        </div>
                        <div className="flex items-center gap-4 mt-2 sm:mt-0">
                            <p className="text-sm font-medium text-muted-foreground">{internship.duration}</p>
                            <Button size="sm">Apply Now</Button>
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
