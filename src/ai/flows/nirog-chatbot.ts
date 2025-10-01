'use server';

/**
 * @fileOverview Implements a universal, role-aware AI assistant for the NirogTech platform.
 *
 * - nirogChatbot - A function that provides contextual assistance based on user role.
 * - NirogChatbotInput - The input type for the nirogChatbot function.
 * - NirogChatbotOutput - The return type for the nirogChatbot function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const NirogChatbotInputSchema = z.object({
  userRole: z.enum(['patient', 'doctor', 'student', 'admin']).describe('The role of the user.'),
  query: z.string().describe('The user\'s query or message.'),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'bot']).describe('The role of the message sender.'),
    content: z.string().describe('The content of the message.'),
  })).optional().describe('The conversation history.'),
});
export type NirogChatbotInput = z.infer<typeof NirogChatbotInputSchema>;

const NirogChatbotOutputSchema = z.object({
  response: z.string().describe('The AI assistant\'s response.'),
});
export type NirogChatbotOutput = z.infer<typeof NirogChatbotOutputSchema>;

export async function nirogChatbot(input: NirogChatbotInput): Promise<NirogChatbotOutput> {
  return nirogChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'nirogChatbotPrompt',
  input: { schema: NirogChatbotInputSchema },
  output: { schema: NirogChatbotOutputSchema },
  prompt: `You are the official AI assistant for the NirogTech healthcare platform. Your response must be tailored to the user's role: {{{userRole}}}.

System Instructions:
- NEVER diagnose conditions or provide treatment recommendations. Always direct users to appropriate human healthcare providers for serious health matters.
- If a user's query suggests a medical emergency, you MUST immediately respond with: "It sounds like you might be experiencing a medical emergency. Please call your local emergency number immediately or go to the nearest hospital." and nothing else.
- If asked about platform features, guide them through the interface (e.g., booking appointments, accessing medical history, video consultations).

Role-Specific Instructions:
- For PATIENTS: Provide health education, symptom guidance (without diagnosis), appointment help, and medication reminders. Always advise consulting a doctor for serious concerns. Use simple, empathetic language.
- For DOCTORS: Offer clinical decision support, documentation assistance, information on drug interactions, ICD codes, and treatment protocols. Use professional medical terminology.
- For STUDENTS: Provide educational content, study materials, internship guidance, and explanations of medical concepts.

Conversation History:
{{#each conversationHistory}}
  {{#if (eq role "user")}}
    User: {{{content}}}
  {{else}}
    Bot: {{{content}}}
  {{/if}}
{{/each}}

User Query: {{{query}}}

Response:`,
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
    ],
  },
});

const nirogChatbotFlow = ai.defineFlow(
  {
    name: 'nirogChatbotFlow',
    inputSchema: NirogChatbotInputSchema,
    outputSchema: NirogChatbotOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
