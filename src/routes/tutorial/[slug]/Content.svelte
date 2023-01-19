<script lang="ts">
  import type { Exercise, FileStub } from '$lib/types';
  import { createEventDispatcher } from 'svelte';
  
  export let exercise: Exercise;
  const dispatch = createEventDispatcher<{ selected: { file: FileStub } }>();

  function encourage_not_to_copy(e: ClipboardEvent) {
    const namespace = 'learn.polylingual.dev';
    const copy_enabled = `${namespace}:copy_enabled`;

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

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="tw-prose" on:click={respond_to_file_name_clicked} on:copy={encourage_not_to_copy}>
  {@html exercise.html}
</div>
