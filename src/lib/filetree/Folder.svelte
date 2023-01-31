<script lang="ts">
  import type { Directory } from '$lib/types';
  import type { Writable } from 'svelte/store';
  import Item from './Item.svelte';
  import File from './File.svelte';
  export let directory: Directory;
  export let depth: number;
  export let name: string;
  export let expanded: boolean;
  export let selected: Writable<string>;
  export let directoryPath: string;

  $: openFolderOfSelected($selected);
  function openFolderOfSelected(selected: string) {
    if (selected.startsWith(directoryPath)) {
      expanded = true;
    }
  }

  // $: can_remove = directory.name ? !$endstate[directory.name] : false;

  // function add_file() {
  //   const name = prompt('File name?');
  //   if (name) add(prefix + name, 'file');
  // }
</script>

<div
  class="flex hover:bg-gray-500/25 pl-[calc((var(--depth)*.6rem)+1rem)]"
  style="--depth: {depth};"
>
  <Item {name} {expanded} isDirectory on:click={() => (expanded = !expanded)}>
    <!-- <svelte:fragment slot="buttons">
      {#if can_create.file}
        <button class="px-1 hover:bg-gray-500/25" aria-label="New File" on:click={add_file}
          ><span class="i-codicon-new-file" /></button
        >
      {/if}
    </svelte:fragment> -->
  </Item>
</div>

{#if expanded}
  <ul style="--depth: {depth + 1}">
    {#each Object.entries(directory.directories) as [name, subdirectory]}
      <li>
        <svelte:self
          directory={subdirectory}
          depth={depth + 1}
          directoryPath={`${directoryPath}/${name}`}
          {name}
          {selected}
        />
      </li>
    {/each}
    {#each directory.filenames as name}
      <li>
        <File {name} {directoryPath} {selected} />
      </li>
    {/each}
  </ul>
{/if}
