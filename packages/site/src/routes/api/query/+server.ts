import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { OPENAI_API_KEY } from '$env/static/private';
import type { CreateModerationRequest, CreateModerationResponse, CreateEmbeddingRequest, CreateEmbeddingResponse, CreateChatCompletionRequest, ChatCompletionRequestMessage, } from 'openai'
import { find_closest_embeddings_cosine, type Embedding } from './find_closest_embeddings';
import { map_nearest_embeddings_to_documents } from './map_nearest_embeddings_to_documents';
import { load_docs_and_embeddings } from './load_docs_and_embeddings';
import { concat_matched_documents } from './concat_matched_documents';
import { decodeToken } from '$lib/server/firebase-admin';
import { generate_user_prompt, system_message } from './prompts';

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
    if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY env variable not configured");

    const { query, auth_token } = await request.json();
    if (!query) throw new Error("No query found in request body");
    if (!auth_token) throw new Error("No auth_token found in request body");

    const decodedToken = await decodeToken(auth_token);
    const uid = decodedToken?.uid;
    const authenticated = uid.endsWith('EFVxKpJC5BkTHy22');
    if (!authenticated) throw new Error("Unauthorized usage: Wait a little bit - right now only Jacob can use this. If you can't wait, ask him when it'll be ready.");

    const moderation_request: CreateModerationRequest = { input: query }
    const moderation_response = await fetch('https://api.openai.com/v1/moderations', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      method: 'POST',
      body: JSON.stringify(moderation_request)
    })
    const { results: [{ flagged }] } = await moderation_response.json() as CreateModerationResponse;
    if (flagged) throw new Error('Query content does not comply with OpenAI usage policies.')

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
    if (nearest_documents.length === 0) throw new Error('No related documents found for query.');
    const document_context = concat_matched_documents(nearest_documents);

    const messages: ChatCompletionRequestMessage[] = [
      { role: 'system', content: system_message },
      { role: 'user', content: generate_user_prompt(document_context, query) },
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
      throw new Error(err)
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
      throw error(500, `Error with OpenAI API request: ${err.message}`)
    }
  }
};
