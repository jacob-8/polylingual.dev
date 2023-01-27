// import adapter from '@sveltejs/adapter-auto'; // use for deploying to production - package must be installed first
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// For the tutorial, we need to disable CSRF protection.
		// Don't do this in your own apps unless you know what you're doing!
		// See https://kit.svelte.dev/docs/configuration#csrf for more info.
		csrf: false

		// adapter: adapter() // use for deploying to production
	},

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
