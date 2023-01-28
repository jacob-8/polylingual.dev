import type { PageLoad } from './$types';
import { projects } from '$lib/content/raw-content';
export const load = (async ({ params, parent }) => {
    // const { pages } = await parent();
    // console.log({ tutorials })
    return { tutorials: projects, path: params.path };
}) satisfies PageLoad;