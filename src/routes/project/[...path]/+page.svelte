<script lang="ts">
  import { browser } from '$app/environment';
  import type { PageData } from './$types';
  import { parseTree } from '$lib/content/parse-tree';
  import { updatedProjectsDirectory } from '$lib/content/hmrUpdatedContent';
  import { prepareLessonStages } from '$lib/content/prepare-lesson-stages';
  import SplitPane from 'svelte-pieces/ui/SplitPane.svelte';
  import Header from './Header.svelte';
  import Sidebar from './Sidebar.svelte';
  import Practice from './Practice.svelte';

  export let data: PageData;
  $: projectsDirectory = $updatedProjectsDirectory || data.projectsDirectory;
  $: projects = parseTree(projectsDirectory);
  $: lesson = prepareLessonStages({ projects, project: data.project, lesson: data.lesson });
  $: stage = lesson.stages[data.stage];

  let width = browser ? window.innerWidth : 1000;
  $: mobile = width < 768;
  let mobile_view: 'tutorial' | 'editor' | 'preview' = 'editor';
</script>

<svelte:window bind:innerWidth={width} />

<div class="flex h-full flex-col">
  {#if mobile}
    <Header>
      <button
        class="text-xs py-1 px-2 rounded"
        class:bg-gray-300={mobile_view === 'tutorial'}
        type="button"
        on:click={() => (mobile_view = 'tutorial')}>Tutorial</button
      >
      <button
        class="text-xs py-1 px-2 rounded"
        class:bg-gray-300={mobile_view === 'editor'}
        type="button"
        on:click={() => (mobile_view = 'editor')}>Editor</button
      >
      <button
        class="text-xs py-1 px-2 rounded"
        class:bg-gray-300={mobile_view === 'preview'}
        type="button"
        on:click={() => (mobile_view = 'preview')}>Preview</button
      >
    </Header>
  {/if}
  <div class="h-[200px] grow">
    <SplitPane pos={mobile ? (mobile_view === 'tutorial' ? 100 : 0) : 33} min={0}>
      <section class="h-full border-r flex flex-col" slot="a">
        {#if !mobile}<Header />{/if}
        <Sidebar {projects} {stage} />
        <!-- on:selected={({ detail }) => console.log(`selected filename: ${detail}`)} -->
      </section>
      <section class="h-full" slot="b">
        <Practice {stage} {mobile} {mobile_view} />
      </section>
    </SplitPane>
  </div>
</div>
