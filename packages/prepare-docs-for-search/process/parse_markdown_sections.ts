import { unified } from 'unified';
import remarkParse from 'remark-parse';
import stringify from 'remark-stringify';
import type { Content, Parent, Root } from 'mdast'

export interface Section {
  title?: string;
  content?: string;
  children?: Section[];
}

export function parse_markdown_sections(markdown: string): Section[] {
  const root: Section = { content: '', children: [] };
  const stack = [root];
  let current = root;

  const markdown_with_main_heading = convert_frontmatter_title_to_h1(markdown);

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
      const stringified_node = unified().use(stringify).stringify(node as unknown as Root).replace(/\n/g, ' ');
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
  return markdown.replace(/---\s*\n\s*title:\s*(.*?)\s*\n\s*---\n/, "# $1");
}

if (import.meta.vitest) {
  test('convert_frontmatter_title_to_h1', () => {
    console.log('hello')
    const markdown = '---\ntitle: Introduction\n---\n';
    const expectedHeading = '# Introduction';
    expect(convert_frontmatter_title_to_h1(markdown)).toEqual(expectedHeading);
  });
}

// function flattenSections(sections: Section[]): Section[] {
//   return sections.reduce((acc, section) => {
//     const { children, ...rest } = section;
//     acc.push(rest);
//     if (children) {
//       acc.push(...flattenSections(children));
//     }
//     return acc;
//   }, [] as Section[]);
// };