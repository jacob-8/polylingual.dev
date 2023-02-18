<script lang="ts">
  import Character from './Character.svelte';

  interface MultilingualSentence {
    classical: string;
    mandarin: string;
    english: string;
  }

  export let sentences: MultilingualSentence[] = [];

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher<{ study: string }>();
</script>

{#each sentences as sentence}
  <div style="display: flex;">
    <div style="flex: 2;" class="chinese_font box">
      {#each sentence.classical as character}
        <div class="to_learn" on:click={() => dispatch('study', character)}>
          <Character {character} />
        </div>
      {/each}
    </div>
    <div style="flex: 1;" class="box">
      {sentence.mandarin}
    </div>
    <div style="flex: 1;" class="box">
      {sentence.english}
    </div>
  </div>
{/each}

<style>
  .box {
    padding: 0.5rem;
    border: 1px dashed lightgray;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
  }
  .to_learn {
    cursor: pointer;
    font-size: 2rem;
  }
  .to_learn:hover {
    background: hsla(0, 0%, 0%, 0.15);
  }
</style>