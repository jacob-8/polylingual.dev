import type { StepsByFilename } from "$lib/types";

export function addStepsToMarkdown({ markdown, stepsByFilename }: { markdown: string, stepsByFilename: StepsByFilename }): string {
  // before I can know how to add steps to markdown, I need to know how svelte-markdown is going to pick up the before and after code and pass it to the diff editor.
  // Later I will just parse the diff here and pass it the rows and columns to highlight to a regular editor so we can hide inactive lines.
  return markdown;
}
