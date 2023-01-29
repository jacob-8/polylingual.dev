import MagicString from 'magic-string';
import type { StepsByFilename } from "$lib/types";
const CAPTURE_FILENAME = '(.+?)';
const CAPTURE_SNAPSHOT_NUMBER = '(\\d{2})';
const STEP_REFERENCE_MATCHER = new RegExp(`\\[\\[${CAPTURE_FILENAME}#${CAPTURE_SNAPSHOT_NUMBER}\\]\\]`, 'g');

export function addStepsToMarkdown({ markdown, stepsByFilename }: { markdown: string, stepsByFilename: StepsByFilename }): string {
  const updateMarkdown = new MagicString(markdown);

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
--diff-border--
${currentState}
\`\`\``
    updateMarkdown.update(startOfMatch, startOfMatch + referenceLength, diffBlock)
  }

  return updateMarkdown.toString();
}

function convertNumberToTwoDigitString(number: number): string {
  return number.toString().padStart(2, '0');
}