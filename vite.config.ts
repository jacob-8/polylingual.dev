import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import UnoCSS from 'unocss/vite';

const config: UserConfig = {
	plugins: [
		UnoCSS({
			mode: 'svelte-scoped',
		}),
		sveltekit()
	],
	test: {
		include: ['src/**/*.test.ts']
	}
};

export default config;
