<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import Menu from './Menu.svelte';
  import Content from './Content.svelte';
  import type { Stage, Project } from '$lib/types';

  export let projects: Record<string, Project>;
  export let stage: Stage;

  let sidebar: HTMLElement;

  afterNavigate(async () => {
    sidebar.scrollTop = 0;
  });
</script>

<Menu {projects} {stage} />

<div class="overflow-y-auto grow flex flex-col">
  <main bind:this={sidebar} class="p-3">
    <Content {stage} on:selected />

    {#if stage.next_stage_location}
      <div class="my-4">
        <a
          class="text-blue-700 text-sm font-semibold hover:underline"
          href="/project/{stage.next_stage_location.project}/{stage.next_stage_location.lesson}/{stage.next_stage_location.name}"
          >{stage.next_stage_location.name} <span class="i-carbon-arrow-right" /></a
        >
      </div>
    {/if}
  </main>
  <footer class="border-t p-3 mt-auto">
    <a
      target="_blank"
      class="hover:underline"
      rel="noreferrer"
      href="https://github.com/jacob-8/learn.polylingual.dev/tree/main{stage.directory}"
    >
      <span class="i-codicon-edit" />
      Edit this page
    </a>
  </footer>
</div>
