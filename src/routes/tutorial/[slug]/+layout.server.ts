import type { LayoutServerLoad } from './$types';
import { get_tree } from '$lib/server/content';

export const load = (() => {
	return {
		tree: get_tree()
	};
}) satisfies LayoutServerLoad;