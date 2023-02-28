import { unified } from 'unified';
import remarkParse from 'remark-parse';
import stringify from 'remark-stringify';
import type { Content, Parent, Root } from 'mdast'
import { Section } from '../types';

export function parse_markdown_sections(markdown: string): Section[] {
  const root: Section = { content: '', children: [] };
  const stack = [root];
  let current = root;

  const markdown_without_twoslash_cut = markdown.replace(/---cut---/g, '');
  const markdown_with_main_heading = convert_frontmatter_title_to_h1(markdown_without_twoslash_cut);

  const ast = unified().use(remarkParse).parse(markdown_with_main_heading);

  ast.children.forEach((node) => {
    if (node.type === 'heading') {
      node.children
      const level = node.depth;
      const title = get_text_content(node);
      const content = '';

      while (level < stack.length) {
        stack.pop();
        current = stack[stack.length - 1];
      }

      const section: Section = { title, content };
      current.children = current.children || [];
      current.children.push(section);
      stack.push(section);
      current = section;
    } else {
      const stringified_node = unified().use(stringify).stringify(node as unknown as Root).replace(/\n$/g, ' ');
      current.content += stringified_node;
    }
  });

  if (root.content) {
    root.children.unshift({ title: 'Content not in section', content: root.content });
  }

  return root.children || [];
}

function get_text_content(node: Content): string {
  if (node.type === 'text') return node.value;
  if ((node as Parent).children) {
    return (node as Parent).children.map((child) => get_text_content(child)).join('');
  }
  return '';
}

function convert_frontmatter_title_to_h1(markdown: string): string {
  return markdown.replace(/---[\s\S]*title:\s*(.*?)\n[\s\S]*?---/, "# $1");
}

if (import.meta.vitest) {
  describe('convert_frontmatter_title_to_h1', () => {
    test('converts title to h1', () => {
      const markdown = '---\ntitle: Introduction\n---';
      const expectedHeading = '# Introduction';
      expect(convert_frontmatter_title_to_h1(markdown)).toEqual(expectedHeading);
    });

    test('ignores other attributes', () => {
      const markdown = `---
foo: Hello
title: Migrating from Sapper
rank: 1
---`
      const expectedHeading = '# Migrating from Sapper';
      expect(convert_frontmatter_title_to_h1(markdown)).toEqual(expectedHeading);
    });
  })
}
