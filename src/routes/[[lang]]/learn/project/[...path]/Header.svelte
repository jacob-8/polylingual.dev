<script>
  import { page } from '$app/stores';
</script>

<div class="bg-gray-500/10 border-b flex items-center">
  <a class="p-2 font-semibold" href="/{$page.data.lang}/learn"> 了解 JavaScript: 語言學習閱讀器 </a>
  <!-- JavaScript Explained -->
  <div class="mr-auto" />
  <slot />
  <a
    class="p-2 opacity-50 hover:opacity-100"
    href="https://www.facebook.com/groups/liaojiejavascript"
    target="_blank"
    rel="noreferrer"
  >
    <span class="i-cib-facebook" />
  </a>
</div>
