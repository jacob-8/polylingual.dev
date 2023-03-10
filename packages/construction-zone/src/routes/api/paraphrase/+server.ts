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

  console.log(`paraphrasing: ${text}`)

  try {
    const completion = await openai.createCompletion({ // https://platform.openai.com/docs/api-reference/completions
      model: "text-davinci-003", // text-curie-001, text-davinci-003 // https://platform.openai.com/docs/models/gpt-3
      prompt: generate_chinese_prompt(text),
      temperature: 0,
      max_tokens: 256,
    });
    const explanation = completion.data.choices[0].text;
    console.log({ completion, explanation })
    return json(explanation);
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

function generate_chinese_prompt(text: string) {
  return `用一年級學生能理解的簡單中文重述以下文言文句子。

文言文：${text}
中文：`;
}

// `Restate the following Classical Chinese sentence using simple Mandarin Chinese that a first-grade student would understand.
// Classical Chinese: ${text}
// Mandarin Chinese:`
