# learn.polylingual.dev

A hands-on multilingual interactive tutorial on how to build real world complex web apps with Svelte.

This is a rebuilt version of learn.svelte.dev relying on Stackblitz JavaScript SDK embed option instead of the not yet released WebContainer API. As it's implementation proves to be tremendously simple, this project has no plans to switch over to the WebContainer API once it's released.

## Running the app

This repo uses [pnpm](https://pnpm.io/).

Run the app with `pnpm dev` or `pnpm build && pnpm preview`.

## Creating new project tutorials

Projects live inside `projects`. Each project has a lesson consisting of stages which are each a markdown file, which is the instructions to the left, an `app` folder, which represents the initial  state along with corresponding steps files that will be referenced in the instructions markdown files. Files are marked as deleted in the finish state if their last step is blank.

## TODO before first lesson

- place steps into stages
- write prose for stages
- add i18n
- handle multilingual :zh markers in content
- adjust prose styles
- pretty print stage titles
- update error page

## After first lesson
- allow deleting files that end in an empty step
  - scan last step of stepfiles to see which files to remove from app_finish and add remove buttons where appropriate
- update URL of Stackblitz vm if possible
- use updated UnoCSS w/ web fonts and typography
- flesh out how to how to make progression actionable with a click (especially add and remove files or rename)
- fork retypewriter and start from 00 so first step is 01
- use Svelte inspector by catching message from iframe and opening applicable file in the editor

## Stackblitz Embedded Environment Notes

Since we have no control over the iframe permissions, clipboard read and writes can't be done programmatically. If the following could be set properly there's a chance it could be workable:
- `<iframe src="..." allow="clipboard-read; clipboard-write"></iframe>`
- `clipboard-read self ${URL}; clipboard-write self ${URL};`