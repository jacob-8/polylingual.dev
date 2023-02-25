import { euclideanDistance } from './euclidean';
import KDTree from './KDTree';

// modified from ml-knn

export default class KNN {
  dataset: number[][];
  labels: (number | string)[];
  kdTree: KDTree;

  constructor(dataset: number[][], labels: (number | string)[]) {
    this.dataset = dataset;
    this.labels = labels;
    this.kdTree = new KDTree(dataset, euclideanDistance);
  }

  nearest(point_to_match: number[], max_matches = 2): { label: string | number, distance: number }[] {
    if (!Array.isArray(point_to_match) || typeof point_to_match[0] !== 'number')
      throw new TypeError('dataset to match must be an array of numbers');

    const matches = this.kdTree.nearest(point_to_match, max_matches);

    const labeled_nearest_matches = matches.map((match) => {
      return {
        firstPoint: match.point[0],
        label: this.labels[this.dataset.indexOf(match.point)], // this has a problem
        distance: match.distance,
      }
    });

    return labeled_nearest_matches;
  }
}
