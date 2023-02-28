import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit';
import { OPENAI_API_KEY } from '$env/static/private';
import { Configuration, OpenAIApi } from "openai";
import GPT3Tokenizer from 'gpt3-tokenizer';

const configuration = new Configuration({ apiKey: OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

export const POST: RequestHandler = async ({ request }) => {
  if (!configuration.apiKey) throw error(400, "OpenAI API key not configured");

  const { text, auth_token } = await request.json();
  if (!text) throw error(400, "No text property found in request body");

  const authenticated = auth_token === 'ADD_FIREBASE_AUTH_TO_SET_THIS_UP';
  if (!authenticated) throw error(400, "Unauthorized usage");
  
  const query = text;
  const query_without_newlines = query.replace(/\n/g, ' '); // OpenAI recommends replacing newlines with spaces for best results (specific to embeddings)
  
  console.log(`getting embedding: ${query_without_newlines}`)

  try {
    const embeddingResponse = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: query_without_newlines,
      user: 'add-user-id-here',
    });

    const embedding = embeddingResponse.data.data[0].embedding;
    const nearest_documents = find_most_related_documents(embedding);
    const document_context = concat_matched_documents(nearest_documents);

    const completionResponse = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: generate_prompt(document_context, query),
      max_tokens: 512,
      temperature: 0,
    })

    const { choices: [{ text }] } = completionResponse.data
    return json(text);
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

export interface DocumentationChunk {
  title?: string;
  content: string;
  embedding: number[];
}

const MAX_CONTENT_TOKENS = 1500;

function concat_matched_documents(documents: DocumentationChunk[]): string {
  const tokenizer = new GPT3Tokenizer({ type: 'gpt3' })
  let token_count = 0
  let context_text = ''

  for (const document of documents) {
    const content = document.content
    const encoded = tokenizer.encode(content)
    token_count += encoded.text.length

    if (token_count > MAX_CONTENT_TOKENS) {
      break
    }

    context_text += `${content.trim()}\n---\n`
  }
  console.log({ token_count, length: context_text.length })
  return context_text;
}

function generate_prompt(document_context: string, query: string) {
  return `You love to help people understand how to use Svelte and SvelteKit to build full-stack websites. Given the following sections from various documentation sites, answer the question using only that information, outputted in markdown format. If you are unsure and the answer is not explicitly written in the documentation, say "Sorry, I don't know how to help with that."

Context sections:
${document_context}

Question: """
${query}
"""

Answer as markdown in the same language as the question (including related code snippets if available):
`
}