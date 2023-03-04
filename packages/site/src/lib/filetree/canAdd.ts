export function directoryPathIncludesAddableFilepath(directoryPath: string, can_add_paths: string[]): boolean {
  if (!can_add_paths || can_add_paths.length === 0) return false;
  for (const path of can_add_paths) {
    const can_add_path_directory = remove_last_item_from_path(path);
    if (can_add_path_directory === directoryPath) {
      return true;
    }
  }
  return false;
}

function remove_last_item_from_path(path: string): string {
  const split = path.split('/');
  split.pop();
  return split.join('/');
}

if (import.meta.vitest) {
  describe('directoryPathIncludesAddableFilepath', () => {
    test('handles src directory', () => {
      const directoryPath = 'src'
      const can_add_paths = ['src/global.css', 'src/routes/+page.svelte']
      expect(directoryPathIncludesAddableFilepath(directoryPath, can_add_paths)).toBeTruthy();
    });

    test('handles src/routes directory', () => {
      const directoryPath = 'src/routes'
      const can_add_paths = ['src/global.css', 'src/routes/+page.svelte']
      expect(directoryPathIncludesAddableFilepath(directoryPath, can_add_paths)).toBeTruthy();
    });

    test('handles adding subdirectories from which explain/+page.svelte file can be added', () => {
      const directoryPath = 'src/routes'
      const can_add_paths = ['src/routes/explain']
      expect(directoryPathIncludesAddableFilepath(directoryPath, can_add_paths)).toBeTruthy();
    });

    test('rejects if not in directory for which files are listed', () => {
      const directoryPath = 'src/routes'
      const can_add_paths = ['src/global.css']
      expect(directoryPathIncludesAddableFilepath(directoryPath, can_add_paths)).toBeFalsy();
    });

    test('rejects if no files listed', () => {
      const directoryPath = 'src/routes'
      const can_add_paths = null as unknown as string[]
      expect(directoryPathIncludesAddableFilepath(directoryPath, can_add_paths)).toBeFalsy();
      expect(directoryPathIncludesAddableFilepath(directoryPath, [])).toBeFalsy();
    });
  });
}

