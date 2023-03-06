import { GPT3Tokenizer } from './tokenizer'
import { Section } from '../types';
import { combined_title_and_content } from './get_embeddings';

export function add_tokens(sections: Section[]): Section[] {
  return sections.map(section => {
    const token_count = count_tokens(combined_title_and_content(section.combined_title, section.content));
    return {
      ...section,
      token_count,
    }
  })
}

const tokenizer = new GPT3Tokenizer({ type: 'gpt3' });

function count_tokens(text: string) {
  return tokenizer.encode(text).text.length;
}

if (import.meta.vitest) {
  describe('flatten_sections', () => {
    test('returns an array with sections flattened when given an array with sections with children', () => {
      const sections: Section[] = [
        {
          combined_title: 'Section 1',
          content: 'Section 1 content',
        },
        {
          combined_title: 'Section 2',
          content: 'Section 2 content that is a little bit longer than the first section',
        },
      ];
      const result = add_tokens(sections);
      expect(result).toMatchInlineSnapshot(`
        [
          {
            "combined_title": "Section 1",
            "content": "Section 1 content",
            "token_count": 6,
          },
          {
            "combined_title": "Section 2",
            "content": "Section 2 content that is a little bit longer than the first section",
            "token_count": 16,
          },
        ]
      `);
    });
  });
}