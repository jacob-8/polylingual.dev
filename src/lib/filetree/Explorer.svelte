<script lang="ts">
  import type { Writable } from 'svelte/store';
  import Folder from './Folder.svelte';
  import { placeFilesIntoDirectories, zoomIntoScope } from './placeFilesIntoDirectories';

  export let directoryPath: string;
  export let files: Record<string, string>;
  export let selected: Writable<string>;

  $: rootDirectory = placeFilesIntoDirectories(files);
  $: directory = zoomIntoScope(rootDirectory, directoryPath);
  $: name = directoryPath.split('/').pop() || 'project';
</script>

<div
  class="grow bg-[#1e1e1e] overflow-y-auto overflow-x-hidden py-2 text-white/70 text-sm"
  style="--scrollbar-border-color: #1e1e1e;"
>
  <Folder {directory} depth={0} {name} {directoryPath} {selected} expanded />
</div>
