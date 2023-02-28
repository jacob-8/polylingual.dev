export interface Embedding { // TODO: unduplicate with process package
  hash: string; // hash of the content that was embedded
  values: number[];
}

export interface EuclideanMatch {
  embedding: Embedding;
  distance: number;
}

export interface CosineMatch {
  embedding: Embedding;
  similarity: number;
}

export function find_closest_embeddings_euclidean(
  target_embedding: number[],
  dataset_embeddings: Embedding[],
  max_embeddings = 2,
): EuclideanMatch[] {
  if (!Array.isArray(target_embedding))
    throw new TypeError("target_embedding must be an array of numbers");

  const distances = dataset_embeddings.map((embedding) => ({
    embedding,
    distance: euclidean_distance(target_embedding, embedding.values),
  }));

  distances.sort((a, b) => a.distance - b.distance); // ascending
  const closest_embeddings_with_distances = distances.slice(0, max_embeddings);
  return closest_embeddings_with_distances;
}

function euclidean_distance(a: number[], b: number[]): number {
  if (a.length !== b.length)
    throw new Error(`Embeddings must have the same number of dimensions. You are comparing embeddings with ${a.length} and ${b.length} dimensions`);

  const squaredDiffs = a.map((ai, i) => (ai - b[i]) ** 2);
  const sumOfSquaredDiffs = squaredDiffs.reduce((acc, d) => acc + d, 0);
  const distance = Math.sqrt(sumOfSquaredDiffs);
  return distance;
}

export function find_closest_embeddings_cosine(
  target_embedding: number[],
  dataset_embeddings: Embedding[],
  max_embeddings = 2,
): CosineMatch[] {
  const similarities = dataset_embeddings.map((embedding) => ({
    embedding,
    similarity: cosine_similarity(target_embedding, embedding.values),
  }));

  similarities.sort((a, b) => b.similarity - a.similarity); // descending
  const closest_embeddings_with_similarities = similarities.slice(0, max_embeddings);
  return closest_embeddings_with_similarities;
}

function cosine_similarity(a: number[], b: number[]): number {
  if (a.length !== b.length)
    throw new Error(`Embeddings must have the same number of dimensions. You are comparing embeddings with ${a.length} and ${b.length} dimensions`);

  const dotProduct = a.reduce((acc, ai, i) => acc + ai * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((acc, ai) => acc + ai ** 2, 0));
  const magnitudeB = Math.sqrt(b.reduce((acc, bi) => acc + bi ** 2, 0));
  const similarity = dotProduct / (magnitudeA * magnitudeB);

  return similarity;
}
