<script lang="ts">
  import SeoMetaTags from '$lib/SeoMetaTags.svelte';
  import { user } from '$lib/user';
  // import type { ChatCompletionRequestMessage } from 'openai';
  import { SSE } from 'sse.js';
  import { authState } from 'sveltefirets';
  import { samples } from './sample-q-a';
  import { page } from '$app/stores';
  import Answer from './Answer.svelte';

  let answer = '';
  answer = samples[1].a;
  let query = '';
  let asking = false;
  // let chatMessages: ChatCompletionRequestMessage[] = [];
  let error: any;
  // let scrollToDiv: HTMLDivElement;

  // function scroll_to_bottom() {
  //   setTimeout(function () {
  //     scrollToDiv.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  //   }, 100);
  // }

  async function on_submit() {
    if (!query || asking) return;
    if (!$user) {
      alert('請先登入！'); // TODO: don't let search if not authenticated
      return;
    }

    asking = true;
    answer = '';
    error = null;

    const auth_token = await $authState.getIdToken();
    const eventSource = new SSE('/api/query', {
      headers: {
        'Content-Type': 'application/json',
      },
      payload: JSON.stringify({ query, auth_token }),
    });
    eventSource.addEventListener('error', handleError);
    eventSource.addEventListener('message', handle_message);
    eventSource.stream();
    // query = ''
    // scroll_to_bottom();
  }

  function handle_message(e: MessageEvent) {
    // scroll_to_bottom();
    try {
      if (e.data === '[DONE]') {
        asking = false;
        // chatMessages = [...chatMessages, { role: 'assistant', content: answer }];
        // answer = '';
        return;
      }

      const completionResponse = JSON.parse(e.data);
      const [{ delta }] = completionResponse.choices;

      if (delta.content) {
        answer += delta.content;
      }
    } catch (err) {
      handleError(err);
    }
  }

  function handleError<T>(err: T) {
    asking = false;
    query = '';
    answer = '';
    error = err;
    console.error(err);
  }
</script>

<SeoMetaTags
  title="Ask Svelte"
  description="Semantic Search of Svelte Documentation using AI"
  keywords="multilingual, polylingual, ai, openai, learn, Svelte, SvelteKit"
/>

<div class="w-800px max-w-full mx-auto mt-5 md:mt-20">
  <h1 class="text-4xl mb-5">
    <span class="i-carbon-search mb-1" />
    {$page.data.lang === 'zh-TW' ? '問' : 'Ask'} Svelte
  </h1>

  <form on:submit={on_submit}>
    <div class="relative">
      <input
        type="search"
        required
        bind:value={query}
        placeholder="{$page.data.lang === 'zh-TW'
          ? '問關於 Svelte 的任何問題'
          : 'Ask me anything about Svelte'}..."
        class="w-full p-3 rounded text-black placeholder:text-gray-500"
      />
      {#if asking}
        <span class="i-svg-spinners-3-dots-fade absolute top-3.5 right-10 text-black text-2xl" />
      {/if}
    </div>
  </form>

  <div class="mt-5" />

  {#if answer}
    <Answer {answer} />
  {/if}

  {#if error}
    <div style="color: red;"><pre>{JSON.stringify(error, null, 2)}</pre></div>
  {/if}
</div>
