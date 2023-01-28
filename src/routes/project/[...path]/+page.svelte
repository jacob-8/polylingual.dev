<script lang="ts">
  import { parseTree } from '$lib/content/parse-tree';
  import { updatedProjects } from '$lib/content/hmrUpdatedContent';
  import type { PageData } from './$types';

  export let data: PageData;
  $: tutorials = $updatedProjects || data.tutorials;
</script>

{data.path}

<pre>{JSON.stringify(parseTree(tutorials), null, 2)}</pre>

<pre>{JSON.stringify(tutorials, null, 2)}</pre>
