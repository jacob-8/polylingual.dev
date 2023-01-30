import type { Tree } from "$lib/types";

export function placeFilesIntoDirectories(files: Record<string, string>): Tree {
  const tree: Tree = {};
  for (const filepath in files) {
    const { directories, name } = extractDirectoriesFromFilepath(filepath);
    let current = tree;
    for (const directory of directories) {
      if (!current[directory]) {
        current[directory] = {};
      }
      current = current[directory] as Tree;
    }
    current[name] = files[filepath];
  }
  return tree;
}

export function extractDirectoriesFromFilepath(filepath: string): { directories: string[], name: string } {
  const parts = filepath.split('/');
  const name = parts.pop() as string;
  return {
    directories: parts,
    name
  }
}

export function zoomIntoScope(tree: Tree, directory: string): Tree {
  const directories = directory.split('/')
  const directoriesWithName = directories.filter(d => d !== '');
  if (directoriesWithName.length === 0) return tree;
  let currentDirectory = tree;
  for (const directory of directoriesWithName) {
    currentDirectory = currentDirectory[directory] as Tree;
  }
  return currentDirectory;
}