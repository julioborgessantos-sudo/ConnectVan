import { GoogleGenAI } from "@google/genai";
import { Driver } from "../types";

// In a real app, this would be a secure backend call or use a proxy.
// For this demo, we use the client-side SDK directly.
const getClient = () => {
  const apiKey = process.env.API_KEY; 
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const geminiService = {
  findBestMatch: async (query: string, drivers: Driver[]): Promise<string> => {
    const ai = getClient();
    if (!ai) return "API Key not configured. Please add your Gemini API Key.";

    // Simplify driver data for the prompt to save tokens
    const driversContext = drivers.map(d => ({
      name: d.name,
      route: d.route,
      schools: d.schools,
      vehicle: d.vehicle,
      features: d.bio
    }));

    const prompt = `
      Act as a helpful assistant for "VanConnect", a school transport marketplace.
      
      User Query: "${query}"
      
      Available Drivers Data:
      ${JSON.stringify(driversContext, null, 2)}
      
      Task:
      Analyze the User Query and the Available Drivers. 
      Identify the best matching driver(s) based on route, schools, and vehicle features.
      
      Return a short, friendly response (max 2 sentences) recommending a specific driver or giving general advice if no perfect match is found. 
      Reference the driver by name if found.
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      return response.text || "Sorry, I couldn't analyze the request at this moment.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Unable to connect to AI assistant. Please try again later.";
    }
  }
};
