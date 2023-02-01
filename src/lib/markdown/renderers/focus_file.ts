import { goto } from '$app/navigation';

export function focus_file(path: string, filename: string) {
  const encodedFilepath = encodeURIComponent(filename);
  goto(`${path}?focus=${encodedFilepath}`);
}