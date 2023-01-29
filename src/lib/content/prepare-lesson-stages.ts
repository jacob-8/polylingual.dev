import type { Lesson, Project, StepsByFilename } from "$lib/types";
import { addStepsToMarkdown } from "./add-steps-to-markdown";
import { parseSnapshots } from "./parse-snapshots";

export function prepareLessonStages({ projects, project, lesson }: { projects: Record<string, Project>, project: string, lesson: string }): Lesson {
  const lessonObj = projects[project].lessons[lesson];
  const firstStageName = Object.keys(lessonObj.stages).find(stage => stage.startsWith('01-')) as string;
  const unusedStepsForAllStages = parseStepsFiles(lessonObj.steps_files);

  // loop over stages
  const firstStage = lessonObj.stages[firstStageName];
  firstStage.app_start = lessonObj.app_start;
  // if later stage, then stage's app_start equals previous stage's app_finish

  const { markdown_with_steps, app_changes } = addStepsToMarkdown({ markdown: firstStage.markdown, stepsByFilename: unusedStepsForAllStages });
  firstStage.markdown_with_steps = markdown_with_steps;
  firstStage.app_finish = { ...firstStage.app_start, ...app_changes };

  return projects[project].lessons[lesson];
}

export function parseStepsFiles(steps_files: Record<string, string>): StepsByFilename {
  const stepsByFilename: StepsByFilename = {};
  for (const [filename, content] of Object.entries(steps_files)) {
    stepsByFilename[filename] = parseSnapshots(content);
  }
  return stepsByFilename;
}