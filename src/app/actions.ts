'use server';

// TODO: verify it's not exposed in the frontend

import { GoogleGenerativeAI } from '@google/generative-ai';

export const callGemini = async (finalPrompt: string) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not defined');
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  try {
    const result = await model.generateContent(finalPrompt);
    const geminiResponse = result.response.text();

    return geminiResponse;
  } catch (error) {
    console.log('Error while fetching the response', error);
    return error;
  }
};
