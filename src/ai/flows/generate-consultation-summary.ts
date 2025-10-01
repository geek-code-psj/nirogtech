'use server';

/**
 * @fileOverview Generates a concise consultation summary from a video or audio recording.
 *
 * - generateConsultationSummary - A function that generates the consultation summary.
 * - GenerateConsultationSummaryInput - The input type for the generateConsultationSummary function.
 * - GenerateConsultationSummaryOutput - The return type for the generateConsultationSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateConsultationSummaryInputSchema = z.object({
  recordingDataUri: z
    .string()
    .describe(
      'A video or audio recording of a consultation, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
});
export type GenerateConsultationSummaryInput = z.infer<typeof GenerateConsultationSummaryInputSchema>;

const GenerateConsultationSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the consultation.'),
});
export type GenerateConsultationSummaryOutput = z.infer<typeof GenerateConsultationSummaryOutputSchema>;

export async function generateConsultationSummary(
  input: GenerateConsultationSummaryInput
): Promise<GenerateConsultationSummaryOutput> {
  return generateConsultationSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateConsultationSummaryPrompt',
  input: {schema: GenerateConsultationSummaryInputSchema},
  output: {schema: GenerateConsultationSummaryOutputSchema},
  prompt: `You are an AI assistant that summarizes medical consultations.  Given a recording of a consultation, provide a concise summary of the key points discussed.  The summary should include the patient's symptoms, the doctor's diagnosis, and any treatment plans or recommendations.

Recording: {{media url=recordingDataUri}}`,
});

const generateConsultationSummaryFlow = ai.defineFlow(
  {
    name: 'generateConsultationSummaryFlow',
    inputSchema: GenerateConsultationSummaryInputSchema,
    outputSchema: GenerateConsultationSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
