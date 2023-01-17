import type { ProjectFiles } from "@stackblitz/sdk";

export function filesWithChanges(currentFiles: ProjectFiles, updatedFiles: ProjectFiles): ProjectFiles {
  if (!currentFiles || !updatedFiles) return {};

  const filesWithChanges: ProjectFiles = {};
  for (const [key, value] of Object.entries(updatedFiles)) {
    if (currentFiles[key] !== value) {
      filesWithChanges[key] = value;
    }
  }
  return filesWithChanges;
}

if (import.meta.vitest) {
  test('filesWithChanges', () => {
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
        "index.svelte": "<h1>Welcome!</h1>",
      }
    `);
  });

  test('filesWithChanges handles undefined', () => {
    expect(filesWithChanges({}, {})).toMatchInlineSnapshot('{}');
  });
}