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
    // TODO ideally we would associate scroll state with
    // history. That's a little tricky to do right now,
    // so for now just always reset sidebar scroll
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

<div bind:this={sidebar} class="text" on:copy={encourage_not_to_copy}>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div on:click={respond_to_file_name_clicked}>
    {@html exercise.html}
  </div>

  {#if exercise.next}
    <p><a href="/tutorial/{exercise.next.slug}">Next: {exercise.next.title}</a></p>
  {/if}
</div>

<footer>
  <a
    target="_blank"
    rel="noreferrer"
    class="edit"
    href="https://github.com/jacob-8/learn.polylingual.dev/tree/main/{exercise.dir}"
  >
    Edit this page
  </a>
</footer>

<style>
  .text {
    flex: 1 1;
    overflow-y: auto;
    padding: 2.2rem 3rem;
    border-right: 1px solid var(--sk-back-4);
    background: var(--sk-back-3);
  }

  .text :global(pre) {
    background: var(--sk-back-1);
    box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.1);
    border-radius: var(--sk-border-radius);
  }

  .text :global(pre) :global(.highlight) {
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
  }

  footer {
    padding: 1rem 3rem;
    display: flex;
    justify-content: space-between;
    background: var(--sk-back-3);
    border-top: 1px solid var(--sk-back-4);
    border-right: 1px solid var(--sk-back-4);
  }

  footer .edit {
    color: var(--sk-text-2);
    font-size: 1.4rem;
    padding: 0 0 0 1.4em;
    /* TODO: background: url($lib/icons/file-edit.svg) no-repeat 0 calc(50% - 0.1em); */
    background-size: 1em 1em;
  }
</style>
