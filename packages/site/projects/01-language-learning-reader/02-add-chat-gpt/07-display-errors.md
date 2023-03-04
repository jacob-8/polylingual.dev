---
en: Display Errors
zh-TW: 展示錯誤
initial_url: /explain
file_to_focus: src/routes/api/paraphrase/+server.ts
---

Let's make sure we catch any errors that occur when we call OpenAI. :zh: 讓我們確保捕獲調用 OpenAI 時發生的任何錯誤。

[[src/routes/api/paraphrase/+server.ts#06]]

Then we format the error in our paraphrase helper function:

[[src/routes/explain/paraphrase.ts#03]]

And display it in our component:

[[src/routes/explain/+page.svelte#06]]