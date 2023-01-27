<script lang="ts">
  // https://developer.stackblitz.com/platform/api/javascript-sdk-vm
  // await vm.editor.setTheme('light');
  // await vm.preview.setUrl('/about');
  // const url = await vm.preview.getUrl();

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
  export let hideNavigation = false;

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
    hideNavigation,
    hideExplorer,
    terminalHeight: 50,
    view: 'preview',
  };

  let embedElement: HTMLDivElement;
  let stackblitzVM: VM;
  let filesSentToVM: ProjectFiles;

  onMount(async () => {
    stackblitzVM = await sdk.embedProject(embedElement, project, embedOptions);
    filesSentToVM = { ...project.files };
  });

  $: updateFiles(files);

  async function updateFiles(updatedFiles: ProjectFiles) {
    if (!stackblitzVM) return;

    const { filesToCreate, filenamesToDestroy } = filesWithChanges(filesSentToVM, updatedFiles);
    const hasFilesToCreate = Object.keys(filesToCreate).length > 0;
    const hasFilenamesToDestroy = filenamesToDestroy.length > 0;
    if (hasFilesToCreate || hasFilenamesToDestroy) {
      writeToFiles(filesToCreate, filenamesToDestroy);
      filesSentToVM = { ...updatedFiles};
    } 
  }

  async function writeToFiles(filesToCreate: ProjectFiles, deletedFilenames: string[] = []) {
    await stackblitzVM.applyFsDiff({
      create: filesToCreate,
      destroy: deletedFilenames,
    });
  }

  let sidebarShown = false;
  export function toggleSidebar() {
    stackblitzVM?.editor.showSidebar(!sidebarShown);
    sidebarShown = !sidebarShown;
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
