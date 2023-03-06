import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prism-svelte';

export function highlight_code(code: string, lang: string) {
  if (Prism.languages[lang]) return Prism.highlight(code, Prism.languages[lang], lang);
  return code;
}