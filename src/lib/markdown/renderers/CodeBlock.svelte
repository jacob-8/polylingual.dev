<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { DIFF_BORDER } from '$lib/content/add-steps-to-markdown';
  import MonacoDiffEditor from '$lib/monaco/MonacoDiffEditor.svelte';
  export let lang: string;
  export let text: string;

  $: meta = lang;
  $: language = meta.split(' ')[0];
  $: options = meta.split(' ').slice(1).join(' ');
  $: [, file, extension] = options.match(/file="(.+?)\.(.+?)"/) as [unknown, string, string];

  function focus_file() {
    const encodedFilepath = encodeURIComponent(file + '.' + extension);
    goto(`${$page.url.pathname}?focus=${encodedFilepath}`);
  }
</script>

{#if file}
  <button on:click={focus_file} class="text-sm font-semibold mb-1 hover:underline"
    >{file}.{extension}</button
  >
{/if}
{#if language === 'diff' && text.includes(DIFF_BORDER)}
  {@const [original, modified] = text.split(DIFF_BORDER)}
  <div class="max-h-600px -mx-3">
    <MonacoDiffEditor
      {extension}
      original={original.trim()}
      modified={modified.trim()}
      options={{ renderSideBySide: false }}
    />
  </div>
{:else}
  <pre class={lang}><code>{text}</code></pre>
{/if}
