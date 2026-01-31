import { GoogleGenAI } from "@google/genai";
import { INITIAL_SYSTEM_PROMPT } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateArchitectAdvice = async (userQuery: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: userQuery,
      config: {
        systemInstruction: INITIAL_SYSTEM_PROMPT,
        temperature: 0.7,
      }
    });

    return response.text || "I apologize, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while consulting the AI Architect. Please try again later.";
  }
};
