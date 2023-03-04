<script>
  import { page } from '$app/stores';
</script>

<div class="bg-gray-500/10 border-b flex items-center">
  <a class="p-2 font-semibold" href="/{$page.data.lang}/learn">
    {#if $page.data.lang === 'zh-TW'}
      了解 JavaScript
    {:else}
      JavaScript Explained
    {/if}
  </a>

  <div class="mr-auto" />
  <slot />

  <a
    class:bg-gray-300={$page.data.lang === 'zh-TW'}
    class="text-xs py-1 px-2 rounded hover:bg-gray-400 transition-background-color-300"
    href={$page.url.pathname.replace(/^.*?\/learn/, '/zh-TW/learn')}>中文</a
  >
  <a
    class:bg-gray-300={$page.data.lang === 'en'}
    class="text-xs py-1 px-2 rounded hover:bg-gray-400 transition-background-color-300 mr-1"
    href={$page.url.pathname.replace(/^.*?\/learn/, '/en/learn')}>EN</a
  >
  <a
    class="p-2 opacity-50 hover:opacity-100"
    href="https://www.facebook.com/groups/liaojiejavascript"
    target="_blank"
    rel="noreferrer"
  >
    <span class="i-cib-facebook mb-1" />
  </a>
</div>
