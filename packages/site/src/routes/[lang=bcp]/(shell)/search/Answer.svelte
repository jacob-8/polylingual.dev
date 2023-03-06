<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown';
  import PrismCode from './PrismCode.svelte';
  export let answer: string;
</script>

<div class="text-left tw-prose bg-white p-3 rounded max-w-full">
  <SvelteMarkdown source={answer} renderers={{ code: PrismCode }} />
</div>
