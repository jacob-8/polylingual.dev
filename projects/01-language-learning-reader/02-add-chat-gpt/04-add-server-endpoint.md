---
en: Add Server Endpoint
zh-TW: 添加服務器端點
initial_url: /explain
file_to_focus: src/routes/explain/+page.svelte
---

Next we add a server API route file, `src/routes/api/paraphrase/+server.ts`, to receive the request from the client and send it to OpenAI. For now, we will just add a `hello--` to the beginning of the text and return it. :zh: 接下來我們添加一個服務器 API 路由文件，`src/routes/api/paraphrase/+server.ts`，用於接收來自前端的請求並將其發送給 OpenAI。 現在，我們只需在文本的開頭添加一個 `hello--` 並返回它。

[[src/routes/api/paraphrase/+server.ts#02]]

