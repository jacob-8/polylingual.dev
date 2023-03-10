import { GPT3Tokenizer } from './tokenizer';
import type { DocSectionData } from './+server';

const MAX_CONTENT_TOKENS = 1500;

export function concat_matched_documents(documents: DocSectionData[]): string {
  const tokenizer = new GPT3Tokenizer({ type: 'gpt3' })
  let token_count = 0
  let context_text = ''

  for (const document of documents) {
    const content = document.content
    const { text: token_array } = tokenizer.encode(content)
    const new_token_count = token_count + token_array.length;

    if (new_token_count > MAX_CONTENT_TOKENS) break

    console.log({ content })
    token_count = new_token_count;
    context_text += `${content.trim()}\n---\n`
  }
  console.log({ token_count, length: context_text.length })
  return context_text;
}
