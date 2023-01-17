<script lang="ts">
  import sdk, {
    type VM,
    type Project,
    type EmbedOptions,
    type ProjectFiles,
  } from '@stackblitz/sdk';
  import { onMount } from 'svelte';

  export let files: ProjectFiles;
  let filesInVm: ProjectFiles;

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
    filesInVm = project.files;
    vm = await sdk.embedProject(embedElement, project, embedOptions);
  });

  $: updateFiles(files);

  function updateFiles(updatedFiles: ProjectFiles) {
    if (!vm) return;

    const _filesWithChanges = filesWithChanges(filesInVm, updatedFiles);
    if (Object.keys(_filesWithChanges).length > 0) writeToFiles(_filesWithChanges);
  }

	function filesWithChanges(currentFiles: ProjectFiles, updatedFiles: ProjectFiles): ProjectFiles {
    const filesWithChanges: ProjectFiles = {};
    for (const [key, value] of Object.entries(updatedFiles)) {
      if (currentFiles[key] !== value) {
        filesWithChanges[key] = value;
      }
    }
    return filesWithChanges;
  }

  async function writeToFiles(updatedFiles: ProjectFiles) {
    if (!vm) return;

    await vm.applyFsDiff({
      create: updatedFiles,
      destroy: [],
      // destroy: ['test.js', 'error.log'],
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
