<script lang="ts">
  import './global.css';
  import { navigating } from '$app/stores';
  import LoadingIndicator from './LoadingIndicator.svelte';
</script>

{#if $navigating}
  <LoadingIndicator />
{/if}

<slot /> 