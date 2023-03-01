## Initial instructions
https://supabase.com/blog/chatgpt-supabase-docs
https://supabase.com/blog/openai-embeddings-postgres-vector

## Docs to search
- https://github.com/sveltejs/kit/tree/master/documentation/docs 
- https://github.com/sveltejs/vite-plugin-svelte/tree/main/docs
- https://github.com/sveltejs/svelte/tree/master/site/content

## Steps
- preprocess knowledge base and create embeddings of docs
  - preprocess mdx and generate embeddings example: https://github.com/supabase/supabase/blob/master/apps/docs/scripts/generate-embeddings.ts
  - store embeddings in csv file (270 embeddings ~= 5 megabytes)
- connect embeddings to server endpoint by reading CSV
- get embedding for user query
- perform a similarity search against my pre-processed embeddings
- Send these embedding along with query at end of prompt to openai to get answer
- show answer in markdown
<!-- TODO secure with firebase auth, just listed users -->
<!-- TODO add openai key to vercel, solve build error -->
<!-- TODO improve appearance of answers -->
<!-- TODO: prepare presentation  -->

## Future
- stream response
- remove error upon next query
- refine allowed response length, I would rather tell it the max characters than just cut it off as is the current case.
- query for appropriateness: https://platform.openai.com/docs/api-reference/moderations/create
- improve logging
- Sort Sapper responses to the end
- expand license notices
- bring in updated UnoCSS for dark mode prose
- process other docs sections
- Add links to where the answer came from
- convert relative links to absolute links
- learn from https://download-directory.github.io/ to download docs changes
- Use Pinecone or Typesense for fast vector search

## Further inspiration:
- Answer display: https://github.com/supabase/supabase/blob/master/apps/docs/components/Clippy/Clippy.tsx
- streaming results: https://supabase.com/blog/openai-embeddings-postgres-vector
- https://all-in-on-ai.vercel.app/
- https://prmpts.ai/