import type { LayoutLoad } from './$types';

export const load = (({ params }) => {
  const lang: 'en' | 'zh-TW' = params.lang as 'en' | 'zh-TW';
  return { lang };
}) satisfies LayoutLoad;

