<script lang="ts">
  import { dev } from '$app/environment';
    import type { FileStub, Stub } from '$lib/types';
  import { createEventDispatcher, onMount } from 'svelte';
  import { svelteLight, svelteDark } from './monaco-themes.js';

  const mapOfExtensionToLanguage: Record<string, string> = {
    js: 'javascript',
    ts: 'typescript',
    svelte: 'html', // TODO
  };

  const mapOfURLtoModel = new Map<string, import('monaco-editor').editor.ITextModel>();

  export let stubs: Stub[];
  export let selected: Stub | null = null;

  const dispatch = createEventDispatcher();

  let container: HTMLDivElement;
  let instance: ReturnType<typeof init> | undefined;

  let width = 0;
  let height = 0;

  /**
   * The iframe sometimes takes focus control in ways we can't prevent
   * while the editor is focussed. Refocus the editor in these cases.
   * This boolean tracks whether or not the editor should be refocused.
   */
  let preserve_focus = true;
  /** @type {any} */
  let remove_focus_timeout: any;

  onMount(() => {
    let destroyed = false;

    if (dev && !/chrome/i.test(navigator.userAgent)) {
      container.innerHTML =
        '<p style="text-align: center; width: 20em; max-width: calc(100% - 4rem)">The code editor requires Chrome during development, as it uses module workers</p>';
      return;
    }

    let dark_mode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    import('./load-monaco.js').then(({ monaco }) => {
      if (destroyed) return;
      instance = init(monaco, dark_mode);
    });

    const on_mode_change = (event: MediaQueryListEvent) => {
      const dark = event.matches;
      if (dark !== dark_mode) {
        dark_mode = dark;
        instance?.set_theme(dark ? 'svelte-dark' : 'svelte');
      }
    };
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', on_mode_change);

    return () => {
      destroyed = true;
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', on_mode_change);
      if (instance) {
        instance.update_files([]); // removes all files
        instance.editor.dispose();
      }
    };
  });

  function init(monaco: typeof import('monaco-editor'), dark_mode: boolean) {
    monaco.editor.defineTheme('svelte', svelteLight);
    monaco.editor.defineTheme('svelte-dark', svelteDark);
    monaco.editor.setTheme(dark_mode ? 'svelte-dark' : 'svelte');

    const editor = monaco.editor.create(container, {
      fontFamily: 'Roboto Mono',
      fontSize: 13,
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
      // deep-copy stub so we can mutate it and not create a memory leak
      stub = JSON.parse(JSON.stringify(stub));

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
  }

  $: if (instance) {
    instance.update_files(stubs);
  }

  // $: if (instance) {
  //   instance.editor.updateOptions({ readOnly: read_only });
  // }

  $: if (instance && stubs) {
    const model = selected && mapOfURLtoModel.get(selected.name);
    instance.editor.setModel(model ?? null);
  }

  $: if (instance && (width || height)) {
    instance.editor.layout();
  }
</script>

<svelte:window
  on:message={(e) => {
    if (preserve_focus && e.data.type === 'focus_on_editor') {
      instance?.editor.focus();
    }
  }}
/>

<div class="w-full h-full" bind:clientWidth={width} bind:clientHeight={height}>
  <div
    class="w-full h-full"
    bind:this={container}
    on:focusin={() => {
      clearTimeout(remove_focus_timeout);
      preserve_focus = true;
    }}
    on:focusout={() => {
      // Heuristic: user did refocus themmselves if focus_on_editor
      // doesn't happen in the next few miliseconds. Needed
      // because else navigations inside the iframe refocus the editor.
      remove_focus_timeout = setTimeout(() => {
        preserve_focus = false;
      }, 500);
    }}
  />
</div>

<style>
  /* div {
    display: flex;
    align-items: center;
    justify-content: center;
    tab-size: 2;
  } */

  /* TODO figure out how to make the indent guides
	   play nicely with fonts other than Menlo */
  div :global(.core-guide-indent.vertical),
  div :global(.core-guide-indent-active.vertical) {
    display: none;
  }

  /* TODO figure out how to remove the weird 1px line
	   in the scroll gutter */
  div :global(.decorationsOverviewRuler) {
    display: none !important;
  }

  div :global(.monaco-editor .view-overlays .current-line) {
    border: none;
  }
</style>
