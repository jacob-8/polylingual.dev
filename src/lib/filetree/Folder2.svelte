<script lang="ts">
  import File from './File.svelte';
  import * as context from './context';
  import Item from './Item.svelte';
  import type { DirectoryStub, FileStub, Stub } from '$lib/types';

  function get_depth(name: string) {
    return name.split('/').length - 1;
  }

  export let expanded = true;
  export let directory: DirectoryStub;
  export let prefix: string;
  export let depth: number;
  export let files: Stub[];

  const { endstate, files: all_files, rename, add, remove, readonly, scope } = context.get();

  $: children = files
    .filter((file) => file.name.startsWith(prefix))
    .sort((a, b) => (a.name < b.name ? -1 : 1));

  $: child_directories = children.filter(
    (child) => get_depth(child.name) === depth + 1 && child.type === 'directory'
  );

  $: child_files = children.filter(
    (child) => get_depth(child.name) === depth + 1 && child.type === 'file'
  ) as FileStub[];

  const can_create = { file: false, directory: false };

  $: {
    can_create.file = false;
    can_create.directory = false;

    if (!$readonly) {
      const child_prefixes = [];

      for (const stub of $all_files) {
        if (
          stub.type === 'directory' &&
          stub.name.startsWith(prefix) &&
          get_depth(stub.name) === depth + 1
        ) {
          child_prefixes.push(stub.name + '/');
        }
      }

      for (const stub of Object.values($endstate)) {
        if (!stub.name.startsWith(prefix)) continue;

        // if already exists in $files, bail
        if ($all_files.find((s) => s.name === stub.name)) continue;

        // if intermediate directory exists, bail
        if (child_prefixes.some((prefix) => stub.name.startsWith(prefix))) continue;

        can_create[stub.type] = true;
      }
    }
  }

  // fake root directory has no name
  $: can_remove = !$readonly && directory.name ? !$endstate[directory.name] : false;

  function add_file() {
    const name = prompt('File name?');
    if (name) add(prefix + name, 'file');
  }
  function add_folder() {
    const name = prompt('Folder name?');
    if (name) add(prefix + name, 'directory');
  }
</script>

<div
  class="flex hover:bg-gray-500/25 pl-[calc((var(--depth)*.6rem)+1rem)]"
  style="--depth: {depth - $scope.depth};"
>
  <Item
    isDirectory
    {can_remove}
    basename={directory.basename}
    {expanded}
    on:click={() => (expanded = !expanded)}
    on:rename={({ detail }) => rename(directory, detail)}
    on:remove={() => remove(directory)}
  >
    <svelte:fragment slot="buttons">
      {#if can_create.file}
        <button class="px-1 hover:bg-gray-500/25" aria-label="New File" on:click={add_file}><span class="i-codicon-new-file" /></button>
      {/if}
      {#if can_create.directory}
        <button class="px-1 hover:bg-gray-500/25" aria-label="New Folder" on:click={add_folder}><span class="i-codicon-new-folder" /></button>
      {/if}
    </svelte:fragment>
  </Item>
</div>

{#if expanded}
  <ul style="--depth: {depth - $scope.depth + 1}">
    {#each child_directories as directory}
      <li>
        <svelte:self {directory} prefix={directory.name + '/'} depth={depth + 1} files={children} />
      </li>
    {/each}

    {#each child_files as file}
      <li><File {file} /></li>
    {/each}
  </ul>
{/if}
