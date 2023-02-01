<script lang="ts">
  import { focus_file } from './focus_file';
  export let raw: string;
  
  const POSSIBLE_FILE_EXTENSIONS = [
    'svelte',
    'ts',
    'js',
    'css',
    'json',
    'html',
    'md',
    'png',
    'svg',
    'jpg',
    'jpeg',
  ];

  $: text = raw.replace(/`/g, '');
  $: ext = text.split('.').pop() as string;
  $: is_file = POSSIBLE_FILE_EXTENSIONS.includes(ext);
</script>

{#if is_file}
  <code class="cursor-pointer hover:bg-gray-500/25" on:click={() => focus_file(text)}>{text}</code>
{:else}
  <code>{text}</code>
{/if}
