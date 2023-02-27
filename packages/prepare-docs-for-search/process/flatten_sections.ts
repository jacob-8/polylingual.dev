import { Section } from "../types";

export function flatten_sections(sections: Section[], parent_titles: string[] = []): Section[] {
  return sections.reduce((acc, section) => {
    const { title, children, ...rest } = section;
    const section_titles = title ? [...parent_titles, title] : parent_titles;
    if (rest.content) acc.push({ ...rest, title: section_titles.join(' > ') });
    if (children) {
      acc.push(...flatten_sections(children, section_titles));
    }
    return acc;
  }, [] as Section[]);
};

if (import.meta.vitest) {
  describe('flatten_sections', () => {
    test('returns an array with sections flattened when given an array with sections with children and concats titles', () => {
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
          title: 'Section 1 > Section 1.1',
          content: 'Section 1.1 content',
        },
        {
          title: 'Section 1 > Section 1.2',
          content: 'Section 1.2 content',
        },
        {
          title: 'Section 1 > Section 1.2 > Section 1.2.1',
          content: 'Section 1.2.1 content',
        },
        {
          title: 'Section 2',
          content: 'Section 2 content',
        },
      ]);
    });

    test('does not add section if it has no content', () => {
      const sections: Section[] = [];
      const result = flatten_sections(sections);
      expect(result).toEqual([]);
    });

    test('returns an empty array when given an empty array', () => {
      const sections: Section[] = [{ title: 'No Content', content: '', },];
      expect(flatten_sections(sections)).toEqual([]);
    });
  });
}