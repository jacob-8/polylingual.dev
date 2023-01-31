<script context="module" lang="ts">
  declare var monaco: typeof import('monaco-editor/esm/vs/editor/editor.api.js');
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { vs_dark_plus } from './monaco-themes';
  import type { editor } from 'monaco-editor/esm/vs/editor/editor.api.js';
  export let original: string;
  export let modified: string;
  export let options: editor.IDiffEditorConstructionOptions;
  let editor: editor.IStandaloneDiffEditor;
  let container: HTMLDivElement;
  let language = 'html';

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

  // https://github.com/microsoft/monaco-editor/issues/794 - autoheight
  function createEditor() {
    monaco.editor.defineTheme('vs-dark-plus', vs_dark_plus);
    monaco.editor.setTheme('vs-dark-plus');
    editor = monaco.editor.createDiffEditor(container, {
      ...options,
      lineNumbersMinChars: 2,
      automaticLayout: true,
      scrollBeyondLastLine: false,
      scrollbar: {
        alwaysConsumeMouseWheel: false,
      },
      readOnly: true,
      renderOverviewRuler: false,
      wordWrap: 'on',
      wrappingIndent: 'same',
    });

    editor.setModel({
      original: monaco.editor.createModel(original, language),
      modified: monaco.editor.createModel(modified, language),
    });
  }
</script>

<div class="w-full h-full relative overflow-hidden">
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
