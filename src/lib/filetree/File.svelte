<script lang="ts">
  import type { Writable } from 'svelte/store';
  import Item from './Item.svelte';

  export let selected: Writable<string>;
  export let directory: string;
  export let name: string;
  $: path = directory + '/' + name;
  $: isSelected = $selected === path;
</script>

<div
  class="flex pl-[calc((var(--depth)*.6rem)+1rem)] !bg-opacity-30 hover:bg-gray-500/15"
  class:!bg-gray-500={isSelected}
>
  <Item on:click={() => $selected = path} {name} {isSelected} />
</div>
