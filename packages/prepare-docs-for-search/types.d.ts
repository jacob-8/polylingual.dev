export interface ProcessedDoc {
  filename: string;
  sections: Section[];
}

export interface Section {
  title?: string;
  content: string;
  children?: Section[];
  // post-processing - maybe split into another interface
  combined_title?: string;
  hash?: string;
  token_count?: number;
  embedding?: number[];
}

export interface DocSectionData {
  hash: string;
  token_count: number;
  title: string;
  combined_title?: string;
  filename: string;
  // url: string;
  content: string;
}

export interface DocSectionEmbedding {
  hash: string;
  embedding: number[];
}