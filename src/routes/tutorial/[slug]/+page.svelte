<script lang="ts">
  import { writable } from 'svelte/store';
  import SplitPane from 'svelte-pieces/ui/SplitPane.svelte';
  import { browser, dev } from '$app/environment';
  import Sidebar from './Sidebar.svelte';
  import Stackblitz from './Stackblitz.svelte';
  import MonacoEditor from '$lib/monaco/MonacoEditor.svelte';
  import type { Adapter, EditingConstraints, Exercise, FileStub, Scope, Stub } from '$lib/types';
  import type { PageData } from './$types';
  import Filetree from '$lib/filetree/Filetree.svelte';
  import { prepareFilesForStackblitz } from './prepareFilesForStackblitz';
  export let data: PageData;

  let path = data.exercise.path;
  const files = writable<Stub[]>([]);
  const endstate = writable<Record<string, Stub>>({});
  const selected = writable<FileStub | null>(null);
  const scope = writable<Scope>({ depth: 0, name: '', prefix: '' });
  const editing_constraints = writable<EditingConstraints>({ create: [], remove: [] });

  let adapter: Adapter | undefined;

  $: console.log($files);

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

    reset_complete_states();
    reset_adapter($files);
  }

  let expected: Record<string, string> = {};
  let complete_states: Record<string, boolean> = {};
  $: completed =
    Object.keys(complete_states).length > 0 && Object.values(complete_states).every(Boolean);

  function reset_complete_states() {
    expected = {};
    complete_states = {};
    for (const stub of Object.values($endstate)) {
      if (stub.type === 'file') {
        complete_states[stub.name] = false;
        expected[stub.name] = normalise(stub.contents);
      }
    }
  }

  function normalise(code: string) {
    // TODO think about more sophisticated normalisation (e.g. truncate multiple newlines)
    return code.replace(/\s+/g, ' ').trim();
  }

  function update_complete_states(stubs: Stub[]) {
    for (const stub of stubs) {
      if (stub.type === 'file' && stub.name in complete_states) {
        complete_states[stub.name] = expected[stub.name] === normalise(stub.contents);
        // if (dev) {
        //   compare(stub.name, normalise(stub.contents), expected[stub.name]);
        // }
      }
    }
  }

  async function reset_adapter(stubs: Stub[]) {
    let reload_iframe = true;
    if (adapter) {
      // reload_iframe = await adapter.reset(stubs);
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

  function update_stub({ detail: stub }: CustomEvent<FileStub>) {
    const index = $files.findIndex((s) => s.name === stub.name);
    $files[index] = stub;
    // adapter?.update([stub]).then((reload) => {
    // 	if (reload) {
    // schedule_iframe_reload();
    // 	}
    // });
    update_complete_states([stub]);
  }
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

            <button
              class:text-blue={completed}
              disabled={Object.keys(data.exercise.b).length === 0}
              on:click={() => {
                $files = Object.values(completed ? data.exercise.a : $endstate);
                if (completed) {
                  reset_complete_states();
                } else {
                  update_complete_states($files);
                }
                reset_adapter($files);
              }}
            >
              {#if completed && Object.keys(data.exercise.b).length > 0}
                reset
              {:else}
                solve
                <!-- arrow-right -->
              {/if}
            </button>
          </section>
          <section class="bg-black h-full" slot="b">
            <MonacoEditor stubs={$files} selected={$selected} on:change={update_stub} />
          </section>
        </SplitPane>
      </section>
      <section class="h-full" slot="b">
        {#if browser}
          <Stackblitz
            title={`${data.exercise.part.title}, ${data.exercise.chapter.title}, ${data.exercise.title}`}
            files={prepareFilesForStackblitz($files)}
          />
        {/if}
      </section>
    </SplitPane>
  </section>
</SplitPane>
