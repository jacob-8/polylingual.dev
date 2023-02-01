<script context="module" lang="ts">
  declare var monaco: typeof import('monaco-editor/esm/vs/editor/editor.api.js');
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { vs_dark_plus } from './monaco-themes';
  import type { editor } from 'monaco-editor/esm/vs/editor/editor.api.js';
  import { mapOfExtensionToLanguage } from './languages';

  export let value: string;
  export let options: editor.IStandaloneEditorConstructionOptions = {};
  export let extension: string;
  $: language = mapOfExtensionToLanguage[extension] || extension;

  let editor: editor.IStandaloneCodeEditor;
  let container: HTMLDivElement;
  let heightPixels = 100;

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
      // lineNumbersMinChars: 2,
      // @ts-ignore
      lineNumbers: false,
      minimap: {
        enabled: false,
      },
      automaticLayout: true,
      scrollBeyondLastLine: false,
      scrollbar: {
        alwaysConsumeMouseWheel: false,
      },
      readOnly: true,
      wordWrap: 'on',
      wrappingIndent: 'same',
      language,
      value,
      padding: {
        top: 8,
        bottom: 8,
      },
      folding: false,
    });

    editor.onDidContentSizeChange(updateHeight);
  }

  $: if (editor && value) {
    const model = editor.getModel();
    if (model && value !== model.getValue()) {
      monaco.editor.setModelLanguage(model, language);
      model.applyEdits([{ range: model.getFullModelRange(), text: value }]);
    }
  }

  async function updateHeight(): Promise<void> {
    // from https://github.com/microsoft/monaco-editor/issues/794
    heightPixels = editor.getContentHeight();
    // TODO: magic height used here, in diff editor, and Code.svelte needs refactored out
  }
</script>

<div class="w-full relative overflow-hidden" style="height: {Math.min(500, heightPixels)}px">
  <div class="absolute inset-0 w-full h-full" bind:this={container} />
</div>

<style>
  div :global(.core-guide-indent.vertical) {
    display: none;
  }

  div :global(.decorationsOverviewRuler) {
    display: none !important;
  }
</style>
