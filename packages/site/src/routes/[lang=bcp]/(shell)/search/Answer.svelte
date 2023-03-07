<script lang="ts">
  import { page } from '$app/stores';
  import SvelteMarkdown from 'svelte-markdown';
  import PrismCode from './PrismCode.svelte';
  export let answer: string;
  export let asking = false;
  $: answer_plus_line = answer + '\n'; // allows code blocks in progress of being written to be highlighted - this avoids the annoying flash back and forth between highlighting and not highlighting while the answer is streaming in.
</script>

<div class:streaming={asking} class="text-left tw-prose bg-white p-3 rounded max-w-full">
  {#if !answer}
    <p />
    <!-- needed for blinking cursor while answer is still coming -->
  {:else if answer === '1234'}
    {$page.data.lang === 'zh-TW'
      ? '抱歉，我不知道如何回答這個問題。'
      : `Sorry, I don't know how to help with that.`}
  {:else}
    <SvelteMarkdown source={answer_plus_line} renderers={{ code: PrismCode }} />
  {/if}
</div>

{#if !asking}
  <button type="button" class="text-xs mt-2" on:click={() => navigator.clipboard.writeText(answer)}>
    Copy Raw Answer
  </button>
{/if}

<style>
  @-webkit-keyframes blink {
    to {
      visibility: hidden;
    }
  }

  @keyframes blink {
    to {
      visibility: hidden;
    }
  }

  :global(.streaming p:last-child:after) {
    -webkit-animation: blink 1s steps(5, start) infinite;
    animation: blink 1s steps(5, start) infinite;
    content: '▋';
    margin-left: 0.25rem;
    vertical-align: baseline;
  }

  :global(.tw-prose p) {
    font-size: 110%;
  }
</style>
