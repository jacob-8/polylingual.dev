<script lang="ts">
  import { parseTree } from '$lib/content/parse-tree';
  import { updatedProjects } from '$lib/content/hmrUpdatedContent';
  import type { PageData } from './$types';
  import { prepareLessonStages } from '$lib/content/prepare-lesson-stages';

  export let data: PageData;
  $: projects = $updatedProjects || data.projects;
  $: tree = parseTree(projects);
  $: lesson = prepareLessonStages({ projects: tree, project: data.project, lesson: data.lesson });
</script>

{data.project}
{data.lesson}
{data.stage}

<pre>{JSON.stringify(lesson, null, 2)}</pre>
<pre>{JSON.stringify(tree, null, 2)}</pre>
<pre>{JSON.stringify(projects, null, 2)}</pre>
