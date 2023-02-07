import type { StageFiles } from "$lib/types";

export function filesNotInTarget({ take, compareTo }: { take: StageFiles, compareTo: StageFiles }): string[] {
  const given = Object.keys(take);
  const goal = Object.keys(compareTo);
  const shortFall = goal.filter((path) => !given.includes(path));
  return shortFall
}

if (import.meta.vitest) {
  describe('filesNotInTarget', () => {
    test('returns missing filepath when calculating add for finish', () => {
      const current = { 'a.txt': '' };
      const finish = { 'a.txt': '', 'b.txt': '' };
      expect(filesNotInTarget({ take: current, compareTo: finish })).toEqual(['b.txt']);
    });

    test('handles empty finish when calculating add', () => {
      const current = { 'a.txt': '' };
      const finish = {};
      expect(filesNotInTarget({ take: current, compareTo: finish })).toEqual([]);
    });

    test('returns extra filepath when calculating delete', () => {
      const current = { 'a.txt': '', 'b.txt': '' };
      const finish = { 'a.txt': '' };
      expect(filesNotInTarget({ take: finish, compareTo: current })).toEqual(['b.txt']);
    });

    test('handles empty finish when calculating delete', () => {
      const current = { 'a.txt': '' };
      const finish = {};
      expect(filesNotInTarget({ take: finish, compareTo: current })).toEqual(['a.txt']);
    });

    test('handles nothing to delete (empty beginning)', () => {
      const current = {};
      const finish = { 'a.txt': '' };
      expect(filesNotInTarget({ take: finish, compareTo: current })).toEqual([]);
    });
  });
}


