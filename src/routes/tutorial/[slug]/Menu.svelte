<script lang="ts">
  import { page } from '$app/stores';
  import { slide } from 'svelte/transition';
  import type { Exercise, PartStub } from '$lib/types';

  export let tree: PartStub[];
  export let current: Exercise;

  let is_open = false;

  $: expanded_part = current.part.slug || '';
  $: expanded_chapter = current.chapter.slug || '';

  $: filtered = tree
    .map((part, i) => {
      const chapters = part.chapters
        .map((chapter, i) => ({
          ...chapter,
          label: String.fromCharCode(97 + i),
          first: chapter.exercises[0].slug,
        }))
        .filter((chapter) => chapter.exercises.length > 0);

      return {
        ...part,
        label: i + 1,
        first: part.chapters[0].exercises[0].slug,
        chapters,
      };
    })
    .filter((part) => part.chapters.length > 0);

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
  {#if current.prev}
    <a
      class="hover:bg-gray-500/15 py-1 px-2 self-stretch"
      href="/tutorial/{current.prev.slug}"
      aria-label="Previous"
    >
      <span class="i-carbon-arrow-left" />
    </a>
  {:else}
    <div class="w-2" />
  {/if}

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <h1 class="grow px-1 truncate" on:click={() => (is_open = true)}>
    Part {current.part.index + 1} <span class="opacity-30">/</span>
    {current.chapter.title} <span class="opacity-30">/</span>
    <strong class="text-blue-700">{current.title}</strong>
  </h1>
  {#if current.next}
    <a
      class="hover:bg-gray-500/15 py-1 px-2 self-stretch"
      href="/tutorial/{current.next.slug}"
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
    aria-label="tutorial exercises"
  >
    <ul>
      {#each filtered as part (part.slug)}
        {@const partExpanded = part.slug === expanded_part}

        <li aria-current={part.slug === current.part.slug ? 'step' : undefined}>
          <button
            class:font-semibold={partExpanded}
            on:click={() => {
              if (expanded_part !== part.slug) {
                expanded_part = part.slug;
                expanded_chapter = part.chapters[0].slug;
              }
            }}
          >
            Part {part.label}: {part.meta.title}
          </button>

          {#if partExpanded}
            <ul class="ml-3">
              {#each part.chapters as chapter (chapter.slug)}
                {@const chapterExpanded = chapter.slug === expanded_chapter}
                <li aria-current={chapter.slug === current.chapter.slug ? 'step' : undefined}>
                  <button
                    class:font-semibold={chapterExpanded}
                    on:click={() => (expanded_chapter = chapter.slug)}
                  >
                    <span class:!rotate-90={chapterExpanded} class="i-carbon-chevron-right?bg" />
                    {chapter.meta.title}
                  </button>

                  {#if chapterExpanded}
                    <ul class="ml-7">
                      {#each chapter.exercises as exercise (exercise.slug)}
                        {@const current = $page.url.pathname === `/tutorial/${exercise.slug}`}

                        <li
                          class:text-blue-700={current}
                          class:font-semibold={current}
                          aria-current={current ? 'page' : undefined}
                        >
                          <a href="/tutorial/{exercise.slug}" on:click={() => (is_open = false)}>
                            {exercise.title}
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
