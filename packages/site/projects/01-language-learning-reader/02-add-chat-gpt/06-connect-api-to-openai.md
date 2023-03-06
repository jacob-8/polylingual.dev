---
en: Add OpenAI
zh-TW: 添加 OpenAI
initial_url: /explain
file_to_focus: src/routes/explain/+page.svelte
---

Now that we have our frontend and backend working, let's actually return a response from OpenAI. We will use the [OpenAI Completions API](https://platform.openai.com/docs/api-reference/completions/create?lang=node.js). :zh: 現在我們的前端和後端都可以正常工作，讓我們實際返回 OpenAI 的響應。 我們將使用 [OpenAI Completions API](https://platform.openai.com/docs/api-reference/completions/create?lang=node.js)。

First add your API key to `.env.local` in the root directory: :zh: 首先將您的 API 密鑰添加到根目錄中的 .env.local 中：

[[.env.local#02]]

> Notice the `*.local` entry in our `.gitignore` file. It is extremely important that you do not commit this file to your repository. It contains your API key and should not be shared with anyone. If you do accidentally commit it, you can delete it from your repository and generate a new key. When you deploy a SvelteKit app, simply add your private key to `OPENAI_API_KEY` using your hosting provider's  environment variables. :zh: > 

Then import that key into the server endpoint and initialize `openai` with it. 然後將該密鑰導入服務器端點並使用它初始化 `openai`。

[[src/routes/api/paraphrase/+server.ts#04]]

Create a completion request and return the response of a simple line: :zh: 創建一個完成請求並返回一個簡單行的響應：

[[src/routes/api/paraphrase/+server.ts#05]]

And input a short prompt to try it! :zh: 並輸入一個簡短的提示來試試吧！