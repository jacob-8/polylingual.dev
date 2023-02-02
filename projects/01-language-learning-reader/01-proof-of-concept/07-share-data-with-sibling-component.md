Now we need take the characters clicked on in our `ClassicalText.svelte` component and pass them to our `ClassicalDefinitions.svelte` component. There are many ways to pass and share data between sibling components, and we'll choose one: emitting an event that will change a variable in the parent component that can then be handed to the sibling component.

Emit an event when a character is clicked on:

[[src/routes/ClassicalText.svelte#07]]

> Tip: It is a good idea to place your `import` statements at the top of the `script` block. Sometimes during this tutorial, however, to make our code changes easier to follow we will include the `import` statements right next to where they're needed.

Now, let's catch that event in the parent with a simple alert and try clicking on a few characters to test.

[[src/routes/+page.svelte#09]]

Then save it to a variable that is passed down to our `ClassicalDefinitions.svelte` component.

[[src/routes/+page.svelte#10]]

Try clicking on unknown characters now.
