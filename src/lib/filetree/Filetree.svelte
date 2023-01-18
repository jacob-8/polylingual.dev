<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Folder from './Folder.svelte';
  import * as context from './context';
  import Modal from './Modal.svelte';
  import { writable, type Writable } from 'svelte/store';
  import type { DirectoryStub, EditingConstraints, FileStub, Scope, Stub } from '$lib/types';

  export let files: Writable<Stub[]>;
  export let endstate: Writable<Record<string, Stub>>;
  export let scope: Writable<Scope>;
  export let readonly = writable(false);
  export let constraints: Writable<EditingConstraints>;
  export let selected: Writable<FileStub | null>;

  let modal_text = '';

  const dispatch = createEventDispatcher();

  const hidden = new Set(['__client.js', 'node_modules']);

  context.set({
    endstate,
    files,
    selected,
    readonly,
    scope,

    select: async (file) => {
      selected.set(file);
    },

    add: async (name, type) => {
      if (!$endstate[name] && !$constraints?.create.includes(name)) {
        modal_text =
          'Only the following files and folders are allowed to be created in this exercise:\n' +
          $constraints.create.join('\n');
        return;
      }

      const basename = name.split('/').pop() as string;

      let stub: Stub;

      if (type === 'file') {
        stub = {
          type: 'file',
          name,
          basename,
          text: true,
          contents: '',
        };

        selected.set(stub);
      } else {
        stub = { type: 'directory', name, basename };
      }

      $files = [...$files, ...create_directories(name, $files), stub];

      dispatch('change');
    },

    rename: async (to_rename, new_name) => {
      const new_full_name = to_rename.name.slice(0, -to_rename.basename.length) + new_name;

      if ($files.some((s) => s.name === new_full_name)) {
        modal_text = `A file or folder named ${new_full_name} already exists`;
        return;
      }

      if (!$endstate[new_full_name] && !$constraints?.create.includes(new_full_name)) {
        modal_text =
          'Only the following files and folders are allowed to be created in this exercise:\n' +
          $constraints.create.join('\n');
        return;
      }

      if ($endstate[to_rename.name] && !$constraints?.remove.includes(to_rename.name)) {
        modal_text =
          'Only the following files and folders are allowed to be removed in this exercise:\n' +
          $constraints.remove.join('\n');
        return;
      }

      if (to_rename.type === 'directory') {
        for (const stub of $files) {
          if (stub.name.startsWith(to_rename.name + '/')) {
            stub.name = new_full_name + stub.name.slice(to_rename.name.length);
          }
        }
      }

      to_rename.basename = new_full_name.split('/').pop() as string;
      to_rename.name = new_full_name;

      $files = [...$files, ...create_directories(new_full_name, $files)];

      dispatch('change');
    },

    remove: async (stub) => {
      if ($endstate[stub.name] && !$constraints?.remove.includes(stub.name)) {
        modal_text =
          'Only the following files and folders are allowed to be deleted in this tutorial chapter:\n' +
          $constraints.remove.join('\n');
        return;
      }

      selected.set(null);

      $files = $files.filter((s) => {
        if (s === stub) return false;
        if (s.name.startsWith(stub.name + '/')) return false;
        return true;
      });

      dispatch('change');
    },
  });

  function create_directories(name: string, stubs: Stub[]) {
    const existing = new Set();

    for (const stub of stubs) {
      if (stub.type === 'directory') {
        existing.add(stub.name);
      }
    }

    const directories: DirectoryStub[] = [];

    const parts = name.split('/');
    while (parts.length) {
      parts.pop();

      const dir = parts.join('/');
      if (existing.has(dir)) {
        break;
      }

      directories.push({
        type: 'directory',
        name: dir,
        basename: parts.at(-1) as string,
      });
    }

    return directories;
  }
</script>

<div class="filetree grow bg-[#1e1e1e] overflow-y-auto overflow-x-hidden py-2 text-white/70 text-sm">
  <Folder
    prefix={$scope.prefix}
    depth={$scope.depth}
    directory={{
      type: 'directory',
      name: '',
      basename: $scope.name,
    }}
    files={$files.filter((stub) => !hidden.has(stub.basename))}
    expanded
  />
</div>

{#if modal_text}
  <Modal on:close={() => (modal_text = '')}>
    <div class="modal-contents">
      <h2>This action is not allowed</h2>
      <p>{modal_text}</p>
      <button on:click={() => (modal_text = '')}>OK</button>
    </div>
  </Modal>
{/if}

<style>
  .modal-contents p {
    white-space: pre-line;
  }

  .modal-contents button {
    display: block;
    background: var(--sk-theme-1);
    color: white;
    padding: 1rem;
    width: 10em;
    margin: 1em 0 0 0;
    border-radius: var(--sk-border-radius);
    line-height: 1;
  }
</style>
