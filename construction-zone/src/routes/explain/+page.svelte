<script lang="ts">
  import { paraphrase } from './paraphrase';

  let asking = false;
  let classical_text = '';
  let mandarin_paraphrase = '';
  let error: any;

  async function on_submit() {
    if (!classical_text) return;
    asking = true;
    try {
      mandarin_paraphrase = await paraphrase(classical_text);
    } catch (err) {
      console.error(err);
      error = err;
    }
    asking = false;
  }
</script>

<div style="display: flex;">
  <form style="flex: 1;" on:submit={on_submit}>
    <div>文言文</div>
    <input
      style="width: 92%;"
      bind:value={classical_text}
      placeholder="文言文句子"
    />
  </form>
  <div style="flex: 1;">
    <div>Mandarin</div>
    {asking ? '在問...' : mandarin_paraphrase}
  </div>
</div>

{#if error}
  <div style="color: red;"><pre>{error}</pre></div>
{/if}
