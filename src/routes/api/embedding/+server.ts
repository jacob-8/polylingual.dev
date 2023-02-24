import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit';
import { OPENAI_API_KEY } from '$env/static/private'; // TODO: add to Vercel
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({ apiKey: OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

export const POST: RequestHandler = async ({ request, params }) => {
  // params.lang
  if (!configuration.apiKey) throw error(400, "OpenAI API key not configured");

  const { text, auth_token } = await request.json();
  if (!text) throw error(400, "No text property found in request body");

  const authenticated = auth_token === 'ADD_FIREBASE_AUTH_TO_SET_THIS_UP';
  if (!authenticated) throw error(400, "Unauthorized usage");

  console.log(`getting embedding: ${text}`)

  try {
    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: text,
      user: 'add-user-id-here',
    });
    console.log(response.data)
    const embedding = response.data.data[0].embedding;

    return json(embedding);
  } catch (err: any) {
    if (err.response) {
      console.error(err.response.status, err.response.data);
      throw error(err.response.status, err.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${err.message}`);
      throw error(500, 'An error occurred during your request.')
    }
  }
};
