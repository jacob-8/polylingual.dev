import type { languages } from 'monaco-editor/esm/vs/editor/editor.api.js';

// https://github.com/Pranomvignesh/extend-monaco-language-tokenizer
// https://blog.checklyhq.com/customizing-monaco/
// export async function languages() {
//   const allLangs = monaco.languages.getLanguages();
//   const { language: handlebarsLang } = (await allLangs
//     .find(({ id }) => id === 'handlebars')
//     ?.loader()) as {
//     conf: any;
//     language: languages.IMonarchLanguage;
//   };

//   const customTokenizer = {
//     tokenizer: {
//       handlebarsInEmbeddedState: [
//         [/\{/, 'delimiter.handlebars'],
//         [/\}/, 'delimiter.handlebars'],
//       ],
//       handlebarsInSimpleState: [
//         [/\{/, 'delimiter.handlebars'],
//         [/\}/, 'delimiter.handlebars'],
//       ],
//     },
//   };
//   for (const key in customTokenizer) {
//     const value = customTokenizer[key];
//     if (key === 'tokenizer') {
//       for (const category in value) {
//         const tokenDefs = value[category];
//         // eslint-disable-next-line
//         if (!handlebarsLang.tokenizer.hasOwnProperty(category)) {
//           handlebarsLang.tokenizer[category] = [];
//         }
//         if (Array.isArray(tokenDefs)) {
//           handlebarsLang.tokenizer[category].unshift.apply(
//             handlebarsLang.tokenizer[category],
//             tokenDefs
//           );
//         }
//       }
//     }
//   }
//   handlebarsLang.tokenizer.root = handlebarsLang.tokenizer.root.filter(
//     (rule) => rule[0].toString() !== '/\\{/'
//   );
// }