import { createWriteStream } from 'fs';
import { stringify } from 'csv-stringify';

const writeable_stream = createWriteStream('sections.csv');

const data_columns = [
  'index',
  'title',
  'filename',
  'url',
  'content',
];

const embeddings_columns = [
  'index',
  'embedding',
]

const stringifier = stringify({ header: true, columns: data_columns });
stringifier.write({ index: 0, title: 'Section 1', url: 'https://example.com', content: 'This is the content of section 1.'})
stringifier.write({ index: 1, title: 'Section 2', url: 'https://example.com', content: 'This is the content of section 2.'})

stringifier.pipe(writeable_stream);