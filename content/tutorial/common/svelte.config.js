// import adapter from '@sveltejs/adapter-auto'; // must be installed first
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	// kit: {
	// 	adapter: adapter()
	// },

	vitePlugin: {
		experimental: {
			inspector: {
				showToggleButton: 'always',
        toggleButtonPos: 'bottom-right',
				// holdMode: true
			},
		}
	}
};

export default config;
