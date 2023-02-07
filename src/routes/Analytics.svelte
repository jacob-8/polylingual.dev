<script lang="ts">
  import { onMount } from 'svelte';
  import { partytownSnippet } from '@builder.io/partytown/integration';

  let scriptEl: HTMLScriptElement;
  onMount(() => {
    scriptEl && (scriptEl.textContent = partytownSnippet());
  });
</script>

<svelte:head>
  <script>
    partytown = {
      forward: ['dataLayer.push'],
      resolveUrl: (url) => {
        const siteUrl = 'https://polylingual.dev/proxytown'

        if (url.hostname === 'www.googletagmanager.com') {
          const proxyUrl = new URL(`${siteUrl}/gtm`)

          const gtmId = new URL(url).searchParams.get('id')
          gtmId && proxyUrl.searchParams.append('id', gtmId)

          return proxyUrl
        } else if (
          url.hostname === 'www.google-analytics.com'
        ) {
          const proxyUrl = new URL(`${siteUrl}/ga`)

          return proxyUrl
        }

        return url
      }
    }
  </script>

  <script bind:this={scriptEl}></script>

  <!-- GTM script + config -->
  <script
    type="text/partytown"
    src="https://www.googletagmanager.com/gtag/js?id=G-ECHKC85GK4"
  ></script>
  <script type="text/partytown">
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }

    gtag('js', new Date());
    gtag('config', 'G-ECHKC85GK4', {
      page_path: window.location.pathname,
    });
  </script>
</svelte:head>

<!-- Use: window.dataLayer.push({ ... }) -->
<!-- https://monogram.io/blog/add-partytown-to-svelte -->
