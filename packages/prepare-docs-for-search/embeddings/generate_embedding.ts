import { writeFileSync } from 'fs';
import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env.local' });

async function generateEmbedding(document: string) {
  if (!process.env.OPENAI_API_KEY)
    return console.warn('OPENAI_API_KEY environment variable required: skipping embeddings generation')

  const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
  const openai = new OpenAIApi(configuration);

  const input = document.replace(/\n/g, ' ')

  const embeddingResponse = await openai.createEmbedding({
    model: 'text-embedding-ada-002',
    input,
  })

  const [{ embedding }] = embeddingResponse.data.data;

  return writeFileSync(`embeddings/samples/${input}.json`, JSON.stringify(embedding));
}

generateEmbedding('a piece of metal');
