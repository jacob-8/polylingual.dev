import { mockProjectsInitialPath, mockProjectsDirectory } from "./mock-project-data.test";
import { parseTree } from "./parse-tree";

describe('parseTree', () => {
  test('kitchen sink', () => {
    const projects = parseTree(mockProjectsDirectory, mockProjectsInitialPath);
    expect(projects).toMatchInlineSnapshot(`
      {
        "01-first-project": {
          "lessons": {
            "01-first-lesson": {
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
              "meta": {
                "directory_to_show": "",
                "title": {
                  "en": "Proof of Concept",
                  "zh-TW": "驗證",
                },
              },
              "raw_stages": {
                "01-introduction": {
                  "directory": "/src/lib/content/mock-projects/01-first-project/01-first-lesson/01-introduction.md",
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
                  "next_stage_location": {
                    "lesson": "01-first-lesson",
                    "project": "01-first-project",
                    "stage": "02-simplfy-into-class",
                  },
                  "previous_stage_location": null,
                  "title": {
                    "en": "Introduction",
                    "zh-TW": "介紹",
                  },
                },
                "02-simplfy-into-class": {
                  "directory": "/src/lib/content/mock-projects/01-first-project/01-first-lesson/02-simplfy-into-class.md",
                  "file_to_focus": "/src/routes/+page.svelte",
                  "initial_url": undefined,
                  "location": {
                    "lesson": "01-first-lesson",
                    "project": "01-first-project",
                    "stage": "02-simplfy-into-class",
                  },
                  "markdown": "I have frontmatter with a comment and here we are going to simplify the styles into a class:

      [[src/routes/+page.svelte#04]]",
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
                  "title": {
                    "en": "Foo",
                    "zh-TW": "福",
                  },
                },
                "03-another": {
                  "directory": "/src/lib/content/mock-projects/01-first-project/01-first-lesson/03-another.md",
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
                  "title": {
                    "en": "change",
                    "zh-TW": "change",
                  },
                },
              },
              "slug": "01-first-lesson",
              "steps_files": {
                "src/routes/+page.svelte": "reTypewriter Snapshots v1

      --01----------

      --02----------
      <script lang=\\"ts\\">
      	// import '../global.css';
      </script>
      --03----------
      <script lang=\\"ts\\">
      	// import '../global.css';
      </script>

      <div style=\\"display: flex; flex-direction: column; height: 100%;\\">
      </div>

      --04----------
      <script lang=\\"ts\\">
      	// import '../global.css';
      </script>

      <div class=\\"simplify\\">
      </div>

      --------------
      ",
              },
            },
            "02-second-lesson": {
              "app_start": {
                ".env": "PUBLIC_FOO=hello",
                ".env.local": "BAZ=world",
                ".gitignore": "!.env*",
                "package.txt": "root level",
                "src/a.txt": "I'm shared by all lessons in the first projects, but should be overwritten in the first project by it's common \`a.txt\` file, but I should be in the first project's 2nd lesson.",
                "src/b.txt": "I'm shared by all lessons in this project.",
                "src/c.txt": "I'm shared by all projects and should show up.",
                "src/routes/+page.svelte": "I'm a simple page with nothing that will be added to me.",
              },
              "meta": {
                "title": {
                  "en": "2nd lesson",
                  "zh-TW": "第2課",
                },
              },
              "raw_stages": {
                "01-introduction": {
                  "directory": "/src/lib/content/mock-projects/01-first-project/02-second-lesson/01-introduction.md",
                  "file_to_focus": undefined,
                  "initial_url": undefined,
                  "location": {
                    "lesson": "02-second-lesson",
                    "project": "01-first-project",
                    "stage": "01-introduction",
                  },
                  "markdown": "1st project, 2nd lesson, 1st stage; no frills",
                  "next_stage_location": {
                    "lesson": "01-first-lesson-in-2nd-project",
                    "project": "02-second-project",
                    "stage": "01-2nd-project-1st-lesson-1st-stage",
                  },
                  "previous_stage_location": {
                    "lesson": "01-first-lesson",
                    "project": "01-first-project",
                    "stage": "03-another",
                  },
                  "title": {
                    "en": "Introduction",
                    "zh-TW": "介紹",
                  },
                },
              },
              "slug": "02-second-lesson",
              "steps_files": {},
            },
          },
          "meta": {
            "directory_to_show": "src",
            "title": {
              "en": "First Project",
              "zh-TW": "第一個專案",
            },
          },
          "slug": "01-first-project",
        },
        "02-second-project": {
          "lessons": {
            "01-first-lesson-in-2nd-project": {
              "app_start": {
                ".gitignore": "node_modules",
                "package.txt": "root level",
                "src/a.txt": "I'm shared by all projects, but should be overwritten in the first project by it's common \`a.txt\` and it's first lesson's \`a.txt\` file.",
                "src/b.txt": "I'm shared by all projects, but should be overwritten in the first project by it's common \`b.txt\` file. I'll be in the 2nd project though.",
                "src/c.txt": "I'm shared by all projects and should show up.",
              },
              "meta": {
                "title": {
                  "en": "change",
                  "zh-TW": "change",
                },
              },
              "raw_stages": {
                "01-2nd-project-1st-lesson-1st-stage": {
                  "directory": "/src/lib/content/mock-projects/02-second-project/01-first-lesson-in-2nd-project/01-2nd-project-1st-lesson-1st-stage.md",
                  "file_to_focus": undefined,
                  "initial_url": undefined,
                  "location": {
                    "lesson": "01-first-lesson-in-2nd-project",
                    "project": "02-second-project",
                    "stage": "01-2nd-project-1st-lesson-1st-stage",
                  },
                  "markdown": "I'm the first stage in the 2nd project's first lesson.",
                  "next_stage_location": null,
                  "previous_stage_location": {
                    "lesson": "02-second-lesson",
                    "project": "01-first-project",
                    "stage": "01-introduction",
                  },
                  "title": {
                    "en": "change",
                    "zh-TW": "change",
                  },
                },
              },
              "slug": "01-first-lesson-in-2nd-project",
              "steps_files": {},
            },
          },
          "meta": {
            "directory_to_show": "src",
            "title": {
              "en": "My Project",
              "zh-TW": "我的專案",
            },
          },
          "slug": "02-second-project",
        },
      }
    `);
  });
});

