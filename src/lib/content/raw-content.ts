export const projectsDirectory = import.meta.glob(['/projects/**', '!/projects/common/package-lock.json'], { as: 'raw', eager: true });

import { updatedProjectsDirectory } from "./hmrUpdatedContent";
import { browser } from "$app/environment";
if (browser) {
  updatedProjectsDirectory.set(projectsDirectory); // optional to switch right from SSR to Client loaded
}

if (import.meta.hot) {
  import.meta.hot.accept((module) => {
    // if (module?.projectsDirectory) {
      // updatedProjectsDirectory.set(module.projectsDirectory) // if the set is run at the base level, then this can just be an empty accept handler
    // }
  })
}
