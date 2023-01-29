import type { Lesson, Stage, Project } from "$lib/types";
import { extract_frontmatter } from "./extract-frontmatter";
import { parseFileType } from "./parse-file-type";
const pathInitial = '/projects/';

export function parseTree(rawProjects: Record<string, string>): Record<string, Project> {
  const projects: Record<string, Project> = {};
  let previous_stage: Stage | null = null;

  for (const [path, content] of Object.entries(rawProjects)) {
    const simplifiedPath = path.replace(pathInitial, '');
    const { type, project, lesson, name } = parseFileType(simplifiedPath);

    // setup initial empty objects
    if (project) {
      if (!projects[project])
        projects[project] = { name: project, lessons: {} };

      if (lesson) {
        if (!projects[project].lessons[lesson])
          projects[project].lessons[lesson] = { name: lesson, stages: {}, app_start: {}, steps_files: {} };
      }
    }

    if (type === 'stage-markdown') {
      const { frontmatter, markdown } = extract_frontmatter(content);
      const { initial_url, file_to_focus } = frontmatter;

      const stage: Stage = {
        name,
        lesson,
        project,
        markdown,
        initial_url,
        file_to_focus,
        previous_stage_path: previous_stage?.name ? `${project}/${lesson}/${previous_stage.name}` : null,
        next_stage_path: null,
        steps: [],
        app_start: {},
        app_finish: {},
      }
      projects[project].lessons[lesson].stages[name] = stage;

      if (previous_stage)
        previous_stage.next_stage_path = `${project}/${lesson}/${name}`;
      previous_stage = stage;

    } else if (type === 'lesson-app') {
      projects[project].lessons[lesson].app_start[name] = content;

    } else if (type === 'lesson-steps') {
      projects[project].lessons[lesson].steps_files[name] = content;

    } else if (type === 'lesson-meta') {
      const meta = JSON.parse(content) as Lesson['meta'];
      projects[project].lessons[lesson].meta = meta;

    } else if (type === 'project-meta') {
      const meta = JSON.parse(content) as Project['meta'];
      projects[project].meta = meta;

    } else if (type === 'project-common-app') {
      for (const lesson of Object.keys(projects[project].lessons)) {
        if (!projects[project].lessons[lesson].app_start[name])
          projects[project].lessons[lesson].app_start[name] = content;
      }

    } else if (type === 'common-app') {
      for (const project of Object.keys(projects)) {
        for (const lesson of Object.keys(projects[project].lessons)) {
          if (!projects[project].lessons[lesson].app_start[name])
            projects[project].lessons[lesson].app_start[name] = content;
        }
      }
    }
  }

  return projects;
}
