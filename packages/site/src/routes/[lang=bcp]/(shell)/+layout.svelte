<script>
  import { page } from '$app/stores';
</script>

<main class="min-h-100vh bg-#242424 text-white/87 flex flex-col p-3">
  <div class="flex">
    <h1 class="text-3xl">
      <a href="/{$page.data.lang}">Polylingual Development</a>
    </h1>
  </div>

  <slot />
</main>
