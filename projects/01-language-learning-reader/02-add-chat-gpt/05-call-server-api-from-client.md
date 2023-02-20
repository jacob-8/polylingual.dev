---
en: Call Server From Client
zh-TW: 使用服務器端點
initial_url: /explain
file_to_focus: src/routes/explain/+page.svelte
---

Now we want to send our text to our server endpoint and display the response. We could call the API directly from our Svelte component but that begins to make our component hard to read so we will create a separate `paraphrase.ts` file with a function that calls our API.

[[src/routes/explain/paraphrase.ts#02]]

Now call this function from on form submission:

[[src/routes/explain/+page.svelte#05]]
