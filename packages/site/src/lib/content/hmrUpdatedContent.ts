import { writable } from "svelte/store";

export const updatedProjectsDirectory = writable<Record<string, string>>();
