<script lang="ts">
  import { page } from '$app/stores';
  import { slide } from 'svelte/transition';
  import type { Stage, Project } from '$lib/types';

  export let projects: Record<string, Project>;
  export let stage: Stage;

  let is_open = false;

  $: expanded_project = stage.location.project || '';
  $: expanded_lesson = stage.location.lesson || '';

  function close_when_focus_leaves(node: HTMLElement) {
    function handle_focus_in() {
      if (!node.contains(document.activeElement)) {
        is_open = false;
      }
    }
    document.addEventListener('focusin', handle_focus_in);

    return {
      destroy: () => {
        document.removeEventListener('focusin', handle_focus_in);
      },
    };
  }
</script>

<header class="flex items-center border-b">
  <button
    class="hover:bg-gray-500/15 pt-1 pb-2 px-2 self-stretch border-r"
    on:click={() => (is_open = !is_open)}
    aria-label="Toggle menu"
  >
    {#if is_open}
      <span class="i-carbon-close" />
    {:else}
      <span class="i-carbon-menu" />
    {/if}
  </button>
  {#if stage.previous_stage_location}
    <a
      class="hover:bg-gray-500/15 py-1 px-2 self-stretch"
      href="/{$page.data.lang}/learn/project/{stage.previous_stage_location.project}/{stage
        .previous_stage_location.lesson}/{stage.previous_stage_location.stage}"
      aria-label="Previous"
    >
      <span class="i-carbon-arrow-left" />
    </a>
  {:else}
    <div class="w-2" />
  {/if}

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <h1 class="grow px-1 truncate" on:click={() => (is_open = !is_open)}>
    {#if $page.data.lang === 'zh-TW'}
      {projects[stage.location.project].meta.title[$page.data.lang === 'zh-TW' ? 'zh-TW' : 'en']}
      <span class="opacity-30">/</span>
    {/if}
    {projects[stage.location.project].lessons[stage.location.lesson].meta.title[
      $page.data.lang === 'zh-TW' ? 'zh-TW' : 'en'
    ]}
    <span class="opacity-30">/</span>
    <strong class="text-blue-700"
      >{stage.title[$page.data.lang === 'zh-TW' ? 'zh-TW' : 'en']}</strong
    >
  </h1>
  {#if stage.next_stage_location}
    <a
      class="hover:bg-gray-500/15 py-1 px-2 self-stretch"
      href="/{$page.data.lang}/learn/project/{stage.next_stage_location.project}/{stage
        .next_stage_location.lesson}/{stage.next_stage_location.stage}"
      aria-label="Next"
    >
      <span class="i-carbon-arrow-right" />
    </a>
  {/if}
</header>

{#if is_open}
  <nav
    transition:slide
    class="p-3 border-b bg-gray-500/10"
    use:close_when_focus_leaves
    aria-label="project lessons"
  >
    <ul>
      {#each Object.values(projects) as project}
        {@const projectExpanded = project.slug === expanded_project}

        <li>
          <button
            class:font-semibold={projectExpanded}
            on:click={() => {
              if (!projectExpanded) {
                expanded_project = project.slug;
                expanded_lesson = Object.keys(project.lessons)[0];
              }
            }}
          >
            {project.meta.title[$page.data.lang === 'zh-TW' ? 'zh-TW' : 'en']}
          </button>

          {#if projectExpanded}
            <ul class="ml-3">
              {#each Object.values(project.lessons) as lesson}
                {@const lessonExpanded = lesson.slug === expanded_lesson}
                <li>
                  <button
                    class:font-semibold={lessonExpanded}
                    on:click={() => (expanded_lesson = lesson.slug)}
                  >
                    <span class:!rotate-90={lessonExpanded} class="i-carbon-chevron-right?bg" />
                    {lesson.meta.title[$page.data.lang === 'zh-TW' ? 'zh-TW' : 'en']}
                  </button>

                  {#if lessonExpanded}
                    <ul class="ml-7">
                      {#each Object.values(lesson.raw_stages) as stage}
                        {@const stageUrl = `/${$page.data.lang}/learn/project/${stage.location.project}/${stage.location.lesson}/${stage.location.stage}`}
                        {@const current = $page.url.pathname === stageUrl}

                        <li
                          class:text-blue-700={current}
                          class:font-semibold={current}
                          aria-current={current ? 'page' : undefined}
                        >
                          <a href={stageUrl} on:click={() => (is_open = false)}>
                            {stage.title[$page.data.lang === 'zh-TW' ? 'zh-TW' : 'en']}
                          </a>
                        </li>
                      {/each}
                    </ul>
                  {/if}
                </li>
              {/each}
            </ul>
          {/if}
        </li>
      {/each}
    </ul>
  </nav>
{/if}

<style uno:preflights></style>
