import PrismJS from 'prismjs';
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-diff.js';
import 'prismjs/components/prism-typescript.js';
import 'prism-svelte';
import { marked } from 'marked';

const languages = {
  bash: 'bash',
  env: 'bash',
  html: 'markup',
  svelte: 'svelte',
  js: 'javascript',
  css: 'css',
  diff: 'diff',
  ts: 'typescript',
  '': ''
};

const chars: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
};

function escape(html: string) {
  return html.replace(/[&<>]/g, (c) => chars[c]);
}

const delimiter_substitutes = {
  '+++': '             ',
  '---': '           ',
  ':::': '         '
};

function highlight_spans(content: string, classname: string) {
  return `<span class="${classname}">${content}</span>`;
  // return content.replace(/<span class="([^"]+)"/g, (_, classnames) => {
  // 	return `<span class="${classname} ${classnames}"`;
  // });
}

const default_renderer: Partial<import('marked').Renderer> = {
  code: (source, language: keyof typeof languages = '') => {
    const options: Record<string, string> = {};

    let html = '';

    source = source
      .replace(/\/\/\/ (.+?): (.+)\n/gm, (_, key, value) => {
        options[key] = value;
        return '';
      })
      .replace(/^([-+])?((?: {4})+)/gm, (match, prefix = '', spaces) => {
        if (prefix && language !== 'diff') return match;

        // for no good reason at all, marked replaces tabs with spaces
        let tabs = '';
        for (let i = 0; i < spaces.length; i += 4) {
          tabs += '\t';
        }
        return prefix + tabs;
      })
      .replace(/(\+\+\+|---|:::)/g, (_, delimiter: keyof typeof delimiter_substitutes) => {
        return delimiter_substitutes[delimiter];
      })
      .replace(/\*\\\//g, '*/');

    if (language === 'diff') {
      const lines = source.split('\n').map((content) => {
        let type = null;
        if (/^[+-]/.test(content)) {
          type = content[0] === '+' ? 'inserted' : 'deleted';
          content = content.slice(1);
        }

        return {
          type,
          content: escape(content)
        };
      });

      html = `<div class="code-block"><pre class="language-diff"><code>${lines
        .map((line) => {
          if (line.type) return `<span class="${line.type}">${line.content}\n</span>`;
          return line.content + '\n';
        })
        .join('')}</code></pre></div>`;
    } else {
      const lang: keyof typeof languages = (language);
      const plang = languages[lang];
      const highlighted = plang
        ? PrismJS.highlight(source, PrismJS.languages[plang], language)
        : escape(source);

      html = `<div class="code-block">${options.file ? `<span class="filename">${options.file}</span>` : ''
        }<pre class='language-${plang}'><code>${highlighted}</code></pre></div>`;
    }

    return html
      .replace(/ {13}([^ ][^]+?) {13}/g, (_, content) => {
        return highlight_spans(content, 'highlight add');
      })
      .replace(/ {11}([^ ][^]+?) {11}/g, (_, content) => {
        return highlight_spans(content, 'highlight remove');
      })
      .replace(/ {9}([^ ][^]+?) {9}/g, (_, content) => {
        return highlight_spans(content, 'highlight');
      });
  }
};

marked.use({
  renderer: {}
});

export function transform(markdown: string, options: Partial<import('marked').Renderer>) {
  marked.use({
    renderer: {
      ...default_renderer,
      ...options
    }
  });

  return marked(markdown);
}
