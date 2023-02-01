Let's begin by splitting our layout into halves, the top for reading and the bottom for a dictionary. **Tip:** We add temporary background colors so we can see our layout.

[[src/routes/+page.svelte#02]]

Now create a new stylesheet (push the add button and name it `global.css`) and import that stylesheet into our page:

[[src/routes/+page.svelte#03]]

Then lets give our html and body tags a height of 100%, and remove the default padding and margin:

[[src/global.css#02]]

And then we can utilize that 100% with flexbox and a full height.

[[src/routes/+page.svelte#04]]