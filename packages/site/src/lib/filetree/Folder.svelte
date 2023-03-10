<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Writable } from 'svelte/store';
  import type { Directory } from '$lib/types';
  import Item from './Item.svelte';
  import File from './File.svelte';
  import { directoryPathIncludesAddableFilepath } from './canAdd';
  import { page } from '$app/stores';

  export let directory: Directory;
  export let depth: number;
  export let name: string;
  export let expanded: boolean;
  export let selected: Writable<string>;
  export let directoryPath: string;
  export let can_add_paths: string[];

  $: openFolderOfSelected($selected);
  function openFolderOfSelected(selected: string) {
    const directory_path_without_leading_slash = directoryPath.replace(/^\//, ''); // when "directory_to_show": "", the directoryPath will be the root and having a leading slash causes problems - may need to switch to always starting with a leading slash to avoid problems like this
    if (selected.startsWith(directory_path_without_leading_slash)) {
      expanded = true;
    }
  }

  $: can_add = directoryPathIncludesAddableFilepath(directoryPath, can_add_paths);

  const dispatch = createEventDispatcher<{ add: string }>();

  function add_file() {
    const name = prompt($page.data.lang === 'zh-TW' ? '文件名？' : 'File name?');
    if (name) dispatch('add', `${directoryPath}/${name}`);
  }
</script>

<div
  class="flex hover:bg-gray-500/25 pl-[calc((var(--depth)*.6rem)+1rem)]"
  style="--depth: {depth};"
>
  <Item {name} {expanded} isDirectory on:click={() => (expanded = !expanded)}>
    <svelte:fragment slot="buttons">
      {#if can_add}
        <button class="px-1 hover:bg-gray-500/25" aria-label="New File" on:click={add_file}
          ><span class="i-codicon-new-file" /></button
        >
      {/if}
    </svelte:fragment>
  </Item>
</div>

{#if expanded}
  <ul style="--depth: {depth + 1}">
    {#each Object.entries(directory.directories) as [name, subdirectory]}
      <li>
        <svelte:self
          on:add
          {can_add_paths}
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
