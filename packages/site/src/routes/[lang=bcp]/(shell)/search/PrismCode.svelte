<script lang="ts">
  import { highlight_code } from './hightlight_code';
  import './prism-vsc-dark-plus.css';
  import { split_code_into_filename_and_code } from './split_code_into_filename_and_code';

  export let lang: string;
  export let text: string;

  $: ({ filename, code } = split_code_into_filename_and_code(text));
  $: highlighted_code = highlight_code(code, lang);
</script>

<div class="bg-gray-900 overflow-hidden rounded text-white">
  <div class="p-3 bg-gray-700 flex">
    <span class="font-mono">
      {filename || lang}
    </span>
    <div class="mr-auto" />
    <button
      type="button"
      class="p-2 hover:bg-gray-500/20 rounded flex"
      on:click={() => {
        navigator.clipboard.writeText(code);
        alert('copied');
      }}
    >
      <i class="i-carbon-copy" />
    </button>
  </div>
  <pre class="p-3 text-white"><code>{@html highlighted_code}</code></pre>
</div>
