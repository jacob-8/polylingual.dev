import type { StageFrontmatter } from "$lib/types";

const capture_frontmatter_between_3_dashes_then_markdown = /---\r?\n([^]+?)\r?\n---\r?\n([^]+)/;
const newline = /\r?\n/g; // check for \r because Windows

export function extract_frontmatter(code: string): { frontmatter: StageFrontmatter, markdown: string } {
  const frontmatter: StageFrontmatter = { title: { en: 'change', 'zh-TW': 'change' } };

  try {
    const [, frontmatter_lines, markdown] = code.match(capture_frontmatter_between_3_dashes_then_markdown) as [unknown, string, string];

    for (const line of frontmatter_lines.split(newline)) {
      if (line.startsWith('#')) continue;
      const colon_index = line.indexOf(':');
      if (colon_index !== -1) {
        const property = line.slice(0, colon_index).trim() as 'en' | 'zh-TW' | 'initial_url' | 'file_to_focus';
        const value = line.slice(colon_index + 1).trim();
        if (property === 'en' || property === 'zh-TW') {
          frontmatter.title[property] = value;
        } else
          frontmatter[property] = value;
      }
    }

    return { frontmatter, markdown: markdown.trim() };
  } catch {
    return { frontmatter, markdown: code };
  }
}

if (import.meta.vitest) {
  describe('extract_frontmatter', () => {
    test('pulls out items but skips commented out ones', () => {
      expect(extract_frontmatter(`---
# some_commented_field: foo
en: Hi
zh-TW: 嗨
initial_url: /hello
file_to_focus: /src/routes/+page.svelte
---

Here we started building...`)).toMatchInlineSnapshot(`
  {
    "frontmatter": {
      "file_to_focus": "/src/routes/+page.svelte",
      "initial_url": "/hello",
      "title": {
        "en": "Hi",
        "zh-TW": "嗨",
      },
    },
    "markdown": "Here we started building...",
  }
`);
    });
    
    test('Add placeholder titles when no frontmatter', () => {
      expect(extract_frontmatter(`No frontmatter here`)).toMatchInlineSnapshot(`
        {
          "frontmatter": {
            "title": {
              "en": "change",
              "zh-TW": "change",
            },
          },
          "markdown": "No frontmatter here",
        }
      `);
    });
  });
}