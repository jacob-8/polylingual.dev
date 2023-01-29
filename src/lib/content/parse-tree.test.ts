import { parseTree } from "./parse-tree";
import mockRawProjects from './parse-tree.mock-data'

describe('parseTree', () => {
  test('kitchen sink', () => {
    expect(parseTree(mockRawProjects)).toMatchInlineSnapshot(`
      {
        "01-language-learning-reader": {
          "lessons": {
            "01-proof-of-concept": {
              "app_start": {
                "package.json": "{
          \\"name\\": \\"~TODO~\\",
          \\"version\\": \\"0.0.1\\"
        }",
                "src/routes/+page.svelte": "<h1>歡迎上課！ 這是邊做邊學的地方。</h1>",
                "src/routes/data/swords_and_shields.json": "[
          {
            \\"classical\\": \\"矛盾 (韓非子)\\",
            \\"mandarin\\": \\"矛盾 (韓非子)\\",
            \\"english\\": \\"Swords and shields (Hán fēi zǐ)\\"
          }
        ]",
                "static/robots.txt": "I should override the common robots.txt",
              },
              "name": "01-proof-of-concept",
              "stages": {
                "01-introduction": {
                  "app_finish": {},
                  "app_start": {},
                  "file_to_focus": undefined,
                  "initial_url": undefined,
                  "lesson": "01-proof-of-concept",
                  "markdown": "Building a web application is like building a house.",
                  "name": "01-introduction",
                  "next_stage_path": "01-language-learning-reader/01-proof-of-concept/02-adding-foo",
                  "previous_stage_path": null,
                  "project": "01-language-learning-reader",
                  "steps": [],
                },
                "02-adding-foo": {
                  "app_finish": {},
                  "app_start": {},
                  "file_to_focus": undefined,
                  "initial_url": undefined,
                  "lesson": "01-proof-of-concept",
                  "markdown": "---
        # initial_url: /hello
        file_to_focus: /src/routes/+page.svelte
        ---
        
        Here we started building...",
                  "name": "02-adding-foo",
                  "next_stage_path": "01-language-learning-reader/01-proof-of-concept/03-another",
                  "previous_stage_path": "01-language-learning-reader/01-proof-of-concept/01-introduction",
                  "project": "01-language-learning-reader",
                  "steps": [],
                },
                "03-another": {
                  "app_finish": {},
                  "app_start": {},
                  "file_to_focus": undefined,
                  "initial_url": undefined,
                  "lesson": "01-proof-of-concept",
                  "markdown": "---
        ---
        
        # Empty Frontmatter block",
                  "name": "03-another",
                  "next_stage_path": null,
                  "previous_stage_path": "01-language-learning-reader/01-proof-of-concept/02-adding-foo",
                  "project": "01-language-learning-reader",
                  "steps": [],
                },
              },
              "steps_files": {
                "src/routes/+page.svelte": "
        reTypewriter Snapshots v1

      --01----------

      --02----------
      <script lang=\\"ts\\">
      	import '../global__普.css';
      </script>
      --03----------
      <script lang=\\"ts\\">
      	import '../global__普.css';
      </script>

      <div style=\\"display: flex; flex-direction: column; height: 100%;\\">
      </div>
      --------------",
              },
            },
          },
          "meta": {
            "scope": {
              "depth": 1,
              "name": "src",
              "prefix": "/src/",
            },
          },
          "name": "01-language-learning-reader",
        },
      }
    `);
  });
});

