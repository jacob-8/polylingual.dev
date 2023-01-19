<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import Menu from './Menu.svelte';
  import type { Exercise, FileStub, PartStub } from '$lib/types';

  export let tree: PartStub[];
  export let exercise: Exercise;

  const dispatch = createEventDispatcher<{ selected: { file: FileStub } }>();

  const namespace = 'learn.polylingual.dev';
  const copy_enabled = `${namespace}:copy_enabled`;

  let sidebar: HTMLElement;

  afterNavigate(async () => {
    sidebar.scrollTop = 0;
  });

  function encourage_not_to_copy(e: ClipboardEvent) {
    if (sessionStorage[copy_enabled]) return;

    let node = e.target as HTMLElement;

    while (node && node !== e.currentTarget) {
      if (node.nodeName === 'PRE') {
        const enable_copy = confirm(
          'Copy and paste is disabled We recommend typing the code into the editor to complete the exercise, as this results in better learning. Do you want to enable copy-and-paste for the duration of this session?'
        );
        if (enable_copy) sessionStorage[copy_enabled] = enable_copy;

        e.preventDefault();
        return;
      }

      node = node.parentNode as HTMLElement;
    }
  }

  function respond_to_file_name_clicked(e: MouseEvent) {
    const node = e.target as HTMLElement;

    if (node.nodeName === 'CODE') {
      const { file: filename } = node.dataset;
      if (filename) {
        const file = exercise.a[filename];
        if (file.type === 'file') dispatch('selected', { file });
      }
    }
  }
</script>

<Menu {tree} current={exercise} />

<div class="overflow-y-auto grow flex flex-col">
  <main bind:this={sidebar} class="p-3" on:copy={encourage_not_to_copy}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={respond_to_file_name_clicked}>
      {@html exercise.html}
    </div>

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

<style>
  :global(pre) {
    overflow-x: auto;
  }
  /* .text :global(pre) :global(.highlight) {
    --color: rgba(220, 220, 0, 0.2);
    background: var(--color);
    outline: 2px solid var(--color);
    border-radius: 2px;
  }

  .text :global(pre) :global(.highlight.add) {
    --color: rgba(0, 255, 0, 0.1);
  }

  .text :global(pre) :global(.highlight.remove) {
    --color: rgba(255, 0, 0, 0.1);
  } */
</style>
