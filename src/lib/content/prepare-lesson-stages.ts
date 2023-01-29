import type { Lesson, Project, Steps } from "$lib/types";
import { parseSnapshots } from "./parse-snapshots";

export function prepareLessonStages({ projects, project, lesson }: { projects: Record<string, Project>, project: string, lesson: string }): Lesson {
  const lessonObj = projects[project].lessons[lesson];
  const firstStageName = Object.keys(lessonObj.stages).find(stage => stage.startsWith('01-')) as string;
  const unusedStepsForAllStages = parseStepsFiles(lessonObj.steps_files);
  
  const firstStage = lessonObj.stages[firstStageName];
  firstStage.app_start = lessonObj.app_start;
  // if later stage, then stage's app_start equals previous stage's app_finish

  // const markdown_with_steps = addStepsToMarkdown({ markdown: firstStage.markdown, steps: unusedStepsForAllStages });
  // 1. read the markdown of each stage and find the referred to steps in the parsed steps of that stage's lesson
  
  // 2. add those steps into the markdown where they are reference and return it to markdown_with_steps
  
  // 3. pull out the used steps into the stage's steps array (remove them from stepsForAllStages so they can't be used twice)

  // 5. calculate app_finish by saving steps over top of app_start

  return projects[project].lessons[lesson];
}

export function parseStepsFiles(steps_files: Record<string, string>): Steps {
  const steps: Steps = {};
  for (const [filename, content] of Object.entries(steps_files)) {
    steps[filename] = parseSnapshots(content);
  }
  return steps;
}