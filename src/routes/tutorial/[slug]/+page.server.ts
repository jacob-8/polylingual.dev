import type { PageServerLoad } from './$types';
import { get_exercise } from '$lib/server/content';
import { error } from '@sveltejs/kit';

export const load = (async ({ params, parent }) => {
    const { tree } = await parent();
    const exercise = get_exercise(tree, params.slug);

    if (!exercise) {
        throw error(404, 'No such tutorial found');
    }

    return {
        exercise,
    };
}) satisfies PageServerLoad;