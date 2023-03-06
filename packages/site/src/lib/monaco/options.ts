/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { editor } from 'monaco-editor/esm/vs/editor/editor.api.js';

const BASE_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
  automaticLayout: true,
  fontSize: 15,
  minimap: {
    enabled: false,
  },
  scrollBeyondLastLine: false,
  wordWrap: 'on',
  wrappingIndent: 'same',
  tabSize: 2,
  // highlightActiveIndentGuide: true,
  // fontFamily: 'Roboto Mono',
  // fontWeight: '500',
  // showFoldingControls: 'always',
  // tabCompletion: 'on',
}

export const DEFAULT_MONACO_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
  ...BASE_OPTIONS,
  autoClosingBrackets: 'languageDefined',
  autoClosingQuotes: 'beforeWhitespace',
  autoIndent: 'full',
  autoSurround: 'languageDefined',
  lineNumbersMinChars: 3,
  formatOnType: true,
  formatOnPaste: true,
  padding: {
    top: 8,
    bottom: 40,
  },
}

export const DEFAULT_MONACO_DIFF_OPTIONS: editor.IDiffEditorConstructionOptions = {
  ...BASE_OPTIONS,
  // @ts-ignore
  lineNumbers: false,
  readOnly: true,
  scrollbar: {
    alwaysConsumeMouseWheel: false,
  },
  padding: {
    top: 8,
    bottom: 8,
  },
  renderOverviewRuler: false,
  renderIndicators: false,
}

export const DEFAULT_MONACO_READ_ONLY_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
  ...BASE_OPTIONS,
  // @ts-ignore
  lineNumbers: false,
  readOnly: true,
  scrollbar: {
    alwaysConsumeMouseWheel: false,
  },
  padding: {
    top: 8,
    bottom: 8,
  },
  folding: false,
}