<script lang="ts">
  // https://developer.stackblitz.com/platform/api/javascript-sdk-vm

  import { filesWithChanges } from './filesWithChanges';
  import sdk, {
    type VM,
    type Project,
    type EmbedOptions,
    type ProjectFiles,
  } from '@stackblitz/sdk';
  import { onMount } from 'svelte';
  import { check_or_ask_for_key } from './add_keys_to_files';

  export let files: ProjectFiles;
  export let title: string;
  export let hideExplorer = false;
  export let hideNavigation = false;
  export let url = '/';

  $: files_with_keys = check_or_ask_for_key(files);

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
    const project: Project = {
      title,
      files: files_with_keys,
      description: 'Created by Polylingual Development for learning via polylingual.dev/learn',
      template: 'node',
      settings: {
        compile: { trigger: 'keystroke' },
      },
    };

    stackblitzVM = await sdk.embedProject(embedElement, project, embedOptions);
    filesSentToVM = { ...project.files };
  });

  $: updateFiles(files_with_keys);
  $: stackblitzVM?.preview.setUrl(url);

  async function updateFiles(updatedFiles: ProjectFiles) {
    if (!stackblitzVM) return;

    const { filesToCreate, filenamesToDestroy } = filesWithChanges(filesSentToVM, updatedFiles);
    const has_files_to_create = Object.keys(filesToCreate).length > 0;
    const has_filenames_to_destroy = filenamesToDestroy.length > 0;
    if (has_files_to_create || has_filenames_to_destroy) {
      writeToFiles(filesToCreate, filenamesToDestroy);
      filesSentToVM = { ...updatedFiles };
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
