<script lang="ts">
  import { writable } from 'svelte/store';
  import SplitPane from 'svelte-pieces/ui/SplitPane.svelte';
  import { browser } from '$app/environment';
  import Sidebar from './Sidebar.svelte';
  import MonacoEditor from '$lib/monaco/MonacoEditor.svelte';
  import type { EditingConstraints, Exercise, FileStub, Scope, Stub } from '$lib/types';
  import type { PageData } from './$types';
  import Filetree from '$lib/filetree/Filetree.svelte';
  import Stackblitz from '$lib/stackblitz/Stackblitz.svelte';
  import { prepareFilesForStackblitz } from '$lib/stackblitz/prepareFilesForStackblitz';
    import Header from './Header.svelte';
  export let data: PageData;

  let path = data.exercise.path;
  // const stubs = writable<Stub[]>([]);
  const files = writable<Stub[]>([]);
  const endstate = writable<Record<string, Stub>>({});
  const selected = writable<FileStub | null>(null);
  const scope = writable<Scope>({ depth: 0, name: '', prefix: '' });
  const editing_constraints = writable<EditingConstraints>({ create: [], remove: [] });
  let expected: Record<string, string> = {};
  let complete_states: Record<string, boolean> = {};
  $: completed =
    Object.keys(complete_states).length > 0 && Object.values(complete_states).every(Boolean);

  $: new_exercise(data.exercise);
  function new_exercise(exercise: Exercise) {
    $files = Object.values(exercise.a);
    $scope = exercise.scope;
    path = exercise.path;
    selected.set($files.find((stub) => stub.name === exercise.focus) as FileStub);
    if (exercise.meta.editing_constraints) $editing_constraints = exercise.meta.editing_constraints;
    $endstate = { ...exercise.a };

    for (const stub of Object.values(exercise.b)) {
      if (stub.type === 'file' && stub.contents.startsWith('__delete')) {
        // remove file
        if (!$editing_constraints.remove.includes(stub.name)) {
          $editing_constraints.remove.push(stub.name);
        }
        delete $endstate[stub.name];
      } else if (stub.name.endsWith('/__delete')) {
        // remove directory
        const parent = stub.name.slice(0, stub.name.lastIndexOf('/'));
        if (!$editing_constraints.remove.includes(parent)) {
          $editing_constraints.remove.push(parent);
        }
        delete $endstate[parent];
        for (const k in $endstate) {
          if (k.startsWith(parent + '/')) {
            delete $endstate[k];
          }
        }
      } else {
        if (!$endstate[stub.name] && !$editing_constraints.create.includes(stub.name)) {
          $editing_constraints.create.push(stub.name);
        }
        $endstate[stub.name] = data.exercise.b[stub.name];
      }
    }
    reset_complete_states();
  }

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

  function update_complete_states(stubs: Stub[]) {
    for (const stub of stubs) {
      if (stub.type === 'file' && stub.name in complete_states) {
        complete_states[stub.name] = expected[stub.name] === normalise(stub.contents);
      }
    }
  }

  function normalise(code: string) {
    return code.replace(/\s+/g, ' ').trim();
  }

  function update_stub({ detail: stub }: CustomEvent<FileStub>) {
    const index = $files.findIndex((s) => s.name === stub.name);
    $files[index] = stub;
    update_complete_states([stub]);
  }

  function toggle_solution() {
    if (completed) {
      $files = Object.values(data.exercise.a);
      reset_complete_states();
    } else {
      $files = Object.values($endstate);
      update_complete_states($files);
    }
  }
</script>

<SplitPane pos={33} min={0}>
  <section class="h-full border-r flex flex-col" slot="a">
    <Header />
    <Sidebar
      tree={data.tree}
      exercise={data.exercise}
      on:selected={({ detail: { file } }) => selected.set(file)}
    />
  </section>
  <section class="h-full" slot="b">
    <SplitPane pos={50} type="vertical" min={0}>
      <section class="h-full bg-black" slot="a">
        <SplitPane pos={27}>
          <section class="h-full flex flex-col border-r border-gray-500/50" slot="a">
            <Filetree
              {scope}
              {endstate}
              {files}
              constraints={editing_constraints}
              {selected}
              on:change={() => {
                // do I need this? reset_adapter($files);
              }}
            />

            {@const has_b_files = Object.keys(data.exercise.b).length > 0}
            <button
              class:bg-gray-500={completed}
              disabled={!has_b_files}
              on:click={toggle_solution}
              class="bg-blue text-white p-2 text-lg"
            >
              {#if completed && has_b_files}
                reset
              {:else}
                solve
                <span class="i-carbon-arrow-right" />
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
            hideExplorer={false}
            title={`${data.exercise.part.title}, ${data.exercise.chapter.title}, ${data.exercise.title}`}
            files={prepareFilesForStackblitz($files)}
          />
        {/if}
      </section>
    </SplitPane>
  </section>
</SplitPane>
