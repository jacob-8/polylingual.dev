<script lang="ts">
  import sdk, {
    type VM,
    type Project,
    type EmbedOptions,
    type ProjectFiles,
  } from '@stackblitz/sdk';
  import { onMount } from 'svelte';

  export let files: ProjectFiles;
  export let title: string;
	export let hideExplorer = false;

  let embedElement: HTMLDivElement;
  let vm: VM;

  $: project = {
    title,
    files,
    description: 'Created by Polylingual Development for learning via learn.polylingual.dev',
    template: 'node',
    settings: {
      compile: { trigger: 'keystroke' },
    },
  } satisfies Project;

  const embedOptions: EmbedOptions = {
    // openFile: 'index.js',
    // hideNavigation: true,
    hideExplorer,
    terminalHeight: 80,
    view: 'preview',
  };

  onMount(async () => {
    console.log({ project });
    vm = await sdk.embedProject(embedElement, project, embedOptions);
  });

  async function writeToFiles() {
    if (!vm) {
      console.error('Stackblitz SDK vm is not available');
      return;
    }

    await vm.applyFsDiff({
      create: {
        'index.js': `console.log('Hello World!')`,
        'package.json': `{ "scripts": { "start": "node index.js" } }`,
      },
      destroy: ['test.js', 'error.log'],
    });
  }
</script>

<div class="iframe-container h-full overflow-hidden">
  <div bind:this={embedElement} />
</div>

<style>
  .iframe-container :global(iframe) {
    height: 100%;
    border: 0;
  }
</style>
