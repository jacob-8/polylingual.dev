Let's create a `ClassicalText__文言文本.svelte` component to hold our first text that we want help reading.

Define an interface for a multilingual sentence with Classical Chinese, Mandarin, and English. Then export a `sentences` prop from the component which is typed as an array of multilingual sentences.

As a prototyping convenience, I like to `JSON.stringify` incoming data as I'm building for a quick feedback loop until I have a chance to build my component.

[[src/routes/ClassicalText__文言文本.svelte#02]]

You may have noticed the data folder, in which we have a small excerpt from Han Feizi that we can now import in our page file and pass into the Classical Text component

[[src/routes/+page.svelte#06]]

We have an overflow problem that we need to fix:

[[src/routes/+page.svelte#07]]