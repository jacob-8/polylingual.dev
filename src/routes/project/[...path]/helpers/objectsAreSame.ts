export function objectsAreSame(current: Record<string, string>, target: Record<string, string>): boolean {
  return normalize(JSON.stringify(current)) === normalize(JSON.stringify(target));
}

function normalize(code: string) {
  const whitespace = /\s+/g;
  const whiteSpaceRemoved = code.replace(whitespace, '');
  return whiteSpaceRemoved.replace(/;/g, '').trim();
}

if (import.meta.vitest) {
  describe('objectsAreSame', () => {
    test('ignores whitespace', () => {
      const current: Record<string, string> = {
        'src/index.ts': 'import { App } from "./lib/App";',
      };
      const target: Record<string, string> = {
        'src/index.ts': 'import {App} from "./lib/App"; ',
      };
      expect(objectsAreSame(current, target)).toBeTruthy();
    });

    test('ignores semicolons', () => {
      const current: Record<string, string> = {
        'src/index.ts': 'import { App } from "./lib/App";',
      };
      const target: Record<string, string> = {
        'src/index.ts': 'import { App } from "./lib/App"',
      };
      expect(objectsAreSame(current, target)).toBeTruthy();
    });

    test('returns false when content is different', () => {
      const current: Record<string, string> = {
        'src/index.ts': 'import { App } from "./lib/App";',
      };
      const target: Record<string, string> = {
        'src/index.ts': 'import { Sidebar } from "./lib/Sidebar";',
      };
      expect(objectsAreSame(current, target)).toBeFalsy();
    });
  });

}