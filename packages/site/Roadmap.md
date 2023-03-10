# Roadmap

## TODO
- fix Stackblitz title
- handle adding files in a subdirectory not yet existing
- don't crash if improper step file referred to
- handle links to file in root directory (/ issue)
- make progression actionable with a click (especially add and remove files or rename)
  - auto focus on file in first step (unless it's adding a file)
- update error page
- fork retypewriter and start from 00 so first step is 01
- lesson 2
- improve :zh: parsing to allow for sentence beginning markdown marks
- adjust prose styles
- favicon
- add 1 e2e test
- add true i18n
- allow deleting files that end in an empty step
  - scan last step of stepfiles to see which files to remove from app_finish and add remove buttons where appropriate
- emit selected to queryparam from `Codeblock.svelte`
- update URL of Stackblitz vm if possible
- use updated UnoCSS w/ web fonts and typography
- use Svelte inspector by catching message from iframe and opening applicable file in the editor

## Stackblitz Embedded Environment Notes

Since we have no control over the iframe permissions, clipboard read and writes can't be done programmatically. If the following could be set properly there's a chance it could be workable:
- `<iframe src="..." allow="clipboard-read; clipboard-write"></iframe>`
- `clipboard-read self ${URL}; clipboard-write self ${URL};`

## VSCode extension notes

- How to sideload extension in Codeflow: https://github.com/stackblitz/webcontainer-core/issues/853
- Extensions to learn from:
  - [CodeRoad](https://marketplace.visualstudio.com/items?itemName=CodeRoad.coderoad), https://coderoad.github.io/
  - [Total TypeScript](https://marketplace.visualstudio.com/items?itemName=mattpocock.ts-error-translator)
  - [Coding is Typing](https://marketplace.visualstudio.com/items?itemName=rhjiang.coding-is-typing)
  - [Key Code](https://marketplace.visualstudio.com/items?itemName=hamilton.key-code)
  - https://github.com/yehoshuasandler/brightScreen