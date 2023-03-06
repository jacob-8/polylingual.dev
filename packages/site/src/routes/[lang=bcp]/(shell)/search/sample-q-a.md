// Q: What are snapshots?
// A: Snapshots are objects with `capture` and `restore` methods that can be exported from a `+page.svelte` or `+layout.svelte` to preserve ephemeral DOM state, like scroll positions on sidebars, the content of `<input>` elements, and so on. When you navigate away from a page, the `capture` function is called immediately before the page updates, and the returned value is associated with the current entry in the browser's history stack. If you navigate back, the `restore` function is called with the stored value as soon as the page is updated. The data must be serializable as JSON so that it can be persisted to `sessionStorage`. ```svelte /// file: +page.svelte <script> let comment = ''; /** @type {import('./$types').Snapshot<string>} */ export const snapshot = { capture: () => comment, restore: (value) => comment = value }; </script> <form method="POST"> <label for="comment">Comment</label> <textarea id="comment" bind:value={comment} /> <button>Post comment</button> </form> ```
// For reference: https://kit.svelte.dev/docs/snapshots

// '我最喜歡 SvelteKit 的是它提供了許多現代最佳實踐，例如建置最佳化，離線支援，預載頁面，可配置渲染，以及其他許多功能。它使用 [Vite](https://vitejs.dev/) 和 [Svelte 插件](https://github.com/sveltejs/vite-plugin-svelte) 來實現 [熱模塊替換 (HMR)](https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/config.md#hot)，可以立即反映代碼的更改，提供閃電般快速和功能豐富的開發體驗。';

// Q: 如何創建新路線？
// A: 可以通過在 src/routes 目錄中添加新的目錄來創建新路線。例如，添加 src/routes/about 將創建一個 /about 路線，添加 src/routes/blog/[slug] 將創建一個帶有參數 slug 的路線，可以在用戶請求 /blog/hello-world 頁面時動態加載數據。可以通過在 `src/routes` 目錄中添加新的目錄來創建新路線。例如，添加 `src/routes/about` 將創建一個 `/about` 路線，添加 `src/routes/blog/[slug]` 將創建一個帶有參數 `slug` 的路線，可以在用戶請求 `/blog/hello-world` 頁面時動態加載數據。 


// tell me about layout resets
// how do I reset to a named layout other than root?