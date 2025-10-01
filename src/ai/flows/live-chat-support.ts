'use server';

/**
 * @fileOverview Implements a 24/7 live chat support flow with AI chatbot and human escalation.
 *
 * - liveChatSupport - A function that handles user queries and provides support via AI or human agent.
 * - LiveChatSupportInput - The input type for the liveChatSupport function.
 * - LiveChatSupportOutput - The return type for the liveChatSupport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LiveChatSupportInputSchema = z.object({
  query: z.string().describe('The user query or message.'),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'bot']).describe('The role of the message sender.'),
    content: z.string().describe('The content of the message.'),
  })).optional().describe('The conversation history.'),
  escalateToHuman: z.boolean().optional().describe('Whether to escalate the conversation to a human agent.'),
});
export type LiveChatSupportInput = z.infer<typeof LiveChatSupportInputSchema>;

const LiveChatSupportOutputSchema = z.object({
  response: z.string().describe('The response from the AI chatbot or human agent.'),
  escalateToHuman: z.boolean().describe('Whether the conversation should be escalated to a human agent.'),
});
export type LiveChatSupportOutput = z.infer<typeof LiveChatSupportOutputSchema>;

export async function liveChatSupport(input: LiveChatSupportInput): Promise<LiveChatSupportOutput> {
  return liveChatSupportFlow(input);
}

const liveChatSupportPrompt = ai.definePrompt({
  name: 'liveChatSupportPrompt',
  input: {schema: z.object({
    query: z.string(),
    history: z.string(),
    escalateToHuman: z.boolean().optional(),
  })},
  output: {schema: LiveChatSupportOutputSchema},
  prompt: `You are a 24/7 live chat support agent for NirogTech, a telehealth company.

  Your goal is to assist users with their queries and provide helpful information.
  If the user asks a question that requires specific expertise or escalation, set escalateToHuman to true.
  Otherwise, provide a helpful response and keep escalateToHuman as false.

  Here's the conversation history:
  {{{history}}}

  User query: {{{query}}}

  Response:`,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const liveChatSupportFlow = ai.defineFlow(
  {
    name: 'liveChatSupportFlow',
    inputSchema: LiveChatSupportInputSchema,
    outputSchema: LiveChatSupportOutputSchema,
  },
  async input => {
    const history = (input.conversationHistory || [])
      .map(msg => `${msg.role === 'user' ? 'User' : 'Bot'}: ${msg.content}`)
      .join('\n');

    const {
      output,
    } = await liveChatSupportPrompt({
      query: input.query,
      history: history,
      escalateToHuman: input.escalateToHuman || false,
    });

    return {
      response: output!.response,
      escalateToHuman: output!.escalateToHuman,
    };
  }
);
