import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (({ params }) => {
	if (!params.lang) throw redirect(307, '/zh-TW');
	return { lang: params.lang }
}) satisfies PageLoad;