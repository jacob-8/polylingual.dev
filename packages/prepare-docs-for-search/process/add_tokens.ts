import { GPT3Tokenizer } from './tokenizer'
import { Section } from '../types';

export function add_tokens(sections: Section[]): Section[] {
  return sections.map(section => {
    const token_count = count_tokens(section.content);
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
          content: 'Section 1 content',
        },
        {
          content: 'Section 2 content that is a little bit longer than the first section',
        },
      ];
      const result = add_tokens(sections);
      expect(result).toMatchInlineSnapshot(`
        [
          {
            "content": "Section 1 content",
            "token_count": 3,
          },
          {
            "content": "Section 2 content that is a little bit longer than the first section",
            "token_count": 13,
          },
        ]
      `);
    });
  });
}