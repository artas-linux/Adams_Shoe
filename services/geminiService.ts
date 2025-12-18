import { GoogleGenAI } from "@google/genai";

export async function generateShoeConcept(prompt: string): Promise<string | null> {
  try {
    // Initializing precisely as per SDK guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `High-quality, realistic professional studio photography of a futuristic sneaker design. Side view on a clean studio background. The design should be inspired by: ${prompt}. Cinematic lighting, 8k resolution, detailed texture.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error("Error generating shoe concept:", error);
    return null;
  }
}