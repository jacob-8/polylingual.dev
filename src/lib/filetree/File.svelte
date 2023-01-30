<script lang="ts">
  import type { FileStub } from '$lib/types/index.js';
  import * as context from './context';
  import Item from './Item.svelte';
  export let file: FileStub;

  const { selected, endstate, select, rename, remove, readonly } = context.get();

  $: can_remove = !$readonly && !$endstate[file.name];
</script>

<div
  class="flex pl-[calc((var(--depth)*.6rem)+1rem)] !bg-opacity-30 hover:bg-gray-500/15"
  class:!bg-gray-500={file === $selected}
>
  <Item
    {can_remove}
    name={file.basename}
    isSelected={file === $selected}
    on:click={() => select(file)}
    on:rename={({ detail }) => rename(file, detail)}
    on:remove={() => remove(file)}
  />
</div>
