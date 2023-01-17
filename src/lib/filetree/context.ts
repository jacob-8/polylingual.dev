import { setContext, getContext } from 'svelte';

type FileTreeContext = {
	endstate: import('svelte/store').Writable<Record<string, import('$lib/types').Stub>>;
	files: import('svelte/store').Writable<import('$lib/types').Stub[]>;
	selected: import('svelte/store').Writable<import('$lib/types').FileStub | null>;
	readonly: import('svelte/store').Writable<boolean>;
	scope: import('svelte/store').Writable<import('$lib/types').Scope>;
	select: (file: import('$lib/types').FileStub) => void;
	add: (name: string, type: 'file' | 'directory') => Promise<void>;
	rename: (stub: import('$lib/types').Stub, name: string) => Promise<void>;
	remove: (stub: import('$lib/types').Stub) => Promise<void>;
}

const key = {};

export function set(context: FileTreeContext) {
	setContext<FileTreeContext>(key, context);
}

export function get() {
	return getContext<FileTreeContext>(key);
}
