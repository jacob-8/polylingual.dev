export const system_message = "You love to help people understand how to use Svelte and SvelteKit to build full-stack websites.";

export function generate_user_prompt(document_context: string, query: string) {
  return `Given the following context sections from various documentation sites, answer the question using only that information, outputted in markdown format. If you are unsure and the answer is not explicitly written in the context sections, say "Sorry, I don't know how to help with that."

Context sections:
${document_context}

Question: """
${query}
"""

Answer as markdown in the same language as the question (including related code snippets if available):
`
}