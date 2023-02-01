<script context="module" lang="ts">
  declare var monaco: typeof import('monaco-editor/esm/vs/editor/editor.api.js');
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { vs_dark_plus } from './monaco-themes';
  import type { editor } from 'monaco-editor/esm/vs/editor/editor.api.js';
  import { mapOfExtensionToLanguage } from './languages';

  export let original: string;
  export let modified: string;
  export let options: editor.IDiffEditorConstructionOptions;
  export let extension = 'html';

  let diffEditor: editor.IStandaloneDiffEditor;
  let container: HTMLDivElement;
  let heightPixels = 100;

  onMount(() => {
    let destroyed = false;

    import('./load-monaco-scripts').then(() => {
      if (destroyed) return;
      createEditor();
      autoSetHeight();
    });

    return () => {
      destroyed = true;
      diffEditor?.dispose();
    };
  });

  function createEditor() {
    monaco.editor.defineTheme('vs-dark-plus', vs_dark_plus);
    monaco.editor.setTheme('vs-dark-plus');
    diffEditor = monaco.editor.createDiffEditor(container, {
      ...options,
      // lineNumbersMinChars: 2,
      // @ts-ignore
      lineNumbers: false,
      automaticLayout: true,
      scrollBeyondLastLine: false,
      scrollbar: {
        alwaysConsumeMouseWheel: false,
      },
      readOnly: true,
      renderOverviewRuler: false,
      wordWrap: 'on',
      wrappingIndent: 'same',
      renderIndicators: false,
      padding: {
        top: 8,
        bottom: 8,
      },
    });

    const language = mapOfExtensionToLanguage[extension] || extension;

    diffEditor.setModel({
      original: monaco.editor.createModel(original, language),
      modified: monaco.editor.createModel(modified, language),
    });
  }

  $: if (diffEditor && typeof original === 'string' && typeof modified === 'string') {
    const model = diffEditor.getModel();
    if (model) {
      model.original.setValue(original);
      model.modified.setValue(modified);
      autoSetHeight();
    }
  }

  async function autoSetHeight(): Promise<void> {
    // from https://github.com/microsoft/monaco-editor/issues/794
    // still have no way to count wrapped lines in diff editor, but will not be an issue if switching to normal editor + highlights for diff
    const changes = diffEditor.getLineChanges();
    if (!changes) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      return autoSetHeight();
    }
    const originalLineCount = diffEditor.getModel()?.original.getLineCount() || 0;

    let finalLineCount = originalLineCount;
    for (let change of changes || []) {
      let diff = change.modifiedEndLineNumber - change.modifiedStartLineNumber + 2; // started with 1 but we give an extra line per diff to help with line wraps
      finalLineCount += Math.abs(diff);
    }
    heightPixels = finalLineCount * 19 + 16;
  }
</script>

<div class="w-full relative overflow-hidden" style="height: {heightPixels}px">
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
