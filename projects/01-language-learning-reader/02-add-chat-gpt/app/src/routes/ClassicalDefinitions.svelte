<script lang="ts" context="module">
  export interface ClassicalToMandarinDictionaryEntry {
    word: string;
    explain: {
      [pronunciation: string]: string[];
    };
    url: string;
  }
</script>

<script lang="ts">
  import classical_to_mandarin_dictionary from '../data/classical_to_mandarin_dictionary_swords_shields.json';
  const entries: ClassicalToMandarinDictionaryEntry[] =	classical_to_mandarin_dictionary;
  
  export let character: string;

  $: matching_entry = entries.find((entry) => entry.word === character)
</script>

<div class="chinese_font" style="font-size: 2rem; display: flex;">
  {character}
  {#if matching_entry}
    <div style="font-size: 75%; margin-left: 8px; width: 100%;">
      {#each Object.entries(matching_entry.explain) as [pronuncation, explanations]}
        <div style="display: flex;">
          {pronuncation}
          <div style="width: 100%; margin: 2px 2px 2px 8px; padding: 2px; border: 1px dashed lightgray;">
            {#each explanations as explanation}
              <div>
                {@html explanation}
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>