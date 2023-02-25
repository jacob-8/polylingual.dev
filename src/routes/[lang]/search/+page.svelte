<script lang="ts">
  import SeoMetaTags from '$lib/SeoMetaTags.svelte';
  import SvelteMarkdown from 'svelte-markdown';
  import { query_documentation } from './query_documentation';

  // let answer: string =
  //   '\nSvelte is a way of writing user interface components — like a navigation bar, comment section, or contact form — that users see and interact with in their browsers. The Svelte compiler converts your components to JavaScript that can be run to render the HTML for the page and to CSS that styles the page.\n\nSvelteKit is a framework for rapidly developing robust, performant web applications using Svelte. It provides basic functionality like a router — which updates the UI when a link is clicked — and server-side rendering (SSR). But beyond that, SvelteKit provides build optimizations, offline support, preloading pages before the user initiates navigation, configurable rendering, and many other things. SvelteKit does all the boring stuff for you so that you can get on with the creative part. It reflects changes to your code in the browser instantly to provide a lightning-fast and feature-rich development experience by leveraging Vite with a Svelte plugin to do Hot Module Replacement (HMR).';

  let answer =
    '我最喜歡 SvelteKit 的是它提供了許多現代最佳實踐，例如建置最佳化，離線支援，預載頁面，可配置渲染，以及其他許多功能。它使用 [Vite](https://vitejs.dev/) 和 [Svelte 插件](https://github.com/sveltejs/vite-plugin-svelte) 來實現 [熱模塊替換 (HMR)](https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/config.md#hot)，可以立即反映代碼的更改，提供閃電般快速和功能豐富的開發體驗。';

  let query = '';
  let asking = false;
  let error: any;

  async function on_submit() {
    if (!query || asking) return;
    asking = true;
    try {
      answer = await query_documentation(query);
    } catch (err) {
      console.error(err);
      error = err;
    }
    asking = false;
  }
</script>

<SeoMetaTags title="Svelte Semantic Search" />

<main class="h-100vh bg-#242424 text-white/87 flex flex-col text-center p-3">
  <div class="w-800px max-w-full mx-auto mt-5 md:mt-20">
    <h1 class="text-4xl mb-5"><span class="i-carbon-search mb-1" /> Svelte Search</h1>

    <form on:submit={on_submit}>
      <input
        type="search"
        required
        bind:value={query}
        placeholder="Ask me anything about Svelte..."
        class="w-full p-3 rounded text-black placeholder:text-gray-500"
      />
    </form>

    <div class="mt-5" />

    <div>{asking ? '在問...' : ''}</div>

    <div class="text-left tw-prose bg-white p-3 rounded max-w-full">
      <h3>Answer:</h3>
      <SvelteMarkdown source={answer} />
    </div>

    {#if error}
      <div style="color: red;"><pre>{error}</pre></div>
    {/if}
  </div>
</main>
