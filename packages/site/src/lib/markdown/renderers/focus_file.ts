import { goto } from '$app/navigation';
import { getStores } from '$app/stores';
import { get } from 'svelte/store';

export function focus_file(filename: string) {
  const page = getStores().page;
  const $page = get(page);
  const path = $page.url.pathname;
  const encodedFilepath = encodeURIComponent(filename);
  goto(`${path}?focus=${encodedFilepath}`);
}

export function edit_file(filename: string, content: string) {
  const page = getStores().page;
  const $page = get(page);
  const path = $page.url.pathname;
  const encodedFilepath = encodeURIComponent(filename);
  const encodedEdit = encodeURIComponent(content);
  goto(`${path}?focus=${encodedFilepath}&edit=${encodedEdit}`);
}