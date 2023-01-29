import { parseTree } from "./parse-tree";
import parseTreeMockData from "./parse-tree.mock-data";
import { prepareLessonStages } from "./prepare-lesson-stages";

describe('prepareLessonStages', () => {
  const tree = parseTree(parseTreeMockData);
  test('basic', () => {
    expect(prepareLessonStages({ projects: tree, project: '01-language-learning-reader', lesson: '01-proof-of-concept' })).toMatchInlineSnapshot(`
      {
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
        "stages": {
          "01-introduction": {
            "app_finish": {},
            "app_start": {},
            "file_to_focus": undefined,
            "initial_url": undefined,
            "location": {
              "lesson": "01-proof-of-concept",
              "name": "01-introduction",
              "project": "01-language-learning-reader",
            },
            "markdown": "Building a web application is like building a house.",
            "next_stage_location": {
              "lesson": "01-proof-of-concept",
              "name": "02-adding-foo",
              "project": "01-language-learning-reader",
            },
            "previous_stage_location": null,
            "steps": [],
          },
          "02-adding-foo": {
            "app_finish": {},
            "app_start": {},
            "file_to_focus": undefined,
            "initial_url": undefined,
            "location": {
              "lesson": "01-proof-of-concept",
              "name": "02-adding-foo",
              "project": "01-language-learning-reader",
            },
            "markdown": "---
        # initial_url: /hello
        file_to_focus: /src/routes/+page.svelte
        ---
        
        Here we started building...",
            "next_stage_location": {
              "lesson": "01-proof-of-concept",
              "name": "03-another",
              "project": "01-language-learning-reader",
            },
            "previous_stage_location": {
              "lesson": "01-proof-of-concept",
              "name": "01-introduction",
              "project": "01-language-learning-reader",
            },
            "steps": [],
          },
          "03-another": {
            "app_finish": {},
            "app_start": {},
            "file_to_focus": undefined,
            "initial_url": undefined,
            "location": {
              "lesson": "01-proof-of-concept",
              "name": "03-another",
              "project": "01-language-learning-reader",
            },
            "markdown": "---
        ---
        
        # Empty Frontmatter block",
            "next_stage_location": null,
            "previous_stage_location": {
              "lesson": "01-proof-of-concept",
              "name": "02-adding-foo",
              "project": "01-language-learning-reader",
            },
            "steps": [],
          },
        },
        "steps_files": {
          "src/routes/+page.svelte": "reTypewriter Snapshots v1

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
      --------------
      ",
        },
      }
    `);
  });
})