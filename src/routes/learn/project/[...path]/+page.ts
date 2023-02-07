import type { PageLoad } from './$types';
import { projectsDirectory } from '$lib/content/raw-content';
export const load = (async ({ params, parent }) => {
    // const { pages } = await parent();
    const [project, lesson, stage] = params.path.split('/'); // handle undefined with a reroute back home
    // import { error } from '@sveltejs/kit';
    // throw error(404, 'No such tutorial found');

    return { projectsDirectory, project, lesson, stage };
}) satisfies PageLoad;