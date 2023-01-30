import type { Lesson, Project, StepsByFilename } from "$lib/types";
import { addStepsToMarkdown } from "./add-steps-to-markdown";
import { parseSnapshots } from "./parse-snapshots";

export function prepareLessonStages({ projects, project, lesson }: { projects: Record<string, Project>, project: string, lesson: string }): Lesson {
  const projectObj = projects[project];
  const lessonObj = projectObj.lessons[lesson];
  const stepsByFilename = parseStepsFiles(lessonObj.steps_files);

  // The object comes ordered already but in case that doesn't always hold true we are manually sorting:
  const sortedStages = Object.values(lessonObj.stages).sort((a, b) => {
    if (a.location.name < b.location.name) {
      return -1;
    }
    if (a.location.name > b.location.name) {
      return 1;
    }
    return 0;
  })
  for (const [index, stage] of sortedStages.entries()) {
    if (index === 0) {
      stage.app_start = lessonObj.app_start
    } else {
      const previousStage = sortedStages[index - 1]
      stage.app_start = previousStage.app_finish
    }
    stage.meta = { ...lessonObj.meta, ...projectObj.meta }

    const { markdown_with_steps, app_changes } = addStepsToMarkdown({ markdown: stage.markdown, stepsByFilename });
    stage.markdown_with_steps = markdown_with_steps;
    stage.app_finish = { ...stage.app_start, ...app_changes };
    lessonObj.stages[stage.location.name] = stage;
  }

  return lessonObj;
}

export function parseStepsFiles(steps_files: Record<string, string>): StepsByFilename {
  const stepsByFilename: StepsByFilename = {};
  for (const [filename, content] of Object.entries(steps_files)) {
    stepsByFilename[filename] = parseSnapshots(content);
  }
  return stepsByFilename;
}