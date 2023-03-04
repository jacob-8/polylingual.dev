import type { FileType } from "$lib/types";

export function parseFileType(path: string): { project: string, lesson: string, name: string, type: FileType } {
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
    type: 'stage-markdown',
    project,
    lesson,
    name: name.replace('.md', ''),
  }

  throw new Error('Could not parse file: ' + path);
}