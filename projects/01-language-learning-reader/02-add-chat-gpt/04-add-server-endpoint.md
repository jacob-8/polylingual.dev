---
en: Add Server Endpoint
zh-TW: 添加服務器端點
initial_url: /explain
file_to_focus: src/routes/explain/+page.svelte
---

Next we add a server API route file, `src/routes/api/paraphrase/+server.ts`, to receive the request from the client and send it to OpenAI. For now, we will just add a `hello--` to the beginning of the text and return it.

[[src/routes/api/paraphrase/+server.ts#02]]

