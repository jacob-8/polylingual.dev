import { mockProjectsFirstLessonName, mockProjectsFirstProjectName, mockProjectsInitialPath, mockProjectsDirectory } from "./mock-project-data.test";
import { parseTree } from "./parse-tree";
import { prepareLessonStages } from "./prepare-lesson-stages";

describe('prepareLessonStages', () => {
  const projects = parseTree(mockProjectsDirectory, mockProjectsInitialPath);
  test('basic', () => {
    expect(prepareLessonStages({ projects, project: mockProjectsFirstProjectName, lesson: mockProjectsFirstLessonName })).toMatchInlineSnapshot(`
      {
        "app_start": {
          "package.txt": "root level",
          "src/a.txt": "I'm just in the first project's first lesson and should overwrite the common \`a.txt\` file and the project's common \`a.txt\` file.",
          "src/b.txt": "I'm shared by all lessons in this project.",
          "src/c.txt": "I'm shared by all projects and should show up.",
          "src/routes/+page.svelte": "",
          "src/routes/Hello.svelte": "<h1>歡迎上課！ 這是邊做邊學的地方。</h1>
      <h2>Welcome to the lesson! Here is where we learn by doing.</h2>
      ",
        },
        "meta": {
          "scope": {
            "depth": 1,
            "name": "src",
            "prefix": "/src/",
          },
        },
        "stages": {
          "01-introduction": {
            "app_finish": {},
            "app_start": {
              "package.txt": "root level",
              "src/a.txt": "I'm just in the first project's first lesson and should overwrite the common \`a.txt\` file and the project's common \`a.txt\` file.",
              "src/b.txt": "I'm shared by all lessons in this project.",
              "src/c.txt": "I'm shared by all projects and should show up.",
              "src/routes/+page.svelte": "",
              "src/routes/Hello.svelte": "<h1>歡迎上課！ 這是邊做邊學的地方。</h1>
      <h2>Welcome to the lesson! Here is where we learn by doing.</h2>
      ",
            },
            "file_to_focus": undefined,
            "initial_url": undefined,
            "location": {
              "lesson": "01-first-lesson",
              "name": "01-introduction",
              "project": "01-first-project",
            },
            "markdown": "1st project, 1st lesson, 1st stage; no frontmatter

      Explain what we're going to do:

      [[src/routes/+page.svelte#02]]  

      And then

      [[src/routes/+page.svelte#03]]  

      And some more prose.
      ",
            "markdown_with_steps": "1st project, 1st lesson, 1st stage; no frontmatter

      Explain what we're going to do:

      \`\`\`diff

      --diff-border--
      <script lang=\\"ts\\">
      	import '../global__普.css';
      </script>
      \`\`\`  

      And then

      \`\`\`diff
      <script lang=\\"ts\\">
      	import '../global__普.css';
      </script>
      --diff-border--
      <script lang=\\"ts\\">
      	import '../global__普.css';
      </script>

      <div style=\\"display: flex; flex-direction: column; height: 100%;\\">
      </div>
      \`\`\`  

      And some more prose.
      ",
            "next_stage_location": {
              "lesson": "01-first-lesson",
              "name": "02-adding-foo",
              "project": "01-first-project",
            },
            "previous_stage_location": null,
            "steps": {},
          },
          "02-adding-foo": {
            "app_finish": {},
            "app_start": {},
            "file_to_focus": "/src/routes/+page.svelte",
            "initial_url": undefined,
            "location": {
              "lesson": "01-first-lesson",
              "name": "02-adding-foo",
              "project": "01-first-project",
            },
            "markdown": "I have frontmatter with a comment",
            "next_stage_location": {
              "lesson": "01-first-lesson",
              "name": "03-another",
              "project": "01-first-project",
            },
            "previous_stage_location": {
              "lesson": "01-first-lesson",
              "name": "01-introduction",
              "project": "01-first-project",
            },
            "steps": {},
          },
          "03-another": {
            "app_finish": {},
            "app_start": {},
            "file_to_focus": undefined,
            "initial_url": undefined,
            "location": {
              "lesson": "01-first-lesson",
              "name": "03-another",
              "project": "01-first-project",
            },
            "markdown": "---
      ---

      # I have empty frontmatter

      And some **markdown** that will turn into html",
            "next_stage_location": {
              "lesson": "02-second-lesson",
              "name": "01-introduction",
              "project": "01-first-project",
            },
            "previous_stage_location": {
              "lesson": "01-first-lesson",
              "name": "02-adding-foo",
              "project": "01-first-project",
            },
            "steps": {},
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