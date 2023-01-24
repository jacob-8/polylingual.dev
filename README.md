# learn.polylingual.dev

A hands-on multilingual interactive tutorial on how to build real world complex web apps with Svelte.

This is a rebuilt version of learn.svelte.dev relying on Stackblitz JavaScript SDK embed option instead of the not yet released WebContainer API. As it's implementation proves to be tremendously simple, this project has no plans to switch over to the WebContainer API once it's released.

## Running the app

This repo uses [pnpm](https://pnpm.io/).

Run the app with `pnpm dev` or `pnpm build && pnpm preview`.

## Creating new tutorials

Tutorials live inside `content`. Each tutorial consists of a `README.md`, which is the text to the left, and `app-a` and `app-b` folders, which represent the initial and solved state. Files that stay the same can be omitted from `app-b`. Files are marked as deleted in `app-b` if they start with `__delete`. Folders that are marked as deleted in `app-b` if they contain a file named `__delete`.

## TODO before first lesson

- fix build errors
- add i18n
- write first lesson
- add diff editor
- handle multilingual markers in content

## After first lesson
- use updated UnoCSS w/ web fonts and typography
- make content updates use HMR
- flesh out how to how to make progression through code easier as each exercise picks up from where the last left off; endstate is built up from the accumulation of instructed changes (each illustrated with a diff monaco editor) and actionable with a click
- use Svelte inspector by catching message from iframe and opening applicable file in the editor
- update URL of Stackblitz vm if possible