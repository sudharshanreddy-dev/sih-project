import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API
const genAI = new GoogleGenerativeAI('AIzaSyChywb9IfIz0noKViO7kdRxpQNwYyXrLJY');

export  async function getGeminiResponse(placeName) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Provide a brief description of ${placeName} as a tourist destination. Include key attractions, best time to visit, and any cultural significance. Limit the response to 3-4 sentences.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error fetching place info:", error);
    return "Sorry, I couldn't fetch information about this place at the moment. Please try again later.";
  }
}