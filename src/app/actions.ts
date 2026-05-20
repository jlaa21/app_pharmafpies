'use server';

import { intelligentMedicalQuery } from '@/ai/flows/intelligent-medical-query';
import { documentContentForAI } from '@/lib/clinical-data';

export async function askAI(prevState: any, formData: FormData) {
  const query = formData.get('query') as string;

  if (!query) {
    return { summary: null, error: 'La consulta no puede estar vacía.' };
  }

  try {
    const result = await intelligentMedicalQuery({
      query,
      documentContent: documentContentForAI,
    });
    return { summary: result.summary, error: null };
  } catch (e) {
    console.error(e);
    return { summary: null, error: 'Hubo un error al procesar su consulta. Por favor, inténtelo de nuevo.' };
  }
}
