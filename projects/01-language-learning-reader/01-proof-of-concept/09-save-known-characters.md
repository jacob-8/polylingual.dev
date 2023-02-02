As we read Classical Chinese there are many characters we already know well. Having helps show for them will just create extra noise and make it hard to read. Let's create a quick way to mark additional characters as known.

First we'll create a demo list of known characters and only show helps if a character is not already "known".

[[src/routes/Character.svelte#05]]

Then we'll add the ability to use the right-click button to toggle known status.

[[src/routes/Character.svelte#06]]

Try right-clicking on characters to toggle the helps.