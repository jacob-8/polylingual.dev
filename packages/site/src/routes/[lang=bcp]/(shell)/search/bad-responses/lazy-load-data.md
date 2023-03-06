<!-- Q: How do I lazy load data? -->

You can lazy load data by defining `load` functions in your `+page.svelte` and `+layout.svelte` components. These functions are called when the component is about to be rendered. You can also use `load` functions to fetch data from external APIs. 

```js
// file: src/routes/blog/[slug]/+page.svelte
export async function load({ params }) {
  const res = await fetch(`https://api.example.com/posts/${params.slug}`);
  const post = await res.json();

  return { post };
}
```

```js
// file: src/routes/blog/[slug]/+layout.svelte
export async function load() {
  const res = await fetch(`https://api.example.com/posts`);
  const posts = await res.json();

  return { posts };
}
```

You can also use the `preload` function to lazy load data on the client-side. This function is called after the page has been rendered and can be used to fetch additional data.

```js
// file: src/routes/blog/[slug]/+page.svelte
export async function preload({ params }) {
  const res = await fetch(`https://api.example.com/comments/${params.slug}`);
  const comments = await res.json();

  return { comments };
}
```