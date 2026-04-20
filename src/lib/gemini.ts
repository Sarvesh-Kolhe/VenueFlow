import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateStadiumInsights = async (module: string) => {
  if (!ai) return "AI services currently offline. Please check configuration.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an AI stadium concierge for VenueFlow. Provide a 1-sentence technical insight or recommendation for the ${module} module to enhance the fan experience. Keep it professional, futuristic, and operational.`,
      config: {
          temperature: 0.7,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to retrieve AI insights at this time.";
  }
};
