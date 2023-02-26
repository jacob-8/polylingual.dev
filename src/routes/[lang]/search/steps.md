https://supabase.com/blog/chatgpt-supabase-docs
https://supabase.com/blog/openai-embeddings-postgres-vector

Needed:
- preprocess knowledge base and create embeddings of Svelte resources (start with a few samples): https://github.com/sveltejs/kit/tree/master/documentation/docs 
   - preprocess mdx example: https://github.com/supabase/supabase/blob/master/apps/docs/scripts/generate-embeddings.ts
   - remove newlines
   - convert relative links to absolute links
- Generate embeddings in a repeatable fashion: https://github.com/supabase/supabase/blob/master/apps/docs/scripts/generate-embeddings.ts
- store embeddings in a file (500 sections x 20 kilobytes per embedding =
10 megabytes)
<!-- - DONE: get embedding for user query -->
<!-- - perform a similarity search against my pre-processed embeddings -->
<!-- - Send these embedding along with query at end of prompt to openai to get answer -->
<!-- - show answer in markdown -->
- secure with firebase auth
- add openai key to vercel

Future:
- bring in updated UnoCSS for dark mode prose

----
Further inspiration:

- Answer display: https://github.com/supabase/supabase/blob/master/apps/docs/components/Clippy/Clippy.tsx
- streaming results: https://supabase.com/blog/openai-embeddings-postgres-vector

https://all-in-on-ai.vercel.app/
https://prmpts.ai/