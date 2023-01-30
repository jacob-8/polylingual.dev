<script lang="ts">
  import type { Writable } from 'svelte/store';
  import Folder from './Folder.svelte';
  import { placeFilesIntoDirectories, zoomIntoScope } from './placeFilesIntoDirectories';

  export let directory: string;
  export let files: Record<string, string>;
  export let selected: Writable<string>;

  $: tree = placeFilesIntoDirectories(files);
  $: zoomedTree = zoomIntoScope(tree, directory);
  $: name = directory.split('/').pop() || 'project';
</script>

<div
  class="grow bg-[#1e1e1e] overflow-y-auto overflow-x-hidden py-2 text-white/70 text-sm"
  style="--scrollbar-border-color: #1e1e1e;"
>
  <Folder tree={zoomedTree} depth={0} {name} {directory} {selected} expanded />
</div>
