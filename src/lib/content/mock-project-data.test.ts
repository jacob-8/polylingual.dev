export const mockProjectsDirectory = import.meta.glob(['/src/lib/content/mock-projects/**'], { as: 'raw', eager: true });
export const mockProjectsInitialPath = '/src/lib/content/mock-projects/';
export const mockProjectsFirstProjectName = '01-first-project';
export const mockProjectsFirstLessonName = '01-first-lesson';

test('mockProjectsDirectory', () => {
  expect(mockProjectsDirectory).toMatchInlineSnapshot(`
    {
      "/src/lib/content/mock-projects/01-first-project/01-first-lesson/01-introduction.md": "1st project, 1st lesson, 1st stage; no frontmatter

    Explain what we're going to do:

    [[src/routes/+page.svelte#02]]  

    And then

    [[src/routes/+page.svelte#03]]  

    And some more prose.
    ",
      "/src/lib/content/mock-projects/01-first-project/01-first-lesson/02-simplfy-into-class.md": "---
    # initial_url: /hello
    file_to_focus: /src/routes/+page.svelte
    ---

    I have frontmatter with a comment and here we are going to simplify the styles into a class:

    [[src/routes/+page.svelte#04]]  
    ",
      "/src/lib/content/mock-projects/01-first-project/01-first-lesson/03-another.md": "---
    ---

    # I have empty frontmatter

    And some **markdown** that will turn into html",
      "/src/lib/content/mock-projects/01-first-project/01-first-lesson/app/src/a.txt": "I'm just in the first project's first lesson and should overwrite the common \`a.txt\` file and the project's common \`a.txt\` file.",
      "/src/lib/content/mock-projects/01-first-project/01-first-lesson/app/src/routes/+page.svelte": "",
      "/src/lib/content/mock-projects/01-first-project/01-first-lesson/app/src/routes/+page.svelte.retypewriter": "reTypewriter Snapshots v1

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

    --04----------
    <script lang=\\"ts\\">
    	import '../global.css';
    </script>

    <div class=\\"simplify\\">
    </div>

    --------------
    ",
      "/src/lib/content/mock-projects/01-first-project/01-first-lesson/app/src/routes/Hello.svelte": "<h1>歡迎上課！ 這是邊做邊學的地方。</h1>
    <h2>Welcome to the lesson! Here is where we learn by doing.</h2>
    ",
      "/src/lib/content/mock-projects/01-first-project/01-first-lesson/meta.json": "{
      \\"scope\\": {
        \\"prefix\\": \\"/src/\\",
        \\"depth\\": 1,
        \\"name\\": \\"src\\"
      }
    }
    ",
      "/src/lib/content/mock-projects/01-first-project/02-second-lesson/01-introduction.md": "1st project, 2nd lesson, 1st stage; no frills",
      "/src/lib/content/mock-projects/01-first-project/02-second-lesson/app/src/routes/+page.svelte": "I'm a simple page with nothing that will be added to me.",
      "/src/lib/content/mock-projects/01-first-project/common/src/a.txt": "I'm shared by all lessons in the first projects, but should be overwritten in the first project by it's common \`a.txt\` file, but I should be in the first project's 2nd lesson.",
      "/src/lib/content/mock-projects/01-first-project/common/src/b.txt": "I'm shared by all lessons in this project.",
      "/src/lib/content/mock-projects/01-first-project/meta.json": "{
      \\"scope\\": {
        \\"prefix\\": \\"/\\",
        \\"depth\\": 0,
        \\"name\\": \\"project\\"
      }
    }
    ",
      "/src/lib/content/mock-projects/02-second-project/01-first-lesson-in-2nd-project/01-2nd-project-1st-lesson-1st-stage.md": "I'm the first stage in the 2nd project's first lesson.",
      "/src/lib/content/mock-projects/common/package.txt": "root level",
      "/src/lib/content/mock-projects/common/src/a.txt": "I'm shared by all projects, but should be overwritten in the first project by it's common \`a.txt\` and it's first lesson's \`a.txt\` file.",
      "/src/lib/content/mock-projects/common/src/b.txt": "I'm shared by all projects, but should be overwritten in the first project by it's common \`b.txt\` file. I'll be in the 2nd project though.",
      "/src/lib/content/mock-projects/common/src/c.txt": "I'm shared by all projects and should show up.",
    }
  `);
});