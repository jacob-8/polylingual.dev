import { mockProjectsFirstLessonName, mockProjectsFirstProjectName, mockProjectsInitialPath, mockProjectsDirectory } from "./mock-project-data.test";
import { parseTree } from "./parse-tree";
import { prepareLessonStages } from "./prepare-lesson-stages";

describe('prepareLessonStages', () => {
  const projects = parseTree(mockProjectsDirectory, mockProjectsInitialPath);
  test('basic', () => {
    expect(prepareLessonStages({ projects, project: mockProjectsFirstProjectName, lesson: mockProjectsFirstLessonName })).toMatchInlineSnapshot(`
      {
        "stages": {
          "01-introduction": {
            "app_finish": {
              ".gitignore": "node_modules",
              "package.txt": "root level",
              "src/a.txt": "I'm just in the first project's first lesson and should overwrite the common \`a.txt\` file and the project's common \`a.txt\` file.",
              "src/b.txt": "I'm shared by all lessons in this project.",
              "src/c.txt": "I'm shared by all projects and should show up.",
              "src/routes/+page.svelte": "<script lang=\\"ts\\">
      	// import '../global.css';
      </script>

      <div style=\\"display: flex; flex-direction: column; height: 100%;\\">
      </div>",
              "src/routes/Hello.svelte": "<h1>歡迎上課！ 這是邊做邊學的地方。</h1>
      <h2>Welcome to the lesson! Here is where we learn by doing.</h2>
      ",
            },
            "app_start": {
              ".gitignore": "node_modules",
              "package.txt": "root level",
              "src/a.txt": "I'm just in the first project's first lesson and should overwrite the common \`a.txt\` file and the project's common \`a.txt\` file.",
              "src/b.txt": "I'm shared by all lessons in this project.",
              "src/c.txt": "I'm shared by all projects and should show up.",
              "src/routes/+page.svelte": "",
              "src/routes/Hello.svelte": "<h1>歡迎上課！ 這是邊做邊學的地方。</h1>
      <h2>Welcome to the lesson! Here is where we learn by doing.</h2>
      ",
            },
            "directory": "/src/lib/content/mock-projects/01-first-project/01-first-lesson/01-introduction.md",
            "directory_to_show": "",
            "file_to_focus": undefined,
            "initial_url": undefined,
            "location": {
              "lesson": "01-first-lesson",
              "project": "01-first-project",
              "stage": "01-introduction",
            },
            "markdown": "1st project, 1st lesson, 1st stage; no frontmatter

      Explain what we're going to do:

      [[src/routes/+page.svelte#02]]  

      And then

      [[src/routes/+page.svelte#03]]  

      And some more prose.",
            "markdown_with_steps": "1st project, 1st lesson, 1st stage; no frontmatter

      Explain what we're going to do:

      \`\`\`svelte file=\\"src/routes/+page.svelte\\"
      <script lang=\\"ts\\">
      	// import '../global.css';
      </script>
      \`\`\`  

      And then

      \`\`\`diff file=\\"src/routes/+page.svelte\\"
      <script lang=\\"ts\\">
      	// import '../global.css';
      </script>
      --diff-border--
      <script lang=\\"ts\\">
      	// import '../global.css';
      </script>

      <div style=\\"display: flex; flex-direction: column; height: 100%;\\">
      </div>
      \`\`\`  

      And some more prose.",
            "next_stage_location": {
              "lesson": "01-first-lesson",
              "project": "01-first-project",
              "stage": "02-simplfy-into-class",
            },
            "previous_stage_location": null,
            "steps": {},
            "title": {
              "en": "Introduction",
              "zh-TW": "介紹",
            },
          },
          "02-simplfy-into-class": {
            "app_finish": {
              ".gitignore": "node_modules",
              "package.txt": "root level",
              "src/a.txt": "I'm just in the first project's first lesson and should overwrite the common \`a.txt\` file and the project's common \`a.txt\` file.",
              "src/b.txt": "I'm shared by all lessons in this project.",
              "src/c.txt": "I'm shared by all projects and should show up.",
              "src/routes/+page.svelte": "<script lang=\\"ts\\">
      	// import '../global.css';
      </script>

      <div class=\\"simplify\\">
      </div>",
              "src/routes/Hello.svelte": "<h1>歡迎上課！ 這是邊做邊學的地方。</h1>
      <h2>Welcome to the lesson! Here is where we learn by doing.</h2>
      ",
            },
            "app_start": {
              ".gitignore": "node_modules",
              "package.txt": "root level",
              "src/a.txt": "I'm just in the first project's first lesson and should overwrite the common \`a.txt\` file and the project's common \`a.txt\` file.",
              "src/b.txt": "I'm shared by all lessons in this project.",
              "src/c.txt": "I'm shared by all projects and should show up.",
              "src/routes/+page.svelte": "<script lang=\\"ts\\">
      	// import '../global.css';
      </script>

      <div style=\\"display: flex; flex-direction: column; height: 100%;\\">
      </div>",
              "src/routes/Hello.svelte": "<h1>歡迎上課！ 這是邊做邊學的地方。</h1>
      <h2>Welcome to the lesson! Here is where we learn by doing.</h2>
      ",
            },
            "directory": "/src/lib/content/mock-projects/01-first-project/01-first-lesson/02-simplfy-into-class.md",
            "directory_to_show": "",
            "file_to_focus": "/src/routes/+page.svelte",
            "initial_url": undefined,
            "location": {
              "lesson": "01-first-lesson",
              "project": "01-first-project",
              "stage": "02-simplfy-into-class",
            },
            "markdown": "I have frontmatter with a comment and here we are going to simplify the styles into a class:

      [[src/routes/+page.svelte#04]]",
            "markdown_with_steps": "I have frontmatter with a comment and here we are going to simplify the styles into a class:

      \`\`\`diff file=\\"src/routes/+page.svelte\\"
      <script lang=\\"ts\\">
      	// import '../global.css';
      </script>

      <div style=\\"display: flex; flex-direction: column; height: 100%;\\">
      </div>
      --diff-border--
      <script lang=\\"ts\\">
      	// import '../global.css';
      </script>

      <div class=\\"simplify\\">
      </div>
      \`\`\`",
            "next_stage_location": {
              "lesson": "01-first-lesson",
              "project": "01-first-project",
              "stage": "03-another",
            },
            "previous_stage_location": {
              "lesson": "01-first-lesson",
              "project": "01-first-project",
              "stage": "01-introduction",
            },
            "steps": {},
            "title": {
              "en": "Foo",
              "zh-TW": "福",
            },
          },
          "03-another": {
            "app_finish": {
              ".gitignore": "node_modules",
              "package.txt": "root level",
              "src/a.txt": "I'm just in the first project's first lesson and should overwrite the common \`a.txt\` file and the project's common \`a.txt\` file.",
              "src/b.txt": "I'm shared by all lessons in this project.",
              "src/c.txt": "I'm shared by all projects and should show up.",
              "src/routes/+page.svelte": "<script lang=\\"ts\\">
      	// import '../global.css';
      </script>

      <div class=\\"simplify\\">
      </div>",
              "src/routes/Hello.svelte": "<h1>歡迎上課！ 這是邊做邊學的地方。</h1>
      <h2>Welcome to the lesson! Here is where we learn by doing.</h2>
      ",
            },
            "app_start": {
              ".gitignore": "node_modules",
              "package.txt": "root level",
              "src/a.txt": "I'm just in the first project's first lesson and should overwrite the common \`a.txt\` file and the project's common \`a.txt\` file.",
              "src/b.txt": "I'm shared by all lessons in this project.",
              "src/c.txt": "I'm shared by all projects and should show up.",
              "src/routes/+page.svelte": "<script lang=\\"ts\\">
      	// import '../global.css';
      </script>

      <div class=\\"simplify\\">
      </div>",
              "src/routes/Hello.svelte": "<h1>歡迎上課！ 這是邊做邊學的地方。</h1>
      <h2>Welcome to the lesson! Here is where we learn by doing.</h2>
      ",
            },
            "directory": "/src/lib/content/mock-projects/01-first-project/01-first-lesson/03-another.md",
            "directory_to_show": "",
            "file_to_focus": undefined,
            "initial_url": undefined,
            "location": {
              "lesson": "01-first-lesson",
              "project": "01-first-project",
              "stage": "03-another",
            },
            "markdown": "---
      ---

      # I have empty frontmatter

      And some **markdown** that will turn into html",
            "markdown_with_steps": "---
      ---

      # I have empty frontmatter

      And some **markdown** that will turn into html",
            "next_stage_location": {
              "lesson": "02-second-lesson",
              "project": "01-first-project",
              "stage": "01-introduction",
            },
            "previous_stage_location": {
              "lesson": "01-first-lesson",
              "project": "01-first-project",
              "stage": "02-simplfy-into-class",
            },
            "steps": {},
            "title": {
              "en": "change",
              "zh-TW": "change",
            },
          },
        },
      }
    `);
  });
})