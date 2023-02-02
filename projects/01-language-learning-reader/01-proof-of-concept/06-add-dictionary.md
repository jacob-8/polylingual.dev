Now let's add a dictionary component named `ClassicalDefinitions.svelte` that will help us to study the unknown characters we click on. We'll start by simply exporting a `character` property and then displaying that using our `chinese-font` class at a larger size.

[[src/routes/ClassicalDefinitions.svelte#02]]

Then we'll add it to our page, passing in `矛` to start with.

[[src/routes/+page.svelte#08]]

We also have a minimal dictionary Classical Chinese to Mandarin Chinese dictionary prepared in our data folder titled `classical_to_mandarin_dictionary_swords_shields.json` that we will now import into our component. After looking at the data, we can add an interface to provide type-checking.

[[src/routes/ClassicalDefinitions.svelte#03]]

Now let's lookup our character in the dictionary.

[[src/routes/ClassicalDefinitions.svelte#04]]

Let's take that data and display it next to our character in a useful manner. You noticed that our character in focus is bolded with html so we'll use the `@html` syntax to render that properly.

[[src/routes/ClassicalDefinitions.svelte#05]]

Now let's adjust the styling

[[src/routes/ClassicalDefinitions.svelte#06]]