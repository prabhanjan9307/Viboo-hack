
import { GoogleGenAI, Type } from "@google/genai";
import { Demand, AIInsight } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateStrategicReport = async (demands: Demand[]): Promise<AIInsight> => {
  const demandListStr = demands
    .map(d => `- [${d.category}] ${d.title}: ${d.description} (Upvotes: ${d.upvotes}, Downvotes: ${d.downvotes})`)
    .join('\n');

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze the following student demands and provide a strategic campus insight report for the Campus Authority. Consider both upvotes (support) and downvotes (opposition/low priority) to weigh the true community need.\n\nDemands:\n${demandListStr}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          sentimentSummary: {
            type: Type.STRING,
            description: "A professional summary of overall student sentiment based on the demands and vote distribution."
          },
          keyTrends: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of top 3 emerging trends in student needs."
          },
          strategicRecommendation: {
            type: Type.STRING,
            description: "A prioritized strategic recommendation for the Campus Authority."
          },
          priorityLevel: {
            type: Type.STRING,
            description: "Overall priority level: LOW, MEDIUM, HIGH, or CRITICAL."
          }
        },
        required: ["sentimentSummary", "keyTrends", "strategicRecommendation", "priorityLevel"]
      }
    }
  });

  try {
    const data = JSON.parse(response.text || '{}');
    return data as AIInsight;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("AI Analysis failed to generate valid strategic insights.");
  }
};
