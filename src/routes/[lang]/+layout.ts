export const prerender = true;
import type { LayoutLoad } from './$types';

export const load = (({ params }) => {
    return { lang: params.lang };
}) satisfies LayoutLoad;

