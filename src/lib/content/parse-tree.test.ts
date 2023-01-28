import { parseFile } from "./parse-tree";

// describe('getProjectNameFromMetaJsonPath', () => {
//   test('returns project name', () => {
//     const path = "01-language-reader/meta.json";
//     expect(getProjectNameFromMetaJsonPath(path)).toBe('01-language-reader');
//   });

//   test('does not capture lesson name', () => {
//     const path = "01-language-reader/01-lesson/meta.json";
//     expect(getProjectNameFromMetaJsonPath(path)).toBe(null);
//   });

// });

// test('getLessonAndProjectNameFromMetaJsonPath returns project and lesson name', () => {
//   const path = "01-language-reader/01-lesson/meta.json";
//   expect(getLessonAndProjectNameFromMetaJsonPath(path)).toMatchInlineSnapshot('"01-language-reader/01-lesson"');
// });

describe('parseFile', () => {
  test('common-app: svelte config', () => {
    const path = "common/svelte.config.js";
    expect(parseFile(path)).toMatchInlineSnapshot(`
      {
        "name": "svelte.config.js",
        "type": "common-app",
      }
    `);
  });

  test('common-app: page file', () => {
    const path = "common/src/routes/+page.svelte";
    expect(parseFile(path)).toMatchInlineSnapshot(`
      {
        "name": "src/routes/+page.svelte",
        "type": "common-app",
      }
    `);
  });

  test('project-meta', () => {
    const path = "01-language-learning-reader/meta.json";
    expect(parseFile(path)).toMatchInlineSnapshot(`
      {
        "project": "01-language-learning-reader",
        "type": "project-meta",
      }
    `);
  });

  test('lesson-meta', () => {
    const path = "01-language-learning-reader/01-proof-of-concept/meta.json";
    expect(parseFile(path)).toMatchInlineSnapshot(`
      {
        "lesson": "01-proof-of-concept",
        "project": "01-language-learning-reader",
        "type": "lesson-meta",
      }
    `);
  });

  test('project-common-app', () => {
    const path = "01-language-learning-reader/common/src/routes/data/foo.json";
    expect(parseFile(path)).toMatchInlineSnapshot(`
      {
        "name": "src/routes/data/foo.json",
        "project": "01-language-learning-reader",
        "type": "project-common-app",
      }
    `);
  });

  test('lesson-app', () => {
    const path = "01-language-learning-reader/01-proof-of-concept/app/src/routes/+page.svelte";
    expect(parseFile(path)).toMatchInlineSnapshot(`
      {
        "lesson": "01-proof-of-concept",
        "name": "src/routes/+page.svelte",
        "project": "01-language-learning-reader",
        "type": "lesson-app",
      }
    `);
  });

  test('lesson-steps', () => {
    const path = "01-language-learning-reader/01-proof-of-concept/app/src/routes/+page.svelte.retypewriter";
    expect(parseFile(path)).toMatchInlineSnapshot(`
      {
        "lesson": "01-proof-of-concept",
        "name": "src/routes/+page.svelte",
        "project": "01-language-learning-reader",
        "type": "lesson-steps",
      }
    `);
  });

  test('page-markdown', () => {
    const path = "01-language-learning-reader/01-proof-of-concept/01-introduction.md";
    expect(parseFile(path)).toMatchInlineSnapshot(`
      {
        "lesson": "01-proof-of-concept",
        "name": "01-introduction",
        "project": "01-language-learning-reader",
        "type": "page-markdown",
      }
    `);
  });

  test('throws error upon incorrect file', () => {
    const path = "random.bogus";
    expect(() => parseFile(path)).toThrow(new Error('Could not parse file: ' + path));
  });
});

