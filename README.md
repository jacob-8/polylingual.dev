# polylingual.dev

A hands-on multilingual interactive tutorial on how to build real world complex web apps with Svelte.

This is a rebuilt version of learn.svelte.dev relying on Stackblitz JavaScript SDK embed option instead of the not yet released WebContainer API. As it's implementation proves to be tremendously simple, this project has no plans to switch over to the WebContainer API once it's released.

## Running the app

This repo uses [pnpm](https://pnpm.io/).

Run the app with `pnpm dev` or `pnpm build && pnpm preview`.

## Creating new project tutorials

Projects live inside `projects`. Each project has a lesson consisting of stages which are each a markdown file, which is the instructions to the left, an `app` folder, which represents the initial  state along with corresponding steps files that will be referenced in the instructions markdown files. Files are marked as deleted in the finish state if their last step is blank.
