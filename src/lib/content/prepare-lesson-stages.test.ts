import { prepareLessonStages } from "./prepare-lesson-stages";

describe('prepareLessonStages', () => {
  test('basic', () => {
    expect(prepareLessonStages({
      projects: {
        'project-1': {
          lessons: {
            'lesson-1': {
              app_start: {
                'app.ts': `import { writable } from 'svelte/store';\n\nexport const name = writable('world');`,
                'index.html': `<script type="module">\n  import App from './App.svelte';\n  new App({\n    target: document.body,\n  });\n</script>\n\n<h1>Hello {name}</h1>`,
              },
              steps_files: {
                '01': 'app.ts',
                '02': 'index.html',
              },
              stages: {
                'stage-1': {
                  location: {
                    project: 'project-1',
                    lesson: 'lesson-1',
                    name: 'stage-1',
                  },
                  markdown: `# Stage 1`
                },
              }
            },
          },
        },
      },
      project: 'project-1',
      lesson: 'lesson-1',
    })).toMatchInlineSnapshot(`
      {
        "app_start": {
          "app.ts": "import { writable } from 'svelte/store';

      export const name = writable('world');",
          "index.html": "<script type=\\"module\\">
        import App from './App.svelte';
        new App({
          target: document.body,
        });
      </script>

      <h1>Hello {name}</h1>",
        },
        "stages": {
          "stage-1": {
            "location": {
              "lesson": "lesson-1",
              "name": "stage-1",
              "project": "project-1",
            },
            "markdown": "# Stage 1",
          },
        },
        "steps_files": {
          "01": "app.ts",
          "02": "index.html",
        },
      }
    `);
  });
})