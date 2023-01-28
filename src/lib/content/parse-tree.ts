import type { FileType, Lesson, Project } from "$lib/types";
import { extract_frontmatter } from "./extract-frontmatter";
const pathInitial = '/projects/';

export function parseTree(rawProjects: Record<string, string>): Record<string, Project> {
  const filepaths = Object.keys(rawProjects);
  const projects: Record<string, Project> = {};

  for (const path of filepaths) {
    const content = rawProjects[path];
    const simplifiedPath = path.replace(pathInitial, '');
    const parsedFile = parseFile(simplifiedPath);
    const { type, project, lesson, name } = parsedFile;

    // setup initial empty objects
    if (project) {
      if (!projects[project])
        projects[project] = { name: project, lessons: {} };

      if (lesson) {
        if (!projects[project].lessons[lesson])
          projects[project].lessons[lesson] = { name: lesson, pages: {}, app_start: {}, steps_files: {} };
      }
    }

    if (type === 'page-markdown') {
      const { frontmatter, markdown } = extract_frontmatter(content);
      const { initial_url, file_to_focus } = frontmatter;

      projects[project].lessons[lesson].pages[name] = {
        name,
        markdown,
        initial_url,
        file_to_focus,
        previous_page_path: null,
        next_page_path: null,
        steps: [],
        app_start: {},
        app_finish: {},
      }
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

export function parseFile(path: string): { project: string, lesson: string, name: string, type: FileType } {
  const [project, lesson, name] = path.split('/');

  if (path.endsWith('.retypewriter')) return {
    type: 'lesson-steps',
    name: path.split('/app/')[1].replace('.retypewriter', ''),
    project,
    lesson,
  }

  if (path.startsWith('common')) return {
    type: 'common-app',
    name: path.replace('common/', ''),
    project: '',
    lesson: '',
  };
  if (path.includes('/common/')) return {
    type: 'project-common-app',
    name: path.split('/common/')[1],
    project,
    lesson: '',
  }
  if (path.includes('/app/')) return {
    type: 'lesson-app',
    name: path.split('/app/')[1],
    project,
    lesson,
  }

  if (path.endsWith('meta.json')) {
    if (path.split('/').length === 2) return { project, lesson: '', name: 'meta', type: 'project-meta' };
    if (path.split('/').length === 3) return { project, lesson, name: 'meta', type: 'lesson-meta' };
  }

  if (path.endsWith('.md')) return {
    type: 'page-markdown',
    project,
    lesson,
    name: name.replace('.md', ''),
  }

  throw new Error('Could not parse file: ' + path);
}



