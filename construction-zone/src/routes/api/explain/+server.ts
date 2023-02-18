import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit';
import { OPENAI_API_KEY } from '$env/static/private';
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({ apiKey: OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

export const POST: RequestHandler = async ({ request }) => {
  if (!configuration.apiKey) throw error(400, "OpenAI API key not configured");

  const { text, auth_token } = await request.json();

  if (!text) throw error(400, "No text property found in request body");

  const authenticated = auth_token === 'ADD_FIREBASE_AUTH_TO_SET_THIS_UP';
  if (!authenticated) throw error(400, "Unauthorized usage");

  console.log(`explaining: ${text}`)

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(text),
      temperature: 0.6,
      max_tokens: 40,
    });
    const explanation = completion.data.choices[0].text;
    console.log({ completion, explanation })
    return json(explanation);

  } catch (error: any) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      throw error(error.response.status, error.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      throw error(500, 'An error occurred during your request.')
    }
  }

};

function generatePrompt(text: string) {
  return `${text.slice(0, 1000)}

Summarize the above text in English:`;
}