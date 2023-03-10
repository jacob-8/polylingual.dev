export const samples = [
  {
    q: 'How do I create a page route?', // 如何創建頁面路由？ (1)
    // q: 'How do I create a new page route?', Note difference
    a: `To create a page route, you can define a \`+page.svelte\` component in the \`src/routes\` directory. By default, pages are rendered both on the server ([SSR](glossary#ssr)) for the initial request and in the browser ([CSR](glossary#csr)) for subsequent navigation. For example, to create a page with the path \`/about\`, you can create a \`+page.svelte\` component in the \`src/routes/about\` directory:

\`\`\`svelte
/// file: src/routes/about/+page.svelte
<h1>About this site</h1>
<p>TODO...</p>
<a href="/">Home</a>
\`\`\`

Note that SvelteKit uses \`<a>\` elements to navigate between routes, rather than a framework-specific \`<Link>\` component.`
  },
  {
    q: 'How do I create new routes?',
    a: 'You can create new routes by adding new directories in the `src/routes` directory. For example, adding `src/routes/about` will create a `/about` route, and adding `src/routes/blog/[slug]` will create a route with a `slug` parameter that can dynamically load data when the user requests the `/blog/hello-world` page.'
  },
  {
    q: "What are snapshots?", // 什麼是快照？ // 什麼是 snapshots？// 什麼是快照？ 請舉個例子 (2,3,4)
    a: `Snapshots are a way to preserve ephemeral DOM state, like scroll positions or input values, when navigating between pages. To use snapshots, you can export a \`snapshot\` object with \`capture\` and \`restore\` methods from a \`+page.svelte\` or \`+layout.svelte\` file. The \`capture\` function is called before the page updates, and the returned value is associated with the current entry in the browser's history stack. If you navigate back, the \`restore\` function is called with the stored value as soon as the page is updated. The data must be serializable as JSON so that it can be persisted to \`sessionStorage\`. Here's an example of how to use snapshots:

\`\`\`svelte
/// file: +page.svelte
<script>
  let comment = '';

  /** @type {import('./$types').Snapshot<string>} */
  export const snapshot = {
    capture: () => comment,
    restore: (value) => comment = value
  };
</script>

<form method="POST">
  <label for="comment">Comment</label>
  <textarea id="comment" bind:value={comment} />
  <button>Post comment</button>
</form>
\`\`\`

In this example, the \`capture\` function returns the value of the \`comment\` variable, which is the current value of the comment textarea. The \`restore\` function sets the \`comment\` variable to the value passed in as an argument. When the user navigates away from this page and then back again, the \`restore\` function will be called with the previously captured value, and the comment textarea will be restored to its previous value.`
    // For reference: https://kit.svelte.dev/docs/snapshots
  },
  {
    q: "你最喜歡 SvelteKit 的什麼？", // don't use
    a: "我最喜歡 SvelteKit 的是它提供了許多現代最佳實踐，例如建置最佳化，離線支援，預載頁面，可配置渲染，以及其他許多功能。它使用 [Vite](https://vitejs.dev/) 和 [Svelte 插件](https://github.com/sveltejs/vite-plugin-svelte) 來實現 [熱模塊替換 (HMR)](https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/config.md#hot)，可以立即反映代碼的更改，提供閃電般快速和功能豐富的開發體驗。"
  },
  {
    q: "如何創建新路線？", // don't use
    a: "可以通過在 src/routes 目錄中添加新的目錄來創建新路線。例如，添加 src/routes/about 將創建一個 /about 路線，添加 src/routes/blog/[slug] 將創建一個帶有參數 slug 的路線，可以在用戶請求 /blog/hello-world 頁面時動態加載數據。可以通過在 `src/routes` 目錄中添加新的目錄來創建新路線。例如，添加 `src/routes/about` 將創建一個 `/about` 路線，添加 `src/routes/blog/[slug]` 將創建一個帶有參數 `slug` 的路線，可以在用戶請求 `/blog/hello-world` 頁面時動態加載數據。 "
  },
  {
    q: 'Typescript example for testing',
    a: `Here is a little Typescript:
\`\`\`typescript
const foo: string = 'hello';
\`\`\`
`
  },
  {
    q: 'How do I create a layout reset?', // 如何創建佈局重置？ (5)
    a: `To create a layout reset, you can create a layout component with the name \`+layout@.svelte\`. This layout component will reset the hierarchy for all its child routes. Here's an example of how to use it:

\`\`\`
src/routes/
├ (app)/
│ ├ item/
│ │ ├ [id]/
│ │ │ ├ embed/
│ │ │ │ └ +page.svelte  // uses (app)/item/[id]/+layout.svelte
│ │ │ ├ +layout.svelte  // inherits from (app)/item/+layout@.svelte
│ │ │ └ +page.svelte    // uses (app)/item/+layout@.svelte
│ │ └ +layout@.svelte   // inherits from root layout, skipping (app)/+layout.svelte
│ └ +layout.svelte
└ +layout.svelte
\`\`\`

In this example, the \`+layout@.svelte\` component is used to reset the layout hierarchy for all child routes of the \`item\` route.`
  },
  {
    q: 'Touching code blocks with second having a filename with only two slashes',
    a: `Some sentence

\`\`\`js
/// file: foo.js
const foo = 'foo';
\`\`\`
\`\`\`js
// file: bar.js
const bar = 'bar';
\`\`\`
    `
  },
  {
    q: 'How do I add a route matcher?',
    a: `To add a route matcher, you can create a matcher function in a \`params\` directory and augment your routes with the matcher. For example, to create an integer matcher, you can create a file \`src/params/integer.js\` with the following code:

\`\`\`js
/// file: src/params/integer.js
/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
  return /^\d+$/.test(param);
}
\`\`\`

Then, you can augment your routes by adding the matcher to the parameter definition. For example, to add the integer matcher to a route like \`src/routes/archive/[page]\`, you can modify it like this:

\`\`\`diff
-src/routes/archive/[page]
+src/routes/archive/[page=integer]
\`\`\`

Matchers run both on the server and in the browser.`
  },
]

// similar responses but the latter gives more explanation:
// how do I reset to a named layout other than root?
// tell me about layout resets // 告訴我關於 layout resets // 告訴我關於 layout resets 並給我一個例子 (6,7)

// How do I create an api? // 如何創建 api？ // 如何創建 api？ 告訴我如何在我的應用程序中使用它 (8)
// How do I create an api? Call it "embedding" // 如何創建 api？ 稱之為“嵌入” << doesn't understand Chinese request to call it embedding, ignores that part

// How do I create a new page route?
// What is the +error file? // +error 文件是什麼？ (9)

// What is SvelteKit useful for? // SvelteKit 有什麼用？ (10)

// Doesn't know: Who created SvelteKit? // 誰創造了 SvelteKit？


// 我最喜歡 SvelteKit 的是它提供了許多現代最佳實踐，例如建置最佳化，離線支援，預載頁面，可配置渲染，以及其他許多功能。它使用 [Vite](https://vitejs.dev/) 和 [Svelte 插件](https://github.com/sveltejs/vite-plugin-svelte) 來實現 [熱模塊替換 (HMR)](https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/config.md#hot)，可以立即反映代碼的更改，提供閃電般快速和功能豐富的開發體驗。

// Q: How do you spin routes backwards?
// A: Has no answer so will give "1234"

// How do you write links? // 如何寫鏈接？ (11)

// In SvelteKit, `<a>` elements (rather than framework-specific `<Link>` components) are used to navigate between the routes of your app. If the user clicks on a link whose `href` is 'owned' by the app (as opposed to, say, a link to an external site) then SvelteKit will navigate to the new page by importing its code and then calling any `load` functions it needs to fetch data. You can customise the behaviour of links with `data-sveltekit-*` attributes. These can be applied to the `<a>` itself, or to a parent element.

// To disable the default scrolling behaviour when navigating to internal links, add a `data-sveltekit-noscroll` attribute to the link.

// To tell SvelteKit not to handle a link, but allow the browser to handle it, add a `data-sveltekit-reload` attribute to the link. Links with a `rel="external"` attribute will receive the same treatment. In addition, they will be ignored during prerendering.

// To write a link, use the `<a>` element with an `href` attribute that points to the desired URL. For example: ```html
// <a href="/path/to/page">Link text</a>
// ```

// TODO: If ChatGPT forgets to add a newline before triple-hash, do it for them as seen is needed in the response above.