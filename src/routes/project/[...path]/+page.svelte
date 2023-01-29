<script lang="ts">
  import type { PageData } from './$types';
  import { parseTree } from '$lib/content/parse-tree';
  import { updatedProjectsDirectory } from '$lib/content/hmrUpdatedContent';
  import { prepareLessonStages } from '$lib/content/prepare-lesson-stages';

  export let data: PageData;
  $: projectsDirectory = $updatedProjectsDirectory || data.projectsDirectory;
  $: projects = parseTree(projectsDirectory);
  $: lesson = prepareLessonStages({ projects, project: data.project, lesson: data.lesson });
</script>

{data.project}
{data.lesson}
{data.stage}

<pre>{JSON.stringify(lesson, null, 2)}</pre>
<pre>{JSON.stringify(projects, null, 2)}</pre>
<pre>{JSON.stringify(projectsDirectory, null, 2)}</pre>
