export type FileType =
  'common-app' |
  'project-meta' |
  'project-common-app' |
  'lesson-meta' |
  'lesson-app' |
  'lesson-steps' |
  'stage-markdown';


export interface Project {
  slug: string;
  meta: Meta;
  lessons: Record<string, LessonRaw>;
}

export interface LessonRaw {
  slug: string;
  meta: Meta;
  raw_stages: Record<string, StageRaw>;
  app_start: Record<string, string>; // common-app + project-common-app + lesson-app
  steps_files: Record<string, string>; // retypewriter extension
}

export interface Lesson {
  stages: Record<string, Stage>;
}

export interface StageRaw {
  title: LanguageValues;
  directory: string;
  markdown: string;
  initial_url?: string;
  file_to_focus?: string;
  location: StageLocation; // maybe rename to slugs
  previous_stage_location: StageLocation | null;
  next_stage_location: StageLocation | null;
}

export interface Stage extends StageRaw {
  directory_to_show: string; // inherited from project (or lesson if exists)
  steps: StepsByFilename;
  markdown_with_steps?: string;
  app_start: Record<string, string>;
  app_finish: Record<string, string>;
}

export interface Meta {
  directory_to_show?: string; // '' for root, 'src/' for src (default), 'src/lib/' for src/lib
  title: LanguageValues
}

type LanguageValues = {
  'en': string;
  'zh-TW': string;
};

export interface StageLocation {
  project: string;
  lesson: string;
  stage: string;
}

export interface StageFrontmatter {
  title: LanguageValues;
  initial_url?: string;
  file_to_focus?: string; // file_to_focus: src/routes/Text.svelte
}

export interface StepsByFilename {
  [filename: string]: Steps;
}

export interface Steps {
  [stepNumber: string]: string
};

export interface Tree {
  [folderOrFilename: string]: Tree | string;
}

export interface Directory {
  directories: Record<string, Directory>;
  filenames: string[];
}

export interface StageFiles {
  [path: string]: string;
}

export interface FileStub {
  name: string; // path
  basename: string; // filename
  contents: string;
  text: boolean;
}

// OLD below

export type Stub = FileStub | DirectoryStub;

export interface DirectoryStub {
  type: 'directory';
  name: string;
  basename: string;
}
