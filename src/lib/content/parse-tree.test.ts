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
              "name": "01-first-lesson",
              "stages": {
                "01-introduction": {
                  "app_finish": {},
                  "app_start": {},
                  "directory": "/src/lib/content/mock-projects/01-first-project/01-first-lesson/01-introduction.md",
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
                  "meta": {
                    "scope": {
                      "directory": "src",
                    },
                  },
                  "next_stage_location": {
                    "lesson": "01-first-lesson",
                    "name": "02-simplfy-into-class",
                    "project": "01-first-project",
                  },
                  "previous_stage_location": null,
                  "steps": {},
                },
                "02-simplfy-into-class": {
                  "app_finish": {},
                  "app_start": {},
                  "directory": "/src/lib/content/mock-projects/01-first-project/01-first-lesson/02-simplfy-into-class.md",
                  "file_to_focus": "/src/routes/+page.svelte",
                  "initial_url": undefined,
                  "location": {
                    "lesson": "01-first-lesson",
                    "name": "02-simplfy-into-class",
                    "project": "01-first-project",
                  },
                  "markdown": "I have frontmatter with a comment and here we are going to simplify the styles into a class:

      [[src/routes/+page.svelte#04]]",
                  "meta": {
                    "scope": {
                      "directory": "src",
                    },
                  },
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
                  "directory": "/src/lib/content/mock-projects/01-first-project/01-first-lesson/03-another.md",
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
                  "meta": {
                    "scope": {
                      "directory": "src",
                    },
                  },
                  "next_stage_location": {
                    "lesson": "02-second-lesson",
                    "name": "01-introduction",
                    "project": "01-first-project",
                  },
                  "previous_stage_location": {
                    "lesson": "01-first-lesson",
                    "name": "02-simplfy-into-class",
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
                "package.txt": "root level",
                "src/a.txt": "I'm shared by all lessons in the first projects, but should be overwritten in the first project by it's common \`a.txt\` file, but I should be in the first project's 2nd lesson.",
                "src/b.txt": "I'm shared by all lessons in this project.",
                "src/c.txt": "I'm shared by all projects and should show up.",
                "src/routes/+page.svelte": "I'm a simple page with nothing that will be added to me.",
              },
              "name": "02-second-lesson",
              "stages": {
                "01-introduction": {
                  "app_finish": {},
                  "app_start": {},
                  "directory": "/src/lib/content/mock-projects/01-first-project/02-second-lesson/01-introduction.md",
                  "file_to_focus": undefined,
                  "initial_url": undefined,
                  "location": {
                    "lesson": "02-second-lesson",
                    "name": "01-introduction",
                    "project": "01-first-project",
                  },
                  "markdown": "1st project, 2nd lesson, 1st stage; no frills",
                  "meta": {
                    "scope": {
                      "directory": "src",
                    },
                  },
                  "next_stage_location": {
                    "lesson": "01-first-lesson-in-2nd-project",
                    "name": "01-2nd-project-1st-lesson-1st-stage",
                    "project": "02-second-project",
                  },
                  "previous_stage_location": {
                    "lesson": "01-first-lesson",
                    "name": "03-another",
                    "project": "01-first-project",
                  },
                  "steps": {},
                },
              },
              "steps_files": {},
            },
          },
          "meta": {
            "scope": {
              "directory": "src",
            },
          },
          "name": "01-first-project",
        },
        "02-second-project": {
          "lessons": {
            "01-first-lesson-in-2nd-project": {
              "app_start": {
                "package.txt": "root level",
                "src/a.txt": "I'm shared by all projects, but should be overwritten in the first project by it's common \`a.txt\` and it's first lesson's \`a.txt\` file.",
                "src/b.txt": "I'm shared by all projects, but should be overwritten in the first project by it's common \`b.txt\` file. I'll be in the 2nd project though.",
                "src/c.txt": "I'm shared by all projects and should show up.",
              },
              "name": "01-first-lesson-in-2nd-project",
              "stages": {
                "01-2nd-project-1st-lesson-1st-stage": {
                  "app_finish": {},
                  "app_start": {},
                  "directory": "/src/lib/content/mock-projects/02-second-project/01-first-lesson-in-2nd-project/01-2nd-project-1st-lesson-1st-stage.md",
                  "file_to_focus": undefined,
                  "initial_url": undefined,
                  "location": {
                    "lesson": "01-first-lesson-in-2nd-project",
                    "name": "01-2nd-project-1st-lesson-1st-stage",
                    "project": "02-second-project",
                  },
                  "markdown": "I'm the first stage in the 2nd project's first lesson.",
                  "meta": {
                    "scope": {
                      "directory": "src",
                    },
                  },
                  "next_stage_location": null,
                  "previous_stage_location": {
                    "lesson": "02-second-lesson",
                    "name": "01-introduction",
                    "project": "01-first-project",
                  },
                  "steps": {},
                },
              },
              "steps_files": {},
            },
          },
          "meta": {
            "scope": {
              "directory": "src",
            },
          },
          "name": "02-second-project",
        },
      }
    `);
  });
});

