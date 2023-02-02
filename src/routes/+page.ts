import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async () => {
	throw redirect(307, '/project/01-language-learning-reader/01-proof-of-concept/01-introduction'); // can't use chinese characters here - SvelteKit bug?
}) satisfies PageLoad;