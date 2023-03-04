import type { Project, StageRaw, Meta, StageLocation } from "$lib/types";
import { extract_frontmatter } from "./extract-frontmatter";
import { parseFileType } from "./parse-file-type";
import default_meta from './default-meta.json'

export function parseTree(rawProjects: Record<string, string>, pathInitial = '/projects/'): Record<string, Project> {
  const projects: Record<string, Project> = {};
  let previous_stage: StageRaw | null = null;

  for (const [path, content] of Object.entries(rawProjects)) {
    const simplifiedPath = path.replace(pathInitial, '');
    const { type, project, lesson, name: slug } = parseFileType(simplifiedPath);

    // setup initial empty objects
    if (project) {
      if (!projects[project])
        projects[project] = { slug: project, lessons: {}, meta: default_meta };

      if (lesson) {
        if (!projects[project].lessons[lesson])
          projects[project].lessons[lesson] = { slug: lesson, meta: { title: { en: "change", "zh-TW": "change" } }, raw_stages: {}, app_start: {}, steps_files: {} };
      }
    }

    if (type === 'stage-markdown') {
      const { frontmatter, markdown } = extract_frontmatter(content);
      const { initial_url, file_to_focus, title } = frontmatter;

      const location: StageLocation = {
        project,
        lesson,
        stage: slug,
      }
      const raw_stage: StageRaw = {
        title,
        location,
        directory: path,
        markdown,
        initial_url,
        file_to_focus,
        previous_stage_location: previous_stage?.location || null,
        next_stage_location: null,
      }
      projects[project].lessons[lesson].raw_stages[slug] = raw_stage;

      if (previous_stage)
        previous_stage.next_stage_location = location;

      previous_stage = raw_stage;

    } else if (type === 'lesson-app') {
      projects[project].lessons[lesson].app_start[slug] = content;

    } else if (type === 'lesson-steps') {
      projects[project].lessons[lesson].steps_files[slug] = content;

    } else if (type === 'lesson-meta') {
      const meta = JSON.parse(content) as Meta;
      projects[project].lessons[lesson].meta = meta;

    } else if (type === 'project-meta') {
      const meta = JSON.parse(content) as Meta;
      projects[project].meta = { ...default_meta, ...meta };

    } else if (type === 'project-common-app') {
      for (const lesson of Object.keys(projects[project].lessons)) {
        if (!projects[project].lessons[lesson].app_start[slug])
          projects[project].lessons[lesson].app_start[slug] = content;
      }

    } else if (type === 'common-app') {
      for (const project of Object.keys(projects)) {
        for (const lesson of Object.keys(projects[project].lessons)) {
          if (!projects[project].lessons[lesson].app_start[slug])
            projects[project].lessons[lesson].app_start[slug] = content;
        }
      }
    }
  }

  return projects;
}
