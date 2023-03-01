<script lang="ts">
  import { FirebaseUiAuth, saveUserData, authState } from 'sveltefirets';
  import { user } from '$lib/user';
  import { page } from '$app/stores';
</script>

{#if $authState !== undefined}
  {#if $user}
    <pre>{JSON.stringify($user, null, 2)}</pre>
  {:else}
    <FirebaseUiAuth
      languageCode={$page.data.lang === 'en' ? 'en' : 'zh_tw'}
      signInWith={{ github: true }}
      on:authresult={(e) => saveUserData(e.detail)}
    />
  {/if}
{:else}
  Initing Firebase Auth...
{/if}
