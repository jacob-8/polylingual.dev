<script lang="ts">
  import { dev } from '$app/environment';
  import type { FileStub, Stub } from '$lib/types';
  import { createEventDispatcher, onMount } from 'svelte';
  import { vs_dark_plus } from './monaco-themes.js';

  const mapOfExtensionToLanguage: Record<string, string> = {
    js: 'javascript',
    ts: 'typescript',
    svelte: 'handlebars',
    md: 'markdown', // TODO
  };

  const mapOfURLtoModel = new Map<string, import('monaco-editor').editor.ITextModel>();

  export let stubs: Stub[];
  export let selected: Stub | null = null;

  const dispatch = createEventDispatcher<{ change: FileStub }>();

  let container: HTMLDivElement;
  let instance: ReturnType<typeof init> | undefined;

  onMount(() => {
    let destroyed = false;

    if (dev && !/chrome/i.test(navigator.userAgent)) {
      container.innerHTML =
        '<p style="text-align: center; width: 20em; max-width: calc(100% - 4rem)">The code editor requires Chrome during development, as it uses module workers</p>';
      return;
    }

    import('./load-monaco.js').then(({ monaco }) => {
      if (destroyed) return;
      instance = init(monaco);
    });

    return () => {
      destroyed = true;
      if (instance) {
        const VALUE_TO_REMOVE_ALL_FILES: [] = [];
        instance.update_files(VALUE_TO_REMOVE_ALL_FILES);
        instance.editor.dispose();
      }
    };
  });

  function init(monaco: typeof import('monaco-editor')) {
    monaco.editor.defineTheme('vs-dark-plus', vs_dark_plus);
    monaco.editor.setTheme('vs-dark-plus');
    // if adding textmate grammar using https://github.com/zikaari/monaco-editor-textmate https://github.com/ChristopherHButler/vscode-themes-in-monaco/blob/d2ad1847c765bf03ad22853132e8c96c6758c680/src/components/CodeEditor.js#L170 - then the vs-dark-plus theme will have additional effect

    const editor = monaco.editor.create(container, {
      automaticLayout: true,
      lineNumbersMinChars: 3,
      fontFamily: 'Roboto Mono',
      fontSize: 15,
      padding: {
        top: 16,
        bottom: 16,
      },
      minimap: {
        enabled: false,
      },
    });

    let notify = true;

    function update_files(stubs: Stub[]) {
      notify = false;
      for (const stub of stubs) {
        if (stub.type === 'directory') {
          continue;
        }

        const model = mapOfURLtoModel.get(stub.name);

        if (model) {
          const value = model.getValue();

          if (stub.contents !== value) {
            model.pushEditOperations(
              [],
              [
                {
                  range: model.getFullModelRange(),
                  text: stub.contents,
                },
              ],
              () => null
            );
          }
        } else {
          create_file(stub);
        }
      }

      for (const [name, model] of mapOfURLtoModel) {
        if (!stubs.some((stub) => stub.name === name)) {
          model.dispose();
          mapOfURLtoModel.delete(name);
        }
      }
      notify = true;
    }

    function create_file(stub: FileStub) {
      stub = deepCopyToAvoidMemoryLeak(stub);

      const type: string = stub.basename.split('.').pop() as string;

      const model = monaco.editor.createModel(
        stub.contents,
        mapOfExtensionToLanguage[type] || type,
        new monaco.Uri().with({ path: stub.name })
      );

      model.updateOptions({ tabSize: 2 });

      model.onDidChangeContent(() => {
        const contents = model.getValue();

        if (notify) {
          stub.contents = contents;
          dispatch('change', stub);
        }
      });

      mapOfURLtoModel.set(stub.name, model);
    }

    return {
      editor,
      set_theme: monaco.editor.setTheme,
      update_files,
      create_file,
    };

    function deepCopyToAvoidMemoryLeak(stub: FileStub): FileStub {
      return JSON.parse(JSON.stringify(stub));
    }
  }

  $: if (instance) {
    instance.update_files(stubs);
  }

  $: if (instance && stubs) {
    const model = selected && mapOfURLtoModel.get(selected.name);
    instance.editor.setModel(model ?? null);
  }
</script>

<div class="w-full h-full" bind:this={container} />

<style>
  div :global(.core-guide-indent.vertical) {
    display: none;
  }

  div :global(.decorationsOverviewRuler) {
    display: none !important;
  }
</style>
