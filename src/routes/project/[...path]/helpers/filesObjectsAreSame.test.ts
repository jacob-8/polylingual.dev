import { filesObjectsAreSame } from "./filesObjectsAreSame";

describe('filesObjectsAreSame', () => {
  test('ignores whitespace', () => {
    const current: Record<string, string> = {
      'src/index.ts': 'import { App } from "./lib/App";',
    };
    const target: Record<string, string> = {
      'src/index.ts': 'import {App} from "./lib/App"; ',
    };
    expect(filesObjectsAreSame(current, target)).toBeTruthy();
  });
  
  test('ignores semicolons', () => {
    const current: Record<string, string> = {
      'src/index.ts': 'import { App } from "./lib/App";',
    };
    const target: Record<string, string> = {
      'src/index.ts': 'import { App } from "./lib/App"',
    };
    expect(filesObjectsAreSame(current, target)).toBeTruthy();
  });

  test('returns false when content is different', () => {
    const current: Record<string, string> = {
      'src/index.ts': 'import { App } from "./lib/App";',
    };
    const target: Record<string, string> = {
      'src/index.ts': 'import { Sidebar } from "./lib/Sidebar";',
    };
    expect(filesObjectsAreSame(current, target)).toBeFalsy();
  });
});


