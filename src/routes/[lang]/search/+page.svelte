<script lang="ts">
  import SeoMetaTags from '$lib/SeoMetaTags.svelte';
  import SvelteMarkdown from 'svelte-markdown';
  import { query_documentation } from './query_documentation';

  let answer: string;
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
    <h1 class="text-4xl mb-5"><span class="i-carbon-search mb-1" /> Ask Svelte</h1>

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

    {#if answer}
      <div class="text-left tw-prose bg-white p-3 rounded max-w-full">
        <h3>Answer:</h3>
        <SvelteMarkdown source={answer} />
        {answer}
      </div>
    {/if}

    {#if error}
      <div style="color: red;"><pre>{error}</pre></div>
    {/if}
  </div>
</main>
