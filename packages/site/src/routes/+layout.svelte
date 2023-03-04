<script lang="ts">
  import './global.css';
  import { browser } from '$app/environment';
  import { navigating } from '$app/stores';
  import LoadingIndicator from './LoadingIndicator.svelte';
  import Analytics from './Analytics.svelte';
</script>

{#if $navigating}
  <LoadingIndicator />
{/if}

<slot /> 

{#if browser}
  <Analytics />
{/if}