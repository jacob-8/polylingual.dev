import type { DocSectionData } from "./+server";
import type { CosineMatch } from "./find_closest_embeddings";

const ACCEPTABLE_SIMILARITY_PERCENTAGE = 70;

// TODO: split into two functions
export function map_nearest_embeddings_to_documents(nearest_matches: CosineMatch[], doc_sections: DocSectionData[], acceptable_similarity = ACCEPTABLE_SIMILARITY_PERCENTAGE): DocSectionData[] {
  const documents: DocSectionData[] = [];
  for (const match of nearest_matches) {
    if (match.similarity * 100 > acceptable_similarity) {
      const corresponding_section = doc_sections.find(section => section.hash === match.embedding.hash);
      if (corresponding_section)
        documents.push(corresponding_section);
    }
  }
  return documents;
}