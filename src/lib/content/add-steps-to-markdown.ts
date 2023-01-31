import MagicString from 'magic-string';
import type { StepsByFilename } from "$lib/types";

export const DIFF_BORDER = '--diff-border--';

const CAPTURE_FILENAME = '(.+?)';
const CAPTURE_SNAPSHOT_NUMBER = '(\\d{2})';
const STEP_REFERENCE_MATCHER = new RegExp(`\\[\\[${CAPTURE_FILENAME}#${CAPTURE_SNAPSHOT_NUMBER}\\]\\]`, 'g');

export function addStepsToMarkdown({ markdown, stepsByFilename }: { markdown: string, stepsByFilename: StepsByFilename }): { markdown_with_steps: string, app_changes: Record<string, string> } {
  const app_changes: Record<string, string> = {};
  const markdown_with_steps = new MagicString(markdown);

  const stepReferences = Array.from(markdown.matchAll(STEP_REFERENCE_MATCHER));
  for (const reference of stepReferences) {
    const startOfMatch = reference.index as number;
    const referenceLength = reference[0].length
    const filename = reference[1];
    const stepNumber = +reference[2];
    const previousStepNumber = stepNumber - 1;

    const currentState = stepsByFilename[filename][convertNumberToTwoDigitString(stepNumber)];
    const previousState = stepsByFilename[filename][convertNumberToTwoDigitString(previousStepNumber)];

    const diffBlock = `\`\`\`diff
${previousState}
${DIFF_BORDER}
${currentState}
\`\`\``
    markdown_with_steps.update(startOfMatch, startOfMatch + referenceLength, diffBlock)
    
    app_changes[filename] = currentState;
  }

  return { markdown_with_steps: markdown_with_steps.toString(), app_changes };
}

function convertNumberToTwoDigitString(number: number): string {
  return number.toString().padStart(2, '0');
}