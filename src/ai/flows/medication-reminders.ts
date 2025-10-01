'use server';

/**
 * @fileOverview Medication reminder scheduling and delivery flow.
 *
 * - scheduleMedicationReminders - Schedules medication reminders based on a patient's prescription.
 * - ScheduleMedicationRemindersInput - The input type for the scheduleMedicationReminders function.
 * - ScheduleMedicationRemindersOutput - The return type for the scheduleMedicationReminders function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ScheduleMedicationRemindersInputSchema = z.object({
  patientId: z.string().describe('The ID of the patient.'),
  medicationName: z.string().describe('The name of the medication.'),
  dosage: z.string().describe('The dosage of the medication.'),
  frequency: z.string().describe('How often the medication should be taken (e.g., once a day, twice a day).'),
  timeOfDay: z.string().describe('The time of day the medication should be taken (e.g., 9:00 AM, 8:00 PM).'),
  startDate: z.string().describe('The start date for the medication schedule (ISO format).'),
  endDate: z.string().describe('The end date for the medication schedule (ISO format).'),
});
export type ScheduleMedicationRemindersInput = z.infer<typeof ScheduleMedicationRemindersInputSchema>;

const ScheduleMedicationRemindersOutputSchema = z.object({
  success: z.boolean().describe('Whether the medication reminders were successfully scheduled.'),
  message: z.string().describe('A message indicating the status of the scheduling process.'),
});
export type ScheduleMedicationRemindersOutput = z.infer<typeof ScheduleMedicationRemindersOutputSchema>;

export async function scheduleMedicationReminders(input: ScheduleMedicationRemindersInput): Promise<ScheduleMedicationRemindersOutput> {
  return scheduleMedicationRemindersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'scheduleMedicationRemindersPrompt',
  input: {schema: ScheduleMedicationRemindersInputSchema},
  output: {schema: ScheduleMedicationRemindersOutputSchema},
  prompt: `You are a helpful assistant that schedules medication reminders for patients.

  Patient ID: {{{patientId}}}
  Medication Name: {{{medicationName}}}
  Dosage: {{{dosage}}}
  Frequency: {{{frequency}}}
  Time of Day: {{{timeOfDay}}}
  Start Date: {{{startDate}}}
  End Date: {{{endDate}}}

  Based on the information above, schedule push notifications to remind the patient to take their medication according to the schedule.

  Return a JSON object indicating whether the reminders were successfully scheduled and a message indicating the status.
  {
    "success": true|false,
    "message": "A message indicating the status of the scheduling process."
  }
`,
});

const scheduleMedicationRemindersFlow = ai.defineFlow(
  {
    name: 'scheduleMedicationRemindersFlow',
    inputSchema: ScheduleMedicationRemindersInputSchema,
    outputSchema: ScheduleMedicationRemindersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
