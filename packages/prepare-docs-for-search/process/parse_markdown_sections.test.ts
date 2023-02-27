import { Section } from "../types";
import { parse_markdown_sections } from "./parse_markdown_sections";

describe('parse_markdown_sections', () => {
  test('handles title in frontmatter', () => {
    const markdown = `---
title: Introduction
---

## Before we begin

> If

## What is SvelteKit?

SvelteKit is`

    expect(parse_markdown_sections(markdown)).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "content": "> If ",
              "title": "Before we begin",
            },
            {
              "content": "SvelteKit is ",
              "title": "What is SvelteKit?",
            },
          ],
          "content": "",
          "title": "Introduction",
        },
      ]
    `);
  });

  test('parses a markdown file into sections and subsections', () => {
    const markdown = `
# Section 1

This is the content of section 1.

## Subsection 1.1

This is the content of subsection 1.1.

### Subsubsection 1.1.1

This is the content of subsubsection 1.1.1.

### Subsubsection 1.1.2

This is the content of subsubsection 1.1.2.

## Subsection 1.2

This is the content of subsection 1.2.


# Section 2

This is the content of section 2.

## Subsection 2.1

This is the content of subsection 2.1.
`;

    const expected: Section[] = [
      {
        "title": "Section 1",
        "content": "This is the content of section 1. ",
        "children": [
          {
            "title": "Subsection 1.1",
            "content": "This is the content of subsection 1.1. ",
            "children": [
              {
                "title": "Subsubsection 1.1.1",
                "content": "This is the content of subsubsection 1.1.1. ",
              },
              {
                "title": "Subsubsection 1.1.2",
                "content": "This is the content of subsubsection 1.1.2. ",
              },
            ]
          },
          {
            "title": "Subsection 1.2",
            "content": "This is the content of subsection 1.2. ",
          },
        ]
      },
      {
        "title": "Section 2",
        "content": "This is the content of section 2. ",
        "children": [
          {
            "title": "Subsection 2.1",
            "content": "This is the content of subsection 2.1. ",
          },
        ],
      },
    ];

    expect(parse_markdown_sections(markdown)).toEqual(expected);
  });

  test('handles empty input', () => {
    const markdown = '';
    const expected: Section[] = [];
    expect(parse_markdown_sections(markdown)).toEqual(expected);
  });

  test('handles markdown without headings', () => {
    const markdown = `This is some intro text.

And here's some more text.`;
    const expected: Section[] = [
      {
        "title": "Content not in section",
        "content": "This is some intro text. And here's some more text. ",
      },
    ]
    expect(parse_markdown_sections(markdown)).toEqual(expected);
  });

  test('handles markdown before headings and without 1st level heading', () => {
    const markdown = `This is some intro text.

And here's some more text.

## 2nd *level* heading
some 2nd level text

### 3rd level heading
Some 3rd level text`;
    const expected: Section[] = [
      {
        "title": "Content not in section",
        "content": "This is some intro text. And here's some more text. ",
      },
      {
        "title": "2nd level heading",
        "content": "some 2nd level text ",
        "children": [
          {
            "title": "3rd level heading",
            "content": "Some 3rd level text ",
          },
        ],
      }
    ]
    expect(parse_markdown_sections(markdown)).toEqual(expected);
  });
});
