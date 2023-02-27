import { add_hashes } from "./process/add_hashes";
import { flatten_sections } from "./process/flatten_sections";
import { process_docs } from "./process/process_docs";
import { write_doc_data_csv, write_doc_embeddings_csv } from "./process/write";
import { ProcessedDoc } from "./types";
import { add_tokens } from "./process/add_tokens";
import { get_embeddings } from "./process/get_embeddings";

const directory = 'docs/sveltejs.kit/docs/10-getting-started';
const docs_nested_sections = await process_docs(directory);

const docs_flattened_sections: ProcessedDoc[] = docs_nested_sections.map(doc => {
  const flattened_sections = flatten_sections(doc.sections);
  const with_checksums = add_hashes(flattened_sections);
  const with_tokens = add_tokens(with_checksums);
  return {
    ...doc,
    sections: with_tokens,
  }
});

write_doc_data_csv(docs_flattened_sections);

const docs_flattened_and_embedded_sections: ProcessedDoc[] = await Promise.all(docs_flattened_sections.map(async doc => {
  const sections_with_embeddings = await get_embeddings(doc.sections);

  return {
    ...doc,
    sections: sections_with_embeddings,
  }
}));

write_doc_embeddings_csv(docs_flattened_and_embedded_sections);

