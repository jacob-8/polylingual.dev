<script lang="ts">
  import type { StageFiles } from '$lib/types';
  import type { Writable } from 'svelte/store';
  import Folder from './Folder.svelte';
  import { placeFilesIntoDirectories, zoomIntoScope } from './placeFilesIntoDirectories';

  export let directoryPath: string;
  export let files: Writable<StageFiles>;
  export let selected: Writable<string>;
  export let can_add_paths: string[];

  $: rootDirectory = placeFilesIntoDirectories($files);
  $: directory = zoomIntoScope(rootDirectory, directoryPath);
  $: name = directoryPath.split('/').pop() || 'project';

  function add_if_allowed(pathname: string) {
    console.log({pathname})
    if (can_add_paths.includes(pathname)) {
      $files = { ...$files, [pathname]: '' };
      $selected = pathname;
      console.log({files: $files})
    } else {
      alert(`${pathname} does not need to be added.`);
    }
  }
</script>

<div
  class="grow bg-[#1e1e1e] overflow-y-auto overflow-x-hidden py-2 text-white/70 text-sm"
  style="--scrollbar-border-color: #1e1e1e;"
>
  <Folder
    on:add={({ detail }) => add_if_allowed(detail)}
    {can_add_paths}
    {directory}
    depth={0}
    {name}
    {directoryPath}
    {selected}
    expanded
  />
</div>
