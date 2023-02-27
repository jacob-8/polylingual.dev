import { generate_embedding } from "../embeddings/generate_embedding";
import { Section } from "../types";

export async function get_embeddings(sections: Section[]): Promise<Section[]> {
  try {
    const sections_with_embeddings: Section[] = await Promise.all(sections.map(async section => {
      return {
        ...section,
        embedding: await generate_embedding(combined_title_and_content(section.combined_title, section.content)),
      }
    }));
    return sections_with_embeddings;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export function combined_title_and_content(title: string, content: string): string {
  return title + ': ' + content;
}

if (import.meta.vitest) {
  test('combined_title_and_content', () => {
    expect(combined_title_and_content('Title', 'Content')).toEqual('Title: Content');
  });
}
