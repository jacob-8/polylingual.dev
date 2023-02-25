// From ml-distance-euclidean

export function euclideanDistance(a: number[], b: number[]): number {
  let distance = 0;
  for (let i = 0; i < a.length; i++) {
    distance += (a[i] - b[i]) * (a[i] - b[i]);
  }
  return Math.sqrt(distance);
}