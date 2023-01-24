<script context="module" lang="ts">
  declare var require: any;
  declare var monaco: typeof import('monaco-editor/esm/vs/editor/editor.api.js');
</script>

<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { vs_dark_plus } from './monaco-themes';
  import type { editor } from 'monaco-editor/esm/vs/editor/editor.api.js';
  import type { FileStub } from '$lib/types';
  export let stub: FileStub;
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
    if (window.MonacoEnvironment) {
      createEditor();
    } else {
      const script = document.createElement('script');
      script.src = `https://unpkg.com/monaco-editor@0.27.0/min/vs/loader.js`;
      document.head.appendChild(script);
      script.onload = () => {
        require.config({
          paths: { vs: 'https://unpkg.com/monaco-editor@0.27.0/min/vs' },
        });
        // Before loading vs/editor/editor.main, define a global MonacoEnvironment that overwrites the default worker url location (used when creating WebWorkers). The problem here is that HTML5 does not allow cross-domain web workers, so we need to proxy the instantiation of a web worker through a same-domain script
        window.MonacoEnvironment = { getWorkerUrl: () => proxy };
        let proxy = URL.createObjectURL(
          new Blob(
            [
              `self.MonacoEnvironment = {
                baseUrl: 'https://unpkg.com/monaco-editor@0.27.0/min/'
              };
              importScripts('https://unpkg.com/monaco-editor@0.27.0/min/vs/base/worker/workerMain.js');`,
            ],
            { type: 'text/javascript' }
          )
        );
        require(['vs/editor/editor.main'], createEditor);
      };
    }
  });

  function createEditor() {
    monaco.editor.defineTheme('vs-dark-plus', vs_dark_plus);
    monaco.editor.setTheme('vs-dark-plus');
    editor = monaco.editor.create(container, {
      ...options,
      language: languageOfStub(stub),
      value: stub.contents,
    });
  }

  function languageOfStub(stub: FileStub) {
    const extension = stub.basename.split('.').pop() as string;
    return mapOfExtensionToLanguage[extension] || extension;
  }

  $: if (editor) {
    const model = editor.getModel();
    if (model && stub.contents !== model.getValue()) {
      monaco.editor.setModelLanguage(model, languageOfStub(stub));
      model.applyEdits([{ range: model.getFullModelRange(), text: stub.contents }]);
    }
  }

  const dispatch = createEventDispatcher<{ change: FileStub }>();
  function emitChange() {
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