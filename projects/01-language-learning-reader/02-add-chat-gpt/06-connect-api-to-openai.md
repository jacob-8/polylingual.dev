---
en: Add OpenAI
zh-TW: ____
initial_url: /explain
file_to_focus: src/routes/explain/+page.svelte
---

Now that we have our frontend and backend working, let's actually return a response from OpenAI. We will use the [OpenAI Completions API](https://platform.openai.com/docs/api-reference/completions/create?lang=node.js).

First add your API key to `.env.local` in the root directory:

[[.env.local#02]]

> Notice the `*.local` entry in our `.gitignore` file. It is extremely important that you do not commit this file to your repository. It contains your API key and should not be shared with anyone. If you do accidentally commit it, you can delete it from your repository and generate a new key. When you deploy a SvelteKit app, simply add your private key to `OPENAI_API_KEY` using your hosting provider's  environment variables.

Then import that key into the server endpoint and initialize openai with it.

[[src/routes/api/paraphrase/+server.ts#04]]

Create a completion request and return the response of a simple line:

[[src/routes/api/paraphrase/+server.ts#05]]

And input a short prompt to try it!