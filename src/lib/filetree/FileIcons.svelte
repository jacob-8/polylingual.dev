<script lang="ts">
  export let basename = '';
  $: ext = basename.split('.').pop();
</script>

{#if ext === 'svelte'}
  <span class="i-vscode-icons-file-type-svelte" />
{:else if basename === 'package.json'}
  <span class="i-vscode-icons-file-type-npm" />
{:else if basename === 'vite.config.js'}
  <span class="i-vscode-icons-file-type-vite" />
{:else if ext === 'js'}
  <span class="i-vscode-icons-file-type-js" />
{:else if ext === 'ts'}
  <span class="i-vscode-icons-file-type-typescript" />
{:else if ext === 'html'}
  <span class="i-vscode-icons-file-type-html" />
{:else if ext === 'png'}
  <span class="i-vscode-icons-file-type-image" />
{/if}
