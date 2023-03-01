import type { DocSectionData } from "./+server";
import type { Embedding } from "./find_closest_embeddings";

import { parse } from 'csv-parse/sync';

export async function load_docs_and_embeddings(documentation_site: string, svelte_kit_fetch: typeof fetch): Promise<{ doc_sections: DocSectionData[], doc_embeddings: Embedding[] }> {
  const folder = `/docs_with_embeddings/${documentation_site}`;
  const content_url = `${folder}/content.csv`;
  const embeddings_url = `${folder}/embeddings.csv`;

  const doc_sections = await fetch_csv<DocSectionData>(content_url, svelte_kit_fetch);
  const doc_embeddings = await fetch_csv<Embedding>(embeddings_url, svelte_kit_fetch);

  return {
    doc_sections,
    doc_embeddings,
  }
}

export async function fetch_csv<T>(url: string, svelte_kit_fetch: typeof fetch): Promise<T[]> {
  const response = await svelte_kit_fetch(url); // simpler fetching when using relative URLS without have to create a real fetch request on the server to itself
  const csv = await response.text();
  const rows = parse(csv, { columns: true, skip_empty_lines: true, cast: true }) as T[];
  const rows_with_proper_arrays = rows.map(row => {
    if (row.values) {
      row.values = JSON.parse(row.values)
    }
    return row;
  })
  return rows_with_proper_arrays;
}
