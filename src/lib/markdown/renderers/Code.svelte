<script lang="ts">
  import { dev } from '$app/environment';
  import { DIFF_BORDER } from '$lib/content/add-steps-to-markdown';
  import MonacoDiffEditor from '$lib/monaco/MonacoDiffEditor.svelte';
  import MonacoReadonlyEditor from '$lib/monaco/MonacoReadonlyEditor.svelte';
  import { edit_file, focus_file } from './focus_file';
  export let lang: string;
  export let text: string;

  $: meta = lang;
  $: language = meta.split(' ')[0];
  $: options = meta.split(' ').slice(1).join(' ');
  $: [, file, extension] = options.match(/file="(.+?)\.(.+?)"/) as [unknown, string, string];

  $: [original, modified] = text.split(DIFF_BORDER);
</script>

{#if file}
  <div class="flex">
    <button
      on:click={() => focus_file(`${file}.${extension}`)}
      class="text-sm font-semibold mb-1 hover:underline">{file}.{extension}</button
    >

    {#if dev}
      <button
        on:click={() => edit_file(`${file}.${extension}`, original.trim())}
        class="text-sm font-semibold mb-1 hover:underline ml-auto"
      >
        <span class="i-carbon-close" />
      </button>
    {/if}
    <button
      on:click={() => edit_file(`${file}.${extension}`, modified.trim())}
      class="text-sm font-semibold mb-1 hover:underline"
    >
      <span class="i-carbon-arrow-right" />
    </button>
  </div>
{/if}
{#if language === 'diff' && text.includes(DIFF_BORDER)}
  <div class="max-h-600px -mx-3">
    <MonacoDiffEditor
      {extension}
      original={original.trim()}
      modified={modified.trim()}
      options={{ renderSideBySide: false }}
    />
  </div>
{:else}
  <div class="max-h-600px -mx-3">
    <MonacoReadonlyEditor {extension} value={text} />
  </div>
{/if}
