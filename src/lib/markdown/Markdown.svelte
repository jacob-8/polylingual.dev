<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown';
  import CodeBlock from './renderers/CodeBlock.svelte';
  import Blockquote from './renderers/Blockquote.svelte';
  
  export let markdown: string;
</script>

<SvelteMarkdown source={markdown} renderers={{ code: CodeBlock, blockquote: Blockquote }} />
