<script lang="ts">
  import type { Writable } from 'svelte/store';
  import { afterNavigate } from '$app/navigation';
  import type { StageFiles } from '$lib/types';
  import Folder from './Folder.svelte';
  import { placeFilesIntoDirectories, zoomIntoScope } from './placeFilesIntoDirectories';
  import { page } from '$app/stores';

  export let directoryPath: string;
  export let files: Writable<StageFiles>;
  export let selected: Writable<string>;
  export let can_add_paths: string[];

  $: rootDirectory = placeFilesIntoDirectories($files);
  $: directory = zoomIntoScope(rootDirectory, directoryPath);
  $: name = directoryPath.split('/').pop() || 'project';

  function add_if_allowed_and_focus(pathname: string, { instruct } = { instruct: true }): boolean {
    if (can_add_paths.includes(pathname)) {
      $files = { ...$files, [pathname]: '\n' };
      $selected = pathname;
      return true;
    } else if (instruct) {
      const options = can_add_paths.map((path) => path.split('/').pop()).join(', ');
      alert(
        $page.data.lang === 'zh-TW'
          ? `不需要添加 ${pathname} 。${options} 是你的選擇。`
          : `${pathname} does not need to be added. ${options} are your options.`
      );
    }
    return false;
  }

  afterNavigate((navigation) => {
    const file_to_focus = navigation.to?.url?.searchParams.get('focus');
    if (file_to_focus) {
      const focusSuccess = focus(file_to_focus);
      if (focusSuccess) {
        const content = navigation.to?.url?.searchParams.get('edit');
        if (typeof content === 'string') edit(content);
      }
    }
  });

  function focus(file_to_focus: string): string | false {
    // check for exact match
    if ($files[file_to_focus]) return ($selected = file_to_focus);

    // check for first partial match
    for (const file in $files) {
      if (file.endsWith(file_to_focus)) return ($selected = file);
    }

    // try to add exact match
    if (!$files[file_to_focus]) {
      const added = add_if_allowed_and_focus(file_to_focus, { instruct: false });
      if (added) return file_to_focus;
    }

    // add first partial match
    for (const path of can_add_paths) {
      if (path.endsWith(file_to_focus)) {
        const added = add_if_allowed_and_focus(path, { instruct: false });
        if (added) return file_to_focus;
      }
    }
    return false;
  }

  function edit(content: string) {
    $files = { ...$files, [$selected]: content };
  }
</script>

<div
  class="grow bg-[#1e1e1e] overflow-y-auto overflow-x-hidden py-2 text-white/70 text-sm"
  style="--scrollbar-border-color: #1e1e1e;"
>
  <Folder
    on:add={({ detail }) => add_if_allowed_and_focus(detail)}
    {can_add_paths}
    {directory}
    depth={0}
    {name}
    {directoryPath}
    {selected}
    expanded
  />
</div>
