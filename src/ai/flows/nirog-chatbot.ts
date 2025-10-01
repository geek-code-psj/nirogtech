
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
  query: z.string().describe("The user's query or message."),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'bot']).describe('The role of the message sender.'),
    content: z.string().describe('The content of the message.'),
  })).optional().describe('The conversation history.'),
});
export type NirogChatbotInput = z.infer<typeof NirogChatbotInputSchema>;

const NirogChatbotOutputSchema = z.object({
  response: z.string().describe("The AI assistant's response."),
});
export type NirogChatbotOutput = z.infer<typeof NirogChatbotOutputSchema>;

export async function nirogChatbot(input: NirogChatbotInput): Promise<NirogChatbotOutput> {
  return nirogChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'nirogChatbotPrompt',
  input: { schema: z.object({
    userRole: z.string(),
    query: z.string(),
    history: z.string(),
  }) },
  output: { schema: NirogChatbotOutputSchema },
  prompt: `You are the official AI assistant for the NirogTech healthcare platform. Your response must be tailored to the user's role: {{userRole}}.
You must not diagnose conditions or provide treatment recommendations.

Conversation History:
{{history}}

User Query: {{query}}

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
    const history = (input.conversationHistory || [])
      .map(msg => `${msg.role === 'user' ? 'User' : 'Bot'}: ${msg.content}`)
      .join('\n');

    const { output } = await prompt({
        userRole: input.userRole,
        query: input.query,
        history: history
    });
    return output!;
  }
);
