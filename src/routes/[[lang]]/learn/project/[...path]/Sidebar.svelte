<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import Menu from './Menu.svelte';
  import Content from './Content.svelte';
  import type { Stage, Project } from '$lib/types';
  import { prettifyName } from './helpers/prettifyName';
  import Giscus from '@giscus/svelte';
  import { navigating } from '$app/stores';

  export let projects: Record<string, Project>;
  export let stage: Stage;

  let sidebar: HTMLElement;

  afterNavigate((navigation) => {
    if (navigation.from?.params?.path !== navigation.to?.params?.path) sidebar.scrollTop = 0;
  });
</script>

<Menu {projects} {stage} />

<div bind:this={sidebar} class="overflow-y-auto grow flex flex-col">
  <main class="p-3">
    <Content {stage} />

    {#if stage.next_stage_location}
      <div class="my-4">
        <a
          class="text-blue-700 text-sm font-semibold hover:underline"
          href="/learn/project/{stage.next_stage_location.project}/{stage.next_stage_location
            .lesson}/{stage.next_stage_location.stage}"
          >{prettifyName(stage.next_stage_location.stage)} <span class="i-carbon-arrow-right" /></a
        >
      </div>
    {/if}
  </main>

  <div class="p-3 border-t">
    {#if !$navigating}
      <Giscus
        id="comments"
        repo="jacob-8/polylingual.dev"
        repoId="R_kgDOIyJzCQ"
        category="Lesson Comments"
        categoryId="DIC_kwDOIyJzCc4CUC87"
        mapping="title"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="light"
        lang="zh-TW"
        loading="lazy"
      />
    {/if}
  </div>

  <footer class="border-t p-3 mt-auto flex">
    <a
      target="_blank"
      class="hover:underline"
      rel="noreferrer"
      href="https://github.com/jacob-8/polylingual.dev/tree/main{stage.directory}"
    >
      <span class="i-codicon-edit" />
      為此頁提供修改建議
      <!-- 为此页提供修改建议 -->
      <!-- Edit this page -->
    </a>

    <span class="ml-auto text-sm hidden md:block">Alt+T = EN/中</span>
  </footer>
</div>
