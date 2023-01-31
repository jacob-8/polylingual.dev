<script lang="ts">
  import { DIFF_BORDER } from '$lib/content/add-steps-to-markdown';
  import MonacoDiffEditor from '$lib/monaco/MonacoDiffEditor.svelte';
  export let lang: string;
  export let text: string;
</script>

{#if lang === 'diff' && text.includes(DIFF_BORDER)}
  {@const [original, modified] = text.split(DIFF_BORDER)}
  <div class="h-200px">
    <MonacoDiffEditor
      original={original.trim()}
      modified={modified.trim()}
      options={{ renderSideBySide: true }}
    />
  </div>
{:else}
  <pre class={lang}><code>{text}</code></pre>
{/if}
