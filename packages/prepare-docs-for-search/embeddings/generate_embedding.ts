import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env.local' });

export async function generate_embedding(document: string): Promise<number[]> {
  if (!process.env.OPENAI_API_KEY)
    throw new Error('OPENAI_API_KEY environment variable required: skipping embeddings generation')

  const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
  const openai = new OpenAIApi(configuration);

  const input = document.replace(/\n/g, ' '); // OpenAI recommends replacing newlines with spaces for best results (specific to embeddings)

  const embedding_response = await openai.createEmbedding({
    model: 'text-embedding-ada-002',
    input,
  })

  const [{ embedding }] = embedding_response.data.data;
  return embedding;
}

// import { writeFileSync } from 'fs';
// writeFileSync(`embeddings/samples/${input}.json`, JSON.stringify(embedding));