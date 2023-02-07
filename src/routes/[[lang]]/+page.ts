import type { PageLoad } from './$types';

export const load = (({ params }) => {
	console.log({ params })
	return { lang: params.lang || 'zh-TW' }
}) satisfies PageLoad;