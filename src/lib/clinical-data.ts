export const clinicalData = {
  definition: {
    title: "Definición de FPIES",
    content:
      "El síndrome de enterocolitis inducida por proteínas alimentarias (FPIES) es una reacción alérgica alimentaria no mediada por inmunoglobulina E (IgE) que afecta principalmente al tracto gastrointestinal. A diferencia de las alergias típicas, los síntomas de FPIES son tardíos, apareciendo generalmente de 1 a 4 horas después de la ingestión del alimento desencadenante.",
  },
  symptoms: {
    title: "Síntomas Principales",
    content:
      "Los síntomas característicos incluyen vómitos profusos y repetitivos, palidez, letargia y, en casos severos, hipotensión y shock hipovolémico. La diarrea también puede aparecer, generalmente varias horas después de los vómitos. La deshidratación es un riesgo significativo.",
  },
  protocol: {
    title: "Protocolo de Actuación",
    content: `El protocolo de tratamiento agudo para una reacción de FPIES se centra en la estabilización hemodinámica y el control de los síntomas. Las medidas clave son:
- **Fluidoterapia:** Rehidratación intravenosa con suero salino isotónico a 20 ml/kg.
- **Antiheméticos:** Administración de Ondansetrón intravenoso a una dosis de 0.15 mg/kg para controlar los vómitos.
- **Corticosteroides:** Se considera el uso de metilprednisolona (Actocortina) a 1-5 mg/kg, especialmente en casos moderados a graves para reducir la inflamación sistémica.
- **Antihistamínicos:** Polaramine (dexclorfeniramina) a 0.2-0.3 mg/kg (máximo 5 mg) puede ser útil, aunque su papel es secundario.
Es crucial monitorizar la respuesta del paciente y ajustar el tratamiento según sea necesario.`,
  },
  otherData: {
    title: "Otros Datos de Interés",
    content:
      "Los alimentos más comúnmente implicados en FPIES son la leche de vaca y la soja, pero también pueden ser el arroz, la avena y otras proteínas. El diagnóstico es principalmente clínico. La mayoría de los niños superan el FPIES en los primeros años de vida.",
  },
  bibliography: {
    title: "Bibliografía",
    references: [
      {
        text: 'Sonsoles Infante, et al. "Food protein-induced enterocolitis syndrome: a review." Journal of Investigational Allergology and Clinical Immunology 27.3 (2017): 149-161.',
        doi: "10.18176/jiaci.0142",
      },
      {
        text: 'Laura Argiz, et al. "Practical guide for the diagnosis and management of non-IgE-mediated gastrointestinal food allergies in children." Allergologia et Immunopathologia 45.4 (2017): 396-406.',
        doi: "10.1016/j.aller.2016.10.007",
      },
    ],
  },
};

const bibliographyText = clinicalData.bibliography.references
  .map((ref) => `${ref.text} DOI: ${ref.doi}`)
  .join("\n");

export const documentContentForAI = `${clinicalData.protocol.title}\n${clinicalData.protocol.content}\n\n${clinicalData.bibliography.title}\n${bibliographyText}`;
