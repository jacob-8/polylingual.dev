import { generate_embedding } from "../embeddings/generate_embedding";
import { Section } from "../types";

export async function get_embeddings(sections: Section[]): Promise<Section[]> {
  try {
    const sections_with_embeddings: Section[] = await Promise.all(sections.map(async section => {
      return {
        ...section,
        embedding: await generate_embedding(section.title + ': ' + section.content),
      }
    }));
    return sections_with_embeddings;
  } catch (error) {
    console.log(error);
    return [];
  }
}