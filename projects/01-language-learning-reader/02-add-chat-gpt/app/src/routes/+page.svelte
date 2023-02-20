<script lang="ts">
  import '../global.css';
  import swords_and_shields from '../data/swords_and_shields.json';
  import ClassicalText from './ClassicalText.svelte';
  import ClassicalDefinitions from './ClassicalDefinitions.svelte';

  let character_to_study = '';
</script>

<div style="display: flex; flex-direction: column; height: 100%;">
  <div style="height: 70%; overflow-y: auto;">
    <h2 style="text-align: center;">
      Language Learning Reader 
      <span class="chinese_font">語言學習閱讀器</span>
    </h2>

    <ClassicalText sentences={swords_and_shields} on:study={(event) => (character_to_study = event.detail)} />
  </div>

  <div style="height: 30%; overflow-y: auto; padding: 1rem; border-top: 1px dashed gray;">
    <ClassicalDefinitions character={character_to_study} />
  </div>
</div>