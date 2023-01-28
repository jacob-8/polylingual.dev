const capture_frontmatter_between_3_dashes_then_markdown = /---\n([^]+?)\n---\n([^]+)/;
export function extract_frontmatter(code: string): { frontmatter: Record<string, string>, markdown: string } {
  try {
    const [, frontmatter_lines, markdown] = code.match(capture_frontmatter_between_3_dashes_then_markdown) as [any, string, string];

    const frontmatter: Record<string, string> = {};

    for (const line of frontmatter_lines.split('\n')) {
      if (line.startsWith('#')) continue;
      const index = line.indexOf(':');
      if (index !== -1) {
        frontmatter[line.slice(0, index).trim()] = line.slice(index + 1).trim();
      }
    }

    return { frontmatter, markdown: markdown.trim() };
  } catch {
    return { frontmatter: {}, markdown: code };
  }
}

if (import.meta.vitest) {
  describe('extract_frontmatter', () => {
    test('pulls out items but skips commented out ones', () => {
      expect(extract_frontmatter(`---
# initial_url: /hello
file_to_focus: /src/routes/+page.svelte
---

Here we started building...`)).toMatchInlineSnapshot(`
  {
    "frontmatter": {
      "file_to_focus": "/src/routes/+page.svelte",
    },
    "markdown": "Here we started building...",
  }
`);
    });

    test('no frontmatter', () => {
      expect(extract_frontmatter(`No frontmatter here`)).toMatchInlineSnapshot(`
        {
          "frontmatter": {},
          "markdown": "No frontmatter here",
        }
      `);
    });
  });
}