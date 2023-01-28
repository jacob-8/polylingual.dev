import { writable } from "svelte/store";

export const updatedProjects = writable<Record<string, string>>();
