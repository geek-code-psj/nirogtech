import type { Doctor, Appointment, MedicalRecord, UserNotification, LearningContent, Internship } from '@/lib/types';

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Anjali Rao',
    specialty: 'Cardiologist',
    avatar: 'https://picsum.photos/seed/doc1/100/100',
    bio: 'Dr. Anjali Rao is a board-certified cardiologist with over 15 years of experience in treating heart conditions. She is a compassionate doctor who is dedicated to providing her patients with the best possible care.',
    rating: 4.9,
    reviews: 124,
    verified: true,
  },
  {
    id: '2',
    name: 'Dr. Vikram Singh',
    specialty: 'Dermatologist',
    avatar: 'https://picsum.photos/seed/doc2/100/100',
    bio: 'Dr. Vikram Singh is a renowned dermatologist known for his expertise in cosmetic dermatology and skin cancer surgery. He believes in a personalized approach to skincare.',
    rating: 4.8,
    reviews: 98,
    verified: true,
  },
  {
    id: '3',
    name: 'Dr. Sunita Desai',
    specialty: 'Pediatrician',
    avatar: 'https://picsum.photos/seed/doc3/100/100',
    bio: 'With a friendly and gentle approach, Dr. Sunita Desai has been caring for children for over a decade. She is committed to the health and well-being of her young patients.',
    rating: 4.9,
    reviews: 210,
    verified: true,
  },
  {
    id: '4',
    name: 'Dr. Rahul Kapoor',
    specialty: 'Orthopedic Surgeon',
    avatar: 'https://picsum.photos/seed/doc4/100/100',
    bio: 'Dr. Rahul Kapoor specializes in sports injuries and joint replacement surgery. He uses the latest techniques to help his patients regain mobility and live pain-free.',
    rating: 4.7,
    reviews: 85,
    verified: false,
  },
];

export const appointments: Appointment[] = [
    {
        id: 'apt1',
        patientName: 'Sameer Khan',
        doctorName: 'Dr. Anjali Rao',
        specialty: 'Cardiologist',
        date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        time: '10:00 AM',
        status: 'upcoming',
        type: 'video'
    },
    {
        id: 'apt2',
        patientName: 'Aisha Sharma',
        doctorName: 'Dr. Vikram Singh',
        specialty: 'Dermatologist',
        date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
        time: '02:30 PM',
        status: 'upcoming',
        type: 'video'
    },
    {
        id: 'apt3',
        patientName: 'Rohan Verma',
        doctorName: 'Dr. Sunita Desai',
        specialty: 'Pediatrician',
        date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
        time: '11:00 AM',
        status: 'completed',
        type: 'video'
    },
    {
        id: 'apt4',
        patientName: 'Priya Mehta',
        doctorName: 'Dr. Anjali Rao',
        specialty: 'Cardiologist',
        date: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(),
        time: '09:00 AM',
        status: 'completed',
        type: 'audio'
    }
];

export const notifications: UserNotification[] = [
    {
        id: 'notif1',
        title: 'Appointment Reminder',
        description: 'Your appointment with Dr. Anjali Rao is tomorrow at 10:00 AM.',
        date: new Date().toISOString(),
        read: false,
    },
    {
        id: 'notif2',
        title: 'New Message',
        description: 'You have a new message from Dr. Vikram Singh.',
        date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
        read: false,
    },
    {
        id: 'notif3',
        title: 'Prescription Updated',
        description: 'Dr. Sunita Desai has updated your prescription.',
        date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
        read: true,
    },
    {
        id: 'notif4',
        title: 'Welcome to NirogTech!',
        description: 'Your account has been successfully created. Complete your profile to get started.',
        date: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(),
        read: true,
    }
];

export const medicalRecords: MedicalRecord[] = [
    {
        id: 'rec1',
        title: 'Annual Check-up',
        doctorName: 'Dr. Sunita Desai',
        date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
        type: 'Consultation Note',
        summary: 'Patient presented for annual check-up. All vitals are normal. Discussed nutrition and exercise. No concerns at this time.'
    },
    {
        id: 'rec2',
        title: 'Blood Test Results',
        doctorName: 'LabCorp',
        date: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString(),
        type: 'Lab Report',
        summary: 'Complete Blood Count (CBC) within normal ranges. Cholesterol levels slightly elevated. Follow-up recommended.'
    },
    {
        id: 'rec3',
        title: 'Cardiology Consultation',
        doctorName: 'Dr. Anjali Rao',
        date: new Date(new Date().setDate(new Date().getDate() - 90)).toISOString(),
        type: 'Consultation Note',
        summary: 'Patient reported mild chest pain. EKG and stress test were normal. Advised lifestyle modifications and scheduled a follow-up in 3 months.'
    },
];

export const learningContent: LearningContent[] = [
  {
    id: 'learn1',
    title: 'Understanding Atrial Fibrillation',
    type: 'Article',
    duration: '10 min read',
    thumbnail: 'https://picsum.photos/seed/learn1/600/400',
    progress: 100,
    category: 'Cardiology'
  },
  {
    id: 'learn2',
    title: 'Introduction to Laparoscopic Surgery',
    type: 'Video',
    duration: '25 min',
    thumbnail: 'https://picsum.photos/seed/learn2/600/400',
    progress: 50,
    category: 'Surgery'
  },
  {
    id: 'learn3',
    title: 'Case Study: Early Onset Alzheimer\'s',
    type: 'Case Study',
    duration: '45 min read',
    thumbnail: 'https://picsum.photos/seed/learn3/600/400',
    progress: 0,
    category: 'Neurology'
  },
];

export const internships: Internship[] = [
    {
        id: 'int1',
        title: 'Clinical Research Intern',
        clinicName: 'Apollo Hospital',
        location: 'Mumbai, India',
        duration: '3 months',
        stipend: '₹15,000/month',
    },
    {
        id: 'int2',
        title: 'Pediatric Ward Assistant',
        clinicName: 'Fortis Healthcare',
        location: 'Delhi, India',
        duration: '6 weeks',
        stipend: 'Unpaid',
    },
    {
        id: 'int3',
        title: 'Dermatology Clinic Intern',
        clinicName: 'Max Healthcare',
        location: 'Bangalore, India',
        duration: '2 months',
        stipend: '₹10,000/month',
    },
];
