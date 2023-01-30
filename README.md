# learn.polylingual.dev

A hands-on multilingual interactive tutorial on how to build real world complex web apps with Svelte.

This is a rebuilt version of learn.svelte.dev relying on Stackblitz JavaScript SDK embed option instead of the not yet released WebContainer API. As it's implementation proves to be tremendously simple, this project has no plans to switch over to the WebContainer API once it's released.

## Running the app

This repo uses [pnpm](https://pnpm.io/).

Run the app with `pnpm dev` or `pnpm build && pnpm preview`.

## Creating new project tutorials

Projects live inside `projects`. Each project has a lesson consisting of stages which are each a markdown file, which is the instructions to the left, an `app` folder, which represents the initial  state along with corresponding steps files that will be referenced in the instructions markdown files. Files are marked as deleted in the finish state if their last step is blank.

## TODO before first lesson

- fix build errors
- use svelte-markdown
- write first lesson
- add i18n
- handle multilingual :zh markers in content
- update error page

## After first lesson
- use updated UnoCSS w/ web fonts and typography
- flesh out how to how to make progression through code easier as each exercise picks up from where the last left off; endstate is built up from the accumulation of instructed changes (each illustrated with a diff monaco editor) and actionable with a click
- use Svelte inspector by catching message from iframe and opening applicable file in the editor
- update URL of Stackblitz vm if possible