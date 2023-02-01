<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown';
  import Code from './renderers/Code.svelte';
  import Blockquote from './renderers/Blockquote.svelte';
  import Codespan from './renderers/Codespan.svelte';

  export let markdown: string;
</script>

<SvelteMarkdown
  source={markdown}
  renderers={{ code: Code, codespan: Codespan, blockquote: Blockquote }}
/>
