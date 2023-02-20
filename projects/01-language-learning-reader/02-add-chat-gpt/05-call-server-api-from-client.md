---
en: Call Server From Client
zh-TW: 使用服務器端點
initial_url: /explain
file_to_focus: src/routes/explain/+page.svelte
---

Now we want to send our text to our server endpoint and display the response. We could call the API directly from our Svelte component but that begins to make our component hard to read so we will create a separate `paraphrase.ts` file with a function that calls our API. :zh: 現在我們要將我們的文本發送到我們的服務器端點並顯示響應。 我們可以直接從我們的 Svelte 組件調用 API，但這開始使我們的組件難以閱讀，因此我們將創建一個單獨的 `paraphrase.ts` 文件，其中包含一個調用我們的 API 的函數。

[[src/routes/explain/paraphrase.ts#02]]

Now call this function from on form submission: :zh: 現在從表單提交調用這個函數：

[[src/routes/explain/+page.svelte#05]]
