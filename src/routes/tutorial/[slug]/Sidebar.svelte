<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import Menu from './Menu.svelte';
  import Content from './Content.svelte';
  import type { Exercise, PartStub } from '$lib/types';

  export let tree: PartStub[];
  export let exercise: Exercise;

  let sidebar: HTMLElement;

  afterNavigate(async () => {
    sidebar.scrollTop = 0;
  });
</script>

<Menu {tree} current={exercise} />

<div class="overflow-y-auto grow flex flex-col">
  <main bind:this={sidebar} class="p-3">
    <Content {exercise} on:selected />

    {#if exercise.next}
      <div class="my-4">
        <a
          class="text-blue-700 text-sm font-semibold hover:underline"
          href="/tutorial/{exercise.next.slug}"
          >{exercise.next.title} <span class="i-carbon-arrow-right" /></a
        >
      </div>
    {/if}
  </main>
  <footer class="border-t p-3 mt-auto">
    <a
      target="_blank"
      class="hover:underline"
      rel="noreferrer"
      href="https://github.com/jacob-8/learn.polylingual.dev/tree/main/{exercise.dir}"
    >
      <span class="i-codicon-edit" />
      Edit this page
    </a>
  </footer>
</div>
