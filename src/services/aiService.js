import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const SYSTEM_PROMPT = `
You are the AI assistant for Dhansagar Aqua, a premier aqua farming and pure water delivery service.
Your goal is to help customers with their inquiries about water delivery, aqua farming solutions, pricing, and contact information.

Key Information:
- Company Name: Dhansagar Aqua
- Services: Pure water delivery, Aqua farming solutions, Fish pond management.
- Contact Number: 9922616054
- WhatsApp: 9922616054
- Location: Operating primarily in local regions (Maharashtra, India).
- Tone: Professional, helpful, and friendly.
- Languages: Primary English, but also support Marathi and Hindi.

Response Guidelines:
1. Always be polite and professional.
2. If you don't know the answer, ask them to call 9922616054.
3. Keep responses concise and relevant.
4. If the user greets in Marathi or Hindi, respond in the same language if possible.
`;

export const getGeminiResponse = async (userMessage, history = []) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "I'm having trouble connecting right now. Please try again later or call us at 9922616054.";
  }
};
