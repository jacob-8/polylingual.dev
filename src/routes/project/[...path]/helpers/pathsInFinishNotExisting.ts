import type { StageFiles } from "$lib/types";

export function pathsInFinishNotExisting(current: StageFiles, finish: StageFiles): string[] {
  const currentPaths = Object.keys(current);
  const finishPaths = Object.keys(finish);
  const missingPaths = finishPaths.filter((path) => !currentPaths.includes(path));
  return missingPaths
}

if (import.meta.vitest) {
  describe('pathsInFinishNotExisting', () => {
    test('return missing filepath', () => {
      const current = { 'a.txt': '' };
      const finish = { 'a.txt': '', 'b.txt': '' };
      expect(pathsInFinishNotExisting(current, finish)).toEqual(['b.txt']);
    });
    
    test('handles empty finish', () => {
      const current = { 'a.txt': '' };
      const finish = { };
      expect(pathsInFinishNotExisting(current, finish)).toEqual([]);
    });
  });
}

export function currentPathsNotInFinish(current: StageFiles, finish: StageFiles): string[] {
  const currentPaths = Object.keys(current);
  const finishPaths = Object.keys(finish);
  const extraPaths = currentPaths.filter((path) => !finishPaths.includes(path));
  return extraPaths
}

if (import.meta.vitest) {
  describe('currentPathsNotInFinish', () => {
    test('return extra filepath', () => {
      const current = { 'a.txt': '', 'b.txt': '' };
      const finish = { 'a.txt': '' };
      expect(currentPathsNotInFinish(current, finish)).toEqual(['b.txt']);
    });
    
    test('handles empty finish', () => {
      const current = { 'a.txt': '' };
      const finish = { };
      expect(currentPathsNotInFinish(current, finish)).toEqual(['a.txt']);
    });
    
    test('handles nothing to delete', () => {
      const current = { };
      const finish = { 'a.txt': '' };
      expect(currentPathsNotInFinish(current, finish)).toEqual([]);
    });
  });
}


