'use server';
/**
 * @fileOverview An AI agent that answers specific medical queries based on a provided document.
 *
 * - intelligentMedicalQuery - A function that handles the medical query process.
 * - IntelligentMedicalQueryInput - The input type for the intelligentMedicalQuery function.
 * - IntelligentMedicalQueryOutput - The return type for the intelligentMedicalQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentMedicalQueryInputSchema = z.object({
  query: z.string().describe('The user\'s specific question about the medical document.'),
  documentContent: z
    .string()
    .describe('The full text content of the medical document.'),
});
export type IntelligentMedicalQueryInput = z.infer<typeof IntelligentMedicalQueryInputSchema>;

const IntelligentMedicalQueryOutputSchema = z.object({
  summary: z.string().describe('A concise summary or explanation relevant to the query.'),
});
export type IntelligentMedicalQueryOutput = z.infer<typeof IntelligentMedicalQueryOutputSchema>;

export async function intelligentMedicalQuery(
  input: IntelligentMedicalQueryInput
): Promise<IntelligentMedicalQueryOutput> {
  return intelligentMedicalQueryFlow(input);
}

const intelligentMedicalQueryPrompt = ai.definePrompt({
  name: 'intelligentMedicalQueryPrompt',
  input: {schema: IntelligentMedicalQueryInputSchema},
  output: {schema: IntelligentMedicalQueryOutputSchema},
  prompt: `Eres un asistente de IA experto en medicina, diseñado para ayudar a profesionales de la salud a comprender rápidamente documentos médicos.

Tu tarea es responder a las preguntas de los usuarios basándote exclusivamente en el contenido del documento médico proporcionado. Genera resúmenes concisos y explicaciones relevantes para la consulta, sin añadir información externa.

Documento Médico:
---
{{{documentContent}}}
---

Consulta del Usuario: {{{query}}}`,
});

const intelligentMedicalQueryFlow = ai.defineFlow(
  {
    name: 'intelligentMedicalQueryFlow',
    inputSchema: IntelligentMedicalQueryInputSchema,
    outputSchema: IntelligentMedicalQueryOutputSchema,
  },
  async input => {
    const {output} = await intelligentMedicalQueryPrompt(input);
    return output!;
  }
);
