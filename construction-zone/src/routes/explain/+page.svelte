<script lang="ts">
  import { enhance } from '$app/forms';
  let classical_text = '';

  let asking = false;
</script>

<div style="display: flex;">
  <form
    style="flex: 2; display: flex; padding: 0 8px;"
    method="POST"
    use:enhance={() => {
      asking = true;

      return async ({ update }) => {
        await update();
        asking = false;
      };
    }}
  >
    <input
      name="text_to_explain"
      style="width: 100%;"
      bind:value={classical_text}
      placeholder="Paste a sentence of Classical Chinese here"
    />
  </form>
  <div style="flex: 1;">
    Chinese {asking ? 'asking...' : '...'}
  </div>
  <div style="flex: 1;">English</div>
</div>
