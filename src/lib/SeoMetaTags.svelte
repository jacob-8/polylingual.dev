<script lang="ts">
  import { page } from '$app/stores';

  export let title: string;
  export let description =
    'A hands-on multilingual interactive tutorial on how to build real world complex web apps with Svelte.';
  export let keywords =
    'JavaScript Explained, learn JavaScript, learn to code, learn by doing, Learn Svelte, Svelte, SvelteKit';
  export let type: 'video' | 'website' = 'website'; // https://ogp.me/#types
  export let norobots = false;
  export let handle = 'jacobbowdoin';
  export let url = $page.url.toString();
</script>

<svelte:head>
  <title>{title}</title>

  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />

  {#if norobots}
    <meta name="robots" content="noindex" />
  {/if}

  <!-- https://ogp.me -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:site_name" content="Living Dictionaries" />
  <meta property="og:type" content={type} />
  <meta property="og:url" content={url} />
  <meta property="og:locale" content="en" />

  <!-- <meta property="og:image" content={imageUrl} />
  <meta property="og:image:secure_url" content={imageUrl} />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content={imageWidth} />
  <meta property="og:image:height" content={imageHeight} />
  <meta property="og:image:alt" content={`${title}: ${description}`} /> -->

  <!-- https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image -->
  <!-- <meta name="twitter:card" content="summary_large_image" /> -->
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <!-- <meta name="twitter:image" content={imageUrl} />
  <meta name="twitter:image:alt" content={`${title}: ${description}`} /> -->
  <meta name="twitter:url" content={url} />
  <meta name="twitter:site" content="@{handle}" />
  <meta name="twitter:creator" content="@{handle}" />

  <meta name="giscus:backlink" content="https://polylingual.dev{$page.url.pathname}" />
</svelte:head>
