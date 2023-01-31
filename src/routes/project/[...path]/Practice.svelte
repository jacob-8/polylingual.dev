<script lang="ts">
  import { browser } from '$app/environment';
  import Explorer from '$lib/filetree/Explorer.svelte';
  import MonacoEditorScripts from '$lib/monaco/MonacoEditorScripts.svelte';
  import { DEFAULT_MONACO_OPTIONS } from '$lib/monaco/options';
  import Stackblitz from '$lib/stackblitz/Stackblitz.svelte';
  import type { Stage, StageFiles } from '$lib/types';
  import SplitPane from 'svelte-pieces/ui/SplitPane.svelte';
  import { writable } from 'svelte/store';
  import { filesObjectsAreSame } from './helpers/filesObjectsAreSame';

  export let stage: Stage;
  export let mobile: boolean;
  export let mobile_view: 'tutorial' | 'editor' | 'preview';

  const files = writable<StageFiles>({});
  const selected = writable<string>();

  $: setup_stage(stage);
  function setup_stage(stage: Stage) {
    $files = { ...stage.app_start };
    setFocus();
  }

  function setFocus() {
    const firstFile = Object.keys($files)[0];
    $selected = stage.file_to_focus || firstFile;
  }

  $: completed = filesObjectsAreSame($files, stage.app_finish);

  function toggle_solution() {
    if (completed) {
      $files = { ...stage.app_start };
    } else {
      $files = { ...stage.app_finish };
    }
    setFocus();
  }
</script>

<SplitPane pos={mobile ? (mobile_view === 'editor' ? 100 : 0) : 50} type="vertical" min={0}>
  <section class="h-full bg-black" slot="a">
    <SplitPane pos={27} max={100}>
      <section class="h-full flex flex-col border-r border-gray-500/50" slot="a">
        <Explorer directoryPath={stage.meta.scope.directory} files={$files} {selected} />

        <button
          class:bg-gray-500={completed}
          on:click={toggle_solution}
          class="bg-blue text-white p-2 text-lg"
        >
          {#if completed}
            reset
          {:else}
            solve
            <span class="i-carbon-arrow-right" />
          {/if}
        </button>
      </section>
      <section class="bg-black h-full" slot="b">
        <MonacoEditorScripts
          stub={{
            name: $selected,
            basename: $selected,
            text: true,
            contents: $files[$selected],
          }}
          options={DEFAULT_MONACO_OPTIONS}
          on:change={({ detail: stub }) => {
            $files[stub.name] = stub.contents;
          }}
        />
      </section>
    </SplitPane>
  </section>
  <section class="h-full" slot="b">
    {#if browser}
      <Stackblitz
        hideExplorer={false}
        title={`${stage.location.project}, ${stage.location.lesson}, ${stage.location.name}`}
        files={$files}
      />
    {/if}
  </section>
</SplitPane>
