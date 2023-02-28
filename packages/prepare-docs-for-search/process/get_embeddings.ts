import { generate_embedding } from "../embeddings/generate_embedding";
import { Section } from "../types";

export async function get_embeddings(sections: Section[]): Promise<Section[]> {
  const sections_with_embeddings: Section[] = [];
  for (const section of sections) {
    let embedding = [];
    try {
      embedding = await generate_embedding(combined_title_and_content(section.combined_title, section.content));
      console.log(`Embedded: ${section.combined_title}`)
    } catch (error) {
      embedding = ['Error on ' + section.combined_title]
      console.log(`Error on ${section.hash}, ${section.combined_title}: ${error}`);
    }
    sections_with_embeddings.push({
      ...section,
      embedding,
    })
    await sleep(2000)
  }

  return sections_with_embeddings;
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function combined_title_and_content(title: string, content: string): string {
  return title + ': ' + content;
}

if (import.meta.vitest) {
  test('combined_title_and_content', () => {
    expect(combined_title_and_content('Title', 'Content')).toEqual('Title: Content');
  });
}
