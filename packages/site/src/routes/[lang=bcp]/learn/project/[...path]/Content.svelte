<script lang="ts">
  import type { Stage } from '$lib/types';
  import Markdown from '$lib/markdown/Markdown.svelte';
  import { page } from '$app/stores';
  export let stage: Stage;

  function encourage_not_to_copy(e: ClipboardEvent) {
    const namespace = 'polylingual.dev/learn';
    const copy_enabled = `${namespace}:copy_enabled`;

    if (sessionStorage[copy_enabled]) return;

    let node = e.target as HTMLElement;

    while (node && node !== e.currentTarget) {
      if (node.nodeName === 'TEXTAREA') {
        const enable_copy = confirm(
          $page.data.lang === 'zh-TW'
            ? '複製和粘貼被禁用。 我們建議將代碼鍵入編輯器，因為這樣可以更好地學習。 你要啟用複制和粘貼嗎？'
            : 'Copy and paste is disabled. We recommend typing the code into the editor, as this results in better learning. Do you want to enable copy-and-paste for the duration of this session?'
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
