export interface ProcessedDoc {
  filename: string;
  sections: Section[];
}

export interface Section {
  title?: string;
  content: string;
  children?: Section[];
  hash?: string;
  token_count?: number;
  embedding?: number[];
}

export interface DocSectionData {
  hash: string;
  token_count: number;
  title: string;
  filename: string;
  // url: string;
  content: string;
}

export interface DocSectionEmbedding {
  hash: string;
  embedding: number[];
}