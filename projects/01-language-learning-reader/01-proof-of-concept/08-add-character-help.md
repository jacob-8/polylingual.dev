Let's add a little bit of help for reading characters. Start by creating a `Character.svelte` component. :zh: Only show this.

[[src/routes/Character.svelte#02]]

And then add it to `ClassicalText.svelte`

[[src/routes/ClassicalText.svelte#08]]

Let's bring our dictionary back in, find the matching entry and isolate the first pronunciation, and the beginning of the first explanation but without punctuation. *You should know that the `$:` indicates a variable that reacts to updates of other variables.*

[[src/routes/Character.svelte#03]]

Now let's style it

[[src/routes/Character.svelte#04]]

You'll notice that definitions for a few characters like "與" do not exist in our minimal dictionary. That may be because the meaning hasn't changed much between Classical and modern usage. In a full featured app we would catch this omission with either a small notice, or with a definiton from a modern Mandarin dictionary, but our purpose here is to create a quick and simple "proof of concept".

