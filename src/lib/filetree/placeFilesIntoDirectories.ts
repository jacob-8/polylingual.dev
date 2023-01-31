import type { Directory } from "$lib/types";

export function placeFilesIntoDirectories(files: Record<string, string>): Directory {
  const rootDirectory: Directory = { directories: {}, filenames: [] };

  for (const filepath in files) {
    let currentDirectory = rootDirectory;
    const { directoryNames, filename } = extractDirectoryNamesFromFilepath(filepath);
    for (const directoryName of directoryNames) {
      if (!currentDirectory.directories[directoryName]) {
        currentDirectory.directories[directoryName] = { directories: {}, filenames: [] };
      }
      currentDirectory = currentDirectory.directories[directoryName];
    }
    currentDirectory.filenames.push(filename);
  }
  return rootDirectory;
}

export function extractDirectoryNamesFromFilepath(filepath: string): { directoryNames: string[], filename: string } {
  const parts = filepath.split('/');
  const filename = parts.pop() as string;
  return {
    directoryNames: parts,
    filename
  }
}

export function zoomIntoScope(rootDirectory: Directory, directoryPath: string): Directory {
  const directoryNames = directoryPath.split('/')
  const directoriesWithName = directoryNames.filter(d => d !== '');
  if (directoriesWithName.length === 0) return rootDirectory;
  let currentDirectory = rootDirectory;
  for (const directory of directoriesWithName) {
    currentDirectory = currentDirectory.directories[directory];
  }
  return currentDirectory;
}
