<script lang="ts">
  import { writable } from 'svelte/store';
  import SplitPane from 'svelte-pieces/ui/SplitPane.svelte';
  import { browser } from '$app/environment';
  import Sidebar from './Sidebar.svelte';
  import Stackblitz from './Stackblitz.svelte';
  import MonacoEditor from '$lib/monaco/MonacoEditor.svelte';
  import type { Adapter, EditingConstraints, Exercise, FileStub, Scope, Stub } from '$lib/types';
  import type { PageData } from './$types';
  import Filetree from '$lib/filetree/Filetree.svelte';
  export let data: PageData;

  let path = data.exercise.path;
  const files = writable<Stub[]>([]);
  const endstate = writable<Record<string, Stub>>({});
  const selected = writable<FileStub | null>(null);
  const scope = writable<Scope>({ depth: 0, name: '', prefix: '' });
  const editing_constraints = writable<EditingConstraints>({ create: [], remove: [] });

  let adapter: Adapter | undefined;

  $: new_exercise(data.exercise);
  function new_exercise(exercise: Exercise) {
    $files = Object.values(exercise.a);
    $scope = exercise.scope;
    path = exercise.path;
    selected.set($files.find((stub) => stub.name === exercise.focus) as FileStub);
    if (exercise.meta.editing_constraints) $editing_constraints = exercise.meta.editing_constraints;
    $endstate = { ...exercise.a };

    for (const stub of Object.values(exercise.b)) {
      if (!$endstate[stub.name] && !$editing_constraints.create.includes(stub.name)) {
        $editing_constraints.create.push(stub.name);
      }
      $endstate[stub.name] = exercise.b[stub.name];
    }
  }

  // Loads the adapter initially or resets it. This method can throw.
  async function reset_adapter(stubs: Stub[]) {
    let reload_iframe = true;
    if (adapter) {
      reload_iframe = await adapter.reset(stubs);
    } else {
      // @ts-ignore
      adapter = {};
      set_iframe_src(adapter?.base + path);
    }
    if (reload_iframe) {
      set_iframe_src(adapter?.base + path);
    }
    return adapter;
  }

  function set_iframe_src(url: string) {}
</script>

<SplitPane pos={33} min={0}>
  <section class="h-full" slot="a">
    <Sidebar
      index={data.tree}
      exercise={data.exercise}
      on:select={(e) => {
        const file = data.exercise.a[e.detail.file];
        if (file.type === 'file') selected.set(file);
      }}
    />
  </section>
  <section class="h-full" slot="b">
    <SplitPane pos={50} type="vertical">
      <section class="h-full" slot="a">
        <SplitPane pos={27}>
          <section class="h-full" slot="a">
            <Filetree
              {scope}
              {endstate}
              {files}
              constraints={editing_constraints}
              {selected}
              on:change={() => {
                reset_adapter($files);
              }}
            />
          </section>
          <section class="bg-green/25 h-full" slot="b">
            <MonacoEditor stubs={[]} />
          </section>
        </SplitPane>
      </section>
      <section class="h-full" slot="b">
        {#if browser}
          <!-- <Stackblitz /> -->
        {/if}
      </section>
    </SplitPane>
  </section>
</SplitPane>
