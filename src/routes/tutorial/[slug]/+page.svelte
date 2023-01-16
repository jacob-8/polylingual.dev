<script lang="ts">
  import type { PageData } from './$types';
  import SplitPane from 'svelte-pieces/ui/SplitPane.svelte';
  export let data: PageData;
</script>

<SplitPane pos={33}>
  <section class="bg-black text-white h-full text-center" slot="a">Tutorial</section>
  <section class="h-full" slot="b">
    <SplitPane pos={50} type="vertical">
      <section class="bg-blue/50 text-white h-full text-center" slot="a">
        <SplitPane pos={27}>
          <section class="bg-blue/50 text-white h-full text-center" slot="a">File tree</section>
          <section class="text-center" slot="b">Editor</section>
        </SplitPane>
      </section>
      <section class="text-center" slot="b">Iframe result</section>
    </SplitPane>
  </section>
</SplitPane>
