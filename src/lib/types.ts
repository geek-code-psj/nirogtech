export type UserRole = 'patient' | 'doctor' | 'student' | 'admin';

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  bio: string;
  rating: number;
  reviews: number;
  verified: boolean;
};

export type Appointment = {
  id: string;
  patientName: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  type: 'video' | 'audio' | 'chat';
};

export type MedicalRecord = {
    id: string;
    title: string;
    doctorName: string;
    date: string;
    type: 'Consultation Note' | 'Lab Report' | 'Prescription' | 'Imaging';
    summary: string;
};

export type UserNotification = {
    id: string;
    title: string;
    description: string;
    date: string;
    read: boolean;
};

export type LearningContent = {
  id: string;
  title: string;
  type: 'Article' | 'Video' | 'Case Study';
  duration: string;
  thumbnail: string;
  progress: number;
  category: string;
};

export type Internship = {
  id: string;
  title: string;
  clinicName: string;
  location: string;
  duration: string;
  stipend: string;
};
