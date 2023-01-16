import type { PageServerLoad } from './$types';
import { get_exercise } from '$lib/server/content';
import { error } from '@sveltejs/kit';

export const load = (({ params }) => {
    const exercise = get_exercise(params.slug);

    if (!exercise) {
        throw error(404, 'No such tutorial found');
    }

    return {
        exercise
    };
}) satisfies PageServerLoad;