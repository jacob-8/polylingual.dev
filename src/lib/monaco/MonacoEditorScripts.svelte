<script context="module" lang="ts">
  declare var monaco: typeof import('monaco-editor/esm/vs/editor/editor.api.js');
</script>

<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { vs_dark_plus } from './monaco-themes';
  import type { editor } from 'monaco-editor/esm/vs/editor/editor.api.js';
  import type { FileStub } from '$lib/types';
  export let stub: FileStub | null;
  export let options: editor.IStandaloneEditorConstructionOptions;
  let editor: editor.IStandaloneCodeEditor;
  let container: HTMLDivElement;

  const mapOfExtensionToLanguage: Record<string, string> = {
    js: 'javascript',
    ts: 'typescript',
    svelte: 'handlebars',
    md: 'markdown', // TODO
  };

  onMount(() => {
    let destroyed = false;

    import('./load-monaco-scripts').then(() => {
      if (destroyed) return;
      createEditor();
    });

    return () => {
      destroyed = true;
      editor?.dispose();
    };
  });

  function createEditor() {
    monaco.editor.defineTheme('vs-dark-plus', vs_dark_plus);
    monaco.editor.setTheme('vs-dark-plus');
    editor = monaco.editor.create(container, {
      ...options,
      language: 'handlebars',
      value: '',
    });
  }

  function languageOfStub(stub: FileStub) {
    const extension = stub.basename.split('.').pop() as string;
    return mapOfExtensionToLanguage[extension] || extension;
  }

  $: if (editor && stub) {
    const model = editor.getModel();
    if (model && stub.contents !== model.getValue()) {
      monaco.editor.setModelLanguage(model, languageOfStub(stub));
      model.applyEdits([{ range: model.getFullModelRange(), text: stub.contents }]);
    }
  }

  const dispatch = createEventDispatcher<{ change: FileStub }>();
  function emitChange() {
    if (!stub) return;
    dispatch('change', {
      ...stub,
      contents: editor.getValue(),
    });
  }

  // monaco.languages.typescript.typescriptDefaults.setCompilerOptions({ allowJs: true, esModuleInterop: true, })
</script>

<div class="w-full h-full relative overflow-hidden">
  <div class="absolute inset-0 w-full h-full" on:keyup={emitChange} bind:this={container} />
</div>

<style>
  div :global(.core-guide-indent.vertical) {
    display: none;
  }

  div :global(.decorationsOverviewRuler) {
    display: none !important;
  }
</style>
