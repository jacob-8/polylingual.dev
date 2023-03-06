import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { OPENAI_API_KEY } from '$env/static/private';
import type { CreateModerationRequest, CreateModerationResponse, CreateEmbeddingRequest, CreateEmbeddingResponse, CreateChatCompletionRequest, ChatCompletionRequestMessage, } from 'openai'
import { find_closest_embeddings_cosine, type Embedding } from './find_closest_embeddings';
import { map_nearest_embeddings_to_documents } from './map_nearest_embeddings_to_documents';
import { load_docs_and_embeddings } from './load_docs_and_embeddings';
import { concat_matched_documents } from './concat_matched_documents';
// import { decodeToken } from '$lib/server/firebase-admin';
import type { Config } from '@sveltejs/adapter-vercel'

export const config: Config = {
  runtime: 'edge'
}

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
  try {
    if (!OPENAI_API_KEY) throw error(400, "OPENAI_API_KEY env variable not configured");

    const { text, auth_token } = await request.json();
    if (!text) throw error(400, "No text found in request body");
    if (!auth_token) throw error(400, "No auth_token found in request body");

    // const decodedToken = await decodeToken(auth_token);
    // const uid = decodedToken?.uid;
    // const authenticated = uid.endsWith('EFVxKpJC5BkTHy22');
    // if (!authenticated) throw error(400, "Unauthorized usage");
    const uid = 'test';

    const moderation_request: CreateModerationRequest = { input: text }
    const moderation_response = await fetch('https://api.openai.com/v1/moderations', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      method: 'POST',
      body: JSON.stringify(moderation_request)
    })
    const { results: [{ flagged }] } = await moderation_response.json() as CreateModerationResponse;
    if (flagged) throw error(400, 'Query content does not comply with OpenAI usage policies.')

    const query = text;
    const query_without_newlines = query.replace(/\n/g, ' '); // OpenAI recommends replacing newlines with spaces for best results (specific to embeddings)
    console.log(`getting embedding: ${query_without_newlines}`)

    const embedding_request: CreateEmbeddingRequest = {
      model: "text-embedding-ada-002",
      input: query_without_newlines,
      user: uid,
    };
    const embedding_response = await fetch('https://api.openai.com/v1/embeddings', {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(embedding_request)
    })
    const { data: [{ embedding: query_embedding }] } = await embedding_response.json() as CreateEmbeddingResponse;

    if (doc_sections.length === 0 || doc_embeddings.length === 0) {
      ({ doc_embeddings, doc_sections } = await load_docs_and_embeddings('sveltejs.kit/docs', fetch))
    }

    const nearest_matches = find_closest_embeddings_cosine(query_embedding, doc_embeddings, MAX_DOCS_TO_RETURN);
    const nearest_documents = map_nearest_embeddings_to_documents(nearest_matches, doc_sections);
    const document_context = concat_matched_documents(nearest_documents);

    const prompt = generate_prompt(document_context, query);
    const messages: ChatCompletionRequestMessage[] = [
      { role: 'system', content: prompt },
    ]

    const chat_completion_request: CreateChatCompletionRequest = {
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0,
      user: uid,
      // max_tokens: 1000,
      stream: true
    }

    const chat_response = await fetch('https://api.openai.com/v1/chat/completions', {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(chat_completion_request)
    })

    if (!chat_response.ok) {
      const err = await chat_response.json();
      throw error(400, err)
    }

    return new Response(chat_response.body, {
      headers: {
        'Content-Type': 'text/event-stream'
      }
    })
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