<script lang="ts" context="module">
  import { writable } from 'svelte/store';
  const MOCK_KNOWN_CHARACTERS = ["之", "者", "子", "人","有","陷","堅","能","物","又","何","以","不","可","同","世","立"];
  const known_characters = writable(new Set(MOCK_KNOWN_CHARACTERS));
</script>

<script lang="ts">
  import type { ClassicalToMandarinDictionaryEntry } from "./ClassicalDefinitions.svelte";
  import classical_to_mandarin_dictionary from "../data/classical_to_mandarin_dictionary_swords_shields.json";
  const entries: ClassicalToMandarinDictionaryEntry[] = classical_to_mandarin_dictionary;
  
  export let character: string;

  $: matching_entry = entries.find((entry) => entry.word === character);
  $: first_sense = matching_entry?.explain
    ? Object.entries(matching_entry.explain)[0]
    : null;
  $: [pronunciation, explanations] = first_sense || ["", null];
  $: first_explanation = explanations?.[0] || "";
  const is_not_chinese = /[^\u4E00-\u9FA5]/g;
  $: clean_explanation = first_explanation.replace(is_not_chinese, "");
  const CHARACTERS_TO_SHOW = 6;
  $: short_explanation = clean_explanation.slice(0, CHARACTERS_TO_SHOW);

  $: known = $known_characters.has(character);
  
  function toggle_known() {
    if (known) {
      $known_characters.delete(character);
    } else {
      $known_characters.add(character);
    }
    $known_characters = $known_characters;
  }
</script>

<div style="width: 50px; text-align: center; margin-bottom: 12px;">
  <div style="font-size: 50%; height: 1rem;">
    {#if !known}
      {pronunciation}
    {/if}
  </div>

  <div class="chinese_font" on:contextmenu|preventDefault={toggle_known}>
    {character}
  </div>

  <div style="font-size: 45%;">
    {#if !known}
      {short_explanation}
    {/if}
  </div>
</div>