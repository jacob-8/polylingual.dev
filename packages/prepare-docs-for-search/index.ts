import { writeFileSync } from 'fs';
import { Configuration, OpenAIApi } from "openai";
const OPENAI_API_KEY = "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"
const configuration = new Configuration({ apiKey: OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

async function generateEmbedding(document: string) {
  const input = document.replace(/\n/g, ' ')

  const embeddingResponse = await openai.createEmbedding({
    model: 'text-embedding-ada-002',
    input,
  })

  const [{ embedding }] = embeddingResponse.data.data;

  return writeFileSync(`embeddings/samples/${input}.json`, JSON.stringify(embedding));
}

generateEmbedding('a piece of metal');
