import { createWriteStream } from 'fs';
import { stringify } from 'csv-stringify';
import { DocSectionData, DocSectionEmbedding, ProcessedDoc } from '../types';

export function write_doc_data_csv(docs: ProcessedDoc[]) {
  const data_columns: Array<keyof DocSectionData> = [
    'hash',
    'token_count',
    'title',
    'filename',
    'content',
  ];

  const writeable_stream = createWriteStream('output/doc_data.csv');
  const stringifier = stringify({ header: true, columns: data_columns });

  const sections = convert_docs_to_doc_section_data(docs);
  for (const section of sections) stringifier.write(section);

  stringifier.pipe(writeable_stream);
}

function convert_docs_to_doc_section_data(docs: ProcessedDoc[]): DocSectionData[] {
  const sections: DocSectionData[] = []
  for (const doc of docs) {
    for (const section of doc.sections) {
      sections.push({
        hash: section.hash,
        token_count: section.token_count,
        title: section.title,
        filename: doc.filename,
        content: section.content,
      });
    }
  }
  return sections;
}

if (import.meta.vitest) {
  describe('convert_docs_to_doc_section_data', () => {
    test('should convert an array of docs with multiple sections to an array of DocSectionData', () => {
      const docs: ProcessedDoc[] = [
        {
          filename: 'doc1.txt',
          sections: [
            {
              hash: 'abc123',
              token_count: 3,
              title: 'Section 1',
              content: 'This is section 1',
            },
            {
              hash: 'def456',
              token_count: 3,
              title: 'Section 2',
              content: 'This is section 2',
            },
          ],
        },
        {
          filename: 'doc2.txt',
          sections: [
            {
              hash: 'ghi789',
              token_count: 3,
              title: 'Section 3',
              content: 'This is section 3',
            },
          ],
        },
      ];
      const result = convert_docs_to_doc_section_data(docs);
      expect(result).toEqual([
        {
          hash: 'abc123',
          token_count: 3,
          title: 'Section 1',
          filename: 'doc1.txt',
          content: 'This is section 1',
        },
        {
          hash: 'def456',
          token_count: 3,
          title: 'Section 2',
          filename: 'doc1.txt',
          content: 'This is section 2',
        },
        {
          hash: 'ghi789',
          token_count: 3,
          title: 'Section 3',
          filename: 'doc2.txt',
          content: 'This is section 3',
        },
      ]);
    });

    test('should convert an empty array of docs to an empty array of DocSectionData', () => {
      const docs: ProcessedDoc[] = [];
      const result = convert_docs_to_doc_section_data(docs);
      expect(result).toEqual([]);
    });
  });
}

export function write_doc_embeddings_csv(docs: ProcessedDoc[]) {
  const embeddings_columns: Array<keyof DocSectionEmbedding> = [
    'hash',
    'embedding',
  ]

  const writeable_stream = createWriteStream('output/doc_embeddings.csv');
  const stringifier = stringify({ header: true, columns: embeddings_columns });

  const sections = convert_docs_to_doc_section_embedding(docs);
  for (const section of sections) stringifier.write(section);

  stringifier.pipe(writeable_stream);
}

function convert_docs_to_doc_section_embedding(docs: ProcessedDoc[]): DocSectionEmbedding[] {
  const sections: DocSectionEmbedding[] = []
  for (const doc of docs) {
    for (const section of doc.sections) {
      sections.push({
        hash: section.hash,
        embedding: section.embedding,
      });
    }
  }
  return sections;
}

if (import.meta.vitest) {
  test('convert_docs_to_doc_section_embedding', () => {
    const docs: ProcessedDoc[] = [
      {
        filename: 'doc1.txt',
        sections: [
          {
            hash: 'abc123',
            embedding: [0, 1, 1],
            content: 'This is section 1',
          },
          {
            hash: 'def456',
            embedding: [1, 0, 1],
            content: 'This is section 2',
          },
        ],
      },
      {
        filename: 'doc2.txt',
        sections: [
          {
            hash: 'ghi789',
            embedding: [1, 1, 0],
            content: 'This is section 3',
          },
        ],
      },
    ];
    const result = convert_docs_to_doc_section_embedding(docs);
    expect(result).toEqual([
      {
        hash: 'abc123',
        embedding: [0, 1, 1],
      },
      {
        hash: 'def456',
        embedding: [1, 0, 1],
      },
      {
        hash: 'ghi789',
        embedding: [1, 1, 0],
      },
    ]);
  });
}