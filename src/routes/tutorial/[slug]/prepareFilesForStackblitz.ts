import type { Stub } from "$lib/types";
import type { ProjectFiles } from "@stackblitz/sdk";

export function prepareFilesForStackblitz(fileStubs: Stub[]): ProjectFiles {
  const files: ProjectFiles = {};

  for (const file of fileStubs) {
    if (file.type === "file") {
      files[removeLeadingSlash(file.name)] = file.contents;
    }
  };

  return files;
}

function removeLeadingSlash(path: string) {
  return path.replace(/^\/+/, '');
}

if (import.meta.vitest) {
  test('prepareFilesForStackblitz', () => {
    const fileStubs: Stub[] = [
      {
        name: "/src/README.md",
        contents: 'foo',
        type: "file",
        text: true,
        basename: "README.md"
      },
      {
        name: "src/see-if-works-without-leading-slash.md",
        contents: 'food',
        type: "file",
        text: true,
        basename: "slash.md"
      },
    ]

    expect(prepareFilesForStackblitz(fileStubs)).toMatchInlineSnapshot(`
      {
        "src/README.md": "foo",
        "src/see-if-works-without-leading-slash.md": "food",
      }
    `);
  });
}