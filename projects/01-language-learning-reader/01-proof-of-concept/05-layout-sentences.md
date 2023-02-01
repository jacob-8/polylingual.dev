---
file_to_focus: src/routes/ClassicalText.svelte
---

Let's turn that data into something useful by looping over it sentence by sentence and placing each language in an equal sized box.

[[src/routes/ClassicalText.svelte#03]]

> If you are new to [Svelte](https://svelte.dev/) and want to understand better how to use its syntax, for example `{#each items as item}{item}{/each}`, please take some time to go through the [Svelte tutorial](https://svelte.dev/tutorial/basics). Afterwards, you can learn more about [SvelteKit](https://kit.svelte.dev/) using [learn.svelte.dev](https://learn.svelte.dev/), *of which this site is modeled after*.

Let's emphasize our Classical text that we are trying to read and place a border around each sentence.

[[src/routes/ClassicalText.svelte#04]]

Let's 

Now we import make them clickable

[[src/routes/ClassicalText.svelte#05]]
