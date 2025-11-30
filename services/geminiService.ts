import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateTattooConcept = async (userIdea: string): Promise<string> => {
  if (!apiKey) {
    return "API Key ontbreekt. Configureer de API sleutel om ideeën te genereren.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Je bent een professionele tattoo artiest. De klant heeft het volgende idee: "${userIdea}". 
      Schrijf een korte, artistieke beschrijving (max 100 woorden) in het Nederlands van hoe dit ontwerp eruit zou kunnen zien om de klant te inspireren. 
      Focus op stijl, plaatsing en sfeer.`,
    });
    
    return response.text || "Kon geen concept genereren op dit moment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Er is een fout opgetreden bij het genereren van het concept.";
  }
};