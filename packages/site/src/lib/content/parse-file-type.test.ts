import { parseFileType } from "./parse-file-type";

describe('parseFileType', () => {
  test('common-app: svelte config', () => {
    const path = "common/svelte.config.js";
    expect(parseFileType(path)).toMatchInlineSnapshot(`
      {
        "lesson": "",
        "name": "svelte.config.js",
        "project": "",
        "type": "common-app",
      }
    `);
  });

  test('common-app: page file', () => {
    const path = "common/src/routes/+page.svelte";
    expect(parseFileType(path)).toMatchInlineSnapshot(`
      {
        "lesson": "",
        "name": "src/routes/+page.svelte",
        "project": "",
        "type": "common-app",
      }
    `);
  });

  test('project-meta', () => {
    const path = "01-language-learning-reader/meta.json";
    expect(parseFileType(path)).toMatchInlineSnapshot(`
      {
        "lesson": "",
        "name": "meta",
        "project": "01-language-learning-reader",
        "type": "project-meta",
      }
    `);
  });

  test('lesson-meta', () => {
    const path = "01-language-learning-reader/01-proof-of-concept/meta.json";
    expect(parseFileType(path)).toMatchInlineSnapshot(`
      {
        "lesson": "01-proof-of-concept",
        "name": "meta",
        "project": "01-language-learning-reader",
        "type": "lesson-meta",
      }
    `);
  });

  test('project-common-app', () => {
    const path = "01-language-learning-reader/common/src/routes/data/foo.json";
    expect(parseFileType(path)).toMatchInlineSnapshot(`
      {
        "lesson": "",
        "name": "src/routes/data/foo.json",
        "project": "01-language-learning-reader",
        "type": "project-common-app",
      }
    `);
  });

  test('lesson-app', () => {
    const path = "01-language-learning-reader/01-proof-of-concept/app/src/routes/+page.svelte";
    expect(parseFileType(path)).toMatchInlineSnapshot(`
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
    expect(parseFileType(path)).toMatchInlineSnapshot(`
      {
        "lesson": "01-proof-of-concept",
        "name": "src/routes/+page.svelte",
        "project": "01-language-learning-reader",
        "type": "lesson-steps",
      }
    `);
  });

  test('stage-markdown', () => {
    const path = "01-language-learning-reader/01-proof-of-concept/01-introduction.md";
    expect(parseFileType(path)).toMatchInlineSnapshot(`
      {
        "lesson": "01-proof-of-concept",
        "name": "01-introduction",
        "project": "01-language-learning-reader",
        "type": "stage-markdown",
      }
    `);
  });

  test('throws error upon incorrect file', () => {
    const path = "random.bogus";
    expect(() => parseFileType(path)).toThrow(new Error('Could not parse file: ' + path));
  });
});

