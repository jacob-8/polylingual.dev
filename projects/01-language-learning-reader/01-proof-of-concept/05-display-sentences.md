---
file_to_focus: src/routes/ClassicalText.svelte
---

Let's turn that data into something useful by looping over it sentence by sentence and placing each language in an equal sized box.

[[src/routes/ClassicalText.svelte#03]]

> If you are new to [Svelte](https://svelte.dev/) and want to understand better how to use its syntax, for example `{#each items as item}{item}{/each}`, please take some time to go through the [Svelte tutorial](https://svelte.dev/tutorial/basics). Afterwards, you can learn more about [SvelteKit](https://kit.svelte.dev/) using [learn.svelte.dev](https://learn.svelte.dev/), *of which this site is modeled after*.

Place a border around each sentence and give the Classical text a little more space.

[[src/routes/ClassicalText.svelte#04]]

Let's emphasize our Classical text by using the `.chinese-font` class we prepared earlier. As well we want to make each sentence and each individual letter clickable for focused study. First let's break apart our sentences into individual letters and add some hover styles 

[[src/routes/ClassicalText.svelte#05]]

Then we'll show a simple alert on character or sentence click so we know that we're heading the right direction.

[[src/routes/ClassicalText.svelte#06]]

In the future we'll replace this alert with a function that pulls up the desired word in our dictionary.