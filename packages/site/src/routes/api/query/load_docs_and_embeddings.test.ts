import type { DocSectionData } from "./+server";
import type { Embedding } from "./find_closest_embeddings";

import { parse } from 'csv-parse/sync';

import { readFileSync } from 'fs';
import { fetch_csv } from "./load_docs_and_embeddings";
describe('fetch_csv', () => {
  function mock_fetch(response_text: string) {
    return Promise.resolve({
      text: () => Promise.resolve(response_text),
    });
  }

  test('basic', async () => {
    const csv_string = `
"key_1","key_2"
"value 1","value 2"
`;
    expect(await fetch_csv(csv_string, mock_fetch as typeof fetch)).toEqual([{ key_1: 'value 1', key_2: 'value 2' }]);
  });

  test('parsing content csv', async () => {
    const csv_string = readFileSync(`static/docs_with_embeddings/sveltejs.kit/docs/content.csv`, { encoding: 'utf-8' });
    const sections = await fetch_csv<DocSectionData>(csv_string, mock_fetch as typeof fetch);
    expect(sections[0]).toEqual({
      combined_title: "Introduction > Before we begin",
      content: `> If you're new to Svelte or SvelteKit we recommend checking out the (experimental!) [interactive tutorial](https://learn.svelte.dev).
>
> If you get stuck, reach out for help in the [Discord chatroom](https://svelte.dev/chat). `,
      filename: "/10-getting-started/10-introduction.md",
      hash: "5cdf68df",
      title: "Before we begin",
      token_count: 76,
    });
  });

  test('parsing embeddings into array of numbers', async () => {
    const csv_string = readFileSync(`static/docs_with_embeddings/sveltejs.kit/docs/embeddings.csv`, { encoding: 'utf-8' });
    const embeddings = await fetch_csv<Embedding>(csv_string, mock_fetch as typeof fetch);
    expect(embeddings[0].values.length).toBe(1536);
    expect(embeddings[0].values).toBeInstanceOf(Array);
    expect(typeof embeddings[0].values[0]).toBe('number');
  });
});

test('parse', () => {
  const input = `
"key_1","key_2"
"value 1","value 2"
`;
  const records = parse(input, {
    columns: true,
    skip_empty_lines: true
  });

  expect(records).toEqual([{ key_1: 'value 1', key_2: 'value 2' }]);
});
  // describe('load_docs_and_embeddings', () => {
  //   test('returns an object with sections and embeddings', () => {
  //     const path = 'foo';
  //     const expected: { doc_sections: DocSectionData[], doc_embeddings: Embedding[] } = {
  //       doc_sections: [],
  //       doc_embeddings: [],
  //     }
  //     expect(load_docs_and_embeddings(path)).toEqual(expected);
  //   });
  // });