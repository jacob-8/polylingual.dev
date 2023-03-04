import type { Directory } from "$lib/types";
import { extractDirectoryNamesFromFilepath, placeFilesIntoDirectories, zoomIntoScope } from "./placeFilesIntoDirectories";

const expectedDirectories: Directory = {
  filenames: ['package.json'],
  directories: {
    'src': {
      directories: {
        'folder': {
          filenames: ['c.txt'],
          directories: {
            'another': {
              filenames: ['d.txt'],
              directories: {},
            }
          },
        },
        'routes': {
          filenames: ['+page.svelte'],
          directories: {},
        }
      },
      filenames: ['a.txt', 'b.txt'],
    },
  },
}

describe('placeFilesIntoDirectories', () => {
  test('transforms files into a directory', () => {
    const files: Record<string, string> = {
      "package.json": "root level",
      "src/a.txt": "a",
      "src/b.txt": "b",
      "src/folder/c.txt": "c",
      "src/folder/another/d.txt": "d",
      "src/routes/+page.svelte": "route file",
    }
    expect(placeFilesIntoDirectories(files)).toEqual(expectedDirectories)
  });
});

describe('extractDirectoryNamesFromFilepath', () => {
  test('return object with directories and name', () => {
    const filepath = 'src/a/b/c.txt';
    const expected = {
      "directoryNames": ['src', 'a', 'b'],
      "filename": 'c.txt'
    }
    expect(extractDirectoryNamesFromFilepath(filepath)).toStrictEqual(expected);
  });
  test('returns empty directories array if root level', () => {
    expect(extractDirectoryNamesFromFilepath('root.txt')).toStrictEqual({
      "directoryNames": [],
      "filename": 'root.txt'
    });
  });
});

describe('zoomIntoScope', () => {
  test('2 folders zoomed', () => {
    expect(zoomIntoScope(expectedDirectories, 'src/folder')).toMatchInlineSnapshot(`
      {
        "directories": {
          "another": {
            "directories": {},
            "filenames": [
              "d.txt",
            ],
          },
        },
        "filenames": [
          "c.txt",
        ],
      }
    `);
  });
  test('trailing slash makes no difference', () => {
    expect(zoomIntoScope(expectedDirectories, 'src/folder/')).toMatchInlineSnapshot(`
      {
        "directories": {
          "another": {
            "directories": {},
            "filenames": [
              "d.txt",
            ],
          },
        },
        "filenames": [
          "c.txt",
        ],
      }
    `);
  });
  test('1 folder zoomed (src is default)', () => {
    expect(zoomIntoScope(expectedDirectories, 'src')).toMatchInlineSnapshot(`
      {
        "directories": {
          "folder": {
            "directories": {
              "another": {
                "directories": {},
                "filenames": [
                  "d.txt",
                ],
              },
            },
            "filenames": [
              "c.txt",
            ],
          },
          "routes": {
            "directories": {},
            "filenames": [
              "+page.svelte",
            ],
          },
        },
        "filenames": [
          "a.txt",
          "b.txt",
        ],
      }
    `);
  });
  test('no zoom, root folder', () => {
    expect(zoomIntoScope(expectedDirectories, '')).toMatchInlineSnapshot(`
      {
        "directories": {
          "src": {
            "directories": {
              "folder": {
                "directories": {
                  "another": {
                    "directories": {},
                    "filenames": [
                      "d.txt",
                    ],
                  },
                },
                "filenames": [
                  "c.txt",
                ],
              },
              "routes": {
                "directories": {},
                "filenames": [
                  "+page.svelte",
                ],
              },
            },
            "filenames": [
              "a.txt",
              "b.txt",
            ],
          },
        },
        "filenames": [
          "package.json",
        ],
      }
    `);
  });
});


