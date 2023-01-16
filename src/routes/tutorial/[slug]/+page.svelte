<script lang="ts">
  import SplitPane from 'svelte-pieces/ui/SplitPane.svelte';
  import Stackblitz from './Stackblitz.svelte';
  import { browser } from '$app/environment';

  import type { PageData } from './$types';
  import MonacoEditor from '$lib/monaco/MonacoEditor.svelte';
  export let data: PageData;
</script>

<SplitPane pos={33}>
  <section class="bg-black/10 h-full" slot="a">Tutorial</section>
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
