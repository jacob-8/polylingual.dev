import { Section } from "../types";

export function flatten_sections(sections: Section[]): Section[] {
  return sections.reduce((acc, section) => {
    const { children, ...rest } = section;
    acc.push(rest);
    if (children) {
      acc.push(...flatten_sections(children));
    }
    return acc;
  }, [] as Section[]);
};

if (import.meta.vitest) {
  describe('flatten_sections', () => {
    test('returns an array with sections flattened when given an array with sections with children', () => {
      const sections: Section[] = [
        {
          title: 'Section 1',
          content: 'Section 1 content',
          children: [
            {
              title: 'Section 1.1',
              content: 'Section 1.1 content',
            },
            {
              title: 'Section 1.2',
              content: 'Section 1.2 content',
              children: [
                {
                  title: 'Section 1.2.1',
                  content: 'Section 1.2.1 content',
                },
              ],
            },
          ],
        },
        {
          title: 'Section 2',
          content: 'Section 2 content',
        },
      ];
      const result = flatten_sections(sections);
      expect(result).toEqual([
        {
          title: 'Section 1',
          content: 'Section 1 content',
        },
        {
          title: 'Section 1.1',
          content: 'Section 1.1 content',
        },
        {
          title: 'Section 1.2',
          content: 'Section 1.2 content',
        },
        {
          title: 'Section 1.2.1',
          content: 'Section 1.2.1 content',
        },
        {
          title: 'Section 2',
          content: 'Section 2 content',
        },
      ]);
    });

    test('returns an empty array when given an empty array', () => {
      const sections: Section[] = [];
      const result = flatten_sections(sections);
      expect(result).toEqual([]);
    });
  });
}