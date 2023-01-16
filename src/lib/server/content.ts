import type { DirectoryStub, Exercise, FileStub } from '$lib/types';
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

function json(file: string) {
	return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

export function get_index() {
	const parts = [];
	let last_exercise: import('$lib/types').ExerciseRaw | null = null;
	let last_part_meta = null;
	let last_chapter_meta = null;

	for (const part of fs.readdirSync('content/tutorial')) {
		if (!/^\d{2}-/.test(part)) continue;

		const part_meta = {
			...json(`content/tutorial/${part}/meta.json`),
			slug: part
		};

		const chapters = [];

		for (const chapter of fs.readdirSync(`content/tutorial/${part}`)) {
			if (!/^\d{2}-/.test(chapter)) continue;

			const chapter_meta = {
				...json(`content/tutorial/${part}/${chapter}/meta.json`),
				slug: chapter
			};

			const exercises = [];

			for (const exercise of fs.readdirSync(`content/tutorial/${part}/${chapter}`)) {
				if (!/^\d{2}-/.test(exercise)) continue;

				const dir = `content/tutorial/${part}/${chapter}/${exercise}`;
				if (!fs.statSync(dir).isDirectory()) continue;

				const text = fs.readFileSync(`${dir}/README.md`, 'utf-8');
				const { frontmatter, markdown } = extract_frontmatter(text, dir);
				const { title, path = '/', focus } = frontmatter;
				const slug = exercise.slice(3);
				const meta = fs.existsSync(`${dir}/meta.json`) ? json(`${dir}/meta.json`) : {};

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

				exercises.push(
					(last_exercise = {
						slug: exercise.slice(3),
						title,
						path,
						focus,
						markdown,
						dir,
						prev: last_exercise ? { slug: last_exercise.slug } : null,
						meta,
						next: null
					})
				);

				last_chapter_meta = chapter_meta;
				last_part_meta = part_meta;
			}

			chapters.push({
				meta: {
					...part_meta,
					...chapter_meta
				},
				exercises
			});
		}

		parts.push({
			slug: part,
			meta: part_meta,
			chapters
		});
	}

	return parts;
}

export function get_exercise(slug: string): Exercise | undefined {
	const index = get_index();

	for (let i = 0; i < index.length; i += 1) {
		const part = index[i];

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
							slug: part.meta.slug,
							title: part.meta.title,
							index: i
						},
						chapter: {
							slug: chapter.meta.slug,
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
						editing_constraints: {
							create: exercise.meta.editing_constraints?.create ?? [],
							remove: exercise.meta.editing_constraints?.remove ?? []
						},
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
