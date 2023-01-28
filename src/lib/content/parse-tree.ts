import type { FileType, Lesson, Project } from "$lib/types";
const pathInitial = '/projects/';

export function parseTree(rawProjects: Record<string, string>): Record<string, Project> {
  const filepaths = Object.keys(rawProjects);
  const projects: Record<string, Project> = {};

  for (const path of filepaths) {
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
      projects[project].lessons[lesson].pages[name] = {
        name,
        markdown: rawProjects[path],
        // initial_url: '',
        // file_to_focus: '',
        previous_page_path: null,
        next_page_path: null,
        steps: [],
        app_start: {},
        app_finish: {},
      }
    } else if (type === 'lesson-app') {
    } else if (type === 'lesson-steps') {
    } else if (type === 'lesson-meta') {
      const meta = JSON.parse(rawProjects[path]) as Lesson['meta'];
      projects[project].lessons[lesson].meta = meta;
    } else if (type === 'project-common-app') {
    } else if (type === 'project-meta') {
      const meta = JSON.parse(rawProjects[path]) as Project['meta'];
      projects[project].meta = meta;
    } else if (type === 'common-app') {
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

// const start_of_string = '^'
// const capture_name_starting_with_2_digits_and_hyphen = '(\\d{2}-[^/]+)'
// const slash = '\\/'
// const meta_json_file = 'meta\\.json$'

// const project_meta_regex = new RegExp(start_of_string + capture_name_starting_with_2_digits_and_hyphen + slash + meta_json_file)

// const lesson_meta_regex = new RegExp(start_of_string + capture_name_starting_with_2_digits_and_hyphen + slash + capture_name_starting_with_2_digits_and_hyphen + slash + meta_json_file)

// export function getProjectNameFromMetaJsonPath(text: string): string | null {
//   return text.match(project_meta_regex)?.[1] ?? null;
// }

// export function getLessonAndProjectNameFromMetaJsonPath(text: string): string | null {
//   const match = text.match(lesson_meta_regex);
//   if (match) return `${match[1]}/${match[2]}`;
//   return null;
// }



