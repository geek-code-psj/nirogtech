'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/live-chat-support.ts';
import '@/ai/flows/medication-reminders.ts';
import '@/ai/flows/generate-consultation-summary.ts';
import '@/ai/flows/nirog-chatbot.ts';
