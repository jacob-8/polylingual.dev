import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import UnoCSS from 'unocss/vite';

const config: UserConfig = {
	build: {
		target: 'esnext'
	},
	plugins: [
		UnoCSS({
			mode: 'svelte-scoped',
		}),
		sveltekit()
	],
	test: {
    globals: true,
    includeSource: ['src/**/*.ts'],
		include: ['src/**/*.test.ts']
	}
};

export default config;
