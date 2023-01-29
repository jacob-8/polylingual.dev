import type { PageLoad } from './$types';
import { projectsDirectory } from '$lib/content/raw-content';
export const load = (async ({ params, parent }) => {
    // const { pages } = await parent();
    const [project, lesson, stage] = params.path.split('/'); // handle undefined with a reroute back home
    return { projectsDirectory, project, lesson, stage };
}) satisfies PageLoad;