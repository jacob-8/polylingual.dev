import type { ProjectFiles } from "@stackblitz/sdk";

export function filesWithChanges(currentFiles: ProjectFiles, updatedFiles: ProjectFiles): { filesToCreate: ProjectFiles, filenamesToDestroy: string[] } {
  const filesToCreate: ProjectFiles = {};
  const filenamesToDestroy: string[] = [];

  if (!currentFiles || !updatedFiles) return { filesToCreate, filenamesToDestroy };

  for (const [key, value] of Object.entries(updatedFiles)) {
    if (currentFiles[key] !== value) {
      filesToCreate[key] = value;
    }
  }
  for (const currentFilename of Object.keys(currentFiles)) {
    if (!updatedFiles[currentFilename]) filenamesToDestroy.push(currentFilename);
  }

  return { filesToCreate, filenamesToDestroy };
}

if (import.meta.vitest) {
  describe('filesWithChanges', () => {
    test('handles changed file', () => {
      const currentFiles: ProjectFiles = {
        'index.svelte': '<h1>Hello World</h1>',
        'main.ts': 'console.log("Hello World")',
      }
      const updatedFiles: ProjectFiles = {
        'index.svelte': '<h1>Welcome!</h1>',
        'main.ts': 'console.log("Hello World")',
      }

      expect(filesWithChanges(currentFiles, updatedFiles)).toMatchInlineSnapshot(`
        {
          "filenamesToDestroy": [],
          "filesToCreate": {
            "index.svelte": "<h1>Welcome!</h1>",
          },
        }
      `);
    });

    test('handles added file', () => {
      const currentFiles: ProjectFiles = {
        'index.svelte': '<h1>Hello World</h1>',
      }
      const updatedFiles: ProjectFiles = {
        'index.svelte': '<h1>Hello World</h1>',
        'main.ts': 'console.log("Hello World")',
      }

      expect(filesWithChanges(currentFiles, updatedFiles)).toMatchInlineSnapshot(`
        {
          "filenamesToDestroy": [],
          "filesToCreate": {
            "main.ts": "console.log(\\"Hello World\\")",
          },
        }
      `);
    });

    test('handles removed and changed files', () => {
      const currentFiles: ProjectFiles = {
        'index.svelte': '<h1>Hello World</h1>',
        'main.ts': 'console.log("Hello World")',
      }
      const updatedFiles: ProjectFiles = {
        'index.svelte': '<h1>Hello James</h1>',
      }

      expect(filesWithChanges(currentFiles, updatedFiles)).toMatchInlineSnapshot(`
        {
          "filenamesToDestroy": [
            "main.ts",
          ],
          "filesToCreate": {
            "index.svelte": "<h1>Hello James</h1>",
          },
        }
      `);
    });

    test('handles undefined', () => {
      expect(filesWithChanges(undefined as unknown as ProjectFiles, undefined as unknown as ProjectFiles)).toMatchInlineSnapshot(`
        {
          "filenamesToDestroy": [],
          "filesToCreate": {},
        }
      `);
    });
  });
}