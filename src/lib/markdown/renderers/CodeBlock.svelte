<script lang="ts">
  import { DIFF_BORDER } from '$lib/content/add-steps-to-markdown';
  import MonacoDiffEditor from '$lib/monaco/MonacoDiffEditor.svelte';
  export let lang: string;
  export let text: string;

  $: meta = lang;
  $: language = meta.split(' ')[0];
  $: options = meta.split(' ').slice(1).join(' ');
  $: file = options.match(/file="(.+?)"/)?.[1];
</script>

{#if file}
 <div class="text-sm font-semibold mb-1">{file}</div>
{/if}
{#if language === 'diff' && text.includes(DIFF_BORDER)}
  {@const [original, modified] = text.split(DIFF_BORDER)}
  <div class="h-200px">
    <MonacoDiffEditor
      original={original.trim()}
      modified={modified.trim()}
      options={{ renderSideBySide: false }}
    />
  </div>
{:else}
  <pre class={lang}><code>{text}</code></pre>
{/if}
