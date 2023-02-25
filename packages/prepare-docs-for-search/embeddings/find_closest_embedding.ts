export interface Embedding {
  label?: string;
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
  target_embedding: Embedding,
  dataset_embeddings: Embedding[],
  max_embeddings = 2,
): EuclideanMatch[] {
  if (!Array.isArray(target_embedding.values))
    throw new TypeError("target_embedding.values must be an array of numbers");

  const distances = dataset_embeddings.map((embedding) => ({
    embedding,
    distance: euclidean_distance(target_embedding.values, embedding.values),
  }));

  distances.sort((a, b) => a.distance - b.distance); // ascending
  const closest_embeddings_with_distances = distances.slice(0, max_embeddings);
  return closest_embeddings_with_distances;
}

function euclidean_distance(a: number[], b: number[]): number {
  if (a.length !== b.length)
    throw new Error("Embeddings must have the same number of dimensions");

  const squaredDiffs = a.map((ai, i) => (ai - b[i]) ** 2);
  const sumOfSquaredDiffs = squaredDiffs.reduce((acc, d) => acc + d, 0);
  const distance = Math.sqrt(sumOfSquaredDiffs);
  return distance;
}

export function find_closest_embeddings_cosine(
  target_embedding: Embedding,
  dataset_embeddings: Embedding[],
  max_embeddings = 2,
): CosineMatch[] {
  const similarities = dataset_embeddings.map((embedding) => ({
    embedding,
    similarity: cosine_similarity(target_embedding.values, embedding.values),
  }));


  similarities.sort((a, b) => b.similarity - a.similarity); // descending
  const closest_embeddings_with_similarities = similarities.slice(0, max_embeddings);
  return closest_embeddings_with_similarities;
}

function cosine_similarity(a: number[], b: number[]): number {
  if (a.length !== b.length)
    throw new Error("Embeddings must have the same number of dimensions");

  const dotProduct = a.reduce((acc, ai, i) => acc + ai * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((acc, ai) => acc + ai ** 2, 0));
  const magnitudeB = Math.sqrt(b.reduce((acc, bi) => acc + bi ** 2, 0));
  const similarity = dotProduct / (magnitudeA * magnitudeB);

  return similarity;
}

if (import.meta.vitest) {
  const target_embedding: Embedding = {
    values: [0.1, 0.2, 0.3, 0.4, 0.5],
  };
  const embeddings: Embedding[] = [
    { values: [0.2, 0.3, 0.4, 0.5, 0.6] },
    { values: [0.3, 0.4, 0.5, 0.6, 0.7] },
    { values: [0.4, 0.5, 0.6, 0.7, 0.8] },
    { values: [0.5, 0.6, 0.7, 0.8, 0.9] },
    { values: [0.6, 0.7, 0.8, 0.9, 1.0] },
    { values: [0.7, 0.8, 0.9, 1.0, 1.1] },
    { values: [0.8, 0.9, 1.0, 1.1, 1.2] },
    { values: [0.9, 1.0, 1.1, 1.2, 1.3] },
    { values: [1.0, 1.1, 1.2, 1.3, 1.4] },
  ];
  describe('find_closest_embeddings', () => {
    const closest_embeddings_euclidean = find_closest_embeddings_euclidean(target_embedding, embeddings);

    const closest_embeddings_cosine = find_closest_embeddings_cosine(target_embedding, embeddings);

    test('returns most relevant match first', () => {
      expect(closest_embeddings_euclidean[0].distance).toBeLessThan(closest_embeddings_euclidean[1].distance);
     
      expect(closest_embeddings_cosine[0].similarity).toBeGreaterThan(closest_embeddings_cosine[1].similarity);
    });

    test('closest_embeddings_euclidean and closest_embeddings_cosine rank the same', () => {
      expect(closest_embeddings_euclidean[0].embedding.values).toEqual(closest_embeddings_cosine[0].embedding.values);
    });

    test('closest_embeddings_euclidean', () => {
      expect(closest_embeddings_euclidean).toMatchInlineSnapshot(`
      [
        {
          "distance": 0.22360679774997896,
          "embedding": {
            "values": [
              0.2,
              0.3,
              0.4,
              0.5,
              0.6,
            ],
          },
        },
        {
          "distance": 0.44721359549995787,
          "embedding": {
            "values": [
              0.3,
              0.4,
              0.5,
              0.6,
              0.7,
            ],
          },
        },
      ]
    `);
    });

    test('closest_embeddings_cosine', () => {
      expect(closest_embeddings_cosine).toMatchInlineSnapshot(`
      [
        {
          "embedding": {
            "values": [
              0.2,
              0.3,
              0.4,
              0.5,
              0.6,
            ],
          },
          "similarity": 0.9949366763261819,
        },
        {
          "embedding": {
            "values": [
              0.3,
              0.4,
              0.5,
              0.6,
              0.7,
            ],
          },
          "similarity": 0.986440050415621,
        },
      ]
    `);
    });
  });
}
