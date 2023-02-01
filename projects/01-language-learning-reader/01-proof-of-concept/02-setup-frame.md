---
file_to_focus: src/routes/+page.svelte
---

Let's begin by creating a new global stylesheet (push the add button and name it `global__普.css`) and import that stylesheet into our page:

[[src/routes/+page.svelte#02]]

Then lets make some changes to the body. First give it a yellow background so we can see changes. Then give our html and body tags a height of 100%, and remove the default padding and margin:

[[src/global__普.css#02]]


Next let's split our layout into two halves

[[src/routes/+page.svelte#03]]

And add a title into the first half:

[[src/routes/+page.svelte#04]]