export type Stub = FileStub | DirectoryStub;

export interface FileStub {
	type: 'file';
	name: string;
	basename: string;
	contents: string;
	text: boolean;
}

export interface DirectoryStub {
	type: 'directory';
	name: string;
	basename: string;
}

export interface Adapter {
	base: string;
	/** Returns `false` if the reset was in such a way that a reload of the iframe isn't needed */
	reset(files: Array<Stub>): Promise<boolean>;
	update(file: Array<FileStub>): Promise<boolean>;
	destroy(): Promise<void>;
}

// TREE

export interface PartStub { // refactor to LessonStub?
	slug: string;
	meta: PartMeta;
	chapters: ChapterStub[];
}

export interface PartMeta {
	title: string;
	focus: string;
	scope: Scope;
}

export interface ChapterStub {
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

export interface ExerciseRaw {
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

export interface Scope {
	prefix: string;
	depth: number;
	name: string;
}