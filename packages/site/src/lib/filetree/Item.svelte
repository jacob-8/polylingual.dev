<script lang="ts">
  // import { createEventDispatcher } from 'svelte';
  import FileIcons from './FileIcons.svelte';

  export let name = '';
  // export let can_remove = false;
  export let isDirectory = false;
  export let expanded = false;
  export let isSelected = false;

  // const dispatch = createEventDispatcher<{ rename: string; remove: boolean }>();

  // function rename() {
  //   const newName = prompt('Rename: ', name);
  //   if (newName && newName !== name) {
  //     dispatch('rename', newName);
  //   }
  // }
</script>

<button
  class="overflow-hidden w-full text-left bg-opacity-40 pb-2px"
  class:text-white={isSelected}
  style="white-space: nowrap;"
  on:click
  on:dblclick={() => {
    // if (can_remove) rename();
  }}
>
  {#if isDirectory}
    {#if expanded}
      <span class="i-material-symbols-folder-open" />
    {:else}
      <span class="i-material-symbols-folder" />
    {/if}
  {:else}
    <FileIcons basename={name} />
  {/if}
  {name}
</button>

<slot name="buttons" />

<!-- {#if can_remove}
  <button class="px-1 hover:bg-gray-500/25" aria-label="Rename" on:click={rename}
    ><span class="i-codicon-edit" /></button
  >
  <button class="px-1 hover:bg-gray-500/25" aria-label="Delete" on:click={() => dispatch('remove')}
    ><span class="i-codicon-trash" /></button
  >
{/if} -->

<div class="w-2" />
