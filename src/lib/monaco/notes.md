Checkly customized Monaco with tokenizer, autocomplete, and hover: https://blog.checklyhq.com/customizing-monaco/

# Has Svelte highlighting:
- [Svelte Playground](https://github.com/mjgartendev/svelte-monaco-playground) at https://svelte-playground.web.app/
- https://github.com/asafamr/monaco-svelte & https://elegant-rosalind-57500c.netlify.app/
- [checklist of links for a Svelte REPL monaco/typescript](https://github.com/iteria-app/lowcode/issues/26)

## Add new textmate grammar
- [How we added custom languages, code completion and highlighting to the Monaco editor](https://blog.checklyhq.com/customizing-monaco/)
- https://github.com/asafamr/svelte-vscode-web
- https://github.com/search?q=%22scopeName%22%3A%20%22source.svelte%22&type=code
- https://github.com/ballerina-platform/ballerina-lang/blob/60149315eadf7cc8034dc41150764b81d920117f/composer/packages/syntax-highlighter/src/index.ts#L28

## Other
research setting locale: https://unpkg.com/monaco-editor/0.27.0/min/vs/editor/editor.main.nls.js


## Sync typescript between models

```typescript
monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true); // works on start or restart so probably need to dispose and re-create when changing lessons

const model1 = monaco.editor.createModel(`
        import { type Model2 } from "./model2";
        const foo: Model2 = {
            box: true,
        }
    `, "typescript", monaco.Uri.parse("model1.ts"));

const model2 = monaco.editor.createModel(`
        export interface Model2 {
            box: boolean 
        }
    `, "typescript", monaco.Uri.parse("model2.ts"));

const editor = monaco.editor.create(document.getElementById("container"));
editor.setModel(model1);
```

## Focused diff

https://microsoft.github.io/monaco-editor/playground.html#interacting-with-the-editor-line-and-inline-decorations
```javascript
const jsCode = [
    '"use strict";',
    'function Person(age) {',
    '	if (age) {',
    '		this.age = age;',
    '	}',
    '}',
    'Person.prototype.getAge = function () {',
    '	return this.age;',
    '};'
].join('\n');

const editor = monaco.editor.create(document.getElementById('container'), {
    value: jsCode,
    language: 'javascript'
});

const decorations = editor.deltaDecorations([],
    [{
        range: new monaco.Range(7, 8, 8, 13),
        options: {
            inlineClassName: 'myInlineDecoration',
            marginClassName: 'rightLineDecoration'
        }
    }]);
editor.setHiddenAreas([new monaco.Range(1, 0, 6, 0)])
```

```javascript
interface IMyStandaloneCodeEditor extends monaco.editor.IStandaloneCodeEditor {
  setHiddenAreas(range: monaco.IRange[]): void;
}

const casted = editor as IMyStandaloneCodeEditor;
const range = new monaco.Range(1, 0, 1, 0);
casted.setHiddenAreas([range]);
```

Show custom feedback in certain lines: https://github.com/microsoft/monaco-editor/issues/1477#issuecomment-501220514