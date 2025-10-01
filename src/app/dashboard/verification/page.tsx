
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadCloud, File, X, CheckCircle, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

type FileStatus = 'pending' | 'uploading' | 'success' | 'error';
type UploadedFile = {
    name: string;
    size: number;
    status: FileStatus;
};

export default function VerificationPage() {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const { toast } = useToast();
    const verificationStatus = 'pending'; // This could be dynamic based on user data

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles = Array.from(event.target.files).map(file => ({
                name: file.name,
                size: file.size,
                status: 'pending' as FileStatus,
            }));
            setFiles(prev => [...prev, ...newFiles]);
        }
    };

    const handleUpload = () => {
        if (files.some(f => f.status === 'pending')) {
            setFiles(files.map(f => f.status === 'pending' ? {...f, status: 'uploading'} : f));
            toast({ title: "Uploading documents...", description: "Please wait while we upload and process your files." });

            setTimeout(() => {
                setFiles(files.map(f => ({...f, status: 'success'})));
                toast({ title: "Upload complete!", description: "Your documents have been submitted for verification." });
            }, 3000);
        }
    };

    const removeFile = (fileName: string) => {
        setFiles(files.filter(f => f.name !== fileName));
    };

    const StatusCard = () => {
        switch (verificationStatus) {
            case 'verified':
                return (
                    <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                        <CardHeader className="flex-row items-center gap-4">
                            <CheckCircle className="size-8 text-green-600" />
                            <div>
                                <CardTitle className="text-green-800 dark:text-green-300">Profile Verified</CardTitle>
                                <CardDescription className="text-green-700 dark:text-green-400">Your documents have been successfully reviewed and approved.</CardDescription>
                            </div>
                        </CardHeader>
                    </Card>
                );
            case 'pending':
                 return (
                    <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                        <CardHeader className="flex-row items-center gap-4">
                            <AlertTriangle className="size-8 text-yellow-600" />
                            <div>
                                <CardTitle className="text-yellow-800 dark:text-yellow-300">Verification Pending</CardTitle>
                                <CardDescription className="text-yellow-700 dark:text-yellow-400">Your documents are under review. This may take 2-3 business days.</CardDescription>
                            </div>
                        </CardHeader>
                    </Card>
                );
            default:
                return null;
        }
    }


    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-headline font-bold">Profile Verification</h1>
                <p className="text-muted-foreground">Submit the required documents to get your profile verified.</p>
            </div>
            
            <StatusCard />

            <Card>
                <CardHeader>
                    <CardTitle>Document Upload</CardTitle>
                    <CardDescription>Upload your Medical Degree, License Certificate, and other relevant documents.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="border-2 border-dashed border-muted rounded-lg p-12 text-center">
                        <UploadCloud className="mx-auto size-12 text-muted-foreground" />
                        <p className="mt-4 text-muted-foreground">Drag & drop files here or click to browse</p>
                        <Input type="file" multiple className="sr-only" id="file-upload" onChange={handleFileChange} />
                        <Button asChild variant="outline" className="mt-4">
                            <label htmlFor="file-upload">Browse Files</label>
                        </Button>
                    </div>

                    <div className="mt-6 space-y-3">
                        {files.map(file => (
                             <div key={file.name} className="flex items-center justify-between p-3 rounded-lg border bg-muted/50">
                                <div className="flex items-center gap-3">
                                    <File className="size-6 text-primary"/>
                                    <div>
                                        <p className="font-semibold text-sm">{file.name}</p>
                                        <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {file.status === 'pending' && <Badge variant="outline">Pending</Badge>}
                                    {file.status === 'uploading' && <Badge variant="secondary">Uploading...</Badge>}
                                    {file.status === 'success' && <Badge variant="default" className="bg-green-600">Success</Badge>}
                                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeFile(file.name)}>
                                        <X className="size-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardContent>
                    <Button onClick={handleUpload} disabled={files.length === 0 || files.every(f => f.status !== 'pending')} className="w-full">
                        Submit for Verification
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
