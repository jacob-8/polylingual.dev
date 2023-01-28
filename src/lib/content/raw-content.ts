export const projects = import.meta.glob(['/projects/**'], { as: 'raw', eager: true });

import { updatedProjects } from "./hmrUpdatedContent";
import { browser } from "$app/environment";
if (browser) {
  updatedProjects.set(projects); // optional to switch right from SSR to Client loaded
}

if (import.meta.hot) {
  import.meta.hot.accept((module) => {
    if (module?.projects) {
      // updatedProjects.set(module.projects) // if the set is run at the base level, then this can just be an empty accept handler
    }
  })
}
