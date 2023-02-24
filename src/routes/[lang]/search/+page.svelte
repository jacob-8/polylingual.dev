<script lang="ts">
  import SeoMetaTags from '$lib/SeoMetaTags.svelte';
  import type { PageData } from './$types';
  import { get_embedding } from './get_embedding';

  export let data: PageData;

  let query = '';
  let asking = false;
  let error: any;
  let embedding: any = null;

  async function on_submit() {
    if (!query || asking) return;
    asking = true;
    try {
      embedding = await get_embedding(query);
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

    <div><pre>{JSON.stringify(embedding, null, 2)}</pre></div>

    {#if error}
      <div style="color: red;"><pre>{error}</pre></div>
    {/if}
  </div>
</main>
