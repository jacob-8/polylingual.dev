Let's create a `ClassicalText.svelte` component to hold our first text that we want help reading.

Define an interface for a multilingual sentence with Classical Chinese, Mandarin, and English. Then export a `sentences` prop from the component which is typed as an array of multilingual sentences.

[[src/routes/ClassicalText.svelte#02]]

As a prototyping convenience, I like to use `JSON.stringify` to look at incoming data as I'm building for a quick feedback loop until I have a chance to build out my component.


You may have noticed the data folder, which has json file containing a small excerpt called "Swords and Shields" from Hán Fēizǐ. We can now import this into our `+page.svelte` file and pass it to the `ClassicalText.svelte` component.

[[src/routes/+page.svelte#06]]

We have an overflow problem that we need to fix:

[[src/routes/+page.svelte#07]]
