<script lang="ts">
  import { writable } from 'svelte/store';
  import { browser } from '$app/environment';
  import SplitPane from 'svelte-pieces/ui/SplitPane.svelte';
  import type { Stage, StageFiles } from '$lib/types';
  import Explorer from '$lib/filetree/Explorer.svelte';
  import MonacoEditorScripts from '$lib/monaco/MonacoEditorScripts.svelte';
  import Stackblitz from '$lib/stackblitz/Stackblitz.svelte';
  import { objectsAreSame } from './helpers/objectsAreSame';
  import { filesNotInTarget } from './helpers/filesNotInTarget';
  import { page } from '$app/stores';

  export let stage: Stage;
  export let mobile: boolean;
  export let mobile_view: 'tutorial' | 'editor' | 'preview';

  const files = writable<StageFiles>({});
  const selected = writable<string>();

  $: setup_stage(stage);
  function setup_stage(stage: Stage) {
    $files = { ...stage.app_start }; // deep copy to avoid editing app_start when editing $files
    setFocus();
  }

  function setFocus() {
    const BASE_ROUTE_FILE = 'src/routes/+page.svelte';
    const first_file = Object.keys($files)[0];
    const default_file = $files[BASE_ROUTE_FILE] ? BASE_ROUTE_FILE : first_file;
    $selected = stage.file_to_focus || default_file;
  }

  $: completed = objectsAreSame($files, stage.app_finish);
  $: can_add_paths = filesNotInTarget({ take: $files, compareTo: stage.app_finish });
  // $: can_remove_paths = filesNotInTarget({ take: stage.app_finish, compareTo: $files }); // will not work until we can scan last step of stepfiles to see which files to remove from app_finish

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
        <Explorer directoryPath={stage.directory_to_show} {files} {selected} {can_add_paths} />
        {#if !objectsAreSame(stage.app_start, stage.app_finish)}
          <button
            class:bg-gray-500={completed}
            on:click={toggle_solution}
            class="bg-blue text-white p-2 text-lg"
          >
            {#if completed}
              {$page.data.lang === 'zh-TW' ? '復原' : 'reset'}
              {:else}
              {$page.data.lang === 'zh-TW' ? '解決' : 'solve'}
              <span class="i-carbon-arrow-right" />
            {/if}
          </button>
        {/if}
      </section>
      <section class="bg-black h-full" slot="b">
        <MonacoEditorScripts
          stub={{
            name: $selected,
            basename: $selected,
            text: true,
            contents: $files[$selected],
          }}
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
        hideNavigation={true}
        title={`${stage.location.project}, ${stage.location.lesson}, ${stage.location.name}`}
        files={$files}
      />
    {/if}
  </section>
</SplitPane>
