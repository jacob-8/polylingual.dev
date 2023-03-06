import { find_closest_embeddings_cosine, find_closest_embeddings_euclidean, type CosineMatch, type Embedding } from "./find_closest_embeddings";

describe('find_closest_embeddings', () => {
  const target_embedding = [0.1, 0.2, 0.3, 0.4, 0.5];
  const embeddings: Embedding[] = [
    { hash: '1', values: [0.2, 0.3, 0.4, 0.5, 0.6] },
    { hash: '2', values: [0.3, 0.4, 0.5, 0.6, 0.7] },
    { hash: '3', values: [0.4, 0.5, 0.6, 0.7, 0.8] },
    { hash: '4', values: [0.5, 0.6, 0.7, 0.8, 0.9] },
    { hash: '5', values: [0.6, 0.7, 0.8, 0.9, 1.0] },
    { hash: '6', values: [0.7, 0.8, 0.9, 1.0, 1.1] },
    { hash: '7', values: [0.8, 0.9, 1.0, 1.1, 1.2] },
    { hash: '8', values: [0.9, 1.0, 1.1, 1.2, 1.3] },
    { hash: '9', values: [1.0, 1.1, 1.2, 1.3, 1.4] },
  ];
  const closest_embeddings_euclidean = find_closest_embeddings_euclidean(target_embedding, embeddings);

  const closest_embeddings_cosine = find_closest_embeddings_cosine(target_embedding, embeddings);

  test('returns most relevant match first', () => {
    expect(closest_embeddings_euclidean[0].distance).toBeLessThan(closest_embeddings_euclidean[1].distance);

    expect(closest_embeddings_cosine[0].similarity).toBeGreaterThan(closest_embeddings_cosine[1].similarity);
  });

  test('closest_embeddings_euclidean and closest_embeddings_cosine rank the same', () => {
    expect(closest_embeddings_euclidean[0].embedding.values).toEqual(closest_embeddings_cosine[0].embedding.values);
    expect(closest_embeddings_euclidean[1].embedding.values).toEqual(closest_embeddings_cosine[1].embedding.values);
  });

  test('closest_embeddings_euclidean', () => {
    expect(closest_embeddings_euclidean).toMatchInlineSnapshot(`
      [
        {
          "distance": 0.22360679774997896,
          "embedding": {
            "hash": "1",
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
            "hash": "2",
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
            "hash": "1",
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
            "hash": "2",
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

import dog from './fixtures/dog.json';
import horse from './fixtures/horse.json';
import cat from './fixtures/cat.json';
import kitten from './fixtures/kitten.json';
import boat from './fixtures/boat.json';
import car from './fixtures/car.json';
import sweater from './fixtures/sweater.json';
import a_piece_of_metal from './fixtures/a_piece_of_metal.json';

import feline from './fixtures/feline.json';
import vehicle from './fixtures/vehicle.json';

describe('find_most_related_documents', () => {
  const embeddings_for_documents_to_match: Embedding[] = [
    { hash: 'cat', values: cat },
    { hash: 'kitten', values: kitten },
    { hash: 'boat', values: boat },
    { hash: 'car', values: car },
    { hash: 'sweater', values: sweater },
    { hash: 'dog', values: dog },
    { hash: 'a_piece_of_metal', values: a_piece_of_metal },
    { hash: 'horse', values: horse },
  ];

  test('feline', () => {
    const expected = remove_all_values_but_first_for_brevity(find_closest_embeddings_cosine(feline, embeddings_for_documents_to_match, 1))
    expect(expected).toMatchInlineSnapshot(`
      [
        {
          "embedding": {
            "hash": "kitten",
            "values": [
              -0.021659186,
            ],
          },
          "similarity": 0.906216298453559,
        },
      ]
    `);
  });

  test('vehile', () => {
    const expected = remove_all_values_but_first_for_brevity(find_closest_embeddings_cosine(vehicle, embeddings_for_documents_to_match, 5))
    expect(expected).toMatchInlineSnapshot(`
      [
        {
          "embedding": {
            "hash": "car",
            "values": [
              -0.0074789817,
            ],
          },
          "similarity": 0.9283812463088322,
        },
        {
          "embedding": {
            "hash": "boat",
            "values": [
              -0.015562679,
            ],
          },
          "similarity": 0.8660612810146526,
        },
        {
          "embedding": {
            "hash": "dog",
            "values": [
              -0.0033176765,
            ],
          },
          "similarity": 0.8401594876790912,
        },
        {
          "embedding": {
            "hash": "horse",
            "values": [
              -0.009181267,
            ],
          },
          "similarity": 0.8395302813206699,
        },
        {
          "embedding": {
            "hash": "kitten",
            "values": [
              -0.021659186,
            ],
          },
          "similarity": 0.8236818417202799,
        },
      ]
    `);
  });

  test.fails('wrong input', () => {
    find_closest_embeddings_cosine('not-array' as unknown as [], embeddings_for_documents_to_match);
  });

  function remove_all_values_but_first_for_brevity(matches: CosineMatch[]): CosineMatch[] {
    return matches.map((match) => ({
      similarity: match.similarity,
      embedding: {
        hash: match.embedding.hash,
        values: [match.embedding.values[0]],
      }
    }));
  }
});