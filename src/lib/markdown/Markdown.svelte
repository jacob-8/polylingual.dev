<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown';
  import Code from './renderers/Code.svelte';
  import Blockquote from './renderers/Blockquote.svelte';
  import Codespan from './renderers/Codespan.svelte';
  import { dev } from '$app/environment';

  export let markdown: string;

  $: chineseOnlyMarkdown = markdown.replace(/^.*:zh:/gm, ''); 
  // [^->] do not wype out initial list hyphen or blockquote caret // TODO: Fix 05-display-sentences without breaking code samples
  $: englishOnlyMarkdown = markdown.replace(/:zh:.*/gm, '');
  $: bothLanguagesMarkdown = markdown.replace(/:zh:/gm, '\n\n');

  let language: 'both' | 'en' | 'zh' = dev ? 'both' : 'zh';
  $: source =
    language === 'both'
      ? bothLanguagesMarkdown
      : language === 'zh'
      ? chineseOnlyMarkdown
      : englishOnlyMarkdown;

  function on_key_down(event: KeyboardEvent) {
    if (event.repeat) return;
    if (event.altKey && event.key === 't') {
      if (language === 'both') {
        language = 'en';
      } else if (language === 'en') {
        language = 'zh';
      } else {
        language = 'both';
      }
      event.preventDefault();
    }
  }
</script>

<svelte:window on:keydown={on_key_down} />

<SvelteMarkdown {source} renderers={{ code: Code, codespan: Codespan, blockquote: Blockquote }} />
