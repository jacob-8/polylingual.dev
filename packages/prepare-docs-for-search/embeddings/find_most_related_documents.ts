import dog from './samples/dog.json';
import horse from './samples/horse.json';
import cat from './samples/cat.json';
import kitten from './samples/kitten.json';
import boat from './samples/boat.json';
import car from './samples/car.json';
import sweater from './samples/sweater.json';
import a_piece_of_metal from './samples/a_piece_of_metal.json';

import feline from './samples/feline.json';
import vehicle from './samples/vehicle.json';

import { type Embedding, find_closest_embeddings_cosine, CosineMatch } from './find_closest_embedding';

const embeddings_for_documents_to_match: Embedding[] = [
  { label: 'cat', values: cat },
  { label: 'kitten', values: kitten },
  { label: 'boat', values: boat },
  { label: 'car', values: car },
  { label: 'sweater', values: sweater },
  { label: 'dog', values: dog },
  { label: 'a_piece_of_metal', values: a_piece_of_metal },
  { label: 'horse', values: horse },
];

export function find_most_related_documents(embedding_to_search_by: Embedding, count = 2): CosineMatch[] {
  return find_closest_embeddings_cosine(embedding_to_search_by, embeddings_for_documents_to_match, count);
}

if (import.meta.vitest) {
  describe('find_most_related_documents', () => {
    function remove_all_values_but_first_for_brevity(matches: CosineMatch[]): CosineMatch[] {
      return matches.map((match) => ({
        similarity: match.similarity,
        embedding: {
          label: match.embedding.label,
          values: [match.embedding.values[0]],
        }
      }));
    }

    test('feline', () => {
      const expected = remove_all_values_but_first_for_brevity(find_most_related_documents({ label: 'feline', values: feline }, 1))
      expect(expected).toMatchInlineSnapshot(`
        [
          {
            "embedding": {
              "label": "kitten",
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
      const expected = remove_all_values_but_first_for_brevity(find_most_related_documents({ label: 'vehicle', values: vehicle }, 5))
      expect(expected).toMatchInlineSnapshot(`
        [
          {
            "embedding": {
              "label": "car",
              "values": [
                -0.0074789817,
              ],
            },
            "similarity": 0.9283812463088322,
          },
          {
            "embedding": {
              "label": "boat",
              "values": [
                -0.015562679,
              ],
            },
            "similarity": 0.8660612810146526,
          },
          {
            "embedding": {
              "label": "dog",
              "values": [
                -0.0033176765,
              ],
            },
            "similarity": 0.8401594876790912,
          },
          {
            "embedding": {
              "label": "horse",
              "values": [
                -0.009181267,
              ],
            },
            "similarity": 0.8395302813206699,
          },
          {
            "embedding": {
              "label": "kitten",
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
      find_most_related_documents({ label: 'hello', values: 'not-array' as unknown as [] });
    });
  });
}