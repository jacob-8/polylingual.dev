import type { ChapterMeta, ChapterStub, DirectoryStub, Exercise, ExerciseRaw, FileStub, PartMeta, PartStub } from '$lib/types';
import fs from 'node:fs';
import path from 'node:path';
import { transform } from './markdown.js';

const text_files = new Set([
	'.svelte',
	'.txt',
	'.json',
	'.js',
	'.ts',
	'.css',
	'.svg',
	'.html',
	'.md',
	'.env'
]);

const excluded = new Set(['.DS_Store', '.gitkeep', '.svelte-kit', 'package-lock.json']);

function loadJson(file: string) {
	return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

export function get_tree(): PartStub[] {
	const parts: PartStub[] = [];
	let last_exercise: ExerciseRaw | null = null;
	let last_part_meta: PartMeta | null = null;
	let last_chapter_meta: ChapterMeta | null = null;

	for (const partPath of fs.readdirSync('content/tutorial')) {
		if (!startsWith2DigitsAndHyphen(partPath)) continue;

		const part_meta: PartMeta = loadJson(`content/tutorial/${partPath}/meta.json`);

		const chapters: ChapterStub[] = [];

		for (const chapterPath of fs.readdirSync(`content/tutorial/${partPath}`)) {
			if (!startsWith2DigitsAndHyphen(chapterPath)) continue;

			const chapter_meta: ChapterMeta = loadJson(`content/tutorial/${partPath}/${chapterPath}/meta.json`);

			const exercises: ExerciseRaw[] = [];

			for (const exercisePath of fs.readdirSync(`content/tutorial/${partPath}/${chapterPath}`)) {
				if (!startsWith2DigitsAndHyphen(exercisePath)) continue;

				const dir = `content/tutorial/${partPath}/${chapterPath}/${exercisePath}`;
				if (!fs.statSync(dir).isDirectory()) continue;

				const text = fs.readFileSync(`${dir}/README.md`, 'utf-8');
				const { frontmatter, markdown } = extract_frontmatter(text, dir);
				const { title, path = '/', focus } = frontmatter;
				const slug = exercisePath.slice(3);
				const meta = fs.existsSync(`${dir}/meta.json`) ? loadJson(`${dir}/meta.json`) : {};

				if (last_exercise) {
					last_exercise.next = {
						slug,
						title:
							last_part_meta !== part_meta
								? part_meta.title
								: last_chapter_meta !== chapter_meta
									? chapter_meta.title
									: title
					};
				}

				const exercise: ExerciseRaw = {
					title,
					path,
					focus,
					slug: exercisePath.slice(3),
					prev: last_exercise ? { slug: last_exercise.slug } : null,
					next: null,
					meta,
					markdown,
					dir,
				}
				exercises.push(exercise);
				last_exercise = exercise;

				last_chapter_meta = chapter_meta;
				last_part_meta = part_meta;
			}

			chapters.push({
				slug: chapterPath,
				meta: {
					...part_meta,
					...chapter_meta
				},
				exercises,
			});
		}

		parts.push({
			slug: partPath,
			meta: part_meta,
			chapters
		});
	}

	return parts;
}

function startsWith2DigitsAndHyphen(text: string) {
	return /^\d{2}-/.test(text);
}

export function get_exercise(tree: PartStub[], slug: string): Exercise | undefined {
	for (const [index, part] of tree.entries()) {
		const chain: string[] = [];
		
		for (const chapter of part.chapters) {
			
			for (const exercise of chapter.exercises) {
				if (fs.existsSync(`${exercise.dir}/app-a`)) {
					chain.length = 0;
					chain.push(`${exercise.dir}/app-a`);
				}
				
				if (exercise.slug === slug) {
					const a = {
						...listFilesInDirectory('content/tutorial/common', {
							exclude: ['node_modules', 'static/tutorial', 'static/svelte-logo-mask.svg']
						}),
						...listFilesInDirectory(`content/tutorial/${part.slug}/common`)
					};

					for (const dir of chain) {
						Object.assign(a, listFilesInDirectory(dir));
					}

					const b = listFilesInDirectory(`${exercise.dir}/app-b`);

					const scope = chapter.meta.scope ?? part.meta.scope;
					const filenames = new Set(
						Object.keys(a)
							.filter(
								(filename) => filename.startsWith(scope.prefix) && a[filename].type === 'file'
							)
							.map((filename) => filename.slice(scope.prefix.length))
					);

					return {
						part: {
							slug: part.slug,
							title: part.meta.title,
							index
						},
						chapter: {
							slug: chapter.slug,
							title: chapter.meta.title
						},
						scope,
						focus: exercise.focus ?? chapter.meta.focus ?? part.meta.focus,
						title: exercise.title,
						path: exercise.path,
						slug: exercise.slug,
						prev: exercise.prev,
						next: exercise.next,
						dir: exercise.dir,
						meta: exercise.meta,
						html: transform(exercise.markdown, {
							codespan: (text: string) =>
								filenames.size > 1 && filenames.has(text)
									? `<code data-file="${scope.prefix + text}">${text}</code>`
									: `<code>${text}</code>`
						}),
						a,
						b
					};
				}

				chain.push(`${exercise.dir}/app-b`);
			}
		}
	}
}

function extract_frontmatter(markdown: string, dir: string) {
	const match = /---\n([^]+?)\n---\n([^]+)/.exec(markdown);
	if (!match) {
		throw new Error(`bad markdown for ${dir}`);
	}

	const frontmatter: Record<string, string> = {};

	for (const line of match[1].split('\n')) {
		const index = line.indexOf(':');
		if (index !== -1) {
			frontmatter[line.slice(0, index).trim()] = line.slice(index + 1).trim();
		}
	}

	return { frontmatter, markdown: match[2] };
}

export function listFilesInDirectory(directory: string, options: {
	exclude?: string[];
} = {}) {
	const result: Record<string, FileStub | DirectoryStub> = {};

	if (!fs.existsSync(directory)) return result;

	function walk_dir(dir: string, depth: number) {
		const files = fs.readdirSync(path.join(directory, dir));

		for (const basename of files) {
			if (excluded.has(basename)) continue;

			const name = dir + basename;

			if (options.exclude?.some((exclude) => name.replace(/\\/g, '/').endsWith(exclude))) continue;

			const resolved = path.join(directory, name);
			const stats = fs.statSync(resolved);

			if (stats.isDirectory()) {
				result[name] = {
					type: 'directory',
					name,
					basename
				};

				walk_dir(name + '/', depth + 1);
			} else {
				const text = text_files.has(path.extname(name) || path.basename(name));
				const contents = fs.readFileSync(resolved, text ? 'utf-8' : 'base64');

				result[name] = {
					type: 'file',
					name,
					basename,
					text,
					contents
				};
			}
		}
	}

	return walk_dir('/', 1), result;
}
