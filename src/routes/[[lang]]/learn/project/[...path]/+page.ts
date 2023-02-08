import { redirect } from '@sveltejs/kit';
import { projectsDirectory } from '$lib/content/raw-content';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
    const [project, lesson, stage] = params.path.split('/');
    if (!project || !lesson || !stage) {
        throw redirect(307, 'project/01-language-learning-reader/01-proof-of-concept/01-introduction');
    }

    return { projectsDirectory, project, lesson, stage, lang: params.lang };
}) satisfies PageLoad;