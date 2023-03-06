import type { Lesson, LessonRaw, Project, Stage, StageRaw, StepsByFilename } from "$lib/types";
import { addStepsToMarkdown } from "./add-steps-to-markdown";
import { parseSnapshots } from "./parse-snapshots";

export function prepareLessonStages({ projects, project, lesson }: { projects: Record<string, Project>, project: string, lesson: string }): Lesson {
  const project_obj = projects[project];
  const lesson_obj = project_obj.lessons[lesson];
  const stepsByFilename = parseStepsFiles(lesson_obj.steps_files);

  const sorted_raw_stages = sort_stages_by_slug(lesson_obj);

  const prepared_stages: Stage[] = [];
  const prepared_lesson: Lesson = { stages: {} };

  for (const [index, raw_stage] of sorted_raw_stages.entries()) {
    const stage: Stage = { ...raw_stage, app_finish: {}, app_start: {}, directory_to_show: '', steps: {} };

    if (index === 0) {
      stage.app_start = lesson_obj.app_start
    } else {
      const previousStage = prepared_stages[index - 1]
      stage.app_start = previousStage.app_finish
    }
    stage.directory_to_show = lesson_obj.meta.directory_to_show ?? project_obj.meta.directory_to_show as string; // allows using "" to indicate root, though maybe we should default to "/" to avoid tricky edge cases

    const { markdown_with_steps, app_changes } = addStepsToMarkdown({ markdown: raw_stage.markdown, stepsByFilename });
    stage.markdown_with_steps = markdown_with_steps;
    stage.app_finish = { ...stage.app_start, ...app_changes };
    prepared_stages.push(stage);
    prepared_lesson.stages[stage.location.stage] = stage;
  }
  return prepared_lesson;
}

function sort_stages_by_slug(lessonObj: LessonRaw): StageRaw[] {
  // redundant, but just in case
  return Object.values(lessonObj.raw_stages).sort((a, b) => {
    if (a.location.stage < b.location.stage) {
      return -1;
    }
    if (a.location.stage > b.location.stage) {
      return 1;
    }
    return 0;
  });
}

export function parseStepsFiles(steps_files: Record<string, string>): StepsByFilename {
  const stepsByFilename: StepsByFilename = {};
  for (const [filename, content] of Object.entries(steps_files)) {
    try {
      stepsByFilename[filename] = parseSnapshots(content);
    } catch (err) {
      console.warn(`Error parsing steps file ${filename}: ${err}`)
    }
  }
  return stepsByFilename;
}