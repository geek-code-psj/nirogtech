'use client';
import { learningContent } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import { PlayCircle } from 'lucide-react';
import { useState } from 'react';

export default function LearningHubPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');
    const [filter, setFilter] = useState('all');

    const categories = ['all', ...Array.from(new Set(learningContent.map(c => c.category)))];

    const filteredContent = learningContent.filter(content => {
        const titleMatch = content.title.toLowerCase().includes(searchTerm.toLowerCase());
        const categoryMatch = category === 'all' || content.category === category;
        const filterMatch = filter === 'all' ||
            (filter === 'completed' && content.progress === 100) ||
            (filter === 'in-progress' && content.progress > 0 && content.progress < 100) ||
            (filter === 'not-started' && content.progress === 0);
        return titleMatch && categoryMatch && filterMatch;
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline font-bold">Learning Hub</h1>
        <p className="text-muted-foreground">Expand your medical knowledge with our curated content.</p>
      </div>

       <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search for courses, articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
             <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="not-started">Not Started</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredContent.map((content) => (
            <Card key={content.id} className="flex flex-col overflow-hidden">
                <div className="relative">
                    <Image src={content.thumbnail} alt={content.title} width={400} height={200} className="w-full h-40 object-cover" />
                    <div className="absolute top-2 right-2 bg-background/80 text-foreground text-xs px-2 py-1 rounded-full">{content.type}</div>
                </div>
              <CardHeader>
                <CardTitle className="font-headline text-lg h-12 line-clamp-2">{content.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{content.category} &middot; {content.duration}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                 <Progress value={content.progress} className="h-2" />
                 <p className="text-xs text-muted-foreground mt-1">{content.progress}% complete</p>
              </CardContent>
              <CardFooter>
                 <Button className="w-full" variant={content.progress > 0 ? 'secondary' : 'default'}>
                    <PlayCircle className="mr-2"/>
                    {content.progress > 0 ? (content.progress === 100 ? 'Review' : 'Continue') : 'Start'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
