// import { createHash } from 'crypto';
import { Section } from "../types";

export function add_hashes(sections: Section[]): Section[] {
  return sections.map(section => {
    // const checksum = createHash('sha256').update(section.content).digest('base64'); // too long
    const hash = murmurHash3(section.content);
    return {
      ...section,
      hash,
    }
  })
}

// useful for fast non-cryptographic hashing
function murmurHash3(str: string) {
  let h1 = 0xdeadbeef;
  const c1 = 0xcc9e2d51;
  const c2 = 0x1b873593;

  for (let i = 0; i < str.length; i++) {
    let k1 = str.charCodeAt(i);
    k1 *= c1;
    k1 = (k1 << 15) | (k1 >>> 17);
    k1 *= c2;

    h1 ^= k1;
    h1 = (h1 << 13) | (h1 >>> 19);
    h1 = h1 * 5 + 0xe6546b64;
  }

  h1 ^= str.length;
  h1 ^= h1 >>> 16;
  h1 *= 0x85ebca6b;
  h1 ^= h1 >>> 13;
  h1 *= 0xc2b2ae35;
  h1 ^= h1 >>> 16;

  return (h1 >>> 0).toString(16).substring(0, 8);
  // return h1.toString(36).substring(0, 10);
}

if (import.meta.vitest) {
  describe('flatten_sections', () => {
    test('returns an array with sections flattened when given an array with sections with children', () => {
      const sections: Section[] = [
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
      ];
      const result = add_hashes(sections);
      expect(result).toMatchInlineSnapshot(`
        [
          {
            "content": "Section 1 content",
            "hash": "dfbc6bbc",
            "title": "Section 1",
          },
          {
            "content": "Section 1.1 content",
            "hash": "4363a863",
            "title": "Section 1.1",
          },
          {
            "content": "Section 1.2 content",
            "hash": "10a7dd27",
            "title": "Section 1.2",
          },
          {
            "content": "Section 1.2.1 content",
            "hash": "d0684c68",
            "title": "Section 1.2.1",
          },
          {
            "content": "Section 2 content",
            "hash": "d73da83d",
            "title": "Section 2",
          },
        ]
      `);
    });
  });
}