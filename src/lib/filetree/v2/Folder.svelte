<script lang="ts">
  import type { Tree } from '$lib/types';
  import type { Writable } from 'svelte/store';
  import Item from '../Item.svelte';
  import File from './File.svelte';
  export let tree: Tree;
  export let depth: number;
  export let name: string;
  export let expanded: boolean;
  export let selected: Writable<string>;
  export let directory: string;

  $: child_directories = Object.entries(tree).filter(([name, child]) => typeof child !== 'string');
  $: child_files = Object.entries(tree).filter(([name, child]) => typeof child === 'string');

  $: openFolderOfSelected($selected);
  function openFolderOfSelected(selected: string) {
    if (selected.startsWith(directory)) {
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
    {#each child_directories as [child_name, child_tree]}
      <li>
        <svelte:self
          tree={child_tree}
          depth={depth + 1}
          directory={`${directory}/${child_name}`}
          name={child_name}
          {selected}
        />
      </li>
    {/each}
    {#each child_files as [child_name]}
      <li>
        <File name={child_name} {directory} {selected} />
      </li>
    {/each}
  </ul>
{/if}
