<blockquote class="border border-blue-500/40 bg-blue-500/10 rounded px-3 my-3 text-s"><slot /></blockquote>

<style>
  blockquote {
    filter: drop-shadow(2px 2px 6px hsla(15, 100%, 50%, 0.2));
  }

  blockquote :global(p) {
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
  }
  blockquote :global(code) {
    --at-apply: bg-blue-500/20;
  }
</style>
