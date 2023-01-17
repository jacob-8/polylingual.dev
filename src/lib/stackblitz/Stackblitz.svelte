<script lang="ts">
  // https://developer.stackblitz.com/platform/api/javascript-sdk-vm
  // await vm.editor.setTheme('light');
  // await vm.preview.setUrl('/about');

  import { filesWithChanges } from './filesWithChanges';
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

  const project: Project = {
    title,
    files,
    description: 'Created by Polylingual Development for learning via learn.polylingual.dev',
    template: 'node',
    settings: {
      compile: { trigger: 'keystroke' },
    },
  };

  const embedOptions: EmbedOptions = {
    // hideNavigation: true,
    hideExplorer,
    terminalHeight: 80,
    view: 'preview',
  };
  
  let embedElement: HTMLDivElement;
  let stackblitzVM: VM;

  onMount(async () => {
    stackblitzVM = await sdk.embedProject(embedElement, project, embedOptions);
  });

  $: updateFiles(files);

  async function updateFiles(updatedFiles: ProjectFiles) {
    const filesInVm = await stackblitzVM?.getFsSnapshot();
    if (!filesInVm) return;

    const changedFiles = filesWithChanges(filesInVm, updatedFiles);
    const hasChanges = Object.keys(changedFiles).length > 0;
    if (hasChanges) writeToFiles(changedFiles);
  }

  async function writeToFiles(updatedFiles: ProjectFiles) {
    await stackblitzVM.applyFsDiff({
      create: updatedFiles,
      destroy: [], // TODO: handle deleted files ['test.js', 'error.log'],
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
