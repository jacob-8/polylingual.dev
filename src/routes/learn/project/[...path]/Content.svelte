<script lang="ts">
  import type { Stage } from '$lib/types';
  import Markdown from '$lib/markdown/Markdown.svelte';
  export let stage: Stage;

  function encourage_not_to_copy(e: ClipboardEvent) {
    const namespace = 'polylingual.dev/learn';
    const copy_enabled = `${namespace}:copy_enabled`;

    if (sessionStorage[copy_enabled]) return;

    let node = e.target as HTMLElement;

    while (node && node !== e.currentTarget) {
      if (node.nodeName === 'TEXTAREA') {
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
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="tw-prose max-w-full" on:copy={encourage_not_to_copy}>
  <Markdown markdown={stage.markdown_with_steps || ''} />
</div>
