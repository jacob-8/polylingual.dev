export const projectsDirectory = import.meta.glob(['/projects/**', '/projects/**/.env*', '/projects/**/.gitignore'], { as: 'raw', eager: true });
// '!/projects/common/package-lock.json'

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
