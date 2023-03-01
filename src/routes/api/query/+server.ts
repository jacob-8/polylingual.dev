import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit';
import { OPENAI_API_KEY } from '$env/static/private';
import { Configuration, OpenAIApi } from "openai";
import { find_closest_embeddings_cosine, type Embedding } from './find_closest_embeddings';
import { map_nearest_embeddings_to_documents } from './map_nearest_embeddings_to_documents';
import { load_docs_and_embeddings } from './load_docs_and_embeddings';
import { concat_matched_documents } from './concat_matched_documents';
import { decodeToken } from '$lib/server/firebase-admin';

const configuration = new Configuration({ apiKey: OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

let doc_embeddings: Embedding[] = [];
let doc_sections: DocSectionData[] = [];

const MAX_DOCS_TO_RETURN = 15;

// TODO: unduplicate with process package
export interface DocSectionData {
  hash: string;
  token_count: number;
  title: string;
  combined_title?: string;
  filename: string;
  content: string;
}

export const POST: RequestHandler = async ({ request, fetch }) => {
  if (!configuration.apiKey) throw error(400, "OpenAI API key not configured");

  const { text, auth_token } = await request.json();
  if (!text) throw error(400, "No text property found in request body");

  const decodedToken = await decodeToken(auth_token);
  const uid = decodedToken?.uid;
  const authenticated = uid.endsWith('EFVxKpJC5BkTHy22');
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

    const query_embedding = embeddingResponse.data.data[0].embedding;

    if (doc_sections.length === 0 || doc_embeddings.length === 0) {
      ({ doc_embeddings, doc_sections } = await load_docs_and_embeddings('sveltejs.kit/docs', fetch))
    }

    const nearest_matches = find_closest_embeddings_cosine(query_embedding, doc_embeddings, MAX_DOCS_TO_RETURN);
    const nearest_documents = map_nearest_embeddings_to_documents(nearest_matches, doc_sections);
    const document_context = concat_matched_documents(nearest_documents);

    const prompt = generate_prompt(document_context, query);

    const completionResponse = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
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

function generate_prompt(document_context: string, query: string) {
  return `You love to help people understand how to use Svelte and SvelteKit to build full-stack websites. Given the following context sections from various documentation sites, answer the question using only that information, outputted in markdown format. If you are unsure and the answer is not explicitly written in the context sections, say "Sorry, I don't know how to help with that."

Context sections:
${document_context}

Question: """
${query}
"""

Answer as markdown in the same language as the question (including related code snippets if available):
`
}