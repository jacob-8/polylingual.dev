export type FileType =
  'common-app' |
  'project-meta' |
  'project-common-app' |
  'lesson-meta' |
  'lesson-app' |
  'lesson-steps' |
  'stage-markdown';

export interface Project {
  name: string;
  lessons: Record<string, Lesson>;
  // app: Record<string, string>; // common-app + project-common-app
  meta: Meta;
}

export interface Lesson {
  name: string;
  stages: Record<string, Stage>;
  app_start: Record<string, string>; // common-app + project-common-app + lesson-app
  steps_files: Record<string, string>; // retypewriter extension
  meta?: Meta;
}

export interface Stage { // split into StageRaw and StagePrepared/Stage?
  location: StageLocation;
  directory: string;
  markdown: string;
  initial_url?: string;
  file_to_focus?: string;
  previous_stage_location: StageLocation | null;
  next_stage_location: StageLocation | null;
  meta: Meta; // inherited from project and lesson
  // computed after tree parsing:
  steps: StepsByFilename;
  markdown_with_steps?: string;
  app_start: Record<string, string>;
  app_finish: Record<string, string>; 
}

export interface StageLocation {
  project: string;
  lesson: string;
  name: string;
}

export interface StepsByFilename {
  [filename: string]: Steps;
}

export interface Steps {
  [stepNumber: string]: string
};

export interface Scope {
  directory: string; // '' for root, 'src/' for src (default), 'src/lib/' for src/lib
}

export interface Meta {
  scope: Scope;
}

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

// TREE

export interface PartStub { // ProjectStub
  slug: string;
  meta: PartMeta;
  chapters: ChapterStub[];
}

export interface PartMeta {
  title: string;
  focus: string;
  scope: Scope;
}

export interface ChapterStub { // LessonStub
  slug: string;
  meta: ChapterMeta;
  exercises: ExerciseRaw[];
}

export type ChapterMeta = PartMeta;

export interface Exercise extends Omit<ExerciseRaw, 'markdown'> {
  part: {
    slug: string;
    title: string;
    index: number;
  };
  chapter: {
    slug: string;
    title: string;
  };
  scope: Scope;
  html: string;
  a: Record<string, Stub>;
  b: Record<string, Stub>;
}

export interface ExerciseRaw { // PageStub
  title: string;
  slug: string;
  prev: { slug: string } | null;
  next: { slug: string; title: string } | null;
  path: string; // the initial path to navigate to
  focus: string;
  dir: string;
  meta: ExerciseMeta;
  markdown: string;
}

export interface ExerciseMeta {
  editing_constraints: EditingConstraints;
}

export interface EditingConstraints {
  create: string[];
  remove: string[];
}
