<script>
  import { page } from '$app/stores';
  import SeoMetaTags from '$lib/SeoMetaTags.svelte';
</script>

<SeoMetaTags title="Polylingual Development" />

<main class="h-100vh bg-#242424 text-white/87 flex flex-col justify-center text-center p-3">
  <h1 class="text-4xl">Polylingual Development</h1>
  <div class="my-10">
    {#if $page.data.lang === 'zh-TW'}
      <div>
        <a
          class="bg-black py-2 px-4 rounded-lg text-2xl border border-black hover:border-blue transition-border-color-300"
          href="/zh-TW/learn">學習 <span class="i-carbon-arrow-right mb-1" /></a
        >
      </div>
      <div class="h-10" />
      <div>
        <a
          class="bg-black py-2 px-4 rounded-lg text-2xl border border-black hover:border-blue transition-border-color-300"
          href="/zh-TW/search">搜索 <span class="i-carbon-search mb-1" /></a
        >
      </div>
    {:else}
      <div>
        <a
          class="bg-black py-2 px-4 rounded-lg text-2xl border border-black hover:border-blue transition-border-color-300"
          href="/en/learn">Learn <span class="i-carbon-arrow-right mb-1" /></a
        >
      </div>
      <div class="h-10" />
      <div>
        <a
          class="bg-black py-2 px-4 rounded-lg text-2xl border border-black hover:border-blue transition-border-color-300"
          href="/en/search">Search <span class="i-carbon-search mb-1" /></a
        >
      </div>
    {/if}
  </div>

  <div class="mt-10 mb-4">
    <a
      class:bg-black={$page.data.lang === 'en'}
      class="py-1 px-2 rounded-lg border border-transparent hover:border-blue transition-border-color-300"
      href="/en">EN</a
    >
    <a
      class:bg-black={$page.data.lang === 'zh-TW'}
      class="py-1 px-2 rounded-lg border border-transparent hover:border-blue transition-border-color-300"
      href="/zh-TW">中文</a
    >
  </div>
  <div>
    <a
      class="text-2xl text-gray-500/70 hover:text-gray-400"
      target="_blank"
      rel="noreferrer"
      href="https://github.com/jacob-8/polylingual.dev"
    >
      <span class="i-mdi-github" />
    </a>
  </div>
</main>
