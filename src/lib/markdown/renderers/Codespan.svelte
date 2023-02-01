<script lang="ts">
  import { page } from '$app/stores';
  import { focus_file } from './focus_file';

  export let raw: string;
  $: text = raw.replace(/`/g, '');
</script>

<code on:click={() => focus_file($page.url.pathname, text)}>{text}</code>
