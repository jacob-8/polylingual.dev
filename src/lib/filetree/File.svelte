<script lang="ts">
  import type { Writable } from 'svelte/store';
  import Item from './Item.svelte';

  export let selected: Writable<string>;
  export let directoryPath: string;
  export let name: string;
  $: path = directoryPath + '/' + name;
  $: path_without_leading_slash = path.replace(/^\//, ''); // when "directory_to_show": "", the directoryPath will be the root and having a leading slash causes problems - may need to switch to always starting with a leading slash to avoid problems like this
  $: isSelected = $selected === path_without_leading_slash;
</script>

<div
  class="flex pl-[calc((var(--depth)*.6rem)+1rem)] !bg-opacity-30 hover:bg-gray-500/15"
  class:!bg-gray-500={isSelected}
>
  <Item on:click={() => $selected = path_without_leading_slash} {name} {isSelected} />
</div>
