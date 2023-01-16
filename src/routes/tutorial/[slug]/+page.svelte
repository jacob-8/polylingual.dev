<script lang="ts">
  import { writable } from 'svelte/store';
  import SplitPane from 'svelte-pieces/ui/SplitPane.svelte';
  import { browser } from '$app/environment';
  import Sidebar from './Sidebar.svelte';
  import Stackblitz from './Stackblitz.svelte';
  import MonacoEditor from '$lib/monaco/MonacoEditor.svelte';
  import type { FileStub } from '$lib/types';
  import type { PageData } from './$types';
  export let data: PageData;

  const selected = writable<FileStub | null>(null);
</script>

<SplitPane pos={33} min={0}>
  <section class="h-full" slot="a">
    <Sidebar
      index={data.tree}
      exercise={data.exercise}
      on:select={(e) => {
        const file = data.exercise.a[e.detail.file];
        if (file.type === 'file') {
          selected.set(file);
        }
      }}
    />
  </section>
  <section class="h-full" slot="b">
    <SplitPane pos={50} type="vertical">
      <section class="h-full" slot="a">
        <SplitPane pos={27}>
          <section class="bg-blue/25 h-full" slot="a">File tree</section>
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
