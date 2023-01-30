import type { Tree } from "$lib/types";
import { extractDirectoriesFromFilepath, placeFilesIntoDirectories, zoomIntoScope } from "./placeFilesIntoDirectories";

describe('placeFilesIntoDirectories', () => {
  const files: Record<string, string> = {
    "package.txt": "root level",
    "src/a.txt": "a",
    "src/b.txt": "b",
    "src/folder/c.txt": "c",
    "src/folder/another/d.txt": "d",
    "src/routes/+page.svelte": "route file",
  }
  test('receives files and passes back the same', () => {
    expect(placeFilesIntoDirectories(files)).toMatchInlineSnapshot(`
      {
        "package.txt": "root level",
        "src": {
          "a.txt": "a",
          "b.txt": "b",
          "folder": {
            "another": {
              "d.txt": "d",
            },
            "c.txt": "c",
          },
          "routes": {
            "+page.svelte": "route file",
          },
        },
      }
    `);
  });

  // a file needs to be named by it's name but emit it's path when clicked (should that be calculated here or just a passed in property?)

  // heeds depth by hiding outer directories
});

describe('extractDirectoriesFromFilepath', () => {
  test('return object with directories and name', () => {
    const filepath = 'src/a/b/c.txt';
    const expected = {
      "directories": ['src', 'a', 'b'],
      "name": 'c.txt'
    }
    expect(extractDirectoriesFromFilepath(filepath)).toStrictEqual(expected);
  });
  test('returns empty directories array if root level', () => {
    expect(extractDirectoriesFromFilepath('root.txt')).toStrictEqual({
      "directories": [],
      "name": 'root.txt'
    });
  });
});

describe('zoomIntoScope', () => {
  const tree: Tree = {
    "package.txt": "root level",
    "src": {
      "a.txt": "a",
      "b.txt": "b",
      "folder": {
        "another": {
          "d.txt": "d",
        },
        "c.txt": "c",
      },
      "routes": {
        "+page.svelte": "route file",
      },
    },
  }
  test('2 folders zoomed', () => {
    expect(zoomIntoScope(tree, 'src/folder')).toMatchInlineSnapshot(`
    {
      "another": {
        "d.txt": "d",
      },
      "c.txt": "c",
    }
    `);
  });
  test('trailing slash makes no difference', () => {
    expect(zoomIntoScope(tree, 'src/folder/')).toMatchInlineSnapshot(`
      {
        "another": {
          "d.txt": "d",
        },
        "c.txt": "c",
      }
    `);
  });
  test('1 folder zoomed (src is default)', () => {
    expect(zoomIntoScope(tree, 'src')).toMatchInlineSnapshot(`
      {
        "a.txt": "a",
        "b.txt": "b",
        "folder": {
          "another": {
            "d.txt": "d",
          },
          "c.txt": "c",
        },
        "routes": {
          "+page.svelte": "route file",
        },
      }
    `);
  });
  test('no zoom, root folder', () => {
    expect(zoomIntoScope(tree, '')).toMatchInlineSnapshot(`
      {
        "package.txt": "root level",
        "src": {
          "a.txt": "a",
          "b.txt": "b",
          "folder": {
            "another": {
              "d.txt": "d",
            },
            "c.txt": "c",
          },
          "routes": {
            "+page.svelte": "route file",
          },
        },
      }
    `);
  });
});


